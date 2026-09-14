# Pipeline Run 산출물

모든 Pipeline Run은 다음 정보를 기록하거나 CI·배포 플랫폼에서 추적할 수 있어야 한다.

```text
트리거 이벤트
대상 브랜치·커밋·PR
변경 계층
선택된 composition
실행한 단계
검증 결과
생성 산출물
승인 기록
실패·롤백 결과
```

실행 결과는 PR 상태, 배포 URL, 이미지 태그, OpenAPI 산출물, 마이그레이션 버전, 로그 링크처럼 Pipeline 유형에 맞는 증거로 남긴다.
