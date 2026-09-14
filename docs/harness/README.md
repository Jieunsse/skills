# Harness

하네스는 스킬과 파이프라인이 사용할 실행 환경, 도구, 검증 장치를 문서화한다.

```text
docs/harness/
├── shared/
├── frontend/
├── backend/
└── mobile/
```

공통 도구와 계층별 도구를 분리하고, 도구의 설치 방법·전제 조건·입출력·실패 시 대응을 기록한다.

외부 도구 연결은 `harness/mcp/`에서 관리한다. 주요 MCP 제공자는 Figma, Notion, Slack, Linear다.
