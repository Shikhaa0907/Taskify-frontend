"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  CheckCircle2, ShieldCheck, Zap, BarChart3, ArrowRight, 
  Sparkles, Globe, Shield, Star, Users, Briefcase, ChevronDown,
  PlayCircle, MousePointer2, Layout, Cpu
} from "lucide-react";
import { useRef } from "react";

export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 selection:bg-blue-500/30 font-sans relative scroll-smooth">
      
      {/* 1. Ultra-Modern Navbar */}
      <nav className="fixed w-full border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl z-[100]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
              <CheckCircle2 className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">Taskify</span>
          </div>

          <div className="hidden lg:flex items-center justify-center flex-1 gap-10 text-sm font-semibold tracking-wide text-slate-400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <div className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors group">
              Resources <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/login" className="hidden sm:block text-sm font-bold hover:text-white transition-colors">Login</Link>
            <Link
              href="/register"
              className="relative group bg-white text-black px-6 py-2.5 rounded-full text-sm font-black hover:scale-105 transition-all active:scale-95"
            >
              Start Building Free
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section with Parallax */}
      <motion.section 
        ref={targetRef}
        style={{ opacity, scale }}
        className="relative z-10 pt-52 pb-32 flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        <div className="absolute top-20 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
        
      

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter text-center mb-8"
        >
          Work at the speed <br /> of <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">thought.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-slate-400 mb-12 text-center max-w-2xl leading-relaxed"
        >
          Taskify unifies your projects, docs, and team into one lightning-fast 
          workspace. Experience productivity without the friction.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-wrap justify-center gap-6">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 shadow-2xl shadow-blue-600/30 transition-all hover:-translate-y-1">
            Get Started Free <ArrowRight className="w-5 h-5" />
          </button>
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-10 py-5 rounded-2xl font-bold flex items-center gap-3 transition-all">
            <PlayCircle className="w-5 h-5" /> View Demo
          </button>
        </motion.div>
      </motion.section>

      {/* 3. Infinite Moving Logo Ribbon */}
      <section className="relative z-10 py-20 border-y border-white/5 bg-black/20 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <motion.div 
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-20 items-center px-10"
          >
            {/* Double the logos for seamless loop */}
            {[1,2,3,4,5,6,1,2,3,4,5,6].map((i) => (
              <div key={i} className="flex items-center gap-3 grayscale opacity-30 hover:opacity-100 transition-opacity cursor-pointer">
                <div className="w-8 h-8 bg-white/20 rounded-md" />
                <span className="text-xl font-bold tracking-widest text-white">COMPANY {i}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Bento Grid Features */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-white mb-4 tracking-tight">Supercharge your output</h2>
          <p className="text-slate-400">Everything you need, nothing you don't.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <BentoCard 
            className="md:col-span-3 h-[400px]"
            icon={<Cpu className="text-blue-400" />}
            title="AI Task Automation"
            desc="Let our engine prioritize your day based on deadlines and team bandwidth."
          />
          <BentoCard 
            className="md:col-span-3 h-[400px]"
            icon={<Globe className="text-indigo-400" />}
            title="Global Sync"
            desc="Collaborate across timezones with zero-latency data reflection."
          />
          <BentoCard 
            className="md:col-span-2 h-[300px]"
            icon={<Shield className="text-emerald-400" />}
            title="Vault Security"
            desc="Military-grade encryption for every document."
          />
          <BentoCard 
            className="md:col-span-4 h-[300px]"
            icon={<Layout className="text-purple-400" />}
            title="Custom Views"
            desc="Switch between Kanban, List, Gantt, and Calendar in a single tap."
          />
        </div>
      </section>

      {/* 5. Interactive How It Works */}
      <section id="how-it-works" className="py-32 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-black text-white mb-12 leading-tight">Complex work, <br /> made <span className="text-blue-500 underline decoration-blue-500/30">simple.</span></h2>
              <div className="space-y-8">
                <ProcessStep num="01" title="Onboard your team" desc="Sync with Slack or Microsoft Teams in 30 seconds." />
                <ProcessStep num="02" title="Define the roadmap" desc="Set milestones and let Taskify map the dependencies." />
                <ProcessStep num="03" title="Execute & Optimize" desc="Hit targets and use AI insights to improve next sprint." />
              </div>
            </div>
            <div className="relative group">
               <div className="absolute -inset-4 bg-blue-600/20 rounded-[3rem] blur-2xl group-hover:bg-blue-600/30 transition-all" />
               <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60" alt="Dashboard Preview"   className="relative rounded-[2rem] border border-white/10 shadow-2xl"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-white">Taskify</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 Taskify Inc. Built with passion for builders.</p>
        </div>
      </footer>
    </div>
  );
}

// Custom High-End Components
function BentoCard({ className, icon, title, desc }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`${className} group relative overflow-hidden p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-blue-500/50 transition-all`}
    >
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 transition-opacity">
        <MousePointer2 className="w-12 h-12 text-blue-500" />
      </div>
      <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function ProcessStep({ num, title, desc }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="flex gap-6 group cursor-default"
    >
      <span className="text-sm font-black text-blue-500 py-1">{num}</span>
      <div>
        <h4 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{title}</h4>
        <p className="text-slate-500 text-sm">{desc}</p>
      </div>
    </motion.div>
  );
}