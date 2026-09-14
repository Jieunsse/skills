# Pipeline Run 정의

`Pipeline Run`은 특정 외부 이벤트를 받아 작업·검증·배포·운영 결과를 만드는 실행 단위다.

```text
사용자 요청
→ Loop Run
→ Harness Run
→ PR
→ Pipeline Run
→ 배포·운영 결과
```

Loop Run은 문제 해결의 반복 단위이고, Harness Run은 코드 작업의 품질 단위다. Pipeline Run은 이슈, PR, CI, 배포 환경처럼 외부 운영 요소를 연결한다.
