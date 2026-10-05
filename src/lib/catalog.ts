export type Category =
  "Lingerie sets" | "Bras & bralettes" | "Briefs" | "Sleepwear";
export type Product = {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  price: number;
  colors: { name: string; hex: string }[];
  sizes: string[];
  image: string;
  badge?: string;
  description: string;
  material: string;
};
export const categories: Category[] = [
  "Lingerie sets",
  "Bras & bralettes",
  "Briefs",
  "Sleepwear",
];
export const products: Product[] = [
  {
    id: "celeste-lace-set",
    name: "Celeste Lace Set",
    subtitle: "A little romance, every day",
    category: "Lingerie sets",
    price: 8900,
    colors: [
      { name: "Rose", hex: "#b97879" },
      { name: "Noir", hex: "#292526" },
      { name: "Ivory", hex: "#e6d7c2" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "/images/celeste.svg",
    badge: "BESTSELLER",
    description:
      "Delicate floral lace meets an effortless silhouette. With soft, unlined cups, adjustable straps and a matching brief, Celeste makes getting dressed feel like a moment just for you.",
    material: "88% recycled nylon, 12% elastane. Cotton-lined gusset.",
  },
  {
    id: "noelle-satin-set",
    name: "Noelle Satin Set",
    subtitle: "Your softer side",
    category: "Lingerie sets",
    price: 9800,
    colors: [
      { name: "Noir", hex: "#292526" },
      { name: "Rose", hex: "#b97879" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "/images/noelle.svg",
    badge: "NEW",
    description:
      "A considered combination of liquid-soft satin and scalloped lace. Lightly structured cups offer gentle support, while the matching brief sits comfortably at the hip.",
    material: "92% recycled polyester satin, 8% elastane. Cotton-lined gusset.",
  },
  {
    id: "ella-everyday-bralette",
    name: "Ella Everyday Bralette",
    subtitle: "Comfort looks good on you",
    category: "Bras & bralettes",
    price: 4800,
    colors: [
      { name: "Ivory", hex: "#e6d7c2" },
      { name: "Cocoa", hex: "#765240" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "/images/ella.svg",
    description:
      "The one you will reach for again and again. A wire-free bralette with a soft stretch band, adjustable straps and enough ease to take you through the whole day.",
    material: "95% organic cotton, 5% elastane.",
  },
  {
    id: "luna-satin-slip",
    name: "Luna Satin Slip",
    subtitle: "Slow evenings, softer mornings",
    category: "Sleepwear",
    price: 7800,
    colors: [
      { name: "Champagne", hex: "#d9b990" },
      { name: "Noir", hex: "#292526" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "/images/luna.svg",
    badge: "MOST LOVED",
    description:
      "A fluid satin slip that drapes beautifully and feels even better. Finished with adjustable straps and a delicate lace neckline for your favourite unhurried moments.",
    material: "97% recycled polyester satin, 3% elastane.",
  },
  {
    id: "amelie-lace-bralette",
    name: "Amélie Lace Bralette",
    subtitle: "Delicate by design",
    category: "Bras & bralettes",
    price: 5400,
    colors: [
      { name: "Sage", hex: "#8a9280" },
      { name: "Rose", hex: "#b97879" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "/images/amelie.svg",
    description:
      "Airy floral lace in a longline silhouette. Amélie balances a softly supportive underband with an easy, wire-free fit. Beautiful enough to peek out from a favourite shirt.",
    material: "88% recycled nylon, 12% elastane.",
  },
  {
    id: "iris-high-rise-brief",
    name: "Iris High-Rise Brief",
    subtitle: "Made to move with you",
    category: "Briefs",
    price: 2800,
    colors: [
      { name: "Rose", hex: "#b97879" },
      { name: "Ivory", hex: "#e6d7c2" },
      { name: "Noir", hex: "#292526" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "/images/iris.svg",
    description:
      "A high-rise shape, feather-soft stretch and delicate lace edges. Iris offers comfortable coverage without ever compromising on the little details.",
    material: "95% organic cotton, 5% elastane. Cotton-lined gusset.",
  },
  {
    id: "serene-lounge-set",
    name: "Serene Lounge Set",
    subtitle: "Permission to unwind",
    category: "Sleepwear",
    price: 11200,
    colors: [
      { name: "Sage", hex: "#8a9280" },
      { name: "Champagne", hex: "#d9b990" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "/images/serene.svg",
    description:
      "Make staying in an occasion. This relaxed camisole and short set is cut from supple satin, with an elasticated waist and subtle lace trim.",
    material: "97% recycled polyester satin, 3% elastane.",
  },
  {
    id: "muse-lace-set",
    name: "Muse Lace Set",
    subtitle: "For your main-character moments",
    category: "Lingerie sets",
    price: 9400,
    colors: [
      { name: "Cocoa", hex: "#765240" },
      { name: "Noir", hex: "#292526" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "/images/muse.svg",
    description:
      "Richly textured lace, thoughtful lines and a beautifully balanced fit. The Muse set pairs a soft-cup bra with a classic brief for understated everyday elegance.",
    material: "88% recycled nylon, 12% elastane. Cotton-lined gusset.",
  },
];
export const formatPrice = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
export const getProduct = (id: string) => products.find((p) => p.id === id);
export const shippingCost = (subtotal: number) =>
  subtotal === 0 || subtotal >= 15000 ? 0 : 800;
