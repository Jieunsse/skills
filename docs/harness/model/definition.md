# Harness Run 정의

`Harness Run`은 하나의 사용자 요청을 확인하고, 변경하고, 검증하는 전체 작업 단위다. 커밋이나 PR과 반드시 일치하지 않는다.

```text
Harness Run
├── Discovery Report
├── Implementation Plan
├── Change Set
├── Verification Report
└── 종료 상태
```

작업 예시는 기능 추가, 버그 수정, 리팩터링, 데이터베이스 마이그레이션, 배포 설정 변경, 문서 구조 개선이다.

복잡한 작업은 `Phase`와 `Check`로 세분화할 수 있지만, 작은 작업에는 추가 계층을 만들지 않는다.
