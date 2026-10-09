import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  buildContactMailto,
  CONTACT_EMAIL,
  contactInquirySchema,
  submitContactInquiry,
} from "@/lib/contact.functions";

type Status = "idle" | "loading" | "success" | "error";

export function ContactEmailDialog() {
  const submitInquiry = useServerFn(submitContactInquiry);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setStatus("idle");
      setMessage("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const parsed = contactInquirySchema.safeParse({
      subject: String(form.get("subject") ?? ""),
      message: String(form.get("message") ?? ""),
      authorName: String(form.get("authorName") ?? ""),
      email: String(form.get("email") ?? ""),
      website: String(form.get("website") ?? ""),
    });

    if (!parsed.success) {
      setStatus("error");
      setMessage(parsed.error.issues[0]?.message ?? "입력 내용을 확인해 주세요.");
      return;
    }

    setStatus("loading");
    let saved = true;
    try {
      await submitInquiry({ data: parsed.data });
    } catch (error) {
      console.error(error);
      saved = false;
    }

    window.location.href = buildContactMailto(parsed.data);
    setStatus("success");
    setMessage(
      saved
        ? "메일 앱이 열렸습니다. 내용을 확인한 뒤 보내기를 눌러 주세요."
        : "메일 앱이 열렸습니다. 보내기를 눌러 주세요. (문의 기록 저장에는 실패했습니다.)",
    );
    formElement.reset();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="mt-auto h-12 w-full bg-brand-gradient font-bold shadow-brand hover:opacity-90">
          <Mail className="size-4" />
          이메일로 문의하기
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold">이메일 문의</DialogTitle>
          <DialogDescription>
            작성하신 내용은 {CONTACT_EMAIL}(으)로 전송됩니다. 제출하면 메일 앱이 열립니다.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contact-subject">제목</Label>
            <Input
              id="contact-subject"
              name="subject"
              required
              maxLength={200}
              placeholder="문의 제목"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">내용</Label>
            <Textarea
              id="contact-message"
              name="message"
              required
              maxLength={5000}
              rows={6}
              placeholder="문의하실 내용을 입력해 주세요."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-author">작성자</Label>
              <Input
                id="contact-author"
                name="authorName"
                required
                maxLength={100}
                placeholder="이름 또는 매장명"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">이메일</Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                required
                maxLength={320}
                placeholder="회신받을 이메일"
                className="h-11"
              />
            </div>
          </div>
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
          <Button
            type="submit"
            disabled={status === "loading"}
            className="h-12 w-full bg-brand-gradient font-bold shadow-brand hover:opacity-90"
          >
            {status === "loading" ? "처리 중…" : "문의 보내기"}
          </Button>
          {message && (
            <p
              role="status"
              className={`flex items-center gap-2 text-xs ${status === "success" ? "text-success" : "text-destructive"}`}
            >
              {status === "success" && <CheckCircle2 className="size-4 shrink-0" />}
              {message}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
