const themeRoot = document.documentElement;
const themeButton = document.querySelector('.theme-toggle-valid');
const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'dark') {
  themeRoot.dataset.theme = 'dark';
}

const updateThemeButton = () => {
  const isDark = themeRoot.dataset.theme === 'dark';
  themeButton.textContent = isDark ? '☀' : '☾';
  themeButton.setAttribute('aria-label', isDark ? '라이트모드로 전환' : '다크모드로 전환');
};

updateThemeButton();

themeButton.addEventListener('click', () => {
  const isDark = themeRoot.dataset.theme === 'dark';
  themeRoot.dataset.theme = isDark ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', isDark ? 'light' : 'dark');
  updateThemeButton();
});
