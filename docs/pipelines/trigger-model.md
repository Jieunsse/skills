# 파이프라인 트리거

이 문서는 생성 대상 프로젝트에 적용할 기본 Pipeline 트리거를 정의한다. 실제 자동화는 프로젝트의 CI/CD workflow, 배포 플랫폼, 권한 설정이 갖춰진 경우에만 동작한다.

## 트리거 카탈로그

| Pipeline | 기본 트리거 | 수행 주체 | 결과 |
| --- | --- | --- | --- |
| 프로젝트 스캐폴딩 | `project-starter` 또는 `scaffold.mjs`의 `--execute` | 개발자 또는 AI | 공식 생성기 실행·기본 문서 배치 |
| 작업 시작 | 사용자 요청 또는 선택한 이슈 도구의 `Ready` 상태 | 개발자 또는 AI | 적절한 Loop Run 시작 |
| PR 검증 | PR open·synchronize | GitHub Actions | format·lint·typecheck·test·build |
| OpenAPI·Orval 검증 | API 명세·생성 코드가 변경된 PR | GitHub Actions | 명세·생성 결과 정합성 확인 |
| Vercel Preview | PR open·synchronize | Vercel | Preview 배포 |
| Vercel Production (마이그레이션 없음) | 기본 브랜치 merge | Vercel | Production 배포 |
| Vercel Production (마이그레이션 있음) | 승인된 release 절차 | CI/CD 또는 승인자 | 마이그레이션 후 Production 배포 |
| Supabase 마이그레이션 | 검증 후 승인된 배포 단계 | CI/CD 또는 승인자 | 대상 환경의 마이그레이션 적용 |
| AWS staging 배포 | `workflow_dispatch` | GitHub Actions + OIDC + SSM | staging EC2 배포 |
| AWS production 배포 | 승인된 `workflow_dispatch` | GitHub Actions + OIDC + SSM | production EC2 배포 |

## 작업 시작과 Loop 선택

```text
사용자 요청 또는 Ready 이슈
├── 문제·원인이 불명확함 → 문제 정의 Loop
├── 목표·수용 기준이 불명확함 → 제품 기획 Loop
├── 코드·문서·설정 변경 범위가 명확함 → 엔지니어링 구현 Loop
└── 구조적 결합·병목이 반복됨 → 아키텍처 피드백 Loop
```

엔지니어링 구현 Loop는 Harness Run을 시작한다. Loop와 Harness는 자동화된 상태 기계가 아니라, AI·개발자 또는 연결된 Pipeline이 적용하는 실행 규칙이다.

## 안전 규칙

- AWS Production과 데이터베이스 마이그레이션은 기본 브랜치 merge만으로 자동 실행하지 않는다.
- Production 배포는 대상 환경 승인과 검증 결과를 확인한 명시적 수동 실행으로 시작한다.
- 실패한 PR 검증은 병합·배포 트리거를 막는다.
- 실행할 workflow가 없는 프로젝트는 해당 트리거를 수동 절차로 취급한다.
- Pipeline별 트리거를 변경하면 해당 배포·CI 문서와 composition을 함께 갱신한다.
