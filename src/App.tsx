import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Instagram, 
  MessageSquare, 
  MapPin, 
  Phone, 
  Compass, 
  ShieldCheck, 
  Flame, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Info, 
  DollarSign, 
  Sliders, 
  Navigation,
  Check,
  Smartphone,
  Sparkles,
  Share2,
  Calendar,
  Users
} from "lucide-react";

// List of available ATVs at Comana
interface ATVModel {
  id: string;
  name: string;
  badge: string;
  engine: string;
  power: string;
  type: string;
  pricePerHour: number;
  specs: string[];
}

const FLEET_DATA: ATVModel[] = [
  {
    id: "cfmoto-520",
    name: "CFMOTO CForce 520L",
    badge: "Cel Mai Popular",
    engine: "495 cc (2026 Model)",
    power: "38 HP - 4x4 Selectabil",
    type: "2 Locuri cu Spătar Premium",
    pricePerHour: 150,
    specs: ["Troliu electric 1200kg", "Servodirecţie electronică (EPS)", "Suspensii independente dublu braţ", "Anvelope off-road de înaltă tracţiune"]
  },
  {
    id: "cfmoto-625",
    name: "CFMOTO CForce 625 Touring",
    badge: "Forţă Brută",
    engine: "580 cc (Cilindru Mare)",
    power: "45 HP - Cuplu Maxim",
    type: "2 Locuri cu Protecţie Maximă",
    pricePerHour: 200,
    specs: ["Sistem EPS inteligent", "Jante aliaj premium 12\"", "Faruri LED Ultra-Bright", "Cutie automată CVT cu frână de motor"]
  },
  {
    id: "cfmoto-1000",
    name: "CFMOTO CForce 1000 Overland",
    badge: "Monstru Off-Road",
    engine: "963 cc V-Twin",
    power: "85 HP - Adrenalină Pură",
    type: "2 Locuri - Ediţie Limitată",
    pricePerHour: 300,
    specs: ["Bumper faţă/spate din oţel", "Scuturi protecţie aluminiu integrate", "Valize de călătorie impermeabile", "Amortizoare pe gaz complet reglabile"]
  }
];

// Interactive Trails list
interface Trail {
  name: string;
  difficulty: "Uşor" | "Mediu" | "Extrem";
  time: string;
  description: string;
  tag: string;
}

const TRAILS: Trail[] = [
  {
    name: "Traseul Verde: Inima Pădurii Comana",
    difficulty: "Uşor",
    time: "1 - 1.5 Ore",
    description: "Traseu pitoresc prin parcul natural, ideal pentru începători şi familii. Drumuri forestiere curate cu peisaje superbe.",
    tag: "Recomandat Debut"
  },
  {
    name: "Traseul Muddy Challenge: Aventură în Noroi",
    difficulty: "Mediu",
    time: "2 Ore",
    description: "Provocări cu treceri prin apă, şanţuri cu noroi şi pante medii. Perfect pentru pasionaţii de adrenalină controlată.",
    tag: "Cel mai Căutat"
  },
  {
    name: "Traseul Delta Extrem: Neajlov Outlaw",
    difficulty: "Extrem",
    time: "3+ Ore",
    description: "Traseu complet de anduranţă cu treceri tehnice prin porţiuni mlaştinoase, pante abrupte şi zone de noroi adânc.",
    tag: "Doar pentru Veterani"
  }
];

// Romnian FAQs for high credibility
interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Am nevoie de permis de conducere?",
    answer: "Da, pentru a conduce ATV-ul pe drumurile publice este necesar un permis de conducere categoria B. Persoanele fără permis sau minorii pot sta în spate ca pasageri (ATV-urile noastre au 2 locuri complet omologate şi confortabile)."
  },
  {
    question: "Ce echipament este inclus în preţ?",
    answer: "Siguranţa este prioritatea noastră absolută! Oferim GRATUIT cască de protecţie profesională cu vizieră completă, cagulă de unică folosinţă, ochelari de protecţie contra prafului şi veste reflectorizante."
  },
  {
    question: "Este necesară o programare în prealabil?",
    answer: "Da! Recomandăm cu tărie să faceţi o rezervare cu cel puţin 24-48 de ore înainte, în special pentru weekend-uri, când cererea este extrem de ridicată. Puteţi rezerva simplu şi rapid prin WhatsApp sau apel telefonic."
  },
  {
    question: "Cât de sigură este experienţa de condus?",
    answer: "Fiecare escapadă off-road începe cu un instructaj detaliat privind manevrarea ATV-ului şi regulile de siguranţă. De asemenea, pe traseele lungi veţi fi însoţiţi de un ghid profesionist care vă va asista în orice moment."
  }
];

export default function App() {
  // UI states
  const [selectedAtv, setSelectedAtv] = useState<string>("cfmoto-520");
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  
  // Interactive Reservation states
  const [reservationAtvsCount, setReservationAtvsCount] = useState<number>(2);
  const [reservationDuration, setReservationDuration] = useState<number>(2); // hours
  const [reservationDate, setReservationDate] = useState<string>("");
  const [reservationTime, setReservationTime] = useState<string>("12:00");
  const [reservationPhone, setReservationPhone] = useState<string>("");

  const currentAtvObj = FLEET_DATA.find(a => a.id === selectedAtv) || FLEET_DATA[0];
  const totalPrice = reservationAtvsCount * reservationDuration * currentAtvObj.pricePerHour;

  // Build current date string for min date selection
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setReservationDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const handleFAQToggle = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // Pre-configured dynamic WhatsApp booking link
  const getWhatsAppLink = () => {
    const formattedDate = reservationDate ? new Date(reservationDate).toLocaleDateString('ro-RO') : 'Nespecificată';
    const message = `Salut! Aş dori să rezerv o aventură cu ATV-ul în Comana:
    - Model ATV: ${currentAtvObj.name}
    - Număr ATV-uri: ${reservationAtvsCount} bucăți
    - Durată traseu: ${reservationDuration} ore
    - Dată dorită: ${formattedDate}
    - Ora estimată: ${reservationTime}
    ${reservationPhone ? `- Telefon contact: ${reservationPhone}` : ''}
    - Cost estimat: ${totalPrice} RON
    Aştept confirmarea disponibilităţii dumneavoastră. Mulţumesc!`;
    
    return `https://wa.me/40731441122?text=${encodeURIComponent(message)}`;
  };

  return (
    <div id="atv-app-wrapper" className="min-h-screen w-full bg-[#020202] text-white font-sans overflow-x-hidden relative flex justify-center items-center">
      
      {/* Dynamic Background Noise/Lighting Grid for high-end motorsport look */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,18,18,0.73)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.73)_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>
      
      {/* Decorative Radial Aurora Glowing in signature neon yellow is extremely atmospheric */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4FF00] rounded-full blur-[240px] opacity-10 pointer-events-none z-0"></div>
      
      {/* Mud Splatter SVG overlays scattered elegantly on background corners to mimic grunge flier */}
      <div className="absolute top-10 left-4 w-32 h-32 text-zinc-900 pointer-events-none opacity-20 rotate-45 select-none hidden lg:block z-0">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M12,45 C20,30 35,42 45,20 C50,35 68,22 75,40 C80,55 60,65 55,85 C42,75 25,80 12,45 Z" />
          <circle cx="85" cy="15" r="4" />
          <circle cx="92" cy="35" r="2" />
          <circle cx="78" cy="72" r="3" />
          <circle cx="28" cy="85" r="5" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-4 w-40 h-40 text-zinc-900 pointer-events-none opacity-20 -rotate-12 select-none hidden lg:block z-0">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M22,35 C32,15 45,32 65,18 C70,39 88,32 80,60 C75,75 58,82 42,88 C30,78 15,60 22,35 Z" />
          <circle cx="10" cy="22" r="3" />
          <circle cx="6" cy="48" r="4" />
          <circle cx="20" cy="88" r="2" />
        </svg>
      </div>

      {/* DESKTOP EXCLUSIVE ADORNMENTS (Visible only beside the mobile mock-phone) */}
      <div className="hidden lg:flex flex-col absolute left-12 top-24 max-w-sm pointer-events-auto z-10 space-y-6">
        <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-full text-xs text-zinc-400 backdrop-blur-sm self-start">
          <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse"></span>
          <span>Centru de Agrement Comana</span>
        </div>
        <h1 className="text-display text-5xl font-black uppercase tracking-tighter leading-none italic select-none">
          OFF-ROAD <br />
          <span className="text-[#D4FF00] text-shadow-neon">ADRENALINĂ</span> <br />
          FĂRĂ LIMITĂ
        </h1>
        <p className="text-zinc-400 text-sm leading-relaxed font-space">
          Experimentează libertatea sălbatică pe cele mai spectaculoase trasee din Parcul Natural Comana. Închiriază ATV-uri complet echipate și domină noroiul!
        </p>
        <div className="pt-4 border-t border-zinc-900 grid grid-cols-2 gap-4">
          <div className="bg-zinc-950/40 p-3 rounded-lg border border-zinc-900">
            <div className="text-2xl font-bold font-display text-white">0731 441 122</div>
            <div className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase mt-1">Telefon Direct</div>
          </div>
          <div className="bg-zinc-950/40 p-3 rounded-lg border border-zinc-900">
            <div className="text-2xl font-bold font-display text-[#D4FF00]">100% SECURE</div>
            <div className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase mt-1">Echipament Inclus</div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-col absolute right-12 top-24 max-w-sm items-end text-right pointer-events-auto z-10 space-y-6">
        <div className="bg-zinc-950/60 p-5 rounded-2xl border border-zinc-800/80 backdrop-blur-md flex flex-col items-center gap-3">
          <div className="p-3 bg-white rounded-xl">
            {/* Elegant QR Code Mock representing link for easy scanning */}
            <svg className="w-28 h-28 text-black" viewBox="0 0 100 100" fill="currentColor">
              <path d="M5,5 h20 v20 h-20 z M10,10 h10 v10 h-10 z M30,5 h10 v10 h-10 z M5,30 h10 v10 h-10 z M25,30 h5 v5 h-5 z M25,40 h5 v5 h-5 z M35,25 h5 v15 h-5 z" />
              <path d="M5,75 h20 v20 h-20 z M10,80 h10 v10 h-10 z M30,75 h20 v10 h-20 z M45,65 h10 v20 h-10 z" />
              <path d="M75,5 h20 v20 h-20 z M80,10 h10 v10 h-10 z M65,5 h5 v10 h-5 z M55,15 h10 v5 h-10 z" />
              <path d="M60,45 h15 v5 h-15 z M85,35 h15 v10 h-15 z M70,55 h10 v15 h-10 z M90,65 h10 v15 h-10 z" />
              <path d="M85,85 h10 v10 h-10 z M60,80 h15 v5 h-15 z M55,60 h5 v5 h-5 z" />
              {/* Target dots */}
              <rect x="13" y="13" width="4" height="4" fill="#D4FF00"/>
              <rect x="83" y="13" width="4" height="4" fill="#D4FF00"/>
              <rect x="13" y="83" width="4" height="4" fill="#D4FF00"/>
            </svg>
          </div>
          <div>
            <div className="text-xs font-bold font-sans text-white text-center">SCANNEAZĂ PE MOBIL</div>
            <div className="text-[10px] text-zinc-400 mt-1 uppercase tracking-wider text-center font-mono">Deschide pe smartphone</div>
          </div>
        </div>
        <div className="bg-zinc-900/30 border border-zinc-800/60 p-4 rounded-xl text-left max-w-xs space-y-2">
          <div className="flex items-center gap-1.5 text-[#D4FF00] text-xs font-black uppercase font-mono">
            <Sparkles className="w-3.5 h-3.5" /> Locaţie Premium
          </div>
          <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
            Suntem localizaţi exact lângă rezervaţia superbă Comana, la doar 40 de minute de centrul Bucureştiului. Traseul cuprinde păduri seculare, bălţi noroioase şi zone speciale off-road.
          </p>
        </div>
      </div>

      {/* CORE WRAPPER FOR RESPONSIVE PREVIEW:
          Produces 100vh on mobile device screen, and a perfectly centered mock phone container of max-380px grid structure on Desktop */}
      <div className="w-full sm:w-auto h-screen sm:h-[92vh] flex justify-center items-center z-10 pointer-events-none px-0 sm:px-4">
        
        {/* Smartphone mockup shell decoration (displays only on screen width >= sm) */}
        <div id="smartphone-wrapper" className="w-full max-w-[440px] h-full sm:h-[92vh] aspect-[9/19.5] sm:border-[8px] sm:border-[#222] sm:bg-black rounded-none sm:rounded-[44px] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col relative pointer-events-auto select-none sm:ring-2 sm:ring-zinc-900/60">
          
          {/* Smartphone Hardware Notch (Dynamic Island lookalike) */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#000000] rounded-full z-50 hidden sm:flex items-center justify-between px-3 border border-zinc-800/30">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80 animate-pulse"></span>
            <div className="w-12 h-1 bg-zinc-900 rounded-full"></div>
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-indigo-500/40"></span>
            </span>
          </div>

          {/* Device Glossy Shine Highlight Layer */}
          <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none z-40"></div>

          {/* MAIN INTERNAL SCREEN VIEWPORT (Scrollable) */}
          <div className="w-full h-full bg-[#000] overflow-y-auto overflow-x-hidden flex flex-col relative pb-24 scroll-smooth">
            
            {/* HERO SECTION WITH IMPACT HEADINGS */}
            <div className="relative w-full h-[270px] pt-8 pb-4 px-6 flex flex-col items-center justify-center overflow-hidden border-b border-zinc-900">
              
              {/* Radial background gradient matching Artistic Flair precisely */}
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_#D4FF00_0%,transparent_70%)] z-0"></div>
              
              {/* Visual grid overlay to represent extreme speed */}
              <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,rgba(212,255,0,0.15)_25%,transparent_25%),linear-gradient(-45deg,rgba(212,255,0,0.15)_25%,transparent_25%)] bg-[size:10px_10px] z-0"></div>

              {/* Sub-header Badge */}
              <div className="z-10 inline-flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest text-zinc-400 mb-2 uppercase select-none">
                <Flame className="w-3 h-3 text-[#D4FF00]" /> 4X4 OFF-ROAD ADVENTURE
              </div>

              {/* HERO TITLE HIERARCHY: White bold ÎNCHIRIERE, massive Neon Yellow ATV, and medium white COMANA */}
              <div className="z-10 flex flex-col items-center justify-center select-text cursor-default">
                <span className="text-white text-xs font-black tracking-[0.3em] uppercase z-10 leading-none">
                  ÎNCHIRIERE
                </span>
                <span className="text-[#D4FF00] text-8xl font-black italic -skew-x-12 leading-none z-10 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] select-none">
                  ATV
                </span>
                <span className="text-white text-2xl font-bold tracking-widest uppercase z-10 mt-[-10px]">
                  COMANA
                </span>
              </div>

              {/* USP LIST CARD WITH MATCHING CHECKMARKS AND THEME STYLE */}
              <div className="z-10 mt-4 flex flex-col gap-1.5 w-full">
                <div className="flex items-center gap-2 text-[10px] text-white font-bold uppercase tracking-wider bg-white/5 py-1 px-3 rounded-full border border-white/10 justify-center">
                  <span className="text-[#D4FF00]">✓</span> ATV-uri Puternice <span className="text-[#D4FF00] text-[9px] font-mono px-1 bg-[#D4FF00]/10 rounded ml-1">500cc-1000cc</span>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-white font-bold uppercase tracking-wider bg-white/5 py-1 px-3 rounded-full border border-white/10 justify-center">
                  <span className="text-[#D4FF00]">✓</span> Echipament complet inclus <span className="text-zinc-500 font-normal">(Cască + vestă)</span>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-white font-bold uppercase tracking-wider bg-white/5 py-1 px-3 rounded-full border border-white/10 justify-center">
                  <span className="text-[#D4FF00]">✓</span> Aventură ghidată în pădure
                </div>
              </div>

            </div>

            {/* SOCIAL NAVIGATION (Massive, scattered 'in your face' layout, stacked in natural flow) */}
            <div className="w-full flex flex-col items-center justify-center gap-8 py-10 overflow-visible border-b border-zinc-900/50">
              
              {/* TikTok */}
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="group w-24 h-24 flex justify-center items-center active:scale-95 transition-all outline-none -ml-28 -rotate-12">
                <div className="absolute inset-0 bg-[#FE2C55] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                <svg className="w-16 h-16 text-white relative z-10 drop-shadow-[4px_4px_0px_#25F4EE] group-hover:drop-shadow-[6px_6px_0px_#FE2C55] transition-all" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91.04.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.18-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-.99-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="relative group w-24 h-24 flex justify-center items-center active:scale-95 transition-all outline-none ml-28 rotate-12">
                <div className="absolute inset-0 bg-[#E1306C] blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                <svg className="w-20 h-20 text-white relative z-10 drop-shadow-xl" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a href="https://wa.me/40731441122?text=Salut!%20Vreau%20s%C4%83%20fac%20o%20rezervare%20la%20ATV%20Comana." target="_blank" rel="noreferrer" className="relative group w-24 h-24 flex justify-center items-center active:scale-95 transition-all outline-none -ml-20 -rotate-6 mt-4">
                <div className="absolute inset-0 bg-[#25D366] blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                <svg className="w-20 h-20 text-white relative z-10 drop-shadow-xl" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </a>

              {/* Waze (Proper accurate Waze ghost SVG) */}
              <a href="https://waze.com/ul?ll=44.170668,26.136867&navigate=yes" target="_blank" rel="noreferrer" className="relative group w-24 h-24 flex justify-center items-center active:scale-95 transition-all outline-none ml-24 rotate-6 mt-4">
                <div className="absolute inset-0 bg-[#33CCFF] blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                <div className="w-[85px] h-[85px] relative z-10 bg-[#33CCFF] rounded-[22px] drop-shadow-xl flex items-center justify-center border-b-2 border-r-2 border-black/10">
                  <svg className="w-16 h-16 mt-1.5" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 30C66.8 30 40 60 40 100C40 120.6 48.2 138.4 60.8 149.9C59 157 52 159.8 51.8 159.9C49.2 160.7 48 163.5 49.1 165.9C50 167.6 51.8 168.8 53.8 168.8C54.3 168.8 54.8 168.8 55.3 168.6C67.1 165.7 76.8 159 84.9 150C89.3 151.4 94.5 152.8 100 152.8C134.2 152.8 160 123 160 100C160 60 134.2 30 100 30Z" fill="white" stroke="black" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="115" cy="85" r="8" fill="black"/>
                    <circle cx="75" cy="85" r="8" fill="black"/>
                    <path d="M75 105C75 105 85 120 115 105" stroke="black" strokeWidth="10" strokeLinecap="round"/>
                    <circle cx="70" cy="145" r="16" fill="black" stroke="black" strokeWidth="2"/>
                    <circle cx="125" cy="145" r="16" fill="black" stroke="black" strokeWidth="2"/>
                  </svg>
                </div>
              </a>
            </div>

            {/* INTERACTIVE FLEET SELECTION SLIDER */}
            <div className="px-6 py-4 flex flex-col gap-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  Alege Monstrul Off-Road
                </h3>
                <span className="text-[10px] text-[#D4FF00] font-mono font-bold uppercase">Următorul Pas</span>
              </div>

              {/* Fleet Select Horizontal Tabs */}
              <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
                {FLEET_DATA.map((atv) => (
                  <button
                    key={atv.id}
                    onClick={() => setSelectedAtv(atv.id)}
                    className={`shrink-0 px-4 py-2.5 rounded-xl border text-xs font-bold font-space transition-all cursor-pointer ${
                      selectedAtv === atv.id
                        ? "bg-[#D4FF00] border-[#D4FF00] text-black shadow-[0_4px_15px_rgba(212,255,0,0.25)]"
                        : "bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {atv.name.split(" ")[1] || atv.name}
                  </button>
                ))}
              </div>

              {/* Active ATV Specs Card with Dynamic Transition styling */}
              <div className="bg-zinc-950/90 border border-zinc-800/90 rounded-2xl p-4 relative overflow-hidden shadow-2xl">
                {/* Decorative extreme visual elements */}
                <div className="absolute top-0 right-0 py-1.5 px-3 bg-[#D4FF00] text-black font-mono text-[9px] font-bold uppercase rounded-bl-xl shadow-md">
                  {currentAtvObj.badge}
                </div>

                <div className="text-sm font-black text-white pr-20 uppercase font-display italic">
                  {currentAtvObj.name}
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3.5 pb-3 border-b border-zinc-900 text-[11px] font-space text-zinc-400">
                  <div className="bg-zinc-900/60 p-2 rounded-lg flex flex-col justify-center">
                    <span className="text-[9px] text-zinc-500 uppercase font-mono">Motor Spec</span>
                    <strong className="text-white mt-0.5">{currentAtvObj.engine}</strong>
                  </div>
                  <div className="bg-zinc-900/60 p-2 rounded-lg flex flex-col justify-center">
                    <span className="text-[9px] text-zinc-500 uppercase font-mono">Putere Brută</span>
                    <strong className="text-[#D4FF00] mt-0.5">{currentAtvObj.power}</strong>
                  </div>
                </div>

                <div className="mt-3.5 space-y-1.5 text-[10px] text-zinc-300">
                  {currentAtvObj.specs.map((item, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] shrink-0"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between items-center bg-zinc-900/10 -mx-4 -mb-4 p-4 rounded-b-2xl">
                  <div>
                    <div className="text-[9px] text-zinc-500 uppercase font-mono tracking-wider">Tarif Închiriere</div>
                    <div className="text-lg font-black font-display text-white">
                      {currentAtvObj.pricePerHour} <span className="text-xs text-[#D4FF00]">RON / ORĂ</span>
                    </div>
                  </div>
                  <div className="text-[9px] text-zinc-400 font-mono text-right bg-zinc-900 border border-zinc-800 px-2.5 py-1.5 rounded-lg">
                    Combustibil complet inclus
                  </div>
                </div>
              </div>
            </div>

            {/* INTEGRATED GOOGLE MAP MOVED HERE */}
            <div className="px-6 py-4 flex flex-col gap-3">
              <h3 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                Locaţia Traseului în Comana
              </h3>

              <div className="bg-white/5 backdrop-blur-md border border-[#D4FF00]/20 rounded-2xl overflow-hidden shadow-xl p-2 relative group">
                
                {/* Visual Location Info Strip */}
                <div className="flex justify-between items-center px-2 py-2 text-[11px] font-space text-zinc-300">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D4FF00]" />
                    <span className="font-semibold text-xs">Pensiunea/Parcul Comana, Giurgiu</span>
                  </div>
                  <span className="text-[9px] text-[#D4FF00] font-mono uppercase bg-[#D4FF00]/10 px-1.5 py-0.5 rounded">
                    40 MIN din Bucureşti
                  </span>
                </div>

                {/* Google Maps Iframe */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-zinc-900">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11531.621430032544!2d26.1368673!3d44.170668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ea0da97611ab%3A0xe5a36ebd77d07996!2sComana%20Adventure%20Park!5e0!3m2!1sen!2sro!4v1700000000000!5m2!1sen!2sro" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer"
                    title="Harta Inchiriere ATV Comana"
                    className="grayscale contrast-[1.3] brightness-[0.7] active:grayscale-0 active:brightness-100 transition-all duration-300 pointer-events-auto"
                  ></iframe>
                </div>

                <div className="pt-2.5 pb-1 px-1 flex justify-between items-center text-[9px] text-zinc-500 font-mono bg-zinc-950">
                  <span>*Aproape de parcul de aventură</span>
                  <a 
                    href="https://waze.com/ul?ll=44.170668,26.136867&navigate=yes" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[#D4FF00] uppercase font-bold text-[10px] hover:underline flex items-center gap-1"
                  >
                    Deschide Navigaţia <Navigation className="w-3 h-3" />
                  </a>
                </div>

              </div>
            </div>

            {/* RECURRING EXCURSIONS / TRAILS CARD EXPLORER */}
            <div className="px-6 py-4 flex flex-col gap-4">
              <h3 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                Trasee Off-Road Disponibile
              </h3>
              
              <div className="space-y-3.5">
                {TRAILS.map((trail, index) => (
                  <div key={index} className="bg-zinc-950/50 border border-zinc-900/80 rounded-xl p-3.5 relative overflow-hidden group">
                    <div className="absolute top-0 right-3 flex gap-1.5">
                      <span className="text-[9px] font-mono px-2 py-0.5 bg-zinc-900 text-zinc-400 border border-zinc-800/80 rounded-b font-medium uppercase">
                        {trail.time}
                      </span>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-b font-bold uppercase text-black ${
                        trail.difficulty === 'Uşor' ? 'bg-emerald-400' :
                        trail.difficulty === 'Mediu' ? 'bg-[#D4FF00]' : 'bg-red-500'
                      }`}>
                        {trail.difficulty}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-white group-hover:text-[#D4FF00] transition-colors uppercase pt-1 font-space">
                      {trail.name}
                    </div>
                    
                    <p className="text-[11px] text-zinc-400 mt-1.5 leading-relaxed">
                      {trail.description}
                    </p>

                    <div className="mt-2.5 flex justify-end">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase bg-zinc-900/60 px-1.5 py-0.5 rounded">
                        🏷️ {trail.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DYNAMIC RESERVATION PLANNER & PRICE CALCULATOR */}
            <div className="px-6 py-5 flex flex-col gap-4">
              <div className="bg-zinc-950 border border-[#D4FF00]/20 rounded-2xl p-4 shadow-xl relative">
                
                <div className="flex items-center gap-2 mb-3">
                  <Sliders className="w-4 h-4 text-[#D4FF00]" />
                  <h4 className="text-xs font-black uppercase text-white font-display italic tracking-wide">
                    Calculator Tarif & Rezervare
                  </h4>
                </div>

                <div className="space-y-4">
                  {/* Select vehicle */}
                  <div>
                    <label className="text-[10px] uppercase font-mono text-zinc-400 block mb-1.5">Model ATV Selectat</label>
                    <select 
                      value={selectedAtv}
                      onChange={(e) => setSelectedAtv(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4FF00] cursor-pointer"
                    >
                      {FLEET_DATA.map(atv => (
                        <option key={atv.id} value={atv.id}>{atv.name} ({atv.pricePerHour} RON/h)</option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity and duration sliders info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-mono text-zinc-400 flex justify-between mb-1">
                        <span>Cantitate</span>
                        <strong className="text-white text-[12px]">{reservationAtvsCount} ATV</strong>
                      </label>
                      <input 
                        type="range" 
                        min="1" 
                        max="8" 
                        value={reservationAtvsCount}
                        onChange={(e) => setReservationAtvsCount(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-[#D4FF00]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-mono text-zinc-400 flex justify-between mb-1">
                        <span>Durată</span>
                        <strong className="text-[#D4FF00] text-[12px]">{reservationDuration} Ore</strong>
                      </label>
                      <input 
                        type="range" 
                        min="1" 
                        max="8" 
                        value={reservationDuration}
                        onChange={(e) => setReservationDuration(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-[#D4FF00]"
                      />
                    </div>
                  </div>

                  {/* Date and Time selectors for realism */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">Dată Traseu</label>
                      <div className="relative">
                        <input 
                          type="date" 
                          value={reservationDate}
                          onChange={(e) => setReservationDate(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4FF00] font-space"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">Ora Plecării</label>
                      <select 
                        value={reservationTime}
                        onChange={(e) => setReservationTime(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4FF00] cursor-pointer"
                      >
                        <option value="09:00">09:00 (Răsărit)</option>
                        <option value="11:00">11:00 (Dimineaţă)</option>
                        <option value="13:00">13:00 (Prânz)</option>
                        <option value="15:00">15:00 (Durează mult)</option>
                        <option value="17:00">17:00 (Apus de vis)</option>
                        <option value="19:00">19:00 (Tombă de seară)</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact phone number */}
                  <div>
                    <label className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">Numărul Tău de Contact (Opțional)</label>
                    <input 
                      type="tel" 
                      placeholder="Ex: 0722 123 456"
                      value={reservationPhone}
                      onChange={(e) => setReservationPhone(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#D4FF00] font-mono"
                    />
                  </div>

                  {/* Pricing Output Dashboard */}
                  <div className="bg-[#121212] rounded-xl p-3 border border-zinc-900 flex justify-between items-center mt-2">
                    <div>
                      <div className="text-[9px] text-zinc-500 uppercase font-mono">Calcul Estimativ</div>
                      <div className="text-[10px] text-zinc-300 font-space">{reservationAtvsCount} ATV x {reservationDuration} ore</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] text-zinc-500 uppercase font-mono">Total de Plată</div>
                      <div className="text-xl font-black font-display text-[#D4FF00]">
                        {totalPrice} RON
                      </div>
                    </div>
                  </div>

                  {/* Send WhatsApp Request Button */}
                  <a 
                    href={getWhatsAppLink()}
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold uppercase text-xs rounded-xl transition-all duration-200 shadow-lg active:scale-[0.98] cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-black/10" />
                    Trimite Rezervarea pe WhatsApp
                  </a>

                  <div className="text-center text-[9px] text-zinc-500 font-mono italic">
                    *Preţurile includ tot echipamentul, ghidul şi instructajul. Fără costuri ascunse.
                  </div>

                </div>

              </div>
            </div>

            {/* HIGH-CREDIBILITY FAQS SECTION */}
            <div className="px-6 py-4 flex flex-col gap-3">
              <h3 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                Întrebări Frecvente
              </h3>

              <div className="space-y-2.5">
                {FAQS.map((faq, index) => (
                  <div 
                    key={index} 
                    className="bg-zinc-950/40 border border-zinc-900 rounded-xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => handleFAQToggle(index)}
                      className="w-full px-4 py-3 text-left flex justify-between items-center gap-3 text-xs font-bold font-space text-zinc-200 hover:text-[#D4FF00] transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      {activeFAQ === index ? (
                        <ChevronUp className="w-4 h-4 text-[#D4FF00] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                      )}
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {activeFAQ === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-3.5 pt-0.5 text-[11px] leading-relaxed text-zinc-400 font-sans border-t border-zinc-900/60 mt-1">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>



            {/* COMPOSITE BRAND FOOTER FOOTPRINT */}
            <div className="px-6 py-8 text-center border-t border-zinc-950 mt-4 flex flex-col items-center gap-2.5">
              <div className="text-[12px] font-black italic tracking-widest text-[#D4FF00] font-display">
                ATV COMANA PRESTIGE
              </div>
              <p className="text-[10px] text-zinc-500 font-mono leading-normal max-w-xs uppercase">
                © {new Date().getFullYear()} ATV COMANA CO. TOATE DREPTURILE REZERVATE. <br />
                AVENTURĂ PE ROŢI ÎN SIGURANŢĂ EXTREMĂ.
              </p>
              <div className="flex gap-2.5 mt-2 text-zinc-600 text-[9px] font-mono">
                <span>CONDIŢII DE UTILIZARE</span>
                <span>•</span>
                <span>POLITICA GENERALĂ</span>
              </div>
            </div>

          </div>

          {/* STICKY FLOATING CALL ACTION BUTTON CENTERED DIRECTLY */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-full max-w-[340px] px-4 flex justify-center z-50 pointer-events-auto">
            <a 
              href="tel:0731441122"
              className="w-full bg-[#D4FF00] py-4 rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(212,255,0,0.5)] active:scale-95 transition-transform animate-pulse-glow text-black font-black uppercase text-sm tracking-tighter"
              id="sticky-call-btn"
            >
              <Phone className="w-5 h-5 fill-black" stroke="black" strokeWidth="1" />
              <span>Rezervă Acum: 0731 441 122</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
