"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Logika Supabase (Akan error jika .env belum diisi DB asli, ini normal)
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
        alert("Login Gagal! Pastikan Supabase .env sudah diisi dan akun benar.");
    } else {
        alert("Login Sukses! (Arahkan ke /admin/dashboard)");
        // router.push("/admin/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-grid-pattern flex items-center justify-center relative">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 font-bold text-green-700 hover:text-green-800">
        <ArrowLeft size={20} /> Kembali ke Landing Page
      </Link>

      <div className="bg-white/95 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border-2 border-green-200 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-black text-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-4">JS</div>
          <h2 className="text-3xl font-black text-gray-900">Command Center</h2>
          <p className="text-gray-500 text-sm mt-2">Masuk untuk mengatur konten portofolio</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2">Email Admin</label>
            <input 
              type="email" placeholder="jenius@developer.com" required
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-4 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all bg-gray-50"
              onChange={e => setEmail(e.target.value)} 
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2">Password</label>
            <input 
              type="password" placeholder="••••••••" required
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-4 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all bg-gray-50"
              onChange={e => setPassword(e.target.value)} 
            />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-600/30 disabled:opacity-50 mt-4">
            {loading ? "Mengecek Akses..." : "Akses Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}