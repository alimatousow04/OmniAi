import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Switch } from "../components/ui/switch";
import { Progress } from "../components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Send,
  Paperclip,
  Mic,
  Volume2,
  Settings,
  MessageSquare,
  LogOut,
  Plus,
  Check,
  AlertCircle,
  X,
} from "lucide-react";

export function ComponentsPage() {
  return (
    <div className="h-screen overflow-y-auto bg-[#0D1B2A]">
      <div className="max-w-6xl mx-auto p-8 space-y-12">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Component Library</h1>
          <p className="text-white/60">OmniAI Design System Components</p>
        </div>

        {/* Colors */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="w-full h-32 rounded-lg bg-[#00B4CC]" />
              <p className="text-white font-medium">Primary Cyan</p>
              <p className="text-white/60 text-sm font-mono">#00B4CC</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-32 rounded-lg bg-[#7B4FD4]" />
              <p className="text-white font-medium">Secondary Violet</p>
              <p className="text-white/60 text-sm font-mono">#7B4FD4</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-32 rounded-lg bg-[#0D1B2A] border border-white/10" />
              <p className="text-white font-medium">Navy Dark</p>
              <p className="text-white/60 text-sm font-mono">#0D1B2A</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-32 rounded-lg bg-[#1A2B3C]" />
              <p className="text-white font-medium">Chat Card</p>
              <p className="text-white/60 text-sm font-mono">#1A2B3C</p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Buttons</h2>
          <Card className="bg-[#1A2B3C] border-white/10">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#00B4CC] hover:bg-[#00B4CC]/90 text-white">
                  Primary Button
                </Button>
                <Button
                  variant="outline"
                  className="border-[#7B4FD4] text-[#7B4FD4] hover:bg-[#7B4FD4]/10"
                >
                  Secondary Button
                </Button>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  Ghost Button
                </Button>
                <Button disabled className="bg-white/10 text-white/40">
                  Disabled Button
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <Button
                  size="icon"
                  className="bg-[#00B4CC] hover:bg-[#00B4CC]/90 text-white"
                >
                  <Send className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="border-white/10 text-white hover:bg-white/5"
                >
                  <Settings className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Badges & Pills</h2>
          <Card className="bg-[#1A2B3C] border-white/10">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-[#00B4CC]/20 text-[#00B4CC] border-[#00B4CC]/30">
                  Cyan Badge
                </Badge>
                <Badge className="bg-[#7B4FD4]/20 text-[#7B4FD4] border-[#7B4FD4]/30">
                  Violet Badge
                </Badge>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Check className="w-3 h-3 mr-1" />
                  Active
                </Badge>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Warning
                </Badge>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                  <X className="w-3 h-3 mr-1" />
                  Error
                </Badge>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="px-3 py-1 rounded-lg border border-[#FF6B35]/50 bg-[#FF6B35]/10 text-white text-sm">
                  ✨ Gemini 2.0
                </div>
                <div className="px-3 py-1 rounded-lg border border-[#4285F4]/50 bg-[#4285F4]/10 text-white text-sm">
                  🦙 Llama 3.3
                </div>
                <div className="px-3 py-1 rounded-lg border border-[#10A37F]/50 bg-[#10A37F]/10 text-white text-sm">
                  🔮 GPT-4o
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Input Fields */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Input Fields</h2>
          <Card className="bg-[#1A2B3C] border-white/10">
            <CardContent className="pt-6 space-y-4">
              <div>
                <Input
                  placeholder="Default state"
                  className="bg-[#0D1B2A] border-white/10 text-white placeholder:text-white/40"
                />
              </div>
              <div>
                <Input
                  placeholder="Focus state (cyan border)"
                  className="bg-[#0D1B2A] border-[#00B4CC] text-white placeholder:text-white/40 ring-[#00B4CC]"
                />
              </div>
              <div>
                <Input
                  placeholder="Error state"
                  className="bg-[#0D1B2A] border-red-500 text-white placeholder:text-white/40"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Chat Message Card - User */}
            <Card className="bg-[#00B4CC]/15 border-[#00B4CC]/30">
              <CardContent className="pt-4">
                <p className="text-white">User message bubble with cyan background</p>
              </CardContent>
            </Card>

            {/* Chat Message Card - AI */}
            <Card className="bg-[#1A2B3C] border-white/10">
              <CardContent className="pt-4">
                <p className="text-white">AI response card with dark background</p>
              </CardContent>
            </Card>

            {/* KPI Card */}
            <Card className="bg-[#1A2B3C] border-white/10">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-white/60">
                    Total Requests
                  </CardTitle>
                  <MessageSquare className="w-4 h-4 text-[#00B4CC]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#00B4CC]">347</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Progress & Switches */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Progress & Toggles</h2>
          <Card className="bg-[#1A2B3C] border-white/10">
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <p className="text-white text-sm">Linear Progress</p>
                <Progress value={65} className="h-2" />
              </div>

              <div className="space-y-2">
                <p className="text-white text-sm">Gradient Progress</p>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "75%",
                      background: "linear-gradient(90deg, #00B4CC 0%, #7B4FD4 100%)",
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-white text-sm mb-3">Circular Progress Rings</p>
                <div className="flex gap-6">
                  {[
                    { value: 90, color: "#FF6B35" },
                    { value: 75, color: "#4285F4" },
                    { value: 60, color: "#10A37F" },
                  ].map((ring, i) => (
                    <div key={i} className="relative w-16 h-16">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="6"
                          fill="none"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke={ring.color}
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray={`${(ring.value / 100) * 176} 176`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white">
                        {ring.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <p className="text-white text-sm">Toggle Switch (Cyan)</p>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Avatars */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Avatars</h2>
          <Card className="bg-[#1A2B3C] border-white/10">
            <CardContent className="pt-6">
              <div className="flex gap-4 items-center">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" />
                  <AvatarFallback>U1</AvatarFallback>
                </Avatar>
                <Avatar className="w-16 h-16">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user2" />
                  <AvatarFallback>U2</AvatarFallback>
                </Avatar>
                <Avatar className="w-20 h-20">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user3" />
                  <AvatarFallback>U3</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Icons */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Icon Set</h2>
          <Card className="bg-[#1A2B3C] border-white/10">
            <CardContent className="pt-6">
              <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Send className="w-6 h-6 text-[#00B4CC]" />
                  <span className="text-xs text-white/60">Send</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Paperclip className="w-6 h-6 text-[#00B4CC]" />
                  <span className="text-xs text-white/60">Attach</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Mic className="w-6 h-6 text-[#00B4CC]" />
                  <span className="text-xs text-white/60">Mic</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Volume2 className="w-6 h-6 text-[#00B4CC]" />
                  <span className="text-xs text-white/60">Speaker</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Settings className="w-6 h-6 text-[#00B4CC]" />
                  <span className="text-xs text-white/60">Settings</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-[#00B4CC]" />
                  <span className="text-xs text-white/60">Chat</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Plus className="w-6 h-6 text-[#00B4CC]" />
                  <span className="text-xs text-white/60">New</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LogOut className="w-6 h-6 text-[#00B4CC]" />
                  <span className="text-xs text-white/60">Logout</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}