# Frontend-only: 환경 변수 배치

```text
project/
├── .env.example
├── .env.local
└── ...
```

`.env.example`은 커밋하고 `.env.local`은 커밋하지 않는다. Next.js는 `NEXT_PUBLIC_`, React + Vite는 `VITE_` 접두사로 브라우저 공개값을 구분한다.

Vercel을 사용하는 경우 Development·Preview·Production 환경 변수를 각각 관리한다. 비밀값은 Vercel 설정에 저장하고 소스와 `.env.example`에는 기록하지 않는다.
