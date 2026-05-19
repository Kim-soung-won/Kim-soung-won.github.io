import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { resolveCategory } from './categories';

export { CATEGORIES, resolveCategory } from './categories';

const postsDirectory = path.join(process.cwd(), '/src/posts');

export interface PostData {
  id: string;
  title: string;
  date: string;
  description: string;
  content: string;
  category: string;
  readMin: number;
}

/* 본문 길이 기준으로 대략적인 읽기 시간 (분) */
function estimateReadMin(content: string): number {
  const chars = content.replace(/```[\s\S]*?```/g, '').length;
  return Math.max(3, Math.round(chars / 700));
}

export function getSortedPostsData(): PostData[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory).filter((f) => /\.(mdx|md)$/.test(f));
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.(mdx|md)$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const fm = matterResult.data as { title: string; date: string; description: string; category?: string };

    return {
      id,
      title: fm.title,
      date: fm.date,
      description: fm.description,
      content: matterResult.content,
      category: resolveCategory(id, fm.category),
      readMin: estimateReadMin(matterResult.content),
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(id: string): Promise<PostData> {
  let fullPath = path.join(postsDirectory, `${id}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, `${id}.md`);
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const fm = matterResult.data as { title: string; date: string; description: string; category?: string };

  return {
    id,
    title: fm.title,
    date: fm.date,
    description: fm.description,
    content: matterResult.content,
    category: resolveCategory(id, fm.category),
    readMin: estimateReadMin(matterResult.content),
  };
}

export function getCategoryCounts(): Record<string, number> {
  return getSortedPostsData().reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
}
