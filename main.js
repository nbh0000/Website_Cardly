const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('cardly-theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

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
  const templateFamilies = [
    ['minimal','미니멀'], ['bold','볼드'], ['classic','클래식'], ['swiss','스위스'], ['bauhaus','바우하우스'],
    ['luxury','럭셔리'], ['gradient','그라디언트'], ['mono','모노'], ['pastel','파스텔'], ['corporate','비즈니스']
  ];
  const templatePalettes = [
    '#635bff','#2563eb','#0891b2','#0f766e','#16a34a','#65a30d','#ca8a04','#ea580c','#dc2626','#e11d48',
    '#db2777','#c026d3','#9333ea','#7c3aed','#4f46e5','#334155','#111827','#7c2d12','#14532d','#0c4a6e'
  ];
  const templateGrid = document.getElementById('templateGrid');
  const templateFilter = document.getElementById('templateFilter');

  templateFamilies.forEach(([value, label]) => {
    const option = document.createElement('option');
    option.value = value; option.textContent = label;
    templateFilter.appendChild(option);
  });

  templateFamilies.forEach(([family, familyLabel], familyIndex) => {
    templatePalettes.forEach((color, colorIndex) => {
      const number = familyIndex * templatePalettes.length + colorIndex + 1;
      const label = document.createElement('label');
      label.dataset.family = family;
      label.title = `${familyLabel} ${String(number).padStart(3, '0')}`;
      label.innerHTML = `<input type="radio" name="layout" value="${family}-${number}" data-layout="${family}" data-color="${color}" ${number === 1 ? 'checked' : ''}><span class="template-swatch swatch-${family}" style="--swatch-color:${color};background-color:${color}18"><i style="background-color:${color}"></i><b>${String(number).padStart(3, '0')}</b></span>`;
      templateGrid.appendChild(label);
    });
  });

  templateFilter.addEventListener('change', () => {
    templateGrid.querySelectorAll('label').forEach((label) => {
      label.hidden = templateFilter.value !== 'all' && label.dataset.family !== templateFilter.value;
    });
  });

  const card = document.getElementById('businessCard');
  const fields = {
    cardName: document.getElementById('previewName'),
    cardRole: document.getElementById('previewRole'),
    cardCompany: document.getElementById('previewCompany'),
    cardEmail: document.getElementById('previewEmail'),
    cardPhone: document.getElementById('previewPhone'),
    cardWebsite: document.getElementById('previewWebsite'),
  };
  const fallbacks = {
    cardName: '이름', cardRole: '직함', cardCompany: 'BRAND',
    cardEmail: 'email@example.com', cardPhone: '010 0000 0000', cardWebsite: 'website.com',
  };
  const accentColor = document.getElementById('accentColor');
  const colorValue = document.getElementById('colorValue');
  const previewInitial = document.getElementById('previewInitial');
  const downloadStatus = document.getElementById('downloadStatus');

  function selectedTemplate() {
    const selected = cardForm.querySelector('input[name="layout"]:checked');
    return { layout: selected.dataset.layout, color: selected.dataset.color };
  }

  function updateCard() {
    Object.entries(fields).forEach(([id, output]) => {
      output.textContent = document.getElementById(id).value.trim() || fallbacks[id];
    });
    previewInitial.textContent = (document.getElementById('cardCompany').value.trim() || 'C').charAt(0).toUpperCase();
    const template = selectedTemplate();
    if (document.activeElement?.name === 'layout') accentColor.value = template.color;
    card.style.setProperty('--card-accent', accentColor.value);
    colorValue.value = accentColor.value.toUpperCase();
    const layout = template.layout;
    card.className = `business-card layout-${layout}`;
  }

  cardForm.addEventListener('input', updateCard);
  cardForm.addEventListener('reset', () => window.setTimeout(updateCard));

  document.getElementById('downloadButton').addEventListener('click', () => {
    const canvas = document.getElementById('exportCanvas');
    const ctx = canvas.getContext('2d');
    const layout = selectedTemplate().layout;
    const accent = accentColor.value;
    const dark = ['bold', 'luxury', 'gradient'].includes(layout);
    const serif = ['classic', 'luxury'].includes(layout);
    const textColor = dark ? '#ffffff' : '#171724';
    const mutedColor = dark ? '#c3c1ce' : '#626270';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const backgrounds = { bold:'#181725', luxury:'#102c26', mono:'#f6f6f2', pastel:'#f3e9ec' };
    ctx.fillStyle = backgrounds[layout] || '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (layout === 'gradient') {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, accent); gradient.addColorStop(1, '#d946ef');
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    if (layout === 'pastel') {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#ffe5e9'); gradient.addColorStop(1, '#dff7f1');
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    if (layout === 'mono') { ctx.fillStyle = '#111111'; ctx.fillRect(1320, 0, 480, canvas.height); }

    if (layout === 'minimal' || layout === 'swiss') {
      ctx.fillStyle = accent;
      ctx.fillRect(0, 0, layout === 'swiss' ? 180 : 30, canvas.height);
    } else if (layout === 'bold') {
      ctx.fillStyle = accent;
      ctx.fillRect(0, canvas.height - 38, canvas.width, 38);
    } else if (layout === 'classic') {
      ctx.strokeStyle = accent;
      ctx.lineWidth = 10;
      ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
    }

    ctx.fillStyle = layout === 'luxury' ? '#d3b66d' : accent;
    if (serif) {
      ctx.beginPath(); ctx.arc(145, 140, 68, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.beginPath(); ctx.roundRect(80, 72, 130, 130, 34); ctx.fill();
    }
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 62px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(previewInitial.textContent, 145, 140);

    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = textColor;
    ctx.font = `800 34px ${serif ? 'Georgia' : 'Arial'}`;
    ctx.fillText(fields.cardCompany.textContent, 245, 150);

    ctx.font = `800 88px ${serif ? 'Georgia' : 'Arial'}`;
    ctx.fillText(fields.cardName.textContent, 100, 570);
    ctx.fillStyle = mutedColor;
    ctx.font = `400 34px ${serif ? 'Georgia' : 'Arial'}`;
    ctx.fillText(fields.cardRole.textContent, 102, 630);

    ctx.font = '400 27px Arial';
    const contacts = [fields.cardEmail.textContent, fields.cardPhone.textContent, fields.cardWebsite.textContent];
    contacts.forEach((text, index) => ctx.fillText(text, 102 + index * 500, 875));

    canvas.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `cardly-${document.getElementById('cardName').value.trim() || 'business-card'}.png`;
      link.click();
      URL.revokeObjectURL(link.href);
      downloadStatus.textContent = '명함 PNG를 저장했습니다. 다운로드 폴더를 확인하세요.';
    }, 'image/png');
  });

  updateCard();
}
