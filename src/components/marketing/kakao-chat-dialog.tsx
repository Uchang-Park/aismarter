import { useServerFn } from "@tanstack/react-start";
import {
  ArrowUp,
  Calendar,
  ChevronLeft,
  Hash,
  Menu,
  MessageCircle,
  Smile,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CHAT_MESSAGE_MAX_LENGTH, submitChatMessage } from "@/lib/chat.functions";
import {
  CHAT_BOT_NAME,
  CHAT_QUICK_REPLIES,
  CHAT_WELCOME_MESSAGES,
  getBotReply,
} from "@/lib/chat-replies";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  sender: "me" | "bot";
  text: string;
  createdAt: number;
  status?: "sending" | "sent" | "failed";
  read?: boolean;
};

type StoredChat = { sessionId: string; messages: ChatMessage[] };

const STORAGE_KEY = "ai-smarter-kakao-chat-v1";
const EMOJIS = [
  "😊",
  "😂",
  "🥰",
  "😍",
  "🤔",
  "😅",
  "😭",
  "👍",
  "👏",
  "🙏",
  "🎉",
  "🔥",
  "❤️",
  "💯",
  "☕",
  "🍀",
];

const timeFormatter = new Intl.DateTimeFormat("ko-KR", { hour: "numeric", minute: "2-digit" });
const dateFormatter = new Intl.DateTimeFormat("ko-KR", { dateStyle: "full" });

function createId() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6]! & 0x0f) | 0x40;
  bytes[8] = (bytes[8]! & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function createWelcomeChat(): StoredChat {
  const now = Date.now();
  return {
    sessionId: createId(),
    messages: CHAT_WELCOME_MESSAGES.map((text) => ({
      id: createId(),
      sender: "bot",
      text,
      createdAt: now,
    })),
  };
}

function loadChat(): StoredChat {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createWelcomeChat();
    const stored = JSON.parse(raw) as StoredChat;
    return {
      sessionId: stored.sessionId,
      messages: stored.messages.map((message) =>
        message.status === "sending" ? { ...message, status: "failed" } : message,
      ),
    };
  } catch {
    return createWelcomeChat();
  }
}

const minuteOf = (timestamp: number) => Math.floor(timestamp / 60000);
const dayOf = (timestamp: number) => new Date(timestamp).toDateString();

function BotAvatar() {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-[15px] bg-brand-gradient text-white">
      <Sparkles className="size-5" />
    </span>
  );
}

export function KakaoChatDialog() {
  const sendChatMessage = useServerFn(submitChatMessage);
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState<StoredChat | null>(null);
  const [draft, setDraft] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [failedMenuId, setFailedMenuId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    if (open && !chat) setChat(loadChat());
  }, [open, chat]);

  useEffect(() => {
    if (chat) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(chat));
  }, [chat]);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  }, [chat?.messages.length, botTyping, open]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  function later(callback: () => void, delay: number) {
    timersRef.current.push(window.setTimeout(callback, delay));
  }

  function updateMessage(id: string, patch: Partial<ChatMessage>) {
    setChat((current) =>
      current
        ? {
            ...current,
            messages: current.messages.map((message) =>
              message.id === id ? { ...message, ...patch } : message,
            ),
          }
        : current,
    );
  }

  function appendMessage(message: ChatMessage) {
    setChat((current) =>
      current ? { ...current, messages: [...current.messages, message] } : current,
    );
  }

  async function deliver(message: ChatMessage, sessionId: string) {
    try {
      await sendChatMessage({ data: { sessionId, message: message.text } });
      updateMessage(message.id, { status: "sent" });
      later(() => {
        updateMessage(message.id, { read: true });
        setBotTyping(true);
      }, 700);
      later(() => {
        setBotTyping(false);
        appendMessage({
          id: createId(),
          sender: "bot",
          text: getBotReply(message.text),
          createdAt: Date.now(),
        });
      }, 1900);
    } catch (error) {
      console.error(error);
      updateMessage(message.id, { status: "failed" });
    }
  }

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || !chat) return;
    const message: ChatMessage = {
      id: createId(),
      sender: "me",
      text: trimmed.slice(0, CHAT_MESSAGE_MAX_LENGTH),
      createdAt: Date.now(),
      status: "sending",
      read: false,
    };
    appendMessage(message);
    setDraft("");
    setEmojiOpen(false);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    void deliver(message, chat.sessionId);
  }

  function resend(message: ChatMessage) {
    if (!chat) return;
    setFailedMenuId(null);
    const retried = { ...message, status: "sending" as const, createdAt: Date.now() };
    setChat((current) =>
      current
        ? {
            ...current,
            messages: [...current.messages.filter((item) => item.id !== message.id), retried],
          }
        : current,
    );
    void deliver(retried, chat.sessionId);
  }

  function removeMessage(id: string) {
    setFailedMenuId(null);
    setChat((current) =>
      current
        ? { ...current, messages: current.messages.filter((message) => message.id !== id) }
        : current,
    );
  }

  function clearChat() {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
    setBotTyping(false);
    setMenuOpen(false);
    setChat(createWelcomeChat());
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      send(draft);
    }
  }

  function autoResize(element: HTMLTextAreaElement) {
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, 96)}px`;
  }

  const messages = chat?.messages ?? [];
  const lastIsBot = messages.at(-1)?.sender === "bot";

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        setMenuOpen(false);
        setEmojiOpen(false);
        setFailedMenuId(null);
      }}
    >
      <DialogTrigger asChild>
        <Button className="mt-auto h-12 w-full bg-kakao font-bold text-kakao-foreground hover:bg-kakao/90">
          <MessageCircle className="size-4" />
          카카오톡 상담 시작하기
        </Button>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          textareaRef.current?.focus();
        }}
        className="flex h-[min(720px,90vh)] max-w-[420px] flex-col gap-0 overflow-hidden border-0 bg-[#bacee0] p-0 sm:rounded-2xl [&>button:last-child]:hidden"
      >
        <header className="relative flex h-14 shrink-0 items-center gap-1 px-2">
          <DialogClose
            className="flex size-9 items-center justify-center rounded-full text-[#191919] hover:bg-black/5"
            aria-label="채팅방 나가기"
          >
            <ChevronLeft className="size-6" />
          </DialogClose>
          <DialogTitle className="flex items-baseline gap-1.5 text-[16px] font-bold text-[#191919]">
            {CHAT_BOT_NAME}
            <span className="text-[14px] font-normal text-[#191919]/50">2</span>
          </DialogTitle>
          <DialogDescription className="sr-only">AI Smarter 상담 채팅방입니다.</DialogDescription>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="ml-auto flex size-9 items-center justify-center rounded-full text-[#191919] hover:bg-black/5"
            aria-label="채팅방 메뉴"
            aria-expanded={menuOpen}
          >
            <Menu className="size-5" />
          </button>
          {menuOpen && (
            <div className="absolute right-3 top-12 z-10 w-40 overflow-hidden rounded-md bg-white py-1 text-sm text-[#191919] shadow-lg">
              <button
                type="button"
                onClick={clearChat}
                className="w-full px-4 py-2.5 text-left hover:bg-black/5"
              >
                대화 내용 지우기
              </button>
            </div>
          )}
        </header>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-3 pb-3"
          onClick={() => setMenuOpen(false)}
        >
          {messages.map((message, index) => {
            const prev = messages[index - 1];
            const next = messages[index + 1];
            const showDate = !prev || dayOf(prev.createdAt) !== dayOf(message.createdAt);
            const groupedWithPrev =
              !showDate &&
              prev?.sender === message.sender &&
              minuteOf(prev.createdAt) === minuteOf(message.createdAt);
            const showTime =
              !next ||
              next.sender !== message.sender ||
              minuteOf(next.createdAt) !== minuteOf(message.createdAt) ||
              dayOf(next.createdAt) !== dayOf(message.createdAt);
            const time = timeFormatter.format(message.createdAt);

            return (
              <div key={message.id}>
                {showDate && (
                  <div className="my-4 flex justify-center">
                    <span className="flex items-center gap-1.5 rounded-full bg-black/15 px-3 py-1 text-[11px] text-white">
                      <Calendar className="size-3" />
                      {dateFormatter.format(message.createdAt)}
                    </span>
                  </div>
                )}

                {message.sender === "bot" ? (
                  <div className={cn("flex gap-2", groupedWithPrev ? "mt-1" : "mt-3")}>
                    {groupedWithPrev ? <span className="w-10 shrink-0" /> : <BotAvatar />}
                    <div className="min-w-0 max-w-[75%]">
                      {!groupedWithPrev && (
                        <p className="mb-1 text-[12px] text-[#4c4c4c]">{CHAT_BOT_NAME}</p>
                      )}
                      <div className="flex items-end gap-1">
                        <p
                          className={cn(
                            "relative whitespace-pre-wrap break-words rounded-[12px] bg-white px-3 py-2 text-[14px] leading-[1.45] text-[#191919]",
                            !groupedWithPrev &&
                              "rounded-tl-[4px] before:absolute before:-left-[6px] before:top-0 before:border-l-[7px] before:border-t-[8px] before:border-l-transparent before:border-t-white before:content-['']",
                          )}
                        >
                          {message.text}
                        </p>
                        {showTime && (
                          <span className="shrink-0 text-[10px] text-[#556677]">{time}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={cn(
                      "flex items-end justify-end gap-1",
                      groupedWithPrev ? "mt-1" : "mt-3",
                    )}
                  >
                    {message.status === "failed" ? (
                      <div className="relative flex shrink-0 items-center">
                        <button
                          type="button"
                          onClick={() =>
                            setFailedMenuId((id) => (id === message.id ? null : message.id))
                          }
                          className="flex size-5 items-center justify-center rounded-full bg-[#ff5b5b] text-[12px] font-bold text-white"
                          aria-label="전송 실패, 재전송 또는 삭제"
                        >
                          !
                        </button>
                        {failedMenuId === message.id && (
                          <div className="absolute bottom-7 right-0 z-10 w-24 overflow-hidden rounded-md bg-white py-1 text-xs text-[#191919] shadow-lg">
                            <button
                              type="button"
                              onClick={() => resend(message)}
                              className="w-full px-3 py-2 text-left hover:bg-black/5"
                            >
                              재전송
                            </button>
                            <button
                              type="button"
                              onClick={() => removeMessage(message.id)}
                              className="w-full px-3 py-2 text-left text-[#ff5b5b] hover:bg-black/5"
                            >
                              삭제
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex shrink-0 flex-col items-end text-[10px] leading-tight">
                        {message.status === "sent" && !message.read && (
                          <span className="font-bold text-[#f5c400]">1</span>
                        )}
                        {showTime && message.status !== "sending" && (
                          <span className="text-[#556677]">{time}</span>
                        )}
                      </div>
                    )}
                    <p
                      className={cn(
                        "relative max-w-[75%] whitespace-pre-wrap break-words rounded-[12px] bg-[#fee500] px-3 py-2 text-[14px] leading-[1.45] text-[#191919]",
                        message.status === "sending" && "opacity-70",
                        !groupedWithPrev &&
                          "rounded-tr-[4px] before:absolute before:-right-[6px] before:top-0 before:border-r-[7px] before:border-t-[8px] before:border-r-transparent before:border-t-[#fee500] before:content-['']",
                      )}
                    >
                      {message.text}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {botTyping && (
            <div className={cn("flex gap-2", lastIsBot ? "mt-1" : "mt-3")}>
              {lastIsBot ? <span className="w-10 shrink-0" /> : <BotAvatar />}
              <div>
                {!lastIsBot && <p className="mb-1 text-[12px] text-[#4c4c4c]">{CHAT_BOT_NAME}</p>}
                <div
                  className="flex h-9 items-center gap-1 rounded-[12px] bg-white px-3.5"
                  aria-label="입력 중"
                >
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="size-1.5 animate-bounce rounded-full bg-[#9aa5b1]"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {!botTyping && (
          <div className="flex shrink-0 gap-2 overflow-x-auto px-3 pb-2 [scrollbar-width:none]">
            {CHAT_QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                type="button"
                onClick={() => send(reply)}
                className="shrink-0 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[12px] text-[#191919] hover:bg-[#f7f7f7]"
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        <div className="shrink-0 bg-white">
          <div className="flex items-end gap-1 px-2 py-2">
            <textarea
              ref={textareaRef}
              value={draft}
              rows={1}
              maxLength={CHAT_MESSAGE_MAX_LENGTH}
              placeholder="메시지 입력"
              aria-label="메시지 입력"
              onChange={(event) => {
                setDraft(event.target.value);
                autoResize(event.target);
              }}
              onKeyDown={handleKeyDown}
              className="max-h-24 min-h-9 flex-1 resize-none bg-transparent px-2 py-2 text-[14px] leading-5 text-[#191919] outline-none placeholder:text-[#a0a0a0]"
            />
            <button
              type="button"
              onClick={() => setEmojiOpen((value) => !value)}
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-full hover:bg-black/5",
                emojiOpen ? "text-[#191919]" : "text-[#8a8a8a]",
              )}
              aria-label="이모티콘"
              aria-expanded={emojiOpen}
            >
              <Smile className="size-6" />
            </button>
            {draft.trim() ? (
              <button
                type="button"
                onClick={() => send(draft)}
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#fee500] text-[#191919] hover:bg-[#f5dc00]"
                aria-label="전송"
              >
                <ArrowUp className="size-5" />
              </button>
            ) : (
              <span
                className="flex size-9 shrink-0 items-center justify-center text-[#8a8a8a]"
                aria-hidden="true"
              >
                <Hash className="size-5" />
              </span>
            )}
          </div>
          {emojiOpen && (
            <div className="grid grid-cols-8 gap-1 border-t border-black/5 px-3 py-3">
              {EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => {
                    setDraft((value) => value + emoji);
                    textareaRef.current?.focus();
                  }}
                  className="flex aspect-square items-center justify-center rounded-md text-2xl hover:bg-black/5"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
