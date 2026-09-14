# 프론트엔드 기술 스택 선택

## 고정 규칙

- 개발 언어는 TypeScript로 고정한다.
- `React` 선택지는 `React + Vite`로 표현한다.
- `Next.js`는 React 기반 애플리케이션 프레임워크로 취급한다.
- Tailwind CSS와 vanilla-extract는 웹 프론트엔드 선택지다.
- React Native + Expo 모바일에는 웹 CSS 선택지를 강제하지 않는다.

## 패키지 매니저 선택

프론트엔드와 모노레포는 다음 네 가지 중 하나를 선택하며, 하나의 프로젝트 안에서 혼용하지 않는다.

| 선택지 | 적합한 상황 |
| --- | --- |
| `pnpm` | 모노레포, workspace 의존성, 빠른 설치와 디스크 효율이 중요할 때. 기본 추천 |
| `npm` | 별도 workspace가 없는 단순한 단독 저장소와 최소 전제 조건이 필요한 경우 |
| Yarn Classic | 기존 프로젝트나 Yarn v1 생태계와의 호환성이 필요한 경우 |
| Yarn Berry | Plug'n'Play, Yarn workspace, Yarn 중심의 엄격한 의존성 관리가 필요한 경우 |

모노레포는 `pnpm`을 기본값으로 둔다. 기존 저장소를 이어가는 경우에는 기존 lockfile과 CI 환경을 우선한다. 선택한 매니저의 lockfile만 커밋하고, CI·로컬·스캐폴딩 명령에서 같은 매니저를 사용한다.

React Native + Expo에서 Yarn Berry를 선택하면 Plug'n'Play 대신 `nodeLinker: node-modules`를 사용하고, EAS를 쓰는 경우 Corepack과 Yarn 버전을 고정한다. ([Expo package managers](https://docs.expo.dev/more/create-expo/))

## 프레임워크 선택

### Next.js

공개 웹서비스, SEO가 중요한 서비스, 서버 렌더링·정적 생성·파일 기반 라우팅이 필요한 경우 선택한다. Vercel 배포와도 잘 맞는다.

### React + Vite

관리자, 대시보드, 내부 업무 도구, 별도 백엔드가 있는 SPA, 임베드 UI처럼 SEO와 서버 렌더링이 중요하지 않은 경우 선택한다.

## CSS 선택

- Tailwind CSS: 기본 선택지. 빠른 화면 개발과 일반적인 웹서비스에 사용한다.
- vanilla-extract: 타입 안정성이 중요한 스타일, 디자인 시스템, 컴포넌트 라이브러리에 사용한다.

두 방식을 기본적으로 혼용하지 않는다. 혼용이 필요하면 composition에 이유를 기록한다.

## 라이브러리 경계

| 도구 | 담당 영역 |
| --- | --- |
| Zustand | 클라이언트 UI 상태 |
| TanStack Query | 서버 상태, 캐시, 요청 생명주기 |
| Axios | HTTP 전송, interceptor, 공통 오류·인증 경계 (필요할 때만) |
| Zod | 런타임 입력·응답 검증 |
| React Hook Form | 폼 상태와 입력 관리 |

```text
API·서버 데이터 있음       → TanStack Query
전역 클라이언트 상태 있음  → Zustand
외부 입력 검증 필요         → Zod
복잡한 폼 있음              → React Hook Form + Zod
```

모든 프로젝트에 네 가지를 의무적으로 넣지 않는다. 서버 상태를 Zustand에 저장하지 않으며, 단순한 컴포넌트 상태까지 전역화하지 않는다.

Axios와 adapter 선택 기준은 [`frontend-http-client.md`](frontend-http-client.md)에서 관리한다.
