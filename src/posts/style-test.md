---
title: "블로그 스타일 테스트"
date: "2025-01-10"
description: "커스텀된 마크다운 스타일을 확인합니다."
---

## 1. 텍스트 스타일
일반 텍스트입니다. **굵은 글씨**와 *기울임꼴* 그리고 ~~취소선~~입니다.
[네이버 링크](https://naver.com)는 파란색이어야 합니다.

## 2. 인라인 코드
변수명은 `const result = true;` 이렇게 깔끔하게 배경색이 들어가고 백틱이 없어야 합니다.

## 3. 코드 블록 (Syntax Highlighting)
```typescript
interface User {
  id: number;
  name: string;
}

function greeting(user: User): void {
  console.log(`Hello, ${user.name}`);
}
```

### 예상 결과
1.  **코드 블록:** 짙은 배경에 TypeScript 문법 색상이 적용됨.
2.  **인라인 코드:** `const result = true;` 부분에 백틱 없이 회색 배경+붉은 글씨가 적용됨.
3.  **인용구:** 깔끔한 박스 형태.

이 설정이면 개발 블로그로서 손색없는 가독성을 가질 수 있습니다.

**다음 단계 제안:**
"글이 많아지면 **카테고리(태그) 기능**이나 **페이지네이션**이 필요할 텐데, 태그별로 글을 모아보는 기능을 추가해 드릴까요?"