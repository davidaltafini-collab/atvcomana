import { useState, useEffect, useRef, useCallback } from "react";
import {
  MapPin,
  Phone,
  ChevronDown,
  ChevronUp,
  Sliders,
  Navigation,
  MessageSquare
} from "lucide-react";

const SITE_CONFIG = {
  brand: {
    name: "ATV COMANA PRESTIGE",
    handle: "@atvcomana",
  },
  contact: {
    phoneDisplay: "0731 441 122",
    phoneRaw: "0731441122",
    whatsapp: "40731441122",
  },
  social: {
    tiktok: "https://tiktok.com/@atvcomana",
    instagram: "https://instagram.com/atvcomana",
  },
  location: {
    name: "Pensiunea/Parcul Comana, Giurgiu",
    distance: "40 MIN din Bucureşti",
    wazeLink: "https://waze.com/ul?ll=44.170668,26.136867&navigate=yes",
    googleMapsLink: "https://www.google.com/maps/search/?api=1&query=44.170668,26.136867",
    googleMapsEmbed: "https://maps.google.com/maps?q=44.170668,26.136867&z=13&output=embed"
  }
};

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

function FAQAccordionItem({ faq, isOpen, onToggle }: { key?: number; faq: FAQItem; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>("0px");

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [isOpen]);

  return (
    <div className="bg-zinc-950/40 border border-zinc-900 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full px-4 py-3 sm:py-4 text-left flex justify-between items-center gap-3 text-xs sm:text-sm font-bold font-space text-zinc-200 hover:text-[#D4FF00] transition-colors cursor-pointer"
      >
        <span>{faq.question}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-[#D4FF00] shrink-0" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" aria-hidden="true" />
        )}
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden transition-all duration-200 ease-in-out"
        role="region"
      >
        <div className="px-4 pb-4 pt-1 text-[11px] sm:text-xs leading-relaxed text-zinc-400 font-sans border-t border-zinc-900/60">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedAtv, setSelectedAtv] = useState<string>("cfmoto-520");
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState<boolean>(true);
  const lastScrollY = useRef<number>(0);
  const [showMap, setShowMap] = useState(false);

  const [reservationAtvsCount, setReservationAtvsCount] = useState<number>(2);
  const [reservationDuration, setReservationDuration] = useState<number>(2);
  const [reservationDate, setReservationDate] = useState<string>("");
  const [reservationTime, setReservationTime] = useState<string>("12:00");
  const [reservationName, setReservationName] = useState<string>("");

  const currentAtvObj = FLEET_DATA.find(a => a.id === selectedAtv) || FLEET_DATA[0];
  const totalPrice = reservationAtvsCount * reservationDuration * currentAtvObj.pricePerHour;

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setReservationDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (showMap) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShowMap(true); observer.disconnect(); } },
      { rootMargin: "200px" }
    );
    if (mapRef.current) observer.observe(mapRef.current);
    return () => observer.disconnect();
  }, [showMap]);

  const handleFAQToggle = useCallback((index: number) => {
    setActiveFAQ(prev => prev === index ? null : index);
  }, []);

  const getWhatsAppLink = () => {
    const formattedDate = reservationDate ? new Date(reservationDate).toLocaleDateString('ro-RO') : 'Nespecificată';
    const message = `Salut! Aş dori să rezerv o aventură cu ATV-ul în Comana:
    - Model ATV: ${currentAtvObj.name}
    - Număr ATV-uri: ${reservationAtvsCount} bucăți
    - Durată traseu: ${reservationDuration} ore
    - Dată dorită: ${formattedDate}
    - Ora estimată: ${reservationTime}
    ${reservationName ? `- Nume client: ${reservationName}` : ''}
    - Cost estimat: ${totalPrice} RON

    Aştept confirmarea disponibilităţii dumneavoastră. Mulţumesc!`;

    return `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  const CalculatorForm = () => (
    <div className="bg-zinc-950 border border-[#D4FF00]/20 rounded-2xl p-5 sm:p-6 shadow-xl relative w-full" role="form" aria-label="Calculator tarif și rezervare">
      <div className="flex items-center gap-2 mb-5">
        <Sliders className="w-5 h-5 text-[#D4FF00]" aria-hidden="true" />
        <h3 className="text-sm sm:text-base font-black uppercase text-white font-display italic tracking-wide">
          Calculator Tarif & Rezervare
        </h3>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="atv-select" className="text-[10px] sm:text-xs uppercase font-mono text-zinc-400 block mb-1.5">Model ATV Selectat</label>
          <select
            id="atv-select"
            value={selectedAtv}
            onChange={(e) => setSelectedAtv(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 min-h-[44px] text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4FF00] cursor-pointer"
          >
            {FLEET_DATA.map(atv => (
              <option key={atv.id} value={atv.id}>{atv.name} ({atv.pricePerHour} RON/h)</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="atv-count" className="text-[10px] sm:text-xs uppercase font-mono text-zinc-400 flex justify-between mb-2">
              <span>Cantitate</span>
              <strong className="text-white text-[12px] sm:text-sm">{reservationAtvsCount} ATV</strong>
            </label>
            <input
              id="atv-count"
              type="range"
              min="1"
              max="8"
              value={reservationAtvsCount}
              onChange={(e) => setReservationAtvsCount(parseInt(e.target.value))}
              className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-[#D4FF00]"
            />
          </div>

          <div>
            <label htmlFor="atv-duration" className="text-[10px] sm:text-xs uppercase font-mono text-zinc-400 flex justify-between mb-2">
              <span>Durată</span>
              <strong className="text-[#D4FF00] text-[12px] sm:text-sm">{reservationDuration} Ore</strong>
            </label>
            <input
              id="atv-duration"
              type="range"
              min="1"
              max="8"
              value={reservationDuration}
              onChange={(e) => setReservationDuration(parseInt(e.target.value))}
              className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-[#D4FF00]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="atv-date" className="text-[10px] sm:text-xs uppercase font-mono text-zinc-400 block mb-1.5">Dată Traseu</label>
            <input
              id="atv-date"
              type="date"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 min-h-[44px] block text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4FF00] font-space [color-scheme:dark]"
            />
          </div>

          <div>
            <label htmlFor="atv-time" className="text-[10px] sm:text-xs uppercase font-mono text-zinc-400 block mb-1.5">Ora Plecării</label>
            <select
              id="atv-time"
              value={reservationTime}
              onChange={(e) => setReservationTime(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 min-h-[44px] block text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4FF00] cursor-pointer"
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

        <div>
          <label htmlFor="atv-name" className="text-[10px] sm:text-xs uppercase font-mono text-zinc-400 block mb-1.5">Numele Tău (Opțional)</label>
          <input
            id="atv-name"
            type="text"
            placeholder="Ex: Andrei Popescu"
            value={reservationName}
            onChange={(e) => setReservationName(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 min-h-[44px] block text-xs sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#D4FF00] font-mono"
          />
        </div>

        <div className="bg-[#121212] rounded-xl p-4 border border-zinc-900 flex justify-between items-center mt-2">
          <div>
            <div className="text-[10px] sm:text-[11px] text-zinc-400 uppercase font-mono">Calcul Estimativ</div>
            <div className="text-[11px] sm:text-xs text-zinc-300 font-space mt-1">{reservationAtvsCount} ATV x {reservationDuration} ore</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] sm:text-[11px] text-zinc-400 uppercase font-mono">Total de Plată</div>
            <div className="text-xl sm:text-2xl font-black font-display text-[#D4FF00] mt-1">
              {totalPrice} RON
            </div>
          </div>
        </div>

        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold uppercase text-xs sm:text-sm rounded-xl transition-all duration-200 shadow-lg active:scale-[0.98] cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 fill-black/10" aria-hidden="true" />
          Trimite Rezervarea pe WhatsApp
        </a>

        <p className="text-center text-[10px] sm:text-[11px] text-zinc-400 font-mono italic">
          *Preţurile includ tot echipamentul, ghidul şi instructajul. Fără costuri ascunse.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#020202] text-white font-sans overflow-x-hidden relative pb-28">

      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,18,18,0.73)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.73)_1px,transparent_1px)] bg-[size:24px_24px] z-0" aria-hidden="true"></div>
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#D4FF00] rounded-full blur-[200px] opacity-[0.07] pointer-events-none z-0" aria-hidden="true"></div>

      <nav className={`fixed z-50 w-max left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center transition-all duration-500 ${isNavbarVisible ? 'top-6 opacity-100' : '-top-20 opacity-0 pointer-events-none'}`} aria-label="Navigare principală">
        <a href="#" className="text-white font-bold tracking-wider text-sm drop-shadow-[0_0_8px_#D4FF00]">
          {SITE_CONFIG.brand.handle}
        </a>
      </nav>

      <main>
        <header className="w-full flex flex-col items-center justify-center pt-32 pb-16 border-b border-zinc-900/50 relative z-20 px-6 [-webkit-tap-highlight-color:transparent]">
          <h1 className="text-3xl sm:text-5xl font-black font-display italic tracking-[0.05em] text-white uppercase mb-12 sm:mb-16 w-full text-center drop-shadow-lg">
            Acțiuni Rapide
          </h1>

          <div className="flex flex-row flex-wrap items-center justify-center gap-6 sm:gap-10 overflow-visible w-full max-w-4xl">

            <div className="relative z-30 active:scale-95 transition-transform">
              <a href={SITE_CONFIG.social.tiktok} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 outline-none focus:outline-none -rotate-6 mt-3 group" aria-label="Urmărește-ne pe TikTok">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-[22%] overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-shadow duration-300 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] bg-black relative border border-white/5">
                  <img src="/tiktok.webp" alt="" width="160" height="160" loading="eager" decoding="async" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs sm:text-sm font-sans font-medium text-zinc-400 transition-colors">TikTok</span>
              </a>
            </div>

            <div className="relative z-30 active:scale-95 transition-transform">
              <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 outline-none focus:outline-none rotate-3 -mt-3 group" aria-label="Urmărește-ne pe Instagram">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-[22%] overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-shadow duration-300 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] bg-black relative border border-white/5">
                  <img src="/instagram.webp" alt="" width="160" height="160" loading="eager" decoding="async" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs sm:text-sm font-sans font-medium text-zinc-400 transition-colors">Instagram</span>
              </a>
            </div>

            <div className="relative z-30 active:scale-95 transition-transform">
              <a href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 outline-none focus:outline-none -rotate-3 mt-4 group" aria-label="Contactează-ne pe WhatsApp">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-[22%] overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-shadow duration-300 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] bg-black relative border border-white/5">
                  <img src="/whatsap.webp" alt="" width="160" height="160" loading="eager" decoding="async" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs sm:text-sm font-sans font-medium text-zinc-400 transition-colors">WhatsApp</span>
              </a>
            </div>

            <div className="relative z-30 active:scale-95 transition-transform">
              <a href={SITE_CONFIG.location.wazeLink} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 outline-none focus:outline-none rotate-6 -mt-2 group" aria-label="Deschide locația în Waze">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-[22%] overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-shadow duration-300 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] bg-black relative border border-white/5">
                  <img src="/waze.webp" alt="" width="160" height="160" loading="eager" decoding="async" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs sm:text-sm font-sans font-medium text-zinc-400 transition-colors">Waze</span>
              </a>
            </div>

          </div>
        </header>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-20">

          <div className="flex-1 flex flex-col gap-8">

            <section aria-labelledby="fleet-heading" className="flex flex-col gap-4">
              <div className="flex justify-between items-baseline">
                <h2 id="fleet-heading" className="text-[11px] sm:text-xs font-mono tracking-widest text-zinc-400 uppercase">
                  Alege Monstrul Off-Road
                </h2>
                <span className="text-[11px] sm:text-xs text-[#D4FF00] font-mono font-bold uppercase">Selectează</span>
              </div>

              <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none sm:mx-0 sm:px-0 sm:flex-wrap" role="tablist" aria-label="Selectare model ATV">
                {FLEET_DATA.map((atv) => (
                  <button
                    key={atv.id}
                    role="tab"
                    aria-selected={selectedAtv === atv.id}
                    onClick={() => setSelectedAtv(atv.id)}
                    className={`shrink-0 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold font-space transition-all cursor-pointer ${
                      selectedAtv === atv.id
                        ? "bg-[#D4FF00] border-[#D4FF00] text-black shadow-[0_4px_15px_rgba(212,255,0,0.25)]"
                        : "bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {atv.name.split(" ")[1] || atv.name}
                  </button>
                ))}
              </div>

              <div className="bg-zinc-950/90 border border-zinc-800/90 rounded-2xl p-5 sm:p-6 relative overflow-hidden shadow-2xl" role="tabpanel" aria-label={`Detalii ${currentAtvObj.name}`}>
                <div className="absolute top-0 right-0 py-1.5 px-3 bg-[#D4FF00] text-black font-mono text-[10px] sm:text-[11px] font-bold uppercase rounded-bl-xl shadow-md">
                  {currentAtvObj.badge}
                </div>

                <h3 className="text-lg sm:text-xl font-black text-white pr-20 uppercase font-display italic">
                  {currentAtvObj.name}
                </h3>

                <div className="grid grid-cols-2 gap-3 mt-4 pb-4 border-b border-zinc-900 text-[11px] sm:text-xs font-space text-zinc-400">
                  <div className="bg-zinc-900/60 p-3 rounded-lg flex flex-col justify-center">
                    <span className="text-[10px] sm:text-[11px] text-zinc-400 uppercase font-mono">Motor Spec</span>
                    <strong className="text-white mt-1">{currentAtvObj.engine}</strong>
                  </div>
                  <div className="bg-zinc-900/60 p-3 rounded-lg flex flex-col justify-center">
                    <span className="text-[10px] sm:text-[11px] text-zinc-400 uppercase font-mono">Putere Brută</span>
                    <strong className="text-[#D4FF00] mt-1">{currentAtvObj.power}</strong>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-xs sm:text-sm text-zinc-300">
                  {currentAtvObj.specs.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] shrink-0" aria-hidden="true"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 pt-4 border-t border-zinc-900 flex justify-between items-center bg-zinc-900/10 -mx-5 -mb-5 p-5 sm:-mx-6 sm:-mb-6 sm:p-6 rounded-b-2xl">
                  <div>
                    <div className="text-[10px] sm:text-[11px] text-zinc-400 uppercase font-mono tracking-wider">Tarif Închiriere</div>
                    <div className="text-xl sm:text-2xl font-black font-display text-white">
                      {currentAtvObj.pricePerHour} <span className="text-xs sm:text-sm text-[#D4FF00]">RON / ORĂ</span>
                    </div>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-zinc-300 font-mono text-right bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-lg">
                    Combustibil complet inclus
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="map-heading" className="flex flex-col gap-3">
              <h2 id="map-heading" className="text-[11px] sm:text-xs font-mono tracking-widest text-zinc-400 uppercase">
                Locaţia Traseului în Comana
              </h2>

              <div className="bg-white/5 backdrop-blur-md border border-[#D4FF00]/20 rounded-2xl overflow-hidden shadow-xl p-2 relative" ref={mapRef}>
                <div className="flex justify-between items-center px-3 py-2.5 text-[11px] sm:text-xs font-space text-zinc-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#D4FF00]" aria-hidden="true" />
                    <span className="font-semibold">{SITE_CONFIG.location.name}</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-[#D4FF00] font-mono uppercase bg-[#D4FF00]/10 px-2 py-1 rounded">
                    {SITE_CONFIG.location.distance}
                  </span>
                </div>

                <a
                  href={SITE_CONFIG.location.googleMapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="relative w-full aspect-[16/10] sm:aspect-video rounded-xl overflow-hidden border border-zinc-900 block group"
                  aria-label="Deschide locația în Google Maps"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 drop-shadow-[0_0_15px_rgba(212,255,0,0.8)] pointer-events-none" aria-hidden="true">
                    <MapPin className="w-10 h-10 text-[#D4FF00] fill-black/50" />
                  </div>

                  {showMap ? (
                    <iframe
                      src={SITE_CONFIG.location.googleMapsEmbed}
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      title="Harta locației ATV Comana în Parcul Natural Comana, Giurgiu"
                      className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 grayscale contrast-[1.2] brightness-[0.7] transition-all duration-300 pointer-events-none group-hover:brightness-[0.8] group-hover:grayscale-0"
                    ></iframe>
                  ) : (
                    <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center text-zinc-500 text-sm font-mono">
                      Se încarcă harta...
                    </div>
                  )}
                </a>

                <div className="pt-3 pb-1.5 px-2 flex justify-between items-center text-[10px] sm:text-[11px] text-zinc-400 font-mono bg-zinc-950 rounded-b-xl">
                  <span>*Apasă pe hartă pentru a deschide Google Maps</span>
                  <a
                    href={SITE_CONFIG.location.wazeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#D4FF00] uppercase font-bold hover:underline flex items-center gap-1.5 min-h-[44px] items-center"
                    aria-label="Deschide navigația în Waze"
                  >
                    Deschide Waze <Navigation className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </section>

            <section aria-labelledby="trails-heading" className="flex flex-col gap-4">
              <h2 id="trails-heading" className="text-[11px] sm:text-xs font-mono tracking-widest text-zinc-400 uppercase">
                Trasee Off-Road Disponibile
              </h2>

              <div className="space-y-3.5">
                {TRAILS.map((trail, index) => (
                  <article key={index} className="bg-zinc-950/50 border border-zinc-900/80 rounded-xl p-4 sm:p-5 relative overflow-hidden group">
                    <div className="absolute top-0 right-3 flex gap-1.5">
                      <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 bg-zinc-900 text-zinc-300 border border-zinc-800/80 rounded-b font-medium uppercase">
                        {trail.time}
                      </span>
                      <span className={`text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-b font-bold uppercase text-black ${
                        trail.difficulty === 'Uşor' ? 'bg-emerald-400' :
                        trail.difficulty === 'Mediu' ? 'bg-[#D4FF00]' : 'bg-red-500'
                      }`}>
                        {trail.difficulty}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#D4FF00] transition-colors uppercase pt-1 font-space">
                      {trail.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                      {trail.description}
                    </p>

                    <div className="mt-3 flex justify-end">
                      <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase bg-zinc-900/60 px-2 py-1 rounded">
                        {"🏷️"} {trail.tag}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <div className="block lg:hidden mt-2">
              <CalculatorForm />
            </div>

            <section aria-labelledby="about-heading" className="flex flex-col gap-3 mt-4">
              <h2 id="about-heading" className="text-[11px] sm:text-xs font-mono tracking-widest text-zinc-400 uppercase">
                Despre ATV Comana Prestige
              </h2>

              <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-5 sm:p-6 text-zinc-300 font-sans leading-relaxed text-sm">
                <p className="mb-4">
                  Suntem centrul principal de <strong className="text-white">închirieri ATV din zona de Sud (București - Giurgiu)</strong>, localizați strategic la porțile Parcului Natural Comana. Cu o experiență vastă în turismul de aventură, misiunea noastră este să oferim experiențe off-road premium, sigure și memorabile.
                </p>
                <ul className="space-y-2 mb-4 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4FF00] mt-0.5" aria-hidden="true">&#10003;</span>
                    <span><strong>Flotă de Ultimă Generație:</strong> Utilizăm exclusiv ATV-uri CFMOTO 4x4 (capacități între 500cc și 1000cc), perfect întreținute.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4FF00] mt-0.5" aria-hidden="true">&#10003;</span>
                    <span><strong>Siguranță Zero Compromisuri:</strong> Fiecare sesiune include instructaj profesional și echipament de protecție complet (cască omologată, cagulă, vizieră).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4FF00] mt-0.5" aria-hidden="true">&#10003;</span>
                    <span><strong>Trasee Unice:</strong> Exploram trasee nepoluate, păduri seculare și zone de noroi inaccesibile turismului clasic.</span>
                  </li>
                </ul>
                <p className="text-[11px] sm:text-xs text-zinc-400 italic">
                  Căutate frecvent de pasionații de adrenalină, traseele noastre sunt recunoscute ca fiind cele mai bine organizate din apropierea capitalei, la doar 40 de minute de centrul Bucureștiului.
                </p>
              </div>
            </section>

            <section aria-labelledby="faq-heading" className="flex flex-col gap-3">
              <h2 id="faq-heading" className="text-[11px] sm:text-xs font-mono tracking-widest text-zinc-400 uppercase">
                Întrebări Frecvente
              </h2>

              <div className="space-y-2.5">
                {FAQS.map((faq, index) => (
                  <FAQAccordionItem
                    key={index}
                    faq={faq}
                    isOpen={activeFAQ === index}
                    onToggle={() => handleFAQToggle(index)}
                  />
                ))}
              </div>
            </section>

          </div>

          <aside className="hidden lg:block w-[420px] xl:w-[480px] shrink-0" aria-label="Calculator prețuri">
            <div className="sticky top-24">
              <CalculatorForm />
            </div>
          </aside>

        </div>
      </main>

      <footer className="w-full max-w-7xl mx-auto px-6 py-10 text-center border-t border-zinc-950 mt-10 flex flex-col items-center gap-3">
        <div className="text-sm font-black italic tracking-widest text-[#D4FF00] font-display">
          {SITE_CONFIG.brand.name}
        </div>
        <p className="text-[11px] sm:text-xs text-zinc-400 font-mono leading-normal max-w-sm uppercase">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.brand.name}. TOATE DREPTURILE REZERVATE. <br />
          AVENTURĂ PE ROŢI ÎN SIGURANŢĂ EXTREMĂ.
        </p>
      </footer>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-full max-w-[340px] px-4 flex justify-center z-50 pointer-events-auto">
        <a
          href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
          className="w-full bg-[#D4FF00] py-4 rounded-full flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(212,255,0,0.5)] active:scale-95 transition-transform animate-pulse-glow text-black font-black uppercase text-sm tracking-tighter"
          aria-label={`Sună acum la ${SITE_CONFIG.contact.phoneDisplay}`}
        >
          <Phone className="w-5 h-5 fill-black" stroke="black" strokeWidth="1" aria-hidden="true" />
          <span>Rezervă Acum: {SITE_CONFIG.contact.phoneDisplay}</span>
        </a>
      </div>

    </div>
  );
}
