"use client";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import Keyboard3D from "@/components/Keyboard3D";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Trophy, Medal, ExternalLink } from "lucide-react";
import Internships from "@/components/Internships";
import Achievements from "@/components/Achievements";

export default function Home() {
  return (
    <main className="min-h-screen bg-grid-pattern relative text-gray-800 font-sans">
      
      {/* Tombol Admin Rahasia di Kanan Atas */}
      <Link href="/admin/login" className="absolute top-6 right-6 z-50 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-green-700 border border-green-200 hover:bg-green-600 hover:text-white transition-all">
        Admin Panel 🔒
      </Link>

      {/* SECTION 1: HERO (Keyboard Kiri, Profil Kanan) */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[90vh]">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          <Keyboard3D />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
          <div className="w-32 h-32 rounded-3xl border-4 border-green-500 overflow-hidden shadow-2xl shadow-green-200">
            <img src="https://ui-avatars.com/api/?name=Jeni+Us&background=22c55e&color=fff&size=200" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight bg-white/70 px-4 py-2 inline-block rounded-2xl border border-green-200">
            Hai, Saya <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-700">JONATHAN BRIANT WIJAYA</span>
          </h1>
          <h2 className="text-2xl font-bold text-green-700 bg-white/60 w-max px-4 py-1 rounded-lg">Junior Full Stack Engineer</h2>
          <p className="text-lg text-gray-600 leading-relaxed bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-l-4 border-green-500 shadow-sm">
            Saya mengubah ide *out-of-the-box* menjadi arsitektur kode yang estetik, rapi, dan *scalable*. Berpengalaman merajut *Frontend* interaktif hingga *Backend* tangguh.
          </p>
        </motion.div>
      </section>

      {/* SECTION 2: PROJECT SHOWCASE (Animasi Card) */}
      <section className="py-20 bg-white/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black text-gray-900">Mahakarya <span className="text-green-600">Project</span></h3>
            <p className="text-gray-500 mt-3">Beberapa project sistem yang telah saya bangun dengan performa tinggi.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, i) => (
              <motion.div key={item} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} viewport={{ once: true }} className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                <div className="h-48 bg-gray-200 overflow-hidden relative">
                  <div className="absolute inset-0 bg-green-500/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={`https://picsum.photos/seed/${item}/600/400`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">E-Commerce Platform {item}</h4>
                  <p className="text-gray-500 text-sm mb-4">Membangun sistem e-commerce berskala besar menggunakan Next.js dan Golang.</p>
                  <div className="flex gap-2 text-xs font-bold text-green-700">
                    <span className="bg-green-100 px-3 py-1 rounded-full">Next.js</span>
                    <span className="bg-green-100 px-3 py-1 rounded-full">PostgreSQL</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PRESTASI & PENGHARGAAN (Carousel / Grid 2 Bagian) */}
      <Achievements />

      {/* SECTION 4: MAGANG (Marquee) */}
      <Internships />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}