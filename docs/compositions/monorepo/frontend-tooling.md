# Monorepo: 프론트엔드 품질 도구와 Storybook

## 설정 책임

```text
root                   저장소 공통 포맷·검증 규칙
app/web                웹 프레임워크와 UI 계층 규칙
app/web/docs           도구 사용법과 UI 문서
```

루트에서 전체 모노레포의 공통 ESLint·Prettier 정책을 관리하고, `app/web`에는 웹 전용 규칙만 추가한다. 설정을 계층별로 복사하지 않는다.

패키지 매니저는 모노레포 전체에서 하나만 사용하며 기본값은 `pnpm`이다. HTTP client와 adapter는 [`frontend-http-client.md`](../../model/frontend-http-client.md) 기준으로 결정하고, 공유 API client가 있으면 루트 문서에 경계를 기록한다.

백엔드 API를 프론트엔드에서 소비하는 모노레포는 Orval을 선택할 수 있다. 백엔드의 springdoc-openapi 명세를 원본으로 사용하고, 웹·모바일이 공유하는 생성 코드는 기본적으로 `packages/api/generated`에 둔다. 상세 기준은 [`api-code-generation.md`](../../model/api-code-generation.md)를 따른다.

Turborepo는 JS/TS 앱이나 공유 패키지가 둘 이상일 때 선택한다. 도입 기준과 `turbo.json`, task·cache·CI 규칙은 [`monorepo-turborepo.md`](../../model/monorepo-turborepo.md)를 따른다.

## 기본 검증 흐름

```text
format check
→ lint
→ typecheck
→ web test
→ web build
```

## Storybook

`app/web`의 공유 컴포넌트, 디자인 시스템, 복잡한 UI 상태를 독립적으로 개발·문서화할 필요가 확인될 때 도입한다.

모노레포에 도입할 경우 Storybook의 소유 위치는 기본적으로 `app/web`이다. 여러 애플리케이션이 동일 컴포넌트를 공유하는 경우에만 루트 공용 UI 패키지와 Storybook 위치를 별도로 결정한다.
