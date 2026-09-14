# Vercel + Supabase

Vercel과 Supabase를 조합하는 배포 프로파일이다.

문서화할 항목:

- 웹 애플리케이션 배포 대상
- Supabase 프로젝트와 환경 구분
- 환경 변수와 비밀 정보
- 데이터베이스 마이그레이션 순서
- Development·Preview·Production 흐름
- 배포 후 검증과 롤백

환경 규칙:

```text
Development  로컬 또는 개발용 Supabase
Preview      Preview용 Supabase
Production   Production용 Supabase
```

Vercel 환경 변수는 환경별로 분리하고, Production과 Preview에서 같은 데이터베이스를 기본값으로 공유하지 않는다. `SUPABASE_SERVICE_ROLE_KEY`는 프론트엔드에 노출하지 않는다. Staging은 별도 Vercel 프로젝트나 브랜치 규칙이 필요한 경우에만 추가한다. 상세 환경 변수 정책은 [`docs/model/environment-variable-policy.md`](../../model/environment-variable-policy.md), 마이그레이션 규칙은 [`supabase-migrations.md`](supabase-migrations.md)를 따른다.

## 배포 트리거

Vercel Git 연동을 사용하는 경우 PR open·synchronize는 Preview 배포를 시작한다. Production 데이터베이스 마이그레이션이 없는 변경은 기본 브랜치 merge로 Production 배포할 수 있다. 마이그레이션이 있는 변경은 승인된 release 절차에서 마이그레이션을 먼저 적용한 뒤 Production 배포를 시작한다. Git 연동이 구성되지 않았다면 이 흐름은 수동 배포 절차로 취급한다.
