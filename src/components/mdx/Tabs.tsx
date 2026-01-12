'use client';

import { useState, ReactNode, Children } from 'react';

interface TabsProps {
  items: string[];
  children: ReactNode;
}

export function Tabs({ items, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const childrenArray = Children.toArray(children);

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
      <div className="flex border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
        {items.map((item, index) => (
          <button
            key={item}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === index
                ? 'border-b-2 border-blue-500 bg-white text-blue-600 dark:bg-slate-900 dark:text-blue-400'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="p-4 bg-white dark:bg-[#1e1e1e]">
        {childrenArray[activeTab]}
      </div>
    </div>
  );
}

export function Tab({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}