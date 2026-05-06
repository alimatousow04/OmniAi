import { useState } from "react";
import { Button } from "../components/ui/button";
import { Plus, MessageSquare, Clock } from "lucide-react";
import { motion } from "motion/react";

interface Conversation {
  id: string;
  title: string;
  time: string;
  group: string;
}

export function ChatSidebar() {
  const [conversations] = useState<Conversation[]>([]);

  const groupedConversations = conversations.reduce((acc, conv) => {
    if (!acc[conv.group]) {
      acc[conv.group] = [];
    }
    acc[conv.group].push(conv);
    return acc;
  }, {} as Record<string, Conversation[]>);

  return (
    <aside className="w-72 bg-[#0D1B2A] border-r border-white/10 flex flex-col">
      {/* New Chat Button */}
      <div className="p-4 border-b border-white/10">
        <Button className="w-full bg-[#00B4CC] hover:bg-[#00B4CC]/90 text-white justify-start">
          <Plus className="w-5 h-5 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Conversation History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {conversations.length === 0 ? (
          <p className="text-sm text-white/40 text-center mt-6">Aucune conversation</p>
        ) : (
          Object.entries(groupedConversations).map(([group, convs]) => (
            <div key={group}>
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                {group}
              </h3>
              <div className="space-y-1">
                {convs.map((conv) => (
                  <motion.button
                    key={conv.id}
                    whileHover={{ x: 4 }}
                    className="w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-colors hover:bg-[#7B4FD4]/10 text-white/70 hover:text-white group"
                  >
                    <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40 group-hover:text-[#7B4FD4]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{conv.title}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-white/40">
                        <Clock className="w-3 h-3" />
                        <span>{conv.time}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
