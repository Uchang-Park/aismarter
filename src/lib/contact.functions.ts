import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const CONTACT_EMAIL = "ucpark01@gmail.com";

export const contactInquirySchema = z.object({
  subject: z
    .string()
    .trim()
    .min(1, "제목을 입력해 주세요.")
    .max(200, "제목은 200자 이내로 입력해 주세요."),
  message: z
    .string()
    .trim()
    .min(1, "내용을 입력해 주세요.")
    .max(5000, "내용은 5000자 이내로 입력해 주세요."),
  authorName: z
    .string()
    .trim()
    .min(1, "작성자를 입력해 주세요.")
    .max(100, "작성자는 100자 이내로 입력해 주세요."),
  email: z.string().trim().email("올바른 이메일 주소를 입력해 주세요.").max(320),
  website: z.string().max(0).optional(),
});

export type ContactInquiry = z.infer<typeof contactInquirySchema>;

export const submitContactInquiry = createServerFn({ method: "POST" })
  .validator((data) => contactInquirySchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { success: true };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_inquiries").insert({
      source: "email-modal",
      subject: data.subject,
      message: data.message,
      author_name: data.authorName,
      email: data.email.toLowerCase(),
    });

    if (error) {
      console.error("Contact inquiry insert failed", error);
      throw new Error("문의 내용을 저장하지 못했습니다.");
    }

    return { success: true };
  });

export const CONSULTATION_CATEGORIES = [
  { value: "adoption", label: "도입문의" },
  { value: "partnership", label: "제휴문의" },
  { value: "advertising", label: "광고문의" },
  { value: "other", label: "기타" },
] as const;

export const consultationRequestSchema = contactInquirySchema.extend({
  category: z.enum(["adoption", "partnership", "advertising", "other"], {
    errorMap: () => ({ message: "문의분류를 선택해 주세요." }),
  }),
});

export type ConsultationRequest = z.infer<typeof consultationRequestSchema>;

export const submitConsultationRequest = createServerFn({ method: "POST" })
  .validator((data) => consultationRequestSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { success: true };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_inquiries").insert({
      source: "consultation-form",
      category: data.category,
      subject: data.subject,
      message: data.message,
      author_name: data.authorName,
      email: data.email.toLowerCase(),
    });

    if (error) {
      console.error("Consultation request insert failed", error);
      throw new Error("응답을 제출하지 못했습니다. 잠시 후 다시 시도해 주세요.");
    }

    return { success: true };
  });

export function buildContactMailto({ subject, message, authorName, email }: ContactInquiry) {
  const body = `작성자: ${authorName}\n회신 이메일: ${email}\n\n${message}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`[AI Smarter 문의] ${subject}`)}&body=${encodeURIComponent(body)}`;
}
