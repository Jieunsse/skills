# 백엔드 기술 스택 선택

## Spring Boot 기본 구성

Spring Boot 백엔드 composition의 기본 의존성은 다음과 같다.

| 의존성 | 목적 |
| --- | --- |
| Spring Web | REST API와 HTTP 처리 |
| Spring Data JPA | ORM과 Repository |
| Lombok | 반복적인 Java 코드 축소 |
| Spring Security | 인증·인가 |
| Spring Validation | 요청과 입력 검증 |
| Flyway | 데이터베이스 스키마 변경 이력 |
| springdoc-openapi | OpenAPI 문서와 Swagger UI |

버전과 빌드 도구는 프로젝트에서 별도로 결정한다. 의존성은 Spring Boot가 관리하는 호환 버전을 우선 사용한다.

## 인증 기본값

모든 백엔드와 모노레포 백엔드 구성의 기본 인증 방식은 JWT다.

```text
기본 인증 방식                  → JWT
모노레포                       → JWT
모노레포 + 모바일              → JWT
분리된 프론트엔드·백엔드         → JWT
여러 클라이언트가 API 사용      → JWT
```

세션은 브라우저 전용 서비스에서 서버 측 세션 폐기와 관리가 명확히 필요한 경우에만 예외적으로 선택한다. 처음부터 JWT와 세션을 동시에 지원하지 않는다.

JWT를 사용할 때는 서명, issuer, audience, 만료, Refresh Token, 폐기 정책을 composition에서 명시한다. 토큰을 쿠키에 저장하는 경우에는 JWT라도 CSRF 대책을 별도로 검토한다.

## DDD 구조

기술별 최상위 폴더보다 도메인별 폴더를 우선한다.

```text
src/main/java/com/example/project/
├── shared/
│   ├── config/
│   ├── error/
│   └── security/
├── user/
│   ├── domain/
│   │   ├── model/
│   │   └── repository/
│   ├── application/
│   │   ├── service/
│   │   └── dto/
│   ├── adapter/
│   │   ├── in/web/
│   │   └── out/persistence/
│   └── UserConfiguration.java
└── ProjectApplication.java
```

```text
src/main/resources/
├── db/migration/
├── application.yml
├── application-local.yml
└── application-prod.yml
```

각 도메인의 기본 흐름은 다음과 같다.

```text
adapter/in/web → application → domain → adapter/out/persistence
```

도메인 계층은 Spring MVC, JPA, 외부 API에 직접 의존하지 않는다. 단순한 도메인에 불필요한 계층을 강제하지 않는다.

## CORS

CORS는 `shared/config`의 전역 웹 보안 설정에서 관리한다.

- 허용 Origin은 환경별 설정으로 관리한다.
- 개발·스테이징·운영 Origin을 분리한다.
- 허용 메서드와 헤더를 명시한다.
- 인증 쿠키 사용 시 `credentials`와 Origin을 함께 검토한다.
- 운영에서 무제한 `*` 허용을 사용하지 않는다.
- CORS와 CSRF를 같은 문제로 취급하지 않는다.

## API 문서

OpenAPI와 Swagger UI는 `springdoc-openapi`를 기본 연동 후보로 둔다. API 문서의 노출 범위, 인증 방식, 운영 환경에서의 접근 제한을 composition에서 결정한다.
