# Monorepo: 프론트엔드 품질 도구와 Storybook

## 설정 책임

```text
root                   저장소 공통 포맷·검증 규칙
app/web                웹 프레임워크와 UI 계층 규칙
app/web/docs           도구 사용법과 UI 문서
```

루트에서 전체 모노레포의 공통 ESLint·Prettier 정책을 관리하고, `app/web`에는 웹 전용 규칙만 추가한다. 설정을 계층별로 복사하지 않는다.

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
