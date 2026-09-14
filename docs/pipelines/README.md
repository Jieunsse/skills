# Pipelines

파이프라인은 스킬, 하네스, 루프를 이슈·PR·CI·배포 같은 외부 이벤트와 연결하는 작업·배포·운영 흐름이다.

```text
docs/pipelines/
├── frontend/
├── deployment/
├── github/
└── project-management/
```

파이프라인 문서는 트리거, 입력, 단계, 출력, 검증, 실패 대응을 설명한다. 기본 트리거는 [`trigger-model.md`](trigger-model.md)에 두며, 개별 Pipeline은 기본값과 다른 경우에만 차이를 명시한다.

현재 이 저장소에는 흐름 정의와 스캐폴딩 위저드만 있다. `scripts/scaffold.mjs --execute`만 실제 실행 트리거이며, PR·merge·tag·schedule 기반 자동화는 생성 대상 프로젝트의 CI/CD workflow가 구현될 때 동작한다. 공통 기준은 [`../model/operating-model.md`](../model/operating-model.md)를 따른다.
