import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Switch } from "../components/ui/switch";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Eye, EyeOff, Save } from "lucide-react";

function decodeToken(token: string | null) {
  if (!token) return {} as Record<string, string>;
  try {
    return JSON.parse(decodeURIComponent(escape(atob(token.split('.')[1])))) as Record<string, string>;
  } catch {
    return {} as Record<string, string>;
  }
}

export function SettingsPage() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  function handleDarkModeChange(checked: boolean) {
    setDarkMode(checked);
    document.documentElement.classList.toggle('dark', checked);
    localStorage.setItem('theme', checked ? 'dark' : 'light');
  }

  const [profile, setProfile] = useState(() => {
    const payload = decodeToken(localStorage.getItem('omni_token'));
    return {
      firstName: payload.prenom ?? '',
      lastName: '',
      email: payload.email ?? '',
      company: '',
    };
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  async function handleSave() {
    const token = localStorage.getItem('omni_token');
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prenom: profile.firstName, email: profile.email }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Erreur serveur');
        return;
      }
      const data = await res.json();
      localStorage.setItem('omni_token', data.token);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError('Impossible de contacter le serveur');
    }
  }

  const [showApiKeys, setShowApiKeys] = useState({
    claude: false,
    gemini: false,
    openai: false,
  });

  return (
    <div className="h-screen overflow-y-auto bg-[#0D1B2A]">
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-white/60">Manage your account and preferences</p>
        </div>

        {/* Profile Section */}
        <Card className="bg-[#1A2B3C] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Profile</CardTitle>
            <CardDescription className="text-white/60">
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                className="bg-[#0D1B2A] border-white/10 text-white hover:bg-white/5"
              >
                Change Avatar
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="bg-[#0D1B2A] border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="bg-[#0D1B2A] border-white/10 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="bg-[#0D1B2A] border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-white">
                Company
              </Label>
              <Input
                id="company"
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                className="bg-[#0D1B2A] border-white/10 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Models & API Keys */}
        <Card className="bg-[#1A2B3C] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Models & API Keys</CardTitle>
            <CardDescription className="text-white/60">
              Configure your AI model API keys
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Claude API Key */}
            <div className="space-y-2">
              <Label htmlFor="claude-key" className="text-white">
                Google (Gemini 2.0) API Key
              </Label>
              <div className="relative">
                <Input
                  id="claude-key"
                  type={showApiKeys.claude ? "text" : "password"}
                  defaultValue="sk-ant-api03-XXXXXXXXXXXXXXXXXXXX"
                  className="bg-[#0D1B2A] border-white/10 text-white pr-10"
                />
                <button
                  onClick={() =>
                    setShowApiKeys({ ...showApiKeys, claude: !showApiKeys.claude })
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showApiKeys.claude ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Gemini API Key */}
            <div className="space-y-2">
              <Label htmlFor="gemini-key" className="text-white">
                Meta (Llama 3.3) API Key
              </Label>
              <div className="relative">
                <Input
                  id="gemini-key"
                  type={showApiKeys.gemini ? "text" : "password"}
                  defaultValue="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  className="bg-[#0D1B2A] border-white/10 text-white pr-10"
                />
                <button
                  onClick={() =>
                    setShowApiKeys({ ...showApiKeys, gemini: !showApiKeys.gemini })
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showApiKeys.gemini ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* OpenAI API Key */}
            <div className="space-y-2">
              <Label htmlFor="openai-key" className="text-white">
                OpenAI (GPT-4o) API Key
              </Label>
              <div className="relative">
                <Input
                  id="openai-key"
                  type={showApiKeys.openai ? "text" : "password"}
                  defaultValue="sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  className="bg-[#0D1B2A] border-white/10 text-white pr-10"
                />
                <button
                  onClick={() =>
                    setShowApiKeys({ ...showApiKeys, openai: !showApiKeys.openai })
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showApiKeys.openai ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="bg-[#1A2B3C] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Appearance</CardTitle>
            <CardDescription className="text-white/60">
              Customize how OmniAI looks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode" className="text-white">
                  Dark Mode
                </Label>
                <p className="text-sm text-white/60 mt-1">
                  Use dark theme across the application
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={handleDarkModeChange}
              />
            </div>

            <Separator className="bg-white/10" />

            <div className="space-y-2">
              <Label htmlFor="language" className="text-white">
                Language
              </Label>
              <Select defaultValue="en">
                <SelectTrigger className="bg-[#0D1B2A] border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A2B3C] border-white/10">
                  <SelectItem value="en">🇬🇧 English</SelectItem>
                  <SelectItem value="fr">🇫🇷 French</SelectItem>
                  <SelectItem value="es">🇪🇸 Spanish</SelectItem>
                  <SelectItem value="de">🇩🇪 German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-[#1A2B3C] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Notifications</CardTitle>
            <CardDescription className="text-white/60">
              Manage your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifs" className="text-white">
                  Email Notifications
                </Label>
                <p className="text-sm text-white/60 mt-1">
                  Receive updates via email
                </p>
              </div>
              <Switch id="email-notifs" defaultChecked />
            </div>

            <Separator className="bg-white/10" />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="quota-alerts" className="text-white">
                  Quota Alerts
                </Label>
                <p className="text-sm text-white/60 mt-1">
                  Alert when approaching quota limits
                </p>
              </div>
              <Switch id="quota-alerts" defaultChecked />
            </div>

            <Separator className="bg-white/10" />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weekly-summary" className="text-white">
                  Weekly Summary
                </Label>
                <p className="text-sm text-white/60 mt-1">
                  Receive weekly usage reports
                </p>
              </div>
              <Switch id="weekly-summary" />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-4">
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button onClick={handleSave} className="bg-[#00B4CC] hover:bg-[#00B4CC]/90 text-white px-8">
            <Save className="w-4 h-4 mr-2" />
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}