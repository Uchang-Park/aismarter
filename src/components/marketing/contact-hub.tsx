import { ClipboardList, Mail, MessageCircle } from "lucide-react";
import { ConsultationFormDialog } from "@/components/marketing/consultation-form-dialog";
import { ContactEmailDialog } from "@/components/marketing/contact-email-dialog";
import { KakaoChatDialog } from "@/components/marketing/kakao-chat-dialog";

export function ContactHub() {
  return (
    <section id="contact-cta" className="scroll-mt-24 bg-contact py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">START SMARTER</span>
          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">가장 편한 방법으로<br />오늘 바로 시작하세요</h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">이메일 문의, 맞춤 상담, 카카오톡 중 원하는 채널을 선택해 보세요.</p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <article className="contact-card">
            <span className="icon-tile"><Mail /></span>
            <div><h3 className="text-xl font-extrabold">이메일 문의</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">7일 무료 체험, 요금제, 도입 상담 등 궁금한 점을 남겨 주세요.</p></div>
            <ContactEmailDialog />
          </article>
          <article className="contact-card">
            <span className="icon-tile"><ClipboardList /></span>
            <div><h3 className="text-xl font-extrabold">1:1 맞춤 상담</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">매장 상황에 맞는 활용법과 요금제를 함께 찾아드립니다.</p></div>
            <ConsultationFormDialog />
          </article>
          <article className="contact-card">
            <span className="icon-tile bg-kakao text-kakao-foreground"><MessageCircle /></span>
            <div><h3 className="text-xl font-extrabold">카카오톡 상담</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">궁금한 점을 편하게 묻고 빠르게 답변받으세요.</p></div>
            <KakaoChatDialog />
          </article>
        </div>
      </div>
    </section>
  );
}
