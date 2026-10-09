import { createFileRoute } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ContactLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [
    { title: "요금제 및 FAQ — AI Smarter" },
    { name: "description", content: "매장 규모와 성장 단계에 맞는 AI Smarter 요금제를 비교하고 자주 묻는 질문을 확인하세요." },
    { property: "og:title", content: "요금제 및 FAQ — AI Smarter" },
    { property: "og:description", content: "월 19,900원부터 시작하는 리뷰 기반 AI 마케팅 자동화 요금제를 만나보세요." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: PricingPage,
});

const plans = [
  { name: "스타터", en: "STARTER", monthly: 19900, intro: "처음 온라인 마케팅을 시작하는 1개 매장", features: ["월 50회 AI 콘텐츠 생성", "블로그 & SNS 형식", "리뷰 소스 1개 연동"], action: "스타터 요금제로 문의하기" },
  { name: "프로", en: "PRO", monthly: 39900, intro: "콘텐츠와 매장을 함께 키우는 사업자", featured: true, features: ["AI 콘텐츠 무제한 생성", "숏폼 대본 + TTS 음성 생성", "네이버·Google·배민 리뷰 자동 연동", "최대 3개 매장 관리"], action: "프로 요금제로 문의하기" },
  { name: "프리미엄 엔터프라이즈", en: "ENTERPRISE", monthly: 89900, intro: "다점포 매장과 프랜차이즈 본사", features: ["프로 요금제 전체 기능", "1:1 전담 마케팅 컨설턴트", "맞춤 브랜드 템플릿", "자동 발행 API"], action: "엔터프라이즈 문의하기" },
];

function PricingPage() {
  const [yearly, setYearly] = useState(false);
  return <>
    <section className="bg-hero py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 text-center lg:px-8"><span className="eyebrow">SIMPLE PRICING</span><h1 className="mt-5 text-4xl font-black sm:text-6xl">외주비는 줄이고,<br /><span className="text-gradient">마케팅 성과는 더 크게</span></h1><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">모든 요금제는 7일 무료로 경험할 수 있습니다. 카드 등록도 필요 없습니다.</p><div className="mx-auto mt-9 inline-flex items-center rounded-md border border-border bg-background p-1 shadow-soft"><Button variant={yearly ? "ghost" : "default"} onClick={() => setYearly(false)}>월간 결제</Button><Button variant={yearly ? "default" : "ghost"} onClick={() => setYearly(true)}>연간 결제 <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[10px] text-accent">20% 할인</span></Button></div></div></section>
    <section className="pb-20 sm:pb-28"><div className="mx-auto -mt-5 grid max-w-7xl items-stretch gap-5 px-5 lg:grid-cols-3 lg:px-8">{plans.map((plan) => { const price = yearly ? Math.round(plan.monthly * .8 / 100) * 100 : plan.monthly; return <article key={plan.name} className={`pricing-card ${plan.featured ? "border-primary shadow-panel lg:-translate-y-3" : ""}`}>{plan.featured && <div className="-mx-7 -mt-7 mb-6 flex items-center justify-center gap-2 rounded-t-lg bg-brand-gradient py-2 text-xs font-black text-primary-foreground"><Sparkles className="size-4" /> 가장 많이 선택해요</div>}<span className="text-xs font-black text-primary">{plan.en}</span><h2 className="mt-2 text-2xl font-black">{plan.name}</h2><p className="mt-3 min-h-12 text-sm leading-6 text-muted-foreground">{plan.intro}</p><div className="mt-7"><strong className="text-4xl font-black">₩{price.toLocaleString()}</strong><span className="text-sm text-muted-foreground"> / 월</span>{yearly && <p className="mt-1 text-xs font-bold text-success">연간 결제 기준 · 20% 절약</p>}</div><ul className="mt-8 flex-1 space-y-4">{plan.features.map((feature) => <li key={feature} className="flex gap-3 text-sm font-semibold"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/10"><Check className="size-3 text-primary" /></span>{feature}</li>)}</ul><ContactLink className={`mt-8 w-full ${plan.featured ? "" : "bg-primary shadow-none"}`}>{plan.action}</ContactLink></article>})}</div></section>
    <section className="bg-secondary/45 py-20 sm:py-28"><div className="mx-auto max-w-3xl px-5 lg:px-8"><div className="text-center"><span className="eyebrow">FAQ</span><h2 className="section-title">사장님들이 자주 묻는 질문</h2></div><Accordion type="single" collapsible className="mt-10 rounded-lg border border-border bg-background px-6 shadow-soft"><AccordionItem value="q1"><AccordionTrigger className="py-6 text-base">컴퓨터를 잘 못 다루는 사장님도 사용할 수 있나요?</AccordionTrigger><AccordionContent className="pb-6 leading-7 text-muted-foreground">네. 리뷰를 복사해 붙여넣고 버튼 한 번만 누르면 콘텐츠가 완성됩니다.</AccordionContent></AccordionItem><AccordionItem value="q2"><AccordionTrigger className="py-6 text-base">생성된 글이 저작권이나 어뷰징에 걸리지 않나요?</AccordionTrigger><AccordionContent className="pb-6 leading-7 text-muted-foreground">최신 SEO 가이드라인을 준수하며, 입력한 리뷰와 매장 정보를 바탕으로 매번 독창적인 문장으로 재구성합니다.</AccordionContent></AccordionItem><AccordionItem value="q3"><AccordionTrigger className="py-6 text-base">문의나 상담은 어떻게 진행되나요?</AccordionTrigger><AccordionContent className="pb-6 leading-7 text-muted-foreground">메인 페이지 하단의 문의 영역에서 이메일 등록, 구글폼 문의, 카카오톡 오픈채팅 중 편한 방법으로 연결할 수 있습니다.</AccordionContent></AccordionItem></Accordion><div className="mt-10 text-center"><ContactLink>7일 무료로 시작하기</ContactLink></div></div></section>
  </>;
}
