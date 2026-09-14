# Vercel + Supabase

Vercel과 Supabase를 조합하는 배포 프로파일이다.

문서화할 항목:

- 웹 애플리케이션 배포 대상
- Supabase 프로젝트와 환경 구분
- 환경 변수와 비밀 정보
- 데이터베이스 마이그레이션 순서
- Preview·Staging·Production 흐름
- 배포 후 검증과 롤백

환경 규칙:

```text
Development  로컬 또는 개발용 Supabase
Preview      Preview용 Supabase
Production   Production용 Supabase
```

Vercel 환경 변수는 환경별로 분리하고, Production과 Preview에서 같은 데이터베이스를 기본값으로 공유하지 않는다. `SUPABASE_SERVICE_ROLE_KEY`는 프론트엔드에 노출하지 않는다. 상세 환경 변수 정책은 [`docs/model/environment-variable-policy.md`](../../model/environment-variable-policy.md), 마이그레이션 규칙은 [`supabase-migrations.md`](supabase-migrations.md)를 따른다.
