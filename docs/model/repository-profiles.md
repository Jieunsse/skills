# 저장소 프로파일

## frontend-only

웹 프론트엔드만 포함하는 단독 저장소다. 기본 대상은 웹 애플리케이션이며 모바일은 별도 프로파일로 취급한다.

## backend-only

백엔드와 API만 포함하는 단독 저장소다.

## monorepo

웹, 백엔드, 모바일을 하나의 Git 저장소에서 선택적으로 관리한다.

기본 목표 구조는 다음과 같다.

```text
project/
├── AGENTS.md
├── docs/
└── app/
    ├── web/
    │   └── docs/
    ├── backend/
    │   └── docs/
    └── mobile/
        └── docs/
```

`app/mobile`은 선택 사항이다.
