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
].map((item) => ({ ...item, side: "front" }));
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
const initialCardItems = [...initialItems, ...initialBackItems];
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
const templates = families.flatMap((family, i) =>
  finishes.map(([material, finish], j) => ({
    id: i * 5 + j + 1,
    family,
    name: `${familyNames[i]} ${finish}`,
    material,
    corners: j === 4 ? "round" : j % 2 ? "square" : "soft",
  })),
);
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
];
const resumeCategories = [
  "신입",
  "경력직",
  "개발자",
  "디자이너",
  "마케팅·기획",
  "영문",
];
const resumeTemplates = [
  "minimal",
  "professional",
  "sidebar",
  "editorial",
  "creative",
].flatMap((base, i) =>
  ["clean", "navy", "warm", "contrast"].map((variant, j) => ({
    id: i * 4 + j + 1,
    base,
    variant,
    category: resumeCategories[(i * 4 + j) % resumeCategories.length],
  })),
);

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
      <a className="brand" href="/">
        <span className="brand-mark">C</span>
        <span>Cardly</span>
      </a>
      <nav className="site-nav">
        <a href="/maker.html">명함 만들기</a>
        <a href="/resume.html">이력서 만들기</a>
        <a href="/about.html">소개</a>
        <a href="/contact.html">문의</a>
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
        <a className="brand" href="/">
          <span className="brand-mark">C</span>Cardly
        </a>
        <nav>
          <a href="/maker.html">명함 만들기</a>
          <a href="/resume.html">이력서 만들기</a>
          <a href="/privacy.html">개인정보처리방침</a>
          <a href="/terms.html">이용약관</a>
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
            <span className="eyebrow">FREE DESIGN STUDIO</span>
            <h1>
              나를 보여주는
              <br />
              <em>한 장의 디자인.</em>
            </h1>
            <p>명함과 이력서를 자유롭게 편집하고 설치 없이 바로 저장하세요.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="/maker.html">
                명함 만들기 →
              </a>
              <a className="button button-secondary" href="/resume.html">
                이력서 만들기
              </a>
            </div>
            <ul className="trust-list">
              <li>React 웹앱</li>
              <li>모바일 터치 편집</li>
              <li>PNG·PDF 저장</li>
            </ul>
          </div>
          <div className="hero-visual">
            <div className="showcase-card showcase-card-back" />
            <div className="showcase-card showcase-card-front">
              <div className="showcase-logo">C</div>
              <div>
                <strong>김카들리</strong>
                <span>Product Designer</span>
              </div>
              <small>hello@cardly.kr</small>
            </div>
          </div>
        </section>
        <section className="features section-shell">
          <div className="section-heading centered-heading">
            <span className="eyebrow">CARDLY TOOLS</span>
            <h2>필요한 문서를 더 쉽게</h2>
          </div>
          <div className="feature-grid">
            <article>
              <span className="feature-number">01</span>
              <h3>50가지 명함</h3>
              <p>
                재질과 그래픽이 다른 템플릿을 고르고 모든 요소를 직접
                편집하세요.
              </p>
            </article>
            <article>
              <span className="feature-number">02</span>
              <h3>PPT형 편집기</h3>
              <p>
                각 요소를 이동, 크기 조절, 삭제하고 새 텍스트와 도형을
                추가하세요.
              </p>
            </article>
            <article>
              <span className="feature-number">03</span>
              <h3>사진 이력서</h3>
              <p>사진을 드래그해 넣고 5가지 템플릿을 PDF로 저장하세요.</p>
            </article>
          </div>
        </section>
      </main>
    </Shell>
  );
}

function Maker() {
  const cardRef = useRef();
  const [template, setTemplate] = useState(templates[0]);
  const [items, setItems] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("cardly-project"))?.items ||
        initialCardItems
      );
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
  const choose = (t) => {
    setTemplate(t);
    const [bg, text, accent] = defaults[t.family];
    setColors({ bg, text, accent });
    setMaterial(t.material);
    setCorners(t.corners);
  };
  const patchItem = (id, patch) =>
    setItems((list) =>
      list.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  const dragStart = (e, item) => {
    if (e.target.isContentEditable) return;
    e.preventDefault();
    setSelected(item.id);
    const rect = cardRef.current.getBoundingClientRect(),
      startX = e.clientX,
      startY = e.clientY,
      originX = item.x,
      originY = item.y;
    e.currentTarget.setPointerCapture(e.pointerId);
    const move = (ev) =>
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
    const end = () => {
      e.currentTarget.removeEventListener("pointermove", move);
      e.currentTarget.removeEventListener("pointerup", end);
    };
    e.currentTarget.addEventListener("pointermove", move);
    e.currentTarget.addEventListener("pointerup", end);
  };
  const add = (type) =>
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
    ]);
  const addImage = (file) => {
    if (!file?.type.startsWith("image/")) return;
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
    if (autoSave)
      localStorage.setItem("cardly-project", JSON.stringify({ items }));
  }, [autoSave, items]);
  const save = async () => {
    const { default: html2canvas } = await import("html2canvas");
    setSelected(null);
    await new Promise((r) => setTimeout(r));
    const canvas = await html2canvas(cardRef.current, {
      scale: 3,
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
                템플릿 <small>50</small>
              </legend>
              <div className="template-grid react-template-grid">
                {templates.map((t) => (
                  <button
                    type="button"
                    key={t.id}
                    className={template.id === t.id ? "active" : ""}
                    onClick={() => choose(t)}
                  >
                    <span className={`template-swatch swatch-${t.family}`}>
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
              onAdd={add}
              onDelete={() => {
                setItems((x) => x.filter((i) => i.id !== selected));
                setSelected(null);
              }}
            />
            <div className="preview-stage">
              <article
                ref={cardRef}
                className={`business-card layout-${template.family}`}
                data-material={material}
                data-corners={corners}
                style={{
                  "--card-accent": colors.accent,
                  "--card-bg": colors.bg,
                  "--card-text": colors.text,
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
                      onText={(text) => patchItem(item.id, { text })}
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

function EditorToolbar({ selected, onSize, onAdd, onDelete }) {
  const [type, setType] = useState("text");
  return (
    <div className="canvas-toolbar">
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

function Resume() {
  const sheetRef = useRef();
  const [tpl, setTpl] = useState(resumeTemplates[0]);
  const [font, setFont] = useState('"Noto Sans KR",sans-serif');
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("전체");
  const [data, setData] = useState({
    name: "김카들리",
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
  const save = async () => {
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import("html2canvas"),
      import("jspdf"),
    ]);
    const canvas = await html2canvas(sheetRef.current, {
      scale: 2,
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
      (data.skills.split(",").filter(Boolean).length >= 4 ? 15 : 8),
  );
  const visibleTemplates =
    category === "전체"
      ? resumeTemplates
      : resumeTemplates.filter((t) => t.category === category);
  return (
    <Shell>
      <main className="resume-page section-shell">
        <div className="section-heading">
          <span className="eyebrow">RESUME BUILDER</span>
          <h1>이력서 만들기</h1>
          <p>20가지 템플릿과 사진으로 이력서를 완성하세요.</p>
        </div>
        <div className="resume-studio">
          <aside className="resume-editor">
            <fieldset className="resume-template-picker">
              <legend>
                템플릿 선택 <small>20</small>
              </legend>
              <div className="resume-category-tabs">
                {["전체", ...resumeCategories].map((item) => (
                  <button
                    type="button"
                    className={category === item ? "active" : ""}
                    key={item}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="resume-template-list resume-template-20">
                {visibleTemplates.map((t) => (
                  <label key={t.id}>
                    <input
                      type="radio"
                      checked={tpl.id === t.id}
                      onChange={() => setTpl(t)}
                    />
                    <span className={`resume-thumb-${t.variant}`}>
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
            <ResumeSheet
              ref={sheetRef}
              tpl={tpl}
              data={data}
              photo={photo}
              font={font}
              english={tpl.category === "영문"}
            />
          </section>
        </div>
      </main>
    </Shell>
  );
}
const ResumeSheet = React.forwardRef(
  ({ tpl, data, photo, font, english }, ref) => (
    <article
      ref={ref}
      className={`resume-sheet resume-${tpl.base} resume-variant-${tpl.variant}`}
      style={{ fontFamily: font }}
    >
      <header className="resume-head">
        {photo && <img className="resume-photo" src={photo} />}
        <div>
          <h2>{data.name}</h2>
          <p>{data.title}</p>
        </div>
        <div className="resume-contact">
          <span>{data.email}</span>
          <span>{data.phone}</span>
        </div>
      </header>
      <div className="resume-body">
        <section>
          <h3>{english ? "PROFILE" : "소개"}</h3>
          <p>{data.summary}</p>
        </section>
        <section>
          <h3>{english ? "EXPERIENCE" : "경력"}</h3>
          {data.experience.split("\n").map((x) => (
            <p key={x}>{x}</p>
          ))}
        </section>
        <section>
          <h3>{english ? "EDUCATION" : "학력"}</h3>
          <p>{data.education}</p>
        </section>
        <section>
          <h3>{english ? "SKILLS" : "기술"}</h3>
          <div className="resume-skills">
            {data.skills.split(",").map((x) => (
              <span key={x}>{x.trim()}</span>
            ))}
          </div>
        </section>
      </div>
    </article>
  ),
);

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
            <p>50가지 템플릿, 재질, 글꼴과 PPT형 요소 편집을 제공합니다.</p>
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
        </div>
      </main>
    </Shell>
  );
}
const path = location.pathname;
const Page = path.endsWith("maker.html")
  ? Maker
  : path.endsWith("resume.html")
    ? Resume
    : path.endsWith("about.html")
      ? About
      : path.endsWith("contact.html")
        ? Contact
        : path.endsWith("privacy.html")
          ? () => <Legal type="privacy" />
          : path.endsWith("terms.html")
            ? () => <Legal type="terms" />
            : Home;
createRoot(document.getElementById("root")).render(<Page />);
if ("serviceWorker" in navigator)
  window.addEventListener("load", () =>
    navigator.serviceWorker.register("/sw.js"),
  );
