import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface BaseLayoutProps {
  children: ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    /* * flex, flex-col, min-h-screen:
     * 전체 화면 높이를 최소값으로 잡고, 내용을 세로로 배치합니다.
     * 이를 통해 콘텐츠가 짧아도 푸터가 화면 하단에 붙어있게 됩니다(Sticky Footer).
     */
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      
      {/* * flex-grow: 남은 세로 공간을 모두 차지하여 푸터를 아래로 밀어냅니다.
       * max-w-screen-md: 블로그 글은 너무 넓으면 가독성이 떨어지므로 적당한 폭(768px)으로 제한합니다.
       */ }
      <main className="mx-auto w-full max-w-screen-md flex-grow px-4 py-8">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}