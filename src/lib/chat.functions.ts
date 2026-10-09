import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const CHAT_MESSAGE_MAX_LENGTH = 1000;

const chatMessageSchema = z.object({
  sessionId: z.string().uuid(),
  message: z.string().trim().min(1).max(CHAT_MESSAGE_MAX_LENGTH),
  website: z.string().max(0).optional(),
});

export const submitChatMessage = createServerFn({ method: "POST" })
  .validator((data) => chatMessageSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { success: true };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("chat_messages").insert({
      session_id: data.sessionId,
      message: data.message,
    });

    if (error) {
      console.error("Chat message insert failed", error);
      throw new Error("메시지를 전송하지 못했습니다.");
    }

    return { success: true };
  });
