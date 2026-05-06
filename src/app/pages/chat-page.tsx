import { useState } from "react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";
import { ChatSidebar } from "../components/chat-sidebar";
import { MessageContent } from "../components/message-content";
import {
  ChevronDown,
  Send,
  Paperclip,
  Mic,
  Volume2,
  Check,
  X,
  MessageSquare,
  Clock,
} from "lucide-react";
import { motion } from "motion/react";

type AIModel = "gemini" | "llama" | "gpt4o";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  model?: AIModel;
}

interface ModelInfo {
  id: AIModel;
  name: string;
  logo: string;
  color: string;
  quota: number;
  maxQuota: number;
}

const models: ModelInfo[] = [
  { id: "gemini", name: "Gemini 2.0 Flash", logo: "✨", color: "#FF6B35", quota: 18, maxQuota: 20 },
  { id: "llama", name: "Llama 3.3 70B", logo: "🦙", color: "#4285F4", quota: 15, maxQuota: 20 },
  { id: "gpt4o", name: "GPT-4o", logo: "🔮", color: "#10A37F", quota: 12, maxQuota: 20 },
];


export function ChatPage() {
  const [selectedModel, setSelectedModel] = useState<AIModel>("gemini");
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI assistant powered by Gemini 2.0 Flash. How can I help you today?\n\nI can help with coding, writing, analysis, and more. For example, here's a quick code snippet:\n\n```javascript\nconst greeting = 'Welcome to OmniAI!';\nconsole.log(greeting);\n```",
      timestamp: new Date(),
      model: "gemini",
    },
  ]);
  const [isModelDialogOpen, setIsModelDialogOpen] = useState(false);
  const [dynamicRouting, setDynamicRouting] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const currentModel = models.find((m) => m.id === selectedModel)!;

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })), model: selectedModel }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content ?? data.message ?? JSON.stringify(data),
        timestamp: new Date(),
        model: selectedModel,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Erreur : impossible de contacter le serveur. (${err instanceof Error ? err.message : String(err)})`,
        timestamp: new Date(),
        model: selectedModel,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-screen flex">
      {/* Left Sidebar - Conversation History */}
      <ChatSidebar />

      {/* Center Chat Panel */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-6">
          <Dialog open={isModelDialogOpen} onOpenChange={setIsModelDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-[#1A2B3C] border-white/10 text-white hover:bg-white/5"
              >
                <span className="mr-2">{currentModel.logo}</span>
                <span>{currentModel.name}</span>
                <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1A2B3C] border-white/10 text-white max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-white">Choose your AI model</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid gap-3">
                  {models.map((model) => (
                    <motion.button
                      key={model.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedModel(model.id);
                        setIsModelDialogOpen(false);
                      }}
                      className={`relative p-4 rounded-lg border-2 transition-all ${
                        selectedModel === model.id
                          ? "border-[#00B4CC] bg-[#00B4CC]/10"
                          : "border-white/10 bg-[#0D1B2A] hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{model.logo}</div>
                        <div className="flex-1 text-left">
                          <h3 className="font-semibold text-white">{model.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-[#7B4FD4] text-white text-xs">Free tier</Badge>
                            <span className="text-xs text-white/60">
                              {model.quota}/{model.maxQuota} requests
                            </span>
                          </div>
                        </div>
                        {selectedModel === model.id && (
                          <Check className="w-5 h-5 text-[#00B4CC]" />
                        )}
                      </div>
                      <div className="mt-3">
                        <Progress
                          value={(model.quota / model.maxQuota) * 100}
                          className="h-1.5"
                        />
                      </div>
                    </motion.button>
                  ))}
                </div>
                
                <div className="flex items-center justify-between p-4 bg-[#0D1B2A] rounded-lg">
                  <div>
                    <Label htmlFor="dynamic-routing" className="text-white">
                      Dynamic routing
                    </Label>
                    <p className="text-xs text-white/60 mt-1">
                      Auto-switch when quota reached
                    </p>
                  </div>
                  <Switch
                    id="dynamic-routing"
                    checked={dynamicRouting}
                    onCheckedChange={setDynamicRouting}
                  />
                </div>

                <Button
                  onClick={() => setIsModelDialogOpen(false)}
                  className="w-full bg-[#00B4CC] hover:bg-[#00B4CC]/90 text-white"
                >
                  Confirm selection
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Badge className="bg-[#00B4CC]/20 text-[#00B4CC] border-[#00B4CC]/30">
            {currentModel.quota}/{currentModel.maxQuota} requests remaining
          </Badge>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-2xl ${
                  message.role === "user"
                    ? "bg-[#00B4CC]/15 border border-[#00B4CC]/30 text-white"
                    : "bg-[#1A2B3C] text-white"
                } rounded-lg p-4`}
              >
                <MessageContent content={message.content} />
                <div className="flex items-center gap-2 mt-2 text-xs text-white/50">
                  <Clock className="w-3 h-3" />
                  <span>{message.timestamp.toLocaleTimeString()}</span>
                  {message.model && (
                    <>
                      <span>•</span>
                      <span>{models.find((m) => m.id === message.model)?.name}</span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="bg-[#1A2B3C] border-white/10 text-white placeholder:text-white/40 resize-none min-h-[60px] max-h-[120px] pr-32"
              />
              <div className="absolute right-2 bottom-2 flex items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white/60 hover:text-white hover:bg-white/10 w-8 h-8"
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white/60 hover:text-white hover:bg-white/10 w-8 h-8"
                >
                  <Mic className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white/60 hover:text-white hover:bg-white/10 w-8 h-8"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-[#00B4CC] hover:bg-[#00B4CC]/90 text-white h-[60px] px-6 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      {showRightPanel && (
        <aside className="w-80 bg-[#0D1B2A] border-l border-white/10 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-white">Session Info</h3>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShowRightPanel(false)}
              className="text-white/60 hover:text-white hover:bg-white/10 w-8 h-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Current Model */}
            <div>
              <p className="text-sm text-white/60 mb-2">Current Model</p>
              <div
                className="p-3 rounded-lg border flex items-center gap-2"
                style={{ borderColor: currentModel.color + "50", backgroundColor: currentModel.color + "10" }}
              >
                <span className="text-2xl">{currentModel.logo}</span>
                <span className="text-white font-medium">{currentModel.name}</span>
              </div>
            </div>

            {/* Token Usage */}
            <div>
              <p className="text-sm text-white/60 mb-2">Token Usage</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-white">
                  <span>This session</span>
                  <span>1,247 / 4,000</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "31%",
                      background: "linear-gradient(90deg, #00B4CC 0%, #7B4FD4 100%)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Model Quotas */}
            <div>
              <p className="text-sm text-white/60 mb-3">Model Quotas</p>
              <div className="space-y-4">
                {models.map((model) => (
                  <div key={model.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="4"
                          fill="none"
                        />
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke={model.color}
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${(model.quota / model.maxQuota) * 126} 126`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                        {model.quota}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{model.name}</p>
                      <p className="text-xs text-white/60">{model.quota}/{model.maxQuota} req</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* File Attachments */}
            <div>
              <p className="text-sm text-white/60 mb-2">Attachments</p>
              <p className="text-xs text-white/40">No files attached</p>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}