# 재사용 가능한 프로젝트 구성 저장소

스킬, 하네스, 개발 루프, 파이프라인, 스캐폴딩 규칙을 문서화하고 재사용하기 위한 저장소입니다.

이 저장소는 실제 서비스 코드를 담지 않습니다. 새 프로젝트를 시작할 때 필요한 설계와 구성 규칙을 선택하고, 추후 필요한 템플릿·스크립트·도구를 연결하기 위한 원본 저장소입니다. 현재는 문서와 최소한의 스캐폴딩 위저드만 포함합니다.

## 핵심 원칙

- 모든 내용은 하나의 Git 저장소에서 통합 관리합니다.
- 현재 범위는 문서화와 스캐폴딩 위저드입니다.
- 실제 프로젝트 코드는 이 저장소에 추가하지 않습니다.
- 재사용 단위는 복사보다 조합을 우선합니다.
- 공통 규칙과 계층별 규칙을 분리합니다.
- 실행 자동화는 필요와 검증이 확인된 뒤 추가합니다.

## 구조

```text
/
├── README.md
├── AGENTS.md
└── docs/
    ├── model/                 # 용어와 기술 선택 기준
    ├── skills/                # 공통·기획·디자인·계층별 AI 스킬
    ├── harness/               # 실행 환경과 MCP 연결
    ├── loops/
    ├── pipelines/
    ├── compositions/
    ├── integration/           # AI 대화형 사용과 외부 연결
    └── decisions/
```

## 핵심 구역

| 구역 | 책임 |
| --- | --- |
| `skills` | 사람과 AI가 작업을 수행하는 방법과 판단 기준 |
| `harness` | 도구, 실행 환경, 검증 환경 |
| `loops` | 계획부터 회고까지 반복하는 개발 방식 |
| `pipelines` | 작업·배포·운영을 실행하는 순서와 흐름 |
| `compositions` | 위 요소를 프로젝트 형태별로 조합하는 스캐폴딩 명세 |

MCP는 별도 핵심 구역을 추가하지 않고 `harness/mcp`에 둡니다. 주요 제공자는 Figma, Notion, Slack, Linear이며, 연결은 하네스가 담당하고 활용 방식은 관련 스킬과 파이프라인에서 정의합니다.

## 기술 계층

```text
shared       전체 프로젝트에 공통
frontend     웹 프론트엔드
backend      백엔드와 API
mobile       React Native + Expo 모바일 앱
```

계층별 문서는 다른 계층의 세부 구현을 소유하지 않습니다. 여러 계층에 걸친 규칙은 `shared` 또는 루트 문서에 둡니다.

## 저장소 프로파일

```text
frontend-only     프론트엔드 단독 저장소
backend-only      백엔드 단독 저장소
monorepo          여러 애플리케이션을 하나의 저장소에서 관리
```

모노레포의 목표 구조는 다음과 같습니다.

```text
project/
├── AGENTS.md
├── docs/                       # 전체 프로젝트 문서
└── app/
    ├── web/
    │   └── docs/               # 프론트엔드 문서
    ├── backend/
    │   └── docs/               # 백엔드 문서
    └── mobile/
        └── docs/               # 모바일 문서, 선택 사항
```

## 프론트엔드 기본값

개발 언어는 TypeScript로 고정합니다. `React` 선택지는 실제 구성에서 `React + Vite`로 표현합니다.

```text
공개 웹서비스       Next.js + TypeScript + Tailwind
관리자·SPA          React + Vite + TypeScript + Tailwind
타입 중심 스타일    Next.js 또는 React + Vite + vanilla-extract
모바일              React Native + Expo + TypeScript
서버 상태           TanStack Query
클라이언트 상태     Zustand
폼                  React Hook Form + Zod
```

상세 선택 기준은 [`docs/model/frontend-stack-selection.md`](docs/model/frontend-stack-selection.md)에 둡니다. 외부 스킬 출처와 계층 분류는 [`docs/skills/catalog.md`](docs/skills/catalog.md)에 둡니다.

ESLint와 Prettier는 프론트엔드 기본 품질 도구이며, Storybook은 재사용 컴포넌트와 디자인 시스템 수요가 확인될 때 선택합니다. 기준은 [`docs/model/frontend-tooling.md`](docs/model/frontend-tooling.md)에 둡니다.

프론트엔드 코드 판단 기준은 [`docs/skills/frontend/code-quality.md`](docs/skills/frontend/code-quality.md)에 둡니다.

백엔드 선택 기준은 [`docs/model/backend-stack-selection.md`](docs/model/backend-stack-selection.md)에 둡니다. Spring Boot DDD 구성은 JWT를 기본 인증 방식으로 사용합니다.

## 배포 프로파일

```text
vercel-supabase   Vercel 기반 애플리케이션 + Supabase
aws               AWS 기반 배포
```

AWS는 필요할 때 ECS, Lambda, Amplify 등 실행 방식별 프로파일로 확장합니다.

환경 변수와 Supabase 마이그레이션은 환경별로 분리하고, `.env.example`만 Git에 포함합니다. 상세 규칙은 [`docs/model/environment-variable-policy.md`](docs/model/environment-variable-policy.md)와 [`docs/pipelines/deployment/supabase-migrations.md`](docs/pipelines/deployment/supabase-migrations.md)에 둡니다.

## GitHub와 업무 관리

GitHub는 Actions CI/CD, Issue·PR 템플릿, 라벨, 브랜치·리뷰 규칙을 담당합니다. 업무 관리는 프로젝트에 따라 다음 중 선택합니다.

```text
github-issues
linear
github-issues + linear
```

두 도구를 함께 사용할 때는 이슈 원본, 상태, 우선순위, 라벨, 동기화 책임을 composition에서 명시합니다.

## 스캐폴딩과 추후 연결

`compositions`는 저장소 구조, 계층별 `docs`, 기술 스택, 배포, GitHub·업무 관리, 외부 스크립트 연결과 생성 후 검증 방법을 정의합니다.

내부 스캐폴딩 위저드는 [`scripts/scaffold.mjs`](scripts/scaffold.mjs)로 실행합니다. 배포용 CLI 이름은 `project-starter`로 사용하며, 현재는 공식 생성기 호출과 선택 결과 문서화까지 담당합니다.

```bash
node scripts/scaffold.mjs
node scripts/scaffold.mjs --target=../new-project --preset=monorepo-web-backend-public --execute
```

AI가 저장소 주소를 읽고 자연어 요청을 프로젝트 `preset`으로 매핑하는 규칙은 [`docs/integration/ai-scaffolding.md`](docs/integration/ai-scaffolding.md)에 둡니다. 실제 프로젝트 템플릿과 임의의 원격 스크립트 자동 실행은 아직 포함하지 않습니다.

## 문서 작성 규칙

- 문서 하나는 하나의 책임만 갖습니다.
- 규칙과 예시는 분리합니다.
- 선택 사항은 명시합니다.
- 결정되지 않은 내용은 `미결정`으로 표시합니다.
- 프로젝트별 예외는 공통 규칙에 섞지 않습니다.
- 경로, 파일명, 명령어는 코드 형식으로 표기합니다.

## 구성 선택 순서

```text
저장소 프로파일
→ 기술 계층과 스택
→ 배포 프로파일
→ GitHub 운영 프로파일
→ 업무 관리 프로파일
→ 스킬·하네스·루프·파이프라인 조합
```

목표는 많은 템플릿을 미리 만드는 것이 아니라, 실제 프로젝트에서 검증된 구성을 작고 명확한 단위로 축적하는 것입니다.
