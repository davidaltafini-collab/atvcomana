import './index.css';

type Atv = {
  id: string;
  name: string;
  badge: string;
  engine: string;
  power: string;
  price: number;
  specs: string[];
};

const atvs: Record<string, Atv> = {
  'cfmoto-520': {
    id: 'cfmoto-520',
    name: 'CFMOTO CForce 520L',
    badge: 'Cel Mai Popular',
    engine: '495 cc (2026 Model)',
    power: '38 HP - 4x4 Selectabil',
    price: 150,
    specs: ['Troliu electric 1200kg', 'Servodirectie electronica EPS', 'Suspensii independente', 'Anvelope off-road'],
  },
  'cfmoto-625': {
    id: 'cfmoto-625',
    name: 'CFMOTO CForce 625 Touring',
    badge: 'Forta Bruta',
    engine: '580 cc',
    power: '45 HP - Cuplu Maxim',
    price: 200,
    specs: ['Sistem EPS inteligent', 'Jante aliaj 12 inch', 'Faruri LED', 'Cutie automata CVT'],
  },
  'cfmoto-1000': {
    id: 'cfmoto-1000',
    name: 'CFMOTO CForce 1000 Overland',
    badge: 'Monstru Off-Road',
    engine: '963 cc V-Twin',
    power: '85 HP',
    price: 300,
    specs: ['Bumper otel fata/spate', 'Scuturi aluminiu', 'Valize impermeabile', 'Amortizoare reglabile'],
  },
};

const calculatorHtml = `
  <div class="bg-zinc-950 border border-[#D4FF00]/20 rounded-2xl p-5 sm:p-6 shadow-xl relative w-full">
    <h3 class="text-sm sm:text-base font-black uppercase text-white font-display italic tracking-wide mb-5">Calculator Tarif & Rezervare</h3>
    <div class="space-y-5">
      <div>
        <label for="atv-select" class="text-[10px] sm:text-xs uppercase font-mono text-zinc-400 block mb-1.5">Model ATV Selectat</label>
        <select id="atv-select" class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 min-h-[44px] text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4FF00] cursor-pointer">
          <option value="cfmoto-520">CFMOTO CForce 520L (150 RON/h)</option>
          <option value="cfmoto-625">CFMOTO CForce 625 Touring (200 RON/h)</option>
          <option value="cfmoto-1000">CFMOTO CForce 1000 Overland (300 RON/h)</option>
        </select>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-[10px] sm:text-xs uppercase font-mono text-zinc-400 flex justify-between mb-2"><span>Cantitate</span><strong class="text-white text-[12px] sm:text-sm"><span id="count-label">2</span> ATV</strong></label>
          <input id="atv-count" type="range" min="1" max="8" value="2" class="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer" />
        </div>
        <div>
          <label class="text-[10px] sm:text-xs uppercase font-mono text-zinc-400 flex justify-between mb-2"><span>Durata</span><strong class="text-[#D4FF00] text-[12px] sm:text-sm"><span id="duration-label">2</span> Ore</strong></label>
          <input id="atv-duration" type="range" min="1" max="8" value="2" class="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="atv-date" class="text-[10px] sm:text-xs uppercase font-mono text-zinc-400 block mb-1.5">Data Traseu</label>
          <input id="atv-date" type="date" class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 min-h-[44px] block text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4FF00] [color-scheme:dark]" />
        </div>
        <div>
          <label for="atv-time" class="text-[10px] sm:text-xs uppercase font-mono text-zinc-400 block mb-1.5">Ora Plecarii</label>
          <select id="atv-time" class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 min-h-[44px] block text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4FF00] cursor-pointer">
            <option value="09:00">09:00</option>
            <option value="11:00">11:00</option>
            <option value="13:00">13:00</option>
            <option value="15:00">15:00</option>
            <option value="17:00">17:00</option>
            <option value="19:00">19:00</option>
          </select>
        </div>
      </div>
      <div>
        <label for="atv-name-input" class="text-[10px] sm:text-xs uppercase font-mono text-zinc-400 block mb-1.5">Numele Tau (Optional)</label>
        <input id="atv-name-input" type="text" placeholder="Ex: Andrei Popescu" class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 min-h-[44px] block text-xs sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#D4FF00] font-mono" />
      </div>
      <div class="bg-[#121212] rounded-xl p-4 border border-zinc-900 flex justify-between items-center mt-2">
        <div>
          <div class="text-[10px] sm:text-[11px] text-zinc-400 uppercase font-mono">Calcul Estimativ</div>
          <div class="text-[11px] sm:text-xs text-zinc-300 font-space mt-1"><span id="summary-count">2</span> ATV x <span id="summary-duration">2</span> ore</div>
        </div>
        <div class="text-right">
          <div class="text-[10px] sm:text-[11px] text-zinc-400 uppercase font-mono">Total de Plata</div>
          <div class="text-xl sm:text-2xl font-black font-display text-[#D4FF00] mt-1"><span id="total-price">600</span> RON</div>
        </div>
      </div>
      <a id="whatsapp-reservation" href="https://wa.me/40731441122" target="_blank" rel="noreferrer" class="w-full inline-flex items-center justify-center gap-2 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold uppercase text-xs sm:text-sm rounded-xl transition-all duration-200 shadow-lg active:scale-[0.98] cursor-pointer">Trimite Rezervarea pe WhatsApp</a>
      <p class="text-center text-[10px] sm:text-[11px] text-zinc-400 font-mono italic">*Preturile includ echipamentul, ghidul si instructajul.</p>
    </div>
`;

function qs<T extends Element>(selector: string, root: ParentNode = document): T | null {
  return root.querySelector<T>(selector);
}

function renderSpecs(atv: Atv) {
  const specs = qs<HTMLUListElement>('#atv-specs');
  if (!specs) return;
  specs.innerHTML = atv.specs
    .map((item) => `<li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-[#D4FF00] shrink-0"></span><span>${item}</span></li>`)
    .join('');
}

function setAtv(id: string) {
  const atv = atvs[id] || atvs['cfmoto-520'];
  qs<HTMLElement>('#atv-name')!.textContent = atv.name;
  qs<HTMLElement>('#atv-badge')!.textContent = atv.badge;
  qs<HTMLElement>('#atv-engine')!.textContent = atv.engine;
  qs<HTMLElement>('#atv-power')!.textContent = atv.power;
  qs<HTMLElement>('#atv-price')!.textContent = String(atv.price);
  renderSpecs(atv);

  document.querySelectorAll<HTMLButtonElement>('.atv-tab').forEach((button) => {
    const active = button.dataset.atv === atv.id;
    button.classList.toggle('bg-[#D4FF00]', active);
    button.classList.toggle('border-[#D4FF00]', active);
    button.classList.toggle('text-black', active);
    button.classList.toggle('bg-zinc-950/80', !active);
    button.classList.toggle('border-zinc-800', !active);
    button.classList.toggle('text-zinc-400', !active);
  });

  document.querySelectorAll<HTMLSelectElement>('#atv-select').forEach((select) => {
    select.value = atv.id;
  });
  updateCalculator();
}

function updateCalculator() {
  const select = qs<HTMLSelectElement>('#atv-select');
  const count = Number(qs<HTMLInputElement>('#atv-count')?.value || 2);
  const duration = Number(qs<HTMLInputElement>('#atv-duration')?.value || 2);
  const atv = atvs[select?.value || 'cfmoto-520'];
  const total = count * duration * atv.price;

  document.querySelectorAll<HTMLElement>('#count-label, #summary-count').forEach((el) => { el.textContent = String(count); });
  document.querySelectorAll<HTMLElement>('#duration-label, #summary-duration').forEach((el) => { el.textContent = String(duration); });
  document.querySelectorAll<HTMLElement>('#total-price').forEach((el) => { el.textContent = String(total); });

  const date = qs<HTMLInputElement>('#atv-date')?.value || 'Nespecificat';
  const time = qs<HTMLSelectElement>('#atv-time')?.value || '12:00';
  const name = qs<HTMLInputElement>('#atv-name-input')?.value || '';
  const message = `Salut! As dori sa rezerv ATV in Comana:
- Model ATV: ${atv.name}
- Numar ATV-uri: ${count}
- Durata traseu: ${duration} ore
- Data dorita: ${date}
- Ora estimata: ${time}
${name ? `- Nume client: ${name}\n` : ''}- Cost estimat: ${total} RON`;

  qs<HTMLAnchorElement>('#whatsapp-reservation')!.href = `https://wa.me/40731441122?text=${encodeURIComponent(message)}`;
}

function mountCalculator() {
  const target = window.matchMedia('(min-width: 1024px)').matches
    ? qs<HTMLElement>('[data-calculator-desktop]')
    : qs<HTMLElement>('[data-calculator-mobile]');
  if (!target) return;
  target.innerHTML = calculatorHtml;
}

mountCalculator();
renderSpecs(atvs['cfmoto-520']);
qs<HTMLElement>('#year')!.textContent = String(new Date().getFullYear());

document.querySelectorAll<HTMLButtonElement>('.atv-tab').forEach((button) => {
  button.addEventListener('click', () => setAtv(button.dataset.atv || 'cfmoto-520'));
});

document.addEventListener('input', (event) => {
  const target = event.target as HTMLElement;
  if (target.matches('#atv-count, #atv-duration, #atv-name-input')) updateCalculator();
});

document.addEventListener('change', (event) => {
  const target = event.target as HTMLElement;
  if (target.matches('#atv-select')) setAtv((target as HTMLSelectElement).value);
  if (target.matches('#atv-date, #atv-time')) updateCalculator();
});

const today = new Date();
const dateInput = qs<HTMLInputElement>('#atv-date');
if (dateInput) {
  dateInput.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}
updateCalculator();
