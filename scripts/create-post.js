/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

// 사용법: npm run new "포스트 제목"
const args = process.argv.slice(2);
const title = args[0] || 'New Post';

// 슬러그 생성 (제목을 파일명으로 변환: 소문자, 띄어쓰기는 대시로, 특수문자 제거)
const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w\uAC00-\uD7A3-]/g, '');

const date = new Date();
const yyyy = date.getFullYear();
const mm = String(date.getMonth() + 1).padStart(2, '0');
const dd = String(date.getDate()).padStart(2, '0');
const today = `${yyyy}-${mm}-${dd}`;

// 파일명 예시: 2025-01-10-new-post.mdx
const fileName = `${today}-${slug}.mdx`;
// 경로 수정: scripts 폴더가 src 안에 있다면 상위(../)로 두 번 나가야 프로젝트 루트입니다.
// 하지만 안전하게 process.cwd() (명령어를 실행하는 프로젝트 루트 위치)를 기준으로 잡습니다.
const filePath = path.join(process.cwd(), 'src/posts', fileName);

// 기본 템플릿 내용
const content = `---
title: "${title}"
date: "${today}"
description: "여기에 설명을 입력하세요."
---

## 작성 시작

`;

// posts 폴더가 없으면 생성 (에러 방지)
const dirPath = path.dirname(filePath);
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

if (fs.existsSync(filePath)) {
  console.error('❌ 이미 존재하는 파일입니다:', fileName);
} else {
  fs.writeFileSync(filePath, content);
  console.log('✅ 포스트 생성 완료:', fileName);
  console.log('📂 파일 위치:', filePath);
}