import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { PRODUCTS, GROUPS } from "@/content/insurance";
import { INDUSTRIES } from "@/content/industries";
import { ARTICLES } from "@/content/articles";
import { STORIES } from "@/content/stories";

/**
 * Generated from the same content modules the pages render from, so a new
 * product or article appears in the sitemap without anyone remembering to add
 * it. Priorities reflect the brief's primary goal — the conversion paths rank
 * above the marketing pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: url("/"), priority: 1, changeFrequency: "weekly" },
    // Conversion paths.
    { url: url("/risk-assessment"), priority: 0.9, changeFrequency: "monthly" },
    { url: url("/contact"), priority: 0.9, changeFrequency: "monthly" },
    { url: url("/policy-review"), priority: 0.9, changeFrequency: "monthly" },
    { url: url("/claims"), priority: 0.9, changeFrequency: "monthly" },
    // Hubs.
    { url: url("/insurance"), priority: 0.8, changeFrequency: "monthly" },
    { url: url("/industries"), priority: 0.7, changeFrequency: "monthly" },
    { url: url("/learn"), priority: 0.7, changeFrequency: "weekly" },
    { url: url("/learn/dictionary"), priority: 0.7, changeFrequency: "monthly" },
    { url: url("/resources"), priority: 0.6, changeFrequency: "monthly" },
    { url: url("/risk-advisory"), priority: 0.6, changeFrequency: "monthly" },
    { url: url("/success-stories"), priority: 0.6, changeFrequency: "monthly" },
    { url: url("/about"), priority: 0.5, changeFrequency: "yearly" },
  ];

  const groups: MetadataRoute.Sitemap = GROUPS.map((g) => ({
    url: url(`/insurance/${g.id}`),
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  const products: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: url(`/insurance/${p.group}/${p.slug}`),
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  const industries: MetadataRoute.Sitemap = INDUSTRIES.map((i) => ({
    url: url(`/industries/${i.slug}`),
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  const articles: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: url(`/learn/${a.slug}`),
    priority: 0.5,
    changeFrequency: "yearly",
    lastModified: new Date(a.published),
  }));

  const stories: MetadataRoute.Sitemap = STORIES.map((s) => ({
    url: url(`/success-stories/${s.slug}`),
    priority: 0.5,
    changeFrequency: "yearly",
  }));

  return [...core, ...groups, ...products, ...industries, ...articles, ...stories].map(
    (entry) => ({ lastModified: now, ...entry }),
  );
}
