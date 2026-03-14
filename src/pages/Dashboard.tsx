import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { MessageCircle, Phone, Video, Users, Settings, LogOut, Search, Bell, Wallet, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

const conversations = [
  { id: 1, name: "Priya Sharma", lastMessage: "See you in the study room!", time: "2m", unread: 3, online: true },
  { id: 2, name: "Arjun Patel", lastMessage: "Thanks for the notes 📚", time: "15m", unread: 0, online: true },
  { id: 3, name: "UPSC Prep Group", lastMessage: "Rahul: New schedule posted", time: "1h", unread: 12, online: false },
  { id: 4, name: "Meera Nair", lastMessage: "That was a great session!", time: "3h", unread: 0, online: false },
  { id: 5, name: "Book Club", lastMessage: "Next read: Sapiens", time: "1d", unread: 0, online: false },
];

const sidebarLinks = [
  { icon: MessageCircle, label: "Chats", active: true },
  { icon: Phone, label: "Calls" },
  { icon: Video, label: "Rooms" },
  { icon: Users, label: "Community" },
];

const Dashboard = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-background flex">
      {/* Left sidebar - Navigation */}
      <div className="w-16 bg-secondary flex flex-col items-center py-6 gap-6">
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
          <button onClick={async () => { await signOut(); navigate("/"); }} className="w-10 h-10 rounded-xl flex items-center justify-center text-secondary-foreground/50 hover:text-secondary-foreground hover:bg-secondary-foreground/10 transition-all" title="Sign Out">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Conversations list */}
      <div className="w-80 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-medium text-foreground">Messages</h2>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                <Bell className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search conversations" className="pl-9 h-9 rounded-xl bg-background text-sm font-body" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((chat) => (
            <motion.button
              key={chat.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedChat(chat.id)}
              className={`w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left ${
                selectedChat === chat.id ? "bg-muted/80" : ""
              }`}
            >
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center">
                  <span className="font-display text-secondary-foreground text-sm font-medium">
                    {chat.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </span>
                </div>
                {chat.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-primary border-2 border-card" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-body font-medium text-sm text-foreground truncate">{chat.name}</span>
                  <span className="text-xs text-muted-foreground font-body">{chat.time}</span>
                </div>
                <p className="text-xs text-muted-foreground font-body truncate mt-0.5">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <div className="w-5 h-5 rounded-full gradient-gold flex items-center justify-center">
                  <span className="text-[10px] font-body font-bold text-secondary">{chat.unread}</span>
                </div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Wallet indicator */}
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
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="h-16 border-b border-border flex items-center justify-between px-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                  <span className="font-display text-secondary-foreground text-xs font-medium">PS</span>
                </div>
                <div>
                  <h3 className="font-body font-medium text-sm text-foreground">Priya Sharma</h3>
                  <p className="text-xs text-primary font-body">Online</p>
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

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Sample messages */}
              <div className="flex justify-start">
                <div className="max-w-xs rounded-[18px] rounded-tl-[4px] bg-muted px-4 py-2.5">
                  <p className="text-sm font-body text-foreground">Hey! Are you joining the UPSC study room today?</p>
                  <span className="text-[10px] text-muted-foreground font-body mt-1 block">10:30 AM</span>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-xs rounded-[18px] rounded-tr-[4px] bg-secondary px-4 py-2.5">
                  <p className="text-sm font-body text-secondary-foreground">Yes! Starting at 2 PM. See you there 📚</p>
                  <span className="text-[10px] text-secondary-foreground/60 font-body mt-1 block text-right">10:32 AM ✓✓</span>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-xs rounded-[18px] rounded-tl-[4px] bg-muted px-4 py-2.5">
                  <p className="text-sm font-body text-foreground">See you in the study room!</p>
                  <span className="text-[10px] text-muted-foreground font-body mt-1 block">10:33 AM</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-secondary hover:opacity-90 transition-opacity">
                  <Plus className="w-5 h-5" />
                </button>
                <Input placeholder="Type a message..." className="flex-1 h-11 rounded-full bg-muted border-none font-body" />
                <Button variant="gold" size="icon" className="rounded-full w-11 h-11">
                  <MessageCircle className="w-5 h-5" />
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
              <p className="text-sm text-muted-foreground font-body">Choose a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
