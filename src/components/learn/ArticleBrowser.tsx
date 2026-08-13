"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import {
  ARTICLES_BY_DATE,
  CATEGORIES,
  categoryLabel,
  type Category,
} from "@/content/articles";

export default function ArticleBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES_BY_DATE.filter((a) => {
      if (category && a.category !== category) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        // Searching the body too, so a reader looking for "average clause"
        // finds the article that explains it without it being in the title.
        a.body.some((b) =>
          "text" in b
            ? b.text.toLowerCase().includes(q)
            : b.items.some((i) => i.toLowerCase().includes(q)),
        )
      );
    });
  }, [query, category]);

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory(null)}
            className={cn(
              "rounded-full px-4 py-2 text-[0.85rem] font-semibold transition",
              category === null
                ? "bg-navy text-white"
                : "bg-mist text-ink/70 hover:text-navy",
            )}
          >
            Everything
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id === category ? null : c.id)}
              className={cn(
                "rounded-full px-4 py-2 text-[0.85rem] font-semibold transition",
                category === c.id
                  ? "bg-navy text-white"
                  : "bg-mist text-ink/70 hover:text-navy",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <label className="relative block lg:w-80">
          <span className="sr-only">Search articles</span>
          <Icon
            name="search"
            className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-ink/40"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the Learning Centre…"
            className="w-full rounded-full border border-gray-line/70 bg-white py-3 pr-5 pl-11 text-[0.9rem] transition placeholder:text-ink/40 focus:border-navy focus:ring-2 focus:ring-navy/15 focus:outline-none"
          />
        </label>
      </div>

      {results.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-gray-line/60 bg-mist p-10 text-center">
          <p className="text-[1.02rem] font-semibold text-navy">
            Nothing here on that yet.
          </p>
          <p className="mx-auto mt-3 max-w-md text-[0.92rem] leading-relaxed text-ink/70">
            Ask us directly and we will answer — and if it is a common question,
            we will write it up so the next person finds it.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-[0.9rem] font-semibold text-white transition hover:bg-orange-deep"
          >
            Ask a question
            <Icon name="arrowRight" className="size-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {results.map((a) => (
            <Link
              key={a.slug}
              href={`/learn/${a.slug}`}
              className="group flex flex-col rounded-2xl border border-gray-line/60 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-navy/25 hover:shadow-[0_30px_60px_-30px_rgba(15,28,72,0.35)]"
            >
              <p className="flex items-center gap-3 text-[0.75rem] font-semibold tracking-wide uppercase">
                <span className="text-orange">{categoryLabel(a.category)}</span>
                <span className="text-ink/35">{a.minutes} min read</span>
              </p>

              <h3 className="mt-4 text-xl leading-snug font-bold text-navy">
                {a.title}
              </h3>

              <p className="mt-3 flex-1 text-[0.93rem] leading-relaxed text-ink/70">
                {a.summary}
              </p>

              <span className="mt-6 flex items-center gap-2 text-[0.85rem] font-semibold text-navy transition group-hover:text-orange">
                Read it
                <Icon
                  name="arrowRight"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
