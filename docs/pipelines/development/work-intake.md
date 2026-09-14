# Work Intake Pipeline

Work Intake Pipeline은 사용자 요청 또는 선택한 업무 관리 도구의 준비된 이슈를 적절한 Loop Run으로 연결한다.

## 트리거

```text
사용자 요청
GitHub Issue Ready
Linear Todo
```

## 흐름

```text
요청·이슈 확인
→ 문제 정의·기획 필요 여부 판단
→ 적합한 Loop 선택
→ Engineering Loop 필요 시 Harness Run 시작
→ 관련 이슈·PR 연결
```

## Loop 선택

| 상태 | 시작 Loop |
| --- | --- |
| 문제·원인이 불명확함 | 문제 정의 Loop |
| 목표·수용 기준이 불명확함 | 제품 기획 Loop |
| 코드·문서·설정 변경 범위가 명확함 | 엔지니어링 구현 Loop |
| 구조적 결합·병목이 반복됨 | 아키텍처 피드백 Loop |

## 출력

- 선택된 Loop Run
- 필요 시 Harness Run
- 관련 이슈·PR 연결

이 Pipeline은 상태 변경만으로 코드 작성이나 배포를 자동 실행하지 않는다. AI 또는 개발자가 시작한다.
