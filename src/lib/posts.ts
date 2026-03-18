import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), '/src/posts');

export interface PostData {
  id: string;
  title: string;
  date: string;
  description: string;
  content: string; // HTML이 아니라 원본 마크다운을 그대로 가져갑니다.
}

export function getSortedPostsData(): PostData[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory).filter((f) => /\.(mdx|md)$/.test(f));
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.(mdx|md)$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { title: string; date: string; description: string }),
      content: matterResult.content, // content를 그대로 반환
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(id: string): Promise<PostData> {
  // .mdx 또는 .md 파일 찾기
  let fullPath = path.join(postsDirectory, `${id}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, `${id}.md`);
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    id,
    content: matterResult.content, // 변환 없이 원본 반환
    ...(matterResult.data as { title: string; date: string; description: string }),
  };
}