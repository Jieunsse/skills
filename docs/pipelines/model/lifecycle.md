# Pipeline Run 생명주기

```text
Triggered
→ Running
→ Awaiting Approval
→ Succeeded
```

예외 상태:

```text
Failed
Cancelled
Rolled Back
```

승인이 필요 없는 Pipeline은 `Running`에서 바로 `Succeeded` 또는 `Failed`로 전이한다. Production 배포와 데이터베이스 마이그레이션은 `Awaiting Approval`을 거쳐야 한다.
