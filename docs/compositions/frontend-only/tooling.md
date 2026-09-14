# Frontend-only: 품질 도구와 Storybook

## 기본 도구

```text
ESLint
Prettier
TypeScript typecheck
```

ESLint는 정적 분석과 코드 품질, Prettier는 코드 형식을 담당한다. 둘의 규칙을 중복해서 관리하지 않는다.

## Storybook

기본 설치 항목이 아니다. 다음 조건이 확인되면 도입한다.

- 재사용 컴포넌트가 여러 화면에서 사용됨
- 디자인 시스템 또는 컴포넌트 라이브러리 운영
- 복잡한 UI 상태와 시각적 검증 필요
- 협업자가 독립적인 UI 검토 환경 필요

도입할 때는 공유 컴포넌트와 대표 상태부터 스토리를 작성한다.
