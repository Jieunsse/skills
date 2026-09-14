# Frontend-only: SPA

## 목적

관리자, 대시보드, 내부 업무 도구처럼 SEO와 서버 렌더링이 중요하지 않은 클라이언트 중심 애플리케이션을 위한 구성이다.

```text
React + Vite + TypeScript + Tailwind CSS
```

API·서버 데이터에는 TanStack Query, 전역 클라이언트 상태에는 Zustand, 외부 입력에는 Zod, 복잡한 폼에는 React Hook Form + Zod를 필요할 때만 추가한다.

복잡한 디자인 시스템이 핵심이면 Tailwind 대신 vanilla-extract를 선택한다.
