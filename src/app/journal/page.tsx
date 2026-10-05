import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/lib/journal";
export const metadata: Metadata = {
  title: "The Veloura edit",
  description: "Little rituals and lovely reads for living more softly.",
};
export default function JournalPage() {
  return (
    <>
      <div className="page-heading">
        <span className="eyebrow">THE VELOURA EDIT</span>
        <h1>
          Small rituals.
          <br />
          <em>Beautiful moments.</em>
        </h1>
        <p>A little inspiration for living more softly.</p>
      </div>
      <div className="journal-grid section">
        {articles.map((a) => (
          <Link
            className="journal-card"
            href={`/journal/${a.slug}`}
            key={a.slug}
          >
            <div>
              <Image src={a.image} alt={a.title} width={600} height={450} />
            </div>
            <span className="eyebrow">
              {a.category} · {a.time}
            </span>
            <h2>
              {a.title} <ArrowUpRight size={20} />
            </h2>
            <p>{a.excerpt}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
