import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Plus, MessageSquare, Clock } from "lucide-react";
import { motion } from "motion/react";

interface Conversation {
  id: number;
  titre: string;
  updated_at: string;
}

interface GroupedConversations {
  [group: string]: Conversation[];
}

function getGroup(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor(
    (now.setHours(0, 0, 0, 0) - date.setHours(0, 0, 0, 0)) / 86_400_000
  );
  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return "Hier";
  if (diffDays <= 7) return "Cette semaine";
  return "Plus ancien";
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const GROUP_ORDER = ["Aujourd'hui", "Hier", "Cette semaine", "Plus ancien"];

interface UserInfo {
  prenom: string | null;
  email: string;
}

export function ChatSidebar() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("omni_token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserInfo({ prenom: payload.prenom ?? null, email: payload.email });
    } catch {
      // token malformé, on ignore
    }

    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/conversations`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setConversations(Array.isArray(data) ? data : []))
      .catch(() => setConversations([]))
      .finally(() => setIsLoading(false));
  }, []);

  const grouped = conversations.reduce<GroupedConversations>((acc, conv) => {
    const group = getGroup(conv.updated_at);
    if (!acc[group]) acc[group] = [];
    acc[group].push(conv);
    return acc;
  }, {});

  return (
    <aside className="w-72 bg-[#0D1B2A] border-r border-white/10 flex flex-col">
      <div className="p-4 border-b border-white/10">
        <Button
          onClick={() => navigate("/app")}
          className="w-full bg-[#00B4CC] hover:bg-[#00B4CC]/90 text-white justify-start"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {isLoading ? (
          <p className="text-sm text-white/40 text-center mt-6">Chargement…</p>
        ) : conversations.length === 0 ? (
          <p className="text-sm text-white/40 text-center mt-6">Aucune conversation</p>
        ) : (
          GROUP_ORDER.filter((g) => grouped[g]).map((group) => (
            <div key={group}>
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                {group}
              </h3>
              <div className="space-y-1">
                {grouped[group].map((conv) => (
                  <motion.button
                    key={conv.id}
                    whileHover={{ x: 4 }}
                    onClick={() => navigate(`/app/chat/${conv.id}`)}
                    className="w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-colors hover:bg-[#7B4FD4]/10 text-white/70 hover:text-white group"
                  >
                    <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40 group-hover:text-[#7B4FD4]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{conv.titre}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-white/40">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(conv.updated_at)}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {userInfo && (
        <div className="p-4 border-t border-white/10">
          <p className="text-sm font-medium text-white truncate">
            {userInfo.prenom ?? userInfo.email}
          </p>
          <p className="text-xs text-white/40 truncate">{userInfo.email}</p>
        </div>
      )}
    </aside>
  );
}
