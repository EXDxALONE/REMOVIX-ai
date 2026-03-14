import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { RealtimePostgresInsertPayload } from "@supabase/supabase-js";

export interface ConversationWithDetails {
  id: string;
  is_group: boolean;
  name: string | null;
  updated_at: string;
  members: { user_id: string; display_name: string | null; username: string | null; avatar_url: string | null }[];
  last_message: { content: string; created_at: string; sender_id: string; status: string } | null;
  unread_count: number;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  status: string;
  created_at: string;
}

export function useConversations() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ConversationWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConversations = useCallback(async () => {
    if (!user) return;

    // Get conversations the user is a member of
    const { data: memberOf } = await supabase
      .from("conversation_members")
      .select("conversation_id")
      .eq("user_id", user.id);

    if (!memberOf || memberOf.length === 0) {
      setConversations([]);
      setLoading(false);
      return;
    }

    const convoIds = memberOf.map((m) => m.conversation_id);

    const { data: convos } = await supabase
      .from("conversations")
      .select("*")
      .in("id", convoIds)
      .order("updated_at", { ascending: false });

    if (!convos) {
      setConversations([]);
      setLoading(false);
      return;
    }

    // Fetch members with profiles for each conversation
    const detailed: ConversationWithDetails[] = await Promise.all(
      convos.map(async (convo) => {
        const { data: members } = await supabase
          .from("conversation_members")
          .select("user_id")
          .eq("conversation_id", convo.id);

        const memberIds = members?.map((m) => m.user_id) ?? [];

        const { data: profiles } = await supabase
          .from("profiles")
          .select("user_id, display_name, username, avatar_url")
          .in("user_id", memberIds);

        // Get last message
        const { data: lastMessages } = await supabase
          .from("messages")
          .select("content, created_at, sender_id, status")
          .eq("conversation_id", convo.id)
          .order("created_at", { ascending: false })
          .limit(1);

        // Count unread (messages not sent by me, after last read)
        const { count: unreadCount } = await supabase
          .from("messages")
          .select("id", { count: "exact", head: true })
          .eq("conversation_id", convo.id)
          .neq("sender_id", user.id)
          .neq("status", "read");

        return {
          id: convo.id,
          is_group: convo.is_group,
          name: convo.name,
          updated_at: convo.updated_at,
          members: profiles ?? [],
          last_message: lastMessages?.[0] ?? null,
          unread_count: unreadCount ?? 0,
        };
      })
    );

    setConversations(detailed);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Realtime: refetch on new messages
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("conversations-updates")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchConversations]);

  return { conversations, loading, refetch: fetchConversations };
}

export function useMessages(conversationId: string | null) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    setLoading(true);

    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      setMessages(data ?? []);
      setLoading(false);
    };

    fetchMessages();

    // Realtime subscription for new messages in this conversation
    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload: RealtimePostgresInsertPayload<Message>) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        () => {
          // Refetch on status updates
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!user || !conversationId || !content.trim()) return;

      const { error } = await supabase.from("messages").insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content: content.trim(),
        status: "sent",
      });

      return { error };
    },
    [user, conversationId]
  );

  // Mark messages as read when viewing
  useEffect(() => {
    if (!user || !conversationId || messages.length === 0) return;

    const unreadFromOthers = messages.filter(
      (m) => m.sender_id !== user.id && m.status !== "read"
    );

    if (unreadFromOthers.length === 0) return;

    const markRead = async () => {
      const reads = unreadFromOthers.map((m) => ({
        message_id: m.id,
        user_id: user.id,
      }));

      // Upsert read receipts
      await supabase.from("message_reads").upsert(reads, {
        onConflict: "message_id,user_id",
      });
    };

    markRead();
  }, [user, conversationId, messages]);

  return { messages, loading, sendMessage };
}

export function useCreateConversation() {
  const { user } = useAuth();

  const createDM = useCallback(
    async (otherUserId: string) => {
      if (!user) return { error: new Error("Not authenticated"), conversationId: null };

      // Create the conversation
      const { data: convo, error: convoErr } = await supabase
        .from("conversations")
        .insert({ is_group: false, created_by: user.id })
        .select("id")
        .single();

      if (convoErr || !convo) return { error: convoErr, conversationId: null };

      // Add both members
      const { error: memberErr } = await supabase.from("conversation_members").insert([
        { conversation_id: convo.id, user_id: user.id },
        { conversation_id: convo.id, user_id: otherUserId },
      ]);

      if (memberErr) return { error: memberErr, conversationId: null };

      return { error: null, conversationId: convo.id };
    },
    [user]
  );

  return { createDM };
}

export function useSearchUsers() {
  const { user } = useAuth();

  const searchUsers = useCallback(
    async (query: string) => {
      if (!user || !query.trim()) return [];

      const { data } = await supabase
        .from("profiles")
        .select("user_id, display_name, username, avatar_url")
        .neq("user_id", user.id)
        .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
        .limit(10);

      return data ?? [];
    },
    [user]
  );

  return { searchUsers };
}
