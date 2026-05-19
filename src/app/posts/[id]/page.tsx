import { getPostData, getSortedPostsData } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import {
  Callout, Cons, Details, FileItem, FileTree, FolderItem,
  Kbd, Pros, ProsCons, Step, Steps, Strong, Tab, Tabs, Equation,
  Badge, Figure, Quote, CodeTitle,
} from "@/components/mdx";
import { CodeBlock } from "@/components/mdx/CodeBlock";
import PostDetailShell from "@/components/blog/PostDetailShell";

const components = {
  Callout, Steps, Step, Kbd, Details, Equation, Strong,
  FileTree, FileItem, FolderItem,
  Tabs, Tab,
  ProsCons, Pros, Cons,
  Badge, Figure, Quote, CodeTitle,
  CodeBlock,
};

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostData(id);
  return { title: `${post.title} | daily.log`, description: post.description };
}

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostData(id);
  const all = getSortedPostsData();
  const idx = all.findIndex(p => p.id === id);
  const prev = all[idx + 1]; // older
  const next = all[idx - 1]; // newer

  const body = (
    <MDXRemote
      source={post.content}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeHighlight] } }}
    />
  );

  return (
    <PostDetailShell
      post={post}
      body={body}
      prev={prev}
      next={next}
      totalCount={all.length}
      indexFromNewest={idx}
    />
  );
}
