# 프론트엔드 코드 작성 하네스

프론트엔드 하네스는 코드 품질 규칙을 실행하고 검증하는 환경을 정의한다.

## 기준 문서

코드 판단 규칙은 [`docs/skills/frontend/code-quality.md`](../../skills/frontend/code-quality.md)를 따른다.

## 기본 도구

```text
TypeScript
ESLint       정적 분석과 코드 품질
Prettier     코드 형식
```

ESLint와 Prettier의 책임을 중복시키지 않는다. CI에서는 포맷 검사, lint, typecheck를 실행하며 실제 명령어는 프로젝트 composition에서 결정한다.

Storybook은 재사용 컴포넌트, 복잡한 UI 상태, 디자인 시스템 또는 시각적 검증이 필요할 때만 추가한다. 도입 기준은 [`docs/model/frontend-tooling.md`](../../model/frontend-tooling.md)를 따른다.
