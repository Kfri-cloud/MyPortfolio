const nav = document.querySelector('.nav');
const menuToggle = document.querySelector('.menu-toggle');
const header = document.querySelector('.site-header');
const topButton = document.querySelector('.top-button');
const slideButtons= document.querySelectorAll(
  ".slide-buttons button"
);


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

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const isScrolled = window.scrollY > 60;
  header.classList.toggle('scrolled', isScrolled);
  topButton.classList.toggle('show', window.scrollY > 300);

  if (window.scrollY <= 10 || window.scrollY < lastScrollY) {
    header.classList.add('is-visible');
  } else {
    header.classList.remove('is-visible');
  }

  lastScrollY = window.scrollY;
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

const projectSection = document.querySelector('#github-games');
const projectStatus = document.querySelector('.project-status');
const projectList = document.querySelector('.project-list');
const githubUser = projectSection.dataset.githubUser;

const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
}[character]));

const projectTypes = [
  {
    title: '슈퍼마리오 메이커', dimension: '2D', repoName: 'SuperMarioMaker',
    summary: '타일맵 에디터로 맵을 만들고 온라인으로 함께 플레이하는 2D 마리오 게임입니다.'
  },
  {
    title: '농사게임', dimension: '3D', repoName: 'SunMoon',
    summary: '농작물을 심고 포인트를 모으며 3D 캐릭터를 움직이는 Unity 농장 게임입니다.'
  }
];

const renderProjects = (projects) => {
  projectList.innerHTML = projectTypes.map((type, index) => {
    const project = projects.find((candidate) => candidate.name.toLowerCase() === type.repoName.toLowerCase());
    const heading = `<div class="project-card-heading"><span class="project-number">${String(index + 1).padStart(2, '0')}</span><span class="project-badge">${type.dimension}</span></div><h3>${type.title}</h3>`;
    if (!project) {
      return `<article class="project-card project-card--empty">${heading}<p>공개 저장소를 불러오지 못했습니다.</p><a class="text-link" href="https://github.com/${githubUser}/${type.repoName}" target="_blank" rel="noreferrer">GitHub에서 보기 ↗</a></article>`;
    }
    const url = project.html_url?.startsWith(`https://github.com/${githubUser}/`)
      ? project.html_url : `https://github.com/${githubUser}`;
    const description = project.description || type.summary;
    return `<article class="project-card">${heading}<p class="project-repo-name">${escapeHtml(project.name)}</p><p class="project-description">${escapeHtml(description)}</p><div class="project-meta"><span>${escapeHtml(project.language || 'Unity')} · ★ ${project.stargazers_count || 0}</span><a class="text-link" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">코드 보기 ↗</a></div></article>`;
  }).join('');
};

const loadProjects = async () => {
  projectStatus.className = 'project-status';
  projectStatus.textContent = '로딩 중...';
  projectList.innerHTML = '';
  try {
    const response = await fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=100`);
    if (!response.ok) throw new Error('GitHub API 요청 실패');
    const projects = await response.json();
    const missingProjects = projectTypes.filter((type) => !projects.some((project) => project.name.toLowerCase() === type.repoName.toLowerCase()));
    projectStatus.textContent = missingProjects.length ? '일부 저장소를 API에서 찾지 못했습니다.' : '';
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
const formStatus = form.querySelector('.form-success');
const submitButton = form.querySelector('button[type="submit"]');
const showError = (field, message) => {
  document.querySelector(`[data-error-for="${field}"]`).textContent = message;
};

form.addEventListener('input', (event) => {
  if (event.target.name) showError(event.target.name, '');
});
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const message = String(formData.get('message') || '').trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;
  formStatus.textContent = '';
  formStatus.classList.remove('error');

  if (!name) { showError('name', '이름을 입력해주세요.'); isValid = false; }
  if (!email) { showError('email', '이메일을 입력해주세요.'); isValid = false; }
  else if (!emailPattern.test(email)) { showError('email', '이메일 형식을 확인해주세요.'); isValid = false; }
  if (!message) { showError('message', '메시지를 입력해주세요.'); isValid = false; }
  if (!isValid) return;

  const formId = form.dataset.formspreeId?.trim();
  if (!formId || !/^[a-zA-Z0-9]+$/.test(formId)) {
    formStatus.classList.add('error');
    formStatus.textContent = '현재 메시지 전송이 설정되지 않았습니다. 잠시 후 다시 시도해 주세요.';
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = '보내는 중...';
  formStatus.textContent = '메시지를 보내고 있습니다...';
  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error('Formspree 전송 실패');
    form.reset();
    formStatus.textContent = '메시지가 전송되었습니다. 감사합니다!';
  } catch (error) {
    formStatus.classList.add('error');
    formStatus.textContent = '메시지를 보내지 못했습니다. 잠시 후 다시 시도해 주세요.';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = '보내기';
  }
});

//image-anim
// image animation
const images = document.querySelectorAll('.character-anim');

images.forEach((image) => {
  const frameBase = image.getAttribute('src').replace(/frame-1\.png$/, '');

  const frames = Array.from(
    { length: 24 },
    (_, index) => `${frameBase}frame-${index + 1}.png`
  );

  let frame = 0;
  let timer = null;

  image.addEventListener('mouseenter', () => {
    if (timer) return;

    timer = setInterval(() => {
      image.src = frames[frame];
      frame = (frame + 1) % frames.length;
    }, 80);
  });

  image.addEventListener('mouseleave', () => {
    clearInterval(timer);
    timer = null;
    frame = 0;
    image.src = frames[0];
  });
});
