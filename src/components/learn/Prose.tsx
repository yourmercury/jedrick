import Icon from "@/components/ui/Icon";
import type { Block } from "@/content/articles";

/**
 * Renders an article's block list.
 *
 * Kept as an explicit switch rather than a markdown pipeline so every block
 * type has a designed appearance — callouts and pull quotes in particular do
 * real work in this content, and generic markdown would flatten them.
 */
export default function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="pt-6 font-display text-2xl leading-snug font-bold text-navy sm:text-[1.7rem]"
              >
                {block.text}
              </h2>
            );

          case "p":
            return (
              <p key={i} className="text-[1.02rem] leading-[1.75] text-ink/85">
                {block.text}
              </p>
            );

          case "list": {
            const Tag = block.ordered ? "ol" : "ul";
            return (
              <Tag key={i} className="space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-4">
                    {block.ordered ? (
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-navy text-[0.72rem] font-bold text-white">
                        {j + 1}
                      </span>
                    ) : (
                      <Icon
                        name="check"
                        className="mt-1.5 size-4 shrink-0 text-orange"
                        strokeWidth={2.6}
                      />
                    )}
                    <span className="text-[1.02rem] leading-[1.7] text-ink/85">
                      {item}
                    </span>
                  </li>
                ))}
              </Tag>
            );
          }

          case "callout":
            return (
              <aside
                key={i}
                className="rounded-2xl border border-orange/30 bg-orange/[0.06] p-6 sm:p-7"
              >
                <p className="flex items-center gap-2.5 font-display text-[1.02rem] font-bold text-navy">
                  <Icon name="umbrella" className="size-5 shrink-0 text-orange" />
                  {block.title}
                </p>
                <p className="mt-3 text-[0.98rem] leading-[1.7] text-ink/80">
                  {block.text}
                </p>
              </aside>
            );

          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-orange py-2 pl-6 font-display text-xl leading-snug font-semibold text-navy sm:text-[1.4rem]"
              >
                {block.text}
              </blockquote>
            );
        }
      })}
    </div>
  );
}
