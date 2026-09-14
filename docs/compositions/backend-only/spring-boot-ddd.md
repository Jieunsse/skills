# Backend-only: Spring Boot DDD

## 목적

Spring Boot 기반 백엔드와 API를 별도 Git 저장소에서 관리하는 구성이다.

## 기본 구성

```text
Spring Boot
Spring Web
Spring Data JPA
Lombok
Spring Security
Spring Validation
Flyway
springdoc-openapi
JWT
DDD package structure
```

## 디렉터리 원칙

도메인별 패키지를 최상위 단위로 두고, 각 도메인 안에서 `domain`, `application`, `adapter`를 나눈다. 공통 보안·설정·오류 처리는 `shared`에 둔다.

## 데이터베이스

스키마 변경은 `src/main/resources/db/migration/`의 Flyway 마이그레이션을 원본으로 관리한다. JPA 자동 스키마 생성에 의존하지 않는다.

## 보안

JWT를 기본 인증 방식으로 사용한다. 서명 검증, issuer, audience, 만료, Refresh Token, 폐기 전략을 프로젝트에서 결정한다.

## API와 CORS

REST API는 OpenAPI로 문서화하고 Swagger UI를 개발·검증에 사용한다. CORS는 환경별 허용 Origin을 명시하는 전역 설정으로 관리한다.
