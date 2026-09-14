# Frontend-only: public web

## 목적

SEO 또는 공개 접근성이 중요한 웹서비스를 위한 단독 프론트엔드 구성이다.

```text
Next.js + TypeScript + Tailwind CSS
```

API·서버 데이터에는 TanStack Query, 전역 클라이언트 상태에는 Zustand, 외부 입력에는 Zod, 복잡한 폼에는 React Hook Form + Zod를 필요할 때만 추가한다.

복잡한 디자인 시스템이 핵심이면 Tailwind 대신 vanilla-extract를 선택한다.
