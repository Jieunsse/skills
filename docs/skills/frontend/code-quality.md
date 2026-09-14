# 프론트엔드 코드 품질 규칙

React·Next.js·React + Vite 기반 프론트엔드 코드에 적용하는 기본 규칙이다.

코드 품질은 가독성, 예측 가능성, 응집도, 결합도를 함께 고려한다. 네 기준이 충돌하면 변경 위험과 이해 비용이 낮아지는 쪽을 선택하고, 그 이유가 반복되면 composition에 기록한다.

## 1. 가독성

가독성(Readability)은 코드가 읽기 쉬운 정도다. 코드를 변경하려면 먼저 코드의 동작을 이해할 수 있어야 한다.

읽기 좋은 코드는 한 번에 고려해야 하는 맥락이 적고, 위에서 아래로 자연스럽게 읽힌다.

### 전략

- 같이 실행되지 않는 코드 분리하기
- 구현 상세 추상화하기
- 로직 종류에 따라 합쳐진 함수 쪼개기
- 복잡한 조건에 이름 붙이기
- 매직 넘버에 이름 붙이기
- 시점 이동 줄이기
- 삼항 연산자 단순하게 하기

참고:

- [같이 실행되지 않는 코드 분리하기](https://frontend-fundamentals.com/code-quality/code/examples/submit-button.html)
- [구현 상세 추상화하기](https://frontend-fundamentals.com/code-quality/code/examples/login-start-page.html)
- [로직 종류에 따라 합쳐진 함수 쪼개기](https://frontend-fundamentals.com/code-quality/code/examples/use-page-state-readability.html)
- [복잡한 조건에 이름 붙이기](https://frontend-fundamentals.com/code-quality/code/examples/condition-name.html)
- [매직 넘버에 이름 붙이기](https://frontend-fundamentals.com/code-quality/code/examples/magic-number-readability.html)
- [시점 이동 줄이기](https://frontend-fundamentals.com/code-quality/code/examples/user-policy.html)
- [삼항 연산자 단순하게 하기](https://frontend-fundamentals.com/code-quality/code/examples/ternary-operator.html)

## 2. 예측 가능성

예측 가능성(Predictability)은 동료가 함수나 컴포넌트의 동작을 얼마나 쉽게 예상할 수 있는지를 말한다.

이름, 파라미터, 반환 값만 보고도 동작을 이해할 수 있도록 일관된 규칙을 따른다.

### 전략

- 이름 겹치지 않게 관리하기
- 같은 종류의 함수는 반환 타입 통일하기
- 숨은 로직 드러내기

참고:

- [이름 겹치지 않게 관리하기](https://frontend-fundamentals.com/code-quality/code/examples/http.html)
- [같은 종류의 함수는 반환 타입 통일하기](https://frontend-fundamentals.com/code-quality/code/examples/use-user.html)
- [숨은 로직 드러내기](https://frontend-fundamentals.com/code-quality/code/examples/hidden-logic.html)

## 3. 응집도

응집도(Cohesion)는 함께 수정되어야 하는 코드가 실제로 함께 위치하고 함께 변경되는 정도다.

응집도가 높으면 한 부분을 수정할 때 의도치 않은 다른 영역의 오류를 줄일 수 있다.

### 전략

- 함께 수정되는 파일을 같은 디렉터리에 두기
- 매직 넘버 없애기
- 폼의 응집도 고려하기

참고:

- [함께 수정되는 파일을 같은 디렉터리에 두기](https://frontend-fundamentals.com/code-quality/code/examples/code-directory.html)
- [매직 넘버 없애기](https://frontend-fundamentals.com/code-quality/code/examples/magic-number-cohesion.html)
- [폼의 응집도 생각하기](https://frontend-fundamentals.com/code-quality/code/examples/form-fields.html)

## 4. 결합도

결합도(Coupling)는 코드를 수정했을 때 영향을 받는 범위다. 영향 범위가 작고 예측 가능할수록 변경하기 쉽다.

### 전략

- 책임을 하나씩 관리하기
- 위험성이 낮은 중복 코드는 허용하기
- Props Drilling 줄이기

참고:

- [책임을 하나씩 관리하기](https://frontend-fundamentals.com/code-quality/code/examples/use-page-state-coupling.html)
- [중복 코드 허용하기](https://frontend-fundamentals.com/code-quality/code/examples/use-bottom-sheet.html)
- [Props Drilling 줄이기](https://frontend-fundamentals.com/code-quality/code/examples/item-edit-modal.html)

## 충돌 시 판단 기준

가독성과 응집도는 항상 같은 방향으로 움직이지 않는다.

- 함께 수정되지 않으면 오류가 발생할 위험이 높으면 응집도를 우선해 공통화·추상화한다.
- 변경 위험이 낮고 추상화가 이해 비용을 높이면 가독성을 우선하고 중복을 허용한다.
- 결합도가 커지는 추상화는 만들지 않는다.
- 하나의 책임을 숨기는 유틸리티나 컴포넌트를 만들지 않는다.
