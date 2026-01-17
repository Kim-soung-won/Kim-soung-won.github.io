import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function PostsPage() {
  const allPostsData = getSortedPostsData();

  return (
    <section className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      {/* 1. Hero Section */}
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          간단하게 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">하루 하나</span> 관심 갖기
        </h2>
        <p className="text-md text-slate-600 dark:text-slate-400 leading-relaxed">
          개발자로서 떠오르는 호기심과 의문에 대해 하루 하나씩 정리해나가는 블로그입니다.
        </p>
        <p className="text-md text-slate-600 dark:text-slate-400 leading-relaxed">
          개인 Notion에 작성한 글을 AI의 도움을 받아 .mdx 파일로 변환하여 게시합니다.
        </p>
      </div>

      {/* 2. Grid List */}
      <div className="grid gap-6 grid-cols-1">
        {allPostsData.map(({ id, date, title, description }) => (
          <Link href={`/posts/${id}`} key={id} className="group relative flex flex-col">
            
            {/* 카드 배경 및 스타일 */}
            <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-800/50 hover:dark:border-red-500/50 hover:border-red-500/50">
              
              <div className="flex items-center justify-between mb-4">
                <time className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {date}
                </time>
                <div className="h-2 w-2 rounded-full bg-red-500/20 group-hover:bg-red-500 transition-colors" />
              </div>

              <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
                {title}
              </h2>
              
              <p className="mb-6 text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {description}
              </p>

              <div className="mt-auto flex items-center text-sm font-semibold text-red-600 dark:text-red-400 group-hover:underline">
                Read Guide 
                <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}