# Loops

루프는 목표를 정하고, 실행하고, 결과를 확인하고, 피드백을 반영하는 반복 구조를 문서화한다.

## Harness와의 관계

```text
skills       어떻게 생각하고 작업할지
harness      한 작업을 확인·작성·검증하는 기준
loops        결과와 피드백을 받아 반복할 단계
pipelines    여러 루프와 도구를 연결하는 순서
```

루프의 기본 단위는 `Loop Run`이다. 하나의 목표를 기준으로 `Frame → Plan → Execute → Verify → Learn → Decide`를 수행한다.

```text
docs/loops/
├── model/             # 루프 단위·상태·피드백
├── core/              # 목적별 반복 루프
└── templates/         # 루프 실행 기록 형식
```

검증 결과에 따라 `Frame`, `Plan`, `Execute`, `Verify` 중 필요한 단계로 돌아간다. 모든 루프는 시작 조건, 입력, 단계, 산출물, 반복 조건, 종료·중단 조건을 정의한다.

계층별 루프가 실제로 필요해질 때 `docs/loops/<layer>/`에 추가한다. 배포 순서와 외부 시스템 연결은 `pipelines`에서 관리하고, 개별 작업의 검증 기준은 `harness`에서 관리한다.
