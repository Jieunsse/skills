# 운영 모델과 트리거

이 저장소의 스킬, 하네스, 루프, 파이프라인, composition은 순차적인 계층이 아니라 서로 다른 책임을 가진 운영 요소다.

```text
사용자 요청·이슈·피드백
→ 적합한 Loop Run 선택
→ 필요 시 Harness Run 실행
→ 검증 결과와 상태 변화
→ Pipeline이 이슈·PR·CI·배포를 연결
```

## 책임과 트리거

| 요소 | 책임 | 시작 트리거 | 종료 또는 다음 연결 |
| --- | --- | --- | --- |
| `skills` | 판단 방법과 전문 지식 제공 | 관련 작업이 선택됨 | Loop·Harness에서 참조 |
| `loops` | 반복 단계와 피드백 복귀 관리 | 요청·이슈·피드백 | Harness Run 또는 다음 Loop Run |
| `harness` | 한 작업의 확인·작성·검증 통제 | Engineering Loop의 코드·문서 변경 단계 | Verification Report와 판정 |
| `pipelines` | 이슈·PR·CI·배포 같은 외부 흐름 연결 | 수동 명령, PR, merge, tag, schedule | 다음 운영 이벤트 |
| `compositions` | 프로젝트별 선택·기본값 조합 | 새 프로젝트 스캐폴딩 | 생성 구조와 적용 문서 |

## Engineering Loop와 Harness 매핑

```text
Engineering Loop
├── Frame
├── Discover  → Harness Discovery
├── Plan      → Harness Implementation Plan
├── Execute   → Harness Implementation Change Set
├── Verify    → Harness Verification
├── Learn
└── Decide
```

`Frame`, `Learn`, `Decide`는 Loop의 책임이다. 코드베이스 조사, 변경, 검증 증거는 Harness의 책임이다.

## 실행 상태

이 저장소의 하네스·루프·파이프라인 문서는 기본적으로 실행 규칙이다. 문서 자체가 자동으로 작업을 시작하거나 다음 단계로 넘기지 않는다.

- `scripts/scaffold.mjs --execute`는 현재 실제로 실행되는 트리거이며, 공식 생성기와 기본 문서 배치를 수행한다.
- AI 또는 개발자는 요청과 작업 상태를 기준으로 Loop와 Harness 규칙을 적용한다.
- PR·merge·tag·schedule 기반 Pipeline은 생성 대상 프로젝트의 CI/CD workflow가 구현될 때 자동화된다.
- 자동화가 없는 Pipeline은 수동 또는 AI 실행 절차로 취급하며, 자동 실행된다고 표현하지 않는다.

## 공통 상태 전이

```text
요청·이슈
→ Loop Run: Proposed
→ 목표·범위 명확화
→ Harness Run: Discovery
→ Implementation
→ Verification
→ Loop Run: Learn·Decide
→ Continue / Revise / Block / Stop
```

검증 실패는 Implementation 또는 Discovery로 돌아간다. `Passed with Risk`는 위험 수용 기록만으로 완료가 되지 않으며, 프로젝트의 명시적인 수용과 비배포 작업이라는 조건이 충족될 때만 예외적으로 종료할 수 있다.
