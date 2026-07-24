import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "../style.css";

const families = [
  "minimal",
  "bold",
  "classic",
  "swiss",
  "bauhaus",
  "luxury",
  "gradient",
  "mono",
  "pastel",
  "corporate",
];
const initialBackItems = [
  {
    id: "back-company",
    type: "company",
    text: "MY STUDIO",
    x: 35,
    y: 42,
    size: 140,
    side: "back",
  },
  {
    id: "back-web",
    type: "detail",
    text: "example.com",
    x: 42,
    y: 60,
    size: 100,
    side: "back",
  },
];
const familyNames = [
  "브랜드 미니멀",
  "크리에이티브 볼드",
  "클래식",
  "스위스 그리드",
  "아트 스튜디오",
  "프리미엄 골드",
  "테크 그라디언트",
  "모노 타이포",
  "뷰티 라이프",
  "프로페셔널",
];
const finishes = [
  ["smooth", "클린"],
  ["cotton", "코튼"],
  ["kraft", "내추럴"],
  ["metal", "메탈"],
  ["hologram", "스페셜"],
];
const legacyTemplates = families.flatMap((family, i) =>
  finishes.map(([material, finish], j) => ({
    id: i * 5 + j + 1,
    family,
    name: `${familyNames[i]} ${finish}`,
    material,
    corners: j === 4 ? "round" : j % 2 ? "square" : "soft",
  })),
);
const designFamilies = [
  "브랜드 미니멀",
  "크리에이티브 볼드",
  "클래식 에디션",
  "스위스 그리드",
  "바우하우스 스튜디오",
  "프리미엄 골드",
  "테크 그래디언트",
  "모노 타이포",
  "파스텔 라이프",
  "프로페셔널",
];
const designVariants = [
  { name: "클린", material: "smooth", corners: "soft", density: "balanced", align: "left", decoration: "none" },
  { name: "프레임", material: "cotton", corners: "square", density: "inset", align: "left", decoration: "frame" },
  { name: "사이드라인", material: "smooth", corners: "soft", density: "edge", align: "split", decoration: "rail" },
  { name: "스포트라이트", material: "softtouch", corners: "round", density: "airy", align: "center", decoration: "spot" },
  { name: "다이애그널", material: "metal", corners: "square", density: "compact", align: "bottom", decoration: "diagonal" },
  { name: "그리드", material: "linen", corners: "soft", density: "balanced", align: "left", decoration: "grid" },
  { name: "아치", material: "cotton", corners: "round", density: "airy", align: "center", decoration: "arch" },
  { name: "블록", material: "kraft", corners: "square", density: "compact", align: "split", decoration: "block" },
  { name: "오로라", material: "hologram", corners: "round", density: "inset", align: "bottom", decoration: "aurora" },
  { name: "에디토리얼", material: "smooth", corners: "soft", density: "edge", align: "vertical", decoration: "editorial" },
];
const legacyDesignTemplates = families.flatMap((family, familyIndex) =>
  designVariants.map((variant, variantIndex) => ({
    id: familyIndex * 10 + variantIndex + 1,
    family,
    name: `${designFamilies[familyIndex]} · ${variant.name}`,
    variant: variantIndex,
    ...variant,
  })),
);
const layoutArchetypes = [
  { company: [7, 10, 90], name: [7, 43, 145], role: [7, 61, 92], contact: [[7, 82], [39, 82], [71, 82]], align: "left", motif: 0 },
  { company: [62, 11, 82], name: [8, 34, 155], role: [9, 55, 90], contact: [[9, 76], [9, 84], [63, 84]], align: "left", motif: 1 },
  { company: [8, 12, 88], name: [50, 38, 145], role: [50, 57, 88], contact: [[8, 80], [40, 80], [70, 80]], align: "center", motif: 2 },
  { company: [72, 12, 84], name: [8, 66, 150], role: [8, 83, 86], contact: [[58, 65], [58, 75], [58, 85]], align: "left", motif: 3 },
  { company: [8, 45, 86], name: [37, 24, 150], role: [38, 43, 90], contact: [[38, 67], [38, 77], [68, 77]], align: "left", motif: 4 },
  { company: [42, 10, 90], name: [42, 39, 148], role: [42, 57, 88], contact: [[42, 76], [42, 84], [70, 84]], align: "left", motif: 5 },
  { company: [8, 12, 90], name: [8, 30, 168], role: [9, 52, 92], contact: [[9, 74], [9, 83], [62, 83]], align: "left", motif: 6 },
  { company: [50, 13, 92], name: [50, 42, 150], role: [50, 60, 88], contact: [[18, 82], [50, 82], [76, 82]], align: "center", motif: 7 },
  { company: [73, 75, 84], name: [8, 18, 150], role: [8, 37, 90], contact: [[8, 66], [8, 76], [8, 86]], align: "left", motif: 8 },
  { company: [8, 10, 86], name: [8, 70, 145], role: [8, 86, 84], contact: [[58, 17], [58, 27], [58, 37]], align: "left", motif: 9 },
  { company: [46, 14, 88], name: [46, 45, 158], role: [46, 64, 88], contact: [[8, 79], [38, 79], [69, 79]], align: "left", motif: 0 },
  { company: [8, 82, 86], name: [8, 20, 160], role: [8, 41, 90], contact: [[55, 60], [55, 71], [55, 82]], align: "left", motif: 1 },
  { company: [68, 12, 82], name: [50, 40, 152], role: [50, 58, 88], contact: [[14, 80], [46, 80], [74, 80]], align: "center", motif: 2 },
  { company: [10, 16, 88], name: [10, 40, 142], role: [10, 58, 86], contact: [[61, 39], [61, 51], [61, 63]], align: "left", motif: 3 },
  { company: [44, 84, 84], name: [8, 18, 162], role: [8, 39, 90], contact: [[8, 70], [39, 70], [69, 70]], align: "left", motif: 4 },
  { company: [8, 11, 86], name: [33, 37, 150], role: [33, 56, 88], contact: [[33, 76], [58, 76], [58, 85]], align: "left", motif: 5 },
  { company: [50, 12, 90], name: [50, 35, 160], role: [50, 55, 90], contact: [[50, 72], [50, 80], [50, 88]], align: "center", motif: 6 },
  { company: [75, 12, 82], name: [8, 47, 154], role: [8, 66, 88], contact: [[8, 83], [39, 83], [69, 83]], align: "left", motif: 7 },
  { company: [8, 13, 88], name: [57, 26, 148], role: [57, 45, 86], contact: [[57, 65], [57, 75], [57, 85]], align: "left", motif: 8 },
  { company: [8, 78, 84], name: [8, 25, 148], role: [8, 44, 88], contact: [[50, 25], [50, 36], [50, 47]], align: "left", motif: 9 },
];
const imageTemplates = Array.from({ length: 100 }, (_, index) => {
  const base = layoutArchetypes[index % layoutArchetypes.length];
  const atlas = Math.floor(index / 20) + 1;
  const cell = index % 20;
  const column = cell % 4;
  const row = Math.floor(cell / 4);
  const adjust = ([x, y, size]) => [x, y, size];
  return {
    id: index + 1,
    name: `프리미엄 ${String(index + 1).padStart(3, "0")}`,
    motif: 0,
    art: atlas,
    artUrl: `/card-atlas-clean-${atlas}.png`,
    artPosition: `${column * 33.333}% ${row * 25}%`,
    textColor: atlas === 4 || (atlas === 1 && [1, 2, 5, 10, 12, 15, 19].includes(cell)) ? "#f8f5ed" : "#171724",
    angle: (index * 17) % 180,
    motifX: 10 + ((index * 29) % 78),
    motifY: 8 + ((index * 37) % 78),
    motifSize: 18 + ((index * 11) % 34),
    layout: {
      company: adjust(base.company),
      name: adjust(base.name),
      role: adjust(base.role),
      contacts: base.contact.map(([x, y], contactIndex) => [
        x,
        y,
      ]),
      align: base.align,
    },
  };
});
const simplePalettes = [
  ["#ffffff", "#17233b"], ["#f8f6f1", "#262626"], ["#f4f5f7", "#31516f"],
  ["#fffaf2", "#a67b52"], ["#f3f5f0", "#61705b"], ["#17191d", "#d7b46a"],
  ["#10243d", "#dbe7f5"], ["#f7f1ec", "#a96253"], ["#fbfbfa", "#777b82"], ["#182b26", "#b7c9b9"],
];
const simpleTemplates = Array.from({ length: 50 }, (_, index) => {
  const base = layoutArchetypes[index % layoutArchetypes.length];
  const [backgroundColor, accent] = simplePalettes[index % simplePalettes.length];
  const family = index % 5;
  const position = 5 + ((index * 13) % 82);
  const thickness = 1 + (index % 3);
  const backgrounds = [
    `linear-gradient(90deg, ${accent} 0 ${thickness}%, transparent ${thickness}%)`,
    `linear-gradient(180deg, transparent 0 ${position}%, ${accent} ${position}% ${position + thickness}%, transparent ${position + thickness}%)`,
    `linear-gradient(135deg, ${accent} 0 9%, transparent 9% 91%, ${accent} 91%)`,
    `linear-gradient(90deg, transparent 0 72%, ${accent} 72% 74%, transparent 74%), linear-gradient(180deg, ${accent} 0 2%, transparent 2%)`,
    `linear-gradient(180deg, transparent 0 88%, ${accent} 88% 100%), linear-gradient(90deg, ${accent} 0 18%, transparent 18%)`,
  ];
  return {
    id: `simple-${index + 1}`,
    name: `심플 ${String(index + 1).padStart(2, "0")}`,
    motif: 0,
    simple: index + 1,
    simpleBackground: `${backgrounds[family]}, ${backgroundColor}`,
    textColor: [5, 6, 9].includes(index % 10) ? "#f8f7f2" : "#171724",
    layout: {
      company: base.company,
      name: base.name,
      role: base.role,
      contacts: base.contact,
      align: base.align,
    },
  };
});
const templates = [...simpleTemplates, ...imageTemplates];
const defaults = {
  minimal: ["#fff", "#171724", "#635bff"],
  bold: ["#141419", "#fff", "#ff5c35"],
  classic: ["#f7f2e8", "#2f2923", "#8b6945"],
  swiss: ["#f7f7f3", "#171724", "#ef3340"],
  bauhaus: ["#f5f1e7", "#18213a", "#2563eb"],
  luxury: ["#0d2420", "#e8d5a0", "#d3b66d"],
  gradient: ["#5b5ff0", "#fff", "#7c3aed"],
  mono: ["#f4f3ef", "#111", "#111"],
  pastel: ["#fff8f5", "#4e3e48", "#d98aa2"],
  corporate: ["#fff", "#112a46", "#2563eb"],
};
const initialItems = [
  { id: "company", type: "company", text: "MY STUDIO", x: 8, y: 14, size: 100 },
  { id: "name", type: "name", text: "김민준", x: 8, y: 51, size: 100 },
  {
    id: "role",
    type: "role",
    text: "Product Designer",
    x: 8,
    y: 65,
    size: 100,
  },
  {
    id: "email",
    type: "detail",
    text: "hello@example.com",
    x: 8,
    y: 84,
    size: 100,
  },
  {
    id: "phone",
    type: "detail",
    text: "010 1234 5678",
    x: 40,
    y: 84,
    size: 100,
  },
  {
    id: "website",
    type: "detail",
    text: "example.com",
    x: 72,
    y: 84,
    size: 100,
  },
].map((item) => ({ ...item, side: "front" }));
const initialCardItems = [...initialItems, ...initialBackItems];
const resumeTemplates = Array.from({ length: 50 }, (_, index) => {
  const atlas = Math.floor(index / 10) + 1;
  const cell = index % 10;
  return {
    id: index + 1,
    base: "ai",
    variant: `ai-${index + 1}`,
    atlas,
    artUrl: `/resume-atlas-${atlas}.png`,
    artPosition: `${(cell % 5) * 25}% ${Math.floor(cell / 5) * 100}%`,
    english: index % 6 === 5,
  };
});

function Header() {
  const [dark, setDark] = useState(
    localStorage.getItem("cardly-theme") === "dark",
  );
  React.useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("cardly-theme", dark ? "dark" : "light");
  }, [dark]);
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Cardly 홈으로 이동">
        <span className="brand-mark">C</span>
        <span>Cardly</span>
      </a>
      <nav className="site-nav">
        <a href="/business-card/">명함 만들기</a>
        <a href="/resume/">이력서 만들기</a>
        <a href="/invitation/">초대장 만들기</a>
        <a href="/about/">소개</a>
        <a href="/contact/">문의</a>
      </nav>
      <button className="theme-toggle" onClick={() => setDark(!dark)}>
        {dark ? "☀ 화이트" : "☾ 다크"}
      </button>
    </header>
  );
}
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner section-shell">
        <a className="brand" href="index.html">
          <span className="brand-mark">C</span>Cardly
        </a>
        <nav>
          <a href="/business-card/">명함 만들기</a>
          <a href="/resume/">이력서 만들기</a>
          <a href="/invitation/">초대장 만들기</a>
          <a href="/privacy/">개인정보처리방침</a>
          <a href="/terms/">이용약관</a>
        </nav>
      </div>
      <p className="copyright">© 2026 Cardly.</p>
    </footer>
  );
}
function Shell({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function Home() {
  return (
    <Shell>
      <main>
        <section className="hero section-shell">
          <div className="hero-copy">
            <span className="free-badge">회원가입 0 · 결제 0 · 다운로드 0원</span>
            <h1>
              만들고 싶은 순간을
              <br />
              <em>가볍게, 근사하게.</em>
            </h1>
            <p>명함부터 이력서, 모바일 초대장까지. 고른 뒤 바로 편집하고 고화질로 저장하세요. Cardly의 모든 기능은 완전 무료입니다.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="/business-card/">
                무료로 디자인하기
              </a>
              <a className="button button-secondary" href="#cardly-tools">
                템플릿 둘러보기
              </a>
            </div>
            <ul className="trust-list">
              <li>광고성 결제 유도 없음</li>
              <li>모바일 편집 지원</li>
              <li>PNG·PDF 고화질 저장</li>
            </ul>
          </div>
          <div className="hero-visual">
            <img src="/cardly-studio-hero-v2.png" alt="명함, 이력서, 초대장이 놓인 Cardly 디자인 스튜디오" />
            <div className="hero-stat hero-stat-card"><b>150</b><span>명함 디자인</span></div>
            <div className="hero-stat hero-stat-resume"><b>50</b><span>이력서 양식</span></div>
            <div className="hero-stat hero-stat-invite"><b>30</b><span>초대장 템플릿</span></div>
          </div>
        </section>
        <section className="tool-showcase section-shell" id="cardly-tools">
          <div className="section-heading centered-heading">
            <span className="eyebrow">CARDLY TOOLS</span>
            <h2>오늘 필요한 것부터 시작하세요</h2>
            <p>복잡한 가입이나 설치 없이, 템플릿을 고르면 바로 편집이 시작됩니다.</p>
          </div>
          <div className="tool-card-grid">
            <a className="tool-card tool-card-business" href="/business-card/">
              <div className="tool-card-art" aria-hidden="true" />
              <div className="tool-card-copy"><span>BUSINESS CARD · 150</span><h3>나를 기억하게 만드는 명함</h3><p>텍스트·색상·배치를 자유롭게 바꾸고 PNG로 저장하세요.</p><b>명함 만들기 <i>→</i></b></div>
            </a>
            <a className="tool-card tool-card-resume" href="/resume/">
              <div className="tool-card-art" aria-hidden="true" />
              <div className="tool-card-copy"><span>RESUME · 50</span><h3>내용이 먼저 보이는 이력서</h3><p>A4 규격 그대로 편집하고 선명한 PDF로 내려받으세요.</p><b>이력서 만들기 <i>→</i></b></div>
            </a>
            <a className="tool-card tool-card-invite" href="/invitation/">
              <div className="tool-card-art" aria-hidden="true" />
              <div className="tool-card-copy"><span>INVITATION · 30</span><h3>마음을 담아 보내는 초대장</h3><p>청첩장·생일·모임·행사 소식을 모바일 카드로 완성하세요.</p><b>초대장 만들기 <i>→</i></b></div>
            </a>
          </div>
        </section>
        <section className="free-promise section-shell">
          <span className="eyebrow">FREE, FOR REAL</span>
          <h2>가격표가 없는 디자인 도구</h2>
          <p>무료 체험이 아닙니다. Cardly는 템플릿 선택부터 편집, 고화질 저장까지 그 어떤 결제도 받지 않습니다.</p>
          <a className="button button-primary" href="/business-card/">지금 바로 만들기</a>
        </section>
      </main>
    </Shell>
  );
}

function Maker() {
  const cardRef = useRef();
  const historyRef = useRef([]);
  const futureRef = useRef([]);
  const [, setHistoryVersion] = useState(0);
  const [template, setTemplate] = useState(templates[0]);
  const [items, setItems] = useState(() => {
    try {
      const savedItems = JSON.parse(
        localStorage.getItem("cardly-project"),
      )?.items;
      if (!Array.isArray(savedItems) || savedItems.length === 0)
        return initialCardItems;
      return savedItems.map((item) => ({
        ...item,
        side: item.side || "front",
      }));
    } catch {
      return initialCardItems;
    }
  });
  const [side, setSide] = useState("front");
  const [autoSave, setAutoSave] = useState(
    localStorage.getItem("cardly-autosave") === "on",
  );
  const [selected, setSelected] = useState(null);
  const [colors, setColors] = useState({
    bg: "#ffffff",
    text: "#171724",
    accent: "#635bff",
  });
  const [material, setMaterial] = useState("smooth");
  const [corners, setCorners] = useState("soft");
  const [font, setFont] = useState('"Noto Sans KR",sans-serif');
  const remember = () => {
    historyRef.current = [
      ...historyRef.current.slice(-29),
      items.map((item) => ({ ...item })),
    ];
    futureRef.current = [];
    setHistoryVersion((value) => value + 1);
  };
  const undo = () => {
    const previous = historyRef.current.pop();
    if (!previous) return;
    futureRef.current.push(items.map((item) => ({ ...item })));
    setItems(previous);
    setSelected(null);
    setHistoryVersion((value) => value + 1);
  };
  const redo = () => {
    const next = futureRef.current.pop();
    if (!next) return;
    historyRef.current.push(items.map((item) => ({ ...item })));
    setItems(next);
    setSelected(null);
    setHistoryVersion((value) => value + 1);
  };
  const choose = (t) => {
    remember();
    setTemplate(t);
    setColors((current) => ({ ...current, text: t.textColor }));
    const positions = {
      company: t.layout.company,
      name: t.layout.name,
      role: t.layout.role,
      email: [...t.layout.contacts[0], 100],
      phone: [...t.layout.contacts[1], 100],
      website: [...t.layout.contacts[2], 100],
    };
    setItems((list) =>
      list.map((item) => {
        const position = item.side === "front" ? positions[item.id] : null;
        if (!position) return item;
        return {
          ...item,
          x: position[0],
          y: position[1],
          size: position[2],
          align: t.layout.align,
        };
      }),
    );
  };
  const patchItem = (id, patch) =>
    setItems((list) =>
      list.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  const dragStart = (e, item) => {
    if (e.detail > 1) return;
    e.preventDefault();
    remember();
    setSelected(item.id);
    const rect = cardRef.current.getBoundingClientRect(),
      startX = e.clientX,
      startY = e.clientY,
      originX = item.x,
      originY = item.y;
    const target = e.currentTarget;
    const pointerId = e.pointerId;
    target.setPointerCapture(pointerId);
    const cleanup = () => {
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerup", cleanup);
      target.removeEventListener("pointercancel", cleanup);
      target.removeEventListener("lostpointercapture", cleanup);
      if (target.hasPointerCapture(pointerId))
        target.releasePointerCapture(pointerId);
    };
    const move = (ev) => {
      if (ev.pointerId !== pointerId) return;
      if (ev.pointerType === "mouse" && ev.buttons !== 1) {
        cleanup();
        return;
      }
      patchItem(item.id, {
        x: Math.max(
          0,
          Math.min(92, originX + ((ev.clientX - startX) / rect.width) * 100),
        ),
        y: Math.max(
          0,
          Math.min(92, originY + ((ev.clientY - startY) / rect.height) * 100),
        ),
      });
    };
    target.addEventListener("pointermove", move);
    target.addEventListener("pointerup", cleanup);
    target.addEventListener("pointercancel", cleanup);
    target.addEventListener("lostpointercapture", cleanup);
  };
  const add = (type) =>
    (remember(), setItems((list) => [
      ...list,
      {
        id: crypto.randomUUID(),
        type,
        text: {
          text: "새 텍스트",
          email: "email@example.com",
          phone: "010-0000-0000",
          logo: "LOGO",
          divider: "",
          circle: "",
          square: "",
        }[type],
        x: 42,
        y: 44,
        size: 100,
        side,
      },
    ]));
  const duplicateSelected = () => {
    const source = items.find((item) => item.id === selected);
    if (!source) return;
    remember();
    const copy = {
      ...source,
      id: crypto.randomUUID(),
      x: Math.min(88, source.x + 4),
      y: Math.min(88, source.y + 4),
    };
    setItems((list) => [...list, copy]);
    setSelected(copy.id);
  };
  const centerSelected = () => {
    if (!selected) return;
    remember();
    patchItem(selected, { x: 50, y: 46 });
  };
  const addImage = (file) => {
    if (!file?.type.startsWith("image/")) return;
    remember();
    const reader = new FileReader();
    reader.onload = () =>
      setItems((list) => [
        ...list,
        {
          id: crypto.randomUUID(),
          type: "image",
          src: reader.result,
          text: "",
          x: 8,
          y: 10,
          size: 100,
          side,
        },
      ]);
    reader.readAsDataURL(file);
  };
  React.useEffect(() => {
    localStorage.setItem("cardly-autosave", autoSave ? "on" : "off");
    if (autoSave) {
      try {
        localStorage.setItem("cardly-project", JSON.stringify({ items }));
      } catch {
        setAutoSave(false);
      }
    }
  }, [autoSave, items]);
  const save = async () => {
    const { default: html2canvas } = await import("html2canvas");
    setSelected(null);
    await new Promise((r) => setTimeout(r));
    const canvas = await html2canvas(cardRef.current, {
      scale: 5,
      useCORS: true,
      backgroundColor: null,
    });
    const link = document.createElement("a");
    link.download = "cardly-business-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  return (
    <Shell>
      <main className="maker-section maker-page">
        <div className="section-heading section-shell">
          <span className="eyebrow">CARD STUDIO</span>
          <h1>명함 만들기</h1>
          <p>템플릿을 고른 뒤 각 요소를 직접 편집하세요.</p>
        </div>
        <div className="studio section-shell">
          <aside className="editor-panel">
            <div className="editor-heading">
              <span>디자인 설정</span>
              <button
                className="text-button"
                onClick={() => setItems(initialCardItems)}
              >
                초기화
              </button>
            </div>
            <fieldset className="choice-group">
              <legend>
                템플릿 <small>{templates.length}</small>
              </legend>
              <div className="template-grid react-template-grid">
                {templates.map((t) => (
                  <button
                    type="button"
                    key={t.id}
                    className={template.id === t.id ? "active" : ""}
                    aria-pressed={template.id === t.id}
                    title={t.name}
                    onClick={() => choose(t)}
                  >
                    <span
                      className="template-swatch"
                      data-variant={t.motif}
                      data-art={t.art ?? undefined}
                      data-simple={t.simple ?? undefined}
                      style={{
                        "--mini-x": `${t.layout.name[0]}%`,
                        "--mini-y": `${Math.max(8, t.layout.name[1] / 2)}px`,
                        "--mini-w": `${Math.max(24, Math.min(54, t.layout.name[2] / 3))}%`,
                        "--art-position": t.artPosition || "0% 0%",
                        "--art-image": t.artUrl ? `url(${t.artUrl})` : undefined,
                        "--simple-bg": t.simpleBackground,
                      }}
                    >
                      <i />
                      <b>
                        {t.name}
                        <small>{String(t.id).padStart(2, "0")}</small>
                      </b>
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="customize-group">
              <div className="color-pair">
                {["accent", "bg", "text"].map((k) => (
                  <label className="field" key={k}>
                    {k === "accent" ? "포인트" : k === "bg" ? "배경" : "글자"}
                    <input
                      type="color"
                      value={colors[k]}
                      onChange={(e) =>
                        setColors({ ...colors, [k]: e.target.value })
                      }
                    />
                  </label>
                ))}
              </div>
              <label className="field">
                재질
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                >
                  {[
                    ["smooth", "매트"],
                    ["cotton", "코튼"],
                    ["kraft", "크라프트"],
                    ["softtouch", "소프트터치"],
                    ["metal", "메탈"],
                    ["wood", "우드"],
                    ["hologram", "홀로그램"],
                    ["linen", "린넨"],
                    ["leather", "프리미엄 가죽"],
                    ["pearl", "펄 코팅"],
                    ["carbon", "카본 파이버"],
                    ["recycled", "재생지"],
                    ["terrazzo", "테라조"],
                    ["frosted", "프로스트 반투명"],
                  ].map((x) => (
                    <option value={x[0]} key={x[0]}>
                      {x[1]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                글꼴
                <select value={font} onChange={(e) => setFont(e.target.value)}>
                  <option value='"Noto Sans KR",sans-serif'>
                    Noto Sans KR
                  </option>
                  <option value='"Noto Serif KR",serif'>Noto Serif KR</option>
                  <option value='"IBM Plex Sans KR",sans-serif'>
                    IBM Plex Sans KR
                  </option>
                </select>
              </label>
              <label className="photo-drop compact-drop">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => addImage(e.target.files[0])}
                />
                <b>로고·사진 추가</b>
                <span>클릭하거나 캔버스에 드래그</span>
              </label>
            </div>
          </aside>
          <section className="preview-panel">
            <div className="preview-toolbar">
              <b>캔버스 편집</b>
              <span>90 × 50 mm</span>
            </div>
            <div className="side-tabs">
              <button
                className={side === "front" ? "active" : ""}
                onClick={() => {
                  setSide("front");
                  setSelected(null);
                }}
              >
                앞면
              </button>
              <button
                className={side === "back" ? "active" : ""}
                onClick={() => {
                  setSide("back");
                  setSelected(null);
                }}
              >
                뒷면
              </button>
            </div>
            <EditorToolbar
              selected={items.find((x) => x.id === selected)}
              onSize={(size) => patchItem(selected, { size })}
              onText={(text) => patchItem(selected, { text })}
              onColor={(color) => patchItem(selected, { color })}
              defaultColor={colors.text}
              onAdd={add}
              onDuplicate={duplicateSelected}
              onCenter={centerSelected}
              onUndo={undo}
              onRedo={redo}
              canUndo={historyRef.current.length > 0}
              canRedo={futureRef.current.length > 0}
              onDelete={() => {
                remember();
                setItems((x) => x.filter((i) => i.id !== selected));
                setSelected(null);
              }}
            />
            <div className="preview-stage">
              <article
                ref={cardRef}
                className="business-card card-design"
                data-material={material}
                data-corners={corners}
                data-variant={template.motif}
                data-art={template.art ?? undefined}
                data-simple={template.simple ?? undefined}
                style={{
                  "--card-accent": colors.accent,
                  "--card-bg": colors.bg,
                  "--card-text": colors.text,
                  "--design-angle": `${template.angle}deg`,
                  "--motif-x": `${template.motifX}%`,
                  "--motif-y": `${template.motifY}%`,
                  "--motif-size": `${template.motifSize}%`,
                  "--art-position": template.artPosition || "0% 0%",
                  "--art-image": template.artUrl ? `url(${template.artUrl})` : undefined,
                  "--simple-bg": template.simpleBackground,
                  fontFamily: font,
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  addImage(e.dataTransfer.files[0]);
                }}
                onPointerDown={(e) => {
                  if (e.target === e.currentTarget) setSelected(null);
                }}
              >
                {items
                  .filter((item) => item.side === side)
                  .map((item) => (
                    <CardItem
                      key={item.id}
                      item={item}
                      selected={selected === item.id}
                      onPointerDown={(e) => dragStart(e, item)}
                      onSelect={() => setSelected(item.id)}
                      onText={(text) => {
                        if (text === item.text) return;
                        remember();
                        patchItem(item.id, { text });
                      }}
                    />
                  ))}
              </article>
            </div>
            <button
              className="button button-primary download-button"
              onClick={save}
            >
              {side === "front" ? "앞면" : "뒷면"} PNG로 저장하기 ↓
            </button>
            <DataProtection
              items={items}
              setItems={setItems}
              autoSave={autoSave}
              setAutoSave={setAutoSave}
            />
          </section>
        </div>
        <section className="seo-guide" aria-labelledby="business-card-guide-title">
          <span className="eyebrow">FREE BUSINESS CARD MAKER</span>
          <h2 id="business-card-guide-title">무료 명함 템플릿으로 바로 만드는 나만의 명함</h2>
          <p>
            Cardly 명함 만들기는 회원가입, 결제, 다운로드 비용 없이 완전 무료입니다.
            150가지 명함 디자인에서 원하는 양식을 고른 뒤 이름, 직함, 전화번호,
            이메일, 색상과 이미지를 직접 수정하고 고화질 PNG로 저장할 수 있습니다.
          </p>
          <div className="seo-guide-grid">
            <article><b>1</b><h3>명함 템플릿 선택</h3><p>심플한 명함부터 프리미엄 디자인까지 용도에 맞는 양식을 선택하세요.</p></article>
            <article><b>2</b><h3>글자와 이미지 편집</h3><p>각 요소의 위치, 크기와 색상을 바꾸고 로고나 사진을 추가하세요.</p></article>
            <article><b>3</b><h3>무료 PNG 저장</h3><p>완성한 앞면과 뒷면을 결제 없이 고화질 이미지로 내려받으세요.</p></article>
          </div>
        </section>
      </main>
    </Shell>
  );
}
function DataProtection({ items, setItems, autoSave, setAutoSave }) {
  const backup = () => {
    const blob = new Blob([JSON.stringify({ version: 2, items }, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "cardly-backup.json";
    link.click();
    URL.revokeObjectURL(link.href);
  };
  const restore = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (Array.isArray(parsed.items)) setItems(parsed.items);
      } catch {
        window.alert("올바른 Cardly 백업 파일이 아닙니다.");
      }
    };
    reader.readAsText(file);
  };
  const clearExamples = () =>
    setItems((list) =>
      list.map((item) => ({
        ...item,
        text: [
          "김민준",
          "hello@example.com",
          "010 1234 5678",
          "example.com",
        ].includes(item.text)
          ? ""
          : item.text,
      })),
    );
  return (
    <details className="data-protection">
      <summary>데이터 보호 설정</summary>
      <p>
        입력한 정보와 사진은 서버로 전송되지 않고 현재 브라우저에서만
        처리됩니다.
      </p>
      <div className="data-status">
        <span>현재 브라우저 저장 데이터</span>
        <b>{localStorage.getItem("cardly-project") ? "저장됨" : "없음"}</b>
      </div>
      <label className="autosave">
        <input
          type="checkbox"
          checked={autoSave}
          onChange={(e) => setAutoSave(e.target.checked)}
        />{" "}
        자동 저장
      </label>
      <div className="data-actions">
        <button onClick={backup}>JSON 백업</button>
        <label>
          JSON 복원
          <input
            type="file"
            accept="application/json"
            onChange={(e) => restore(e.target.files[0])}
          />
        </label>
        <button onClick={clearExamples}>예제 개인정보 제거</button>
        <button
          className="danger"
          onClick={() => {
            localStorage.removeItem("cardly-project");
            setItems([]);
          }}
        >
          전체 데이터 삭제
        </button>
      </div>
    </details>
  );
}

function EditorToolbar({
  selected,
  onSize,
  onText,
  onColor,
  defaultColor,
  onAdd,
  onDelete,
  onDuplicate,
  onCenter,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}) {
  const [type, setType] = useState("text");
  return (
    <div className="canvas-toolbar">
      {selected && !["divider", "circle", "square", "image"].includes(selected.type) && (
        <label className="canvas-text-editor">
          <span>텍스트</span>
          <input
            value={selected.text || ""}
            onFocus={(event) => event.currentTarget.select()}
            onChange={(event) => onText(event.target.value)}
            aria-label="선택한 명함 텍스트 편집"
          />
        </label>
      )}
      {selected && !["divider", "circle", "square", "image"].includes(selected.type) && (
        <label className="canvas-item-color">
          <span>개별 색상</span>
          <input
            type="color"
            value={selected.color || defaultColor}
            onChange={(event) => onColor(event.target.value)}
            aria-label="선택한 명함 텍스트 색상"
          />
        </label>
      )}
      <select value={type} onChange={(e) => setType(e.target.value)}>
        {["text", "email", "phone", "logo", "divider", "circle", "square"].map(
          (x) => (
            <option value={x} key={x}>
              {
                {
                  text: "텍스트",
                  email: "이메일",
                  phone: "전화",
                  logo: "로고",
                  divider: "구분선",
                  circle: "원",
                  square: "사각형",
                }[x]
              }
            </option>
          ),
        )}
      </select>
      <button onClick={() => onAdd(type)}>＋ 추가</button>
      <label className="size-control">
        크기{" "}
        <input
          type="range"
          min="50"
          max="200"
          value={selected?.size || 100}
          disabled={!selected}
          onChange={(e) => onSize(+e.target.value)}
        />
      </label>
      <button disabled={!selected} onClick={onDuplicate} title="선택 요소 복제">
        복제
      </button>
      <button disabled={!selected} onClick={onCenter} title="캔버스 가운데 정렬">
        가운데
      </button>
      <button disabled={!canUndo} onClick={onUndo} title="실행 취소">
        ↶
      </button>
      <button disabled={!canRedo} onClick={onRedo} title="다시 실행">
        ↷
      </button>
      <button disabled={!selected} onClick={onDelete}>
        삭제
      </button>
    </div>
  );
}
function CardItem({ item, selected, onPointerDown, onSelect, onText }) {
  const shape = ["divider", "circle", "square", "image"].includes(item.type);
  return (
    <div
      className={`movable-element component-${item.type} ${selected ? "is-selected" : ""}`}
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        transform: `scale(${item.size / 100})`,
        textAlign: item.align || "left",
        color: item.color || undefined,
      }}
      onPointerDown={onPointerDown}
      onClick={onSelect}
      contentEditable={!shape}
      suppressContentEditableWarning
      onBlur={(e) => onText(e.currentTarget.textContent)}
    >
      {item.type === "image" ? (
        <img src={item.src} alt="업로드한 요소" />
      ) : (
        item.text
      )}
    </div>
  );
}

function ResumeBlock({ id, layout, selected, onPointerDown, onSelect, className = "", children }) {
  const block = layout[id];
  if (block?.hidden) return null;
  return (
    <div
      className={`resume-canvas-block ${className} ${selected ? "is-selected" : ""}`}
      style={{
        left: `${block?.x || 0}%`,
        top: `${block?.y || 0}%`,
        transform: `scale(${(block?.size || 100) / 100})`,
      }}
      onPointerDown={(event) => onPointerDown(event, id)}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(id);
      }}
    >
      {children}
    </div>
  );
}

function Resume() {
  const sheetRef = useRef();
  const [tpl, setTpl] = useState(resumeTemplates[0]);
  const [font, setFont] = useState('"Noto Sans KR",sans-serif');
  const [photo, setPhoto] = useState("");
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [resumeLayout, setResumeLayout] = useState(() =>
    Object.fromEntries(
      ["photo", "identity", "contact", "profile", "experience", "education", "skills"].map(
        (id) => [id, { x: 0, y: 0, size: 100, hidden: false }],
      ),
    ),
  );
  const [data, setData] = useState({
    name: "한서윤",
    title: "Product Designer",
    email: "hello@cardly.kr",
    phone: "010-1234-5678",
    summary:
      "사용자 문제를 발견하고 명확한 디자인으로 해결하는 프로덕트 디자이너입니다.",
    experience:
      "Cardly · Product Designer · 2024–현재\nStudio One · UX Designer · 2021–2024",
    education: "한국대학교 · 시각디자인학과 · 2021",
    skills: "Product Design, UX Research, Figma, Prototyping",
  });
  const load = (file) => {
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const patchResumeBlock = (id, patch) =>
    setResumeLayout((layout) => ({
      ...layout,
      [id]: { ...layout[id], ...patch },
    }));
  const dragResumeBlock = (event, id) => {
    if (event.detail > 1) return;
    event.preventDefault();
    setSelectedBlock(id);
    const target = event.currentTarget;
    const pointerId = event.pointerId;
    const rect = sheetRef.current.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    const origin = resumeLayout[id];
    target.setPointerCapture(pointerId);
    const cleanup = () => {
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerup", cleanup);
      target.removeEventListener("pointercancel", cleanup);
      if (target.hasPointerCapture(pointerId)) target.releasePointerCapture(pointerId);
    };
    const move = (nextEvent) => {
      if (nextEvent.pointerId !== pointerId) return;
      if (nextEvent.pointerType === "mouse" && nextEvent.buttons !== 1) {
        cleanup();
        return;
      }
      patchResumeBlock(id, {
        x: Math.max(-35, Math.min(35, origin.x + ((nextEvent.clientX - startX) / rect.width) * 100)),
        y: Math.max(-35, Math.min(35, origin.y + ((nextEvent.clientY - startY) / rect.height) * 100)),
      });
    };
    target.addEventListener("pointermove", move);
    target.addEventListener("pointerup", cleanup);
    target.addEventListener("pointercancel", cleanup);
  };
  const save = async () => {
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import("html2canvas"),
      import("jspdf"),
    ]);
    const canvas = await html2canvas(sheetRef.current, {
      scale: 3,
      useCORS: true,
    });
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, 210, 297);
    pdf.save("cardly-resume.pdf");
  };
  const score = Math.min(
    100,
    (data.name ? 10 : 0) +
      (data.title ? 10 : 0) +
      (/^[^@]+@[^@]+\.[^@]+$/.test(data.email) ? 12 : 0) +
      (data.phone ? 8 : 0) +
      (data.summary.length >= 40 ? 15 : data.summary ? 8 : 0) +
      (data.experience.length >= 30 ? 20 : data.experience ? 10 : 0) +
      (data.education ? 10 : 0) +
      (data.skills.split(",").filter(Boolean).length >= 4
        ? 15
        : data.skills.trim()
          ? 8
          : 0),
  );
  const visibleTemplates = resumeTemplates;
  return (
    <Shell>
      <main className="resume-page section-shell">
        <div className="section-heading">
          <span className="eyebrow">RESUME BUILDER</span>
          <h1>이력서 만들기</h1>
          <p>50가지 깔끔한 템플릿과 사진으로 이력서를 완성하세요.</p>
        </div>
        <div className="resume-studio">
          <aside className="resume-editor">
            <fieldset className="resume-template-picker">
              <legend>
                템플릿 선택 <small>{resumeTemplates.length}</small>
              </legend>
              <div className="resume-template-list resume-template-20">
                {visibleTemplates.map((t) => (
                  <label key={t.id}>
                    <input
                      type="radio"
                      checked={tpl.id === t.id}
                      onChange={() => setTpl(t)}
                    />
                    <span className="resume-ai-thumb" style={{ "--resume-art": `url(${t.artUrl})`, "--resume-art-position": t.artPosition }}>
                      <b>{String(t.id).padStart(2, "0")}</b>
                      <i />
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="ats-score">
              <div>
                <strong>완성도·ATS 참고 점수</strong>
                <b>
                  {score}
                  <small>/100</small>
                </b>
              </div>
              <span>
                <i style={{ width: `${score}%` }} />
              </span>
              <p>
                {score >= 85
                  ? "핵심 항목이 충실합니다."
                  : "소개, 경력, 기술을 구체적으로 작성하면 점수가 올라갑니다."}{" "}
                실제 채용 결과를 보장하지 않는 참고 지표입니다.
              </p>
            </div>
            <label className="field">
              글꼴
              <select value={font} onChange={(e) => setFont(e.target.value)}>
                <option value='"Noto Sans KR",sans-serif'>Noto Sans KR</option>
                <option value='"Noto Serif KR",serif'>Noto Serif KR</option>
                <option value='"IBM Plex Sans KR",sans-serif'>
                  IBM Plex Sans KR
                </option>
              </select>
            </label>
            <label
              className="photo-drop"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                load(e.dataTransfer.files[0]);
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => load(e.target.files[0])}
              />
              {photo ? (
                <img src={photo} alt="업로드한 증명사진" />
              ) : (
                <>
                  <b>사진 업로드</b>
                  <span>클릭하거나 이미지를 여기에 드래그하세요</span>
                </>
              )}
            </label>
            {Object.entries(data).map(([k, v]) => (
              <label className="field" key={k}>
                {
                  {
                    name: "이름",
                    title: "직무",
                    email: "이메일",
                    phone: "전화번호",
                    summary: "소개",
                    experience: "경력",
                    education: "학력",
                    skills: "기술",
                  }[k]
                }
                {["summary", "experience", "education"].includes(k) ? (
                  <textarea
                    rows={k === "experience" ? 5 : 3}
                    value={v}
                    onChange={(e) => setData({ ...data, [k]: e.target.value })}
                  />
                ) : (
                  <input
                    value={v}
                    onChange={(e) => setData({ ...data, [k]: e.target.value })}
                  />
                )}
              </label>
            ))}
            <button className="button button-primary" onClick={save}>
              PDF로 저장하기 ↓
            </button>
          </aside>
          <section className="resume-preview-wrap">
            <div className="preview-toolbar">
              <b>실시간 미리보기</b>
              <span>A4</span>
            </div>
            <div className="resume-canvas-toolbar">
              <strong>{selectedBlock ? `${selectedBlock} 블록 선택됨` : "블록을 선택해 이동하세요"}</strong>
              <label>
                크기
                <input
                  type="range"
                  min="70"
                  max="150"
                  value={selectedBlock ? resumeLayout[selectedBlock].size : 100}
                  disabled={!selectedBlock}
                  onChange={(event) => patchResumeBlock(selectedBlock, { size: +event.target.value })}
                />
              </label>
              <button
                disabled={!selectedBlock}
                onClick={() => patchResumeBlock(selectedBlock, { hidden: true })}
              >
                숨기기
              </button>
              <button
                onClick={() => {
                  setResumeLayout(
                    Object.fromEntries(
                      Object.keys(resumeLayout).map((id) => [id, { x: 0, y: 0, size: 100, hidden: false }]),
                    ),
                  );
                  setSelectedBlock(null);
                }}
              >
                배치 초기화
              </button>
            </div>
            <ResumeSheet
              ref={sheetRef}
              tpl={tpl}
              data={data}
              photo={photo}
              font={font}
              english={tpl.english}
              layout={resumeLayout}
              selectedBlock={selectedBlock}
              onBlockPointerDown={dragResumeBlock}
              onBlockSelect={setSelectedBlock}
            />
          </section>
        </div>
        <section className="seo-guide" aria-labelledby="resume-guide-title">
          <span className="eyebrow">FREE RESUME BUILDER</span>
          <h2 id="resume-guide-title">무료 이력서 양식과 이력서 템플릿 50개</h2>
          <p>
            회원가입이나 결제 없이 이력서를 작성하고 A4 PDF로 저장할 수 있습니다.
            깔끔한 이력서 양식을 선택해 증명사진, 자기소개, 경력, 학력과 보유 기술을
            입력하고 각 항목의 위치와 크기를 직접 조정하세요.
          </p>
          <div className="seo-guide-grid">
            <article><b>1</b><h3>이력서 양식 선택</h3><p>내용과 겹치지 않는 인쇄용 A4 이력서 템플릿을 비교하세요.</p></article>
            <article><b>2</b><h3>경력과 사진 입력</h3><p>연락처, 자기소개, 경력과 학력을 입력하고 사진을 추가하세요.</p></article>
            <article><b>3</b><h3>완전 무료 PDF</h3><p>숨겨진 결제나 다운로드 비용 없이 완성한 이력서를 저장하세요.</p></article>
          </div>
        </section>
      </main>
    </Shell>
  );
}
const ResumeSheet = React.forwardRef(
  ({ tpl, data, photo, font, english, layout, selectedBlock, onBlockPointerDown, onBlockSelect }, ref) => (
    <article
      ref={ref}
      className={`resume-sheet resume-${tpl.base} resume-variant-${tpl.variant}`}
      style={{ fontFamily: font, "--resume-art": `url(${tpl.artUrl})`, "--resume-art-position": tpl.artPosition }}
      data-resume-art="true"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onBlockSelect(null);
      }}
    >
      <header className={`resume-head ${photo ? "has-photo" : ""}`}>
        {photo && (
          <ResumeBlock id="photo" layout={layout} selected={selectedBlock === "photo"} onPointerDown={onBlockPointerDown} onSelect={onBlockSelect}>
            <img className="resume-photo" src={photo} alt="이력서 증명사진" />
          </ResumeBlock>
        )}
        <ResumeBlock id="identity" layout={layout} selected={selectedBlock === "identity"} onPointerDown={onBlockPointerDown} onSelect={onBlockSelect}>
          <h2>{data.name}</h2>
          <p>{data.title}</p>
        </ResumeBlock>
        <ResumeBlock id="contact" className="resume-contact" layout={layout} selected={selectedBlock === "contact"} onPointerDown={onBlockPointerDown} onSelect={onBlockSelect}>
          <span>{data.email}</span>
          <span>{data.phone}</span>
        </ResumeBlock>
      </header>
      <div className="resume-body">
        <ResumeBlock id="profile" layout={layout} selected={selectedBlock === "profile"} onPointerDown={onBlockPointerDown} onSelect={onBlockSelect}>
          <h3>{english ? "PROFILE" : "소개"}</h3>
          <p>{data.summary}</p>
        </ResumeBlock>
        <ResumeBlock id="experience" layout={layout} selected={selectedBlock === "experience"} onPointerDown={onBlockPointerDown} onSelect={onBlockSelect}>
          <h3>{english ? "EXPERIENCE" : "경력"}</h3>
          {data.experience.split("\n").map((x) => (
            <p key={x}>{x}</p>
          ))}
        </ResumeBlock>
        <ResumeBlock id="education" layout={layout} selected={selectedBlock === "education"} onPointerDown={onBlockPointerDown} onSelect={onBlockSelect}>
          <h3>{english ? "EDUCATION" : "학력"}</h3>
          <p>{data.education}</p>
        </ResumeBlock>
        <ResumeBlock id="skills" layout={layout} selected={selectedBlock === "skills"} onPointerDown={onBlockPointerDown} onSelect={onBlockSelect}>
          <h3>{english ? "SKILLS" : "기술"}</h3>
          <div className="resume-skills">
            {data.skills.split(",").map((x) => (
              <span key={x}>{x.trim()}</span>
            ))}
          </div>
        </ResumeBlock>
      </div>
    </article>
  ),
);

const invitePresets = {
  wedding: {
    label: "청첩장",
    eyebrow: "WE ARE GETTING MARRIED",
    title: "우리, 결혼합니다",
    names: "한서윤  ·  이도현",
    message: "서로의 하루를 아끼며 살아가겠습니다.\n소중한 날, 함께 축복해 주세요.",
    accent: "#9b6f55",
    theme: "wedding",
  },
  birthday: {
    label: "생일",
    eyebrow: "HAPPY BIRTHDAY",
    title: "생일 파티에 초대해요!",
    names: "서윤의 생일",
    message: "맛있는 음식과 즐거운 이야기를 준비했어요.\n가벼운 마음으로 함께해 주세요.",
    accent: "#ff6b73",
    theme: "birthday",
  },
  gathering: {
    label: "모임",
    eyebrow: "SAVE THE DATE",
    title: "우리, 오랜만에 만나요",
    names: "2026 여름 모임",
    message: "반가운 얼굴들과 느긋한 저녁을 보내요.\n참석 여부를 미리 알려주세요.",
    accent: "#2e7d68",
    theme: "gathering",
  },
  event: {
    label: "행사",
    eyebrow: "YOU ARE INVITED",
    title: "새로운 시작을 공개합니다",
    names: "CARDLY OPEN STUDIO",
    message: "아이디어와 사람을 연결하는 특별한 시간.\nCardly의 첫 번째 행사에 초대합니다.",
    accent: "#5b55e7",
    theme: "event",
  },
};

const inviteTemplates = Array.from({ length: 30 }, (_, index) => {
  const config = index < 8
    ? { atlas: 1, cell: index, kind: "wedding" }
    : index < 15
      ? { atlas: 2, cell: index - 8, kind: "birthday" }
      : index < 22
        ? { atlas: 3, cell: index - 15, kind: "gathering" }
        : { atlas: index < 26 ? 4 : 5, cell: index < 26 ? index - 22 : index - 26, kind: "event" };
  const { atlas, cell, kind } = config;
  return {
    id: index + 1,
    kind,
    artUrl: `/invite-atlas-${atlas}.png`,
    artPosition: `${(cell % 5) * 25}% ${Math.floor(cell / 5) * 100}%`,
    dark: atlas === 4 && [0, 1, 3, 4, 7].includes(cell),
    layout: index % 10,
  };
});

function Invite() {
  const inviteRef = useRef();
  const [kind, setKind] = useState("wedding");
  const [photo, setPhoto] = useState("");
  const [inviteTemplate, setInviteTemplate] = useState(inviteTemplates[0]);
  const [details, setDetails] = useState({
    ...invitePresets.wedding,
    date: "2026-10-24",
    time: "오후 2:00",
    place: "라운드 가든",
    address: "서울특별시 중구 세종대로 110",
    host: "한서윤",
  });
  const changeKind = (nextKind) => {
    const preset = invitePresets[nextKind];
    setKind(nextKind);
    setInviteTemplate(inviteTemplates.find((template) => template.kind === nextKind));
    setDetails((current) => ({ ...current, ...preset }));
  };
  const loadInvitePhoto = (file) => {
    if (!file?.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };
  const saveInvite = async () => {
    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(inviteRef.current, {
      scale: 4,
      useCORS: true,
      backgroundColor: null,
    });
    const link = document.createElement("a");
    link.download = `cardly-invite-${kind}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  const update = (key, value) => setDetails((current) => ({ ...current, [key]: value }));
  return (
    <Shell>
      <main className="invite-page section-shell">
        <div className="section-heading">
          <span className="eyebrow">CARDLY INVITE</span>
          <h1>마음을 전하는 모바일 초대장</h1>
          <p>청첩장부터 생일, 모임, 행사까지 한 장으로 아름답게 완성하세요.</p>
        </div>
        <div className="invite-studio">
          <aside className="invite-editor">
            <div className="invite-kind-tabs">
              {Object.entries(invitePresets).map(([key, preset]) => (
                <button key={key} className={kind === key ? "active" : ""} onClick={() => changeKind(key)}>
                  {preset.label}
                </button>
              ))}
            </div>
            <fieldset className="invite-template-picker">
              <legend>디자인 선택 <small>{inviteTemplates.filter((template) => template.kind === kind).length}</small></legend>
              <div className="invite-template-grid">
                {inviteTemplates.filter((template) => template.kind === kind).map((template) => (
                  <button
                    type="button"
                    key={template.id}
                    className={inviteTemplate.id === template.id ? "active" : ""}
                    onClick={() => setInviteTemplate(template)}
                    aria-label={`초대장 템플릿 ${template.id}`}
                    style={{ "--invite-art": `url(${template.artUrl})`, "--invite-art-position": template.artPosition }}
                  ><span>{String(template.id).padStart(2, "0")}</span></button>
                ))}
              </div>
            </fieldset>
            <label className="field">제목<input value={details.title} onChange={(e) => update("title", e.target.value)} /></label>
            <label className="field">이름·행사명<input value={details.names} onChange={(e) => update("names", e.target.value)} /></label>
            <label className="field">초대 메시지<textarea rows="4" value={details.message} onChange={(e) => update("message", e.target.value)} /></label>
            <div className="field-grid">
              <label className="field">날짜<input type="date" value={details.date} onChange={(e) => update("date", e.target.value)} /></label>
              <label className="field">시간<input value={details.time} onChange={(e) => update("time", e.target.value)} /></label>
            </div>
            <label className="field">장소<input value={details.place} onChange={(e) => update("place", e.target.value)} /></label>
            <label className="field">주소<input value={details.address} onChange={(e) => update("address", e.target.value)} /></label>
            <label className="field">주최자<input value={details.host} onChange={(e) => update("host", e.target.value)} /></label>
            <label className="field invite-color">포인트 색상<input type="color" value={details.accent} onChange={(e) => update("accent", e.target.value)} /></label>
            <label className="photo-drop">
              <input type="file" accept="image/*" onChange={(e) => loadInvitePhoto(e.target.files[0])} />
              <b>{photo ? "대표 사진 변경" : "대표 사진 추가"}</b>
              <span>클릭해서 사진을 선택하세요</span>
            </label>
            {photo && <button type="button" className="invite-photo-remove" onClick={() => setPhoto("")}>사진 삭제</button>}
          </aside>
          <section className="invite-preview-panel">
            <div className="preview-toolbar"><b>모바일 미리보기</b><span>9:16</span></div>
            <article
              ref={inviteRef}
              className={`mobile-invite invite-${details.theme} invite-layout-${inviteTemplate.layout} ${inviteTemplate.dark ? "invite-dark-art" : ""}`}
              data-invite-art="true"
              style={{
                "--invite-accent": details.accent,
                "--invite-art": `url(${inviteTemplate.artUrl})`,
                "--invite-art-position": inviteTemplate.artPosition,
              }}
            >
              <div className="invite-orbit" />
              <span className="invite-eyebrow">{details.eyebrow}</span>
              {photo && <img className="invite-photo" src={photo} alt="초대장 대표" />}
              <div className="invite-main-copy">
                <p>{details.names}</p>
                <h2>{details.title}</h2>
                <div className="invite-rule" />
                <p className="invite-message">{details.message}</p>
              </div>
              <dl className="invite-info">
                <div><dt>DATE</dt><dd>{details.date} · {details.time}</dd></div>
                <div><dt>PLACE</dt><dd>{details.place}<small>{details.address}</small></dd></div>
                <div><dt>HOST</dt><dd>{details.host}</dd></div>
              </dl>
            </article>
            <button className="button button-primary invite-save" onClick={saveInvite}>초대장 이미지 저장 ↓</button>
          </section>
        </div>
      </main>
    </Shell>
  );
}

function About() {
  return (
    <Shell>
      <main className="content-main section-shell">
        <header className="content-hero">
          <span className="eyebrow">ABOUT CARDLY</span>
          <h1>
            명함과 이력서를
            <br />더 자유롭게.
          </h1>
          <p>Cardly는 브라우저에서 바로 사용하는 무료 디자인 웹앱입니다.</p>
        </header>
        <div className="guide-grid">
          <article className="guide-card">
            <h3>명함 편집기</h3>
            <p>150가지 프리미엄 템플릿, 고급 재질, 글꼴과 캔버스 편집을 제공합니다.</p>
          </article>
          <article className="guide-card">
            <h3>이력서 편집기</h3>
            <p>5가지 A4 템플릿과 드래그 사진 업로드, PDF 저장을 지원합니다.</p>
          </article>
          <article className="guide-card">
            <h3>모바일 지원</h3>
            <p>반응형 화면과 터치 조작으로 휴대폰에서도 사용할 수 있습니다.</p>
          </article>
          <article className="guide-card">
            <h3>개인정보 보호</h3>
            <p>디자인 정보와 사진은 브라우저 안에서만 처리됩니다.</p>
          </article>
        </div>
      </main>
    </Shell>
  );
}
function Contact() {
  return (
    <Shell>
      <main className="content-main section-shell">
        <div className="contact-layout">
          <header className="contact-copy">
            <span className="eyebrow">CONTACT</span>
            <h1 className="contact-title">무엇을 도와드릴까요?</h1>
            <p>오류, 기능 제안, 제휴 문의를 보내주세요.</p>
          </header>
          <form
            className="contact-form"
            action="https://formspree.io/f/xkodzkvo"
            method="POST"
          >
            <label className="field">
              이름
              <input name="name" required />
            </label>
            <label className="field">
              이메일
              <input name="email" type="email" required />
            </label>
            <label className="field">
              문의 유형
              <select name="inquiry_type" required defaultValue="">
                <option value="" disabled>
                  선택해 주세요
                </option>
                <option value="bug">오류 제보</option>
                <option value="idea">기능 제안</option>
                <option value="partnership">제휴 문의</option>
              </select>
            </label>
            <label className="field">
              문의 내용
              <textarea name="message" minLength="10" required />
            </label>
            <button className="button button-primary">문의 보내기 →</button>
          </form>
        </div>
      </main>
    </Shell>
  );
}
function Legal({ type }) {
  return (
    <Shell>
      <main className="content-main section-shell">
        <header className="content-hero">
          <h1>{type === "privacy" ? "개인정보처리방침" : "이용약관"}</h1>
          <p>Cardly 서비스 이용에 필요한 기본 정책입니다.</p>
        </header>
        <div className="prose">
          <h2>서비스 원칙</h2>
          <p>
            명함과 이력서 정보 및 업로드 사진은 사용자의 브라우저에서
            처리됩니다. 문의 양식을 제출한 경우에만 입력 정보가 Formspree를 통해
            전송됩니다.
          </p>
          <h2>이용 안내</h2>
          <p>
            생성 결과의 정확성과 인쇄 적합성은 사용자가 최종 확인해야 합니다.
          </p>
          {type === "privacy" && (
            <>
              <h2>Google AdSense 및 쿠키</h2>
              <p>
                Cardly는 서비스 운영을 위해 Google AdSense 광고를 사용할 수 있습니다.
                Google 및 광고 파트너는 광고 제공, 빈도 제한, 성과 측정과 맞춤형 광고를
                위해 쿠키 또는 유사한 기술을 사용할 수 있습니다. 사용자는 브라우저의
                쿠키 설정이나 Google 광고 설정에서 맞춤형 광고 사용을 관리할 수 있습니다.
              </p>
            </>
          )}
        </div>
      </main>
    </Shell>
  );
}
const path = location.pathname;
const Page = path.includes("/business-card") || path.endsWith("maker.html")
  ? Maker
  : path.includes("/resume/") || path.endsWith("resume.html")
    ? Resume
    : path.includes("/invitation") || path.endsWith("invite.html")
      ? Invite
    : path.includes("/about/") || path.endsWith("about.html")
      ? About
      : path.includes("/contact/") || path.endsWith("contact.html")
        ? Contact
        : path.includes("/privacy/") || path.endsWith("privacy.html")
          ? () => <Legal type="privacy" />
          : path.includes("/terms/") || path.endsWith("terms.html")
            ? () => <Legal type="terms" />
            : Home;
createRoot(document.getElementById("root")).render(<Page />);
if ("serviceWorker" in navigator)
  window.addEventListener("load", () =>
    navigator.serviceWorker.register("./sw.js"),
  );
