# PR Validation Pipeline

PR Validation Pipeline은 PR 변경 범위를 분석하고 공통·계층별 검증을 실행한다.

## 트리거

```text
PR open
PR synchronize
```

## 흐름

```text
변경 경로 분석
→ 영향 계층 선택
→ 공통 검증
→ 계층별 검증
→ 결과 상태 기록
```

## 공통 검증

```text
format
→ lint
→ typecheck
→ test
→ build
→ diff·비밀정보 검토
```

## 경로별 추가 검증

| 변경 경로 | 추가 검증 |
| --- | --- |
| `app/web` | 웹 lint·typecheck·test·build |
| `app/backend` | Gradle test·OpenAPI·Flyway |
| `app/mobile` | mobile test·Expo config |
| `packages/api` | Orval 생성 결과·소비자 typecheck |
| `supabase/migrations` | 마이그레이션 검증 |
| `infra` | Terraform validate·plan |
| `.github` | workflow 문법·권한 검토 |

## 실패 처리

필수 검증이 실패하면 PR 상태를 실패로 기록하고 병합·배포를 막는다. 실행할 workflow가 아직 없는 프로젝트는 이 문서를 수동 검증 기준으로 사용한다.
