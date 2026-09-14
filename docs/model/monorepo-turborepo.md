# 모노레포 Turborepo 기준

## 도입 기준

Turborepo는 모노레포의 JavaScript·TypeScript 작업을 캐시하고 의존 순서에 따라 실행하는 선택적 task 오케스트레이터다.

다음 조건이면 도입한다.

- `app/web`, `app/mobile`, 공유 패키지 등 JS/TS 작업 대상이 둘 이상이다.
- lint·typecheck·test·build를 계층별로 반복 실행한다.
- 로컬·CI에서 작업 결과 캐시의 효과가 있다.

웹과 Spring Boot 백엔드만 있는 모노레포에서는 선택 사항이다. 백엔드는 Gradle과 별도 CI 작업으로 실행하고, Turbo task에 억지로 포함하지 않는다.

## 기본 구조

현재 저장소의 애플리케이션 경로인 `app/*`를 유지한다. Turborepo의 일반적인 `apps/*` 예시에 맞추기 위해 경로를 바꾸지 않는다.

```text
project/
├── package.json          # private workspace, packageManager, turbo scripts
├── turbo.json            # task graph와 cache outputs
├── pnpm-workspace.yaml   # pnpm 선택 시
├── app/
│   ├── web/
│   └── mobile/           # 선택 사항
└── packages/             # 공유할 때만 추가
```

`packages/`는 실제로 공유되는 코드가 생겼을 때만 만든다. `app/backend`는 Gradle 프로젝트이므로 JavaScript workspace 범위에 넣지 않는다.

## 루트 설정 원칙

```json
{
  "$schema": "https://turborepo.com/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**", "build/**"]
    },
    "lint": {},
    "typecheck": {},
    "test": {},
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

실제 `outputs`는 사용하는 프레임워크에 맞춰 조정한다. `dev`처럼 계속 실행되는 작업은 캐시하지 않는다. `tasks`와 각 앱의 `package.json` scripts 이름을 일치시킨다.

## 실행 규칙

```bash
turbo run lint typecheck test build
turbo run build --filter=web
turbo run test --filter=web...
```

`^build`는 의존하는 내부 패키지의 build를 먼저 실행한다. 특정 앱만 검증할 때는 `--filter`를 사용하고, 전체 검증이 필요한 CI에서는 루트 task를 실행한다.

패키지 매니저는 프로젝트 전체에서 하나만 사용한다. 기본은 `pnpm`이며, 선택한 매니저의 workspace 설정·lockfile·CI 설치 명령을 함께 유지한다.

## 캐시와 CI

- 로컬 캐시는 기본으로 사용한다.
- 원격 캐시는 빌드 시간이 실제로 줄어드는 것이 확인될 때만 도입한다.
- 원격 캐시 토큰과 팀 식별자는 CI secret으로만 주입한다.
- `TURBO_TOKEN`, `TURBO_TEAM` 같은 값은 소스·`.env.example`에 실제 값으로 기록하지 않는다.
- 캐시 적중보다 정확한 `outputs`, 환경 변수 입력, 의존성 lockfile 관리가 우선이다.

GitHub Actions에서는 선택한 패키지 매니저로 frozen lockfile 설치 후 `turbo run lint typecheck test build`를 실행한다. 웹·모바일 Turbo 작업과 `app/backend` Gradle 작업은 실패 원인을 구분할 수 있도록 별도 step 또는 job으로 둔다.

## 도입하지 않을 때

JS/TS 앱이 하나뿐이거나 task 실행 시간이 짧으면 루트 workspace scripts만 사용한다. Turborepo 설정 자체가 관리 비용이 되는 경우에는 추가하지 않는다.

## 관련 문서

- [모노레포 composition](../compositions/monorepo.md)
- [모노레포 프론트엔드 도구](../compositions/monorepo/frontend-tooling.md)
- [GitHub Actions CI/CD](../pipelines/github/ci-cd.md)
- [Turborepo 공식 문서](https://turborepo.com/docs)
