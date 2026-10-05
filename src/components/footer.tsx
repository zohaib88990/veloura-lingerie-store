import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="/" className="wordmark">
            veloura<span>INTIMATELY YOURS</span>
          </Link>
          <p>
            Beautiful things. Everyday moments.
            <br />A little something, just for you.
          </p>
        </div>
        <div className="footer-links">
          <h3>Explore</h3>
          <Link href="/shop">The collection</Link>
          <Link href="/shop?category=Sleepwear">Sleep & lounge</Link>
          <Link href="/about">Our story</Link>
          <Link href="/journal">The Veloura edit</Link>
        </div>
        <div className="footer-links">
          <h3>Here to help</h3>
          <Link href="/help#sizing">Size guide</Link>
          <Link href="/help#shipping">Shipping & returns</Link>
          <Link href="/help#care">Care guide</Link>
          <Link href="/help#contact">Contact us</Link>
        </div>
        <div className="footer-edit">
          <span className="eyebrow">THE VELOURA EDIT</span>
          <h3>
            A softer way
            <br />
            to start your day.
          </h3>
          <Link className="text-link" href="/journal">
            Little rituals, lovely reads <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Veloura. All rights reserved.</span>
        <span className="made-with">
          Made with intention <Heart size={12} />
        </span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <span>USD $</span>
        </div>
      </div>
    </footer>
  );
}
