# Scaffolding wizard

터미널에서 프로젝트 구성 선택지를 고르고 공식 생성기를 연결하는 스크립트다.

## 실행

```bash
node scripts/scaffold.mjs
node scripts/scaffold.mjs --target=../my-project
node scripts/scaffold.mjs --target=../my-project --execute
node scripts/scaffold.mjs --target=../my-project --preset=monorepo-web-backend-public --execute
```

`project-starter`는 향후 배포할 CLI 패키지 이름으로 예약했다. 아직 npm 패키지는 배포하지 않았으므로 아래 명령은 목표 인터페이스다.

```bash
pnpm create project-starter .
pnpm create project-starter new-project
```

기본 실행은 미리보기 모드이며 파일이나 디렉터리를 만들지 않는다. `--execute`를 지정해야 Next.js, Vite, Spring Initializr 생성기를 실행하고 선택 문서를 기록한다.

AI가 자연어 요청을 해석한 경우에는 `--preset`으로 비대화형 실행을 할 수 있다. 지원 preset과 매핑 규칙은 [`docs/integration/ai-scaffolding.md`](../docs/integration/ai-scaffolding.md)에 둔다.

`--execute`의 대상 디렉터리는 비어 있어야 하며, 생성 결과에는 `docs/scaffold-selection.json`과 `docs/scaffold-selection.md`가 기록된다.

## 지원 구성

- `frontend-only`: Next.js 또는 React + Vite
- `backend-only`: Spring Boot + Gradle + DDD 기준
- `monorepo`: `app/web`, `app/backend`, 선택적 `app/mobile`
- 패키지 매니저: `pnpm`, `npm`, Yarn Classic, Yarn Berry
- 웹 HTTP client: `fetch` 또는 `axios`; Axios 선택 시 adapter 기록
- CSS: Tailwind CSS 또는 vanilla-extract
- 배포: Vercel + Supabase 또는 AWS
- 업무 관리: GitHub Issues 또는 Linear
- 모바일: React Native + Expo
- 모노레포 task 실행: Turborepo 선택 가능

현재 스크립트는 Next.js, Vite, Spring Initializr, Expo의 기본 생성과 문서 배치를 담당한다. Vite를 선택하면 선택한 패키지 매니저로 의존성 설치까지 실행한다. Next.js + Tailwind 외의 CSS 설정, Storybook, DDD·JWT·CORS 구현, 배포·업무 관리 연결은 선택된 composition을 따른다.

## 전제 조건

- Node.js와 `npm`·`npx`
- 백엔드 생성 시 `curl`과 `unzip` (현재 macOS·Linux 기준)

생성기 버전은 재현성을 위해 스크립트에 고정한다. 업데이트는 버전과 생성 결과를 함께 검증한 변경으로만 한다.
