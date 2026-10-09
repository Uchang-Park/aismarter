import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, BarChart3, Check, CheckCircle2, Clock3, FileText, Instagram, Play, Sparkles, Video, WandSparkles, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactHub } from "@/components/marketing/contact-hub";
import { ContactLink } from "@/components/marketing/site-shell";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "AI Smarter — 리뷰가 3초 만에 마케팅 콘텐츠로" },
    { name: "description", content: "매장 리뷰를 블로그 글, 숏폼 대본, SNS 카드뉴스로 자동 변환하는 소상공인용 AI 마케팅 플랫폼입니다." },
    { property: "og:title", content: "AI Smarter — 리뷰가 3초 만에 마케팅 콘텐츠로" },
    { property: "og:description", content: "리뷰 수집부터 콘텐츠 제작까지, 바쁜 사장님의 마케팅을 3초 만에 자동화하세요." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: HomePage,
});

const features = [
  { id: "blog", icon: FileText, name: "AI 블로그 작성기", label: "BLOG", title: "검색되는 글은 키워드부터 다릅니다", description: "지역명과 업종 키워드를 자연스럽게 녹여 네이버 검색에 최적화된 매장 이야기를 완성합니다.", items: ["리뷰 말투와 매장 정보 자동 학습", "제목·본문·해시태그 한 번에 생성", "복사해서 바로 발행 가능한 구성"] },
  { id: "shorts", icon: Video, name: "숏폼 대본 생성기", label: "SHORTS", title: "30초 안에 시선을 잡는 숏폼 대본", description: "첫 3초 훅부터 장면별 촬영 팁까지, 릴스와 쇼츠에 바로 쓸 수 있는 대본을 만듭니다.", items: ["장면별 멘트와 촬영 구도", "업종별 인기 훅 자동 제안", "TTS 음성용 문장 최적화"] },
  { id: "social", icon: Instagram, name: "SNS 카드뉴스", label: "SOCIAL", title: "칭찬 리뷰가 매력적인 카드뉴스로", description: "고객의 진심 어린 한마디를 브랜드 톤에 맞는 인스타그램 콘텐츠로 바꿉니다.", items: ["캐러셀 페이지별 카피", "매장 분위기에 맞는 톤앤매너", "도달을 높이는 해시태그 추천"] },
];
const defaultFeature = features[0];

function HomePage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [review, setReview] = useState("사장님이 친절하고 떡볶이가 정말 맛있어요!");
  const [generated, setGenerated] = useState(false);
  const feature = features[activeFeature] ?? defaultFeature;

  if (!feature) return null;

  return (
    <>
      <section className="overflow-hidden bg-hero pt-16 sm:pt-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:pb-28">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-2 text-sm font-bold text-primary shadow-soft"><span>🔥</span> 이미 3,200개 이상의 매장이 경험한 AI Smarter</div>
            <h1 className="mt-7 text-4xl font-black leading-[1.12] sm:text-6xl lg:text-7xl">손님이 남긴 리뷰 한 줄이<br /><span className="text-gradient">내일의 대박 마케팅</span><br />소재가 됩니다</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-xl">리뷰 수집부터 블로그 포스팅, 숏폼 대본, SNS 카드뉴스 제작까지. AI Smarter가 3초 만에 자동으로 만들어 드립니다.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ContactLink className="h-14 px-7 text-base">지금 문의하기 <ArrowRight /></ContactLink>
              <Button variant="outline" className="h-14 px-7 text-base font-bold" onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}><Play className="fill-current" /> 1분 데모 보기</Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-muted-foreground"><span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-success" />카드 등록 없음</span><span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-success" />7일 무료 체험</span><span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-success" />3초 만에 첫 콘텐츠</span></div>
          </motion.div>
          <ProductMockup />
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center"><span className="eyebrow">WHY AI SMARTER</span><h2 className="section-title">마케팅은 줄이고, 매장에 집중하세요</h2><p className="section-copy">매일 반복되는 콘텐츠 고민을 AI가 대신합니다.</p></div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="comparison-panel border-pain/20 bg-pain-soft"><span className="comparison-label text-pain"><X /> BEFORE</span><h3 className="mt-5 text-2xl font-extrabold">사장님 혼자 하는 마케팅</h3><ul className="mt-7 space-y-4 text-muted-foreground"><li>매일 바쁜데 블로그 글 쓸 시간은 없고</li><li>월 100만 원 외주 비용은 부담스럽고</li><li>무엇을 올려야 할지 매번 고민하고</li></ul><div className="mt-8 flex items-center gap-3 border-t border-pain/15 pt-6 font-bold text-pain"><Clock3 /> 매주 평균 10시간 소요</div></div>
            <div className="comparison-panel border-success/20 bg-success-soft"><span className="comparison-label text-success"><Check /> AFTER</span><h3 className="mt-5 text-2xl font-extrabold">AI Smarter와 함께</h3><ul className="mt-7 space-y-4 text-muted-foreground"><li>가게 리뷰를 학습해 100% 맞춤 생성</li><li>월 2만 원대로 전문 마케팅팀 효과</li><li>한 번의 클릭으로 모든 채널 준비 완료</li></ul><div className="mt-8 flex items-center gap-3 border-t border-success/15 pt-6 font-bold text-success"><Sparkles /> 콘텐츠 1개 평균 3초</div></div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/45 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl"><span className="eyebrow">ONE REVIEW, EVERY CHANNEL</span><h2 className="section-title text-left">리뷰 하나로 모든 채널을 채우세요</h2></div>
          <div className="mt-10 grid gap-6 lg:grid-cols-[.72fr_1.28fr]">
            <div className="space-y-2" role="tablist">
              {features.map((item, index) => <Button key={item.id} variant="ghost" role="tab" aria-selected={activeFeature === index} onClick={() => setActiveFeature(index)} className={`h-auto w-full justify-start gap-4 whitespace-normal p-5 text-left ${activeFeature === index ? "bg-background text-primary shadow-soft" : "text-muted-foreground"}`}><span className="grid size-11 shrink-0 place-items-center rounded-md bg-primary/10"><item.icon /></span><span><b className="block text-base text-foreground">{item.name}</b><small className="mt-1 block font-medium">{item.label}</small></span></Button>)}
            </div>
            <motion.div key={feature.id} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} className="overflow-hidden rounded-lg border border-border bg-background shadow-soft">
              <div className="grid min-h-[420px] md:grid-cols-[.9fr_1.1fr]"><div className="p-7 sm:p-10"><span className="eyebrow">{feature.label}</span><h3 className="mt-4 text-3xl font-black leading-tight">{feature.title}</h3><p className="mt-4 leading-7 text-muted-foreground">{feature.description}</p><ul className="mt-7 space-y-3">{feature.items.map((item) => <li key={item} className="flex items-center gap-3 text-sm font-semibold"><CheckCircle2 className="size-5 text-success" />{item}</li>)}</ul></div><FeaturePreview type={feature.id} /></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="demo" className="scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center"><span className="eyebrow">TRY IT NOW</span><h2 className="section-title">리뷰를 넣고, 결과를 확인하세요</h2></div>
          <div className="mt-12 grid overflow-hidden rounded-lg border border-border bg-background shadow-panel lg:grid-cols-2">
            <div className="border-b border-border p-6 sm:p-9 lg:border-b-0 lg:border-r"><label htmlFor="review" className="text-sm font-extrabold">고객 리뷰 입력</label><textarea id="review" value={review} onChange={(e) => { setReview(e.target.value); setGenerated(false); }} className="mt-3 min-h-44 w-full resize-none rounded-md border border-input bg-secondary/50 p-4 leading-7 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="가게에 남겨진 실제 리뷰를 입력해 보세요" /><Button onClick={() => setGenerated(true)} disabled={!review.trim()} className="mt-4 h-12 w-full bg-brand-gradient font-bold shadow-brand hover:opacity-90"><WandSparkles /> AI 소재 생성하기</Button></div>
            <div className="bg-secondary/45 p-6 sm:p-9"><p className="text-sm font-extrabold">AI 생성 결과</p><div className="mt-3 space-y-3">{generated ? <GeneratedResults review={review} /> : <div className="grid min-h-56 place-items-center rounded-md border border-dashed border-border bg-background text-center text-sm leading-6 text-muted-foreground"><div><WandSparkles className="mx-auto mb-3 size-7 text-primary" />왼쪽 리뷰를 입력하고<br />AI 소재 생성하기를 눌러보세요.</div></div>}</div></div>
          </div>
        </div>
      </section>
      <ContactHub />
    </>
  );
}

function ProductMockup() {
  return <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .65, delay: .15 }} className="relative mx-auto w-full max-w-xl"><div className="absolute -inset-4 rounded-xl bg-primary/10 blur-2xl" /><div className="relative overflow-hidden rounded-lg border border-border/80 bg-background shadow-panel"><div className="flex items-center justify-between border-b border-border px-5 py-4"><div className="flex gap-1.5"><i className="size-2.5 rounded-full bg-accent" /><i className="size-2.5 rounded-full bg-kakao" /><i className="size-2.5 rounded-full bg-success" /></div><span className="text-xs font-bold text-muted-foreground">AI SMARTER STUDIO</span><Sparkles className="size-4 text-primary" /></div><div className="grid min-h-[410px] grid-cols-[82px_1fr]"><aside className="border-r border-border bg-secondary/60 p-3"><div className="grid gap-3">{[BarChart3, FileText, Video, Instagram].map((Icon, i) => <span key={i} className={`grid aspect-square place-items-center rounded-md ${i === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}><Icon className="size-4" /></span>)}</div></aside><div className="p-4 sm:p-6"><div className="rounded-md border border-border bg-secondary/50 p-4"><p className="text-[11px] font-bold text-muted-foreground">새 고객 리뷰</p><p className="mt-2 text-sm font-semibold leading-6">“파스타가 정말 맛있고 직원분도 친절해요. 데이트 코스로 추천!”</p></div><div className="my-4 flex items-center justify-center gap-2 text-xs font-extrabold text-primary"><Sparkles className="size-4" /> 3초 만에 콘텐츠 변환 중</div><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-md bg-primary p-4 text-primary-foreground"><Instagram className="size-4" /><p className="mt-8 text-lg font-black">오늘 데이트,<br />여기 어때요?</p><p className="mt-2 text-[10px] opacity-80">#연남동맛집 #데이트코스</p></div><div className="space-y-3"><div className="rounded-md border border-border p-3"><span className="text-[10px] font-black text-coral">SHORTS</span><p className="mt-2 text-xs font-bold">“연남동에서 분위기까지 맛있는 곳?”</p></div><div className="rounded-md border border-border p-3"><span className="text-[10px] font-black text-primary">BLOG</span><p className="mt-2 text-xs font-bold">연남동 데이트 맛집, 직접 다녀온 후기</p></div></div></div></div></div></div></motion.div>;
}

function FeaturePreview({ type }: { type: string }) {
  return <div className="grid place-items-center bg-visual p-6"><div className="w-full max-w-sm rounded-lg border border-border bg-background p-5 shadow-panel"><div className="flex items-center justify-between"><span className="text-xs font-black text-primary">AI SMARTER OUTPUT</span><span className="rounded-full bg-success-soft px-2 py-1 text-[10px] font-bold text-success">생성 완료</span></div><h4 className="mt-6 text-xl font-black">{type === "blog" ? "연남동 데이트 맛집, 분위기와 맛을 모두 잡은 곳" : type === "shorts" ? "3초 훅: 연남동에서 아직 여기 안 가봤어요?" : "고객이 직접 뽑은 우리 가게 BEST 3"}</h4><div className="mt-5 space-y-2"><div className="h-2 w-3/4 rounded-full bg-border" /><div className="h-2 w-11/12 rounded-full bg-border" /><div className="h-2 w-2/3 rounded-full bg-border" /><div className="h-2 w-5/6 rounded-full bg-border" /></div><div className="mt-7 flex items-center gap-2 text-xs font-bold text-muted-foreground"><Sparkles className="size-4 text-primary" />브랜드 톤 적용 완료</div></div></div>;
}

function GeneratedResults({ review }: { review: string }) {
  const subject = review.includes("떡볶이") ? "떡볶이" : "우리 가게";
  return <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3"><Result label="블로그 제목" text={`동네 단골이 추천한 ${subject} 맛집, 친절함까지 특별한 이유`} /><Result label="숏폼 훅" text={`“한 번 먹으면 단골 되는 ${subject}, 진짜 이유는?”`} /><Result label="추천 해시태그" text="#동네맛집 #리뷰추천 #사장님친절 #맛집탐방" /></motion.div>;
}
function Result({ label, text }: { label: string; text: string }) { return <div className="rounded-md border border-border bg-background p-4"><span className="text-[11px] font-black text-primary">{label}</span><p className="mt-2 text-sm font-bold leading-6">{text}</p></div>; }
