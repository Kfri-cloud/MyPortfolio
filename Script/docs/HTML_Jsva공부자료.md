# 생활코딩 HTML 강의 검증 노트

> 검토일: 2026-09-17
>
> 대상: 생활코딩 HTML 재생목록의 HTML 관련 강의 13편
>
> 판정: 핵심 개념은 대체로 정확합니다. 다만 오래된 강의인 만큼 현재 HTML 표준과 실무 관점에서 보정할 부분을 반영했습니다.

## 먼저 알아둘 보정 사항

- `<br />`처럼 닫는 슬래시를 써도 브라우저에서는 동작하지만, HTML에서 `br`, `img`, `input`은 종료 태그가 없는 **빈 요소(void element)**입니다. 슬래시는 아무 효과가 없으므로 `<br>`처럼 쓰면 됩니다.
- `/images/logo.png`는 완전한 절대 URL이 아니라 현재 출처(origin)의 루트를 기준으로 해석되는 **상대 URL**입니다. 완전한 절대 URL은 `https://example.com/images/logo.png`처럼 스킴과 호스트를 포함합니다.
- 이미지의 화면 크기와 반응형 배치는 CSS로 제어하되, `width`와 `height` 속성은 브라우저가 표시 비율을 미리 계산해 레이아웃 이동을 줄일 수 있으므로 함께 쓰는 편이 좋습니다.
- `<table border="1">` 같은 표현용 속성은 오래된 방식입니다. 표의 의미 구조는 HTML로, 테두리·간격·색상은 CSS로 지정합니다.
- `<frame>`과 `<frameset>`은 현재 표준에서 폐기된 요소입니다. 새 문서에서는 사용하지 않습니다.
- `placeholder`는 입력 예시나 힌트일 뿐 `<label>`을 대체하지 않습니다.
- 파일 입력의 `accept`는 선택 UI에 주는 힌트이며 보안 검증이 아닙니다. 서버에서 파일 형식·크기·내용을 반드시 다시 검사해야 합니다.
- 현대 HTML에서는 `target="_blank"`가 사실상 `noopener` 동작을 내포합니다. `rel="noopener"`를 명시하면 의도와 구형 환경 대응을 더 분명히 할 수 있습니다.

---

## 1. HTML이란 무엇인가

### 요점

HTML(HyperText Markup Language)은 웹 문서의 **내용과 의미 구조**를 표현하는 마크업 언어입니다. 제목, 문단, 링크, 이미지, 표, 입력 양식처럼 각 콘텐츠가 무엇인지 요소(element)로 표시합니다.

### 예시

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>나의 첫 문서</title>
  </head>
  <body>
    <h1>안녕하세요</h1>
    <p>HTML로 의미 있는 문서 구조를 만듭니다.</p>
  </body>
</html>
```

### 조금 자세히

- HTML은 구조와 의미를 담당합니다.
- CSS는 모양과 배치를 담당합니다.
- JavaScript는 상호작용과 동적인 동작을 담당합니다.
- `<!doctype html>`은 브라우저가 표준 모드로 문서를 해석하도록 하는 필수 전처리 문자열입니다.
- `lang="ko"`는 문서의 주 언어를 보조 기술과 검색 엔진에 알립니다.

### 활용 방도

블로그 글, 포트폴리오, 상품 상세 페이지, 웹 애플리케이션 화면 등 브라우저에 표시되는 거의 모든 웹 콘텐츠의 뼈대로 사용합니다.

## 2. 링크

### 요점

`a` 요소는 다른 문서, 같은 문서의 위치, 파일, 이메일 주소 등으로 이동하는 하이퍼링크를 만듭니다. 실제 목적지는 `href` 속성에 씁니다.

### 예시

```html
<a href="https://example.com/guide">가이드 읽기</a>
<a href="/about">소개 페이지</a>
<a href="#contact">연락처로 이동</a>
<a href="https://example.com" target="_blank" rel="noopener">새 탭에서 열기</a>
```

### 조금 자세히

- 링크 문구는 “여기 클릭”보다 목적을 설명하는 문장이 좋습니다.
- `target="_blank"`는 새 탭이나 새 창 같은 새 브라우징 컨텍스트를 요청합니다. 실제 표시 방식은 브라우저와 사용자 설정에 따라 달라질 수 있습니다.
- 현재 HTML 표준에서 `_blank`는 암묵적으로 `noopener`와 같은 보호를 적용합니다. 명시적인 `rel="noopener"`도 유효하며 의도를 분명히 합니다.

### 활용 방도

사이트 내비게이션, 문서 목차, 출처 연결, 다운로드 링크, 이메일·전화 연결 등에 사용합니다.

## 3. 문단, 줄바꿈, 공백

### 요점

문단은 `p`, 내용상 필요한 줄바꿈은 `br`로 표현합니다. 화면상의 간격은 CSS의 `margin`, `padding`, `gap`으로 조절합니다.

### 예시

```html
<p>첫 번째 문단입니다.</p>
<p>두 번째 문단입니다.</p>

<address>
  서울특별시 중구 세종대로 110<br>
  시민청 1층
</address>
```

```css
p + p {
  margin-top: 1rem;
}
```

### 조금 자세히

- HTML 소스의 연속 공백과 일반 줄바꿈은 보통 하나의 공백으로 합쳐집니다.
- `br`은 시나 주소처럼 **줄 구분 자체가 내용인 경우**에 씁니다. 빈 줄을 만들거나 문단을 나누는 용도가 아닙니다.
- `&nbsp;`는 줄바꿈되지 않는 공백입니다. 단어나 숫자 묶음이 줄 끝에서 갈라지면 안 될 때 제한적으로 쓰며, 들여쓰기나 배치에는 사용하지 않습니다.

### 활용 방도

기사 본문, 설명문, 주소, 시, 가사처럼 텍스트 의미 구조를 표현할 때 사용합니다.

## 4. 이미지

### 요점

`img` 요소는 이미지를 문서에 삽입합니다. `src`는 이미지 주소, `alt`는 이미지를 보지 못할 때 전달할 대체 텍스트입니다.

### 예시

```html
<img
  src="/images/team.jpg"
  alt="회의실에서 제품 화면을 검토하는 개발팀"
  width="1200"
  height="800"
>
```

장식용 이미지라면 다음처럼 빈 대체 텍스트를 씁니다.

```html
<img src="/images/divider.svg" alt="" width="320" height="16">
```

```css
img {
  max-width: 100%;
  height: auto;
}
```

### 조금 자세히

- 정보성 이미지의 `alt`는 이미지의 외형을 기계적으로 나열하기보다 문맥상 같은 정보를 전달해야 합니다.
- 장식뿐인 이미지는 `alt=""`로 보조 기술이 건너뛰게 합니다.
- `width`와 `height`는 고유 비율을 미리 알려 레이아웃 이동을 줄이는 데 도움이 됩니다. 실제 반응형 크기는 CSS로 조절할 수 있습니다.
- 이미지가 링크라면 대체 텍스트는 링크의 목적도 설명해야 합니다.

### 활용 방도

제품 사진, 인물 사진, 도표, 로고, 썸네일을 넣고, `picture`와 `srcset`을 이용해 화면 크기나 해상도에 맞는 이미지를 제공할 수 있습니다.

## 5. 표

### 요점

표는 행과 열의 관계가 있는 **표 형식 데이터**를 표현합니다. 페이지 레이아웃을 만들기 위해 사용하면 안 됩니다.

### 예시

```html
<table>
  <caption>2026년 분기별 매출</caption>
  <thead>
    <tr>
      <th scope="col">분기</th>
      <th scope="col">매출</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1분기</th>
      <td>1억 원</td>
    </tr>
  </tbody>
</table>
```

### 조금 자세히

- `caption`은 표의 제목이나 목적을 설명합니다.
- `th`는 머리글 셀, `td`는 데이터 셀입니다.
- `scope="col"`과 `scope="row"`는 머리글이 어느 셀들과 관계있는지 명확하게 합니다.
- `thead`, `tbody`, `tfoot`은 표의 구역을 구분합니다.
- `border`, `cellpadding`, `cellspacing` 같은 표현용 속성 대신 CSS를 사용합니다.

### 활용 방도

가격표, 시간표, 비교표, 통계처럼 여러 항목을 공통 기준으로 비교할 때 적합합니다.

## 6. 목록

### 요점

순서가 중요한 목록은 `ol`, 순서가 중요하지 않은 목록은 `ul`, 각 항목은 `li`로 표현합니다. 용어와 설명의 짝은 `dl`, `dt`, `dd`를 사용합니다.

### 예시

```html
<h2>설치 순서</h2>
<ol>
  <li>파일을 내려받습니다.</li>
  <li>압축을 풉니다.</li>
  <li>설치 프로그램을 실행합니다.</li>
</ol>

<h2>주요 기능</h2>
<ul>
  <li>검색</li>
  <li>즐겨찾기</li>
</ul>
```

### 조금 자세히

목록 요소는 단순히 글머리표 모양을 내기 위한 도구가 아니라 항목들의 관계를 나타냅니다. 메뉴도 항목의 집합이므로 흔히 `nav` 안의 `ul`로 구성합니다.

### 활용 방도

절차, 목차, 메뉴, 체크리스트, 기능 목록, 용어집을 의미 있게 구조화할 수 있습니다.

## 7. 프레임

### 요점

과거의 `<frameset>`과 `<frame>`은 한 창을 여러 문서 영역으로 나눴지만 현재는 **폐기된 비준수 요소**입니다.

### 현대적인 대안

- 일반 화면 배치: CSS Grid 또는 Flexbox
- 공통 메뉴와 본문: 서버 템플릿, 정적 사이트 생성기, 프론트엔드 컴포넌트
- 다른 문서나 서비스를 제한적으로 삽입: `iframe`

### 활용 방도

기존 사이트를 유지보수할 때는 프레임 구조를 이해해야 할 수 있지만, 새 프로젝트에서는 사용하지 않습니다.

## 8. URL 1 — 구조와 종류

### 요점

URL은 웹의 자원을 식별하는 주소입니다. 흔한 HTTP(S) URL은 스킴, 호스트, 포트, 경로, 쿼리, 프래그먼트로 구성됩니다.

```text
https://example.com:443/products/item?id=42#reviews
└─스킴─┘ └──호스트──┘ 포트 └────경로────┘ └쿼리┘ └프래그먼트┘
```

### 예시와 구분

```html
<!-- 절대 URL: 스킴과 호스트를 포함 -->
<a href="https://example.com/about">회사 소개</a>

<!-- 출처의 루트 기준 상대 URL -->
<a href="/about">회사 소개</a>

<!-- 현재 문서 경로 기준 상대 URL -->
<a href="../about">회사 소개</a>
```

### 조금 자세히

- `/about`은 흔히 “루트 상대 경로”라고 부르지만 URL 표준상 기반 URL을 필요로 하는 상대 URL입니다.
- `?id=42` 같은 쿼리는 서버나 클라이언트가 해석하는 추가 데이터입니다. 반드시 질문의 의미이거나 서버로만 전달되는 것은 아닙니다.
- `#reviews` 같은 프래그먼트는 문서 안 위치뿐 아니라 자원의 부차적 부분이나 클라이언트 상태를 가리킬 수도 있으며, 일반적으로 HTTP 요청 본문에는 포함되지 않습니다.

### 활용 방도

사이트 내부 링크는 상대 URL로 배포 환경 변화에 유연하게 만들고, 외부 자원은 절대 URL로 명확하게 연결할 수 있습니다.

## 9. URL 2 — 안전한 작성과 인코딩

### 요점

URL의 각 부분에는 문법상 특별한 문자가 있으므로 사용자 입력을 그대로 문자열에 이어 붙이지 말고, 사용하는 언어의 URL API로 구성하고 인코딩해야 합니다.

### 예시

```js
const url = new URL("https://example.com/search");
url.searchParams.set("q", "HTML 기초");
console.log(url.href);
// https://example.com/search?q=HTML+%EA%B8%B0%EC%B4%88
```

### 조금 자세히

- 퍼센트 인코딩은 URL 문법에서 그대로 쓸 수 없는 바이트를 `%HH` 형태로 표현합니다.
- 전체 URL, 경로 조각, 쿼리 값은 인코딩 규칙이 서로 다르므로 무조건 같은 함수로 처리하면 오류가 생길 수 있습니다.
- 링크를 만들 때는 신뢰할 수 없는 값이 `javascript:` 같은 위험한 스킴이 되지 않는지 확인합니다.

### 활용 방도

검색 조건, 필터, 페이지 번호, 공유 가능한 화면 상태를 URL에 담을 때 사용합니다.

## 10. 텍스트 입력

### 요점

사용자 입력은 `form` 안의 `input`, `textarea`, `button` 등으로 받습니다. 서버에 제출되는 이름은 `name` 속성으로 정합니다.

### 예시

```html
<form action="/search" method="get">
  <label for="query">검색어</label>
  <input id="query" name="q" type="search" required>
  <button type="submit">검색</button>
</form>
```

### 조금 자세히

- `label`의 `for` 값과 입력 요소의 `id`를 연결하면 글자를 눌러도 입력란에 초점이 가고 접근성이 좋아집니다.
- `placeholder`는 입력 예시일 뿐 이름표가 아니므로 `label`을 생략하는 근거가 되지 않습니다.
- `GET`은 조회처럼 안전하고 공유 가능한 요청에, `POST`는 상태 변경이나 큰 데이터 전송에 흔히 사용합니다. 다만 최종 의미는 서버의 구현이 결정합니다.
- 브라우저 검증은 사용성을 돕지만 우회할 수 있으므로 서버에서도 검증해야 합니다.

### 활용 방도

검색창, 로그인, 회원가입, 문의 폼, 댓글 입력에 사용합니다.

## 11. 선택 입력

### 요점

하나 또는 여러 선택지를 받는 대표 요소는 `select`, 라디오 버튼, 체크박스입니다.

### 예시

```html
<fieldset>
  <legend>배송 방법</legend>
  <label><input type="radio" name="delivery" value="standard" checked> 일반 배송</label>
  <label><input type="radio" name="delivery" value="express"> 빠른 배송</label>
</fieldset>

<label for="city">도시</label>
<select id="city" name="city">
  <option value="seoul">서울</option>
  <option value="busan">부산</option>
</select>

<label><input type="checkbox" name="topics" value="html"> HTML 소식 받기</label>
```

### 조금 자세히

- 같은 `name`을 가진 라디오 버튼은 하나의 그룹이 되어 한 항목만 선택됩니다.
- 체크박스는 여러 항목을 독립적으로 선택할 때 적합합니다.
- 관련 선택지는 `fieldset`으로 묶고 `legend`로 그룹의 질문을 제공합니다.
- 서버에는 일반적으로 선택된 컨트롤의 `name=value`만 제출됩니다.

### 활용 방도

배송 방법, 설문 응답, 약관 동의, 카테고리와 정렬 조건 선택에 사용합니다.

## 12. 파일 업로드

### 요점

파일은 `input type="file"`로 선택합니다. 일반적인 폼 업로드에는 `method="post"`와 `enctype="multipart/form-data"`가 필요합니다.

### 예시

```html
<form action="/profile/photo" method="post" enctype="multipart/form-data">
  <label for="photo">프로필 사진</label>
  <input id="photo" name="photo" type="file" accept="image/png,image/jpeg" required>
  <button type="submit">업로드</button>
</form>
```

### 조금 자세히

- `accept`는 파일 선택 창에 선호 형식을 알려주는 힌트이며 다른 파일 제출을 완전히 막는 보안 장치가 아닙니다.
- 서버에서 확장자만 믿지 말고 실제 형식, 크기, 파일명, 저장 위치, 악성 콘텐츠를 검증해야 합니다.
- 업로드 파일은 실행 가능한 공개 디렉터리와 분리하고, 충돌하지 않는 서버 측 이름으로 저장하는 것이 안전합니다.
- 여러 파일을 받으려면 `multiple` 속성을 사용할 수 있습니다.

### 활용 방도

프로필 사진, 첨부 문서, 과제, 상품 이미지 업로드에 사용합니다.

## 13. iframe

### 요점

`iframe`은 현재 문서 안에 별도의 중첩 브라우징 컨텍스트를 삽입합니다. 지도, 동영상, 결제 위젯처럼 외부 콘텐츠를 제한적으로 넣을 때 사용합니다.

### 예시

```html
<iframe
  src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
  title="HTML 강의 영상"
  width="560"
  height="315"
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin"
  allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
  allowfullscreen
></iframe>
```

신뢰하지 않는 자체 콘텐츠를 삽입한다면 필요한 권한만 허용하도록 `sandbox`를 검토합니다.

```html
<iframe
  src="/preview/user-content"
  title="사용자 문서 미리보기"
  sandbox
></iframe>
```

### 조금 자세히

- `title`은 iframe의 목적을 설명해 스크린 리더 사용자가 내용을 구분하도록 돕습니다.
- `sandbox`는 스크립트, 폼 제출, 팝업, 동일 출처 취급 등 여러 기능을 기본적으로 제한하고 필요한 권한만 `allow-*` 토큰으로 되돌립니다.
- 같은 출처의 신뢰하지 않는 콘텐츠에 `allow-scripts`와 `allow-same-origin`을 함께 주면 샌드박스가 사실상 무력화될 수 있어 피해야 합니다.
- 외부 사이트는 CSP의 `frame-ancestors` 또는 `X-Frame-Options` 정책으로 삽입을 막을 수 있습니다.
- iframe은 별도 문서와 자원을 불러오므로 성능과 개인정보 보호 비용도 고려해야 합니다.

### 활용 방도

동영상, 지도, 문서 미리보기, 외부 위젯처럼 독립된 콘텐츠를 페이지 일부에 포함할 때 사용합니다.

---

## 전체 활용 예시

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>HTML 학습 기록</title>
  </head>
  <body>
    <header>
      <h1>HTML 학습 기록</h1>
      <nav aria-label="주요 메뉴">
        <ul>
          <li><a href="#notes">학습 노트</a></li>
          <li><a href="#feedback">의견 보내기</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <article id="notes">
        <h2>오늘 배운 내용</h2>
        <p>HTML은 콘텐츠의 의미와 구조를 표현합니다.</p>
        <img
          src="/images/html-notes.png"
          alt="제목, 문단, 링크 요소의 관계를 그린 HTML 노트"
          width="800"
          height="450"
        >
      </article>

      <section id="feedback">
        <h2>의견 보내기</h2>
        <form action="/feedback" method="post">
          <label for="message">의견</label>
          <textarea id="message" name="message" required></textarea>
          <button type="submit">보내기</button>
        </form>
      </section>
    </main>
  </body>
</html>
```

## 검증 결론

강의가 설명하는 HTML의 기본 목적과 요소 사용법은 입문 학습에 유효합니다. 다만 프레임 같은 폐기 기술, 표현용 HTML 속성, URL 용어, 접근성, 업로드 보안은 현재 표준과 실무 기준으로 보완해서 학습해야 합니다. 위 내용은 그러한 보정을 반영한 현대적인 학습 노트입니다.

## 공식 참고 자료

- [WHATWG HTML Living Standard](https://html.spec.whatwg.org/)
- [HTML 구문과 빈 요소](https://html.spec.whatwg.org/multipage/syntax.html#void-elements)
- [링크](https://html.spec.whatwg.org/multipage/links.html)
- [이미지와 대체 텍스트](https://html.spec.whatwg.org/multipage/embedded-content.html#the-img-element)
- [표](https://html.spec.whatwg.org/multipage/tables.html)
- [폼 컨트롤](https://html.spec.whatwg.org/multipage/forms.html)
- [iframe](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-iframe-element)
- [폐기된 요소와 속성](https://html.spec.whatwg.org/multipage/obsolete.html)
- [WHATWG URL Standard](https://url.spec.whatwg.org/)
