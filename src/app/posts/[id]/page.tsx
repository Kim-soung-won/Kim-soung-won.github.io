import Link from 'next/link';
import { getPostData, getSortedPostsData } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import {
  Callout, Cons, Details, FileItem, FileTree, FolderItem,
  Kbd, Pros, ProsCons, Step, Steps, Strong, Tab, Tabs, Equation,
  Badge, Figure, Quote, CodeTitle,
} from '@/components/mdx';

const components = {
  Callout, Steps, Step, Kbd, Details, Equation, Strong,
  FileTree, FileItem, FolderItem,
  Tabs, Tab,
  ProsCons, Pros, Cons,
  Badge, Figure, Quote, CodeTitle,
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
    <article className="py-8">

      {/* 뒤로가기 */}
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" /><path d="m12 5-7 7 7 7" />
        </svg>
        목록으로
      </Link>

      {/* 헤더 */}
      <header className="mb-10">
        <time className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          {postData.date}
        </time>

        <h1 className="mt-3 break-keep text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
          {postData.title}
        </h1>

        {postData.description && (
          <p className="mt-4 break-keep text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {postData.description}
          </p>
        )}

        <hr className="mt-8 border-slate-200 dark:border-slate-800" />
      </header>

      {/* 본문 */}
      <div className={[
        'prose prose-lg prose-slate max-w-none dark:prose-invert break-keep',
        'prose-headings:font-bold prose-headings:tracking-tight',
        'prose-a:font-semibold prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-red-400',
        'prose-pre:rounded-xl prose-pre:bg-[#1e1e1e] prose-pre:shadow-lg prose-pre:border prose-pre:border-slate-800',
        'prose-img:rounded-xl prose-img:shadow-md',
        'prose-th:bg-slate-100 dark:prose-th:bg-slate-800',
        'prose-blockquote:border-l-red-400 prose-blockquote:text-slate-600 dark:prose-blockquote:text-slate-400',
      ].join(' ')}>
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

      {/* 하단 */}
      <footer className="mt-16 flex items-center justify-between border-t border-slate-200 pt-8 dark:border-slate-800">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 transition-colors hover:underline dark:text-red-400"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><path d="m12 5-7 7 7 7" />
          </svg>
          더 많은 글 보기
        </Link>

        <time className="text-xs text-slate-400 dark:text-slate-500">
          {postData.date}
        </time>
      </footer>

    </article>
  );
}
