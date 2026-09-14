# 백엔드 검증단

공통 검증 게이트에 다음 변경 유형별 검증을 승격한다.

| 변경 유형 | 추가 필수 검증 |
| --- | --- |
| API 계약 | OpenAPI 생성, 계약 테스트, Orval 생성 |
| 인증·권한 | 역할별 성공·실패·우회 시도 검증 |
| DB·마이그레이션 | Flyway 적용·재적용·데이터 영향 검증 |
| JPA 조회 | 통합 테스트, 쿼리 수·N+1 확인 |
| CORS | 허용·비허용 Origin 검증 |
| 외부 API | mock 또는 sandbox 통합 검증 |

API 명세를 공유하는 모노레포는 `packages/api` 생성 결과와 웹·모바일 소비자의 typecheck를 검증한다. 관련 기준은 [`../../model/api-code-generation.md`](../../model/api-code-generation.md)를 따른다.
