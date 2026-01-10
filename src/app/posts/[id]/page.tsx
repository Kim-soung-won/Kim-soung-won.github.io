import { getPostData, getSortedPostsData } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc'; // [핵심] RSC 버전 사용
import { Callout } from '@/components/mdx/Callout'; // 커스텀 컴포넌트
import { Steps, Step } from '@/components/mdx/Steps';
import { Kbd } from '@/components/mdx/Kbd';
import { Details } from '@/components/mdx/Details';

import type { Metadata } from 'next';

import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const components = {
  Callout,
  Steps,
  Step,
  Kbd,
  Details,
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
    <article className="mx-auto max-w-screen-md px-4 py-16 sm:px-6">
      {/* 헤더 영역 (기존과 동일) */}
      <header className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-400">
          <span>Blog Post</span>
          <span className="h-1 w-1 rounded-full bg-slate-400" />
          <time>{postData.date}</time>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          {postData.title}
        </h1>
      </header>

      {/* MDX 렌더링 영역 */}
      <div className="
          prose prose-lg prose-slate max-w-none dark:prose-invert
          prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-slate-100
          prose-a:text-red-600 dark:prose-a:text-red-400 prose-a:no-underline hover:prose-a:underline
          prose-pre:rounded-xl prose-pre:bg-[#1e1e1e] prose-pre:shadow-lg prose-pre:border prose-pre:border-slate-800
          prose-img:rounded-xl prose-img:shadow-md
          /* 테이블 스타일 강화 */
          prose-table:text-sm prose-th:bg-slate-100 dark:prose-th:bg-slate-800 prose-th:p-3 prose-td:p-3
        ">
        
        {/* source에 원본 마크다운 문자열을 넣습니다. */}
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

      <div className="mt-16 border-t border-slate-200 pt-8 dark:border-slate-800">
        <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>Last updated on {postData.date}</span>
        </div>
      </div>
    </article>
  );
}