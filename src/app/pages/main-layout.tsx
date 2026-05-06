import { Outlet, useNavigate, useLocation } from "react-router";
import { Button } from "../components/ui/button";
import {
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Layers,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: MessageSquare, label: "Chat", path: "/app" },
    { icon: BarChart3, label: "Dashboard", path: "/app/dashboard" },
    { icon: Settings, label: "Settings", path: "/app/settings" },
    { icon: Layers, label: "Components", path: "/app/components" },
  ];

  const isActive = (path: string) => {
    if (path === "/app") {
      return location.pathname === "/app" || location.pathname.startsWith("/app/chat");
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex dark">
      {/* Left Sidebar */}
      <aside className="w-60 bg-[#0D1B2A] border-r border-white/10 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00B4CC] to-[#7B4FD4] flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#0D1B2A]" />
            </div>
            <div>
              <h2 className="font-bold text-white">OmniAI</h2>
              <p className="text-xs text-[#00B4CC]">AI Workspace</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? "bg-[#00B4CC]/20 text-[#00B4CC]"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">John Doe</p>
              <p className="text-xs text-white/60 truncate">john@company.com</p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
