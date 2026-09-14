# 스킬 카탈로그

이 저장소는 외부 스킬을 복제하지 않고 출처·역할·적용 범위·연결 위치를 문서화한다.

| 분류 | 출처 | 역할 | 적용 범위 |
| --- | --- | --- | --- |
| 공통 엔지니어링 | [mattpocock/skills](https://github.com/mattpocock/skills) | 정렬, 도메인 모델링, TDD, 디버깅, 설계, 리뷰 | 전체 프로젝트 |
| 공통 개발 방법론 | [obra/superpowers](https://github.com/obra/superpowers) | 브레인스토밍, 계획, TDD, 에이전트 기반 구현 흐름 | 전체 프로젝트 |
| 개인 정의 공통 스킬 | `problem-definition` | 증상·원인·영향 사용자·킹핀 문제 구조화 | 전체 프로젝트·기획 선행 단계 |
| 개인 정의 공통 스킬 | `archify` | 아키텍처·워크플로·시퀀스·데이터 흐름·라이프사이클 시각화 | 전체 프로젝트 |
| 제품 기획 | [phuryn/pm-skills](https://github.com/phuryn/pm-skills) | 발견, 가설, 전략, 리서치, 우선순위, 실행, 성장 | 기획·PM |
| 디자인 | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | AI 기반 디자인 판단과 UI 품질 개선 | 디자인·프론트엔드 |
| React·Next.js | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) `react-best-practices` | React·Next.js 성능과 구현 모범 사례 | 프론트엔드 |

`React·Next.js` 스킬은 사용자가 부르는 `vercel-react-best-practices`를 문서상의 표준 이름으로 사용한다. 원 저장소 경로는 `skills/react-best-practices`다.

## 분류 규칙

```text
공통 스킬       → docs/skills/shared/
기획 스킬       → docs/skills/product/
디자인 스킬     → docs/skills/design/
프론트엔드 스킬 → docs/skills/frontend/
백엔드 스킬     → docs/skills/backend/
모바일 스킬     → docs/skills/mobile/
```

출처의 모든 스킬을 무조건 설치하지 않는다. composition의 목적과 기술 계층에 필요한 스킬만 선택한다.

## 외부 스킬 기록 항목

- 저장소 URL과 원본 경로
- 스킬 또는 플러그인 이름
- 적용 계층
- 자동 호출인지 명시 호출인지
- 함께 사용하는 스킬
- 버전·커밋 또는 확인일
- 프로젝트 적용 시 예외
