# Vietnamese terms list (Tiếng Việt)

Draft for review. Every Vietnamese page and the shared menu/footer follow this list, so a term only needs deciding once. Edit anything here and the translations will follow it.

Status: **draft**, waiting for review by a fluent Vietnamese speaker on the team. Files are `content/pages/<page>/vn.json` and `content/shared/vn.json`; the site folder is `/vn/`, the page language is `vi`.

## 1. Tone

Address the reader as **bạn** on every page. Decided 13 November 2026, after a Vietnamese colleague's feedback.

On Advertiser-facing copy (For Advertisers, Pricing, Automation, How We Track, Datafeed, Partner Discovery, API, For Agencies, Technology Partners), talk about **the reader's business** where English says "you/your" about sales, growth or plans: "doanh nghiệp bạn" / "doanh nghiệp của bạn". The colleague's reference sentence, for "pick the plan that matches your stage":

> Chọn gói phù hợp với từng giai đoạn phát triển của doanh nghiệp bạn.

Keep it professional but plain: complete sentences, no slang, no "Quý khách". Publisher pages (creators, affiliates, app owners) stay friendlier: "bạn" alone.

FAQ questions are written from the reader's side with **tôi** ("Làm sao để tôi theo dõi hiệu quả giới thiệu?"); answers use **bạn**.

Headings, buttons and labels use **sentence case** (only the first word and proper nouns capitalised): "Bắt đầu kiếm tiền", not "Bắt Đầu Kiếm Tiền". Buttons leave the pronoun out where they can ("Xem bảng giá").

## 2. Keep in English

- **Brand and product names:** Involve Asia, Involve, Express Withdrawal, Membership Program, Bonus Campaign, Partner Discovery, Datafeed, Involve Asia app; all retailer and partner brands (Shopee, Lazada, TikTok Shop…).
- **Roles (capitalised as in English):** Publisher, Advertiser, Account Manager.
- **Industry terms:** CPA, CPS, CPC, CPI, CPL, ROI, ROAS, KOL, KOC, API, SDK, postback, S2S, cookie, link, dashboard, banner, voucher, cashback, deeplink, landing page, EPC, tracker, endpoint.
- **Tier and plan names:** Silver, Gold, Platinum, Black; Startup, Growth, Enterprise.
- **Currency/crypto:** USDT, TRC20, ERC20, stablecoin.
- **App menu paths and field names** stay as the app shows them.

## 3. Preferred translations

| English | Vietnamese | Notes |
|---|---|---|
| affiliate marketing | tiếp thị liên kết | "Affiliate Marketing" eyebrows → "Tiếp thị liên kết cho Publisher" |
| affiliate link | link affiliate | |
| affiliate (person) | đối tác tiếp thị liên kết | menu: "Đối tác tiếp thị liên kết" |
| creator | nhà sáng tạo nội dung | short: "nhà sáng tạo" |
| brand | thương hiệu | |
| commission | hoa hồng | |
| conversion | chuyển đổi | Conversion Rate → Tỷ lệ chuyển đổi |
| sale | đơn hàng (an order) / doanh số (revenue) | "pay only for verified sales" → "chỉ trả phí cho đơn hàng đã xác thực" |
| earnings | thu nhập | |
| earn (money) | kiếm tiền / kiếm thu nhập | |
| payout / payment | thanh toán | |
| withdraw / withdrawal | rút tiền | product name "Express Withdrawal" stays English |
| reward | phần thưởng | |
| sign up / register | đăng ký | button: "Đăng ký ngay" |
| get started | bắt đầu ngay | button: "Bắt đầu ngay" |
| start earning | bắt đầu kiếm tiền | |
| log in | đăng nhập | |
| learn more | tìm hiểu thêm | |
| partner | đối tác | |
| audience | người theo dõi | "khán giả" for video contexts if it reads better |
| tracking / track | theo dõi | |
| report | báo cáo | |
| campaign | chiến dịch | product name "Bonus Campaign" stays English |
| fraud | gian lận | "Fraud Awareness" → "Cảnh giác gian lận" |
| validation / validated | xác thực / đã xác thực | |
| approved / denied | được duyệt / bị từ chối | |
| pricing / plan | bảng giá / gói | |
| offer (an affiliate offer a Publisher promotes) | offer | "4.000+ offer", "Xem offer"; kept in English as on the Indonesian pages |
| deals / offers shown to shoppers | ưu đãi | cashback and deals inside an app, seasonal deals, prices and promotions in a product feed |
| Grow My Brand (button) | Tăng doanh số | one label everywhere; "Phát triển thương hiệu" doesn't fit the homepage button on phones |
| social media | mạng xã hội | |
| Help Centre | Trung tâm trợ giúp | |
| Terms & Conditions | Điều khoản & Điều kiện | legal pages themselves stay English for now |
| Privacy Policy | Chính sách bảo mật | |

## 4. Numbers, money and dates

- **Thousands separator:** dot; **decimal:** comma. 1,500 → 1.500; 38.1% → 38,1%. Code locale: `vi-VN`.
- **Big numbers:** spell the scale out: 1M+ → 1 triệu+, $270M+ → $270 triệu+, $1B+ → $1 tỷ+, 10K+ → 10 nghìn+.
- **Dong (if the business gives VND figures):** 15.000 ₫ (number, space, ₫).
- **Dates:** 13 tháng 11, 2026 in running text; 13/11/2026 in tables.
- **Prices quoted in RM or USD on English pages:** don't convert on our own; see section 5.

## 5. Open questions for the business

Same as Indonesian:
1. **Referral reward** in Vietnam: amount and currency.
2. **Pricing page:** Vietnamese plan prices and currency (VND or USD)?
3. **Bonus Campaign and Membership Program:** same amounts and rules in Vietnam?
4. **Testimonials:** translate, or keep the speaker's original words?

## 6. Choices to review (first full translation, 16 November 2026)

Wording the translators were least sure of. A fluent reviewer should confirm or replace these; the files are `content/pages/<page>/vn.json`.

**Kept in English on purpose:** offer, Startup / Growth / Enterprise, Silver / Gold / Platinum / Black, Early Withdrawal, Helpdesk, Datafeed Manager, Creative Hub, Code Generator, Postback, agency, KOL (for "influencers"), EPC, Account Manager. App menu paths and field names (Reports > Conversion Report, Settings > Payment > Payment Details, Payout Type…) stay as the app shows them.

**Translated, worth a second look:**
- Grow My Brand → Tăng doanh số (literally "grow sales"; chosen because it fits the homepage button)
- Grow your sales with the right publishers. → Tăng doanh số cho doanh nghiệp bạn với đúng Publisher.
- The plan that fits your growth. → Gói phù hợp với đà tăng trưởng của bạn. ("doanh nghiệp bạn" made the heading wrap to a one-word line; the line under it keeps "doanh nghiệp bạn")
- Automate the busywork, scale the program. → Tự động hóa việc vặt, mở rộng chương trình. ("việc vặt" may be too casual)
- Talk to Sales → Liên hệ tư vấn · Talk to Us → Liên hệ chúng tôi · Recommended → Khuyên dùng · Custom → Tùy chỉnh · /mo → /tháng
- Dedicated manager → Quản lý riêng · publisher marketplace → chợ Publisher · Marketplace (category) → Sàn thương mại điện tử
- Pending Advertiser Collection → Khoản chờ Advertiser thanh toán · Reconcile → Đối soát
- Fiat or digital, your call → Tiền pháp định hay tiền số, bạn chọn · No Bank Delays → Không chờ ngân hàng
- Built for teams that build. → Dành cho những đội ngũ biết xây dựng.
- Time to earn! → Bắt đầu kiếm tiền thôi! · Native, not intrusive → Tự nhiên, không gây phiền
- attribution → ghi nhận chuyển đổi / phân bổ (two versions; pick one) · creatives → tài liệu sáng tạo · awareness → nhận diện
- Fraud awareness notice → Cảnh giác gian lận
- Store badges: GET IT ON → TẢI NỘI DUNG TRÊN · Download on the → Tải về trên (check against the official Vietnamese badge artwork)
- Blog post titles are translated although the articles are in English.

**Still in English everywhere, pending a decision:** customer testimonials and case-study quotes (question 4 above).

**English source issues spotted:** same as Indonesian — the search descriptions of For Publishers, Express Withdrawal and Automation say "4,000+ brands"; Partner Discovery, How We Track and Datafeed reuse a generic Publisher description, so their Vietnamese descriptions were written for the page instead.
