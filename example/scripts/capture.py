from playwright.sync_api import sync_playwright
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'deliverables/screenshots'
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless=True)
 page=browser.new_page(viewport={'width':1440,'height':1000},device_scale_factor=1)
 errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto((ROOT/'portfolio/index.html').as_uri())
 page.emulate_media(reduced_motion='reduce')
 page.screenshot(path=str(OUT/'01-desktop.png'),full_page=True)
 page.locator('#hero').screenshot(path=str(OUT/'02-hero.png'))
 page.locator('#about').screenshot(path=str(OUT/'03-about.png'))
 page.locator('#projects').screenshot(path=str(OUT/'04-projects.png'))
 page.locator('#contact-form button').click()
 page.locator('#contact').screenshot(path=str(OUT/'05-form-error.png'))
 assert page.locator('[aria-invalid="true"]').count()==3
 page.fill('#name','학습자');page.fill('#email','wrong');page.fill('#message','안녕하세요')
 page.locator('#contact-form button').click();assert page.locator('#email').get_attribute('aria-invalid')=='true'
 page.fill('#email','learner@example.com');page.locator('#contact-form button').click()
 assert '완료' in page.locator('#form-status').inner_text()
 page.locator('#contact').screenshot(path=str(OUT/'06-form-success.png'))
 page.locator('#theme-toggle').click();page.reload();assert page.locator('html').get_attribute('data-theme')=='dark'
 page.screenshot(path=str(OUT/'07-dark.png'),full_page=True)
 page.locator('#theme-toggle').click()
 page.locator('[data-filter="CSS"]').click();assert page.locator('.project-card').count()==1
 page.locator('[data-filter="all"]').click()
 page.locator('.lab summary').click()
 for status in ['loading','error','empty']:
  page.locator(f'[data-demo="{status}"]').click()
  page.locator('#projects').screenshot(path=str(OUT/f'08-{status}.png'))
 page.locator('[data-demo="success"]').click()
 # Mock API paths exercise actual fetch/HTTP handling, independently of demo buttons.
 page.route('https://api.github.com/**',lambda route:route.fulfill(status=403,body='{}',content_type='application/json'))
 page.select_option('#project-source','live');page.wait_for_function("document.querySelector('#project-status').textContent.includes('制限') || document.querySelector('#project-status').textContent.includes('제한')")
 assert page.locator('#retry').is_visible()
 page.unroute('https://api.github.com/**')
 page.route('https://api.github.com/**',lambda route:route.fulfill(status=200,body='[]',content_type='application/json'))
 page.locator('#retry').click();page.wait_for_function("document.querySelector('#project-status').textContent.includes('표시할')")
 page.unroute('https://api.github.com/**')
 payload=[{'name':'API test','description':'<img src=x onerror=alert(1)>','language':'HTML','html_url':'https://github.com/octocat/Hello-World','stargazers_count':1}]
 page.route('https://api.github.com/**',lambda route:route.fulfill(status=200,body=json.dumps(payload),content_type='application/json'))
 page.select_option('#project-source','sample');page.select_option('#project-source','live');page.wait_for_selector('.project-card')
 assert page.locator('.project-card h3').inner_text()=='API test'
 assert page.locator('.project-card img').count()==0
 page.unroute('https://api.github.com/**')
 page.select_option('#project-source','sample')
 sizes=[360,390,768,1024,1440]
 for width in sizes:
  page.set_viewport_size({'width':width,'height':900});page.evaluate('window.scrollTo(0,0)')
  assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'), f'overflow {width}'
  if width==390:
   page.screenshot(path=str(OUT/'09-mobile.png'),full_page=True)
   page.locator('#menu-toggle').click();assert page.locator('#nav-links').is_visible()
   page.screenshot(path=str(OUT/'10-mobile-menu.png'))
   page.keyboard.press('Escape');assert page.locator('#menu-toggle').get_attribute('aria-expanded')=='false'
  if width==768:page.screenshot(path=str(OUT/'11-tablet.png'))
 page.set_viewport_size({'width':1440,'height':1000})
 page.evaluate('window.scrollTo(0,500)');page.wait_for_timeout(100)
 assert page.locator('#back-top').is_visible();assert 'scrolled' in page.locator('#header').get_attribute('class')
 page.locator('#back-top').click();page.wait_for_function('window.scrollY === 0')
 # Real API connectivity: record success/error honestly; no credentials used.
 page.select_option('#project-source','live')
 page.wait_for_function("document.querySelector('#project-grid').getAttribute('aria-busy') === 'false'",timeout=16000)
 live={'cards':page.locator('.project-card').count(),'status':page.locator('#project-status').inner_text()}
 page.locator('#projects').evaluate("e => { e.style.maxHeight='650px'; e.style.overflow='hidden'; }")
 page.locator('#projects').screenshot(path=str(OUT/'12-live-api.png'))
 assert not errors,errors
 (ROOT/'deliverables/verification.json').write_text(json.dumps({'checks':'PASS','widths':sizes,'themePersistence':True,'formValidation':True,'menuAndScroll':True,'mockAPI':['403','empty','success','HTML escape'],'liveAPI':live,'javascriptErrors':errors},ensure_ascii=False,indent=2))
 browser.close()
