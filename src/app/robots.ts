import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Netlify builds deploy previews and branch deploys on public URLs. Without
 * this, a preview of an unfinished page can be indexed and then outrank the
 * real site — a genuinely painful thing to undo.
 *
 * `CONTEXT` is set by Netlify to "production", "deploy-preview" or
 * "branch-deploy". Anything that is not production is blocked outright.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction =
    process.env.CONTEXT === "production" ||
    // Local `next build` has no CONTEXT; treat it as production so the output
    // matches what will ship, and previews are still caught on Netlify.
    process.env.CONTEXT === undefined;

  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing under /api is a page, and lead endpoints should never appear
        // in search results.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
