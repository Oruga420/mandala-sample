import React from 'react';
import { Menu, Facebook, Instagram, Twitter, Mail, CreditCard } from 'lucide-react';

const NavLink = ({ text }: { text: string }) => (
  <a href="#" className="text-xs tracking-widest hover:text-orange-500 transition-colors uppercase font-bold text-gray-300">
    {text}
  </a>
);

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
      <div className="flex items-center gap-1">
        <span className="font-orbitron text-2xl font-bold tracking-tighter">MANDALA</span>
        <span className="bg-white text-black px-1 text-xs font-bold transform -skew-x-12 ml-1">Tickets</span>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <NavLink text="Clubes de Playa" />
        <NavLink text="Clubes" />
        <NavLink text="Eventos" />
        <NavLink text="Mas Info" />
        <NavLink text="Asociaciones" />
      </nav>

      <div className="flex items-center gap-4">
        <button className="hidden md:block border border-white/30 px-6 py-2 text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-all">
          BOOK NOW
        </button>
        <button className="md:hidden">
            <Menu className="w-8 h-8" />
        </button>
      </div>
    </header>
  );
};

export const HeroText = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative pointer-events-none">
      <div className="relative z-10 text-center flex flex-col items-center">
        {/* Massive Typography */}
        <h1 className="font-orbitron text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-gray-100 to-gray-400 drop-shadow-2xl">
          SPRING<br />
          <span className="text-gray-300">SOUNDS</span>
        </h1>
        
        {/* Date and Year flanking the sphere (visually) */}
        <div className="mt-[35vh] md:mt-[40vh] w-full max-w-4xl flex justify-between items-center px-8 md:px-0 font-orbitron text-2xl md:text-4xl font-bold tracking-widest mix-blend-overlay">
          <span>MARCH</span>
          <span>2026</span>
        </div>

        <button className="mt-16 pointer-events-auto bg-[#6e3612] bg-opacity-80 hover:bg-[#d94f06] border border-orange-500/50 text-white px-12 py-3 font-orbitron font-bold tracking-widest text-lg transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(217,79,6,0.4)]">
          BOOK NOW
        </button>
      </div>
    </div>
  );
};

interface EventCardProps {
  title: string;
  date: string;
  img: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, date, img }) => (
  <div className="group relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all duration-500">
    <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
    
    <div className="absolute bottom-0 left-0 w-full p-6">
      <h3 className="font-orbitron text-2xl font-bold mb-1 group-hover:text-orange-400 transition-colors">{title}</h3>
      <p className="text-xs tracking-widest text-gray-400 mb-4 uppercase">House Music</p>
      <p className="font-orbitron text-lg font-bold text-white border-t border-white/20 pt-4">{date}</p>
    </div>
  </div>
);

export const EventSection = () => {
  const events = [
    { title: "XANDRA", date: "20 ABRIL 2026", img: "https://picsum.photos/id/119/400/600" },
    { title: "NEON DREAMS", date: "22 ABRIL 2026", img: "https://picsum.photos/id/158/400/600" },
    { title: "SOLSTICE", date: "25 ABRIL 2026", img: "https://picsum.photos/id/193/400/600" },
    { title: "ECHOES", date: "28 ABRIL 2026", img: "https://picsum.photos/id/235/400/600" },
  ];

  return (
    <section className="min-h-screen w-full py-24 px-6 md:px-20 relative z-10 bg-gradient-to-b from-transparent to-[#050505]">
        {/* Simple "Carousel" placeholder */}
        <div className="w-full max-w-7xl mx-auto mb-16 border border-orange-500/30 rounded-3xl p-8 md:p-16 relative bg-black/40 backdrop-blur-md">
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 text-orange-500 text-4xl cursor-pointer hover:scale-110 transition-transform">‹</div>
            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-orange-500 text-4xl cursor-pointer hover:scale-110 transition-transform">›</div>
            <div className="text-center">
                <h2 className="text-3xl font-orbitron mb-4">FEATURED EVENT</h2>
                <div className="w-full h-64 bg-gradient-to-r from-orange-900/20 to-green-900/20 rounded-xl flex items-center justify-center border border-white/5">
                    <span className="text-white/30 tracking-[1em]">PREVIEW VIDEO</span>
                </div>
            </div>
             <div className="flex justify-center gap-2 mt-8">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-orange-500' : 'bg-gray-700'}`} />
                ))}
            </div>
        </div>

        <div className="w-full max-w-7xl mx-auto text-center mb-12">
            <button className="bg-[#4a1c0b] border border-orange-500/40 px-10 py-3 font-orbitron font-bold tracking-widest hover:bg-[#d94f06] transition-colors">
                BOOK NOW
            </button>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {events.map((evt, i) => (
          <EventCard key={i} {...evt} />
        ))}
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="w-full bg-[#050505] py-20 px-6 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col items-center md:items-start">
             <div className="flex items-center gap-1 mb-6 border-2 border-white rounded-full p-8 w-40 h-40 justify-center bg-black relative">
                <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="text-center">
                    <span className="font-orbitron text-xl font-bold block">MANDALA</span>
                    <span className="bg-white text-black px-1 text-[10px] font-bold transform -skew-x-12 inline-block">Tickets</span>
                </div>
            </div>
        </div>
        
        <div className="flex gap-6">
            <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-white hover:text-black transition-all"><Facebook size={20} /></a>
            <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-white hover:text-black transition-all"><Instagram size={20} /></a>
            <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-white hover:text-black transition-all"><Twitter size={20} /></a>
            <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-white hover:text-black transition-all"><Mail size={20} /></a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left text-sm text-gray-500">
        <div>
            <h4 className="text-orange-500 font-bold mb-4">MANDALATICKETS.COM</h4>
            <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms and Conditions</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
        </div>
        <div>
            <h4 className="text-orange-500 font-bold mb-4">ACCEPTED PAYMENTS</h4>
            <div className="flex justify-center md:justify-start gap-4">
                 <div className="flex gap-2 text-white">
                    <span className="font-bold text-xl">VISA</span>
                    <span className="font-bold text-xl">MC</span>
                    <span className="font-bold text-xl">AMEX</span>
                 </div>
            </div>
        </div>
         <div>
            <h4 className="text-orange-500 font-bold mb-4">ASSOCIATIONS</h4>
            <ul className="space-y-2">
                <li>Bonbonniere Tulum ®</li>
                <li>Tehmplo Tulum ®</li>
                <li>Vagalume ®</li>
            </ul>
        </div>
      </div>
      
      <div className="mt-20 text-center text-gray-600 text-xs">
         <div className="flex justify-center items-center gap-2 mb-4">
            <span className="text-green-500 text-xl">★</span>
            <span className="font-bold text-white text-lg">Trustpilot</span>
            <span className="text-green-500 text-xl">★★★★★</span>
         </div>
         © Copyright 2025 Mandalatickets.com
      </div>
    </footer>
  );
};