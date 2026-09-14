# 백엔드 작성단

공통 작성단의 `Must · Default · Consider`에 다음 규칙을 추가한다.

## Must

- 요청 입력을 validation으로 검증한다.
- 인증·인가와 역할 경계를 명시한다.
- 도메인 계층은 Spring MVC, JPA, 외부 API에 직접 의존하지 않는다.
- API 계약 변경 시 OpenAPI 명세를 갱신한다.
- 스키마 변경은 Flyway 마이그레이션으로 관리한다.
- 비밀정보와 토큰을 로그·응답에 노출하지 않는다.
- CORS는 환경별 허용 Origin으로 제한한다.

## Default

- 도메인별 `domain → application → adapter` 구조를 유지한다.
- 트랜잭션은 application 계층에서 관리한다.
- 예외 응답 형식을 일관되게 유지한다.
- Swagger UI는 개발·검증 환경에서 사용한다.
- API 변경 시 Orval 생성물과 소비자 typecheck를 함께 확인한다.

## Consider

- Outbox와 이벤트 기반 처리
- 캐시
- 비동기 작업
- rate limit
- 분산 추적
- CQRS 분리
