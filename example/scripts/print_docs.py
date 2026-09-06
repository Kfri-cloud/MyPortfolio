from playwright.sync_api import sync_playwright
from pathlib import Path
import json,fitz
ROOT=Path(__file__).resolve().parents[1]
names={'01-assignment':'01_과제내용파악.pdf','02-concepts':'02_개념4단계.pdf','03-practice':'03_실전개념적용.pdf'}
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless=True)
 page=browser.new_page()
 for stem,out in names.items():
  page.goto((ROOT/'docs-src'/f'{stem}.html').as_uri())
  page.evaluate('document.fonts.ready')
  # shrink tall screenshots only when necessary, preserving every line of prose.
  for section in page.locator('section.page').all():
   for attempt in range(8):
    overflow=section.evaluate('(s)=>{const f=s.querySelector(".foot").getBoundingClientRect().top;return Math.max(...Array.from(s.children).filter(x=>!x.classList.contains("foot")).map(x=>x.getBoundingClientRect().bottom))-f+14}')
    if overflow<=0:break
    imgs=section.locator('.figure img')
    if imgs.count():
     imgs.evaluate_all('(imgs)=>imgs.forEach(i=>{i.style.maxHeight=Math.max(90,i.getBoundingClientRect().height*.8)+"px";i.style.objectFit="contain"})')
    else:section.evaluate('(s)=>{s.style.fontSize="12px";s.querySelectorAll("td,th").forEach(x=>x.style.padding="7px 9px")}')
   if overflow>0:raise Exception(f'Overflow {stem}: {overflow}')
  page.pdf(path=str(ROOT/'deliverables'/out),print_background=True,prefer_css_page_size=True)
 browser.close()
for path in (ROOT/'deliverables').glob('*.pdf'):
 d=fitz.open(path)
 assert all(p.get_text().strip() for p in d)
 print(path.name, len(d),'pages',path.stat().st_size,'bytes')
 for i,p in enumerate(d):
  p.get_pixmap(matrix=fitz.Matrix(.8,.8)).save(ROOT/'deliverables/screenshots'/f'pdf-{path.name[:2]}-{i+1:02}.png')
