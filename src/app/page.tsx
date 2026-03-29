"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import Keyboard3D from "@/components/Keyboard3D";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Trophy, Medal, ExternalLink, Loader2 } from "lucide-react";
import Internships from "@/components/Internships";
import Achievements from "@/components/Achievements";
import { supabase } from "@/lib/supabase";

// --- DATA DUMMY (FALLBACK) ---
// Data ini akan muncul jika database Supabase Anda masih kosong
const dummyProfile = {
  name: "JONATHAN BRIANT WIJAYA",
  role: "Junior Full Stack Engineer",
  description: "Saya mengubah ide *out-of-the-box* menjadi arsitektur kode yang estetik, rapi, dan *scalable*. Berpengalaman merajut *Frontend* interaktif hingga *Backend* tangguh.",
  avatar_url: "https://ui-avatars.com/api/?name=Jeni+Us&background=22c55e&color=fff&size=200"
};

const dummyProjects = [
  { id: '1', title: "E-Commerce Platform 1", description: "Membangun sistem e-commerce berskala besar menggunakan Next.js dan Golang.", image_url: "https://picsum.photos/seed/1/600/400", tech_stack: "Next.js, PostgreSQL" },
  { id: '2', title: "E-Commerce Platform 2", description: "Membangun sistem e-commerce berskala besar menggunakan Next.js dan Golang.", image_url: "https://picsum.photos/seed/2/600/400", tech_stack: "Next.js, PostgreSQL" },
  { id: '3', title: "E-Commerce Platform 3", description: "Membangun sistem e-commerce berskala besar menggunakan Next.js dan Golang.", image_url: "https://picsum.photos/seed/3/600/400", tech_stack: "Next.js, PostgreSQL" },
];

export default function Home() {
  // State untuk menyimpan data dari Supabase
  const [profile, setProfile] = useState(dummyProfile);
  const [projects, setProjects] = useState(dummyProjects);
  const [isReady, setIsReady] = useState(false);

  // Mengambil data dari Supabase saat halaman pertama kali dimuat
  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        // 1. Ambil data Profil
        const { data: profData, error: profError } = await supabase
          .from("profile")
          .select("*")
          .eq("id", 1)
          .single();
        
        if (profData && !profError) {
          setProfile(profData);
        }

        // 2. Ambil data Project
        const { data: projData, error: projError } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (projData && projData.length > 0 && !projError) {
          setProjects(projData);
        }
      } catch (error) {
        console.error("Gagal mengambil data, menggunakan data dummy.");
      } finally {
        setIsReady(true); // Tandai bahwa proses pengambilan data selesai
      }
    };

    fetchLandingData();
  }, []);

  return (
    <main className="min-h-screen bg-grid-pattern relative text-gray-800 font-sans overflow-hidden">
      
      {/* Tombol Admin Rahasia di Kanan Atas */}
      <Link href="/admin/login" className="absolute top-4 right-4 md:top-6 md:right-6 z-50 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-green-700 border border-green-200 hover:bg-green-600 hover:text-white transition-all shadow-sm">
        Admin Panel 🔒
      </Link>

      {/* SECTION 1: HERO (Keyboard Kiri, Profil Kanan) */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center min-h-[90vh]">
        
        {/* Gambar / Animasi 3D */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1 }}
          className="order-2 lg:order-1 flex justify-center w-full"
        >
          <div className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-full">
            <Keyboard3D />
          </div>
        </motion.div>

        {/* Teks Profil */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }} 
          className="space-y-5 md:space-y-6 order-1 lg:order-2 text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          {/* Avatar Profile */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl border-4 border-green-500 overflow-hidden shadow-xl shadow-green-200/50 flex-shrink-0">
            <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight bg-white/70 px-4 py-2 inline-block rounded-2xl border border-green-100">
            Hai, Saya <br className="hidden sm:block lg:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-700 leading-normal">
              {profile.name}
            </span>
          </h1>
          
          <h2 className="text-xl md:text-2xl font-bold text-green-700 bg-white/80 w-max px-4 py-1.5 rounded-lg border border-green-50 shadow-sm">
            {profile.role}
          </h2>
          
          <p className="text-base md:text-lg text-gray-600 leading-relaxed bg-white/80 backdrop-blur-sm p-5 md:p-6 rounded-2xl border-l-4 border-green-500 shadow-sm max-w-xl text-left">
            {profile.description}
          </p>
        </motion.div>
      </section>

      {/* SECTION 2: PROJECT SHOWCASE */}
      <section className="py-16 md:py-20 bg-white/60 backdrop-blur-md border-y border-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-3xl md:text-4xl font-black text-gray-900">
              Mahakarya <span className="text-green-600">Project</span>
            </h3>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm md:text-base">
              Beberapa project sistem yang telah saya bangun dengan performa tinggi dan arsitektur yang matang.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, i) => (
              <motion.div 
                key={project.id} 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.15 }} 
                viewport={{ once: true, margin: "-50px" }} 
                className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full"
              >
                <div className="h-48 sm:h-52 bg-gray-100 overflow-hidden relative flex-shrink-0">
                  <div className="absolute inset-0 bg-green-500/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <h4 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{project.title}</h4>
                  <p className="text-gray-500 text-sm mb-5 flex-1 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Badge Tech Stack Dinamis */}
                  <div className="flex flex-wrap gap-2 text-[11px] font-bold text-green-700 mt-auto pt-2 border-t border-gray-50">
                    {project.tech_stack.split(',').map((tech: string, index: number) => (
                      <span key={index} className="bg-green-50 border border-green-100 px-3 py-1 rounded-full whitespace-nowrap">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PRESTASI & PENGHARGAAN */}
      <Achievements />

      {/* SECTION 4: MAGANG */}
      <Internships />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}