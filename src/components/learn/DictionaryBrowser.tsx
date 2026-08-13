"use client";

import { useMemo, useState } from "react";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import {
  DICTIONARY_LETTERS,
  DICTIONARY_SORTED,
  findTerm,
  type Term,
} from "@/content/dictionary";

/**
 * Searchable A–Z glossary.
 *
 * Search matches the term, its alternative names and the meaning itself — so
 * someone who half-remembers "the clause about being under-insured" finds the
 * average clause without knowing it is called that.
 */
export default function DictionaryBrowser() {
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    return DICTIONARY_SORTED.filter((t) => {
      if (letter && t.term[0].toUpperCase() !== letter) return false;
      if (!q) return true;
      return (
        t.term.toLowerCase().includes(q) ||
        t.aka?.some((a) => a.toLowerCase().includes(q)) ||
        t.meaning.toLowerCase().includes(q) ||
        t.example.toLowerCase().includes(q)
      );
    });
  }, [query, letter]);

  return (
    <div>
      <div className="sticky top-[4.5rem] z-30 -mx-5 border-b border-gray-line/50 bg-white/95 px-5 py-5 backdrop-blur-md sm:-mx-8 sm:px-8">
        <label className="relative block">
          <span className="sr-only">Search the dictionary</span>
          <Icon
            name="search"
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink/40"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a term, or describe it in your own words…"
            className="w-full rounded-full border border-gray-line/70 bg-white py-3.5 pr-5 pl-12 text-[0.95rem] transition placeholder:text-ink/40 focus:border-navy focus:ring-2 focus:ring-navy/15 focus:outline-none"
          />
        </label>

        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setLetter(null)}
            className={cn(
              "rounded-full px-3 py-1.5 text-[0.8rem] font-semibold transition",
              letter === null
                ? "bg-navy text-white"
                : "text-ink/60 hover:bg-mist hover:text-navy",
            )}
          >
            All
          </button>
          {DICTIONARY_LETTERS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLetter(l === letter ? null : l)}
              className={cn(
                "size-8 rounded-full text-[0.8rem] font-semibold transition",
                letter === l
                  ? "bg-navy text-white"
                  : "text-ink/60 hover:bg-mist hover:text-navy",
              )}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-[0.85rem] text-ink/55">
        {results.length} {results.length === 1 ? "term" : "terms"}
        {query.trim() && ` matching “${query.trim()}”`}
      </p>

      {results.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-gray-line/60 bg-mist p-8 text-center">
          <p className="text-[0.98rem] font-semibold text-navy">
            No match for that one.
          </p>
          <p className="mx-auto mt-3 max-w-md text-[0.9rem] leading-relaxed text-ink/70">
            That is genuinely useful to know — if a term is confusing enough to
            search for and it is not here, we should add it.{" "}
            <a
              href="/contact"
              className="font-semibold text-navy underline decoration-orange decoration-2 underline-offset-4 hover:text-orange"
            >
              Tell us what you were looking for
            </a>
            .
          </p>
        </div>
      ) : (
        <dl className="mt-8 space-y-4">
          {results.map((term) => (
            <Entry key={term.id} term={term} onJump={setQuery} />
          ))}
        </dl>
      )}
    </div>
  );
}

function Entry({
  term,
  onJump,
}: {
  term: Term;
  onJump: (value: string) => void;
}) {
  return (
    <div
      id={term.id}
      className="scroll-mt-56 rounded-2xl border border-gray-line/60 bg-white p-6 transition hover:border-navy/25 sm:p-8"
    >
      <dt>
        <h3 className="font-display text-xl font-bold text-navy">
          {term.term}
        </h3>
        {term.aka && (
          <p className="mt-1.5 text-[0.82rem] text-ink/55">
            Also called: {term.aka.join(", ")}
          </p>
        )}
      </dt>

      <dd className="mt-4">
        <p className="text-[0.95rem] leading-relaxed text-ink/85">
          {term.meaning}
        </p>

        <div className="mt-5 rounded-xl border-l-2 border-orange bg-mist/70 p-4">
          <p className="text-[0.78rem] font-semibold tracking-wide text-ink/50 uppercase">
            For example
          </p>
          <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/80">
            {term.example}
          </p>
        </div>

        {term.related && term.related.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-[0.78rem] font-semibold tracking-wide text-ink/45 uppercase">
              See also
            </span>
            {term.related.map((id) => {
              const related = findTerm(id);
              if (!related) return null;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => onJump("")}
                  className="rounded-full bg-mist px-3 py-1.5 text-[0.8rem] font-medium text-navy transition hover:bg-navy hover:text-white"
                >
                  {related.term}
                </a>
              );
            })}
          </div>
        )}
      </dd>
    </div>
  );
}
