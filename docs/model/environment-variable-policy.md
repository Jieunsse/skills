# 환경 변수 정책

## 기본 파일

```text
.env.example   Git에 포함하는 변수 목록과 예시
.env.local     로컬 전용 실제 값
```

`.env.example`에는 실제 비밀값을 넣지 않는다. `.env`, `.env.local`, `.env.*.local`은 Git에 포함하지 않고 `.env.example`만 예외로 포함한다.

## 공개값과 비밀값

브라우저에 전달되는 환경 변수는 비밀값이 아니다.

```text
Next.js       NEXT_PUBLIC_ 접두사 → 브라우저에 노출될 수 있음
Vite          VITE_ 접두사        → 브라우저에 노출될 수 있음
```

접두사가 붙은 변수에는 비밀번호, 서비스 키, 개인 토큰을 넣지 않는다. 비밀값은 백엔드나 서버 전용 실행 환경에서 관리한다.

Supabase를 프론트엔드에서 직접 사용할 때 공개 가능한 URL과 anon key는 Row Level Security를 전제로 한다. `SUPABASE_SERVICE_ROLE_KEY`는 백엔드·서버 전용이며 프론트엔드에 노출하지 않는다.

## 모노레포 위치

```text
project/
├── .env.example              # 여러 앱이 공유하는 경우에만
└── app/
    └── web/
        ├── .env.example
        └── .env.local
```

같은 변수를 루트와 `app/web`에 중복 선언하지 않는다.
