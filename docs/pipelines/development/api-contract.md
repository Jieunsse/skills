# API Contract Pipeline

API Contract Pipeline은 백엔드 API 변경을 OpenAPI 명세와 Orval 생성 코드, 웹·모바일 소비자까지 연결한다. PR Validation Pipeline의 조건부 하위 Pipeline이다.

## 트리거

```text
app/backend의 API·DTO·Controller·OpenAPI 변경
packages/api 변경
```

## 흐름

```text
백엔드 API 변경
→ OpenAPI 명세 생성
→ Orval 생성
→ 생성 코드 diff 확인
→ web·mobile typecheck
→ 계약 검증
```

## 실패 기준

- OpenAPI 명세 생성 실패
- Orval 생성 실패
- 생성 코드가 최신 명세와 불일치
- 웹·모바일 소비자 typecheck 실패
- 생성 파일 직접 수정

상세 구조와 생성 코드 위치는 [`../../model/api-code-generation.md`](../../model/api-code-generation.md)를 따른다.
