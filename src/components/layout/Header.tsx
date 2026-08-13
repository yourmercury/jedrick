"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Container from "@/components/ui/Container";
import { nav, contact } from "@/lib/site";
import { cn } from "@/lib/cn";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility strip — puts a human contact route above everything else,
          which matters for a business whose primary goal is conversations. */}
      <div className="hidden bg-navy-ink text-white/80 xl:block">
        <Container size="wide">
          <div className="flex h-9 items-center justify-between text-[0.78rem]">
            <p className="flex items-center gap-2">
              <Icon name="umbrella" className="size-4 text-orange" />
              <span className="font-medium tracking-wide">
                Insurance Simplified, Security Amplified.
              </span>
            </p>
            <div className="flex items-center gap-6">
              <a
                href={contact.phoneHref}
                className="flex items-center gap-2 transition hover:text-white"
              >
                <Icon name="phone" className="size-3.5" />
                {contact.phone}
              </a>
              <a
                href={contact.emailHref}
                className="flex items-center gap-2 transition hover:text-white"
              >
                <Icon name="mail" className="size-3.5" />
                {contact.email}
              </a>
            </div>
          </div>
        </Container>
      </div>

      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-gray-line/50 bg-white/90 shadow-[0_10px_30px_-20px_rgba(15,28,72,0.5)] backdrop-blur-md"
            : "border-transparent bg-white",
        )}
      >
        <Container size="wide">
          <div className="flex h-[4.5rem] items-center justify-between gap-6">
            <Logo width={168} priority />

            {/* Desktop nav */}
            <nav
              className="hidden items-center gap-1 xl:flex"
              onMouseLeave={() => setOpenMenu(null)}
            >
              {nav.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.label)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.9rem] font-medium whitespace-nowrap transition",
                      openMenu === item.label
                        ? "bg-mist text-navy"
                        : "text-ink hover:text-navy",
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <svg
                        viewBox="0 0 24 24"
                        className={cn(
                          "size-3.5 transition-transform duration-200",
                          openMenu === item.label && "rotate-180",
                        )}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    )}
                  </Link>

                  {item.children && openMenu === item.label && (
                    <div className="absolute top-full left-0 pt-3">
                      <div className="w-[22rem] overflow-hidden rounded-2xl border border-gray-line/50 bg-white p-2 shadow-[0_24px_60px_-24px_rgba(15,28,72,0.45)]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="group flex flex-col gap-1 rounded-xl px-4 py-3 transition hover:bg-mist"
                          >
                            <span className="flex items-center gap-2 text-[0.92rem] font-semibold text-navy">
                              {child.label}
                              <Icon
                                name="arrowRight"
                                className="size-3.5 -translate-x-1 text-orange opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                              />
                            </span>
                            {child.description && (
                              <span className="text-[0.82rem] leading-snug text-ink/70">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="hidden items-center gap-3 xl:flex">
              <Link
                href="/risk-assessment"
                className="text-[0.9rem] font-semibold whitespace-nowrap text-navy underline decoration-orange decoration-2 underline-offset-4 transition hover:text-orange"
              >
                Know Your Risk
              </Link>
              <Button href="/contact" variant="primary">
                Book a free consultation
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="flex size-11 items-center justify-center rounded-full border border-gray-line/60 text-navy xl:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {mobileOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto bg-white xl:hidden">
          <Container className="py-6">
            <nav className="flex flex-col divide-y divide-gray-line/40">
              {nav.map((item) => (
                <div key={item.label} className="py-4">
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-lg font-semibold text-navy"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="mt-3 flex flex-col gap-2.5 border-l-2 border-orange/40 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-[0.95rem] text-ink/80"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-6 flex flex-col gap-3">
              <Button href="/risk-assessment" variant="navy" size="lg">
                Know Your Risk — 2 minutes
              </Button>
              <Button href="/contact" variant="primary" size="lg">
                Book a free consultation
              </Button>
            </div>

            <div className="mt-8 space-y-3 rounded-2xl bg-mist p-5 text-sm">
              <a
                href={contact.phoneHref}
                className="flex items-center gap-3 font-semibold text-navy"
              >
                <Icon name="phone" className="size-4 text-orange" />
                {contact.phone}
              </a>
              <a
                href={contact.emailHref}
                className="flex items-center gap-3 text-ink/80"
              >
                <Icon name="mail" className="size-4 text-orange" />
                {contact.email}
              </a>
              <p className="flex items-start gap-3 text-ink/80">
                <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-orange" />
                {contact.address}
              </p>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
