import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import { Award, FileText, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase'; // Sesuaikan path jika letak file supabase Anda berbeda

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

interface Achievement {
  id: string;
  title: string;
  description: string;
  certUrl: string;
  medalUrl: string;
}

// Data dummy asli milik Anda (akan muncul jika database Supabase kosong)
const defaultAchievements: Achievement[] = [
  { 
    id: '1', 
    title: 'National Web Design Champion', 
    description: 'Awarded first place at the National Web Competition 2025 for exceptional UX/UI and backend architecture.', 
    certUrl: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=400&h=300&fit=crop', 
    medalUrl: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=300&h=300&fit=crop' 
  },
  { 
    id: '2', 
    title: 'Top 10 HackerRank Global', 
    description: 'Achieved a global rank inside top 10 for algorithm optimization challenge.', 
    certUrl: 'https://images.unsplash.com/photo-1523289217630-0dd16184af8e?w=400&h=300&fit=crop', 
    medalUrl: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ceb?w=300&h=300&fit=crop' 
  },
  { 
    id: '3', 
    title: 'Google Code Jam Finalist', 
    description: 'Selected among top 50 competitors globally.', 
    certUrl: 'https://images.unsplash.com/photo-1584697964400-2af6a2f6204c?w=400&h=300&fit=crop', 
    medalUrl: 'https://images.unsplash.com/photo-1563821010360-153b68832a76?w=300&h=300&fit=crop' 
  },
];

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  // Mengambil data dari database portofolio di Supabase
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const { data, error } = await supabase
          .from('achievements')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Cek apakah data dari Supabase ada isinya
        if (data && data.length > 0) {
          const formattedData = data.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            certUrl: item.cert_url,
            medalUrl: item.medal_url,
          }));
          setAchievements(formattedData);
        } else {
          // Jika tidak ada data di Supabase, gunakan dummy
          setAchievements(defaultAchievements);
        }
      } catch (error) {
        console.error('Error fetching achievements:', error);
        // Jika terjadi error koneksi, fallback ke dummy
        setAchievements(defaultAchievements);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  // Tampilan saat data sedang diambil
  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 bg-white min-h-[50vh]">
        <Loader2 className="w-10 h-10 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <section className="py-8 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Honors & Awards</h2>
          <div className="w-24 h-1.5 bg-green-500 mx-auto rounded-full" />
        </div>

        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={achievements.length > 1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 250,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="w-full pb-16"
          style={{ padding: '40px 0 80px 0' }}
        >
          {achievements.map((item) => (
            <SwiperSlide key={item.id} className="max-w-3xl">
              <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] border border-gray-100 overflow-hidden mx-4">
                <div className="flex flex-col md:flex-row h-full">
                  
                  {/* Bagian Certificate */}
                  <div className="md:w-3/5 relative bg-gray-50 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
                    {/* Tulisan Certificate dirapikan */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-gray-700 shadow-md ring-1 ring-gray-900/5 uppercase tracking-wider z-10">
                      <FileText size={14} className="text-green-500" /> Certificate
                    </div>
                    <img 
                      src={item.certUrl} 
                      alt={`Certificate - ${item.title}`} 
                      className="w-full h-auto max-h-[300px] object-contain rounded-xl shadow-sm border-2 border-white bg-white" 
                    />
                  </div>
                  
                  {/* Bagian Medal/Trophy */}
                  <div className="md:w-2/5 relative bg-gradient-to-br from-green-50 to-emerald-100 p-8 flex flex-col items-center justify-center text-center">
                    {/* Tulisan Medal dirapikan */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-gray-700 shadow-md ring-1 ring-gray-900/5 uppercase tracking-wider z-10">
                      <Award size={14} className="text-yellow-500" /> Medal
                    </div>
                    
                    <div className="relative w-32 h-32 mb-6 mt-4">
                      <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-30 rounded-full animate-pulse" />
                      <img 
                        src={item.medalUrl} 
                        alt={`Medal - ${item.title}`} 
                        className="w-full h-full object-cover rounded-full shadow-xl border-4 border-white relative z-10 bg-white" 
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-sm font-medium leading-relaxed line-clamp-4">
                      {item.description}
                    </p>
                  </div>
                  
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}