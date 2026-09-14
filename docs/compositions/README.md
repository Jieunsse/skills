# Compositions

composition은 저장소 프로파일, 기술 계층, 배포 프로파일, GitHub 운영, 업무 관리, 스킬·하네스·루프·파이프라인을 조합한 프로젝트 스캐폴딩 명세다.

```text
docs/compositions/
├── frontend-only/
├── backend-only/
└── monorepo/
```

각 composition은 생성할 구조, 적용할 문서, 외부 의존성, 설치 순서, 생성 후 검증 방법을 정의한다. 현재는 문서 명세만 관리한다.

프론트엔드 목적별 기본 구성:

```text
frontend-only/public-web.md
frontend-only/spa.md
frontend-only/typed-style.md
```

모노레포 구성은 공개 웹, 관리자 웹, 웹·백엔드·모바일 조합으로 나눈다.

프론트엔드 품질 도구는 [`docs/model/frontend-tooling.md`](../model/frontend-tooling.md)를 따르며, ESLint·Prettier는 기본값, Storybook은 조건부 선택으로 관리한다.

백엔드 기본 composition:

```text
backend-only/spring-boot-ddd.md
```

Spring Boot 구성은 JPA, Lombok, Spring Web, Spring Security, Validation, Flyway, springdoc-openapi를 기본 후보로 두며 JWT를 기본 인증 방식으로 사용한다.
