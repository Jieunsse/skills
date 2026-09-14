# Project Starter

스킬, 하네스, 개발 루프, 파이프라인, 스캐폴딩을 문서화하고 재사용하는 단일 Git 저장소입니다.

실제 서비스 코드는 포함하지 않습니다. 새 프로젝트의 목적과 기술 스택에 맞는 구성을 선택하고, 필요할 때 템플릿·스크립트·도구를 연결합니다.

## 구조

```text
/
├── README.md
├── AGENTS.md
├── docs/
│   ├── model/          # 용어와 기술 선택 기준
│   ├── skills/         # 공통·기획·디자인·계층별 스킬
│   ├── harness/        # 실행 환경과 MCP 연결
│   ├── loops/          # 개발 반복 방식
│   ├── pipelines/      # 개발·배포·운영 흐름
│   ├── compositions/   # 프로젝트별 스캐폴딩 명세
│   ├── integration/    # AI·외부 도구 연결 규칙
│   └── decisions/      # 주요 설계 결정
└── scripts/            # 스캐폴딩 위저드
```

## 프로젝트 축

### 저장소 형태

```text
frontend-only
backend-only
monorepo
```

모노레포의 목표 구조:

```text
project/
├── AGENTS.md
├── docs/               # 전체 프로젝트 문서
└── app/
    ├── web/docs/       # 프론트엔드 문서
    ├── backend/docs/   # 백엔드 문서
    └── mobile/docs/    # 모바일 문서, 선택 사항
```

### 기술 계층

```text
frontend     웹 프론트엔드
backend      백엔드·API
mobile       React Native + Expo
```

## 기본 스택

```text
공개 웹서비스       Next.js + TypeScript + Tailwind
관리자·SPA          React + Vite + TypeScript + Tailwind
타입 중심 스타일    vanilla-extract
모바일              React Native + Expo + TypeScript
패키지 매니저       pnpm 기본, npm·Yarn Classic·Yarn Berry 선택
서버 상태           TanStack Query
클라이언트 상태     Zustand
폼·검증             React Hook Form + Zod
HTTP client         Axios 선택 가능, adapter는 실행 환경별 결정
백엔드 기본         Spring Boot + DDD + JWT
```

ESLint와 Prettier는 프론트엔드 기본 품질 도구입니다. Storybook은 재사용 컴포넌트, 디자인 시스템, 복잡한 UI 상태가 필요할 때만 도입합니다.

## 배포와 협업

```text
배포        Vercel + Supabase 또는 AWS EC2 + Ubuntu + Nginx + Docker Compose
코드 운영   GitHub Actions, Issue·PR 템플릿, 라벨, 브랜치 규칙
업무 관리   GitHub Issues 또는 Linear 중 하나 선택
MCP         Figma, Notion, Slack, Linear
모노레포    Turborepo 선택 가능, Spring Boot는 Gradle 작업으로 분리
```

환경 변수는 `.env.example`만 커밋하고 `.env.local`은 커밋하지 않습니다. Preview·Production 환경과 Supabase 프로젝트를 분리하며, Supabase 스키마 변경은 Git의 마이그레이션 파일을 통해 관리합니다.

## 스킬 분류

```text
공통 엔지니어링  mattpocock/skills, obra/superpowers
문제 정의        problem-definition
기획             phuryn/pm-skills
디자인           pbakaus/impeccable
React·Next.js    vercel-labs/agent-skills/react-best-practices
시각화           archify
```

상세 출처와 적용 범위는 [`docs/skills/catalog.md`](docs/skills/catalog.md)를 참고합니다.
프론트엔드 패키지 매니저와 Axios adapter 기준은 [`frontend-stack-selection.md`](docs/model/frontend-stack-selection.md)와 [`frontend-http-client.md`](docs/model/frontend-http-client.md)를 참고합니다.

## 스캐폴딩

내부 위저드:

```bash
node scripts/scaffold.mjs
```

공식 생성기를 실행하려면 `--execute`를 추가합니다.

```bash
node scripts/scaffold.mjs \
  --target=../new-project \
  --preset=monorepo-web-backend-public \
  --execute
```

`project-starter`는 `@jieunsse/create-project-starter` 패키지의 CLI 이름입니다. npm 배포 전에는 저장소 내부 명령을 사용하고, 배포 후에는 다음처럼 호출합니다.

```bash
# 배포 전
node scripts/scaffold.mjs .

# 배포 후
pnpm create @jieunsse/project-starter .
pnpm create @jieunsse/project-starter new-project
```

자세한 배포 절차는 [`docs/integration/npm-publishing.md`](docs/integration/npm-publishing.md)를 참고합니다.

AI가 저장소 문서를 읽고 자연어 요청을 적절한 preset으로 매핑하는 규칙은 [`docs/integration/ai-scaffolding.md`](docs/integration/ai-scaffolding.md)에 있습니다.

## 문서 원칙

- 문서 하나는 하나의 책임만 갖습니다.
- 공통 규칙과 계층별 규칙을 분리합니다.
- 선택 사항과 미결정 사항을 명시합니다.
- 실제 프로젝트에서 검증된 구성만 재사용 단위로 승격합니다.

세부 규칙은 [AGENTS.md](https://github.com/Jieunsse/skills/blob/main/AGENTS.md)와 `docs/` 아래의 관련 문서를 기준으로 합니다.
