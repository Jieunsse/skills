# Harness

하네스는 AI와 개발자가 코드베이스를 확인하고, 코드를 작성하고, 결과를 검증하는 작업 방식을 문서화한다.

```text
docs/harness/
├── model/             # 작업 단위·상태·산출물
├── discovery.md       # 기존 코드베이스 확인
├── implementation.md  # 코드 작성과 규칙 라벨
├── verification.md    # 검증 게이트와 판정
├── verification-matrix.md
├── frontend/
└── mcp/
```

하네스는 `확인단 → 작성단 → 검증단`의 3개 레이어로 구성한다. 각 단계는 다음 단계로 넘어가기 위한 진입 조건을 가지며, 검증 실패 시 작성단으로 돌아간다.

하네스의 기본 작업 단위는 `Harness Run`이다. 하나의 사용자 요청을 분석하고, 변경하고, 검증하는 전체 작업을 하나의 실행 단위로 관리한다. 각 작업은 `Proposed → Discovered → Implementing → Verifying → Completed` 상태를 거치며, 필요할 때 `Blocked` 또는 `Abandoned`로 종료한다.

작업 산출물은 기본적으로 `docs/work-items/<work-item>.md` 한 문서에 기록한다. 큰 작업만 `discovery.md`, `implementation.md`, `verification.md`로 분리한다.

공통 도구와 계층별 도구를 분리하고, 도구의 설치 방법·전제 조건·입출력·실패 시 대응을 기록한다. Codex와 Claude는 동일한 하네스 규칙을 사용하며 별도 규칙 문서로 분리하지 않는다.

외부 도구 연결은 `harness/mcp/`에서 관리한다. 주요 MCP 제공자는 Figma, Notion, Slack, Linear다.
