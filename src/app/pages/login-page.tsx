import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";
import { motion } from "motion/react";

type Mode = "login" | "register";

export function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const endpoint =
      mode === "login"
        ? `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/auth/login`
        : `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/auth/register`;

    const body =
      mode === "login"
        ? { email, password }
        : { prenom, email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Une erreur est survenue");
        return;
      }

      localStorage.setItem("omni_token", data.token);
      navigate("/app");
    } catch {
      setError("Impossible de contacter le serveur");
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode((m) => (m === "login" ? "register" : "login"));
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center relative overflow-hidden">
      {/* Animated neural network background */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00B4CC] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          {/* Logo */}
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(135deg, #00B4CC 0%, #7B4FD4 100%)",
                filter: "blur(20px)",
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="relative w-full h-full rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #00B4CC 0%, #7B4FD4 100%)",
                boxShadow: "0 0 60px rgba(0, 180, 204, 0.4)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-20 h-20 rounded-full bg-[#0D1B2A] flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00B4CC] to-[#7B4FD4]" />
              </div>
            </motion.div>
          </div>

          <h1 className="text-4xl font-bold text-white mb-2">OmniAI</h1>
          <p className="text-[#00B4CC]">Your unified AI workspace</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="prenom" className="text-white">
                Prénom
              </Label>
              <Input
                id="prenom"
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                placeholder="Votre prénom"
                className="bg-[#1A2B3C] border-[#00B4CC]/30 text-white placeholder:text-white/40 focus:border-[#00B4CC] focus:ring-[#00B4CC]"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="bg-[#1A2B3C] border-[#00B4CC]/30 text-white placeholder:text-white/40 focus:border-[#00B4CC] focus:ring-[#00B4CC]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Mot de passe
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-[#1A2B3C] border-[#00B4CC]/30 text-white placeholder:text-white/40 focus:border-[#00B4CC] focus:ring-[#00B4CC]"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00B4CC] hover:bg-[#00B4CC]/90 text-white rounded-lg h-11 disabled:opacity-50"
          >
            {isLoading
              ? "Chargement…"
              : mode === "login"
              ? "Se connecter"
              : "Créer un compte"}
          </Button>

          <p className="text-center text-sm text-white/50">
            {mode === "login" ? "Pas encore de compte ?" : "Déjà un compte ?"}{" "}
            <button
              type="button"
              onClick={switchMode}
              className="text-[#00B4CC] hover:underline"
            >
              {mode === "login" ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </motion.form>
      </div>
    </div>
  );
}
