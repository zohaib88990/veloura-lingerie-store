import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Flower2, Heart, Leaf } from "lucide-react";
export const metadata: Metadata = {
  title: "Our story",
  description:
    "The idea behind Veloura: thoughtfully designed pieces that make everyday moments feel beautiful.",
};
export default function AboutPage() {
  return (
    <>
      <div className="page-heading">
        <span className="eyebrow">A NOTE FROM VELOURA</span>
        <h1>
          Beautifully made.
          <br />
          <em>Beautifully you.</em>
        </h1>
        <p>Because how you feel should always come first.</p>
      </div>
      <section className="about-story section">
        <div className="about-art">
          <Image
            src="/images/detail.svg"
            alt="The intricate floral lace details that inspire Veloura"
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />
        </div>
        <div className="prose">
          <span className="eyebrow">OUR STORY</span>
          <h2>
            A little luxury.
            <br />A lot of <em>feeling.</em>
          </h2>
          <p>
            Veloura began with a simple idea: the things closest to your skin
            should feel like they belong to you. Not a version of you that needs
            to change. You, exactly as you are.
          </p>
          <p>
            We imagine lingerie as an everyday ritual. A quiet confidence. A
            beautiful detail that can be entirely your own. Each piece in our
            collection balances softness, considered shapes, and the pleasure of
            getting dressed.
          </p>
          <p>
            From gentle cotton essentials to romantic lace and fluid satin, our
            pieces are designed to meet you wherever the day takes you.
          </p>
          <Link href="/shop" className="text-link">
            Find something that feels like you <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="about-values section">
        <div>
          <Flower2 size={30} strokeWidth={1} />
          <h3>Comfort comes first</h3>
          <p>
            The everyday deserves fabrics that feel good and fits that let you
            move.
          </p>
        </div>
        <div>
          <Heart size={30} strokeWidth={1} />
          <h3>Made with intention</h3>
          <p>
            A considered collection. Thoughtful shapes. Small details that make
            a difference.
          </p>
        </div>
        <div>
          <Leaf size={30} strokeWidth={1} />
          <h3>A thoughtful approach</h3>
          <p>
            Our material specifications are listed on every piece, so you know
            what you’re choosing.
          </p>
        </div>
      </section>
      <div className="closing-note">FOR YOURSELF. FIRST. ALWAYS.</div>
    </>
  );
}
