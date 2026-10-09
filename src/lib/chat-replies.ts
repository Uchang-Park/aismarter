export const CHAT_BOT_NAME = "AI Smarter 상담";

export const CHAT_WELCOME_MESSAGES = [
  "안녕하세요, 사장님! AI Smarter 상담 채팅입니다 😊",
  "요금제, 무료 체험, 도입 방법 등 궁금한 점을 편하게 남겨 주세요. 아래 버튼을 눌러도 바로 안내해 드려요.",
];

export const CHAT_QUICK_REPLIES = [
  "요금제 알려주세요",
  "무료 체험 신청",
  "도입 절차",
  "담당자 연결",
];

const replies: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["요금", "가격", "얼마", "비용", "플랜"],
    answer:
      "요금제는 3가지예요.\n• 스타터: 월 19,900원\n• 프로: 월 39,900원 (가장 인기)\n• 엔터프라이즈: 월 89,900원\n연간 결제 시 20% 할인됩니다. 자세한 내용은 상단 '요금제' 메뉴에서 확인하실 수 있어요.",
  },
  {
    keywords: ["무료", "체험", "테스트"],
    answer:
      "7일 무료 체험은 카드 등록 없이 시작할 수 있어요. 연락받으실 이메일 주소를 이 채팅에 남겨 주시면 담당자가 체험 계정을 안내해 드립니다.",
  },
  {
    keywords: ["도입", "절차", "시작", "가입", "방법"],
    answer:
      "도입은 이렇게 진행돼요.\n1. 매장 리뷰 연동 또는 입력\n2. 브랜드 톤앤매너 선택\n3. 블로그·숏폼·카드뉴스 자동 생성\n4. 채널 자동 발행 및 예약\n보통 첫 콘텐츠까지 3분이면 충분합니다.",
  },
  {
    keywords: ["제휴", "광고", "협업", "파트너"],
    answer:
      "제휴·광고 문의 감사합니다! 회사명과 연락처를 남겨 주시면 담당자가 확인 후 연락드릴게요. '1:1 맞춤 상담' 신청서로 남겨 주셔도 좋아요.",
  },
  {
    keywords: ["담당자", "상담원", "사람", "연결", "전화"],
    answer:
      "담당자 연결을 도와드릴게요. 연락받으실 이메일 또는 전화번호와 편한 시간대를 남겨 주시면 영업일 기준 하루 안에 연락드립니다.",
  },
];

const contactPattern = /[\w.+-]+@[\w-]+\.[\w.]+|01[016789][-\s]?\d{3,4}[-\s]?\d{4}/;

export function getBotReply(message: string) {
  if (contactPattern.test(message)) {
    return "연락처 감사합니다! 남겨주신 내용으로 담당자가 확인 후 빠르게 연락드릴게요. 다른 궁금한 점이 있으면 언제든 말씀해 주세요.";
  }
  const match = replies.find(({ keywords }) =>
    keywords.some((keyword) => message.includes(keyword)),
  );
  return (
    match?.answer ??
    "메시지가 접수되었어요. 담당자가 확인 후 답변드릴게요. 빠른 답변을 원하시면 연락받으실 이메일이나 전화번호를 함께 남겨 주세요."
  );
}
