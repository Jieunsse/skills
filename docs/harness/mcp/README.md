# MCP 연결 계층

MCP(Model Context Protocol)는 `harness` 아래에서 외부 도구를 연결하고 실행하는 기반으로 관리한다.

```text
skills       MCP를 어떻게 활용할지
harness/mcp  연결·권한·실행 환경
loops        MCP를 포함한 반복 작업
pipelines    MCP 작업을 전체 흐름에 연결
compositions 프로젝트별 MCP 선택
```

MCP 문서는 연결 계약과 권한을 설명하며 인증값과 비밀 정보는 저장하지 않는다.

주요 제공자는 Figma, Notion, Slack, Linear다.

## Provider 문서 형식

```text
목적
담당 기능
연결 대상
필요한 권한
입력과 출력
사용 조건
주의하거나 금지할 작업
실패 시 대체 경로
데이터·보안 고려 사항
관련 skills·pipelines·compositions
```
