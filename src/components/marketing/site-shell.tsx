import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "메인", to: "/" as const },
  { label: "활용 효과", to: "/impact" as const },
  { label: "요금제", to: "/pricing" as const },
];

export function ContactLink({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Button asChild className={cn("h-12 bg-brand-gradient px-6 text-base font-bold shadow-brand hover:opacity-90", className)}>
      <Link to="/" hash="contact-cta">{children}</Link>
    </Button>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (window.location.hash === "#contact-cta") {
      requestAnimationFrame(() => document.getElementById("contact-cta")?.scrollIntoView({ behavior: "smooth" }));
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-xl font-black tracking-normal" aria-label="AI Smarter 홈">
            <span className="grid size-9 place-items-center rounded-lg bg-brand-gradient text-primary-foreground shadow-brand"><Sparkles className="size-5" /></span>
            AI Smarter
          </Link>
          <nav className="hidden items-center gap-8 md:flex" aria-label="주요 메뉴">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} activeOptions={{ exact: item.to === "/" }} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-primary" }}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block"><ContactLink className="h-10 px-5 text-sm">문의하기</ContactLink></div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "메뉴 닫기" : "메뉴 열기"}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
        {open && (
          <div className="border-t border-border bg-background px-5 py-5 md:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => <Button key={item.to} asChild variant="ghost" className="justify-start"><Link to={item.to}>{item.label}</Link></Button>)}
              <ContactLink className="mt-3 w-full">문의하기</ContactLink>
            </nav>
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer className="border-t border-border bg-secondary/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-2 font-bold text-foreground"><Sparkles className="size-4 text-primary" /> AI Smarter</div>
          <p>리뷰를 매출로 바꾸는 가장 빠른 방법</p>
          <p>© 2026 AI Smarter</p>
        </div>
      </footer>
    </div>
  );
}
