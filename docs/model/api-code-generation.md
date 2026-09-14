# API 코드 생성

모노레포에서 백엔드가 작성한 OpenAPI 명세를 기준으로 Orval을 사용해 프론트엔드 TypeScript 타입과 API client를 생성한다.

## 책임 경계

```text
app/backend
└── API·springdoc-openapi가 명세의 원본을 제공

packages/api
└── Orval이 생성한 타입·API client를 제공

app/web·app/mobile
└── 생성된 API client를 사용
```

생성 코드는 직접 수정하지 않는다. API 변경은 백엔드에서 먼저 반영하고 명세와 생성 코드를 함께 갱신한다.

## 권장 구조

```text
project/
├── app/
│   ├── web/
│   └── backend/
├── packages/
│   └── api/
│       ├── generated/
│       ├── orval.config.ts
│       └── package.json
└── docs/
```

웹만 API를 사용하는 단독 프론트엔드에서는 `app/web` 내부 생성을 선택할 수 있다. 웹·모바일 또는 여러 앱이 API를 공유하는 모노레포에서는 `packages/api`를 기본 위치로 한다.

## 명세 입력

백엔드 실행 URL보다 파일 기반 명세를 기본으로 한다.

```text
Spring Boot
→ OpenAPI 파일 생성
→ Orval
→ packages/api/generated
```

실행 중인 서버의 `/v3/api-docs` URL을 직접 사용하는 방식은 개발 편의를 위한 선택 사항이다. CI와 재현 가능한 생성이 필요하면 고정된 명세 파일 또는 빌드 산출물을 사용한다.

## 생성 흐름

```text
백엔드 API 변경
→ OpenAPI 명세 생성
→ Orval 실행
→ 생성 코드 변경 확인
→ 프론트엔드 typecheck
→ 관련 테스트
```

## 필수 검증

- 백엔드 OpenAPI 생성 성공
- 명세 변경이 의도한 API 변경과 일치함
- Orval 생성 성공
- 생성 코드가 최신 명세와 일치함
- 생성 파일을 직접 수정하지 않음
- 웹·모바일 소비자의 typecheck 통과
- 관련 API client 테스트 통과

현재 저장소에는 springdoc-openapi 기반과 문서 설계만 있으며, Orval 의존성·`orval.config.ts`·생성 workflow는 아직 포함하지 않는다. 스캐폴딩에서 Orval을 실행하도록 확장할 때는 이 문서를 기준으로 한다.
