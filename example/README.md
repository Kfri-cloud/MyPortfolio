# 웹 기초 과제 · 예시와 학습 자료

요청한 산출물 4종:

1. `portfolio/index.html` — 포트폴리오 예시 웹 (브라우저로 열기)
-실제경로: /Users/kfri.2.kfri3714/MyPortfolio/portfolio/index.html
2. `deliverables/01_과제내용파악.pdf` — 과제 설명과 요구사항 대조 (5쪽)
3. `deliverables/02_개념4단계.pdf` — 개념 정의·적용·실험 (6쪽)
4. `deliverables/03_실전개념적용.pdf` — 실제 화면 캡처와 코드 연결 (9쪽)

가상 인물과 가상 프로젝트를 사용한 예시이며 실제 GitHub 연결은 octocat 공개 예시 계정을 사용합니다. 공개 배포하지 않았고 문의 메시지를 전송하지 않습니다.

원문은 `../mission/`, 웹 실행 안내는 `portfolio/README.md`, 캡처와 검증 기록은 `deliverables/`에 있습니다. `docs-src/`는 PDF 편집용 HTML 원고입니다.

제작 재현 도구: Python venv에 pymupdf와 playwright를 설치하고 macOS Chrome으로 `scripts/capture.py`, `scripts/build_docs.py`, `scripts/print_docs.py` 순서로 실행합니다. 웹 사용에는 Python이나 이 도구가 필요하지 않습니다.

경로는 이 example 폴더 기준입니다. 루트의 가상환경을 이용할 때는 작업 폴더 루트에서 `.venv/bin/python example/scripts/capture.py`와 같은 형식으로 실행하세요.
