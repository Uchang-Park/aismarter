import { useServerFn } from "@tanstack/react-start";
import { CircleAlert, ClipboardList } from "lucide-react";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CONSULTATION_CATEGORIES,
  consultationRequestSchema,
  submitConsultationRequest,
} from "@/lib/contact.functions";
import { cn } from "@/lib/utils";

type FieldName = "category" | "subject" | "message" | "authorName" | "email";
type FieldErrors = Partial<Record<FieldName, string | undefined>>;
type Status = "idle" | "loading" | "submitted";

const textInputClass =
  "w-full border-0 border-b border-black/15 bg-transparent px-0 pb-1.5 pt-2 text-sm text-[#202124] outline-none transition-[border-color,box-shadow] placeholder:text-[#70757a] focus:border-[#673ab7] focus:shadow-[0_1px_0_0_#673ab7]";

function QuestionCard({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor?: string | undefined;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white p-6 transition-colors",
        error ? "border-[#d93025]" : "border-[#dadce0]",
      )}
    >
      <label htmlFor={htmlFor} className="block text-base leading-6 text-[#202124]">
        {label} <span className="text-[#d93025]">*</span>
      </label>
      <div className="mt-4">{children}</div>
      {error && (
        <p role="alert" className="mt-3 flex items-center gap-2 text-xs text-[#d93025]">
          <CircleAlert className="size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function ConsultationFormDialog() {
  const submitConsultation = useServerFn(submitConsultationRequest);
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");

  function resetState() {
    setStatus("idle");
    setErrors({});
    setSubmitError("");
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) resetState();
  }

  function clearForm() {
    formRef.current?.reset();
    setErrors({});
    setSubmitError("");
  }

  function clearFieldError(name: string) {
    if (name in errors) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = consultationRequestSchema.safeParse({
      category: form.get("category") ?? "",
      subject: String(form.get("subject") ?? ""),
      message: String(form.get("message") ?? ""),
      authorName: String(form.get("authorName") ?? ""),
      email: String(form.get("email") ?? ""),
      website: String(form.get("website") ?? ""),
    });

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as FieldName;
        nextErrors[field] ??= issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitError("");
    setStatus("loading");
    try {
      await submitConsultation({ data: parsed.data });
      setStatus("submitted");
    } catch (error) {
      setStatus("idle");
      setSubmitError(error instanceof Error ? error.message : "응답을 제출하지 못했습니다.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="mt-auto h-12 w-full font-bold">
          <ClipboardList className="size-4" />
          1:1 맞춤 상담 신청하기
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-[680px] gap-3 overflow-y-auto border-0 bg-[#f0ebf8] p-3 sm:rounded-xl sm:p-4">
        <div className="overflow-hidden rounded-lg border border-[#dadce0] bg-white">
          <div className="h-2.5 bg-[#673ab7]" />
          <div className="px-6 pb-5 pt-5">
            <DialogTitle className="pr-6 text-[28px] font-normal leading-tight text-[#202124]">
              AI Smarter 1:1 맞춤 상담 신청
            </DialogTitle>
            <DialogDescription className="mt-3 text-sm leading-6 text-[#202124]">
              {status === "submitted"
                ? "응답이 기록되었습니다."
                : "매장 상황에 맞는 활용법과 요금제를 안내해 드립니다. 남겨주신 이메일로 담당자가 연락드립니다."}
            </DialogDescription>
          </div>
          {status !== "submitted" && (
            <p className="border-t border-[#dadce0] px-6 py-3 text-sm text-[#d93025]">
              * 표시는 필수 질문임
            </p>
          )}
          {status === "submitted" && (
            <div className="px-6 pb-6">
              <button
                type="button"
                onClick={() => resetState()}
                className="text-sm text-[#673ab7] underline-offset-2 hover:underline"
              >
                다른 응답 제출
              </button>
            </div>
          )}
        </div>

        {status !== "submitted" && (
          <form
            ref={formRef}
            noValidate
            onSubmit={handleSubmit}
            onChange={(event) => {
              const target: EventTarget = event.target;
              if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
                clearFieldError(target.name);
              }
            }}
            className="space-y-3"
          >
            <QuestionCard label="문의분류" error={errors.category}>
              <div role="radiogroup" aria-label="문의분류" className="space-y-1">
                {CONSULTATION_CATEGORIES.map((category) => (
                  <label
                    key={category.value}
                    className="flex cursor-pointer items-center gap-3 rounded py-2 text-sm text-[#202124]"
                  >
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      className="size-5 cursor-pointer accent-[#673ab7]"
                    />
                    {category.label}
                  </label>
                ))}
              </div>
            </QuestionCard>

            <QuestionCard label="제목" htmlFor="consult-subject" error={errors.subject}>
              <input
                id="consult-subject"
                name="subject"
                maxLength={200}
                placeholder="내 답변"
                className={cn(textInputClass, "sm:w-1/2", errors.subject && "border-[#d93025]")}
              />
            </QuestionCard>

            <QuestionCard label="내용" htmlFor="consult-message" error={errors.message}>
              <textarea
                id="consult-message"
                name="message"
                maxLength={5000}
                rows={3}
                placeholder="내 답변"
                className={cn(textInputClass, "resize-y", errors.message && "border-[#d93025]")}
              />
            </QuestionCard>

            <QuestionCard label="작성자" htmlFor="consult-author" error={errors.authorName}>
              <input
                id="consult-author"
                name="authorName"
                maxLength={100}
                placeholder="내 답변"
                className={cn(textInputClass, "sm:w-1/2", errors.authorName && "border-[#d93025]")}
              />
            </QuestionCard>

            <QuestionCard label="이메일" htmlFor="consult-email" error={errors.email}>
              <input
                id="consult-email"
                name="email"
                type="email"
                maxLength={320}
                placeholder="내 답변"
                className={cn(textInputClass, "sm:w-1/2", errors.email && "border-[#d93025]")}
              />
            </QuestionCard>

            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            {submitError && (
              <p role="alert" className="flex items-center gap-2 px-1 text-sm text-[#d93025]">
                <CircleAlert className="size-4 shrink-0" />
                {submitError}
              </p>
            )}

            <div className="flex items-center justify-between px-1 pb-2 pt-1">
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded bg-[#673ab7] px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#5e35b1] hover:shadow disabled:opacity-60"
              >
                {status === "loading" ? "제출 중…" : "제출"}
              </button>
              <button
                type="button"
                onClick={clearForm}
                className="rounded px-2 py-2 text-sm font-medium text-[#673ab7] transition hover:bg-[#673ab7]/5"
              >
                양식 지우기
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
