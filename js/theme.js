const themeRoot = document.documentElement;
const themeButton = document.querySelector('.theme-toggle-valid');
const savedTheme = localStorage.getItem('portfolio-theme');
const themeState = { mode: savedTheme === 'dark' ? 'dark' : 'light' };

const updateThemeButton = () => {
  const isDark = themeState.mode === 'dark';
  themeRoot.dataset.theme = themeState.mode;
  themeButton.textContent = isDark ? '☀' : '☾';
  themeButton.setAttribute('aria-label', isDark ? '라이트모드로 전환' : '다크모드로 전환');
};

updateThemeButton();

themeButton.addEventListener('click', () => {
  themeState.mode = themeState.mode === 'dark' ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', themeState.mode);
  updateThemeButton();
});
