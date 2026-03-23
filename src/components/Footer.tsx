import { MapPin, Facebook, Instagram, Twitter, Linkedin, Github, Youtube, Send, Terminal } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#f3f4f6]">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
        
        {/* Left Side */}
        <div className="flex flex-col gap-6 pr-8 border-r-0 lg:border-r border-gray-300">
          <div className="flex items-center gap-3">
            <Terminal size={32} className="text-black" />
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 uppercase">Jonathan<span className="text-green-600">Briant</span></h2>
          </div>
          <p className="text-gray-600 leading-relaxed max-w-sm">
            A passionate Full Stack Developer building robust web applications and interactive experiences from junior to senior levels.
          </p>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin size={18} />
            <span>Purwokerto, Indonesia 53144</span>
          </div>

          <div className="flex flex-wrap gap-3 mt-2">
            {[ 
              { icon: Facebook, bg: "bg-white", text: "text-blue-600" },
              { icon: Terminal, bg: "bg-white", text: "text-black" }, // Threads
              { icon: Instagram, bg: "bg-white", text: "text-pink-600" },
              { icon: Twitter, bg: "bg-white", text: "text-blue-400" },
              { icon: Send, bg: "bg-white", text: "text-blue-500" }, // Telegram
              { icon: Github, bg: "bg-white", text: "text-gray-900" },
              { icon: Youtube, bg: "bg-white", text: "text-red-600" },
              { icon: Linkedin, bg: "bg-white", text: "text-blue-700" }
            ].map((social, idx) => (
              <a key={idx} href="#" className={`w-10 h-10 flex items-center justify-center rounded-xl shadow-sm hover:shadow-md transition ${social.bg} ${social.text}`}>
                <social.icon size={20} />
              </a>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 w-max mt-4">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-700 font-medium">All Systems Operational</span>
          </div>
        </div>

        {/* Right Side Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-gray-700">
          {/* Col 1 */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-gray-900 border-b border-gray-200 pb-3 mb-2">NAVIGATION</h3>
            {['Home', 'About Me', 'Projects', 'Achievements', 'Internships', 'Contact'].map((item, idx) => (
              <a key={idx} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-green-600 transition">{item}</a>
            ))}
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-gray-900 border-b border-gray-200 pb-3 mb-2">TECH STACK</h3>
            {['Frontend Development', 'Backend Engineering', 'Cloud Infrastructure', 'DevOps & Docker', 'Mobile App (Flutter)', 'Database Design'].map((item, idx) => (
              <a key={idx} href="#" className="hover:text-green-600 transition">{item}</a>
            ))}
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-gray-900 border-b border-gray-200 pb-3 mb-2">RESOURCES</h3>
            {['Resume/CV', 'Blog Articles', 'Snippets', 'Open Source', 'Guestbook', 'Sitemap'].map((item, idx) => (
              <a key={idx} href="#" className="hover:text-green-600 transition">{item}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-[#d1d5db] py-4 text-center text-sm text-gray-600 border-t border-gray-300">
        © 2019 - 2026 Hak Cipta Dilindungi Undang-Undang.
      </div>
    </footer>
  );
};

export default Footer;