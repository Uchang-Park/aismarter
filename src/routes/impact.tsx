import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CheckCircle2, ChevronLeft, ChevronRight, Clock3, Palette, Send, Sparkles, Star, TrendingUp, WalletCards } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/impact")({
  head: () => ({ meta: [
    { title: "활용 효과 — AI Smarter" },
    { name: "description", content: "AI Smarter로 콘텐츠 제작 시간을 95% 줄이고 방문자와 매출을 높인 실제 활용 효과를 확인하세요." },
    { property: "og:title", content: "활용 효과 — AI Smarter" },
    { property: "og:description", content: "리뷰 기반 자동 마케팅이 매장 운영에 만드는 실질적인 변화를 확인하세요." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: ImpactPage,
});

const cases = [
  { store: "연남동 A 카페", category: "카페 · 서울 마포", quote: "주말에 쌓인 리뷰로 월요일 아침 일주일 치 인스타그램 업로드가 끝납니다.", result: "매출 35% 상승", initials: "A" },
  { store: "성수동 B 고깃집", category: "외식 · 서울 성동", quote: "AI Smarter가 써준 숏폼 대본으로 찍은 릴스가 10만 뷰를 넘었어요!", result: "릴스 10만 뷰", initials: "B" },
  { store: "분당 C 필라테스", category: "피트니스 · 경기 성남", quote: "회원 후기를 꾸준히 콘텐츠로 올리니 신규 상담이 자연스럽게 늘었습니다.", result: "상담 2.8배 증가", initials: "C" },
];
const defaultCase = cases[0];

function ImpactPage() {
  const [active, setActive] = useState(0);
  const item = cases[active] ?? defaultCase;
  if (!item) return null;
  return <>
    <section className="bg-hero py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 text-center lg:px-8"><span className="eyebrow">REAL IMPACT</span><h1 className="mt-5 text-4xl font-black sm:text-6xl">사장님의 하루와<br /><span className="text-gradient">매출이 함께 달라집니다</span></h1><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">복잡한 마케팅을 자동화하고, 가장 중요한 고객과 매장 운영에 집중하세요.</p></div></section>
    <section className="pb-20 sm:pb-28"><div className="mx-auto -mt-7 grid max-w-6xl gap-3 px-5 md:grid-cols-3 lg:px-8">{[
      { icon: Clock3, value: "95%", label: "콘텐츠 제작 시간 단축", detail: "2시간 → 3분" }, { icon: TrendingUp, value: "3.4배", label: "SNS 방문자 유입 증가", detail: "도입 매장 평균" }, { icon: WalletCards, value: "120만원", label: "월 마케팅 비용 절감", detail: "외주 대비 평균" }
    ].map((stat, i) => <motion.article key={stat.label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }} className="stat-card"><stat.icon className="size-6 text-primary" /><strong className="mt-5 block text-4xl font-black">{stat.value}</strong><p className="mt-2 font-bold">{stat.label}</p><small className="mt-1 text-muted-foreground">{stat.detail}</small></motion.article>)}</div></section>
    <section className="bg-secondary/45 py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="mx-auto max-w-3xl text-center"><span className="eyebrow">HOW IT WORKS</span><h2 className="section-title">리뷰에서 발행까지, 네 단계면 충분합니다</h2></div><div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{[
      { icon: CheckCircle2, title: "리뷰 연동/입력", text: "네이버 플레이스와 Google Maps 리뷰를 한 번에 모아요." }, { icon: Palette, title: "톤앤매너 설정", text: "감성적, 재치 있는, 전문적인 말투 중 선택하세요." }, { icon: Sparkles, title: "자동 소재 생성", text: "여러 채널에 맞는 콘텐츠가 즉시 완성됩니다." }, { icon: Send, title: "자동 발행 & 예약", text: "원하는 날짜와 채널에 맞춰 발행을 예약합니다." }
    ].map((step, i) => <article key={step.title} className="workflow-step"><span className="text-xs font-black text-primary">STEP 0{i + 1}</span><step.icon className="mt-8 size-7 text-primary" /><h3 className="mt-5 text-lg font-extrabold">{step.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{step.text}</p></article>)}</div></div></section>
    <section className="py-20 sm:py-28"><div className="mx-auto max-w-5xl px-5 lg:px-8"><div className="text-center"><span className="eyebrow">STORE STORIES</span><h2 className="section-title">먼저 시작한 사장님들의 변화</h2></div><motion.article key={item.store} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="mt-12 grid overflow-hidden rounded-lg border border-border bg-background shadow-panel md:grid-cols-[.65fr_1.35fr]"><div className="grid min-h-64 place-items-center bg-brand-gradient p-8"><div className="grid size-28 place-items-center rounded-full border-4 border-primary-foreground/40 bg-background/15 text-5xl font-black text-primary-foreground">{item.initials}</div></div><div className="p-7 sm:p-10"><div className="flex items-center gap-1 text-kakao">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-5 fill-current" />)}</div><blockquote className="mt-6 text-2xl font-black leading-relaxed">“{item.quote}”</blockquote><div className="mt-7 flex flex-wrap items-center justify-between gap-4"><div><p className="font-extrabold">{item.store} <CheckCircle2 className="ml-1 inline size-4 text-primary" /></p><p className="text-sm text-muted-foreground">{item.category}</p></div><span className="rounded-full bg-success-soft px-4 py-2 text-sm font-black text-success">{item.result}</span></div></div></motion.article><div className="mt-6 flex justify-center gap-2"><Button variant="outline" size="icon" aria-label="이전 후기" onClick={() => setActive((active - 1 + cases.length) % cases.length)}><ChevronLeft /></Button>{cases.map((entry, i) => <Button key={entry.store} variant={i === active ? "default" : "outline"} size="icon" className="size-9" onClick={() => setActive(i)} aria-label={`${i + 1}번 후기`}>{i + 1}</Button>)}<Button variant="outline" size="icon" aria-label="다음 후기" onClick={() => setActive((active + 1) % cases.length)}><ChevronRight /></Button></div><div className="mt-12 text-center"><ContactLink>AI Smarter 효과 직접 체험해보기 <ChevronRight /></ContactLink></div></div></section>
  </>;
}
