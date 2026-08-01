import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { guideCategories, requiredGuides } from "./guide-content.js";
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
  "골드",
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
  "골드",
  "테크 그래디언트",
  "모노 타이포",
  "파스텔 라이프",
  "프로페셔널",
];
const designVariants = [
  {
    name: "클린",
    material: "smooth",
    corners: "soft",
    density: "balanced",
    align: "left",
    decoration: "none",
  },
  {
    name: "프레임",
    material: "cotton",
    corners: "square",
    density: "inset",
    align: "left",
    decoration: "frame",
  },
  {
    name: "사이드라인",
    material: "smooth",
    corners: "soft",
    density: "edge",
    align: "split",
    decoration: "rail",
  },
  {
    name: "스포트라이트",
    material: "softtouch",
    corners: "round",
    density: "airy",
    align: "center",
    decoration: "spot",
  },
  {
    name: "다이애그널",
    material: "metal",
    corners: "square",
    density: "compact",
    align: "bottom",
    decoration: "diagonal",
  },
  {
    name: "그리드",
    material: "linen",
    corners: "soft",
    density: "balanced",
    align: "left",
    decoration: "grid",
  },
  {
    name: "아치",
    material: "cotton",
    corners: "round",
    density: "airy",
    align: "center",
    decoration: "arch",
  },
  {
    name: "블록",
    material: "kraft",
    corners: "square",
    density: "compact",
    align: "split",
    decoration: "block",
  },
  {
    name: "오로라",
    material: "hologram",
    corners: "round",
    density: "inset",
    align: "bottom",
    decoration: "aurora",
  },
  {
    name: "에디토리얼",
    material: "smooth",
    corners: "soft",
    density: "edge",
    align: "vertical",
    decoration: "editorial",
  },
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
  {
    company: [7, 10, 90],
    name: [7, 43, 145],
    role: [7, 61, 92],
    contact: [
      [7, 82],
      [39, 82],
      [71, 82],
    ],
    align: "left",
    motif: 0,
  },
  {
    company: [62, 11, 82],
    name: [8, 34, 155],
    role: [9, 55, 90],
    contact: [
      [9, 76],
      [9, 84],
      [63, 84],
    ],
    align: "left",
    motif: 1,
  },
  {
    company: [8, 12, 88],
    name: [50, 38, 145],
    role: [50, 57, 88],
    contact: [
      [8, 80],
      [40, 80],
      [70, 80],
    ],
    align: "center",
    motif: 2,
  },
  {
    company: [72, 12, 84],
    name: [8, 66, 150],
    role: [8, 83, 86],
    contact: [
      [58, 65],
      [58, 75],
      [58, 85],
    ],
    align: "left",
    motif: 3,
  },
  {
    company: [8, 45, 86],
    name: [37, 24, 150],
    role: [38, 43, 90],
    contact: [
      [38, 67],
      [38, 77],
      [68, 77],
    ],
    align: "left",
    motif: 4,
  },
  {
    company: [42, 10, 90],
    name: [42, 39, 148],
    role: [42, 57, 88],
    contact: [
      [42, 76],
      [42, 84],
      [70, 84],
    ],
    align: "left",
    motif: 5,
  },
  {
    company: [8, 12, 90],
    name: [8, 30, 168],
    role: [9, 52, 92],
    contact: [
      [9, 74],
      [9, 83],
      [62, 83],
    ],
    align: "left",
    motif: 6,
  },
  {
    company: [50, 13, 92],
    name: [50, 42, 150],
    role: [50, 60, 88],
    contact: [
      [18, 82],
      [50, 82],
      [76, 82],
    ],
    align: "center",
    motif: 7,
  },
  {
    company: [73, 75, 84],
    name: [8, 18, 150],
    role: [8, 37, 90],
    contact: [
      [8, 66],
      [8, 76],
      [8, 86],
    ],
    align: "left",
    motif: 8,
  },
  {
    company: [8, 10, 86],
    name: [8, 70, 145],
    role: [8, 86, 84],
    contact: [
      [58, 17],
      [58, 27],
      [58, 37],
    ],
    align: "left",
    motif: 9,
  },
  {
    company: [46, 14, 88],
    name: [46, 45, 158],
    role: [46, 64, 88],
    contact: [
      [8, 79],
      [38, 79],
      [69, 79],
    ],
    align: "left",
    motif: 0,
  },
  {
    company: [8, 82, 86],
    name: [8, 20, 160],
    role: [8, 41, 90],
    contact: [
      [55, 60],
      [55, 71],
      [55, 82],
    ],
    align: "left",
    motif: 1,
  },
  {
    company: [68, 12, 82],
    name: [50, 40, 152],
    role: [50, 58, 88],
    contact: [
      [14, 80],
      [46, 80],
      [74, 80],
    ],
    align: "center",
    motif: 2,
  },
  {
    company: [10, 16, 88],
    name: [10, 40, 142],
    role: [10, 58, 86],
    contact: [
      [61, 39],
      [61, 51],
      [61, 63],
    ],
    align: "left",
    motif: 3,
  },
  {
    company: [44, 84, 84],
    name: [8, 18, 162],
    role: [8, 39, 90],
    contact: [
      [8, 70],
      [39, 70],
      [69, 70],
    ],
    align: "left",
    motif: 4,
  },
  {
    company: [8, 11, 86],
    name: [33, 37, 150],
    role: [33, 56, 88],
    contact: [
      [33, 76],
      [58, 76],
      [58, 85],
    ],
    align: "left",
    motif: 5,
  },
  {
    company: [50, 12, 90],
    name: [50, 35, 160],
    role: [50, 55, 90],
    contact: [
      [50, 72],
      [50, 80],
      [50, 88],
    ],
    align: "center",
    motif: 6,
  },
  {
    company: [75, 12, 82],
    name: [8, 47, 154],
    role: [8, 66, 88],
    contact: [
      [8, 83],
      [39, 83],
      [69, 83],
    ],
    align: "left",
    motif: 7,
  },
  {
    company: [8, 13, 88],
    name: [57, 26, 148],
    role: [57, 45, 86],
    contact: [
      [57, 65],
      [57, 75],
      [57, 85],
    ],
    align: "left",
    motif: 8,
  },
  {
    company: [8, 78, 84],
    name: [8, 25, 148],
    role: [8, 44, 88],
    contact: [
      [50, 25],
      [50, 36],
      [50, 47],
    ],
    align: "left",
    motif: 9,
  },
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
    name: `아트 ${String(index + 1).padStart(3, "0")}`,
    motif: 0,
    art: atlas,
    artUrl: `/card-atlas-clean-${atlas}.png`,
    artPosition: `${column * 33.333}% ${row * 25}%`,
    textColor:
      atlas === 4 || (atlas === 1 && [1, 2, 5, 10, 12, 15, 19].includes(cell))
        ? "#f8f5ed"
        : "#171724",
    angle: (index * 17) % 180,
    motifX: 10 + ((index * 29) % 78),
    motifY: 8 + ((index * 37) % 78),
    motifSize: 18 + ((index * 11) % 34),
    layout: {
      company: adjust(base.company),
      name: adjust(base.name),
      role: adjust(base.role),
      contacts: base.contact.map(([x, y], contactIndex) => [x, y]),
      align: base.align,
    },
  };
});
const simplePalettes = [
  ["#ffffff", "#17233b"],
  ["#f8f6f1", "#262626"],
  ["#f4f5f7", "#31516f"],
  ["#fffaf2", "#a67b52"],
  ["#f3f5f0", "#61705b"],
  ["#17191d", "#d7b46a"],
  ["#10243d", "#dbe7f5"],
  ["#f7f1ec", "#a96253"],
  ["#fbfbfa", "#777b82"],
  ["#182b26", "#b7c9b9"],
];
const simpleTemplates = Array.from({ length: 50 }, (_, index) => {
  const base = layoutArchetypes[index % layoutArchetypes.length];
  const [backgroundColor, accent] =
    simplePalettes[index % simplePalettes.length];
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
const resumeTones = [
  ["#182433", "#edf1f5", "#ffffff"],
  ["#254a73", "#edf4fa", "#ffffff"],
  ["#315f52", "#edf5f1", "#ffffff"],
  ["#70464c", "#f7efef", "#ffffff"],
  ["#5c536e", "#f2eff7", "#ffffff"],
];
const resumeTemplates = Array.from({ length: 50 }, (_, index) => {
  const family = Math.floor(index / 5) + 1;
  const tone = index % resumeTones.length;
  const [accent, soft, paper] = resumeTones[tone];
  return {
    id: index + 1,
    base: "clean",
    family,
    tone,
    accent,
    soft,
    paper,
    english: index % 6 === 5,
  };
});

function Header() {
  const [dark, setDark] = useState(
    localStorage.getItem("cardly-theme") === "dark",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  React.useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("cardly-theme", dark ? "dark" : "light");
  }, [dark]);
  const navLinks = [
    ["/resume/", "이력서 만들기"],
    ["/business-card/", "명함 만들기"],
    ["/invitation/", "초대장 만들기"],
    ["/guides/", "작성 가이드"],
    ["/about/", "소개"],
  ];
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Cardly 홈으로 이동">
        <span className="brand-mark">C</span>
        <span>Cardly</span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        onClick={() => setMenuOpen((value) => !value)}
      >
        <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
        <span className="menu-label">메뉴</span>
      </button>
      <nav
        id="site-navigation"
        className={`site-nav ${menuOpen ? "is-open" : ""}`}
        aria-label="주요 메뉴"
      >
        {navLinks.map(([url, label]) => (
          <a
            href={url}
            key={url}
            aria-current={location.pathname === url ? "page" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
      <button
        className="theme-toggle"
        type="button"
        aria-label={dark ? "밝은 화면으로 전환" : "어두운 화면으로 전환"}
        onClick={() => setDark(!dark)}
      >
        {dark ? "☀ 화이트" : "☾ 다크"}
      </button>
    </header>
  );
}
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner section-shell">
        <a className="brand" href="/" aria-label="Cardly 홈">
          <span className="brand-mark">C</span>Cardly
        </a>
        <nav aria-label="푸터 메뉴">
          <a href="/business-card/">명함 만들기</a>
          <a href="/resume/">이력서 만들기</a>
          <a href="/invitation/">초대장 만들기</a>
          <a href="/guides/">작성 가이드</a>
          <a href="/about/">소개</a>
          <a href="/contact/">문의</a>
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
      <a className="skip-link" href="#main-content">
        본문으로 바로가기
      </a>
      <Header />
      <span id="main-content" className="skip-target" tabIndex="-1" />
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
            <span className="free-badge">
              회원가입 0 · 결제 0 · 다운로드 0원
            </span>
            <h1>
              무료 이력서·명함 제작,
              <br />
              <em>지금 바로 시작.</em>
            </h1>
            <p>
              회원가입과 결제 없이 이력서와 명함을 직접 편집하고
              <br className="desktop-break" /> PDF·Word 또는 고화질 PNG로 바로
              저장하세요.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="/resume/">
                무료 이력서 만들기
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
        </section>
        <section className="tool-showcase section-shell" id="cardly-tools">
          <div className="section-heading centered-heading">
            <span className="eyebrow">CARDLY TOOLS</span>
            <h2>오늘 필요한 것부터 시작하세요</h2>
            <p>
              복잡한 가입이나 설치 없이, 템플릿을 고르면 바로 편집이 시작됩니다.
            </p>
          </div>
          <div className="tool-card-grid">
            <a className="tool-card tool-card-resume" href="/resume/">
              <div className="tool-card-art" aria-hidden="true" />
              <div className="tool-card-copy">
                <span>RESUME MAKER</span>
                <h3>내용이 먼저 보이는 이력서</h3>
                <p>A4 규격 그대로 편집하고 PDF·Word·HTML로 내려받으세요.</p>
                <b>
                  이력서 만들기 <i>→</i>
                </b>
              </div>
            </a>
            <a className="tool-card tool-card-business" href="/business-card/">
              <div className="tool-card-art" aria-hidden="true" />
              <div className="tool-card-copy">
                <span>BUSINESS CARD MAKER</span>
                <h3>나를 기억하게 만드는 명함</h3>
                <p>텍스트·색상·배치를 자유롭게 바꾸고 PNG로 저장하세요.</p>
                <b>
                  명함 만들기 <i>→</i>
                </b>
              </div>
            </a>
            <a className="tool-card tool-card-invite" href="/invitation/">
              <div className="tool-card-art" aria-hidden="true" />
              <div className="tool-card-copy">
                <span>INVITATION MAKER</span>
                <h3>마음을 담아 보내는 초대장</h3>
                <p>청첩장·생일·모임·행사 소식을 모바일 카드로 완성하세요.</p>
                <b>
                  초대장 만들기 <i>→</i>
                </b>
              </div>
            </a>
          </div>
        </section>
        <section
          className="home-guide-library section-shell"
          aria-labelledby="home-guide-title"
        >
          <div className="section-heading">
            <span className="eyebrow">CARDLY GUIDES</span>
            <h2 id="home-guide-title">만들기 전에 필요한 실전 가이드</h2>
            <p>
              이력서 문장부터 명함 인쇄와 초대장 개인정보까지, 완성도와 실수를
              함께 점검하세요.
            </p>
          </div>
          <div className="home-guide-grid">
            {[
              "/resume-example/",
              "/guides/resume-file-name-pdf/",
              "/guides/business-card-size-bleed/",
              "/guides/business-card-qr-code/",
              "/guides/invitation-required-info/",
              "/guides/invitation-photo-privacy/",
            ].map((url, index) => (
              <a href={url} key={url}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{allGuides[url].title}</h3>
                <p>{allGuides[url].intro}</p>
                <b>가이드 읽기 →</b>
              </a>
            ))}
          </div>
          <div className="guide-library-action">
            <a className="button button-secondary" href="/guides/">
              전체 작성 가이드 보기
            </a>
          </div>
        </section>
      </main>
    </Shell>
  );
}

const creatorHelp = {
  business: {
    eyebrow: "BUSINESS CARD WORKBOOK",
    title: "Cardly 명함 만들기 사용법과 인쇄 전 체크리스트",
    intro:
      "Cardly 명함 편집기는 90×50mm 비율의 앞면과 뒷면을 각각 구성해 PNG로 저장합니다. 심플·아트 스타일을 포함한 150개 디자인은 모두 무료입니다.",
    steps: [
      [
        "1. 용도 정하기",
        "직장인·프리랜서·매장용 중 누구에게 어떤 연락 행동을 기대하는지 먼저 정합니다.",
      ],
      [
        "2. 디자인 선택",
        "150개 템플릿에서 정보량과 글자 대비가 맞는 디자인을 고릅니다.",
      ],
      [
        "3. 요소 편집",
        "이름·직함·전화·이메일을 고치고 선택한 요소의 위치·크기·색상을 조절합니다.",
      ],
      [
        "4. 앞뒷면 저장",
        "앞면과 뒷면 탭을 각각 확인한 뒤 PNG를 따로 내려받습니다.",
      ],
    ],
    criteria: [
      "연락처가 많다면 장식이 적고 왼쪽 정렬된 심플 템플릿을 고릅니다.",
      "로고가 있다면 ‘로고·사진 추가’로 올리고 작은 크기에서도 형태가 보이는지 확인합니다.",
      "메탈·홀로그램 등 재질 효과는 화면 표현입니다. 실제 종이와 후가공은 인쇄소 상품 안내가 기준입니다.",
    ],
    example: {
      bad: "CREATIVE PERSON / 전화·이메일·SNS·주소를 같은 크기로 한 면에 모두 배치",
      good: "김민준 / 브랜드 디자이너 / 업무용 이메일·포트폴리오를 앞면에 두고 QR 코드는 뒷면에 분리",
    },
    mistakes: [
      "화면에서만 확인하고 실제 크기로 시험 출력하지 않는 것",
      "앞면을 저장한 뒤 뒷면으로 전환하지 않고 같은 면을 두 번 제출하는 것",
      "재단 오차를 고려하지 않고 이름이나 QR 코드를 가장자리에 붙이는 것",
      "자동 저장을 켠 공용 기기에 연락처와 사진을 남겨 두는 것",
    ],
    save: "저장 버튼은 현재 보고 있는 면만 PNG로 만듭니다. ‘앞면 PNG’, ‘뒷면 PNG’처럼 파일명을 구분하고, 인쇄소가 요구하는 크기·재단 여분·색상 모드·파일 형식을 별도로 확인하세요. 편집 데이터 자동 저장은 선택 사항이며 브라우저 로컬 저장소를 사용합니다.",
    checklist: [
      "이름·역할·주 연락 수단의 순서가 분명하다",
      "전화번호·이메일·웹 주소를 실제로 확인했다",
      "앞면과 뒷면을 각각 저장했다",
      "100% 배율 시험 출력에서 작은 글자를 읽을 수 있다",
      "인쇄소의 완성 크기와 재단 여분 안내를 확인했다",
    ],
    faq: [
      [
        "템플릿과 다운로드가 정말 무료인가요?",
        "현재 제공되는 150개 명함 디자인의 편집과 PNG 저장에는 결제 단계가 없습니다.",
      ],
      [
        "PNG를 그대로 인쇄소에 보내도 되나요?",
        "인쇄소마다 요구 규격이 다릅니다. Cardly는 완성 비율의 PNG를 제공하므로 재단 여분이나 전용 템플릿이 필요한 상품은 인쇄소 안내에 맞춰 추가 작업해야 합니다.",
      ],
      [
        "입력한 연락처와 사진이 서버로 전송되나요?",
        "명함 편집과 이미지 생성은 현재 브라우저에서 처리됩니다. 자동 저장을 켜면 같은 브라우저의 로컬 저장소에 작업 내용이 남습니다.",
      ],
    ],
    guides: [
      ["/guides/business-card-size-bleed/", "표준 명함 크기와 인쇄 여백"],
      ["/guides/business-card-required-info/", "역할별 명함 필수 정보"],
      ["/guides/business-card-font-size/", "명함 글꼴 크기와 가독성"],
      ["/guides/business-card-qr-code/", "QR 코드 명함 주의사항"],
    ],
  },
  resume: {
    eyebrow: "RESUME WORKBOOK",
    title: "Cardly 이력서 만들기 사용법과 제출 체크리스트",
    intro:
      "Cardly 이력서 편집기는 50개 A4 템플릿에 이름·연락처·소개·경력·학력·기술과 사진을 배치하고 PDF·Word·HTML·TXT로 저장합니다.",
    steps: [
      [
        "1. 내용 초안 만들기",
        "지원 직무와 가까운 경험을 고르고 각 경험을 문제·행동·결과 순서로 짧게 씁니다.",
      ],
      [
        "2. A4 템플릿 선택",
        "사진 사용 여부와 정보량을 기준으로 장식보다 본문이 먼저 보이는 양식을 고릅니다.",
      ],
      [
        "3. 입력과 배치",
        "연락처와 내용을 입력한 뒤 미리보기의 블록을 선택해 위치·크기를 조절합니다.",
      ],
      [
        "4. 실제 파일 검수",
        "지원처가 요구한 형식으로 저장하고 새로 열어 줄바꿈·글자 잘림·파일명을 확인합니다.",
      ],
    ],
    criteria: [
      "경험이 짧다면 한 페이지에서 프로젝트와 기술이 먼저 보이는 구성을 선택합니다.",
      "경력이 길다면 최근·관련 경험을 우선하고, 글자를 줄이기 전에 오래된 비관련 항목을 덜어냅니다.",
      "사진은 공고나 지원 국가·조직의 안내가 기준이며 필요할 때만 업로드합니다.",
    ],
    example: {
      bad: "마케팅 업무 담당. 다양한 채널을 운영하며 성과를 냈습니다.",
      good: "고객 질문을 구매 단계별로 분류해 주 2회 도움말 콘텐츠를 기획·발행하고, 상담팀과 월별 반복 문의를 검토했습니다.",
    },
    mistakes: [
      "지원 직무와 무관한 경험을 같은 분량으로 모두 넣는 것",
      "팀 결과를 전부 개인 성과처럼 쓰거나 확인하지 않은 수치를 만드는 것",
      "완성도 참고 점수를 채용 통과 가능성으로 오해하는 것",
      "PDF로 저장한 뒤 파일을 다시 열어보지 않는 것",
    ],
    save: "PDF는 현재 A4 미리보기를 이미지 기반 문서로 저장하고, Word·HTML·TXT는 입력한 텍스트를 문서 형태로 내보냅니다. 형식마다 줄바꿈과 링크 표현이 달라질 수 있으므로 제출할 실제 파일을 다시 열어 확인하세요. 초안은 같은 브라우저에 자동 저장됩니다.",
    checklist: [
      "이름·이메일·전화번호 오탈자가 없다",
      "지원 직무와 관련된 최근 경험이 먼저 보인다",
      "각 경력 문장에 내가 한 행동이 있다",
      "A4 경계 밖으로 이동하거나 숨긴 블록이 없다",
      "파일명을 ‘이름_지원직무_이력서.pdf’처럼 정리했다",
    ],
    faq: [
      [
        "완성도·ATS 참고 점수는 무엇인가요?",
        "필수 입력 여부와 내용 길이를 빠르게 확인하는 편집 보조 지표입니다. 실제 ATS 통과나 채용 결과를 예측하지 않습니다.",
      ],
      [
        "PDF와 Word 중 무엇을 제출해야 하나요?",
        "채용 공고가 지정한 형식을 따르세요. 별도 안내가 없다면 레이아웃 유지가 중요한 경우 PDF를 많이 사용하지만 지원처 기준이 우선입니다.",
      ],
      [
        "사진과 이력서 내용은 어디에 저장되나요?",
        "편집 데이터와 사진은 계정 서버가 아니라 현재 브라우저의 로컬 저장소에서 처리됩니다. 공용 기기에서는 사용 후 사이트 데이터를 삭제하세요.",
      ],
    ],
    guides: [
      ["/resume-example/", "직무별 이력서 작성 예시"],
      ["/guides/resume-career-gap/", "경력 공백 설명 방법"],
      ["/guides/resume-projects/", "프로젝트 경험 작성법"],
      ["/guides/resume-file-name-pdf/", "파일명과 PDF 제출 체크리스트"],
    ],
  },
  invitation: {
    eyebrow: "INVITATION WORKBOOK",
    title: "Cardly 모바일 초대장 사용법과 발송 전 체크리스트",
    intro:
      "Cardly 초대장 편집기는 결혼·생일·모임·행사별 30개 디자인에서 문구, 날짜, 시간, 장소, 주최자와 사진을 구성해 9:16 PNG로 저장합니다.",
    steps: [
      [
        "1. 행사 유형 선택",
        "결혼·생일·모임·행사 중 유형을 고르면 문구와 색상 예시가 바뀝니다.",
      ],
      [
        "2. 필수 정보 입력",
        "행사명·이름·날짜·시간·장소·주소·주최자를 실제 일정과 맞춰 입력합니다.",
      ],
      [
        "3. 사진과 문구 조정",
        "대표 사진을 넣고 제목·메시지가 얼굴이나 배경 장식과 겹치지 않는지 확인합니다.",
      ],
      [
        "4. 저장하고 발송 전 확인",
        "PNG를 내려받아 휴대폰에서 열고 개인정보와 수신자를 점검한 뒤 공유합니다.",
      ],
    ],
    criteria: [
      "사진을 강조하려면 얼굴 주변에 글자 공간이 있는 세로 이미지를 선택합니다.",
      "정보가 많다면 장식이 단순하고 날짜·장소 영역의 대비가 높은 디자인을 고릅니다.",
      "결혼식과 공식 행사는 차분한 문구, 생일과 친목 모임은 시간·준비물·종료 안내가 잘 보이는 구성이 좋습니다.",
    ],
    example: {
      bad: "우리의 좋은 날에 초대합니다. 라운드 가든에서 만나요.",
      good: "서윤과 민준의 결혼식에 초대합니다. 2026년 10월 24일 토요일 오후 2시, 라운드 가든 시청점 2층 라운드홀",
    },
    mistakes: [
      "본문 문구와 날짜 입력란에 서로 다른 시간이나 장소를 쓰는 것",
      "공개 이미지에 집 동·호수나 개인 전화번호를 불필요하게 넣는 것",
      "가로 단체 사진을 넣어 얼굴이 잘리거나 너무 작아지는 것",
      "참석 회신 기한과 방법을 적지 않아 개별 문의가 생기는 것",
    ],
    save: "초대장은 9:16 PNG로 저장됩니다. 편집 초안과 사진은 같은 브라우저의 로컬 저장소에 자동 저장되지만, 내려받은 이미지를 메신저나 SNS에 보내면 해당 서비스의 정책에 따라 처리됩니다. 공개용과 개별 전달용 이미지의 주소·연락처 범위를 다르게 준비할 수 있습니다.",
    checklist: [
      "행사명과 주최자를 첫 화면에서 알 수 있다",
      "날짜·요일·시간과 장소가 실제 예약 내용과 같다",
      "참석 회신 방법과 기한이 필요하면 포함했다",
      "사진 속 타인과 개인정보의 공개 범위를 확인했다",
      "저장한 PNG를 휴대폰에서 다시 열어 글자 잘림을 확인했다",
    ],
    faq: [
      [
        "초대장 템플릿은 몇 개인가요?",
        "결혼 8개, 생일 7개, 모임 7개, 행사 8개로 총 30개이며 모두 무료로 편집하고 저장할 수 있습니다.",
      ],
      [
        "공개 링크가 만들어지나요?",
        "현재 Cardly는 사용자별 공개 초대장 URL을 만들지 않고 완성 이미지를 기기에 저장합니다. 공유 대상과 방식은 사용자가 직접 선택합니다.",
      ],
      [
        "사진을 삭제하면 서버에도 남나요?",
        "사진은 Cardly 계정 서버로 업로드되지 않습니다. 편집기의 사진 삭제를 누르면 현재 초안에서 제거되며, 공용 기기라면 브라우저 사이트 데이터도 정리하세요.",
      ],
    ],
    guides: [
      ["/guides/invitation-required-info/", "모바일 초대장 필수 정보"],
      ["/guides/invitation-wording/", "행사별 초대 문구 예시"],
      ["/guides/invitation-photo-privacy/", "사진과 개인정보 주의사항"],
      ["/guides/invitation-rsvp-directions/", "참석 여부와 장소 안내"],
    ],
  },
};

function CreatorHelp({ type }) {
  const content = creatorHelp[type];
  return (
    <section
      className="creator-help section-shell"
      aria-labelledby={`${type}-help-title`}
    >
      <header className="creator-help-header">
        <span className="eyebrow">{content.eyebrow}</span>
        <h2 id={`${type}-help-title`}>{content.title}</h2>
        <p>{content.intro}</p>
      </header>
      <div className="creator-help-section">
        <h3>사용 순서</h3>
        <ol className="creator-step-grid">
          {content.steps.map(([title, body]) => (
            <li key={title}>
              <strong>{title}</strong>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="creator-help-columns">
        <section>
          <h3>디자인 선택 기준</h3>
          <ul>
            {content.criteria.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="example-compare">
          <h3>작성 예시</h3>
          <div className="example-bad">
            <b>피할 예</b>
            <p>{content.example.bad}</p>
          </div>
          <div className="example-good">
            <b>권하는 예</b>
            <p>{content.example.good}</p>
          </div>
        </section>
      </div>
      <div className="creator-help-columns">
        <section>
          <h3>흔한 실수</h3>
          <ul>
            {content.mistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3>저장 방법과 주의점</h3>
          <p>{content.save}</p>
        </section>
      </div>
      <section className="creator-checklist">
        <h3>완성 전 체크리스트</h3>
        <ul>
          {content.checklist.map((item) => (
            <li key={item}>□ {item}</li>
          ))}
        </ul>
      </section>
      <section className="creator-faq">
        <h3>자주 묻는 질문</h3>
        {content.faq.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>
      <nav className="creator-related" aria-label="관련 작성 가이드">
        <h3>다음 가이드</h3>
        <div>
          {content.guides.map(([url, label]) => (
            <a href={url} key={url}>
              {label}
              <span aria-hidden="true"> →</span>
            </a>
          ))}
        </div>
        <a className="button button-secondary" href="/guides/">
          전체 가이드 보기
        </a>
      </nav>
    </section>
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
  const add = (type) => (
    remember(),
    setItems((list) => [
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
    ])
  );
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
                        "--art-image": t.artUrl
                          ? `url(${t.artUrl})`
                          : undefined,
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
                    ["leather", "가죽"],
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
                type="button"
                className={side === "front" ? "active" : ""}
                aria-pressed={side === "front"}
                onClick={() => {
                  setSide("front");
                  setSelected(null);
                }}
              >
                앞면
              </button>
              <button
                type="button"
                className={side === "back" ? "active" : ""}
                aria-pressed={side === "back"}
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
                  "--art-image": template.artUrl
                    ? `url(${template.artUrl})`
                    : undefined,
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
        <CreatorHelp type="business" />
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
      {selected &&
        !["divider", "circle", "square", "image"].includes(selected.type) && (
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
      {selected &&
        !["divider", "circle", "square", "image"].includes(selected.type) && (
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
      <select
        aria-label="추가할 요소 종류"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
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
      <button type="button" onClick={() => onAdd(type)}>
        ＋ 추가
      </button>
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
      <button
        type="button"
        disabled={!selected}
        onClick={onDuplicate}
        title="선택 요소 복제"
      >
        복제
      </button>
      <button
        type="button"
        disabled={!selected}
        onClick={onCenter}
        title="캔버스 가운데 정렬"
      >
        가운데
      </button>
      <button
        type="button"
        disabled={!canUndo}
        onClick={onUndo}
        title="실행 취소"
        aria-label="실행 취소"
      >
        ↶
      </button>
      <button
        type="button"
        disabled={!canRedo}
        onClick={onRedo}
        title="다시 실행"
        aria-label="다시 실행"
      >
        ↷
      </button>
      <button type="button" disabled={!selected} onClick={onDelete}>
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
      tabIndex={0}
      role={shape ? "button" : "textbox"}
      aria-label={
        shape
          ? `${item.type} 요소 선택`
          : `${item.text || "빈 텍스트"} 편집 및 이동`
      }
      aria-pressed={shape ? selected : undefined}
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

function ResumeBlock({
  id,
  layout,
  selected,
  onPointerDown,
  onSelect,
  className = "",
  children,
}) {
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
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(id);
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`${id} 이력서 블록 선택`}
    >
      {children}
    </div>
  );
}

const readResumeDraft = () => {
  try {
    return JSON.parse(localStorage.getItem("cardly-resume-draft")) || {};
  } catch {
    return {};
  }
};

function Resume() {
  const sheetRef = useRef();
  const [tpl, setTpl] = useState(
    () =>
      resumeTemplates.find(
        (template) => template.id === readResumeDraft().templateId,
      ) || resumeTemplates[0],
  );
  const [font, setFont] = useState(
    () => readResumeDraft().font || '"Noto Sans KR",sans-serif',
  );
  const [photo, setPhoto] = useState(() => readResumeDraft().photo || "");
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [exportFormat, setExportFormat] = useState("pdf");
  const [resumeLayout, setResumeLayout] = useState(
    () =>
      readResumeDraft().layout ||
      Object.fromEntries(
        [
          "photo",
          "identity",
          "contact",
          "profile",
          "experience",
          "education",
          "skills",
        ].map((id) => [id, { x: 0, y: 0, size: 100, hidden: false }]),
      ),
  );
  const [data, setData] = useState(
    () =>
      readResumeDraft().data || {
        name: "한서윤",
        title: "Product Designer",
        email: "name@example.com",
        phone: "010-1234-5678",
        summary:
          "사용자 문제를 발견하고 명확한 디자인으로 해결하는 프로덕트 디자이너입니다.",
        experience:
          "Cardly · Product Designer · 2024–현재\nStudio One · UX Designer · 2021–2024",
        education: "한국대학교 · 시각디자인학과 · 2021",
        skills: "Product Design, UX Research, Figma, Prototyping",
      },
  );
  React.useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(
          "cardly-resume-draft",
          JSON.stringify({
            templateId: tpl.id,
            font,
            photo,
            layout: resumeLayout,
            data,
          }),
        );
      } catch {
        // 브라우저 저장 공간이 부족해도 편집은 계속할 수 있습니다.
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [tpl, font, photo, resumeLayout, data]);
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
      if (target.hasPointerCapture(pointerId))
        target.releasePointerCapture(pointerId);
    };
    const move = (nextEvent) => {
      if (nextEvent.pointerId !== pointerId) return;
      if (nextEvent.pointerType === "mouse" && nextEvent.buttons !== 1) {
        cleanup();
        return;
      }
      patchResumeBlock(id, {
        x: Math.max(
          -35,
          Math.min(
            35,
            origin.x + ((nextEvent.clientX - startX) / rect.width) * 100,
          ),
        ),
        y: Math.max(
          -35,
          Math.min(
            35,
            origin.y + ((nextEvent.clientY - startY) / rect.height) * 100,
          ),
        ),
      });
    };
    target.addEventListener("pointermove", move);
    target.addEventListener("pointerup", cleanup);
    target.addEventListener("pointercancel", cleanup);
  };
  const safeText = (value = "") =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  const exportOptions = {
    pdf: ["pdf", "application/pdf", "PDF 문서"],
    doc: ["doc", "application/msword", "Word 문서"],
    html: ["html", "text/html", "HTML 문서"],
    txt: ["txt", "text/plain", "텍스트 문서"],
  };
  const exportName = (format) =>
    `cardly-resume-${data.name || "resume"}.${exportOptions[format][0]}`;
  const saveBlob = async (blob, name, handle) => {
    if (handle) {
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  };
  const resumeDocument = () => {
    const paragraphs = (value) =>
      safeText(value)
        .split("\n")
        .map((line) => `<p>${line || "&nbsp;"}</p>`)
        .join("");
    const skills = data.skills
      .split(",")
      .filter((skill) => skill.trim())
      .map((skill) => `<span>${safeText(skill.trim())}</span>`)
      .join("");
    return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>${safeText(data.name)} 이력서</title><style>
      @page{size:A4;margin:18mm}*{box-sizing:border-box}body{max-width:174mm;margin:0 auto;color:#18212d;font-family:Arial,"Malgun Gothic",sans-serif;line-height:1.65}
      header{display:flex;align-items:center;gap:24px;padding-bottom:24px;border-bottom:2px solid ${tpl.accent}}h1{margin:0;font-size:32px}header p{margin:4px 0;color:#5b6573}
      .photo{width:108px;height:144px;object-fit:cover}.contact{margin-left:auto;text-align:right;font-size:12px}section{margin-top:26px}h2{margin:0 0 9px;color:${tpl.accent};font-size:13px;letter-spacing:.12em}
      section p{margin:0 0 7px;font-size:13px}.skills{display:flex;flex-wrap:wrap;gap:6px}.skills span{padding:4px 8px;background:${tpl.soft};font-size:12px}
    </style></head><body><header>${photo ? `<img class="photo" src="${photo}" alt="증명사진">` : ""}<div><h1>${safeText(data.name)}</h1><p>${safeText(data.title)}</p></div><div class="contact">${safeText(data.email)}<br>${safeText(data.phone)}</div></header>
    <section><h2>소개</h2>${paragraphs(data.summary)}</section><section><h2>경력</h2>${paragraphs(data.experience)}</section>
    <section><h2>학력</h2>${paragraphs(data.education)}</section><section><h2>기술</h2><div class="skills">${skills}</div></section></body></html>`;
  };
  const createPdfBlob = async () => {
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
    return pdf.output("blob");
  };
  const saveDocument = async () => {
    const [extension, mime, description] = exportOptions[exportFormat];
    let handle;
    if ("showSaveFilePicker" in window) {
      try {
        handle = await window.showSaveFilePicker({
          suggestedName: exportName(exportFormat),
          types: [{ description, accept: { [mime]: [`.${extension}`] } }],
        });
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }
    if (exportFormat === "pdf")
      return saveBlob(await createPdfBlob(), exportName(exportFormat), handle);
    if (exportFormat === "html")
      return saveBlob(
        new Blob(["\ufeff", resumeDocument()], {
          type: `${mime};charset=utf-8`,
        }),
        exportName(exportFormat),
        handle,
      );
    if (exportFormat === "doc")
      return saveBlob(
        new Blob(
          [
            "\ufeff",
            resumeDocument().replace(
              '<html lang="ko">',
              '<html lang="ko" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">',
            ),
          ],
          { type: `${mime};charset=utf-8` },
        ),
        exportName(exportFormat),
        handle,
      );
    const plainText = `${data.name}\n${data.title}\n${data.email} · ${data.phone}\n\n[소개]\n${data.summary}\n\n[경력]\n${data.experience}\n\n[학력]\n${data.education}\n\n[기술]\n${data.skills}`;
    return saveBlob(
      new Blob(["\ufeff", plainText], { type: `${mime};charset=utf-8` }),
      exportName(exportFormat),
      handle,
    );
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
                    <span
                      className="resume-clean-thumb"
                      data-family={t.family}
                      style={{
                        "--resume-accent": t.accent,
                        "--resume-soft": t.soft,
                      }}
                    >
                      <b>{String(t.id).padStart(2, "0")}</b>
                      <i />
                      <em />
                      <small />
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
            <div className="resume-export">
              <strong>파일로 저장</strong>
              <p>
                작업은 브라우저에 자동 저장됩니다. 형식을 선택한 뒤 원하는
                위치에 저장하세요.
              </p>
              <label className="resume-export-format">
                <span>파일 형식</span>
                <select
                  value={exportFormat}
                  onChange={(event) => setExportFormat(event.target.value)}
                >
                  <option value="pdf">PDF 문서 (.pdf)</option>
                  <option value="doc">Word 문서 (.doc)</option>
                  <option value="html">HTML 문서 (.html)</option>
                  <option value="txt">텍스트 문서 (.txt)</option>
                </select>
              </label>
              <button
                className="button button-primary resume-save-button"
                onClick={saveDocument}
              >
                저장하기 ↓
              </button>
            </div>
          </aside>
          <section className="resume-preview-wrap">
            <div className="preview-toolbar">
              <b>실시간 미리보기</b>
              <span>A4</span>
            </div>
            <div className="resume-canvas-toolbar">
              <strong>
                {selectedBlock
                  ? `${selectedBlock} 블록 선택됨`
                  : "블록을 선택해 이동하세요"}
              </strong>
              <label>
                크기
                <input
                  type="range"
                  min="70"
                  max="150"
                  value={selectedBlock ? resumeLayout[selectedBlock].size : 100}
                  disabled={!selectedBlock}
                  onChange={(event) =>
                    patchResumeBlock(selectedBlock, {
                      size: +event.target.value,
                    })
                  }
                />
              </label>
              <button
                disabled={!selectedBlock}
                onClick={() =>
                  patchResumeBlock(selectedBlock, { hidden: true })
                }
              >
                숨기기
              </button>
              <button
                onClick={() => {
                  setResumeLayout(
                    Object.fromEntries(
                      Object.keys(resumeLayout).map((id) => [
                        id,
                        { x: 0, y: 0, size: 100, hidden: false },
                      ]),
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
        <CreatorHelp type="resume" />
      </main>
    </Shell>
  );
}
const ResumeSheet = React.forwardRef(
  (
    {
      tpl,
      data,
      photo,
      font,
      english,
      layout,
      selectedBlock,
      onBlockPointerDown,
      onBlockSelect,
    },
    ref,
  ) => (
    <article
      ref={ref}
      className={`resume-sheet resume-${tpl.base}`}
      style={{
        fontFamily: font,
        "--resume-accent": tpl.accent,
        "--resume-soft": tpl.soft,
        "--resume-paper": tpl.paper,
      }}
      data-resume-family={tpl.family}
      data-resume-tone={tpl.tone}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onBlockSelect(null);
      }}
    >
      <header className={`resume-head ${photo ? "has-photo" : ""}`}>
        {photo && (
          <ResumeBlock
            id="photo"
            layout={layout}
            selected={selectedBlock === "photo"}
            onPointerDown={onBlockPointerDown}
            onSelect={onBlockSelect}
          >
            <img className="resume-photo" src={photo} alt="이력서 증명사진" />
          </ResumeBlock>
        )}
        <ResumeBlock
          id="identity"
          layout={layout}
          selected={selectedBlock === "identity"}
          onPointerDown={onBlockPointerDown}
          onSelect={onBlockSelect}
        >
          <h2>{data.name}</h2>
          <p>{data.title}</p>
        </ResumeBlock>
        <ResumeBlock
          id="contact"
          className="resume-contact"
          layout={layout}
          selected={selectedBlock === "contact"}
          onPointerDown={onBlockPointerDown}
          onSelect={onBlockSelect}
        >
          <span>{data.email}</span>
          <span>{data.phone}</span>
        </ResumeBlock>
      </header>
      <div className="resume-body">
        <ResumeBlock
          id="profile"
          layout={layout}
          selected={selectedBlock === "profile"}
          onPointerDown={onBlockPointerDown}
          onSelect={onBlockSelect}
        >
          <h3>{english ? "PROFILE" : "소개"}</h3>
          <p>{data.summary}</p>
        </ResumeBlock>
        <ResumeBlock
          id="experience"
          layout={layout}
          selected={selectedBlock === "experience"}
          onPointerDown={onBlockPointerDown}
          onSelect={onBlockSelect}
        >
          <h3>{english ? "EXPERIENCE" : "경력"}</h3>
          {data.experience.split("\n").map((x) => (
            <p key={x}>{x}</p>
          ))}
        </ResumeBlock>
        <ResumeBlock
          id="education"
          layout={layout}
          selected={selectedBlock === "education"}
          onPointerDown={onBlockPointerDown}
          onSelect={onBlockSelect}
        >
          <h3>{english ? "EDUCATION" : "학력"}</h3>
          <p>{data.education}</p>
        </ResumeBlock>
        <ResumeBlock
          id="skills"
          layout={layout}
          selected={selectedBlock === "skills"}
          onPointerDown={onBlockPointerDown}
          onSelect={onBlockSelect}
        >
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
    message:
      "서로의 하루를 아끼며 살아가겠습니다.\n소중한 날, 함께 축복해 주세요.",
    accent: "#9b6f55",
    theme: "wedding",
  },
  birthday: {
    label: "생일",
    eyebrow: "HAPPY BIRTHDAY",
    title: "생일 파티에 초대해요!",
    names: "서윤의 생일",
    message:
      "맛있는 음식과 즐거운 이야기를 준비했어요.\n가벼운 마음으로 함께해 주세요.",
    accent: "#ff6b73",
    theme: "birthday",
  },
  gathering: {
    label: "모임",
    eyebrow: "SAVE THE DATE",
    title: "우리, 오랜만에 만나요",
    names: "2026 여름 모임",
    message:
      "반가운 얼굴들과 느긋한 저녁을 보내요.\n참석 여부를 미리 알려주세요.",
    accent: "#2e7d68",
    theme: "gathering",
  },
  event: {
    label: "행사",
    eyebrow: "YOU ARE INVITED",
    title: "새로운 시작을 공개합니다",
    names: "CARDLY OPEN STUDIO",
    message:
      "아이디어와 사람을 연결하는 특별한 시간.\nCardly의 첫 번째 행사에 초대합니다.",
    accent: "#5b55e7",
    theme: "event",
  },
};

const inviteTemplates = Array.from({ length: 30 }, (_, index) => {
  const config =
    index < 8
      ? { atlas: 1, cell: index, kind: "wedding" }
      : index < 15
        ? { atlas: 2, cell: index - 8, kind: "birthday" }
        : index < 22
          ? { atlas: 3, cell: index - 15, kind: "gathering" }
          : {
              atlas: index < 26 ? 4 : 5,
              cell: index < 26 ? index - 22 : index - 26,
              kind: "event",
            };
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

const readInviteDraft = () => {
  try {
    return JSON.parse(localStorage.getItem("cardly-invite-draft")) || {};
  } catch {
    return {};
  }
};

function Invite() {
  const inviteRef = useRef();
  const inviteHistoryRef = useRef([]);
  const inviteFutureRef = useRef([]);
  const [, setInviteHistoryVersion] = useState(0);
  const [kind, setKind] = useState(() => readInviteDraft().kind || "wedding");
  const [photo, setPhoto] = useState(() => readInviteDraft().photo || "");
  const [inviteItems, setInviteItems] = useState(
    () => readInviteDraft().items || [],
  );
  const [selectedInviteItem, setSelectedInviteItem] = useState(null);
  const [saveInviteStatus, setSaveInviteStatus] = useState("자동 저장됨");
  const [inviteTemplate, setInviteTemplate] = useState(
    () =>
      inviteTemplates.find(
        (template) => template.id === readInviteDraft().templateId,
      ) || inviteTemplates[0],
  );
  const [details, setDetails] = useState(
    () =>
      readInviteDraft().details || {
        ...invitePresets.wedding,
        date: "2026-10-24",
        time: "오후 2:00",
        place: "라운드 가든",
        address: "서울특별시 중구 세종대로 110",
        host: "한서윤",
      },
  );
  const changeKind = (nextKind) => {
    const preset = invitePresets[nextKind];
    setKind(nextKind);
    setInviteTemplate(
      inviteTemplates.find((template) => template.kind === nextKind),
    );
    setDetails((current) => ({ ...current, ...preset }));
  };
  const loadInvitePhoto = (file) => {
    if (!file?.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };
  const rememberInvite = () => {
    inviteHistoryRef.current = [
      ...inviteHistoryRef.current.slice(-29),
      inviteItems.map((item) => ({ ...item })),
    ];
    inviteFutureRef.current = [];
    setInviteHistoryVersion((value) => value + 1);
  };
  const patchInviteItem = (id, patch) =>
    setInviteItems((items) =>
      items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  const addInviteItem = (type) => {
    rememberInvite();
    const item = {
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
      color: details.accent,
    };
    setInviteItems((items) => [...items, item]);
    setSelectedInviteItem(item.id);
  };
  const addInviteImage = (file) => {
    if (!file?.type.startsWith("image/")) return;
    rememberInvite();
    const reader = new FileReader();
    reader.onload = () => {
      const item = {
        id: crypto.randomUUID(),
        type: "image",
        src: reader.result,
        text: "",
        x: 38,
        y: 38,
        size: 100,
      };
      setInviteItems((items) => [...items, item]);
      setSelectedInviteItem(item.id);
    };
    reader.readAsDataURL(file);
  };
  const dragInviteItem = (event, item) => {
    if (event.detail > 1) return;
    event.preventDefault();
    rememberInvite();
    setSelectedInviteItem(item.id);
    const rect = inviteRef.current.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    const target = event.currentTarget;
    const pointerId = event.pointerId;
    target.setPointerCapture(pointerId);
    const cleanup = () => {
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerup", cleanup);
      target.removeEventListener("pointercancel", cleanup);
      if (target.hasPointerCapture(pointerId))
        target.releasePointerCapture(pointerId);
    };
    const move = (nextEvent) => {
      if (nextEvent.pointerId !== pointerId) return;
      patchInviteItem(item.id, {
        x: Math.max(
          0,
          Math.min(
            90,
            item.x + ((nextEvent.clientX - startX) / rect.width) * 100,
          ),
        ),
        y: Math.max(
          0,
          Math.min(
            92,
            item.y + ((nextEvent.clientY - startY) / rect.height) * 100,
          ),
        ),
      });
    };
    target.addEventListener("pointermove", move);
    target.addEventListener("pointerup", cleanup);
    target.addEventListener("pointercancel", cleanup);
  };
  const undoInvite = () => {
    const previous = inviteHistoryRef.current.pop();
    if (!previous) return;
    inviteFutureRef.current.push(inviteItems.map((item) => ({ ...item })));
    setInviteItems(previous);
    setSelectedInviteItem(null);
    setInviteHistoryVersion((value) => value + 1);
  };
  const redoInvite = () => {
    const next = inviteFutureRef.current.pop();
    if (!next) return;
    inviteHistoryRef.current.push(inviteItems.map((item) => ({ ...item })));
    setInviteItems(next);
    setSelectedInviteItem(null);
    setInviteHistoryVersion((value) => value + 1);
  };
  React.useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(
          "cardly-invite-draft",
          JSON.stringify({
            kind,
            photo,
            items: inviteItems,
            templateId: inviteTemplate.id,
            details,
          }),
        );
        setSaveInviteStatus("자동 저장됨");
      } catch {
        setSaveInviteStatus("저장 공간이 부족합니다");
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [kind, photo, inviteItems, inviteTemplate, details]);
  const saveInvite = async () => {
    const name = `cardly-invite-${kind}.png`;
    let handle;
    try {
      setSaveInviteStatus("저장 준비 중…");
      if ("showSaveFilePicker" in window) {
        handle = await window.showSaveFilePicker({
          suggestedName: name,
          types: [
            { description: "PNG 이미지", accept: { "image/png": [".png"] } },
          ],
        });
      }
      const { default: html2canvas } = await import("html2canvas");
      setSelectedInviteItem(null);
      await new Promise((resolve) => setTimeout(resolve));
      const canvas = await html2canvas(inviteRef.current, {
        scale: 4,
        useCORS: true,
        backgroundColor: null,
      });
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      if (handle) {
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = name;
        link.href = url;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 0);
      }
      setSaveInviteStatus("저장 완료");
    } catch (error) {
      setSaveInviteStatus(
        error?.name === "AbortError" ? "저장 취소됨" : "저장에 실패했습니다",
      );
    }
  };
  const update = (key, value) =>
    setDetails((current) => ({ ...current, [key]: value }));
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
                <button
                  type="button"
                  key={key}
                  className={kind === key ? "active" : ""}
                  aria-pressed={kind === key}
                  onClick={() => changeKind(key)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <fieldset className="invite-template-picker">
              <legend>
                디자인 선택{" "}
                <small>
                  {
                    inviteTemplates.filter((template) => template.kind === kind)
                      .length
                  }
                </small>
              </legend>
              <div className="invite-template-grid">
                {inviteTemplates
                  .filter((template) => template.kind === kind)
                  .map((template) => (
                    <button
                      type="button"
                      key={template.id}
                      className={
                        inviteTemplate.id === template.id ? "active" : ""
                      }
                      onClick={() => setInviteTemplate(template)}
                      aria-label={`초대장 템플릿 ${template.id}`}
                      style={{
                        "--invite-art": `url(${template.artUrl})`,
                        "--invite-art-position": template.artPosition,
                      }}
                    >
                      <span>{String(template.id).padStart(2, "0")}</span>
                    </button>
                  ))}
              </div>
            </fieldset>
            <label className="field">
              제목
              <input
                value={details.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </label>
            <label className="field">
              이름·행사명
              <input
                value={details.names}
                onChange={(e) => update("names", e.target.value)}
              />
            </label>
            <label className="field">
              초대 메시지
              <textarea
                rows="4"
                value={details.message}
                onChange={(e) => update("message", e.target.value)}
              />
            </label>
            <div className="field-grid">
              <label className="field">
                날짜
                <input
                  type="date"
                  value={details.date}
                  onChange={(e) => update("date", e.target.value)}
                />
              </label>
              <label className="field">
                시간
                <input
                  value={details.time}
                  onChange={(e) => update("time", e.target.value)}
                />
              </label>
            </div>
            <label className="field">
              장소
              <input
                value={details.place}
                onChange={(e) => update("place", e.target.value)}
              />
            </label>
            <label className="field">
              주소
              <input
                value={details.address}
                onChange={(e) => update("address", e.target.value)}
              />
            </label>
            <label className="field">
              주최자
              <input
                value={details.host}
                onChange={(e) => update("host", e.target.value)}
              />
            </label>
            <label className="field invite-color">
              포인트 색상
              <input
                type="color"
                value={details.accent}
                onChange={(e) => update("accent", e.target.value)}
              />
            </label>
            <label className="photo-drop">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => loadInvitePhoto(e.target.files[0])}
              />
              <b>{photo ? "대표 사진 변경" : "대표 사진 추가"}</b>
              <span>클릭해서 사진을 선택하세요</span>
            </label>
            {photo && (
              <button
                type="button"
                className="invite-photo-remove"
                onClick={() => setPhoto("")}
              >
                사진 삭제
              </button>
            )}
            <div className="invite-component-editor">
              <strong>컴포넌트 편집</strong>
              <p>텍스트와 도형을 추가한 뒤 미리보기에서 끌어 이동하세요.</p>
              <EditorToolbar
                selected={inviteItems.find(
                  (item) => item.id === selectedInviteItem,
                )}
                onSize={(size) => patchInviteItem(selectedInviteItem, { size })}
                onText={(text) => patchInviteItem(selectedInviteItem, { text })}
                onColor={(color) =>
                  patchInviteItem(selectedInviteItem, { color })
                }
                defaultColor={details.accent}
                onAdd={addInviteItem}
                onDuplicate={() => {
                  const source = inviteItems.find(
                    (item) => item.id === selectedInviteItem,
                  );
                  if (!source) return;
                  rememberInvite();
                  const copy = {
                    ...source,
                    id: crypto.randomUUID(),
                    x: Math.min(90, source.x + 4),
                    y: Math.min(92, source.y + 4),
                  };
                  setInviteItems((items) => [...items, copy]);
                  setSelectedInviteItem(copy.id);
                }}
                onCenter={() => {
                  if (!selectedInviteItem) return;
                  rememberInvite();
                  patchInviteItem(selectedInviteItem, { x: 50, y: 46 });
                }}
                onUndo={undoInvite}
                onRedo={redoInvite}
                canUndo={inviteHistoryRef.current.length > 0}
                canRedo={inviteFutureRef.current.length > 0}
                onDelete={() => {
                  if (!selectedInviteItem) return;
                  rememberInvite();
                  setInviteItems((items) =>
                    items.filter((item) => item.id !== selectedInviteItem),
                  );
                  setSelectedInviteItem(null);
                }}
              />
              <label className="invite-component-image">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => addInviteImage(event.target.files[0])}
                />
                ＋ 사진 컴포넌트 추가
              </label>
            </div>
          </aside>
          <section className="invite-preview-panel">
            <div className="preview-toolbar">
              <b>모바일 미리보기</b>
              <span>9:16</span>
            </div>
            <article
              ref={inviteRef}
              className={`mobile-invite invite-${details.theme} invite-layout-${inviteTemplate.layout} ${inviteTemplate.dark ? "invite-dark-art" : ""}`}
              data-invite-art="true"
              style={{
                "--invite-accent": details.accent,
                "--invite-art": `url(${inviteTemplate.artUrl})`,
                "--invite-art-position": inviteTemplate.artPosition,
              }}
              onPointerDown={(event) => {
                if (event.target === event.currentTarget)
                  setSelectedInviteItem(null);
              }}
            >
              <div className="invite-orbit" />
              <span className="invite-eyebrow">{details.eyebrow}</span>
              {photo && (
                <img className="invite-photo" src={photo} alt="초대장 대표" />
              )}
              <div className="invite-main-copy">
                <p>{details.names}</p>
                <h2>{details.title}</h2>
                <div className="invite-rule" />
                <p className="invite-message">{details.message}</p>
              </div>
              <dl className="invite-info">
                <div>
                  <dt>DATE</dt>
                  <dd>
                    {details.date} · {details.time}
                  </dd>
                </div>
                <div>
                  <dt>PLACE</dt>
                  <dd>
                    {details.place}
                    <small>{details.address}</small>
                  </dd>
                </div>
                <div>
                  <dt>HOST</dt>
                  <dd>{details.host}</dd>
                </div>
              </dl>
              {inviteItems.map((item) => (
                <CardItem
                  key={item.id}
                  item={item}
                  selected={selectedInviteItem === item.id}
                  onPointerDown={(event) => dragInviteItem(event, item)}
                  onSelect={() => setSelectedInviteItem(item.id)}
                  onText={(text) => patchInviteItem(item.id, { text })}
                />
              ))}
            </article>
            <button
              className="button button-primary invite-save"
              onClick={saveInvite}
            >
              초대장 이미지 저장 ↓
            </button>
            <p className="invite-save-status" aria-live="polite">
              {saveInviteStatus}
            </p>
          </section>
        </div>
        <CreatorHelp type="invitation" />
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
          <h1>필요한 문서를 직접 만들고, 제대로 완성하도록.</h1>
          <p>
            Cardly는 이력서·명함·모바일 초대장을 회원가입과 결제 없이 만들 수
            있는 브라우저 기반 제작 도구이자 실전 작성 가이드입니다.
          </p>
        </header>
        <article className="trust-prose">
          <section>
            <h2>서비스 목적</h2>
            <p>
              디자인 프로그램을 설치하거나 계정을 만들지 않아도 필요한 문서를
              빠르게 구성할 수 있도록 돕습니다. 편집 기능만 제공하는 데서 끝내지
              않고, 어떤 내용을 고르고 무엇을 확인해야 하는지 제작기 아래 설명과
              작성 가이드로 함께 제공합니다.
            </p>
          </section>
          <section>
            <h2>운영 방식과 제공 범위</h2>
            <p>
              명함은 150개 디자인과 앞뒷면 편집·PNG 저장, 이력서는 50개 A4
              디자인과 PDF·Word·HTML·TXT 저장, 초대장은 행사 유형별 총 30개
              디자인과 9:16 PNG 저장을 제공합니다. 현재 모든 제작기와 다운로드
              기능에 유료 단계가 없습니다.
            </p>
            <p>
              ‘무료’는 현재 제작기 편집과 파일 저장에 결제 단계가 없다는
              뜻입니다. 인쇄 결과, 채용 결과 또는 행사 전달 결과를 보장하지
              않으며 사용자가 저장본과 제출 조건을 최종 확인해야 합니다.
            </p>
          </section>
          <section>
            <h2>템플릿과 콘텐츠 제작 기준</h2>
            <ul>
              <li>
                템플릿은 작은 화면과 실제 출력 비율에서 핵심 정보가 먼저
                읽히도록 정보 위계와 대비를 확인합니다.
              </li>
              <li>
                가이드는 Cardly에서 실제로 조절하거나 저장할 수 있는 기능과
                연결하고, 좋은 예·피할 예·체크리스트를 포함합니다.
              </li>
              <li>
                확인하지 않은 이용자 수, 합격률, 인쇄 성공률 같은 통계를
                사용하지 않습니다.
              </li>
              <li>
                규격이나 제출 방식이 업체·지원처마다 다를 때는 해당 기관의
                안내를 우선하도록 명시합니다.
              </li>
            </ul>
          </section>
          <section>
            <h2>개인정보를 다루는 방식</h2>
            <p>
              제작기에 입력한 이름·연락처·사진과 편집 초안은 Cardly 계정 서버로
              전송하지 않고 현재 브라우저에서 처리합니다. 자동 저장을 사용하는
              기능은 브라우저의 로컬 저장소를 사용합니다. 문의 양식을 보낼 때만
              이름·이메일·문의 내용이 양식 처리 서비스 Formspree로 전송됩니다.
            </p>
            <p>
              광고 스크립트가 있는 콘텐츠 페이지에서는 Google과 광고 파트너가
              쿠키 또는 유사 기술을 사용할 수 있습니다. 자세한 내용과 관리
              방법은 <a href="/privacy/">개인정보처리방침</a>에서 확인할 수
              있습니다.
            </p>
          </section>
          <section>
            <h2>문의와 개선</h2>
            <p>
              오류, 잘못된 안내, 접근성 문제와 기능 제안은{" "}
              <a href="/contact/">문의 양식</a>으로 접수할 수 있습니다.
              저장소에서 확인되지 않은 이메일·사업자 정보·운영자 자격은 임의로
              표시하지 않습니다.
            </p>
          </section>
        </article>
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
            <p>
              오류, 잘못된 콘텐츠, 접근성 문제, 기능 제안과 제휴 문의를 이
              양식으로 보낼 수 있습니다. 현재 공개된 별도 이메일이나 전화
              문의처는 없습니다.
            </p>
            <div className="contact-notice">
              <h2>문의 전에 확인해 주세요</h2>
              <ul>
                <li>
                  비밀번호, 주민등록번호, 결제 정보와 같은 민감정보를 입력하지
                  마세요.
                </li>
                <li>
                  문의 내용은 양식 처리 서비스 Formspree를 통해 전송됩니다.
                </li>
                <li>
                  답변이 필요하면 실제로 확인할 수 있는 이메일을 입력해 주세요.
                </li>
              </ul>
            </div>
          </header>
          <form
            className="contact-form"
            action="https://formspree.io/f/xkodzkvo"
            method="POST"
          >
            <label className="field">
              이름
              <input name="name" autoComplete="name" required />
            </label>
            <label className="field">
              이메일
              <input name="email" type="email" autoComplete="email" required />
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
            <label className="contact-consent">
              <input
                type="checkbox"
                name="privacy_consent"
                value="agreed"
                required
              />
              <span>
                <a href="/privacy/">개인정보처리방침</a>과 Formspree를 통한
                이름·이메일·문의 내용 전송을 확인했습니다.
              </span>
            </label>
            <button className="button button-primary" type="submit">
              문의 보내기 →
            </button>
          </form>
        </div>
      </main>
    </Shell>
  );
}
function Legal({ type }) {
  const privacy = type === "privacy";
  return (
    <Shell>
      <main className="content-main section-shell">
        <header className="content-hero">
          <span className="eyebrow">{privacy ? "PRIVACY" : "TERMS"}</span>
          <h1>{privacy ? "개인정보처리방침" : "이용약관"}</h1>
          <p>시행일 2026년 8월 2일 · 마지막 수정 2026년 8월 2일</p>
        </header>
        <article className="prose trust-prose">
          {privacy ? (
            <>
              <section>
                <h2>1. 적용 범위</h2>
                <p>
                  이 방침은 cardly.kr의 이력서·명함·초대장 제작기, 작성 가이드와
                  문의 기능에 적용됩니다.
                </p>
              </section>
              <section>
                <h2>2. 제작기에 입력하는 정보</h2>
                <p>
                  이름, 이메일, 전화번호, 경력, 학력, 사진, 초대 문구와 장소 등
                  제작기에 넣는 내용은 Cardly 계정 서버로 전송되지 않습니다.
                  편집과 파일 생성은 사용자의 브라우저에서 이루어집니다.
                </p>
                <p>
                  테마 설정, 명함 자동 저장을 켠 경우의 작업 데이터,
                  이력서·초대장 초안은 브라우저 로컬 저장소에 보관될 수
                  있습니다. 보관 기간은 사용자가 사이트 데이터를 삭제하거나
                  브라우저가 저장 공간을 정리할 때까지입니다. 공용 기기에서는
                  작업 후 브라우저의 사이트 데이터를 삭제하세요.
                </p>
              </section>
              <section>
                <h2>3. 문의 양식</h2>
                <p>
                  문의 양식을 제출하면 이름, 이메일, 문의 유형, 문의 내용과 전송
                  과정에서 서비스 운영에 필요한 기술 정보가 외부 양식 처리
                  서비스 Formspree로 전송될 수 있습니다. 문의 답변과 문제 확인을
                  위해서만 사용하며 민감정보를 보내지 마세요.
                </p>
                <p>
                  Formspree의 처리·보관은 해당 서비스 정책의 적용을 받습니다.
                  문의를 보내지 않으면 이 정보는 전송되지 않습니다.
                </p>
              </section>
              <section>
                <h2>4. Google AdSense, 쿠키와 외부 리소스</h2>
                <p>
                  콘텐츠 페이지에는 Google AdSense 광고 스크립트가 사용될 수
                  있습니다. Google과 광고 파트너는 광고 제공, 부정 사용 방지,
                  빈도 관리와 성과 측정을 위해 쿠키 또는 유사 기술을 사용할 수
                  있으며, 이용 가능한 경우 동의 관리 화면이나 브라우저 설정에서
                  선택을 관리할 수 있습니다.
                </p>
                <p>
                  웹 글꼴은 Google Fonts에서 불러올 수 있고, 이 과정에서 접속에
                  필요한 기술 정보가 해당 서비스에 전달될 수 있습니다. 제작기
                  페이지에는 광고 오클릭 위험을 줄이기 위해 광고 스크립트를
                  배치하지 않습니다.
                </p>
              </section>
              <section>
                <h2>5. 사용자의 선택과 삭제</h2>
                <ul>
                  <li>명함 자동 저장은 편집기에서 끌 수 있습니다.</li>
                  <li>
                    브라우저 설정의 사이트 데이터에서 cardly.kr 로컬 저장 정보를
                    삭제할 수 있습니다.
                  </li>
                  <li>
                    광고 쿠키는 브라우저 설정과 Google 광고 설정에서 관리할 수
                    있습니다.
                  </li>
                  <li>
                    개인정보 관련 문의는 <a href="/contact/">문의 양식</a>으로
                    보낼 수 있습니다.
                  </li>
                </ul>
              </section>
              <section>
                <h2>6. 방침 변경</h2>
                <p>
                  실제 기능이나 외부 서비스가 바뀌면 이 페이지의 수정일과 내용을
                  함께 갱신합니다. 중요한 변경은 사이트에서 확인할 수 있도록
                  안내합니다.
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2>1. 서비스와 약관의 적용</h2>
                <p>
                  Cardly는 이력서·명함·모바일 초대장을 브라우저에서 편집하고
                  파일로 저장하는 기능과 관련 작성 가이드를 제공합니다. 서비스를
                  사용하면 이 약관과 개인정보처리방침의 적용을 받습니다.
                </p>
              </section>
              <section>
                <h2>2. 이용 조건과 비용</h2>
                <p>
                  현재 회원가입 없이 사용할 수 있으며 제작기와 다운로드에 유료
                  단계가 없습니다. 향후 제공 범위가 달라지면 결제 전에 조건을
                  명확히 안내해야 하며, 현재 약관만으로 자동 결제나 유료 전환에
                  동의한 것으로 보지 않습니다.
                </p>
              </section>
              <section>
                <h2>3. 사용자의 책임</h2>
                <ul>
                  <li>
                    입력 내용, 연락처, 일정, 맞춤법과 저장 파일을 제출·인쇄·발송
                    전에 확인해야 합니다.
                  </li>
                  <li>
                    업로드하는 로고와 사진, 작성 문구를 사용할 권한이 있어야
                    하며 타인의 개인정보와 권리를 침해해서는 안 됩니다.
                  </li>
                  <li>
                    불법, 사칭, 기만, 괴롭힘 또는 악성 파일 배포 목적으로
                    서비스를 이용해서는 안 됩니다.
                  </li>
                  <li>
                    채용처, 인쇄소, 행사 장소 등 제3자가 정한 규격과 제출 조건은
                    해당 안내를 우선해야 합니다.
                  </li>
                </ul>
              </section>
              <section>
                <h2>4. 템플릿과 생성 결과</h2>
                <p>
                  Cardly가 제공하는 화면, 가이드와 기본 템플릿의 권리는 관련
                  법령의 보호를 받을 수 있습니다. 사용자는 Cardly로 만든 자신의
                  문서를 개인·업무 목적으로 저장하고 사용할 수 있습니다. 다만
                  템플릿 자체를 별도 상품처럼 재배포하거나 서비스의 소스·자산을
                  무단으로 복제하는 권한까지 부여되지는 않습니다.
                </p>
              </section>
              <section>
                <h2>5. 결과와 서비스 제공</h2>
                <p>
                  Cardly는 특정 채용 결과, 인쇄 색상·재단 결과, QR 인식, 행사
                  참석 또는 법적 효력을 보장하지 않습니다. 브라우저, 기기, 외부
                  서비스 장애나 업데이트로 일부 기능이 달라질 수 있습니다.
                </p>
              </section>
              <section>
                <h2>6. 문의와 변경</h2>
                <p>
                  오류, 권리 침해 또는 약관 관련 문의는{" "}
                  <a href="/contact/">문의 양식</a>으로 접수할 수 있습니다.
                  기능이나 운영 방식이 바뀌면 이 페이지의 수정일과 약관을
                  갱신합니다.
                </p>
              </section>
            </>
          )}
        </article>
      </main>
    </Shell>
  );
}
const resumeGuides = {
  "/resume-guide/": {
    eyebrow: "RESUME GUIDE",
    title: "좋은 이력서를 만드는 7가지 원칙",
    intro:
      "채용 담당자가 빠르게 핵심을 파악하고, 지원자의 강점이 자연스럽게 이어지는 이력서 작성 순서를 정리했습니다.",
    sections: [
      [
        "지원 직무를 한 문장으로 정의하세요",
        "이름 아래 직무명은 희망 직무와 실제 강점이 함께 드러나야 합니다. ‘기획자’보다 ‘데이터로 문제를 해결하는 서비스 기획자’처럼 구체적으로 작성해 보세요.",
      ],
      [
        "최근 경험부터 배치하세요",
        "경력과 프로젝트는 최근 순서로 작성하고 회사명, 역할, 기간, 핵심 성과를 같은 구조로 반복하면 읽는 사람이 빠르게 비교할 수 있습니다.",
      ],
      [
        "업무보다 변화를 쓰세요",
        "‘SNS 채널 운영’보다 ‘콘텐츠 발행 체계를 정리해 3개월간 자연 유입을 35% 높임’처럼 행동과 결과를 함께 적는 편이 설득력이 높습니다.",
      ],
      [
        "한 페이지의 정보 밀도를 조절하세요",
        "신입과 경력 초기에는 A4 1페이지가 읽기 좋습니다. 관련성이 낮은 자격증과 오래된 활동은 줄이고 지원 직무와 연결되는 경험에 공간을 사용하세요.",
      ],
      [
        "제출 전 세 가지를 확인하세요",
        "맞춤법, 연락처, PDF 변환 후 줄바꿈을 반드시 확인하세요. 파일명은 ‘이름_지원직무_이력서.pdf’처럼 채용 담당자가 식별하기 쉽게 작성합니다.",
      ],
    ],
  },
  "/resume-example/": {
    eyebrow: "RESUME EXAMPLES",
    title: "직무별 이력서 문장 예시",
    intro:
      "추상적인 자기소개를 구체적인 경험 문장으로 바꾸는 방법을 직무별 예시로 확인하세요.",
    sections: [
      [
        "프로덕트 디자이너",
        "사용자 인터뷰 12건과 행동 데이터 분석을 바탕으로 가입 흐름을 재설계해 이탈률을 18% 낮췄습니다.",
      ],
      [
        "프론트엔드 개발자",
        "공통 컴포넌트와 번들 분할을 적용해 초기 로딩 시간을 3.1초에서 1.8초로 단축했습니다.",
      ],
      [
        "마케터",
        "검색 의도별 콘텐츠 체계를 구축해 6개월 동안 비브랜드 자연 검색 유입을 72% 성장시켰습니다.",
      ],
      [
        "서비스 기획자",
        "고객 문의 420건을 유형화하고 셀프 도움말 흐름을 개선해 반복 문의를 월 28% 줄였습니다.",
      ],
      [
        "신입 지원자",
        "수업 과제라고만 쓰지 말고 문제, 내 역할, 사용한 도구, 결과와 배운 점을 프로젝트 경험으로 구조화하세요.",
      ],
    ],
  },
  "/resume-photo-guide/": {
    eyebrow: "PHOTO GUIDE",
    title: "이력서 사진, 깔끔하게 준비하는 방법",
    intro:
      "사진이 필요한 지원처라면 과한 보정보다 선명한 인상과 일관된 비율이 중요합니다.",
    sections: [
      [
        "권장 비율과 해상도",
        "일반적인 증명사진 비율인 3:4를 사용하고 얼굴 윤곽이 흐려지지 않도록 최소 600×800px 이상의 원본을 준비하세요.",
      ],
      [
        "배경과 조명",
        "흰색 또는 밝은 회색 단색 배경에서 얼굴 정면에 부드러운 빛이 오도록 촬영하면 인쇄와 화면 모두 자연스럽습니다.",
      ],
      [
        "표정과 복장",
        "입을 가볍게 다문 자연스러운 표정과 지원 조직의 분위기에 맞는 단정한 복장이 안전합니다.",
      ],
      [
        "피해야 할 편집",
        "얼굴 형태가 달라지는 보정, 과도한 피부 블러, 배경과 머리카락 경계가 깨지는 자동 제거는 신뢰감을 낮출 수 있습니다.",
      ],
      [
        "Cardly에서 넣기",
        "사진 업로드 영역에 3:4 이미지를 넣고 A4 미리보기에서 크기와 위치를 확인한 다음 PDF로 저장하세요.",
      ],
    ],
  },
  "/career-description-guide/": {
    eyebrow: "CAREER WRITING",
    title: "경력기술서를 성과 중심으로 쓰는 법",
    intro:
      "경력기술서는 담당 업무 목록이 아니라 어떤 문제를 어떤 방식으로 해결했는지 보여주는 문서입니다.",
    sections: [
      [
        "문제–행동–결과 구조",
        "상황을 한 줄로 설명하고 내가 맡은 행동, 협업 방식, 측정 가능한 결과 순서로 작성하면 경험의 맥락이 선명해집니다.",
      ],
      [
        "숫자가 없을 때",
        "매출 수치가 없다면 처리 시간, 오류 건수, 고객 문의, 참여 인원, 제작 주기처럼 업무 변화를 설명할 수 있는 지표를 찾으세요.",
      ],
      [
        "팀 성과와 내 역할 분리",
        "‘프로젝트 성공’으로 끝내지 말고 팀 규모와 담당 범위, 직접 결정하거나 실행한 내용을 구분해 작성하세요.",
      ],
      [
        "기술과 도구는 맥락 속에서",
        "도구 이름만 나열하기보다 Figma로 디자인 시스템을 구축해 화면 제작 시간을 단축한 것처럼 사용 목적을 함께 쓰세요.",
      ],
      [
        "경력별 분량",
        "각 회사에서 가장 관련성 높은 성과 3~5개를 고르고 오래된 경력일수록 요약해 최근 역량에 시선을 집중시킵니다.",
      ],
    ],
  },
  "/resume-entry-level/": {
    eyebrow: "ENTRY LEVEL",
    title: "신입 이력서에 꼭 들어갈 내용",
    intro:
      "경력이 없어도 프로젝트와 활동을 직무 역량의 증거로 바꾸면 충분히 설득력 있는 이력서를 만들 수 있습니다.",
    sections: [
      [
        "프로젝트를 경력처럼 작성하세요",
        "프로젝트명, 기간, 팀 구성, 목표, 담당 역할, 결과를 명시하면 수업과 사이드 프로젝트도 실무에 가까운 경험으로 전달됩니다.",
      ],
      [
        "지원 직무와 관련된 순서",
        "학력보다 프로젝트와 기술이 더 중요한 직무라면 관련 경험을 위에 배치하세요. 모든 지원자에게 같은 순서가 정답은 아닙니다.",
      ],
      [
        "성장 과정을 구체적으로",
        "‘열심히 배웠다’ 대신 어떤 피드백을 받고 무엇을 수정했으며 결과가 어떻게 달라졌는지 작성하세요.",
      ],
      [
        "기술 수준을 과장하지 마세요",
        "상·중·하보다 실제로 수행할 수 있는 작업과 사용 경험을 설명하는 편이 면접 질문에도 대응하기 쉽습니다.",
      ],
      [
        "한 페이지로 정리하세요",
        "관련성이 낮은 활동을 모두 넣기보다 지원 직무를 설명하는 경험 2~4개를 깊이 있게 보여주는 것이 효과적입니다.",
      ],
    ],
  },
  "/resume-experienced/": {
    eyebrow: "EXPERIENCED",
    title: "경력직 이력서의 핵심 구성",
    intro:
      "경력직 이력서는 연차보다 다음 조직에서 재현할 수 있는 성과와 의사결정 능력을 보여줘야 합니다.",
    sections: [
      [
        "상단에 경력 요약을 넣으세요",
        "총 경력, 핵심 산업, 전문 영역과 대표 성과를 3~4문장으로 요약해 채용 담당자가 전체 맥락을 먼저 이해하게 합니다.",
      ],
      [
        "성과의 규모를 설명하세요",
        "매출이나 성장률뿐 아니라 담당 예산, 사용자 수, 팀 규모, 운영 국가처럼 일의 복잡도와 책임 범위를 함께 적으세요.",
      ],
      [
        "이직 방향에 맞게 덜어내세요",
        "지원 직무와 관계가 약한 초기 경력은 짧게 요약하고 최근 5년의 관련 성과를 중심으로 구성합니다.",
      ],
      [
        "리더십을 행동으로 표현하세요",
        "‘팀 리딩’보다 목표 설정, 우선순위 결정, 동료 코칭, 이해관계자 조율에서 실제로 한 행동을 작성하세요.",
      ],
      [
        "2페이지가 필요한 경우",
        "10년 이상의 관련 경력이나 프로젝트 설명이 필수라면 2페이지도 가능하지만, 첫 페이지에서 핵심 자격과 최근 성과가 모두 보여야 합니다.",
      ],
    ],
  },
};

const existingGuideAdditions = {
  "/resume-guide/": [
    {
      title: "좋은 예와 피할 예를 비교하세요",
      bad: "성실하고 책임감이 강하며 커뮤니케이션 능력이 뛰어납니다.",
      good: "주간 운영 회의에서 고객 문의를 유형별로 정리해 담당자와 처리 기준을 합의하고 반복 질문을 도움말로 문서화했습니다.",
      paragraphs: [
        "성격을 선언하는 문장보다 실제 상황에서 취한 행동을 보여주면 역량의 근거를 확인하기 쉽습니다.",
      ],
    },
    {
      title: "Cardly PDF 저장 전 체크리스트",
      checklist: [
        "직무명과 지원 공고의 표현이 일치한다",
        "최근·관련 경험이 위에 있다",
        "연락처 오탈자가 없다",
        "A4 경계 안에서 줄바꿈을 확인했다",
        "저장한 PDF를 다시 열어 봤다",
      ],
    },
  ],
  "/resume-photo-guide/": [
    {
      title: "사진이 필요한지부터 확인하세요",
      paragraphs: [
        "지원처가 사진을 요구하지 않는다면 관행만으로 추가하지 않아도 됩니다. 공고와 제출 국가·조직의 안내를 먼저 확인하고, 필요한 경우에만 직무 정보보다 사진이 과도하게 커지지 않게 배치하세요.",
      ],
      bad: "지원 안내를 확인하지 않고 오래된 단체 사진을 잘라 사용",
      good: "사진 제출 요구를 확인한 뒤 최근 촬영한 단색 배경의 3:4 세로 사진 사용",
    },
    {
      title: "업로드와 개인정보 체크리스트",
      checklist: [
        "본인 사진이며 사용 권한이 있다",
        "배경에 다른 사람과 위치 정보가 없다",
        "미리보기에서 얼굴 비율이 왜곡되지 않는다",
        "공용 기기 사용 후 사이트 데이터를 삭제한다",
      ],
    },
  ],
  "/career-description-guide/": [
    {
      title: "한 성과를 두 문장으로 나누는 예",
      bad: "고객 응대 및 운영 프로세스 개선",
      good: "반복 문의를 유형별로 분류하고 담당 부서별 답변 기준을 문서화했습니다. 운영팀이 같은 기준을 사용하도록 월별 사례 검토를 진행했습니다.",
      paragraphs: [
        "측정 수치가 없다면 효과를 지어내지 말고 바뀐 절차, 문서, 검토 방식과 책임 범위를 설명하세요.",
      ],
    },
    {
      title: "제출 전 체크리스트",
      checklist: [
        "회사마다 기간 표기가 같다",
        "팀 성과와 내 행동을 구분했다",
        "보안이 필요한 고객·매출 정보를 제거했다",
        "도구 이름보다 사용 목적을 설명했다",
        "최근 관련 성과가 먼저 보인다",
      ],
    },
  ],
  "/resume-entry-level/": [
    {
      title: "수업 프로젝트를 경험 문장으로 바꾸세요",
      bad: "캡스톤 디자인 프로젝트 참여, 발표 우수",
      good: "4인 팀의 지역 행사 안내 프로젝트에서 정보 구조와 모바일 화면을 맡아, 사용자 과업 점검에서 발견한 검색 동선을 수정했습니다.",
      paragraphs: [
        "‘우수’ 같은 평가는 기준이 모호하면 빼고, 맡은 범위와 피드백을 반영한 행동을 구체적으로 적습니다.",
      ],
    },
    {
      title: "신입 이력서 체크리스트",
      checklist: [
        "지원 직무와 관련된 프로젝트 2~4개를 골랐다",
        "팀 규모와 내 역할을 적었다",
        "사용 기술을 실제 행동과 연결했다",
        "학력·자격의 날짜가 정확하다",
        "한 페이지에서 핵심 경험을 찾을 수 있다",
      ],
    },
  ],
  "/resume-experienced/": [
    {
      title: "관리 범위보다 의사결정을 보여주세요",
      bad: "다수 프로젝트 리딩 및 유관 부서 커뮤니케이션",
      good: "영업·운영 요청을 고객 영향과 긴급도로 분류해 분기 우선순위를 합의하고, 변경 기준을 의사결정 기록으로 남겼습니다.",
      paragraphs: [
        "직급이나 연차보다 어떤 기준으로 우선순위를 정하고 이해관계자를 조율했는지가 다음 역할의 재현 가능성을 보여줍니다.",
      ],
    },
    {
      title: "경력직 제출 체크리스트",
      checklist: [
        "상단 요약에 전문 영역과 대표 경험이 있다",
        "최근 5년의 관련 경험에 더 많은 공간을 썼다",
        "회사 기밀과 고객 식별 정보를 제거했다",
        "성과 수치의 기준 기간을 설명할 수 있다",
        "첫 페이지에서 지원 자격을 확인할 수 있다",
      ],
    },
  ],
};

const existingGuides = Object.fromEntries(
  Object.entries(resumeGuides).map(([url, guide]) => [
    url,
    {
      ...guide,
      category: "resume",
      description: guide.intro,
      published: "2026-07-25",
      modified: "2026-08-02",
      sections: [...guide.sections, ...(existingGuideAdditions[url] || [])],
    },
  ]),
);
const allGuides = { ...existingGuides, ...requiredGuides };

function GuideHub() {
  return (
    <Shell>
      <main className="guide-hub section-shell">
        <nav className="guide-breadcrumb" aria-label="현재 위치">
          <a href="/">홈</a>
          <span aria-hidden="true">›</span>
          <b>작성 가이드</b>
        </nav>
        <header className="guide-hub-hero">
          <span className="eyebrow">CARDLY KNOWLEDGE</span>
          <h1>이력서·명함·초대장 작성 가이드</h1>
          <p>
            문구를 고르는 일부터 제출·인쇄·공유 직전 확인까지, Cardly 제작
            기능과 함께 바로 적용할 수 있는 예시와 체크리스트를 모았습니다.
          </p>
        </header>
        {Object.entries(guideCategories).map(([categoryKey, category]) => {
          const entries = Object.entries(allGuides).filter(
            ([, guide]) => guide.category === categoryKey,
          );
          return (
            <section
              className="guide-category"
              key={categoryKey}
              aria-labelledby={`guide-${categoryKey}`}
            >
              <header>
                <div>
                  <span>{String(entries.length).padStart(2, "0")} GUIDES</span>
                  <h2 id={`guide-${categoryKey}`}>{category.name} 가이드</h2>
                  <p>{category.description}</p>
                </div>
                <a href={category.makerUrl}>{category.makerLabel} →</a>
              </header>
              <div className="guide-card-list">
                {entries.map(([url, guide], index) => (
                  <article key={url}>
                    <span>
                      {category.name} · {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>
                      <a href={url}>{guide.title}</a>
                    </h3>
                    <p>{guide.intro}</p>
                    <a className="guide-card-link" href={url}>
                      가이드 읽기 <span aria-hidden="true">→</span>
                    </a>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </Shell>
  );
}

function GuideSection({ section, index }) {
  if (Array.isArray(section)) {
    return (
      <section>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h2>{section[0]}</h2>
          <p>{section[1]}</p>
        </div>
      </section>
    );
  }
  return (
    <section>
      <span>{String(index + 1).padStart(2, "0")}</span>
      <div>
        <h2>{section.title}</h2>
        {section.paragraphs?.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {section.examples && (
          <div className="guide-examples">
            {section.examples.map((example) => (
              <div key={example.label}>
                <h3>{example.label}</h3>
                <p>{example.text}</p>
              </div>
            ))}
          </div>
        )}
        {(section.bad || section.good) && (
          <div className="example-compare guide-compare">
            {section.bad && (
              <div className="example-bad">
                <b>피할 예</b>
                <p>{section.bad}</p>
              </div>
            )}
            {section.good && (
              <div className="example-good">
                <b>권하는 예</b>
                <p>{section.good}</p>
              </div>
            )}
          </div>
        )}
        {section.sample && (
          <div className="copy-sample">
            <h3>바로 쓰는 문장</h3>
            <p>{section.sample}</p>
          </div>
        )}
        {section.checklist && (
          <div className="article-checklist">
            <h3>체크리스트</h3>
            <ul>
              {section.checklist.map((item) => (
                <li key={item}>□ {item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function GuidePage({ guide }) {
  const category = guideCategories[guide.category];
  const related = Object.entries(allGuides)
    .filter(
      ([, item]) =>
        item.category === guide.category && item.title !== guide.title,
    )
    .slice(0, 4);
  return (
    <Shell>
      <main className="guide-page section-shell">
        <nav className="guide-breadcrumb" aria-label="현재 위치">
          <a href="/">홈</a>
          <span aria-hidden="true">›</span>
          <a href="/guides/">작성 가이드</a>
          <span aria-hidden="true">›</span>
          <b>{guide.title}</b>
        </nav>
        <header className="guide-hero">
          <span className="eyebrow">{guide.eyebrow}</span>
          <h1>{guide.title}</h1>
          <p>{guide.intro}</p>
          <dl className="article-dates">
            <div>
              <dt>작성</dt>
              <dd>
                <time dateTime={guide.published}>{guide.published}</time>
              </dd>
            </div>
            <div>
              <dt>수정</dt>
              <dd>
                <time dateTime={guide.modified}>{guide.modified}</time>
              </dd>
            </div>
          </dl>
          <a className="button button-primary" href={category.makerUrl}>
            {category.makerLabel} →
          </a>
        </header>
        <article className="guide-article">
          {guide.sections.map((section, index) => (
            <GuideSection
              key={Array.isArray(section) ? section[0] : section.title}
              section={section}
              index={index}
            />
          ))}
        </article>
        <aside className="guide-cta">
          <div>
            <span className="eyebrow">APPLY THE GUIDE</span>
            <h2>점검한 내용을 제작기에 바로 반영하세요</h2>
            <p>
              회원가입과 결제 없이 편집하고 결과 파일을 기기에 저장할 수
              있습니다.
            </p>
          </div>
          <a className="button button-primary" href={category.makerUrl}>
            {category.makerLabel}
          </a>
        </aside>
        <nav
          className="related-guides"
          aria-label={`관련 ${category.name} 가이드`}
        >
          {related.map(([url, item]) => (
            <a key={url} href={url}>
              <span>{item.eyebrow}</span>
              <b>{item.title}</b>
              <i>읽어보기 →</i>
            </a>
          ))}
        </nav>
        <p className="guide-hub-return">
          <a href="/guides/">전체 작성 가이드로 돌아가기</a>
        </p>
      </main>
    </Shell>
  );
}
function NotFound() {
  return (
    <Shell>
      <main className="not-found section-shell">
        <span className="eyebrow">404 NOT FOUND</span>
        <h1>요청한 페이지를 찾을 수 없습니다.</h1>
        <p>
          주소가 바뀌었거나 삭제된 페이지입니다. 아래 메뉴에서 필요한 제작기나
          가이드를 선택해 주세요.
        </p>
        <div>
          <a className="button button-primary" href="/">
            홈으로 이동
          </a>
          <a className="button button-secondary" href="/guides/">
            작성 가이드 보기
          </a>
        </div>
      </main>
    </Shell>
  );
}
const path = location.pathname;
const currentGuide = allGuides[path];
const Page = currentGuide
  ? () => <GuidePage guide={currentGuide} />
  : path === "/guides/" || path === "/guides"
    ? GuideHub
    : path.includes("/business-card") || path.endsWith("maker.html")
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
                  : path === "/" || path.endsWith("/index.html")
                    ? Home
                    : NotFound;
createRoot(document.getElementById("root")).render(<Page />);
if ("serviceWorker" in navigator)
  window.addEventListener("load", () =>
    navigator.serviceWorker.register("/sw.js"),
  );
