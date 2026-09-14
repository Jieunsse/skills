# 엔지니어링 구현 루프

엔지니어링 구현 루프는 코드베이스 확인과 최소 구현, 검증, 피드백 반영을 반복한다.

## 흐름

```text
코드베이스 확인
→ 구현 계획
→ 최소 변경
→ 검증
→ 피드백 반영
→ 재구현 또는 종료
```

각 반복은 하네스의 다음 실행을 따른다.

```text
Harness Run
├── Discovery
├── Implementation
└── Verification
```

## 산출물

- `Discovery Report`
- `Implementation Plan`
- `Change Set`
- `Verification Report`
- 다음 반복 또는 종료 판정

## 종료 조건

- 요구사항을 충족한다.
- 필수 검증을 통과한다.
- 잔여 위험을 기록했다.
- 관련 문서가 구현과 일치한다.
- 추가 변경의 가치가 낮거나 없다.

검증 실패는 구현단으로 돌아가며, 구조적 가정이 틀렸다면 확인단으로 돌아간다.
