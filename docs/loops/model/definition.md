# Loop Run 정의

`Loop Run`은 하나의 목표를 정하고, 실행하고, 결과를 확인하고, 피드백을 반영하는 반복 작업 단위다.

```text
Loop Run
├── Frame       목표·문제 정의
├── Plan        해결 방법·완료 조건 정의
├── Execute     코드·문서·설정 실행
├── Verify      결과 검증
├── Learn       실패·피드백·새 사실 정리
└── Decide      계속·수정·종료 결정
```

루프는 커밋, PR, 이슈와 반드시 일치하지 않는다. 하나의 Loop Run이 여러 작업과 커밋을 포함할 수 있다.

각 실행은 필요한 경우 하네스의 `Harness Run`을 포함한다.

```text
Loop Run
└── Harness Run
    ├── Discovery
    ├── Implementation
    └── Verification
```
