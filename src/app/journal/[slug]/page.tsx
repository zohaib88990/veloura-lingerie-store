import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/journal";
export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  return { title: a?.title || "Article not found", description: a?.excerpt };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  return (
    <article className="article-page section">
      <Link href="/journal" className="text-link">
        ← Back to the edit
      </Link>
      <div className="page-heading">
        <span className="eyebrow">
          {a.category} · {a.time}
        </span>
        <h1>{a.title}</h1>
        <p>{a.excerpt}</p>
      </div>
      <Image
        className="article-hero"
        src={a.image}
        alt={a.title}
        width={900}
        height={600}
        priority
      />
      <div className="prose article-prose">
        {a.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="article-signature">With love, Veloura.</p>
        <Link className="text-link" href="/shop">
          Discover something soft →
        </Link>
      </div>
    </article>
  );
}
