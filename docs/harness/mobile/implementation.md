# 모바일 작성단

공통 작성단의 `Must · Default · Consider`에 다음 규칙을 추가한다.

## Must

- TypeScript strict를 유지한다.
- 권한 요청 전 사용자 행동과 필요 이유를 확인한다.
- `EXPO_PUBLIC_*` 변수에 비밀값을 넣지 않는다.
- API 로딩·실패·빈 상태를 처리한다.
- iOS·Android 차이를 확인한다.
- 토큰과 인증값을 안전한 저장소에 보관한다.
- 네이티브 의존성 추가 전 Expo 호환성을 확인한다.

## Default

- Expo managed workflow를 우선한다.
- 서버 상태는 TanStack Query를 사용한다.
- 클라이언트 상태는 Zustand를 사용한다.
- 폼·입력 검증은 React Hook Form과 Zod를 사용한다.
- 공유 API client는 `packages/api`를 사용한다.
- 플랫폼별 분기는 필요한 위치에만 둔다.

## Consider

- EAS Update
- Push Notification
- Sentry
- 딥링크
- 오프라인 캐시
- Expo prebuild 또는 bare workflow
- 성능 측정·프로파일링
