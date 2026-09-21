const root = document.documentElement;
const nav = document.querySelector('.nav');
const menuToggle = document.querySelector('.menu-toggle');
const themeToggle = document.querySelector('.theme-toggle');
const header = document.querySelector('.site-header');
const topButton = document.querySelector('.top-button');
const slideButtons= document.querySelectorAll(
  ".slide-buttons button"
);


const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') root.dataset.theme = 'dark';

themeToggle.addEventListener('click', () => {
  const isDark = root.dataset.theme === 'dark';
  root.dataset.theme = isDark ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', isDark ? 'light' : 'dark');
  themeToggle.textContent = isDark ? '☾' : '☀';
});

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
});

document.querySelectorAll('.nav-list a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  const isScrolled = window.scrollY > 60;
  header.classList.toggle('scrolled', isScrolled);
  topButton.classList.toggle('show', window.scrollY > 300);
});

topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


slideButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;
    const target = document.getElementById(targetId);

    target?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));

const projectSection = document.querySelector('#projects');
const projectStatus = document.querySelector('.project-status');
const projectList = document.querySelector('.project-list');
const githubUser = projectSection.dataset.githubUser;

const renderProjects = (projects) => {
  projectList.innerHTML = projects.map(({ name, description, stargazers_count: stars, html_url: url }) => `
    <article class="project-card">
      <h3>${name}</h3>
      <p>${description || '설명이 없는 GitHub 저장소입니다.'}</p>
      <div class="project-meta"><span>★ ${stars}</span><a class="text-link" href="${url}" target="_blank" rel="noreferrer">보기 ↗</a></div>
    </article>
  `).join('');
};

const loadProjects = async () => {
  projectStatus.className = 'project-status';
  projectStatus.textContent = '로딩 중...';
  projectList.innerHTML = '';
  try {
    const response = await fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=6`);
    if (!response.ok) throw new Error('GitHub API 요청 실패');
    const projects = await response.json();
    if (!projects.length) {
      projectStatus.textContent = '표시할 프로젝트가 없습니다.';
      return;
    }
    projectStatus.textContent = '';
    renderProjects(projects);
  } catch (error) {
    projectStatus.className = 'project-status error';
    projectStatus.innerHTML = '프로젝트를 불러올 수 없습니다. ';
    const retryButton = document.createElement('button');
    retryButton.className = 'button secondary';
    retryButton.type = 'button';
    retryButton.textContent = '다시 시도';
    retryButton.addEventListener('click', loadProjects);
    projectStatus.append(retryButton);
  }
};
loadProjects();

const form = document.querySelector('.contact-form');
const showError = (field, message) => {
  document.querySelector(`[data-error-for="${field}"]`).textContent = message;
};

form.addEventListener('input', (event) => showError(event.target.name, ''));
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const message = formData.get('message').trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;
  document.querySelector('.form-success').textContent = '';

  if (!name) { showError('name', '이름을 입력해주세요.'); isValid = false; }
  if (!email) { showError('email', '이메일을 입력해주세요.'); isValid = false; }
  else if (!emailPattern.test(email)) { showError('email', '이메일 형식을 확인해주세요.'); isValid = false; }
  if (!message) { showError('message', '메시지를 입력해주세요.'); isValid = false; }
  if (!isValid) return;

  document.querySelector('.form-success').textContent = '메시지가 확인되었습니다. 감사합니다!';
  form.reset();
});
