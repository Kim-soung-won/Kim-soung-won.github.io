import { getSortedPostsData, getCategoryCounts } from "@/lib/posts";
import CategoriesView from "@/components/blog/CategoriesView";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Categories | daily.log" };

export default function CategoriesPage() {
  getSortedPostsData();
  const counts = getCategoryCounts();
  return <CategoriesView counts={counts} />;
}
