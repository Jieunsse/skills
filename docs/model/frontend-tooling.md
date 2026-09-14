# 프론트엔드 품질 도구와 Storybook

## ESLint

ESLint는 TypeScript·React 코드의 잠재적 오류와 프로젝트 규칙 위반을 찾는 정적 분석 도구다.

모든 웹 프론트엔드 구성에 기본으로 포함한다.

- TypeScript와 React에 맞는 규칙 사용
- 프레임워크별 권장 규칙 적용
- 사용하지 않는 import·변수 검사
- Hook 규칙 검사
- CI에서 오류를 검증
- 포맷팅 규칙은 Prettier와 중복시키지 않음

## Prettier

Prettier는 코드 형식을 일관되게 만드는 포맷터다.

모든 웹 프론트엔드 구성에 기본으로 포함한다.

- TypeScript, JSX, JSON, CSS, Markdown 등 지원 파일 포맷
- 저장 시 포맷을 권장
- CI에서 포맷 검사
- ESLint는 코드 품질, Prettier는 코드 형식을 담당

## 설정 위치

### frontend-only

프로젝트 루트에서 ESLint와 Prettier 설정을 관리한다.

### monorepo

루트 설정은 공통 규칙을 담당하고, `app/web`은 웹 계층의 추가 규칙만 담당한다.

```text
project/
├── eslint.config.js       # 공통 및 프론트엔드 기준
├── prettier.config.*      # 저장소 공통 포맷
├── app/
│   └── web/
│       ├── eslint.config.* # 필요한 경우 웹 전용 보완
│       └── docs/
└── ...
```

동일한 규칙을 루트와 `app/web`에 복사하지 않는다. 계층별 예외만 하위 설정에 둔다.

## 기본 검증 순서

```text
format check
→ lint
→ typecheck
→ test
→ build
```

실제 명령어와 설정 파일 형식은 선택한 프레임워크와 패키지 매니저에 맞춰 composition에서 결정한다.

## Storybook 도입 기준

Storybook은 UI 컴포넌트와 상태를 애플리케이션 밖에서 독립적으로 개발·문서화·검증하는 선택 도구다.

다음 조건 중 하나 이상이면 도입을 검토한다.

- 여러 화면이나 제품에서 컴포넌트를 반복 사용한다.
- 공통 컴포넌트와 디자인 시스템을 별도로 관리한다.
- 로딩·오류·빈 상태·권한 등 UI 상태 조합이 많다.
- 디자이너·기획자·개발자가 UI를 독립적으로 검토해야 한다.
- 시각적 회귀 검증이나 접근성 검증이 필요하다.
- 컴포넌트 문서를 실제 사용 예시와 함께 제공해야 한다.

다음 경우에는 도입하지 않는다.

- 화면과 컴포넌트가 적은 초기 프로토타입
- 재사용 UI가 거의 없는 단순한 내부 도구
- Storybook 설정·스토리 유지 비용이 얻는 효과보다 큰 경우

Storybook 도입 시 모든 컴포넌트에 스토리를 강제하지 않고, 공유 컴포넌트와 복잡한 상태부터 시작한다. Storybook은 Next.js와 React + Vite를 모두 지원하며, 스토리는 컴포넌트의 의미 있는 상태를 표현한다. ([Storybook 시작하기](https://storybook.js.org/docs), [Story란 무엇인가](https://storybook.js.org/docs/get-started/whats-a-story))
