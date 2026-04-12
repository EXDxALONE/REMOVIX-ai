import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Upload, Download, Image, LogOut, Zap, History,
  CreditCard, Settings, X, Check, AlertCircle, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

type ProcessingState = "idle" | "uploading" | "processing" | "done" | "error";

const Dashboard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [state, setState] = useState<ProcessingState>("idle");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [showBefore, setShowBefore] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateFile = (f: File): string | null => {
    if (!ALLOWED_TYPES.includes(f.type)) return "Unsupported format. Use JPG, PNG, or WEBP.";
    if (f.size > MAX_FILE_SIZE) return "File too large. Max 10MB.";
    return null;
  };

  const handleFile = useCallback((f: File) => {
    const err = validateFile(f);
    if (err) {
      toast({ title: err, variant: "destructive" });
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResultUrl(null);
    setState("idle");
    setErrorMsg("");
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleProcess = async () => {
    if (!file) return;
    setState("uploading");
    setProgress(20);

    // Simulate upload + processing (will be replaced with real Remove.bg API via n8n)
    await new Promise(r => setTimeout(r, 800));
    setProgress(50);
    setState("processing");
    await new Promise(r => setTimeout(r, 2000));
    setProgress(90);
    await new Promise(r => setTimeout(r, 500));
    setProgress(100);

    // For now, show the original as "result" — will be replaced with actual API
    setResultUrl(preview);
    setState("done");
    toast({ title: "Background removed successfully!" });
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResultUrl(null);
    setState("idle");
    setProgress(0);
    setErrorMsg("");
  };

  const sidebarLinks = [
    { icon: Upload, label: "Upload", active: true },
    { icon: History, label: "History" },
    { icon: CreditCard, label: "Credits" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-16 md:w-64 bg-card border-r border-border/30 flex flex-col">
        <div className="p-4 flex items-center gap-2.5 border-b border-border/30">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
            <span className="font-display text-white font-bold text-sm">R</span>
          </div>
          <span className="font-display text-lg font-bold text-foreground hidden md:block">
            Removix <span className="text-gradient">AI</span>
          </span>
        </div>

        <div className="flex-1 p-2 space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-body ${
                link.active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <link.icon className="w-5 h-5 flex-shrink-0" />
              <span className="hidden md:block">{link.label}</span>
            </button>
          ))}
        </div>

        {/* Credits */}
        <div className="p-3 border-t border-border/30">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary">
            <Zap className="w-4 h-4 text-primary flex-shrink-0" />
            <div className="hidden md:block flex-1">
              <p className="text-xs text-muted-foreground font-body">Credits left</p>
              <p className="text-sm font-bold text-foreground font-body">5 / 5 today</p>
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-border/30">
          <button
            onClick={async () => { await signOut(); navigate("/"); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all text-sm font-body"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="hidden md:block">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-14 border-b border-border/30 flex items-center justify-between px-6">
          <h1 className="font-display text-lg font-bold text-foreground">Upload & Remove</h1>
          <p className="text-sm font-body text-muted-foreground">
            Welcome, <span className="text-foreground">{user?.user_metadata?.display_name || user?.email}</span>
          </p>
        </div>

        {/* Upload area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {!file ? (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative rounded-2xl border-2 border-dashed p-16 text-center cursor-pointer transition-all ${
                      dragOver
                        ? "border-primary bg-primary/5 shadow-premium"
                        : "border-border hover:border-primary/50 hover:bg-card"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFile(f);
                      }}
                    />
                    <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-5">
                      <Upload className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      Drop your image here
                    </h3>
                    <p className="text-sm text-muted-foreground font-body mb-4">
                      or click to browse. Supports JPG, PNG, WEBP up to 10MB.
                    </p>
                    <Button variant="outline" size="sm" className="pointer-events-none">
                      Browse Files
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Image preview */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Original */}
                    <div className="glass-card rounded-2xl p-4 neon-border">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider">
                          Original
                        </span>
                        <button onClick={handleReset} className="text-muted-foreground hover:text-foreground">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="aspect-square rounded-lg overflow-hidden bg-secondary flex items-center justify-center">
                        <img
                          src={preview!}
                          alt="Original"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground font-body mt-2 truncate">
                        {file.name} ({(file.size / 1024 / 1024).toFixed(1)}MB)
                      </p>
                    </div>

                    {/* Result */}
                    <div className="glass-card rounded-2xl p-4 neon-border">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider">
                          Result
                        </span>
                        {state === "done" && (
                          <div className="flex items-center gap-1 text-xs text-primary font-body">
                            <Check className="w-3 h-3" />
                            Done
                          </div>
                        )}
                      </div>
                      <div className="aspect-square rounded-lg overflow-hidden bg-secondary flex items-center justify-center" style={{
                        backgroundImage: state === "done" ? "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\"><rect width=\"10\" height=\"10\" fill=\"%23222\"/><rect x=\"10\" y=\"10\" width=\"10\" height=\"10\" fill=\"%23222\"/><rect x=\"10\" width=\"10\" height=\"10\" fill=\"%23333\"/><rect y=\"10\" width=\"10\" height=\"10\" fill=\"%23333\"/></svg>')" : "none",
                        backgroundSize: "20px 20px",
                      }}>
                        {state === "idle" && (
                          <div className="text-center p-4">
                            <Image className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground font-body">Click "Remove Background" to process</p>
                          </div>
                        )}
                        {(state === "uploading" || state === "processing") && (
                          <div className="text-center p-4">
                            <Loader2 className="w-8 h-8 text-primary mx-auto mb-2 animate-spin" />
                            <p className="text-xs text-muted-foreground font-body">
                              {state === "uploading" ? "Uploading..." : "AI is processing..."}
                            </p>
                          </div>
                        )}
                        {state === "done" && resultUrl && (
                          <img
                            src={resultUrl}
                            alt="Result"
                            className="max-w-full max-h-full object-contain"
                          />
                        )}
                        {state === "error" && (
                          <div className="text-center p-4">
                            <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
                            <p className="text-xs text-destructive font-body">{errorMsg}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  {(state === "uploading" || state === "processing") && (
                    <div className="space-y-2">
                      <Progress value={progress} className="h-2 bg-secondary [&>div]:gradient-primary" />
                      <p className="text-xs text-muted-foreground font-body text-center">
                        {state === "uploading" ? "Uploading image..." : "AI processing in progress..."}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-center gap-4">
                    {state === "idle" && (
                      <Button variant="gradient" size="lg" onClick={handleProcess}>
                        <Zap className="w-5 h-5" />
                        Remove Background
                      </Button>
                    )}
                    {state === "done" && (
                      <>
                        <Button variant="gradient" size="lg" asChild>
                          <a href={resultUrl!} download="removix-result.png">
                            <Download className="w-5 h-5" />
                            Download Result
                          </a>
                        </Button>
                        <Button variant="outline" size="lg" onClick={handleReset}>
                          Upload Another
                        </Button>
                      </>
                    )}
                    {state === "error" && (
                      <Button variant="outline" size="lg" onClick={handleProcess}>
                        Retry
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
