import { getSortedPostsData } from "@/lib/posts";
import Hero from "@/components/blog/Hero";
import PostsExplorer from "@/components/blog/PostsExplorer";
import AboutStrip from "@/components/blog/AboutStrip";

export default function Home() {
  const posts = getSortedPostsData();
  return (
    <>
      <Hero posts={posts} />
      <PostsExplorer posts={posts} />
      <AboutStrip />
    </>
  );
}
