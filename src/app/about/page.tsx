import AboutView from "@/components/blog/AboutView";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About | daily.log" };

export default function AboutPage() {
  return <AboutView />;
}
