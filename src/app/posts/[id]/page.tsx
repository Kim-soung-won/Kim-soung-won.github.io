import { getPostData, getSortedPostsData } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';

import type { Metadata } from 'next';

import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Callout, Cons, Details, FileItem, FileTree, FolderItem, Kbd, Pros, ProsCons, Step, Steps, Strong, Tab, Tabs, Equation } from '@/components/mdx';

const components = {
  Callout,
  Steps,
  Step,
  Kbd,
  Details,
  Equation,
  Strong,
  FileTree, FileItem, FolderItem,
  Tabs, Tab,
  ProsCons, Pros, Cons
};

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const postData = await getPostData(id);
  return { title: `${postData.title} | DevLog`, description: postData.description };
}

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postData = await getPostData(id);

  return (
    <article className="mx-auto max-w-screen-lg px-4 py-16 sm:px-6">
      {/* --- [헤더 디자인 개선] --- */}
      <header className="mb-12 text-center">
        {/* 메타 정보 뱃지 */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          <span>Post</span>
          <span className="h-0.5 w-0.5 rounded-full bg-slate-400" />
          <time>{postData.date}</time>
        </div>
        
        {/* 제목 타이포그래피 개선 
            1. text-balance: 제목 길이가 다를 때 균형있게 줄바꿈 (매우 중요)
            2. leading-tight: 행간을 좁히되 겹치지 않게 조정
            3. break-words: 긴 영단어가 튀어나가지 않게 방지
        */}
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl md:text-5xl lg:leading-[1.1] text-balance break-words">
          {/* 그라데이션 효과로 시각적 무게감 줄이기 */}
          <span className="bg-gradient-to-b from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-400 whitespace-pre-wrap">
            {postData.title}
          </span>
        </h1>
      </header>

      {/* --- [본문 영역] --- */}
      <div className="
          prose prose-lg prose-slate max-w-none dark:prose-invert
          
          /* 제목 스타일 */
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-slate-100
          
          /* 본문 폰트 사이즈 및 행간 조정 (가독성) */
          prose-p:leading-relaxed prose-li:leading-relaxed
          
          /* 링크 스타일 */
          prose-a:font-semibold prose-a:text-red-600 dark:prose-a:text-red-400 prose-a:no-underline hover:prose-a:underline
          
          /* 코드 블록 스타일 */
          prose-pre:rounded-xl prose-pre:bg-[#1e1e1e] prose-pre:shadow-lg prose-pre:border prose-pre:border-slate-800
          
          /* 이미지 스타일 */
          prose-img:rounded-xl prose-img:shadow-md
          
          /* 테이블 스타일 */
          prose-table:text-sm prose-th:bg-slate-100 dark:prose-th:bg-slate-800 prose-th:p-3 prose-td:p-3
        ">
        
        <MDXRemote 
          source={postData.content} 
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeHighlight],
            },
          }}
        />
      </div>

      {/* 하단 푸터 */}
      <div className="mt-16 flex items-center justify-between border-t border-slate-200 pt-8 dark:border-slate-800">
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Last updated on <span className="font-semibold text-slate-700 dark:text-slate-200">{postData.date}</span>
        </div>
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
           {/* 필요 시 작성자 이름 등 추가 */}
           DevLog
        </div>
      </div>
    </article>
  );
}