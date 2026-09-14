# Release and Deployment Pipeline

Release and Deployment Pipeline은 검증된 변경을 선택한 배포 프로파일의 환경에 안전하게 반영한다.

## 트리거

| 프로파일 | 트리거 |
| --- | --- |
| Vercel, 마이그레이션 없음 | 기본 브랜치 merge |
| Vercel, 마이그레이션 있음 | 승인된 release 절차 |
| AWS staging | `workflow_dispatch` |
| AWS production | GitHub Environment 승인 후 `workflow_dispatch` |

## 입력

- 성공한 PR Validation 결과
- 배포 대상 브랜치·커밋
- 배포 환경
- 선택한 배포 프로파일
- 환경 변수·비밀정보 검증 결과
- 데이터 마이그레이션 필요 여부

## 흐름

```text
배포 대상 확정
→ 빌드 산출물 생성
→ 환경 변수 검증
→ 데이터 마이그레이션 여부 확인
→ 필요 시 승인된 Data Migration Pipeline
→ 배포
→ health check
→ smoke test
→ Monitoring Pipeline
```

## 출력

- 배포 환경과 커밋 식별자
- 배포 URL 또는 서비스 버전
- health check·smoke test 결과
- Monitoring Pipeline 연결 결과

## 실패 처리

배포, health check, smoke test가 실패하면 Rollback Pipeline을 시작한다. 데이터베이스 변경은 애플리케이션 롤백과 분리해 판단한다.
