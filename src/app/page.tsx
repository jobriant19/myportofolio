"use client";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import Keyboard3D from "@/components/Keyboard3D";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Trophy, Medal, ExternalLink } from "lucide-react";

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
          <h2 className="text-2xl font-bold text-green-700 bg-white/60 w-max px-4 py-1 rounded-lg">Senior Full Stack Engineer</h2>
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
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-black text-gray-900">Pencapaian & <span className="text-green-600">Prestasi</span></h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Bagian 1: Piagam */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white p-8 rounded-3xl shadow-xl border border-green-100 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 text-green-100"><Trophy size={150} /></div>
            <h4 className="text-2xl font-bold flex items-center gap-3 mb-6 relative z-10"><Trophy className="text-yellow-500"/> Juara 1 Hackathon Nasional</h4>
            <p className="text-gray-600 mb-6 relative z-10">Berhasil mengembangkan aplikasi pendeteksi penyakit tanaman berbasis AI dalam waktu 24 jam mengalahkan 500+ peserta.</p>
            <img src="https://picsum.photos/seed/sertif/600/400" className="w-full rounded-xl shadow-md border border-gray-200" />
          </motion.div>

          {/* Bagian 2: Medali / Piala */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white p-8 rounded-3xl shadow-xl border border-green-100 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 text-green-100"><Medal size={150} /></div>
            <h4 className="text-2xl font-bold flex items-center gap-3 mb-6 relative z-10"><Medal className="text-blue-500"/> Google Student Ambassador</h4>
            <p className="text-gray-600 mb-6 relative z-10">Terpilih menjadi perwakilan resmi Google untuk mengkampanyekan teknologi Web & Cloud kepada 10.000+ mahasiswa.</p>
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <img src="https://picsum.photos/seed/piala1/300/300" className="w-full rounded-xl shadow-md" />
              <img src="https://picsum.photos/seed/piala2/300/300" className="w-full rounded-xl shadow-md" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: MAGANG (Marquee Gambar 3 SantriKoding) */}
      <section className="py-20 bg-white/80 border-y border-green-100">
        <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
          <h3 className="text-2xl font-bold uppercase tracking-widest text-gray-900">TELAH DIPERCAYA OLEH</h3>
          <p className="text-gray-500 mt-2">Daftar perusahaan tempat magang dan kolaborasi profesional.</p>
        </div>
        
        <Marquee speed={50} gradient={true} gradientColor="rgba(255, 255, 255, 0.9)" pauseOnHover direction="left" className="py-4">
          {[
            { name: "PT Telkom Indonesia", role: "Backend Intern", img: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Telkom_Indonesia_2013.svg" },
            { name: "Pertamina", role: "Data Engineer Intern", img: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Logo_Pertamina_%28Kementerian_BUMN%29.svg" },
            { name: "Kemenkes RI", role: "Fullstack Dev", img: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Logo_Kementerian_Kesehatan_RI.svg" },
            { name: "Universitas Indonesia", role: "IT Consultant", img: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Makara_of_Universitas_Indonesia.svg" }
          ].map((item, i) => (
            <div key={i} className="mx-4 bg-white border border-gray-200 shadow-sm rounded-2xl p-4 w-[320px] h-[100px] flex items-center gap-4 hover:shadow-xl hover:border-green-300 transition-all cursor-pointer">
              <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center p-2 bg-gray-50 rounded-lg">
                <img src={item.img} alt={item.name} className="max-w-full max-h-full object-contain" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                <p className="text-xs text-green-600 font-semibold">{item.role}</p>
              </div>
            </div>
          ))}
        </Marquee>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}