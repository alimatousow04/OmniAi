import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Calendar, TrendingUp, MessageSquare, Zap, Check, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";

const chartData = [
  { date: "Mon", claude: 45, gemini: 32, gpt4o: 28 },
  { date: "Tue", claude: 52, gemini: 41, gpt4o: 35 },
  { date: "Wed", claude: 38, gemini: 48, gpt4o: 42 },
  { date: "Thu", claude: 61, gemini: 35, gpt4o: 38 },
  { date: "Fri", claude: 55, gemini: 52, gpt4o: 45 },
  { date: "Sat", claude: 28, gemini: 24, gpt4o: 19 },
  { date: "Sun", claude: 32, gemini: 28, gpt4o: 22 },
];

const quotaStatus = [
  { model: "Gemini 2.0 Flash", rpm: "18/20", rpd: "450/500", tpm: "85K/100K", status: "active" },
  { model: "Llama 3.3 70B", rpm: "15/20", rpd: "380/500", tpm: "72K/100K", status: "active" },
  { model: "GPT-4o", rpm: "12/20", rpd: "298/500", tpm: "58K/100K", status: "warning" },
];

const recentConversations = [
  { title: "Building a React dashboard", model: "Gemini", tokens: "1.2K", time: "2 hours ago" },
  { title: "API integration help", model: "GPT-4o", tokens: "850", time: "4 hours ago" },
  { title: "Database schema design", model: "Llama", tokens: "2.1K", time: "Yesterday" },
  { title: "UI/UX best practices", model: "Gemini", tokens: "1.5K", time: "Yesterday" },
];

export function DashboardPage() {
  return (
    <div className="h-screen overflow-y-auto bg-[#0D1B2A]">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Usage Dashboard</h1>
            <p className="text-white/60">Monitor your AI model usage and performance</p>
          </div>
          <Button
            variant="outline"
            className="bg-[#1A2B3C] border-white/10 text-white hover:bg-white/5"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Last 7 days
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-[#1A2B3C] border-white/10">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white/60">Total Requests</CardTitle>
                <MessageSquare className="w-4 h-4 text-[#00B4CC]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#00B4CC]">347</div>
              <p className="text-xs text-white/60 mt-1">
                <span className="text-green-400">↑ 12%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A2B3C] border-white/10">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white/60">Tokens Used</CardTitle>
                <Zap className="w-4 h-4 text-[#7B4FD4]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#7B4FD4]">215K</div>
              <p className="text-xs text-white/60 mt-1">
                <span className="text-green-400">↑ 8%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A2B3C] border-white/10">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white/60">Active Models</CardTitle>
                <TrendingUp className="w-4 h-4 text-[#06b6d4]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#06b6d4]">3</div>
              <p className="text-xs text-white/60 mt-1">Gemini, Llama, GPT-4o</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A2B3C] border-white/10">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white/60">Conversations</CardTitle>
                <MessageSquare className="w-4 h-4 text-[#14b8a6]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#14b8a6]">28</div>
              <p className="text-xs text-white/60 mt-1">
                <span className="text-green-400">↑ 5</span> new this week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Usage Chart */}
        <Card className="bg-[#1A2B3C] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Daily Requests per Model</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.6)" />
                <YAxis stroke="rgba(255,255,255,0.6)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A2B3C",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend />
                <Bar dataKey="claude" fill="#FF6B35" name="Gemini 2.0" />
                <Bar dataKey="gemini" fill="#4285F4" name="Llama 3.3" />
                <Bar dataKey="gpt4o" fill="#10A37F" name="GPT-4o" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quota Status Table */}
          <Card className="bg-[#1A2B3C] border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Quota Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quotaStatus.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 bg-[#0D1B2A] rounded-lg border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white">{item.model}</h4>
                      <Badge
                        className={
                          item.status === "active"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        }
                      >
                        {item.status === "active" ? (
                          <Check className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertCircle className="w-3 h-3 mr-1" />
                        )}
                        {item.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-white/60">RPM</p>
                        <p className="font-medium text-white mt-1">{item.rpm}</p>
                      </div>
                      <div>
                        <p className="text-white/60">RPD</p>
                        <p className="font-medium text-white mt-1">{item.rpd}</p>
                      </div>
                      <div>
                        <p className="text-white/60">TPM</p>
                        <p className="font-medium text-white mt-1">{item.tpm}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Conversations */}
          <Card className="bg-[#1A2B3C] border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Recent Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentConversations.map((conv, index) => (
                  <div
                    key={index}
                    className="p-4 bg-[#0D1B2A] rounded-lg border border-white/10 hover:border-[#00B4CC]/30 transition-colors cursor-pointer"
                  >
                    <h4 className="font-medium text-white mb-2">{conv.title}</h4>
                    <div className="flex items-center justify-between text-sm text-white/60">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-[#7B4FD4]/20 text-[#7B4FD4] border-[#7B4FD4]/30 text-xs">
                          {conv.model}
                        </Badge>
                        <span>{conv.tokens} tokens</span>
                      </div>
                      <span>{conv.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}