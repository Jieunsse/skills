# 책임 경계

## 핵심 구역

`skills`, `harness`, `loops`, `pipelines`, `compositions`는 순차 계층이 아니라 책임이 다른 운영 요소다. 전체 연결과 상태 전이는 [`operating-model.md`](operating-model.md)를 따른다.

- `skills`는 작업 방법을 설명하지만 실행 코드를 소유하지 않는다.
- `harness`는 한 작업의 코드베이스 확인·작성·검증 기준을 설명하지만 제품 의사결정을 소유하지 않는다.
- `loops`는 목표·피드백·복귀·종료를 관리하지만 특정 기술 스택에 종속되지 않는다.
- `pipelines`는 이슈·PR·CI·배포 같은 외부 이벤트의 순서와 연결을 설명한다.
- `compositions`는 실제 프로젝트 형태에 맞춰 위 요소를 조합한다.

## 문서 위치

- 루트 `docs`: 전체 프로젝트의 공통 문서
- `app/web/docs`: 프론트엔드 문서
- `app/backend/docs`: 백엔드 문서
- `app/mobile/docs`: 모바일 문서

한 계층의 세부 규칙을 다른 계층 문서에 복사하지 않는다. 여러 계층에 걸친 내용은 루트 문서에 둔다.
