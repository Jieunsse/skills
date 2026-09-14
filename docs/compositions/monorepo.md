# Monorepo composition

## 목표 구조

```text
project/
├── AGENTS.md
├── docs/
│   ├── architecture/
│   ├── decisions/
│   ├── work-items/
│   ├── workflows/
│   └── conventions/
├── app/
│   ├── web/
│   │   └── docs/
│   ├── backend/
│   │   └── docs/
│   └── mobile/
│       └── docs/
├── packages/
│   └── api/           # Orval 사용 시
└── .github/
    ├── workflows/
    ├── ISSUE_TEMPLATE/
    ├── PULL_REQUEST_TEMPLATE.md
    └── labels.yml
```

`app/mobile`은 선택 사항이며 React Native + Expo를 사용한다. `.github`는 실제 생성 프로젝트에만 포함하고, 이 저장소에서는 규칙을 문서로 관리한다.

프론트엔드 패키지 매니저는 모노레포 전체에서 하나만 사용하며 기본값은 `pnpm`이다. `npm`, Yarn Classic, Yarn Berry를 선택할 수 있지만 lockfile과 CI 명령까지 동일한 선택을 따른다.

Turborepo는 선택 사항이다. JS/TS 계층이 여러 개면 도입하고, Spring Boot·Gradle 백엔드는 별도 작업으로 검증한다. 상세 기준은 [`monorepo-turborepo.md`](../model/monorepo-turborepo.md)에 둔다.

## 문서 배치

- `docs/`: 전체 아키텍처, 공통 규칙, 워크플로
- `app/web/docs/`: 웹 기능, 구조, 테스트, UI 규칙
- `app/backend/docs/`: API, 도메인, 데이터, 테스트
- `app/mobile/docs/`: 모바일 기능, 플랫폼 차이, 테스트, 배포

## API client 생성

백엔드가 제공하는 OpenAPI 명세를 프론트엔드에서 공유해야 하면 Orval을 선택한다. 명세의 원본은 `app/backend`의 springdoc-openapi이며, 생성 client와 타입은 `packages/api/generated`에 둔다. 생성 코드는 직접 수정하지 않고 명세 변경 후 다시 생성한다. 상세 기준은 [`../model/api-code-generation.md`](../model/api-code-generation.md)에 둔다.
