import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DetailHeader from "@/components/DetailHeader";
import SwatchBlock from "@/components/SwatchBlock";
import Eyebrow from "@/components/Eyebrow";
import { getPostBySlug, getPosts, getSiteSettings } from "@/lib/data";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [settings, post, allPosts] = await Promise.all([
    getSiteSettings(),
    getPostBySlug(slug),
    getPosts(),
  ]);

  if (!post) notFound();

  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <DetailHeader settings={settings} backHref="/blog" backLabel="Notes on the craft" transparent={false} />

      <main>
        <article>
          <div className="px-5 pt-8 text-center sm:mx-auto sm:max-w-[620px] sm:px-12 sm:pt-16 lg:max-w-[760px] lg:px-16 lg:pt-20">
            <Eyebrow color="red">Craft notes</Eyebrow>
            <h1 className="mt-3.5 font-display text-[36px] leading-[1.12] sm:text-[46px] lg:text-[56px] lg:leading-[1.1]">
              {post.title}
            </h1>
            <div className="mt-4.5 flex items-center justify-center gap-2.5 text-[13px] text-brand-muted lg:text-sm">
              <span>Grham Home Decors</span>
              <span>·</span>
              <span>{post.date}</span>
            </div>
          </div>

          <SwatchBlock
            swatch={post.swatch}
            className="mt-6 aspect-[4/3] sm:mx-auto sm:mt-10 sm:aspect-[16/9] sm:max-w-[738px] lg:mt-12 lg:max-w-[1120px]"
          />

          <div className="flex flex-col gap-4.5 px-5 pt-6 text-base leading-relaxed sm:mx-auto sm:max-w-[600px] sm:px-12 sm:pt-10 sm:text-[17px] lg:max-w-[720px] lg:px-16 lg:pt-12 lg:gap-[22px] lg:text-lg lg:leading-[1.8]">
            {post.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {related.length > 0 && (
            <section className="mt-14 px-5 pb-16 sm:mx-auto sm:mt-16 sm:max-w-[738px] sm:px-12 lg:max-w-[1120px] lg:px-16 lg:pb-24">
              <div className="mb-4.5 border-t border-brand-ink/[0.16] pt-6 text-xs tracking-[0.1em] text-brand-muted uppercase lg:mb-7 lg:pt-8">
                More from the workshop
              </div>
              <div className="flex flex-col gap-7 sm:grid sm:grid-cols-2 sm:gap-8 lg:gap-10">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="flex items-center gap-3.5 text-brand-ink lg:gap-5">
                    <SwatchBlock swatch={r.swatch} className="h-[88px] w-[88px] shrink-0 sm:h-24 sm:w-24 lg:h-[120px] lg:w-[120px]" />
                    <div>
                      <div className="font-display text-lg leading-[1.2] lg:text-[22px]">{r.title}</div>
                      <div className="mt-1.5 text-xs text-brand-muted lg:mt-2 lg:text-[13px]">{r.date}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
    </>
  );
}
