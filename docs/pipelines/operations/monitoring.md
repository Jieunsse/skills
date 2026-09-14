# Monitoring Pipeline

Monitoring Pipeline은 배포 후 health check, smoke test, 로그·메트릭 확인을 통해 운영 상태를 확인한다.

## 트리거

```text
배포 성공
승인된 수동 점검
schedule 기반 상태 점검  # workflow가 구현된 경우
```

## 흐름

```text
배포 산출물 확인
→ health check
→ smoke test
→ 오류 로그·핵심 메트릭 확인
→ 정상·경고·장애 판정
```

경고 또는 장애가 확인되면 Rollback Pipeline 또는 장애 대응 절차로 연결한다.
