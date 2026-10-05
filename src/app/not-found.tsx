import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function NotFound() {
  return (
    <div className="empty-state section not-found">
      <span className="eyebrow">A LITTLE DETOUR</span>
      <h1>
        This page has <br />
        <em>slipped away.</em>
      </h1>
      <p>Let’s find you something lovely instead.</p>
      <Link href="/shop" className="button">
        Explore the collection <ArrowRight size={17} />
      </Link>
    </div>
  );
}
