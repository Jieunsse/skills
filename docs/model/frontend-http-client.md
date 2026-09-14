# 프론트엔드 HTTP 클라이언트와 Axios adapter

## 기본 원칙

Axios는 모든 프로젝트의 필수 의존성이 아니다. 단순한 요청만 필요한 경우에는 기본 `fetch`를 우선 검토한다. 다음 요구가 있으면 Axios를 선택한다.

- 요청·응답 interceptor가 필요하다.
- timeout, 취소, 공통 오류 변환을 한 곳에서 관리해야 한다.
- 브라우저와 서버에서 같은 HTTP 클라이언트 인터페이스를 사용해야 한다.
- 파일 업로드·다운로드와 진행률 처리가 필요하다.

Axios를 선택하면 화면이나 훅에서 직접 `axios`를 호출하지 않고, 계층별 API client 또는 중앙 Axios instance를 사용한다. TanStack Query는 서버 상태와 캐시를 담당하고 Axios는 전송·interceptor만 담당한다.

## adapter 선택

| 실행 환경 | 기본 adapter | 선택 기준 |
| --- | --- | --- |
| 브라우저 | `xhr` | 브라우저 호환성과 업로드·다운로드 진행률이 중요할 때 |
| React Native + Expo | `xhr` | RN 환경에서 검증된 업로드·다운로드 동작을 우선할 때 |
| Next.js 서버 런타임 | `http` | Node.js 서버 요청을 기본으로 처리할 때 |
| 브라우저·서버 공통 구현 | `fetch` | 실행 환경의 Fetch 지원과 기능 차이를 검증한 경우 |
| 테스트 | custom adapter 또는 mock 경계 | 실제 네트워크를 호출하지 않고 전송 결과를 검증할 때 |

Axios가 환경에 맞는 adapter를 선택하게 두는 것도 기본값으로 허용한다. 특정 adapter를 강제할 때는 Axios instance 생성부 한 곳에서만 설정하고, 요청마다 임의로 바꾸지 않는다. Axios는 `xhr`, `http`, `fetch` 내장 adapter와 adapter 배열을 지원한다. ([Axios request config](https://github.com/axios/axios/blob/v1.x/docs/pages/advanced/request-config.md))

## 권장 instance 경계

```text
api/client
├── instance        baseURL, timeout, adapter
├── interceptors    인증, 오류 변환, 로깅
└── resources       도메인별 API 함수
```

- `baseURL`은 환경 변수로 주입한다.
- 공개 환경 변수에는 비밀값을 넣지 않는다.
- JWT를 사용하는 경우 access token 주입과 만료 처리를 한 곳에서 관리한다.
- 401 재발급 요청은 무한 재시도와 동시 요청 경합을 방지하는 정책을 먼저 정한다.
- CORS는 Axios 설정으로 해결하지 않고 서버 정책으로 처리한다.
- `withCredentials`는 쿠키 인증을 선택한 경우에만 서버 CORS·CSRF 정책과 함께 사용한다.

## 프로젝트별 기본값

```text
Next.js 브라우저 요청       → Axios 선택 시 xhr
Next.js 서버 요청           → http 또는 검증된 fetch
React + Vite                → Axios 선택 시 xhr
React Native + Expo         → Axios 선택 시 xhr
```

서버·브라우저 adapter를 동일하게 강제해야 하는 이유가 없다면 환경 기본값을 유지한다. adapter 선택은 성능보다 런타임 기능, 파일 처리, 테스트 가능성, 운영 환경 호환성 검증을 기준으로 결정한다.
