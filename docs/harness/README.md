# Harness

하네스는 AI와 개발자가 코드베이스를 확인하고, 코드를 작성하고, 결과를 검증하는 작업 방식을 문서화한다.

```text
docs/harness/
├── discovery.md       # 기존 코드베이스 확인
├── implementation.md  # 코드 작성
├── verification.md    # 검증 게이트
├── verification-matrix.md
├── frontend/
└── mcp/
```

하네스는 `확인단 → 작성단 → 검증단`의 3개 레이어로 구성한다. 각 단계는 다음 단계로 넘어가기 위한 진입 조건을 가지며, 검증 실패 시 작성단으로 돌아간다.

공통 도구와 계층별 도구를 분리하고, 도구의 설치 방법·전제 조건·입출력·실패 시 대응을 기록한다. Codex와 Claude는 동일한 하네스 규칙을 사용하며 별도 규칙 문서로 분리하지 않는다.

외부 도구 연결은 `harness/mcp/`에서 관리한다. 주요 MCP 제공자는 Figma, Notion, Slack, Linear다.
