import Link from "next/link";
import SwatchBlock from "./SwatchBlock";
import type { Post } from "@/lib/types";

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block text-brand-ink">
      <SwatchBlock swatch={post.swatch} className="aspect-[4/3]" />
      <div className="mt-3.5 text-[13px] text-brand-muted">{post.date}</div>
      <h2 className="mt-2 font-display text-[26px] leading-[1.2]">{post.title}</h2>
      <p className="mt-2 text-[15px] leading-relaxed">{post.excerpt}</p>
    </Link>
  );
}
