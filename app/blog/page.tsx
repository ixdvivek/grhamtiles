import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/PageHero";
import BlogCard from "@/components/BlogCard";
import { getPosts, getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Notes on the Craft",
  description:
    "Stories from the Grham Tiles workshop floor — process, provenance, and the people behind the tiles.",
};

export default async function BlogPage() {
  const [settings, posts] = await Promise.all([getSiteSettings(), getPosts()]);

  return (
    <>
      <Nav settings={settings} variant="plain" active="Blog" />

      <main>
        <PageHero
          eyebrow="From the workshop"
          title="Notes on the craft"
          lede="Stories from the workshop floor — process, provenance, and the people behind the tiles."
        />

        <div className="mt-7 grid grid-cols-1 gap-9 px-5 pb-16 sm:mt-10 sm:grid-cols-2 sm:gap-9 sm:px-12 lg:mx-auto lg:max-w-[1200px] lg:grid-cols-3 lg:px-16 lg:pb-24">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </>
  );
}
