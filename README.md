# 김정현 포트폴리오

모델링, Unity, 메타버스 프로젝트를 소개하는 개인 포트폴리오 웹사이트입니다.

## 소개

안녕하세요. 김정현입니다. 3D 모델링을 다루고 Unity를 활용해 인터랙티브 콘텐츠를 제작하며, 가상 공간과 메타버스 프로젝트를 만들어 왔습니다.

## 프로젝트

- [모델링 프로젝트](https://sketchfab.com/kfri.2.kfri)
- [메타버스 프로젝트](https://www.youtube.com/playlist?list=PLAPu8wiIomjE)
- [Unity 프로젝트](https://www.youtube.com/playlist?list=PLRB0P_81BRHY)

## 주요 기능

- 반응형 포트폴리오 레이아웃
- 마우스 오버 시 프로젝트 애니메이션
- 프로젝트 이미지 및 링크 연결
- 스킬 이미지 갤러리
- 스크롤 방향에 따른 상단바 표시/숨김
- 다크모드 전환 및 설정 저장
- 소개, 스킬, 프로젝트, 연락처 섹션 이동

## 구현 포인트

### 사용자 경험

- 브라우저 폭이 줄어들면 콘텐츠와 이미지가 모바일 레이아웃으로 자연스럽게 변경됩니다.
- 상단바는 스크롤 방향에 따라 표시되며, 영역 이동 버튼으로 원하는 섹션에 바로 이동할 수 있습니다.
- 다크모드 버튼을 누르면 라이트/다크 테마가 전환되고, 선택한 테마는 `localStorage`에 저장되어 새로고침 후에도 유지됩니다.
- 프로젝트 캐릭터 이미지는 마우스를 올렸을 때 24개 프레임 애니메이션을 재생합니다.

### HTML / CSS / JavaScript 구조

- HTML, CSS, JavaScript를 각각 별도 파일로 분리해 역할을 구분했습니다.
- `header`, `nav`, `main`, `section`, `footer` 등 시맨틱 태그를 사용해 문서 구조와 영역의 역할을 명확하게 구성했습니다.
- CSS 변수(`:root`)로 배경, 글자, 테두리, 포인트 색상을 관리해 테마 변경과 색상 수정이 쉽도록 했습니다.
- 반복되는 요소는 `querySelectorAll`, `forEach`, `map` 등으로 처리해 동일한 로직을 재사용했습니다.
- 인라인 이벤트 속성 대신 `addEventListener`를 사용해 HTML 구조와 동작 로직을 분리했습니다.

### 비동기 데이터 처리

- GitHub API를 사용할 수 있는 프로젝트 영역을 고려해 `async/await`와 `try/catch` 기반의 성공·실패 흐름을 구성했습니다.
- 로딩, 성공, 빈 결과, 오류 상태를 구분해 사용자에게 현재 상태를 안내하도록 설계했습니다.
- 배열 메서드를 사용해 API 데이터를 프로젝트 카드 형태로 변환할 수 있도록 했습니다.

### 레이아웃 선택

- Flexbox는 상단바, 스킬 목록, 세로형 프로젝트 흐름처럼 한 방향 정렬이 필요한 영역에 사용했습니다.
- Grid는 스킬 이미지와 카드처럼 여러 열로 반복 배치되는 영역에 사용했습니다.
- 각 레이아웃은 화면 폭에 따라 열 수와 이미지 크기가 바뀌도록 반응형으로 구성했습니다.

## 평가 및 확인 항목

- [x] 반응형 레이아웃
- [x] 다크모드 전환 및 새로고침 후 상태 유지
- [x] 스크롤 방향에 따른 상단바 표시/숨김
- [x] 영역 이동 버튼과 프로젝트 링크
- [x] HTML, CSS, JavaScript 파일 분리
- [x] 시맨틱 HTML 태그 사용
- [x] CSS 변수 기반 색상 관리
- [x] `addEventListener` 기반 이벤트 처리
- [x] 상태 변화에 따른 화면 업데이트
- [x] Flexbox와 Grid를 목적에 맞게 사용

## 기술 스택

- HTML5
- CSS3
- JavaScript

## 실행 방법

1. 저장소를 클론합니다.

   ```bash
   git clone https://github.com/Kfri-cloud/MyPortfolio.git
   ```

2. `Script/main Script_test/index.html` 파일을 브라우저에서 엽니다.

## 폴더 구조

```text
MyPortfolio/
├─ Script/main Script_test/index.html
├─ css/style.css
├─ js/main.js
├─ js/theme.js
└─ images/
   ├─ meta/
   ├─ modeling/
   ├─ skill/
   └─ Unity/
```

## 연락처

- GitHub: [Kfri-cloud](https://github.com/Kfri-cloud)
