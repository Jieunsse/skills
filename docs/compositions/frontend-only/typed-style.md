# Frontend-only: typed styles

디자인 시스템이나 컴포넌트 라이브러리처럼 타입 중심 스타일 계약이 중요한 경우의 변형이다.

```text
Next.js 또는 React + Vite
TypeScript
vanilla-extract
```

프레임워크는 공개 웹이면 Next.js, SPA면 React + Vite를 선택한다. 상태·데이터·검증·폼 도구는 실제 기능이 필요할 때만 추가한다.

HTTP 클라이언트가 필요하면 Axios와 실행 환경별 adapter를 [`frontend-http-client.md`](../../model/frontend-http-client.md) 기준으로 선택한다.
