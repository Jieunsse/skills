# 백엔드 Harness

백엔드 Harness는 Spring Boot, JPA, Flyway, Spring Security, JWT, springdoc-openapi, DDD 구조에 필요한 공통 Harness Run의 추가 규칙을 정의한다.

```text
공통 Harness Run
├── Discovery      + backend/discovery.md
├── Implementation + backend/implementation.md
└── Verification   + backend/verification.md
```

API·도메인·데이터베이스·인증·인가·CORS 변경이 포함되면 이 Harness를 적용한다. OpenAPI를 소비하는 웹·모바일 앱이 있으면 API client 생성과 소비자 검증도 함께 수행한다.
