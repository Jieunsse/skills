# Monorepo: 환경 변수 배치

```text
project/
├── .env.example              # 루트 공통 변수, 필요한 경우에만
└── app/
    ├── web/
    │   ├── .env.example
    │   └── .env.local
    └── backend/
        └── ...
```

프론트엔드 전용 변수는 `app/web`에 둔다. 루트와 하위 앱에 같은 변수를 중복 선언하지 않는다.

모노레포의 Vercel Preview·Production 환경은 목적별 Supabase 프로젝트와 연결한다. Supabase 마이그레이션은 백엔드 또는 데이터베이스 운영 파이프라인에서 별도로 검증하고 적용한다.
