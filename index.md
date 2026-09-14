# Skills Repository Index

이 문서는 저장소의 모든 주요 문서로 이동하는 루트 길잡이다. 작업 목적을 먼저 찾고, 해당 영역의 기준 문서에서 세부 문서로 내려간다.

## 빠른 이동

| 찾는 내용 | 시작 문서 |
| --- | --- |
| 저장소 전체 목적과 기본 스택 | [`README.md`](README.md) |
| AI 작업 규칙 | [`AGENTS.md`](AGENTS.md) |
| 용어·경계·기술 선택 | [`docs/model/`](docs/model/) |
| 스킬 목록과 적용 범위 | [`docs/skills/catalog.md`](docs/skills/catalog.md) |
| 코드 확인·작성·검증 | [`docs/harness/README.md`](docs/harness/README.md) |
| 반복 개발 방식 | [`docs/loops/README.md`](docs/loops/README.md) |
| 작업·배포·운영 연결 | [`docs/pipelines/README.md`](docs/pipelines/README.md) |
| 프로젝트 조합과 스캐폴딩 | [`docs/compositions/README.md`](docs/compositions/README.md) |
| AI 대화형 스캐폴딩 | [`docs/integration/ai-scaffolding.md`](docs/integration/ai-scaffolding.md) |
| npm CLI 배포 | [`docs/integration/npm-publishing.md`](docs/integration/npm-publishing.md) |
| 스캐폴딩 위저드 실행 | [`scripts/README.md`](scripts/README.md) |

## 권장 읽기 순서

```text
README.md
→ model/boundaries.md
→ skills/catalog.md
→ harness/README.md
→ loops/README.md
→ pipelines/README.md
→ compositions/README.md
```

특정 작업을 수행할 때는 다음처럼 이동한다.

```text
문제·기획
→ skills/product 또는 loops/core

코드 변경
→ harness → loops/core/engineering.md

배포
→ pipelines/deployment

새 프로젝트 생성
→ compositions → integration/ai-scaffolding.md → scripts
```

## 1. Model

기술 선택, 저장소 구조, 용어와 영역 간 책임을 정의한다.

- [`docs/model/glossary.md`](docs/model/glossary.md) — 저장소 공통 용어
- [`docs/model/boundaries.md`](docs/model/boundaries.md) — skills·harness·loops·pipelines·compositions 경계
- [`docs/model/operating-model.md`](docs/model/operating-model.md) — 운영 요소의 연결과 트리거
- [`docs/model/repository-profiles.md`](docs/model/repository-profiles.md) — frontend-only·backend-only·monorepo
- [`docs/model/frontend-stack-selection.md`](docs/model/frontend-stack-selection.md) — Next.js·React/Vite와 프론트엔드 선택
- [`docs/model/frontend-http-client.md`](docs/model/frontend-http-client.md) — fetch·Axios·adapter
- [`docs/model/frontend-tooling.md`](docs/model/frontend-tooling.md) — ESLint·Prettier·Storybook
- [`docs/model/backend-stack-selection.md`](docs/model/backend-stack-selection.md) — Spring Boot·DDD·JWT
- [`docs/model/api-code-generation.md`](docs/model/api-code-generation.md) — OpenAPI·Orval·공유 API client
- [`docs/model/monorepo-turborepo.md`](docs/model/monorepo-turborepo.md) — 모노레포와 Turborepo
- [`docs/model/environment-variable-policy.md`](docs/model/environment-variable-policy.md) — 환경 변수 관리

## 2. Skills

재사용할 작업 방법과 전문 지식을 분류한다.

- [`docs/skills/catalog.md`](docs/skills/catalog.md) — 전체 스킬 카탈로그
- [`docs/skills/shared/`](docs/skills/shared/) — 공통 엔지니어링·문제 정의·스캐폴딩
  - [`mattpocock-workflow.md`](docs/skills/shared/mattpocock-workflow.md)
  - [`problem-definition.md`](docs/skills/shared/problem-definition.md)
  - [`project-scaffolding.md`](docs/skills/shared/project-scaffolding.md)
  - [`archify.md`](docs/skills/shared/archify.md)
- [`docs/skills/frontend/`](docs/skills/frontend/) — 프론트엔드 규칙과 코드 품질
- [`docs/skills/product/`](docs/skills/product/) — 기획·제품 작업
- [`docs/skills/design/`](docs/skills/design/) — 디자인 작업

## 3. Harness

코드베이스를 확인하고, 코드를 작성하고, 결과를 검증하는 작업 기준을 관리한다.

- [`docs/harness/README.md`](docs/harness/README.md) — 하네스 구조와 책임
- [`docs/harness/model/definition.md`](docs/harness/model/definition.md) — `Harness Run` 정의
- [`docs/harness/model/lifecycle.md`](docs/harness/model/lifecycle.md) — 상태 생명주기
- [`docs/harness/model/artifacts.md`](docs/harness/model/artifacts.md) — 산출물 구조
- [`docs/harness/discovery.md`](docs/harness/discovery.md) — 코드베이스 확인단
- [`docs/harness/implementation.md`](docs/harness/implementation.md) — 코드 작성단과 `Must · Default · Consider`
- [`docs/harness/verification.md`](docs/harness/verification.md) — 검증 게이트와 최종 판정
- [`docs/harness/verification-matrix.md`](docs/harness/verification-matrix.md) — 필수·선택 검증 매트릭스
- [`docs/harness/frontend/README.md`](docs/harness/frontend/README.md) — 프론트엔드 하네스
- [`docs/harness/backend/README.md`](docs/harness/backend/README.md) — Spring Boot·JWT·Flyway 하네스
- [`docs/harness/mobile/README.md`](docs/harness/mobile/README.md) — React Native·Expo 하네스
- [`docs/harness/mcp/README.md`](docs/harness/mcp/README.md) — MCP 연결 정책
  - [`figma.md`](docs/harness/mcp/providers/figma.md)
  - [`notion.md`](docs/harness/mcp/providers/notion.md)
  - [`slack.md`](docs/harness/mcp/providers/slack.md)
  - [`linear.md`](docs/harness/mcp/providers/linear.md)

## 4. Loops

결과와 피드백을 반영해 작업을 반복하는 구조를 관리한다.

- [`docs/loops/README.md`](docs/loops/README.md) — 루프 모델과 Harness 관계
- [`docs/loops/model/definition.md`](docs/loops/model/definition.md) — `Loop Run` 정의
- [`docs/loops/model/lifecycle.md`](docs/loops/model/lifecycle.md) — 반복·수정·종료 상태
- [`docs/loops/model/feedback.md`](docs/loops/model/feedback.md) — 피드백 분류와 복귀
- [`docs/loops/core/problem-definition.md`](docs/loops/core/problem-definition.md) — 문제 정의 루프
- [`docs/loops/core/product-planning.md`](docs/loops/core/product-planning.md) — 제품 기획 루프
- [`docs/loops/core/engineering.md`](docs/loops/core/engineering.md) — 엔지니어링 구현 루프
- [`docs/loops/core/architecture-feedback.md`](docs/loops/core/architecture-feedback.md) — 아키텍처 피드백 루프
- [`docs/loops/templates/loop-run.md`](docs/loops/templates/loop-run.md) — Loop Run 기록 템플릿

## 5. Pipelines

스킬·하네스·루프·외부 도구를 작업, 배포, 운영 흐름으로 연결한다.

- [`docs/pipelines/README.md`](docs/pipelines/README.md) — 파이프라인 공통 기준
- [`docs/pipelines/trigger-model.md`](docs/pipelines/trigger-model.md) — 수동·PR·배포 트리거 기준
- [`docs/pipelines/frontend/`](docs/pipelines/frontend/) — 프론트엔드 환경 변수
- [`docs/pipelines/deployment/`](docs/pipelines/deployment/) — 배포 프로파일
  - [`aws.md`](docs/pipelines/deployment/aws.md) — EC2·Ubuntu·Nginx·Docker Compose 기본값
  - [`vercel-supabase.md`](docs/pipelines/deployment/vercel-supabase.md)
  - [`supabase-migrations.md`](docs/pipelines/deployment/supabase-migrations.md)
- [`docs/pipelines/github/`](docs/pipelines/github/) — CI/CD·브랜치·Issue·PR·라벨
- [`docs/pipelines/project-management/`](docs/pipelines/project-management/) — GitHub Issues 또는 Linear

GitHub 파이프라인은 [`ci-cd.md`](docs/pipelines/github/ci-cd.md), [`branch-policy.md`](docs/pipelines/github/branch-policy.md), [`issue-templates.md`](docs/pipelines/github/issue-templates.md), [`pr-template.md`](docs/pipelines/github/pr-template.md), [`labels.md`](docs/pipelines/github/labels.md)를 기준으로 한다. 업무 관리 파이프라인은 [`workflow-mapping.md`](docs/pipelines/project-management/workflow-mapping.md), [`github-issues.md`](docs/pipelines/project-management/github-issues.md), [`linear.md`](docs/pipelines/project-management/linear.md), [`automation.md`](docs/pipelines/project-management/automation.md)를 따른다.

## 6. Compositions

프로젝트 목적에 맞게 저장소 형태, 기술 계층, 배포, 업무 관리, 문서 구조를 조합한다.

- [`docs/compositions/README.md`](docs/compositions/README.md) — composition 작성 기준
- [`docs/compositions/frontend-only/`](docs/compositions/frontend-only/) — 프론트엔드 단독 리포
- [`docs/compositions/backend-only/`](docs/compositions/backend-only/) — 백엔드 단독 리포
- [`docs/compositions/monorepo.md`](docs/compositions/monorepo.md) — 모노레포 공통 구조
- [`docs/compositions/monorepo/`](docs/compositions/monorepo/) — 모노레포 환경·도구·목적별 프로파일

모노레포의 계층별 문서 위치는 다음을 기준으로 한다.

```text
root/docs
app/web/docs
app/backend/docs
app/mobile/docs  # 선택 사항
```

## 7. Integration

AI와 외부 도구가 이 저장소를 읽고 스캐폴딩과 문서 작업에 활용하는 방법을 관리한다.

- [`docs/integration/README.md`](docs/integration/README.md) — 외부 연결 기준
- [`docs/integration/ai-scaffolding.md`](docs/integration/ai-scaffolding.md) — 자연어 요청에서 preset으로 매핑
- [`docs/integration/npm-publishing.md`](docs/integration/npm-publishing.md) — `project-starter` npm 패키지

## 8. Decisions

- [`docs/decisions/README.md`](docs/decisions/README.md) — 주요 설계 결정 기록 위치

## 9. Scripts

- [`scripts/README.md`](scripts/README.md) — 스캐폴딩 위저드 사용법
- [`scripts/scaffold.mjs`](scripts/scaffold.mjs) — 선택·preview·공식 생성기 실행·문서 배치

기본은 preview 모드이며, 공식 생성기와 외부 명령은 `--execute`를 명시한 경우에만 실행한다.

## 문서 탐색 규칙

1. 먼저 이 인덱스에서 목적에 맞는 시작 문서를 찾는다.
2. 시작 문서에서 관련 model·skill·harness·loop·pipeline을 따라간다.
3. 프로젝트별 세부사항은 `compositions`를 우선한다.
4. 문서 간 기준이 충돌하면 `docs/model/`의 경계와 선택 기준을 먼저 확인한다.
5. 결정되지 않은 내용은 추측하지 않고 `미결정`으로 취급한다.

새 폴더나 핵심 문서를 추가할 때는 이 인덱스의 관련 섹션과 빠른 이동 표를 함께 갱신한다.
