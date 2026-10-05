import { NextResponse, type NextRequest } from "next/server";
import { getProduct } from "@/lib/catalog";
import { articles } from "@/lib/journal";

// Resolve missing static entries at routing time so they use the complete
// branded 404 layout rather than an empty dynamic-render error response.
export function proxy(request: NextRequest) {
  const parts = request.nextUrl.pathname.split("/").filter(Boolean);
  const known =
    parts[0] === "products"
      ? parts.length === 2 && !!getProduct(parts[1])
      : parts.length === 1 ||
        (parts.length === 2 &&
          articles.some((article) => article.slug === parts[1]));
  if (!known) {
    const target = request.nextUrl.clone();
    target.pathname = "/__veloura_not_found__";
    return NextResponse.rewrite(target);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/products/:path*", "/journal/:path*"] };
