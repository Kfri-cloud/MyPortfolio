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

## 과제 필수 요구사항 대응

이 프로젝트는 AI/SW 기초 및 웹 기초·프론트엔드 과제의 필수 요구사항을 기준으로 구성했습니다.

### 페이지 구성

- `header`, `nav`, `main`, `section`, `article`, `footer` 시맨틱 태그 사용
- Hero, About, Skills, Projects, Contact, Footer 섹션 구성
- 네비게이션과 영역 이동 버튼으로 각 섹션 이동
- 모든 이미지에 `alt` 텍스트 제공
- 입력 요소와 `label` 연결

### 반응형 및 인터랙션

- 모바일, 태블릿, 데스크톱 화면에 대응하는 반응형 레이아웃
- 768px, 1024px 기준 미디어 쿼리 적용
- 모바일 메뉴와 스크롤 방향에 따른 상단바 표시/숨김
- 버튼과 카드 hover transition 적용
- 스크롤 300px 이후 맨 위로 이동 버튼 표시
- `IntersectionObserver`를 이용한 섹션 reveal 애니메이션

### JavaScript 기본기

- `defer`로 JavaScript 파일 연결
- `const`, `let` 사용
- `querySelector`, `querySelectorAll`로 DOM 선택
- `addEventListener`로 click, mouseenter, mouseleave, scroll, input, submit 처리
- `textContent`, `innerHTML`, `classList`로 화면 업데이트
- `event.preventDefault()`로 폼 기본 제출 동작 제어
- 배열 구조 분해, 템플릿 리터럴, 화살표 함수, `map`, `filter`, `forEach` 사용

### GitHub API 흐름

GitHub API 프로젝트 영역은 다음 상태를 구분해 처리합니다.

1. 로딩: API 요청 중 로딩 문구 표시
2. 성공: 저장소 목록을 카드로 변환해 표시
3. 빈 결과: 표시할 프로젝트가 없다는 안내 표시
4. 오류: 오류 문구와 다시 시도 버튼 표시

API 요청은 `fetch`와 `async/await`, `try/catch`를 사용하며, 요청 성공·실패에 따라 상태를 변경한 뒤 화면을 다시 렌더링합니다.

### 상태 관리 예시

```text
사용자 이벤트 → 상태 변경 → 화면 업데이트

다크모드 클릭 → theme 상태 변경 → 전체 색상 변경
GitHub API 요청 → loading/success/error 상태 변경 → Projects 갱신
폼 제출 → 입력 검증 상태 변경 → 오류 또는 성공 메시지 표시
```

### 배포 확인

- GitHub Pages로 배포할 수 있는 정적 HTML 프로젝트입니다.
- 배포 후에는 데스크톱·모바일 화면, 다크모드, 프로젝트 API, 폼 검증, 영역 이동을 확인해야 합니다.
- API 호출이 제한되거나 실패하는 경우에도 오류 상태가 화면에 표시되도록 구성합니다.

## 제출 정보

- 저장소: [Kfri-cloud/MyPortfolio](https://github.com/Kfri-cloud/MyPortfolio)
- 개인 GitHub: [kjhjeonghyeon](https://github.com/kjhjeonghyeon)

## 최종 평가 체크리스트

### 항목 1: 기능 동작

- [x] 브라우저 창 크기에 따른 모바일 레이아웃 변경
- [x] 다크/라이트 테마 전환 및 새로고침 후 유지
- [x] 햄버거 메뉴, 스크롤 애니메이션, 맨 위로 가기 버튼
- [x] GitHub API 로딩·성공·에러·빈 상태 구분
- [x] 필수 입력값 및 이메일 형식 오류 피드백

### 항목 2: 기본 구조

- [x] HTML, CSS, JavaScript 파일 분리
- [x] `header`, `nav`, `main`, `section`, `footer` 시맨틱 태그 사용
- [x] `:root` CSS 변수로 색상과 테마 관리
- [x] 인라인 `onclick` 대신 `addEventListener` 사용

### 항목 3: 코드 흐름

- [x] 이벤트 → 상태 변경 → 화면 업데이트 흐름 구현
- [x] `async/await`와 `try/catch`를 이용한 API 성공·실패 분기
- [x] `map`을 이용한 GitHub 데이터 카드 변환
- [x] Flexbox와 Grid를 목적에 따라 구분해 적용

### 항목 4: 설계 설명

- [x] 상태 객체를 사용해 여러 UI 상태를 한 곳에서 관리하는 구조
- [x] 작은 화면을 기준으로 확장하는 모바일 퍼스트 반응형 구조

### 항목 5: 보너스

- [x] 프로젝트 애니메이션 프레임 재생
- [x] 프로젝트 이미지 클릭 링크
- [x] 스킬 이미지 갤러리
- [x] GitHub 저장소 및 개인 GitHub 링크

## 평가 질문 답변 정리

### 항목 1 답변

- **반응형 레이아웃:** 작은 화면에서도 내용이 잘리지 않도록 기본 레이아웃을 유연하게 작성하고, 미디어 쿼리로 태블릿·데스크톱 스타일을 확장했습니다.
- **다크모드 유지:** 테마가 바뀔 때 `document.documentElement.dataset.theme`을 변경하고, 선택한 값을 `localStorage`에 저장합니다. 페이지가 다시 열리면 저장값을 읽어 같은 테마를 적용합니다.
- **인터랙션:** 메뉴 버튼은 `classList.toggle`, 스크롤 애니메이션은 `IntersectionObserver`, 맨 위로 가기 버튼은 `window.scrollTo`로 구현했습니다.
- **GitHub API 상태:** 요청 전에는 loading, 응답 성공 시 success, 저장소가 없으면 empty, 요청 실패 시 error 상태를 표시합니다.
- **폼 검증:** submit 이벤트에서 이름·이메일·메시지를 검사하고, 값이 없거나 이메일 형식이 틀리면 해당 필드 아래에 즉시 오류를 표시합니다.

### 항목 2 답변

- **파일 분리:** HTML은 구조, CSS는 표현과 반응형 레이아웃, JavaScript는 이벤트와 데이터 처리를 담당합니다. 역할을 나누면 수정과 유지보수가 쉬워집니다.
- **시맨틱 태그:** `header`는 상단 영역, `nav`는 이동 메뉴, `main`은 핵심 콘텐츠, `section`은 콘텐츠 묶음, `footer`는 하단 정보에 사용했습니다.
- **CSS 변수:** `:root`의 색상 변수를 사용하면 한 곳만 수정해 전체 테마 색상을 바꿀 수 있고, 다크모드에도 같은 변수를 재사용할 수 있습니다.
- **addEventListener:** HTML과 동작 코드를 분리할 수 있고, 하나의 요소에 여러 이벤트를 등록하거나 나중에 이벤트를 제거하기 쉽기 때문에 인라인 `onclick`보다 적합합니다.

### 항목 3 답변

- **이벤트 → 상태 → 화면:** 다크모드 버튼 클릭 이벤트가 발생하면 테마 상태를 `dark` 또는 `light`로 바꾸고, `data-theme` 변경을 통해 CSS가 화면 전체를 다시 표시합니다.
- **async/await와 try/catch:** `fetch` 요청을 `try` 안에서 기다리고, 응답 코드가 정상이 아니면 오류를 발생시켜 `catch`에서 오류 상태와 다시 시도 버튼을 표시합니다.
- **map을 이용한 카드 변환:** GitHub 응답 배열을 `map`으로 순회하면서 저장소 이름·설명·별 개수·주소를 HTML 카드 템플릿으로 변환합니다.
- **Flexbox와 Grid:** Flexbox는 메뉴와 한 방향 정렬에, Grid는 반복되는 프로젝트 카드와 스킬 이미지처럼 행·열 배치가 필요한 영역에 사용했습니다.

### 항목 4 답변

- **상태 객체:** 테마, 로딩, 성공, 오류처럼 서로 연관된 값을 하나의 상태 구조로 관리하면 값의 관계를 파악하기 쉽고 화면 업데이트 기준을 일관되게 유지할 수 있습니다.
- **모바일 퍼스트:** 작은 화면을 기본으로 작성하면 핵심 콘텐츠가 먼저 보장되고, 큰 화면에는 필요한 여백과 열 구조만 추가하면 되어 반응형 확장이 간단합니다.

### 항목 5 답변

- **보너스 기능:** 프레임 애니메이션, 프로젝트 이미지 링크, 스킬 이미지 갤러리, GitHub 링크를 추가해 기본 요구사항 이상의 상호작용을 구현했습니다.

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
