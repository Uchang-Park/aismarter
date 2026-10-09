# AI Smarter: Review to Revenue

프롬프트는 영어이지만 웹사이트는 한글 사용자 기반이야. 필요한 곳에는 영어를 사용해도되.

# Role & Project Overview
You are an expert UI/UX designer and senior full-stack developer. Build a high-converting, modern, clean, and fully responsive 3-page landing page website for a B2B SaaS platform using React, Tailwind CSS, Lucide Icons, and Framer Motion.

## Target Audience & Product Concept
- Product Name: "AI Smarter" (An AI-powered automated marketing content generator for local store owners & small businesses)
- Core Value Proposition: Transforms customer reviews (from Naver Place, Google Maps, Baemin) into high-converting marketing materials—including SEO blog posts, short-form video scripts (Reels/Shorts/TikTok), and Instagram news cards—in under 3 seconds.
- Target Audience: Busy local business owners, shop managers, franchise operators, and self-employed individuals (restaurants, cafes, beauty salons, fitness centers, lodgings).

## Global Styling & Design System
- Color Palette: 
  - Primary: Deep Indigo (#4F46E5) & Bright Violet (#7C3AED) - Conveys AI expertise and modern SaaS trust.
  - Accent: Vibrant Coral (#FF6B6B) - High-conversion CTA accent.
  - Kakao Accent: Kakao Yellow (#FEE500) - Tailored for the KakaoTalk Open Chat button.
  - Neutral Background: Slate 50 (#F8FAFC) to Pure White (#FFFFFF).
- Typography: Highly readable sans-serif with strong visual hierarchy and clear line heights.
- Navigation Header: Sticky top bar featuring the "AI Smarter" logo, smooth-scroll navigation links (메인, 활용 효과, 요금제), and a prominent single CTA button ("문의하기"). Includes a responsive mobile drawer menu.

---

## Global UX Navigation & CTA Scroll Logic
1. **Single Action Button ("문의하기") Behavior**:
   - Whenever a user clicks any "문의하기" (Contact Us) or "무료로 시작하기" button across any page/section (Header, Hero Section, Feature Highlights, Pricing Cards), it MUST smoothly scroll (`behavior: 'smooth'`) to the `#contact-cta` section anchored at the very bottom of the Main Page.
2. **Bottom Triple CTA Hub (Page Bottom - Section ID: `#contact-cta`)**:
   - This section serves as the ultimate conversion hub, offering 3 distinct channels so every business owner can reach out via their preferred method:
     - **Option 1 (Email)**: Email Input Field + "7일 무료 체험 신청" Button
     - **Option 2 (Google Form)**: "📋 구글폼으로 1:1 맞춤 상담 신청하기" Button (Opens Google Form Modal / Link in new tab)
     - **Option 3 (Kakao Open Chat)**: "💬 카카오톡 1:1 오픈채팅 연결" Button (Styled with Kakao Yellow `#FEE500` background and chat bubble icon)

---

## Page 1: Main Landing Page (메인 페이지)

1. **Hero Section**:
   - Badge Component: "🔥 이미 3,200개 이상의 매장이 경험한 AI Smarter" (Pill style with subtle ambient glow)
   - Headline: "손님이 남긴 리뷰 한 줄이\n내일의 대박 마케팅 소재가 됩니다"
   - Sub-headline: "리뷰 수집부터 블로그 포스팅, 숏폼 대본, SNS 카드뉴스 제작까지! AI Smarter가 3초 만에 자동으로 만들어 드립니다."
   - **Single Primary CTA Button**:
     - Main Button: "🚀 지금 문의하기" (Large gradient button that smoothly scrolls to `#contact-cta`)
     - Secondary Link: "1분 데모 영상 보기" (Outline button with play icon)
   - Interactive Visual Mockup: A dynamic glassmorphism dashboard preview showing customer reviews morphing into Instagram card previews, YouTube Shorts script outlines, and blog post drafts.

2. **Problem & Solution Section**:
   - Side-by-Side 2-Column Comparison Grid:
     - Left Column (Pain Points - Red highlight): "매일 바쁜 일상, 블로그 글 쓸 시간이 없으신가요?", "외주 마케팅 비용 월 100만 원이 부담스러우신가요?"
     - Right Column (AI Smarter Solution - Green/Indigo highlight): "AI Smarter가 가게 리뷰를 학습해 100% 맞춤형 콘텐츠 자동 생성", "월 2만 원대로 전문 마케팅팀 보유 효과"

3. **Core Feature Showcase (Interactive 3-Tab Component)**:
   - Tab 1: 📝 **AI 블로그 작성기** - Generates Naver Blog posts optimized for local search keywords.
   - Tab 2: 🎬 **숏폼 대본 생성기** - Creates 30-second scripts with scene-by-scene filming tips for Instagram Reels & YouTube Shorts.
   - Tab 3: 📸 **SNS 카드뉴스 생성기** - Turns customer compliments into trendy Instagram carousel images.

4. **Live Interactive Simulator (Mini Demo Component)**:
   - Input Box: "가게에 남겨진 실제 리뷰를 입력해 보세요 (예: 사장님이 친절하고 떡볶이가 정말 맛있어요!)"
   - Action Button: "AI 소재 생성하기"
   - Live Preview Card: Displays generated sample blog titles, short-form hook lines, and Instagram hashtags (#맛집 #리뷰이벤트).

5. **Final Destination Section: Triple CTA Hub (ID: `contact-cta`)**:
   - Section Title: "지금 AI Smarter와 함께 가장 편한 방법으로 시작하세요!"
   - Subtitle: "이메일 신청, 구글폼 문의서, 카카오톡 오픈채팅 중 원하시는 채널을 선택해 보세요."
   - **3-Card Responsive Grid Layout**:
     - **Card 1 (Email Subscription)**: Email Input Field + "7일 무료 체험 시작" Button.
     - **Card 2 (Google Form Contact)**: "📋 구글폼으로 1:1 맞춤 상담 신청하기" Button.
     - **Card 3 (Kakao Open Chat)**: "💬 카카오톡 1:1 오픈채팅 상담하기" Button (Kakao Yellow branding).

---

## Page 2: Feature Impact & Case Studies (활용 효과)

1. **Impact Stat Counters**:
   - "콘텐츠 제작 시간" -> 95% 단축 (2시간 → 3분)
   - "SNS 방문자 유입량" -> 평균 3.4배 증가
   - "월 마케팅 비용 절감" -> 평균 120만 원 절약

2. **4-Step Automated Workflow**:
   - Step 1: **리뷰 연동/입력** (1-click collection from Naver Place & Google Maps)
   - Step 2: **AI 톤앤매너 설정** (Select brand tone: Emotional, Witty, or Professional)
   - Step 3: **자동 소재 생성** (Instant multi-channel content generation)
   - Step 4: **채널 자동 발행 & 예약** (Automated cross-platform scheduling)

3. **Real Store Case Studies & Social Proof**:
   - Testimonial Card 1: **연남동 A 카페** - "주말에 쌓인 리뷰로 월요일 아침 일주일 치 인스타그램 업로드가 끝납니다." (매출 35% 상승)
   - Testimonial Card 2: **성수동 B 고깃집** - "AI Smarter가 써준 숏폼 대본으로 찍은 릴스가 10만 뷰를 넘었어요!"
   - Interactive Testimonial Carousel featuring store avatars, star ratings, and verified store badges.
   - Section Bottom CTA: "AI Smarter 효과 직접 체험해보기" Button (Smooth scrolls to `#contact-cta`).

---

## Page 3: Pricing & FAQ (가격 및 요금제)

1. **Billing Cycle Toggle**: Monthly / Yearly (Includes a 20% Discount Badge on Yearly).

2. **3-Tier Pricing Cards**:
   - **스타터 (Starter)** - Ideal for new single-location stores.
     - Price: ₩19,900 / month
     - Features: 50 AI content generations/mo, Blog & SNS formats, 1 review source integration.
     - Action Button: "스타터 요금제로 문의하기" (Scrolls to `#contact-cta`).
   - **프로 (Pro - Highlighted Featured Card)** - Recommended for growing businesses.
     - Price: ₩39,900 / month
     - Features: Unlimited AI content generations, Short-form script + TTS voice generation, Auto-sync Naver/Google/Baemin reviews, Manage up to 3 stores.
     - Action Button: "프로 요금제로 문의하기" (Scrolls to `#contact-cta`).
   - **프리미엄 엔터프라이즈 (Enterprise)** - For multi-location stores & franchises.
     - Price: ₩89,900 / month
     - Features: All Pro features + 1:1 dedicated marketing consultant, custom brand templates, automated posting API.
     - Action Button: "엔터프라이즈 문의하기" (Scrolls to `#contact-cta`).

3. **FAQ Accordion Component**:
   - Q1: "컴퓨터를 잘 못 다루는 사장님도 사용할 수 있나요?" (A: 네, 리뷰 복사 후 클릭 한 번이면 완성됩니다.)
   - Q2: "생성된 글이 저작권이나 어뷰징(저품질)에 걸리지 않나요?" (A: 최신 SEO 가이드라인을 준수하며, 매번 독창적인 문장으로 재구성합니다.)
   - Q3: "문의나 상담은 어떻게 진행되나요?" (A: 하단의 '문의하기' 섹션에서 이메일 등록, 구글폼 문의, 카카오톡 오픈채팅 중 편하신 방법으로 연결 가능합니다.)

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/698a1fc8-e5fe-4c93-8ce7-510666c6ca81).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
