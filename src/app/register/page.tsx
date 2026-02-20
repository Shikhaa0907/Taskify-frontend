"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, Mail, Lock, UserPlus, Loader2, ShieldCheck } from "lucide-react";
import api from "@/services/api";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    try {
       await api.post("/auth/register", { email, password });
      // Simulating a successful registration delay
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch {
      alert("Registration failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 flex justify-center items-center font-sans relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />

      {/* 🔙 Back to Home */}
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-white transition-all group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold tracking-tight">Back to Home</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md px-6 relative z-10"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/30 mb-4">
            <UserPlus className="text-white w-7 h-7" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter">Create Account</h1>
          <p className="text-slate-500 mt-2 text-sm">Join 50,000+ builders scaling their output.</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
          <div className="space-y-5">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
                <input
                  type="email"
                  className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700"
                  placeholder="alex@company.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
                <input
                  type="password"
                  className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700"
                  placeholder="At least 8 characters"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Security Note */}
            <div className="flex items-center gap-2 px-1 py-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <p className="text-[10px] text-slate-500 leading-tight">
                By signing up, you agree to our Terms and Privacy Policy.
              </p>
            </div>

            {/* Register Button */}
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>Get Started — Free Forever</>
              )}
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="text-white font-bold hover:text-blue-400 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Simple Trust Badge */}
        <div className="mt-12 flex justify-center items-center gap-8 opacity-30 grayscale pointer-events-none">
          <div className="text-[10px] font-bold text-white uppercase tracking-widest">SOC2 COMPLIANT</div>
          <div className="text-[10px] font-bold text-white uppercase tracking-widest">GDPR READY</div>
          <div className="text-[10px] font-bold text-white uppercase tracking-widest">256-BIT SSL</div>
        </div>
      </motion.div>
    </div>
  );
}