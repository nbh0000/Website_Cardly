const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('cardly-theme');
let currentTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

function applyTheme(theme) {
  const isDark = theme === 'dark';
  root.dataset.theme = theme;
  if (!themeToggle) return;
  themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀' : '☾';
  const label = themeToggle.querySelector('.theme-label');
  if (label) label.textContent = isDark ? '화이트 모드' : '다크 모드';
  themeToggle.setAttribute('aria-label', `${isDark ? '화이트' : '다크'} 모드로 전환`);
  themeToggle.setAttribute('aria-pressed', String(isDark));
}

applyTheme(currentTheme);
themeToggle?.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('cardly-theme', currentTheme);
  applyTheme(currentTheme);
});

const cardForm = document.getElementById('cardForm');
if (cardForm) {
  const families = [['minimal','브랜드 미니멀'],['bold','크리에이티브 볼드'],['classic','클래식 에디토리얼'],['swiss','스위스 그리드'],['bauhaus','아트 스튜디오'],['luxury','프리미엄 골드'],['gradient','테크 그라디언트'],['mono','모노 타이포'],['pastel','뷰티 & 라이프'],['corporate','프로페셔널']];
  const densities = [['airy','여유'],['balanced','균형'],['compact','밀집'],['edge','엣지'],['inset','인셋']];
  const alignments = [['left','좌측'],['center','중앙'],['split','분할'],['bottom','하단'],['vertical','세로']];
  const decorations = [['clean','클린'],['shape','도형']];
  const fontMap = {
    'noto-sans':'"Noto Sans KR", sans-serif', 'nanum-gothic':'"Nanum Gothic", sans-serif',
    'ibm-plex':'"IBM Plex Sans KR", sans-serif', 'noto-serif':'"Noto Serif KR", serif',
    'gowun-batang':'"Gowun Batang", serif', 'do-hyeon':'"Do Hyeon", sans-serif',
    'jua':'Jua, sans-serif', 'black-han':'"Black Han Sans", sans-serif'
  };
  const templateGrid = document.getElementById('templateGrid');
  const templateFilter = document.getElementById('templateFilter');
  const card = document.getElementById('businessCard');
  const accentColor = document.getElementById('accentColor');
  const colorValue = document.getElementById('colorValue');
  const fontFamily = document.getElementById('fontFamily');
  const previewInitial = document.getElementById('previewInitial');
  const downloadStatus = document.getElementById('downloadStatus');
  const fields = { cardName:document.getElementById('previewName'), cardRole:document.getElementById('previewRole'), cardCompany:document.getElementById('previewCompany'), cardEmail:document.getElementById('previewEmail'), cardPhone:document.getElementById('previewPhone'), cardWebsite:document.getElementById('previewWebsite') };
  const fallbacks = { cardName:'이름', cardRole:'직함', cardCompany:'BRAND', cardEmail:'email@example.com', cardPhone:'010 0000 0000', cardWebsite:'website.com' };

  families.forEach(([value,label]) => {
    const option = document.createElement('option'); option.value = value; option.textContent = label; templateFilter.appendChild(option);
  });

  let number = 0;
  families.forEach(([family,familyLabel]) => densities.forEach(([density,densityLabel], densityIndex) => alignments.forEach(([align,alignLabel], alignIndex) => decorations.forEach(([decoration,decorationLabel], decorationIndex) => {
    number += 1;
    const label = document.createElement('label');
    label.dataset.family = family;
    label.title = `${familyLabel} · ${densityLabel} · ${alignLabel} · ${decorationLabel}`;
    const x = 10 + alignIndex * 8;
    const y = 10 + densityIndex * 3;
    label.innerHTML = `<input type="radio" name="layout" value="template-${number}" data-layout="${family}" data-density="${density}" data-align="${align}" data-decoration="${decoration}" ${number === 1 ? 'checked' : ''}><span class="template-swatch swatch-${family}" data-decoration="${decoration}" style="--mini-x:${x}%;--mini-y:${y}%;--mini-w:${46 - densityIndex * 4}%"><i></i><b>${String(number).padStart(3,'0')}</b></span>`;
    templateGrid.appendChild(label);
  }))));

  templateFilter.addEventListener('change', () => {
    templateGrid.querySelectorAll('label').forEach(label => { label.hidden = templateFilter.value !== 'all' && label.dataset.family !== templateFilter.value; });
    templateGrid.scrollTop = 0;
  });

  // Radio focus can make browsers scroll the long template list/page after a click.
  templateGrid.addEventListener('click', event => {
    const input = event.target.closest('label')?.querySelector('input');
    if (!input) return;
    event.preventDefault();
    input.checked = true;
    updateCard();
    input.blur();
  });

  function selectedTemplate() {
    const selected = cardForm.querySelector('input[name="layout"]:checked');
    return { layout:selected.dataset.layout, density:selected.dataset.density, align:selected.dataset.align, decoration:selected.dataset.decoration };
  }

  function updateCard() {
    Object.entries(fields).forEach(([id,output]) => { output.textContent = document.getElementById(id).value.trim() || fallbacks[id]; });
    previewInitial.textContent = (document.getElementById('cardCompany').value.trim() || 'C').charAt(0).toUpperCase();
    const template = selectedTemplate();
    card.className = `business-card layout-${template.layout}`;
    card.dataset.density = template.density;
    card.dataset.align = template.align;
    card.dataset.decoration = template.decoration;
    card.style.setProperty('--card-accent', accentColor.value);
    card.style.fontFamily = fontMap[fontFamily.value];
    colorValue.value = accentColor.value.toUpperCase();
  }

  cardForm.addEventListener('input', updateCard);
  cardForm.addEventListener('reset', () => window.setTimeout(updateCard));

  document.getElementById('downloadButton').addEventListener('click', async () => {
    await document.fonts.ready;
    const canvas = document.getElementById('exportCanvas');
    const ctx = canvas.getContext('2d');
    const template = selectedTemplate();
    const { layout, density, align, decoration } = template;
    const accent = accentColor.value;
    const chosenFont = fontMap[fontFamily.value];
    const dark = ['bold','luxury','gradient'].includes(layout);
    const textColor = dark ? '#ffffff' : '#171724';
    const mutedColor = dark ? '#c3c1ce' : '#626270';
    const padding = { airy:150, balanced:110, compact:80, edge:48, inset:185 }[density];
    const centered = align === 'center';
    const rightAligned = align === 'split';
    const textX = centered ? 900 : rightAligned ? 1650 - padding : padding;
    const personY = align === 'bottom' ? 700 : align === 'vertical' ? 410 : 570;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    const backgrounds = { bold:'#181725', luxury:'#102c26', mono:'#f6f6f2', pastel:'#f3e9ec' };
    ctx.fillStyle = backgrounds[layout] || '#ffffff'; ctx.fillRect(0,0,canvas.width,canvas.height);
    if (layout === 'gradient') { const g=ctx.createLinearGradient(0,0,1800,1000); g.addColorStop(0,accent); g.addColorStop(1,'#d946ef'); ctx.fillStyle=g; ctx.fillRect(0,0,1800,1000); }
    if (layout === 'pastel') { const g=ctx.createLinearGradient(0,0,1800,1000); g.addColorStop(0,'#ffe5e9'); g.addColorStop(1,'#dff7f1'); ctx.fillStyle=g; ctx.fillRect(0,0,1800,1000); }
    if (layout === 'mono') { ctx.fillStyle='#111'; ctx.fillRect(1320,0,480,1000); }
    if (layout === 'corporate') { ctx.fillStyle='#112a46'; ctx.fillRect(1350,0,450,1000); ctx.strokeStyle=accent; ctx.lineWidth=4; ctx.strokeRect(1615,130,80,740); }
    if (layout === 'minimal' || layout === 'swiss') { ctx.fillStyle=accent; ctx.fillRect(0,0,layout === 'swiss' ? 180 : 30,1000); }
    if (layout === 'bold') { ctx.fillStyle=accent; ctx.beginPath(); ctx.moveTo(1280,0); ctx.lineTo(1800,0); ctx.lineTo(1800,1000); ctx.lineTo(1500,1000); ctx.closePath(); ctx.fill(); }
    if (layout === 'classic') { ctx.fillStyle='#f7f2e8'; ctx.fillRect(0,0,1800,1000); ctx.strokeStyle=accent; ctx.lineWidth=7; ctx.strokeRect(16,16,1768,968); ctx.globalAlpha=.35; ctx.strokeRect(38,38,1724,924); ctx.globalAlpha=1; }
    if (layout === 'bauhaus') { ctx.fillStyle='#f2b705'; ctx.beginPath(); ctx.arc(1510,80,180,0,Math.PI*2); ctx.strokeStyle='#f2b705'; ctx.lineWidth=46; ctx.stroke(); ctx.fillStyle='#e44932'; ctx.fillRect(1515,115,135,135); }
    if (layout === 'luxury') { ctx.strokeStyle='#d3b66d'; ctx.lineWidth=3; ctx.globalAlpha=.42; ctx.strokeRect(34,34,1732,932); ctx.globalAlpha=1; }
    if (decoration === 'shape') { ctx.globalAlpha=.14; ctx.fillStyle=accent; ctx.beginPath(); ctx.arc(1580,160,260,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1; }

    const brandX = centered ? 900 : padding;
    ctx.fillStyle = layout === 'luxury' ? '#d3b66d' : accent; ctx.beginPath(); ctx.roundRect(brandX - (centered ? 65 : 0),72,130,130,34); ctx.fill();
    ctx.fillStyle='#fff'; ctx.font=`800 62px ${chosenFont}`; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(previewInitial.textContent, centered ? brandX : brandX+65,140);
    ctx.textBaseline='alphabetic'; ctx.textAlign=centered?'center':rightAligned?'right':'left'; ctx.fillStyle=textColor; ctx.font=`700 34px ${chosenFont}`; ctx.fillText(fields.cardCompany.textContent,textX,250);
    ctx.font=`800 88px ${chosenFont}`; ctx.fillText(fields.cardName.textContent,textX,personY);
    ctx.fillStyle=mutedColor; ctx.font=`400 34px ${chosenFont}`; ctx.fillText(fields.cardRole.textContent,textX,personY+60);
    ctx.font=`400 27px ${chosenFont}`;
    const contacts=[fields.cardEmail.textContent,fields.cardPhone.textContent,fields.cardWebsite.textContent];
    if (centered || align === 'vertical') contacts.forEach((text,index)=>ctx.fillText(text,textX,820+index*42));
    else contacts.forEach((text,index)=>ctx.fillText(text,rightAligned?textX:padding+index*500,875));

    canvas.toBlob(blob => {
      if (!blob) return;
      const link=document.createElement('a'); link.href=URL.createObjectURL(blob); link.download=`cardly-${document.getElementById('cardName').value.trim() || 'business-card'}.png`; link.click(); URL.revokeObjectURL(link.href);
      downloadStatus.textContent='명함 PNG를 저장했습니다. 다운로드 폴더를 확인하세요.';
    },'image/png');
  });

  updateCard();
}
