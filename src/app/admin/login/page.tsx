"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

// --- Komponen Ikon Menggunakan Gambar dari Folder Public ---
const FloatingIcons = () => {
  const icons = [
    // AREA KIRI
    { id: 1, x: "8%", delay: 0, duration: 12, boxSize: "w-[85px] h-[85px]", imgSize: "w-12 h-12", src: "/skills/laravel.png" },
    { id: 3, x: "22%", delay: 8, duration: 14, boxSize: "w-[95px] h-[95px]", imgSize: "w-14 h-14", src: "/skills/next.png" },
    { id: 5, x: "4%", delay: 6, duration: 13, boxSize: "w-[70px] h-[70px]", imgSize: "w-10 h-10", src: "/skills/flutter.png" },
    { id: 6, x: "16%", delay: 12, duration: 10, boxSize: "w-[80px] h-[80px]", imgSize: "w-12 h-12", src: "/skills/go.png" },
    { id: 9, x: "26%", delay: 10, duration: 11, boxSize: "w-[90px] h-[90px]", imgSize: "w-14 h-14", src: "/skills/react.png" },
    { id: 11, x: "12%", delay: 16, duration: 12, boxSize: "w-[75px] h-[75px]", imgSize: "w-10 h-10", src: "/skills/git.png" },
    
    // AREA KANAN
    { id: 2, x: "85%", delay: 3, duration: 10, boxSize: "w-[75px] h-[75px]", imgSize: "w-10 h-10", src: "/skills/vue.png" },
    { id: 4, x: "74%", delay: 1, duration: 11, boxSize: "w-[80px] h-[80px]", imgSize: "w-11 h-11", src: "/skills/livewire.png" },
    { id: 7, x: "92%", delay: 5, duration: 12, boxSize: "w-[85px] h-[85px]", imgSize: "w-12 h-12", src: "/skills/typescript.png" },
    { id: 8, x: "78%", delay: 14, duration: 13, boxSize: "w-[75px] h-[75px]", imgSize: "w-10 h-10", src: "/skills/js.png" },
    { id: 10, x: "88%", delay: 2, duration: 15, boxSize: "w-[85px] h-[85px]", imgSize: "w-12 h-12", src: "/skills/python.png" },
  ];

  return (
    // Dihapus hidden lg:block agar animasi tetap berjalan di Mobile (lewat belakang form)
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          className={`absolute bottom-[-150px] bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center justify-center ${icon.boxSize}`}
          style={{ left: icon.x }}
          animate={{ y: ["0vh", "-120vh"] }}
          transition={{
            duration: icon.duration,
            repeat: Infinity,
            delay: icon.delay,
            ease: "linear",
          }}
        >
          <img 
            src={icon.src} 
            alt={`skill-${icon.id}`} 
            className={`object-contain ${icon.imgSize}`} 
          />
        </motion.div>
      ))}
    </div>
  );
};

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
        setErrorMsg("Email atau Password salah! Pastikan Anda sudah membuat akun di dashboard Supabase.");
        setLoading(false);
    } else {
        router.push("/admin/dashboard");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative bg-[#F8FAFC] overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)',
        backgroundSize: '48px 48px'
      }}
    >
      <FloatingIcons />

      <Link 
        href="/" 
        className="absolute top-6 left-5 sm:top-8 sm:left-8 flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full shadow-sm text-xs sm:text-sm font-bold text-gray-600 hover:text-emerald-600 hover:border-emerald-300 hover:shadow-md transition-all z-50"
      >
        <ArrowLeft size={18} /> Kembali
      </Link>

      {/* Form Card z-10 memastikan form ada di depan animasi ikon */}
      <div className="bg-white/95 backdrop-blur-2xl p-8 sm:p-10 mx-5 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="bg-gray-900 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-5 shadow-lg shadow-gray-900/20">
            JOSI
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Command Center</h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-2 font-medium">Masuk untuk mengatur konten portofolio</p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-bold rounded-2xl text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2.5">Email Admin</label>
            <input 
              type="email" 
              placeholder="Contoh: admin@portofolio.com" 
              required
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-gray-50/50 text-gray-900 font-medium placeholder:text-gray-400"
              onChange={e => setEmail(e.target.value)} 
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2.5">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              required
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-gray-50/50 text-gray-900 font-medium placeholder:text-gray-400"
              onChange={e => setPassword(e.target.value)} 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/30 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 mt-2 text-base sm:text-lg flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="animate-spin" size={20} /> Memverifikasi...</> : "Login Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}