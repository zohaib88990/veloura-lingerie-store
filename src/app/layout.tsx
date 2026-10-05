import type { Metadata } from "next";
import { ShopProvider } from "@/components/shop-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Bag } from "@/components/bag";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://veloura.example",
  ),
  title: { default: "Veloura — Intimately Yours", template: "%s | Veloura" },
  description:
    "Discover thoughtfully designed lingerie, soft essentials and sleepwear. A little everyday luxury, intimately yours.",
  openGraph: {
    title: "Veloura — Intimately Yours",
    description:
      "Beautiful things. Everyday moments. Discover your softer side.",
    type: "website",
    images: [{ url: "/images/social.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ShopProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <Bag />
        </ShopProvider>
      </body>
    </html>
  );
}
