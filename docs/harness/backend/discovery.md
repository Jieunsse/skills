# 백엔드 확인단

공통 코드베이스 확인단에 다음 항목을 추가한다.

- 변경 API와 OpenAPI 소비자
- 관련 도메인, application, adapter 경계
- JWT 인증과 역할·권한 경계
- 요청 DTO와 validation 규칙
- JPA 조회, 트랜잭션, N+1 위험
- Flyway 마이그레이션과 기존 데이터 영향
- 환경별 CORS 허용 Origin
- 환경 변수, 비밀정보, 외부 서비스 연결
- Orval 생성 코드와 웹·모바일 소비자 영향

## 종료 조건

- 변경 API와 소비자가 확인됐다.
- 도메인·데이터·보안 영향이 기록됐다.
- 마이그레이션 필요 여부가 결정됐다.
- OpenAPI와 API client 검증 필요 여부가 결정됐다.
