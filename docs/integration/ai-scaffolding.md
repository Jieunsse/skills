# AI 대화형 스캐폴딩

사용자-facing CLI 이름은 `project-starter`로 예약한다. 아직 npm 패키지는 배포하지 않았고, 현재 실행 가능한 도구는 `scripts/scaffold.mjs`다.

빈 프로젝트에서 사용자가 이 문서 저장소의 GitHub 주소를 AI에게 제공하고 자연어로 프로젝트 생성을 요청할 수 있도록 설계한다.

## 처리 흐름

```text
사용자가 저장소 URL 제공
→ AI가 README·AGENTS.md·관련 composition 읽기
→ 자연어 요청에서 목적·제약·패키지 매니저·HTTP client 요구 추출
→ preset 선택
→ 선택 결과와 생성 계획 확인
→ 공식 생성기 실행
→ 문서와 계층별 구조 검증
```

## preset

| 목적 | preset |
| --- | --- |
| 공개 웹 | `frontend-public-web` |
| 관리자·SPA | `frontend-spa` |
| Spring Boot API | `backend-spring-boot` |
| 공개 웹 + 백엔드 모노레포 | `monorepo-web-backend-public` |
| 관리자 + 백엔드 모노레포 | `monorepo-web-backend-admin` |
| 웹 + 백엔드 + 모바일 모노레포 | `monorepo-web-backend-mobile` |

## 목표 CLI 인터페이스

```bash
pnpm create project-starter . \
  --preset=monorepo-web-backend-public \
  --execute
```

현재 저장소에서는 다음 명령으로 동일한 기능을 실행할 수 있다.

```bash
node scripts/scaffold.mjs \
  --target=../new-project \
  --preset=monorepo-web-backend-public \
  --css=tailwind \
  --package-manager=pnpm \
  --turborepo=yes \
  --deployment=vercel-supabase \
  --tracker=linear \
  --execute
```

사용자의 표현이 예시와 달라도 의미가 같으면 동일한 preset으로 매핑한다. preset으로 결정할 수 없는 내용은 실행 전에 질문하거나 기본값을 명시한다.

## 책임 경계

- AI: 자연어 해석, 문서 확인, preset 선택, 실행 전 브리핑
- 스캐폴딩 스크립트: 선택 검증, 공식 생성기 실행, 기본 문서 배치
- composition: 프로젝트 구조와 세부 규칙의 원본

AI가 이 저장소를 자동으로 내려받아 실행하는 기능은 별도 bootstrap 단계로 추가한다. 현재는 사용자가 저장소를 제공하고 AI가 접근할 수 있다는 전제에서 동작한다.
