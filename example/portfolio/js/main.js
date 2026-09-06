'use strict';
// 01. 설정과 상태: 실제 제출 시 본인의 GitHub 아이디로 바꾸세요.
const GITHUB_USERNAME = 'octocat';
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const samples = [
  {name:'나의 첫 포트폴리오',description:'나를 소개하는 작은 공간. 구조부터 인터랙션까지 직접 만들었습니다.',language:'HTML',stargazers_count:0,symbol:'< hello />'},
  {name:'오늘의 기록',description:'하루의 생각을 정돈하는 메모 화면을 디자인한 가상 프로젝트입니다.',language:'CSS',stargazers_count:0,symbol:'today_ /'},
  {name:'작은 할 일 목록',description:'버튼을 누르면 목록이 바뀌는 동작을 연습하는 가상 프로젝트입니다.',language:'JavaScript',stargazers_count:0,symbol:'[ ✓ ]'}
];
const state = {theme:'light',source:'sample',status:'success',repos:samples,filter:'all',error:'',errors:{}};
let requestVersion = 0;
let controller;
// 02. 다크 모드: 이벤트 → 상태 → 렌더링 → 저장
const renderTheme = () => {
  document.documentElement.dataset.theme = state.theme;
  $('#theme-toggle').setAttribute('aria-pressed', String(state.theme === 'dark'));
  $('#theme-toggle').setAttribute('aria-label',state.theme === 'dark' ? '라이트 모드 켜기' : '다크 모드 켜기');
};
try {state.theme = localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light';} catch { /* 저장이 제한되어도 테마 전환은 작동 */ }
renderTheme();
$('#theme-toggle').addEventListener('click', () => {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  renderTheme();
  try {localStorage.setItem('portfolio-theme',state.theme);} catch { /* 현재 페이지에서는 유지 */ }
});
// 03. 메뉴와 스크롤
const closeMenu = () => {
  $('#nav-links').classList.remove('active');
  $('#menu-toggle').setAttribute('aria-expanded','false');
  $('#menu-toggle').setAttribute('aria-label','메뉴 열기');
};
$('#menu-toggle').addEventListener('click', () => {
  const opened = $('#nav-links').classList.toggle('active');
  $('#menu-toggle').setAttribute('aria-expanded',String(opened));
  $('#menu-toggle').setAttribute('aria-label',opened ? '메뉴 닫기' : '메뉴 열기');
});
$$('#nav-links a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown',(event) => {if(event.key === 'Escape' && $('#nav-links').classList.contains('active')){closeMenu();$('#menu-toggle').focus();}});
const onScroll = () => {$('#header').classList.toggle('scrolled',window.scrollY >= 60);$('#back-top').hidden = window.scrollY < 300;};
window.addEventListener('scroll',onScroll,{passive:true});
onScroll();
$('#back-top').addEventListener('click', () => window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({isIntersecting,target}) => {if(isIntersecting){target.classList.add('visible');observer.unobserve(target);}});
  },{threshold:0.2});
  $$('.reveal').forEach((section) => observer.observe(section));
}
// 04. 외부 문자열은 escape 후 템플릿에 삽입: API 내용도 신뢰하지 않기
const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g,(char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const safeRepoURL = (value) => {try{const url = new URL(value);return url.protocol === 'https:' && url.hostname === 'github.com' ? url.href : '';}catch{return '';}};
const renderProjects = () => {
  const grid = $('#project-grid');
  const status = $('#project-status');
  grid.innerHTML = '';
  grid.setAttribute('aria-busy',String(state.status === 'loading'));
  $('#retry').hidden = state.status !== 'error';
  if(state.status === 'loading'){status.textContent='프로젝트를 불러오는 중…';return;}
  if(state.status === 'error'){status.textContent=`프로젝트를 불러올 수 없습니다. ${state.error}`;return;}
  const visible = state.repos.filter(({language}) => state.filter === 'all' || language === state.filter);
  if(!visible.length){status.textContent='표시할 프로젝트가 없습니다.';return;}
  status.textContent = '';
  grid.innerHTML = visible.map(({name,description,language,stargazers_count,html_url,symbol}) => {
    const url = safeRepoURL(html_url);
    return `<article class="project-card"><div class="project-visual" aria-hidden="true">${escapeHTML(symbol || '</>')}</div><div class="project-body"><div class="project-meta"><span>${escapeHTML(language || '기타')}</span><span>☆ ${Number(stargazers_count) || 0}</span></div><h3>${escapeHTML(name)}</h3><p>${escapeHTML(description || '아직 프로젝트 설명이 없습니다.')}</p>${url ? `<a class="project-link" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">저장소 보기 ↗</a>` : '<span class="project-link">학습용 가상 프로젝트</span>'}</div></article>`;
  }).join('');
};
// 05. GitHub API: 대기, HTTP 오류, 빈 결과, 성공을 구분
const cancelRequest = () => {requestVersion += 1;if(controller) controller.abort();};
const loadProjects = async () => {
  cancelRequest();
  const version = requestVersion;
  if(state.source === 'sample'){state.repos=samples;state.status='success';renderProjects();return;}
  state.status='loading';state.error='';renderProjects();
  controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(),12000);
  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}/repos?sort=updated&per_page=100`,{signal:controller.signal,headers:{Accept:'application/vnd.github+json'}});
    if(!response.ok) throw new Error(response.status === 403 || response.status === 429 ? '요청이 제한되었습니다. 잠시 후 다시 시도해 주세요.' : `서버 응답 코드: ${response.status}`);
    const data = await response.json();
    if(!Array.isArray(data)) throw new Error('예상하지 못한 데이터 형식입니다.');
    if(version !== requestVersion) return;
    state.repos = data;state.status = data.length ? 'success' : 'empty';
  } catch(error) {
    if(version !== requestVersion) return;
    state.status='error';state.error=error.name === 'AbortError' ? '응답 시간이 초과되었습니다.' : error.message;
  } finally {clearTimeout(timeout);if(version === requestVersion) renderProjects();}
};
$('#project-source').addEventListener('change',(event) => {
  state.source=event.target.value;
  $('#source-note').textContent=state.source === 'live' ? `GitHub 실제 연결 · ${GITHUB_USERNAME}의 최근 공개 저장소 최대 100개 (본인 계정이 아닌 공개 예시 계정)` : '아래 카드는 가상 프로젝트입니다. 실제 연결을 선택하면 octocat의 공개 저장소를 불러옵니다.';
  loadProjects();
});
$('#retry').addEventListener('click',loadProjects);
$$('[data-filter]').forEach((button) => button.addEventListener('click',() => {
  state.filter=button.dataset.filter;
  $$('[data-filter]').forEach((item) => item.setAttribute('aria-pressed',String(item === button)));
  renderProjects();
}));
$$('[data-demo]').forEach((button) => button.addEventListener('click',() => {
  cancelRequest();state.source='sample';$('#project-source').value='sample';state.status=button.dataset.demo;
  state.repos=state.status === 'empty' ? [] : samples;state.error='학습용으로 재현한 오류입니다.';
  $('#source-note').textContent='학습 실험실에서 재현한 가상 상태입니다. 실제 GitHub 응답이 아닙니다.';
  renderProjects();
}));
renderProjects();
// 06. 폼: 검증 결과를 상태에 저장한 다음 해당 필드 옆에 표시
const validate = (field) => {
  const value=field.value.trim();
  let error='';
  if(!value) error='필수 항목입니다. 내용을 입력해 주세요.';
  else if(field.type === 'email' && field.validity.typeMismatch) error='올바른 이메일 형식을 입력해 주세요.';
  state.errors[field.id]=error;
  $(`#${field.id}-error`).textContent=error;
  field.setAttribute('aria-invalid',String(Boolean(error)));
  return !error;
};
$$('#contact-form input, #contact-form textarea').forEach((field) => field.addEventListener('input',() => {validate(field);$('#form-status').textContent='';}));
$('#contact-form').addEventListener('submit',(event) => {
  event.preventDefault();
  const fields=Array.from($$('#contact-form input, #contact-form textarea'));
  const results=fields.map(validate);
  if(results.every(Boolean)) $('#form-status').textContent='입력 확인이 완료되었습니다! 학습용 폼이므로 실제 전송은 하지 않았습니다.';
  else {$('#form-status').textContent='표시된 입력 항목을 확인해 주세요.';fields.find((field) => state.errors[field.id]).focus();}
});
