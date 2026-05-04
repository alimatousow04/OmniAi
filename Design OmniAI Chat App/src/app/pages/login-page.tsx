import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";
import { motion } from "motion/react";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/app");
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
          {/* Logo - 3D Swirling Orb */}
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(135deg, #00B4CC 0%, #7B4FD4 100%)",
                filter: "blur(20px)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="relative w-full h-full rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #00B4CC 0%, #7B4FD4 100%)",
                boxShadow: "0 0 60px rgba(0, 180, 204, 0.4)",
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
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
          onSubmit={handleSignIn}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="bg-[#1A2B3C] border-[#00B4CC]/30 text-white placeholder:text-white/40 focus:border-[#00B4CC] focus:ring-[#00B4CC]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-[#1A2B3C] border-[#00B4CC]/30 text-white placeholder:text-white/40 focus:border-[#00B4CC] focus:ring-[#00B4CC]"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#00B4CC] hover:bg-[#00B4CC]/90 text-white rounded-lg h-11"
          >
            Sign In
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10 rounded-lg h-11"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </Button>
        </motion.form>
      </div>
    </div>
  );
}
