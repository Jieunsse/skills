# Loop Run 생명주기

```text
Proposed
→ Framing
→ Planning
→ Executing
→ Verifying
→ Learning
→ Deciding
```

## 결정 상태

```text
Deciding
├── Continue  다음 반복 수행
├── Revise    이전 단계로 돌아가 수정
├── Stop      목표 달성 또는 반복 가치 부족
├── Block     외부 정보·권한·환경 대기
└── Abandon   목표를 폐기
```

## 복귀 기준

| 발견 사항 | 복귀 단계 |
| --- | --- |
| 문제나 목표가 잘못 정의됨 | `Frame` |
| 해결 방향이나 범위가 잘못됨 | `Plan` |
| 구현 오류가 발견됨 | `Execute` |
| 검증 방법이 부족함 | `Verify` |
| 목표가 달성됨 | `Stop` |

루프는 `Consider` 수준의 개선만으로 무한 반복하지 않는다. 추가 반복의 기대 효과가 비용과 위험보다 낮으면 종료한다.
