import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Flower2,
  Heart,
  Leaf,
  Sparkles,
  Star,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/catalog";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="line" /> THE ART OF FEELING GOOD
          </div>
          <h1>
            For every side
            <br />
            of <em>you.</em>
          </h1>
          <p>
            Thoughtfully designed lingerie for the everyday,
            <br className="desktop-break" /> the extraordinary, and everything
            in between.
          </p>
          <Link href="/shop" className="button">
            Find your favourites <ArrowUpRight size={18} />
          </Link>
          <div className="hero-footnote">
            <Flower2 className="tiny-star" size={23} strokeWidth={1} />{" "}
            Beautifully made. Beautifully you.
          </div>
        </div>
        <div className="hero-art">
          <Image
            src="/images/hero.svg"
            alt="Rose lace lingerie arranged on a sculptural ivory backdrop"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 52vw"
          />
          <div className="hero-art-label">
            <span>THE EVERYDAY ROMANCE COLLECTION</span>
            <Link
              href="/products/celeste-lace-set"
              aria-label="Explore the Celeste lace set"
            >
              <ArrowUpRight size={22} />
            </Link>
          </div>
          <div className="hero-issue">01 / A SOFTER BEGINNING</div>
        </div>
        <a
          href="#favourites"
          className="hero-scroll"
          aria-label="Scroll to everyday favourites"
        >
          <ArrowDown size={17} />
        </a>
      </section>
      <div className="values-strip">
        <span>
          <Flower2 size={19} strokeWidth={1.25} /> Softness, without compromise
        </span>
        <span>
          <Heart size={19} strokeWidth={1.25} /> Designed for real life
        </span>
        <span>
          <Leaf size={19} strokeWidth={1.25} /> Thoughtfully chosen fabrics
        </span>
        <span>
          <Sparkles size={19} strokeWidth={1.25} /> Little details. Big
          feelings.
        </span>
      </div>
      <section id="favourites" className="section favourites">
        <div className="section-heading">
          <div>
            <span className="eyebrow">YOUR TOP DRAWER, REIMAGINED</span>
            <h2>
              Everyday <em>favourites.</em>
            </h2>
            <p>The pieces you’ll reach for. The feeling you’ll come back to.</p>
          </div>
          <Link href="/shop" className="text-link">
            Shop the collection <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <section className="collection-section">
        <Link
          href="/shop?category=Lingerie+sets"
          className="collection-card rose"
        >
          <Image
            src="/images/collection-lace.svg"
            alt="Delicate rose lace set on warm pink fabric"
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <div>
            <span className="eyebrow">A LITTLE EVERYDAY ROMANCE</span>
            <h2>
              Lovely in <em>lace.</em>
            </h2>
            <span className="text-link">
              Discover lingerie <ArrowUpRight size={18} />
            </span>
          </div>
        </Link>
        <Link href="/shop?category=Sleepwear" className="collection-card sage">
          <Image
            src="/images/collection-sleep.svg"
            alt="Sage satin lounge set, designed for soft mornings"
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <div>
            <span className="eyebrow">LET THE WORLD WAIT</span>
            <h2>
              The art of <em>unwinding.</em>
            </h2>
            <span className="text-link">
              Explore sleep & lounge <ArrowUpRight size={18} />
            </span>
          </div>
        </Link>
      </section>
      <section className="manifesto section">
        <span className="eyebrow">MORE THAN WHAT YOU WEAR</span>
        <h2>
          Confidence is a feeling.
          <br />
          We’re here to help you <em>find it.</em>
        </h2>
        <p>
          We believe the most beautiful thing you can be is yourself. So we make
          pieces that celebrate your body, honour your comfort, and bring a
          little joy to the everyday.
        </p>
        <Link href="/about" className="text-link">
          The story behind Veloura <ArrowRight size={17} />
        </Link>
        <Flower2
          className="manifesto-flower"
          aria-hidden="true"
          size={83}
          strokeWidth={0.7}
        />
      </section>
      <section className="details-section">
        <div className="detail-art">
          <Image
            src="/images/detail.svg"
            alt="Close-up illustration of floral lace and scalloped edging"
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <span>IT’S ALL IN THE DETAILS.</span>
        </div>
        <div className="details-copy">
          <span className="eyebrow">CONSIDERED FROM THE FIRST STITCH</span>
          <h2>
            Feels like a little
            <br />
            <em>love note.</em>
          </h2>
          <p>
            Gentle fabrics. Thoughtful fits. The kind of details that make you
            smile, even if you’re the only one who sees them.
          </p>
          <div className="detail-feature">
            <Flower2 size={23} strokeWidth={1} />
            <div>
              <h3>Soft on your skin</h3>
              <p>Beautiful textures, chosen for how they feel.</p>
            </div>
          </div>
          <div className="detail-feature">
            <Heart size={23} strokeWidth={1} />
            <div>
              <h3>Made for your everyday</h3>
              <p>Comfort that never asks you to compromise.</p>
            </div>
          </div>
          <Link href="/shop" className="text-link">
            Meet your new favourites <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
      <section className="journal-preview section">
        <div>
          <span className="eyebrow">THE VELOURA EDIT</span>
          <h2>
            Small rituals.
            <br />
            <em>Beautiful moments.</em>
          </h2>
          <p>A little inspiration for living more softly.</p>
          <Link href="/journal" className="text-link">
            Take a moment <ArrowUpRight size={17} />
          </Link>
        </div>
        <Link className="journal-preview-card" href="/journal/the-slow-morning">
          <div className="ritual-art">
            <Image
              src="/images/ritual.svg"
              alt="A quiet morning with a ceramic cup, book and stem of flowers"
              width={600}
              height={450}
            />
          </div>
          <span className="eyebrow">LIVING SOFTLY · 4 MIN READ</span>
          <h3>
            The beauty of a slow morning <ArrowUpRight size={20} />
          </h3>
        </Link>
      </section>
      <div className="closing-note">
        <Star size={15} strokeWidth={1} /> FOR YOURSELF. FIRST. ALWAYS.{" "}
        <Star size={15} strokeWidth={1} />
      </div>
    </>
  );
}
