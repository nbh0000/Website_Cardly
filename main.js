const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const themeLabel = themeToggle.querySelector('.theme-label');

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

function applyTheme(theme) {
  const isDark = theme === 'dark';
  root.dataset.theme = theme;
  themeIcon.textContent = isDark ? '☀' : '☾';
  themeLabel.textContent = isDark ? '화이트 모드' : '다크 모드';
  themeToggle.setAttribute('aria-label', `${isDark ? '화이트' : '다크'} 모드로 전환`);
  themeToggle.setAttribute('aria-pressed', String(isDark));
}

applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', currentTheme);
  applyTheme(currentTheme);
});
