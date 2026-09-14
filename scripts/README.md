# Scaffolding wizard

터미널에서 프로젝트 구성 선택지를 고르고 공식 생성기를 연결하는 스크립트다.

## 실행

```bash
node scripts/scaffold.mjs
node scripts/scaffold.mjs --target=../my-project
node scripts/scaffold.mjs --target=../my-project --execute
node scripts/scaffold.mjs --target=../my-project --preset=monorepo-web-backend-public --execute
```

배포용 CLI 이름은 `project-starter`로 사용한다.

```bash
pnpm create project-starter .
pnpm create project-starter new-project
```

기본 실행은 미리보기 모드다. `--execute`를 지정해야 Next.js, Vite, Spring Initializr 생성기를 실행한다.

AI가 자연어 요청을 해석한 경우에는 `--preset`으로 비대화형 실행을 할 수 있다. 지원 preset과 매핑 규칙은 [`docs/integration/ai-scaffolding.md`](../docs/integration/ai-scaffolding.md)에 둔다.

대상 디렉터리는 비어 있어야 하며, 생성 결과에는 `scaffold-selection.json`과 `docs/scaffold-selection.md`가 기록된다.

## 지원 구성

- `frontend-only`: Next.js 또는 React + Vite
- `backend-only`: Spring Boot + Gradle + DDD 기준
- `monorepo`: `app/web`, `app/backend`, 선택적 `app/mobile`
- CSS: Tailwind CSS 또는 vanilla-extract
- 배포: Vercel + Supabase 또는 AWS
- 업무 관리: GitHub Issues 또는 Linear
- 모바일: React Native + Expo

현재 스크립트는 선택 결과와 공식 생성기 실행까지만 담당한다. 세부 설정, 문서 배치, 인증·배포 연결은 선택된 composition을 따른다.
