# Harness Run 생명주기

```text
Proposed
→ Discovered
→ Implementing
→ Verifying
→ Completed
```

예외 상태:

- `Blocked`: 외부 정보·권한·환경 문제로 진행할 수 없다.
- `Abandoned`: 작업을 더 진행하지 않기로 결정했다.

## 상태 기준

| 상태 | 기준 |
| --- | --- |
| `Proposed` | 요청을 접수했지만 분석하지 않음 |
| `Discovered` | 영향 범위와 검증 계획이 확정됨 |
| `Implementing` | 코드·문서 변경 중 |
| `Verifying` | 구현이 끝나고 검증 중 |
| `Completed` | `Passed` 판정과 필수 검증·완료 조건을 통과함 |

`Passed with Risk`는 기본적으로 `Completed`로 전이하지 않는다. 비배포 작업에서 프로젝트 책임자가 위험을 명시적으로 수용한 경우에만 예외적으로 종료할 수 있다. 확인단에서 불일치가 발견되면 Discovery를 다시 수행한다. 검증 실패는 Implementation으로 돌아가며, 구조적 가정이 틀렸다면 Discovery를 다시 수행한다.
