import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { Briefcase } from 'lucide-react';

const internships = [
  {
    id: 1,
    company: 'Google Indonesia',
    role: 'Frontend Engineering Intern',
    period: 'Jan 2025 - Jul 2025',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    desc: 'Mengembangkan antarmuka Google Workspace dengan performa tinggi menggunakan React dan modern CSS.',
  },
  {
    id: 2,
    company: 'Gojek',
    role: 'Backend Developer Intern',
    period: 'Aug 2025 - Dec 2025',
    logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    desc: 'Membangun API gateway tersentralisasi dengan Go Lang dan Dockerisasi microservices yang scalable.',
  },
  {
    id: 3,
    company: 'Tokopedia',
    role: 'Full Stack Web Intern',
    period: 'Mar 2024 - Sep 2024',
    logo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    desc: 'Optimasi rendering sisi server (SSR) pada halaman produk utama menggunakan Next.js dan Tailwind CSS.',
  },
  {
    id: 4,
    company: 'Traveloka',
    role: 'UI/UX & Frontend Intern',
    period: 'Jul 2023 - Jan 2024',
    logo: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    desc: 'Meningkatkan User Experience pada sistem pemesanan tiket pesawat dengan implementasi Framer Motion.',
  }
];

export default function Internships() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900 inline-block relative">
          Internship <span className="text-green-600">Experience</span>
          <div className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-green-500 rounded"></div>
        </h2>
        <p className="mt-4 text-gray-500">Trusted by top tech companies where I contributed to real-world projects.</p>
      </div>

      <div className="relative w-full">
        {/* Marquee Container (Ke arah kanan) */}
        <Marquee 
          direction="right" 
          speed={60} 
          pauseOnHover={true}
          gradient={true}
          gradientColor="white"
          gradientWidth={100}
        >
          <div className="flex gap-6 py-4 pl-6">
            {internships.map((intern) => (
              <div 
                key={intern.id}
                className="w-[450px] bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 flex gap-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Kiri: Logo Perusahaan */}
                <div className="flex-shrink-0 relative">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50 flex items-center justify-center">
                    <img src={intern.logo} alt={intern.company} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 shadow-md border-2 border-white">
                    <Briefcase className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Kanan: Penjelasan */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-500">{intern.period}</span>
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">
                      {intern.role}
                    </h3>
                    <span className="text-md font-medium text-green-600">@ {intern.company}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mt-2">
                    {intern.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}