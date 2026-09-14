# Monorepo composition

## 목표 구조

```text
project/
├── AGENTS.md
├── docs/
│   ├── architecture/
│   ├── decisions/
│   ├── workflows/
│   └── conventions/
├── app/
│   ├── web/
│   │   └── docs/
│   ├── backend/
│   │   └── docs/
│   └── mobile/
│       └── docs/
└── .github/
    ├── workflows/
    ├── ISSUE_TEMPLATE/
    ├── PULL_REQUEST_TEMPLATE.md
    └── labels.yml
```

`app/mobile`은 선택 사항이며 React Native + Expo를 사용한다. `.github`는 실제 생성 프로젝트에만 포함하고, 이 저장소에서는 규칙을 문서로 관리한다.

## 문서 배치

- `docs/`: 전체 아키텍처, 공통 규칙, 워크플로
- `app/web/docs/`: 웹 기능, 구조, 테스트, UI 규칙
- `app/backend/docs/`: API, 도메인, 데이터, 테스트
- `app/mobile/docs/`: 모바일 기능, 플랫폼 차이, 테스트, 배포
