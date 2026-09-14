# GitHub Actions CI/CD

프로젝트 프로파일과 변경된 계층에 맞춰 검증·빌드·배포 작업을 실행한다.

최소 단계:

1. 의존성 설치
2. 포맷·정적 검사
3. 테스트
4. 빌드
5. 배포 프로파일에 따른 배포

프론트엔드, 백엔드, 모바일은 독립적으로 검증할 수 있어야 한다. 실제 workflow 파일과 실행 명령은 생성 프로젝트의 스택에 맞춰 결정한다.

Turborepo를 선택한 모노레포는 JS/TS 계층을 `turbo run`으로 검증하고, Spring Boot·Gradle 백엔드는 별도 job 또는 step으로 실행한다. 캐시 설정과 `--filter` 기준은 [`monorepo-turborepo.md`](../../model/monorepo-turborepo.md)를 따른다.
