# Data Migration Pipeline

Data Migration Pipeline은 Flyway 또는 Supabase 마이그레이션을 안전하게 검증하고 환경별로 적용한다.

## 트리거

```text
src/main/resources/db/migration 변경
supabase/migrations 변경
```

## 입력

- 마이그레이션 파일
- 대상 데이터베이스와 환경
- 애플리케이션 호환성 계획
- 데이터 영향과 복구 계획

## 흐름

```text
마이그레이션 작성
→ 로컬 적용·검증
→ PR Validation
→ staging 또는 Preview 적용
→ 승인
→ Production 적용
→ 적용 결과 기록
```

## 규칙

- 스키마 변경은 마이그레이션 파일을 원본으로 관리한다.
- 적용된 마이그레이션 파일을 삭제·수정·재정렬하지 않는다.
- Production DB는 기본 브랜치 merge만으로 변경하지 않는다.
- 파괴적 변경은 expand → migrate → contract 단계로 분리한다.
- 롤백은 애플리케이션과 데이터베이스를 분리해서 판단한다.

## 출력

- 적용 환경과 마이그레이션 버전
- 적용·검증 결과
- 데이터 영향과 남은 위험
- 필요한 경우 Release and Deployment Pipeline으로 전달할 승인 결과

Flyway 상세 규칙은 백엔드 composition을, Supabase 상세 규칙은 [`supabase-migrations.md`](supabase-migrations.md)를 따른다.
