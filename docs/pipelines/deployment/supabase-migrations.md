# Supabase 마이그레이션

## 원본

Supabase 스키마 변경의 원본은 Git에 저장된 마이그레이션 파일이다.

```text
supabase/
├── migrations/
└── seed.sql
```

## 규칙

- 모든 스키마 변경은 마이그레이션 파일로 만든다.
- 원격 Production DB를 Dashboard에서 직접 수정하지 않는다.
- 로컬 DB에서 마이그레이션을 검증한다.
- 마이그레이션 파일을 Git에 커밋한다.
- Preview와 Production Supabase 프로젝트를 분리한다.
- Staging은 별도 검증 환경이 필요한 경우에만 추가한다.
- Production 적용은 CI/CD 또는 승인된 배포 절차로 수행한다.
- Seed 데이터는 환경과 목적을 구분한다.
- 적용된 마이그레이션 파일을 임의로 삭제·수정·재정렬하지 않는다.

## 흐름

```text
로컬 마이그레이션 작성
→ 로컬 DB 적용·검증
→ Git 커밋과 PR
→ CI 검증
→ 승인된 환경에 적용
```

Supabase의 원격 스키마와 마이그레이션 이력이 어긋나면 동기화 문제가 발생할 수 있으므로, 원격 변경은 항상 마이그레이션을 통해 수행한다.

## 적용 트리거

로컬 검증은 마이그레이션 파일 변경 시 수행한다. Preview 또는 staging 적용은 CI 검증 후 승인된 배포 단계에서 수행하며, Production 적용은 명시적으로 승인된 배포 단계에서만 수행한다. 기본 브랜치 merge나 Vercel Production 배포만으로 마이그레이션을 자동 실행하지 않는다.
