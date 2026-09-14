# 대화형 프로젝트 스캐폴딩

AI는 사용자가 제공한 이 저장소의 주소를 읽고, 자연어 프로젝트 요청을 적절한 `composition`과 `preset`으로 매핑할 수 있다.

특정 문구를 트리거로 요구하지 않는다. 다음 정보를 의미 단위로 해석한다.

```text
저장소 형태
프로젝트 목적
기술 계층
배포 프로파일
업무 관리 도구
선택적 기능
```

## 해석 예시

```text
웹 모노레포 생성
→ monorepo-web-backend-public 또는 monorepo-web-backend-admin

웹과 모바일이 함께 있는 모노레포
→ monorepo-web-backend-mobile

공개 웹서비스
→ frontend-public-web

관리자·대시보드
→ frontend-spa

Spring Boot API 서버
→ backend-spring-boot
```

목적이 모호하면 AI는 가장 가까운 기본 preset을 제안하고, 생성 전에 선택 결과를 보여준다.

## 실행 규칙

```bash
node scripts/scaffold.mjs \
  --target=../new-project \
  --preset=monorepo-web-backend-public \
  --execute
```

AI는 사용자의 자연어 요청을 위 명령의 preset과 선택 옵션으로 변환한다. `--execute` 전에는 대상 경로, 선택 결과, 실행할 공식 생성기를 사용자에게 보여준다.

## 안전 규칙

- 대상 디렉터리가 비어 있지 않으면 중단한다.
- 사용자가 제공한 저장소 문서를 먼저 읽는다.
- 임의의 원격 스크립트를 실행하지 않는다.
- 공식 생성기와 문서에 명시된 명령만 실행한다.
- 인증값·비밀값을 생성하거나 기록하지 않는다.
- 생성 후 `AGENTS.md`, 루트 `docs`, 계층별 `docs`를 확인한다.
