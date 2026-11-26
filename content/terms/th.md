# Thai terms list (ภาษาไทย)

Draft for review. Every Thai page and the shared menu/footer follow this list, so a term only needs deciding once. Edit anything here and the translations will follow it.

Status: **draft**, waiting for review by a fluent Thai speaker on the team. Files are `content/pages/<page>/th.json` and `content/shared/th.json`; the site folder is `/th/`.

**Font:** Thai letters use **Noto Sans Thai** (decided 16 November 2026, for now). It is loaded on the Thai pages only and sits after Plus Jakarta Sans / Inter in the font stacks, so Latin words, numbers and brand names on Thai pages still use the design-system fonts. Set in `content/i18n.json` (`"font"` on the th language).

## 1. Tone

Address the reader as **คุณ** on every page: polite, warm and direct, the way Thai apps and marketplaces write. No sentence-final particles (ครับ / ค่ะ) in page copy. The current Thai site does the same (one stray "ท่าน" on its homepage aside).

On Advertiser-facing copy (For Advertisers, Pricing, Automation, How We Track, Partner Discovery, API, For Agencies, Technology Partners, Get Started), talk about **the reader's business** where English says "you/your" about sales, growth or plans: "ธุรกิจของคุณ". Same rule as the Vietnamese pages. Publisher pages (creators, affiliates, app owners) use "คุณ" alone. The current Thai Advertiser page also uses "ธุรกิจของคุณ" and "แบรนด์ของคุณ".

FAQ questions are written from the reader's side with **ฉัน** ("ฉันจะติดตามผลการแนะนำได้อย่างไร"); answers use **คุณ**.

Thai has no spaces between words; use a space where English would end a sentence or clause (Thai convention), not a full stop. The current Thai site does the same, and uses "!" in some headings. **No question marks**: the question word (ไหม / อย่างไร / อะไร) already makes it a question. Keep headings short: Thai lines don't break as freely as English.

**Line breaks:** browsers split Thai lines inside compound words (ราย / ได้, ยอด / ขาย). In headings, buttons, pills, tabs and labels, compounds that must stay together are joined with the invisible WORD JOINER (U+2060, written `\u2060` in the JSON; most editors don't show it), and brand names or numbers that must not end up alone on a line are tied with a non-breaking space. Body paragraphs are left to break naturally.

## 2. Keep in English

- **Brand and product names:** Involve Asia, Involve, Express Withdrawal, Membership Program, Bonus Campaign, Partner Discovery, Datafeed, Involve Asia app; all retailer and partner brands (Shopee, Lazada, TikTok Shop…).
- **Roles:** Publisher, Advertiser, Account Manager. The current Thai site translates Publisher five different ways (ผู้จัดพิมพ์, สำนักพิมพ์, ผู้เผยแพร่, พันธมิตร, พาร์ทเนอร์), two of them with the wrong meaning (book or print publisher); keeping the English word avoids that.
- **Industry terms:** Affiliate (in "การตลาดแบบ Affiliate", "ลิงก์ Affiliate"), offer, CPA, CPS, CPC, CPI, CPL, ROI, ROAS, KOL, KOC, API, SDK, postback, S2S, cookie, dashboard, deeplink, landing page, EPC, endpoint, tracker.
- **Tier and plan names:** Silver, Gold, Platinum, Black; Startup, Growth, Enterprise.
- **Currency/crypto:** USDT, TRC20, ERC20, stablecoin.
- **App menu paths and field names** stay as the app shows them.

## 3. Preferred translations

| English | Thai | Notes |
|---|---|---|
| affiliate marketing | การตลาดแบบ Affiliate | |
| affiliate link | ลิงก์ Affiliate | |
| affiliate (person) | พาร์ทเนอร์ Affiliate | menu |
| creator | ครีเอเตอร์ | |
| brand | แบรนด์ | |
| commission | ค่าคอมมิชชั่น | **ชั่น**, as Thai readers know it and as the current site writes it (decided 26 November 2026 after the Thai proofread; the Royal Institute spelling ชัน is not used) |
| conversion | **Advertiser pages:** คอนเวอร์ชั่น · **Publisher pages:** ยอดขาย (a counted order: คำสั่งซื้อ) | Decided 26 November 2026 after the Thai proofread: advertisers understand คอนเวอร์ชั่น, most Thai publishers don't. Conversion Rate → อัตราคอนเวอร์ชั่น (advertiser) / อัตราการซื้อ (publisher and homepage). Media Buyer keeps คอนเวอร์ชั่น (industry readers). App names such as Conversion Report stay English. Don't use the literal "การแปลง" |
| sale | ยอดขาย / คำสั่งซื้อ | "pay only for verified sales" → "จ่ายเฉพาะยอดขายที่ตรวจสอบแล้ว" |
| earnings | รายได้ | |
| earn (money) | สร้างรายได้ | "Start Earning" → "เริ่มสร้างรายได้" |
| payout / payment | การจ่ายเงิน / รับเงิน | |
| withdraw / withdrawal | ถอนเงิน / การถอนเงิน | product name "Express Withdrawal" stays English |
| offer (an affiliate offer) | offer | kept in English as on the ID/VN pages |
| deals shown to shoppers | ดีล / โปรโมชัน | |
| cashback | แคชแบ็ก | "เงินคืน" is the native alternative; one form everywhere |
| reward | รางวัล | |
| sign up / register | สมัคร / สมัครสมาชิก | button: "สมัครเลย" |
| get started | เริ่มต้นใช้งาน | |
| log in | เข้าสู่ระบบ | |
| learn more | ดูเพิ่มเติม | the current site uses เรียนรู้เพิ่มเติม for "learn more" and ดูเพิ่มเติม for "read more"; to confirm |
| partner | พาร์ทเนอร์ | as on the current site |
| audience | ผู้ติดตาม | "ผู้ชม" for video, "ผู้อ่าน" for websites if it reads better |
| tracking / track | การติดตามผล / ติดตามผล | |
| report | รายงาน | |
| campaign | แคมเปญ | product name "Bonus Campaign" stays English |
| fraud | การฉ้อโกง | "Fraud Awareness" → "ระวังการฉ้อโกง" |
| validation / validated | การตรวจสอบ / ตรวจสอบแล้ว | |
| approved / denied | อนุมัติ / ปฏิเสธ | |
| pricing / plan | ราคา / แพ็กเกจ | |
| Grow My Brand (button) | เพิ่มยอดขาย | short, like the VN "Tăng doanh số"; must fit the homepage button on phones |
| Help Centre | ศูนย์ช่วยเหลือ | the current site's menu says ช่วยเหลือ; to confirm |
| Terms & Conditions | ข้อกำหนดและเงื่อนไข | legal pages themselves stay English for now. The current site's footer says ข้อตกลงและเงื่อนไข; to confirm |
| Privacy Policy | นโยบายความเป็นส่วนตัว | |

## 4. Numbers, money and dates

- **Digits:** Arabic digits (0–9), never Thai digits. Thousands with a comma, decimals with a dot, same as English: 1,500; 38.1%. Code locale: `th-TH` (formats the same as en-US).
- **Big numbers:** the scale word after the number, as on the current site: $270M+ → $270 ล้าน+, $3.2B+ → $3.2 พันล้าน+, 1,000,000+ stays 1,000,000+, 10K+ → 10,000+.
- **Baht (if the business gives THB figures):** ฿1,500 or 1,500 บาท.
- **Dates:** Thai month names with the **Gregorian** year: 16 พฤศจิกายน 2026; short form 16 พ.ย. 2026. Changed 26 November 2026 to match the current Thai site, which uses Gregorian years in Thai text ("ตั้งแต่ปี 2020") and in the footer. **The Thai pages still show Buddhist years and need updating.**
- **Prices quoted in RM or USD on English pages:** don't convert on our own; see section 5.

## 5. Open questions for the business

Same as Indonesian and Vietnamese:
1. **Referral reward** in Thailand: amount and currency.
2. **Pricing page:** Thai plan prices and currency (THB or USD)?
3. **Bonus Campaign and Membership Program:** same amounts and rules in Thailand?
4. **Testimonials:** translate, or keep the speaker's original words? The current Thai site translates them into Thai.

## 6. Choices to review (first full translation, 16 November 2026)

Wording the translators were least sure of. A fluent reviewer should confirm or replace these; the files are `content/pages/<page>/th.json`.

**Kept in English on purpose:** offer, Affiliate, Startup / Growth / Enterprise, Silver / Gold / Platinum / Black, Early Withdrawal, Helpdesk, Datafeed Manager, Creative Hub, Code Generator, Postback, attribution, brand bidding, paid search, click ID / sub ID, Bank Transfer, PayPal, award names on About. App menu paths and field names stay as the app shows them.

**Years:** the first translation used Buddhist years everywhere ("since 2014" → ตั้งแต่ปี 2557, "May 2026" → พฤษภาคม 2569, "Q4 2023" → ไตรมาส 4/2566, a blog post title "…in 2026" → ปี 2569). These are to change to Gregorian years (see section 4).

**Translated, worth a second look:**
- Grow My Brand → เพิ่มยอดขาย ("grow sales", like the Vietnamese) · Start Earning → เริ่มสร้างรายได้ · Get Started → เริ่มต้นใช้งาน
- Turn your audience into income. → เปลี่ยนผู้ติดตามให้เป็นรายได้
- Grow your sales with the right publishers. → เพิ่มยอดขายให้ธุรกิจของคุณ ด้วย Publisher ที่ใช่
- Automate the busywork, scale the program. → ให้ระบบจัดการงานจุกจิก แล้วขยายโปรแกรมได้เต็มที่
- Built for teams that build. → สร้างมาเพื่อทีมที่ลงมือสร้าง
- Pricing: Custom → กำหนดเอง ("สอบถามราคา" is an alternative) · Talk to Sales → ติดต่อฝ่ายขาย · /mo → /เดือน · Priority support → บริการช่วยเหลือแบบเร่งด่วน
- Referral Program → โปรแกรมแนะนำเพื่อน (the app's program name stays English)
- Pending Advertiser Collection → ยอดรอเรียกเก็บจาก Advertiser · Reconcile → หักกลบยอด
- Fiat or digital, your call → เงินตราทั่วไปหรือดิจิทัล คุณเลือกเอง · wallet → วอลเล็ต
- Media buyers → มีเดียบายเออร์ · paid traffic → ทราฟฟิกจากโฆษณา · payout (per offer) → ค่าตอบแทน (payout)
- Fraud awareness notice → ประกาศระวังการฉ้อโกง
- Store badges: GET IT ON → ดาวน์โหลดได้ที่ · Download on the → ดาวน์โหลดบน (check against the official Thai badge artwork)
- Get Started form: the phone placeholder is a Thai number (+66 81 234 5678); the Vietnamese form still shows a Malaysian one.

**Shopee Commissions XTRA (added 17 November 2026),** translated from the live /th/shopee-commissions-xtra/ page:
- "Commissions XTRA" stays English (the live page mixes คอมมิชชั่นพิเศษ and XTRA Commission); base commission → ค่าคอมมิชชั่นพื้นฐาน
- Direct / indirect links → ลิงก์โดยตรง / ลิงก์ทางอ้อม · Conversion Report stays as the app shows it
- After the proofread (26 November 2026): conversion → ยอดขาย on this page
- The attribution diagram is the live Thai image (hosted on the CMS).

**Still in English everywhere, pending a decision:** customer testimonials and case-study quotes (question 4 above); English labels drawn inside some mock-up images (For Advertisers, Automation, How We Track).

**English source issues spotted:** same as Indonesian and Vietnamese (generic "4,000+ brands" search descriptions; Partner Discovery, How We Track and Datafeed got page-specific Thai descriptions instead).

## 7. Current Thai site (checked 26 November 2026)

Screenshots of the live homepage, Publishers overview and the app's Advertiser page. Mistakes to avoid repeating, and to report to whoever maintains the live site until launch:

- **Typos:** "จันสนใจ" for ฉันสนใจ (Advertiser form and button); "Afffiliate" (Advertiser intro); "คอนเท้น ครีเอเตอร์" for คอนเทนต์ครีเอเตอร์ (old footer).
- **Wrong meaning:** Publisher as สำนักพิมพ์ (book publisher) and ผู้จัดพิมพ์ (print publisher); "หากแปรปรวนรายได้ของคุณ" (แปรปรวน means "fluctuate"); "ฟังคำบรรยาย" (a lecture) for testimonials.
- **Garbled or machine-like:** "จ่ายเงินแก่พันธมิตรค่ายของเราที่มีค่าและความสำคัญในรายได้"; "แบรนด์เข้าร่วมกับ Involve กว่า 500 ในการขยายความร่วมมือ" (number in the wrong place); "สร้างความเกี่ยวข้องและเพิ่มประสิทธิภาพคู่ค้า".
- **Left in English:** a paragraph under "การเข้าถึง" on the Advertiser page; brand cards ("Earn 1.4% commission"); footer links (Terms & Conditions, Release Notes, Collaboration); "Download App" in the menu. An "Internal" category filter is visible to the public.
- **Numbers that contradict each other:** partners 42,182+ / 700,000+ / 700k+ / 800,000; brands 37+ and 500+ on the same homepage; payouts $1.3ล้าน and USD28.6 million; sales "$0.1 พันล้าน" (should read $100 ล้าน) and USD 2.6 m+.
- **Inconsistent:** การถอนเงินด่วน / การถอนเงินแบบด่วน; ผู้โฆษณา / ผู้ลงโฆษณา; "Login" / "เข้าสู่ระบบ"; © 2014–2024 on the main site footer, 2014–2026 in the app.
- **Form:** the Thai Advertiser form's phone field starts at +60 (Malaysia). The new Thai form uses +66.
