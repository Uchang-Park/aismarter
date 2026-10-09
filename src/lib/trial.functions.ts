import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const trialRequestSchema = z.object({
  email: z.string().trim().email("올바른 이메일 주소를 입력해 주세요.").max(320),
  website: z.string().max(0).optional(),
});

export const submitTrialRequest = createServerFn({ method: "POST" })
  .inputValidator((data) => trialRequestSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { success: true };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("trial_requests").insert({
      email: data.email.toLowerCase(),
      source: "website-free-trial",
    });

    if (error) {
      console.error("Trial request insert failed", error);
      throw new Error("신청을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.");
    }

    return { success: true };
  });
