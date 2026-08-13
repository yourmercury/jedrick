"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Two calculators for the two numbers people get wrong most often.
 *
 * Both are deliberately rough. The point is not to produce a figure precise
 * enough to insure on — it is to show someone that the number in their policy
 * is in the wrong region, which is the thing they cannot currently see.
 * Every result says so explicitly.
 */

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

function parseAmount(value: string) {
  const n = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function AmountField({
  label,
  hint,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.88rem] font-semibold text-navy">
        {label}
      </span>
      <span className="relative block">
        <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[0.95rem] font-semibold text-ink/40">
          ₦
        </span>
        <input
          inputMode="decimal"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-gray-line/70 bg-white py-3 pr-4 pl-9 text-[0.95rem] transition placeholder:text-ink/35 focus:border-navy focus:ring-2 focus:ring-navy/15 focus:outline-none"
        />
      </span>
      {hint && <span className="mt-2 block text-[0.8rem] text-ink/60">{hint}</span>}
    </label>
  );
}

export function SumInsuredCalculator() {
  const [rebuild, setRebuild] = useState("");
  const [insured, setInsured] = useState("");
  const [claim, setClaim] = useState("");

  const result = useMemo(() => {
    const trueValue = parseAmount(rebuild);
    const sumInsured = parseAmount(insured);
    const claimAmount = parseAmount(claim);
    if (trueValue <= 0 || sumInsured <= 0) return null;

    const ratio = Math.min(sumInsured / trueValue, 1);
    const shortfallPct = Math.round((1 - ratio) * 100);
    const payout = claimAmount > 0 ? claimAmount * ratio : null;

    return { ratio, shortfallPct, payout, claimAmount };
  }, [rebuild, insured, claim]);

  return (
    <div className="rounded-2xl border border-gray-line/60 bg-white p-7 sm:p-8">
      <span className="flex size-11 items-center justify-center rounded-xl bg-navy text-white">
        <Icon name="chart" className="size-5" />
      </span>
      <h3 className="mt-5 text-xl font-bold text-navy">
        Are you under-insured?
      </h3>
      <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/70">
        The average clause reduces every claim in proportion to how under-insured
        you are — not just total losses. This shows you by how much.
      </p>

      <div className="mt-7 space-y-5">
        <AmountField
          label="What would it cost to rebuild or replace today?"
          hint="Rebuild cost, not market value. For a building these are different numbers."
          placeholder="100,000,000"
          value={rebuild}
          onChange={setRebuild}
        />
        <AmountField
          label="What is the sum insured on your policy?"
          hint="On your policy schedule."
          placeholder="60,000,000"
          value={insured}
          onChange={setInsured}
        />
        <AmountField
          label="Test it against a claim of…"
          hint="Optional. Try a small one — that is where people are most surprised."
          placeholder="5,000,000"
          value={claim}
          onChange={setClaim}
        />
      </div>

      {result && (
        <div
          className={cn(
            "mt-7 rounded-xl border p-5",
            result.shortfallPct > 0
              ? "border-orange/40 bg-orange/[0.06]"
              : "border-blue/30 bg-blue/[0.05]",
          )}
        >
          {result.shortfallPct > 0 ? (
            <>
              <p className="font-display text-lg font-bold text-navy">
                You are around {result.shortfallPct}% under-insured.
              </p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-ink/80">
                That means every claim could be reduced by roughly the same
                proportion.
              </p>
              {result.payout !== null && (
                <p className="mt-4 rounded-lg bg-white p-4 text-[0.92rem] leading-relaxed text-ink/85">
                  On a {naira.format(result.claimAmount)} claim, you might
                  recover about{" "}
                  <strong className="font-semibold text-navy">
                    {naira.format(result.payout)}
                  </strong>{" "}
                  — leaving{" "}
                  <strong className="font-semibold text-orange-deep">
                    {naira.format(result.claimAmount - result.payout)}
                  </strong>{" "}
                  with you.
                </p>
              )}
            </>
          ) : (
            <p className="font-display text-lg font-bold text-navy">
              Your sum insured looks adequate.
            </p>
          )}
        </div>
      )}

      <p className="mt-5 text-[0.8rem] leading-relaxed text-ink/55">
        A rough indication, not a valuation. Policies differ, and some include
        tolerances that soften the effect. Ask us to check the actual wording.
      </p>
    </div>
  );
}

export function BusinessInterruptionCalculator() {
  const [turnover, setTurnover] = useState("");
  const [variableCosts, setVariableCosts] = useState("");
  const [months, setMonths] = useState(12);

  const result = useMemo(() => {
    const t = parseAmount(turnover);
    const v = parseAmount(variableCosts);
    if (t <= 0) return null;

    const grossProfit = Math.max(t - v, 0);
    const sumInsured = (grossProfit / 12) * months;
    return { grossProfit, sumInsured };
  }, [turnover, variableCosts, months]);

  return (
    <div className="rounded-2xl border border-gray-line/60 bg-white p-7 sm:p-8">
      <span className="flex size-11 items-center justify-center rounded-xl bg-navy text-white">
        <Icon name="clock" className="size-5" />
      </span>
      <h3 className="mt-5 text-xl font-bold text-navy">
        Business interruption: a starting figure
      </h3>
      <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/70">
        The insurance definition of gross profit is not your accountant&rsquo;s.
        Using the accounting figure under-insures most businesses before anything
        has even happened.
      </p>

      <div className="mt-7 space-y-5">
        <AmountField
          label="Annual turnover"
          placeholder="250,000,000"
          value={turnover}
          onChange={setTurnover}
        />
        <AmountField
          label="Annual variable costs"
          hint="Only costs that would stop if you stopped trading — raw materials, bought-in goods, carriage. Not rent, salaries or loan repayments."
          placeholder="90,000,000"
          value={variableCosts}
          onChange={setVariableCosts}
        />

        <div>
          <span className="mb-2 block text-[0.88rem] font-semibold text-navy">
            Indemnity period
          </span>
          <div className="flex flex-wrap gap-2">
            {[12, 18, 24, 36].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMonths(m)}
                className={cn(
                  "rounded-full px-4 py-2 text-[0.85rem] font-semibold transition",
                  months === m
                    ? "bg-navy text-white"
                    : "bg-mist text-ink/70 hover:text-navy",
                )}
              >
                {m} months
              </button>
            ))}
          </div>
          <span className="mt-2 block text-[0.8rem] text-ink/60">
            How long until you are fully trading again — including planning,
            contractors and imported equipment. Most businesses choose 12 and
            need longer.
          </span>
        </div>
      </div>

      {result && (
        <div className="mt-7 rounded-xl border border-blue/30 bg-blue/[0.05] p-5">
          <p className="text-[0.85rem] font-semibold text-ink/60">
            Insurable gross profit (annual)
          </p>
          <p className="font-display text-lg font-bold text-navy">
            {naira.format(result.grossProfit)}
          </p>

          <p className="mt-4 text-[0.85rem] font-semibold text-ink/60">
            Indicative sum insured over {months} months
          </p>
          <p className="font-display text-2xl font-bold text-navy">
            {naira.format(result.sumInsured)}
          </p>

          {months === 12 && (
            <p className="mt-4 rounded-lg bg-white p-4 text-[0.88rem] leading-relaxed text-ink/80">
              Worth testing 24 months too. If rebuilding involves construction or
              imported plant, twelve months is rarely enough — and the shortfall
              falls entirely on you.
            </p>
          )}
        </div>
      )}

      <p className="mt-5 text-[0.8rem] leading-relaxed text-ink/55">
        A starting point for a conversation, not a figure to insure on. The
        precise definition varies by policy wording — we will work it out
        properly with you.
      </p>
    </div>
  );
}

export function CalculatorPair() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SumInsuredCalculator />
      <BusinessInterruptionCalculator />
    </div>
  );
}

export function CalculatorFooterNote() {
  return (
    <p className="mt-8 text-center text-[0.9rem] text-ink/65">
      Numbers look wrong?{" "}
      <Link
        href="/policy-review"
        className="font-semibold text-navy underline decoration-orange decoration-2 underline-offset-4 hover:text-orange"
      >
        Send us the policy
      </Link>{" "}
      and we will tell you exactly where you stand.
    </p>
  );
}
