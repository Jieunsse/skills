# Harness Run 산출물

작업 산출물은 기본적으로 `docs/work-items/<work-item>.md` 하나에 기록한다. 문서에는 다음 섹션을 둔다.

```markdown
# Work Item

## Metadata

- 상태:
- 작성일:
- 관련 이슈:
- 관련 PR:

## Discovery Report

## Implementation Plan

## Change Set

## Verification Report
```

## 산출물 책임

| 산출물 | 책임 |
| --- | --- |
| `Discovery Report` | 영향 범위·규칙·위험·검증 계획 정의 |
| `Implementation Plan` | 파일별 변경 순서와 완료 조건 정의 |
| `Change Set` | 실제 수정 파일과 테스트·문서 변경 기록 |
| `Verification Report` | 실행 명령·결과·미실행 검증·잔여 위험 기록 |

큰 작업만 동일한 이름의 하위 문서로 분리한다. 검증 명령을 실행하지 못한 경우에도 미실행 사유와 남은 위험을 기록한다.
