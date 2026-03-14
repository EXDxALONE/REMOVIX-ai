import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  MessageCircle, Phone, Video, Users, Settings, LogOut,
  Search, Bell, Wallet, Plus, Send, ArrowLeft, UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import {
  useConversations,
  useMessages,
  useCreateConversation,
  useSearchUsers,
  type ConversationWithDetails,
} from "@/hooks/useChat";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const sidebarLinks = [
  { icon: MessageCircle, label: "Chats", active: true },
  { icon: Phone, label: "Calls" },
  { icon: Video, label: "Rooms" },
  { icon: Users, label: "Community" },
];

function getInitials(name: string | null | undefined): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d`;
}

function statusIcon(status: string): string {
  if (status === "read") return "✓✓";
  if (status === "delivered") return "✓✓";
  return "✓";
}

function NewChatDialog({ onCreated }: { onCreated: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<{ user_id: string; display_name: string | null; username: string | null; avatar_url: string | null }[]>([]);
  const [creating, setCreating] = useState(false);
  const [open, setOpen] = useState(false);
  const { searchUsers } = useSearchUsers();
  const { createDM } = useCreateConversation();

  const handleSearch = async (q: string) => {
    setSearchQuery(q);
    if (q.length >= 2) {
      const r = await searchUsers(q);
      setResults(r);
    } else {
      setResults([]);
    }
  };

  const handleSelect = async (userId: string) => {
    setCreating(true);
    const { error } = await createDM(userId);
    setCreating(false);
    if (!error) {
      setOpen(false);
      setSearchQuery("");
      setResults([]);
      onCreated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
          <UserPlus className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">New Conversation</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by username or name..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9 h-10 rounded-xl bg-background font-body"
            />
          </div>
          <div className="max-h-60 overflow-y-auto space-y-1">
            {results.length === 0 && searchQuery.length >= 2 && (
              <p className="text-sm text-muted-foreground font-body text-center py-4">No users found</p>
            )}
            {results.map((u) => (
              <button
                key={u.user_id}
                onClick={() => handleSelect(u.user_id)}
                disabled={creating}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-secondary-foreground text-xs font-medium">
                    {getInitials(u.display_name || u.username)}
                  </span>
                </div>
                <div>
                  <p className="font-body font-medium text-sm text-foreground">{u.display_name || u.username || "User"}</p>
                  {u.username && <p className="text-xs text-muted-foreground font-body">@{u.username}</p>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const Dashboard = () => {
  const [selectedConvoId, setSelectedConvoId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { conversations, loading: convosLoading, refetch } = useConversations();
  const { messages, loading: msgsLoading, sendMessage } = useMessages(selectedConvoId);

  const selectedConvo = conversations.find((c) => c.id === selectedConvoId) ?? null;

  // Get display name for the other person in a DM
  const getConvoDisplayName = (convo: ConversationWithDetails): string => {
    if (convo.is_group && convo.name) return convo.name;
    const other = convo.members.find((m) => m.user_id !== user?.id);
    return other?.display_name || other?.username || "Unknown";
  };

  const getConvoInitials = (convo: ConversationWithDetails): string => {
    return getInitials(getConvoDisplayName(convo));
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!messageInput.trim()) return;
    const content = messageInput;
    setMessageInput("");
    await sendMessage(content);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-screen bg-background flex">
      {/* Left sidebar - Navigation (hidden on mobile when chat is open) */}
      <div className={`w-16 bg-secondary flex-col items-center py-6 gap-6 hidden md:flex`}>
        <div className="w-9 h-9 rounded-full gradient-gold flex items-center justify-center">
          <span className="font-display text-secondary font-semibold text-xs">A</span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-2 mt-4">
          {sidebarLinks.map((link) => (
            <button
              key={link.label}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                link.active
                  ? "bg-primary/20 text-primary"
                  : "text-secondary-foreground/50 hover:text-secondary-foreground hover:bg-secondary-foreground/10"
              }`}
              title={link.label}
            >
              <link.icon className="w-5 h-5" />
            </button>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          <button className="w-10 h-10 rounded-xl flex items-center justify-center text-secondary-foreground/50 hover:text-secondary-foreground hover:bg-secondary-foreground/10 transition-all" title="Settings">
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={async () => { await signOut(); navigate("/"); }}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-secondary-foreground/50 hover:text-secondary-foreground hover:bg-secondary-foreground/10 transition-all"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Conversations list */}
      <div className={`w-full md:w-80 border-r border-border bg-card flex flex-col ${mobileShowChat ? "hidden md:flex" : "flex"}`}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-medium text-foreground">Messages</h2>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                <Bell className="w-4 h-4" />
              </button>
              <NewChatDialog onCreated={refetch} />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {convosLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 rounded-full gradient-gold animate-gold-pulse" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground font-body">No conversations yet</p>
              <p className="text-xs text-muted-foreground/70 font-body mt-1">Start a new chat using the + button above</p>
            </div>
          ) : (
            conversations.map((convo) => (
              <motion.button
                key={convo.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedConvoId(convo.id);
                  setMobileShowChat(true);
                }}
                className={`w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left ${
                  selectedConvoId === convo.id ? "bg-muted/80" : ""
                }`}
              >
                <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-secondary-foreground text-sm font-medium">
                    {getConvoInitials(convo)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-body font-medium text-sm text-foreground truncate">
                      {getConvoDisplayName(convo)}
                    </span>
                    {convo.last_message && (
                      <span className="text-xs text-muted-foreground font-body">
                        {formatTime(convo.last_message.created_at)}
                      </span>
                    )}
                  </div>
                  {convo.last_message && (
                    <p className="text-xs text-muted-foreground font-body truncate mt-0.5">
                      {convo.last_message.sender_id === user?.id ? "You: " : ""}
                      {convo.last_message.content}
                    </p>
                  )}
                </div>
                {convo.unread_count > 0 && (
                  <div className="w-5 h-5 rounded-full gradient-gold flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-body font-bold text-secondary">{convo.unread_count}</span>
                  </div>
                )}
              </motion.button>
            ))
          )}
        </div>

        {/* Wallet */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-muted">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="text-xs font-body text-muted-foreground">Wallet</span>
            </div>
            <span className="font-mono text-sm text-foreground font-medium">₹1,240.50</span>
          </div>
        </div>
      </div>

      {/* Main chat area */}
      <div className={`flex-1 flex flex-col ${!mobileShowChat ? "hidden md:flex" : "flex"}`}>
        {selectedConvo ? (
          <>
            <div className="h-16 border-b border-border flex items-center justify-between px-4 md:px-6">
              <div className="flex items-center gap-3">
                <button
                  className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileShowChat(false)}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                  <span className="font-display text-secondary-foreground text-xs font-medium">
                    {getConvoInitials(selectedConvo)}
                  </span>
                </div>
                <div>
                  <h3 className="font-body font-medium text-sm text-foreground">
                    {getConvoDisplayName(selectedConvo)}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <Video className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3">
              {msgsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 rounded-full gradient-gold animate-gold-pulse" />
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-sm text-muted-foreground font-body">No messages yet. Say hello!</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isMe = msg.sender_id === user?.id;
                  return (
                    <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[75%] sm:max-w-xs rounded-[18px] px-4 py-2.5 ${
                          isMe
                            ? "rounded-tr-[4px] bg-secondary"
                            : "rounded-tl-[4px] bg-muted"
                        }`}
                      >
                        <p className={`text-sm font-body ${isMe ? "text-secondary-foreground" : "text-foreground"}`}>
                          {msg.content}
                        </p>
                        <span
                          className={`text-[10px] font-body mt-1 block ${
                            isMe ? "text-secondary-foreground/60 text-right" : "text-muted-foreground"
                          }`}
                        >
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          {isMe && ` ${statusIcon(msg.status)}`}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-secondary hover:opacity-90 transition-opacity flex-shrink-0">
                  <Plus className="w-5 h-5" />
                </button>
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 h-11 rounded-full bg-muted border-none font-body"
                />
                <Button
                  variant="gold"
                  size="icon"
                  className="rounded-full w-11 h-11 flex-shrink-0"
                  onClick={handleSend}
                  disabled={!messageInput.trim()}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-1">Select a conversation</h3>
              <p className="text-sm text-muted-foreground font-body">Choose a chat or start a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
