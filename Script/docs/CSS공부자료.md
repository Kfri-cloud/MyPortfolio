# 생활코딩 CSS 수업 정리

이 플레이리스트는 HTML 문서에 CSS를 적용해 글자, 색상, 여백, 배치, 반응형 화면 등을 만드는 기초부터 실전까지 다룹니다. 전체 흐름은 선택자 → 스타일 속성 → 상속·우선순위 → 레이아웃 → 그래픽·애니메이션 → 유지보수·라이브러리 순서입니다.

공식 수업 목록: <https://opentutorials.org/course/2418>

## 1. CSS란?

### 요점

- CSS는 HTML의 구조를 꾸미는 언어입니다.
- HTML이 내용과 구조를 담당한다면 CSS는 색상, 크기, 배치, 디자인을 담당합니다.
- CSS는 선택자와 선언으로 구성됩니다.

```css
선택자 {
  속성: 값;
}
```

### 예시

```css
h1 {
  color: blue;
  font-size: 32px;
}
```

```html
<h1>CSS 공부</h1>
```

### 예시 이미지

```text
HTML 구조                 CSS 적용 결과

<h1>CSS 공부</h1>   →      CSS 공부
                           파란색, 큰 글자
```

### 활용

- 웹 페이지 색상과 글꼴 변경
- 버튼 디자인
- 카드 UI 제작
- 포트폴리오 페이지 꾸미기

## 2. HTML과 CSS 연결하기

### 요점

CSS를 HTML에 적용하는 방법은 인라인 방식, `<style>` 태그 방식, 외부 CSS 파일 연결 방식이 있습니다. 실무에서는 여러 페이지에서 재사용할 수 있는 외부 CSS 방식을 주로 사용합니다.

### 예시

```html
<link rel="stylesheet" href="style.css">
```

```css
/* style.css */
body {
  background-color: #f5f5f5;
}
```

### 활용

- 여러 HTML 페이지의 디자인 통일
- CSS 파일 하나만 수정해 전체 사이트 변경
- HTML과 디자인 코드 분리

## 3. 선택자

### 요점

선택자는 어떤 HTML 요소에 스타일을 적용할지 정하는 문법입니다.

| 선택자 | 의미 | 예시 |
|---|---|---|
| `p` | 모든 p 태그 | `p { color: red; }` |
| `.menu` | menu 클래스 | `.menu { ... }` |
| `#header` | header 아이디 | `#header { ... }` |
| `div p` | div 안의 모든 p | `div p { ... }` |
| `div > p` | div의 직접 자식 p | `div > p { ... }` |
| `a:hover` | 마우스를 올린 링크 | `a:hover { ... }` |

### 예시

```html
<h1 id="title">제목</h1>
<p class="description">설명입니다.</p>
```

```css
#title {
  color: navy;
}

.description {
  color: gray;
}
```

### 핵심 우선순위

```text
아이디 선택자(#) > 클래스 선택자(.) > 태그 선택자
```

### 활용

- 특정 버튼만 꾸미기
- 메뉴 목록 스타일 지정
- 마우스를 올렸을 때 색상 변경
- 첫 번째 항목, 짝수 항목 등 선택

## 4. CSS 속성 공부 방법

### 요점

CSS 속성은 모두 외울 필요가 없습니다.

1. 원하는 효과를 말로 정합니다.
2. 검색 엔진이나 MDN에서 속성을 찾습니다.
3. 예제를 복사해 실행합니다.
4. 값을 바꾸며 결과를 확인합니다.

### 예시

“글자를 가운데 정렬하고 싶다” → `text-align`

```css
.title {
  text-align: center;
}
```

### 활용

- CSS 문법을 스스로 검색하는 능력 향상
- 새로운 속성 빠르게 적용
- 오류 원인 확인

## 5. 타이포그래피

### 요점

글자의 크기, 색상, 정렬, 굵기, 글꼴, 줄 간격을 조절합니다.

```css
body {
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}

h1 {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
}
```

### 주요 속성

- `font-size`: 글자 크기
- `font-family`: 글꼴
- `font-weight`: 굵기
- `line-height`: 줄 간격
- `color`: 글자 색상
- `text-align`: 정렬
- `text-decoration`: 밑줄 등 장식

### 활용

- 읽기 편한 본문 만들기
- 제목과 본문 구분
- 브랜드 분위기에 맞는 글꼴 적용
- 모바일 화면에서 글자 크기 조절

## 6. 상속과 캐스케이딩

### 상속

부모 요소의 스타일이 자식 요소에게 전달되는 현상입니다.

```css
body {
  color: #333;
  font-family: sans-serif;
}
```

### 캐스케이딩

여러 CSS 규칙이 충돌할 때 우선순위에 따라 최종 스타일이 결정됩니다.

```css
p {
  color: black;
}

.notice {
  color: red;
}

#special {
  color: blue;
}
```

```html
<p id="special" class="notice">중요한 내용</p>
```

결과는 `blue`입니다.

### 활용

- 공통 스타일은 부모 요소에 지정
- 예외적인 요소만 별도 클래스 지정
- CSS 충돌 문제 해결
- 유지보수하기 쉬운 스타일 작성

## 7. 박스 모델

### 요점

HTML 요소는 모두 사각형 박스로 취급됩니다.

```text
┌──────────────────────────────┐
│           margin             │
│  ┌────────────────────────┐  │
│  │        border          │  │
│  │  ┌──────────────────┐  │  │
│  │  │     padding      │  │  │
│  │  │     content      │  │  │
│  │  └──────────────────┘  │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

- `content`: 실제 내용
- `padding`: 내용과 테두리 사이 여백
- `border`: 테두리
- `margin`: 바깥쪽 여백

### 예시

```css
.card {
  width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  margin: 30px auto;
}
```

### `box-sizing`

```css
* {
  box-sizing: border-box;
}
```

`width` 안에 padding과 border를 포함시키므로 크기 계산이 쉬워집니다.

### 활용

- 카드와 버튼 크기 조절
- 요소 사이 간격 설정
- 콘텐츠 영역 구성
- 화면 중앙 정렬

## 8. 인라인과 블록 레벨

### 요점

- 블록 요소: 한 줄 전체를 차지합니다.
- 인라인 요소: 내용의 크기만큼 공간을 차지합니다.

```text
블록 요소
[        제목 전체 너비        ]

인라인 요소
문장 안의 [링크]와 [강조]
```

```css
.block {
  display: block;
}

.inline {
  display: inline;
}
```

### 활용

- 메뉴를 가로로 배치
- 특정 요소를 한 줄에 배치
- 레이아웃 구조 조정

## 9. 레이아웃

### 9-1. Position

요소의 위치를 직접 지정합니다.

```css
.box {
  position: relative;
  top: 20px;
  left: 30px;
}
```

주요 값은 `static`, `relative`, `absolute`, `fixed`, `sticky`입니다.

활용 예시는 상단 고정 메뉴, 화면 위에 떠 있는 버튼, 카드 안의 배지 배치입니다.

### 9-2. Flex

한 방향으로 요소를 정렬할 때 사용합니다.

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

주요 속성은 `flex-direction`, `justify-content`, `align-items`, `gap`, `flex-wrap`입니다.

활용 예시는 내비게이션, 버튼 그룹, 카드 목록, 가로·세로 중앙 정렬입니다.

### 9-3. Float

예전부터 사용되던 배치 방식으로, 이미지 주변에 글자가 흐르게 할 때 유용합니다.

```css
img {
  float: left;
  margin-right: 20px;
}
```

### 9-4. 다단 레이아웃

```css
.article {
  column-count: 2;
  column-gap: 40px;
}
```

긴 글을 신문처럼 여러 열로 나눌 수 있습니다.

## 10. 반응형 웹과 Media Query

### 요점

화면 크기에 따라 CSS를 다르게 적용하는 기술입니다.

```css
.container {
  width: 1000px;
}

@media (max-width: 600px) {
  .container {
    width: 100%;
    padding: 15px;
  }
}
```

```text
PC 화면:     [사이드바] [본문]

모바일 화면: [본문]
             [메뉴 버튼]
```

### 활용

- 스마트폰·태블릿·PC 대응
- 모바일에서 메뉴 구조 변경
- 화면이 작아지면 글자와 여백 축소
- 반응형 포트폴리오 제작

## 11. 배경과 그래픽

### 배경

```css
.hero {
  background-color: #222;
  background-image: url("banner.jpg");
  background-size: cover;
  background-position: center;
}
```

### 필터와 변형

```css
.image {
  filter: grayscale(100%);
}

.card:hover {
  transform: scale(1.05);
}
```

SVG는 확대해도 깨지지 않는 벡터 이미지로, 로고·아이콘·배경 이미지에 활용할 수 있습니다.

## 12. 전환 효과

CSS 속성이 갑자기 바뀌지 않고 부드럽게 바뀌도록 합니다.

```css
.button {
  background: royalblue;
  transition: background 0.3s, transform 0.3s;
}

.button:hover {
  background: navy;
  transform: translateY(-3px);
}
```

### 활용

- 버튼 마우스 오버 효과
- 카드 확대
- 메뉴 색상 변화
- 모달과 알림창의 자연스러운 등장

## 13. CSS 유지보수

### 요점

CSS가 커질수록 재사용과 관리가 중요합니다.

```html
<link rel="stylesheet" href="style.css">
```

코드 경량화는 불필요한 공백과 주석을 제거해 파일 크기를 줄이는 방식입니다. Sass, Less 같은 CSS 전처리기를 사용하면 변수, 중첩, 함수 등을 활용할 수 있습니다.

```scss
$main-color: #3498db;

.button {
  background: $main-color;

  &:hover {
    background: darken($main-color, 10%);
  }
}
```

### 활용

- 여러 페이지에서 스타일 재사용
- 디자인 변경 시 수정 범위 축소
- 대규모 프로젝트 관리
- 웹 페이지 로딩 속도 개선

## 14. CSS 라이브러리

이미 만들어진 CSS 스타일이나 컴포넌트를 활용하면 개발 시간을 줄일 수 있습니다.

- Fontello: 아이콘
- Buttons: 버튼 스타일
- Semantic UI: UI 컴포넌트

### 활용

- 빠른 프로토타입 제작
- 버튼·메뉴·카드 디자인
- 공통 UI 구성
- 프로젝트 초기 개발 속도 향상

# 핵심 요약

```text
HTML       → 웹 페이지의 구조
CSS        → 웹 페이지의 디자인
선택자     → 어떤 요소를 꾸밀지 결정
속성       → 어떻게 꾸밀지 결정
박스 모델  → 크기와 여백 계산
Flex       → 한 방향 레이아웃
Position   → 위치 조정
Media Query→ 화면 크기별 디자인
Transition → 부드러운 움직임
상속/우선순위 → CSS 충돌 해결
```

# 종합 예시

```html
<div class="card">
  <h2>CSS 학습</h2>
  <p>웹 페이지를 아름답게 꾸미는 방법을 배웁니다.</p>
  <a href="#">자세히 보기</a>
</div>
```

```css
* {
  box-sizing: border-box;
}

.card {
  width: 320px;
  padding: 24px;
  margin: 30px auto;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: white;
  box-shadow: 0 5px 20px rgb(0 0 0 / 10%);
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card h2 {
  color: #222;
}

.card p {
  line-height: 1.6;
  color: #666;
}

.card a {
  color: royalblue;
  text-decoration: none;
}

@media (max-width: 600px) {
  .card {
    width: calc(100% - 30px);
  }
}
```

이 예시에는 선택자, 박스 모델, 타이포그래피, 색상, 그림자, `hover`, `transition`, 반응형 디자인이 함께 사용되었습니다.

실습 예제: <https://github.com/egoing/codingeverybody_css>
