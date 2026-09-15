# Web SPEC v1.0
## 日系裸粉舞蹈工作室課程介紹與預約網站

---

## 1. Project Overview

### 1.1 專案名稱
暫定：

**Boutique Ballet & Movement Studio Website**

實際品牌名稱未定，可於後續替換。

### 1.2 專案目的
建立一個以成人女性為主要受眾的舞蹈與身體訓練課程網站，呈現：

- 芭蕾課程
- 抒情當代
- 墊上嬋柔
- 拉筋伸展
- 私人課 / 雙人課 / 團體課價格
- 每月 4 堂優惠方案
- 預約與請假規則
- LINE / Instagram 預約入口

網站核心目標：

> 讓訪客快速理解課程、價格與預約方式，並產生直接聯絡老師預約的行動。

本階段不需要會員系統、線上付款或後台排課系統。

---

# 2. Target Audience

## 2.1 核心客群

主要：

- 25～45 歲女性
- 成人舞蹈初學者
- 有芭蕾、當代舞學習經驗者
- 久坐上班族
- 想改善柔軟度、活動度與身體控制的人
- 偏好私人、小班制教學者

次要：

- 有舞蹈基礎、希望精進技巧者
- 想進行伸展與身體調整者
- 希望尋找 Boutique Studio 而非大型健身房者

---

# 3. Brand Positioning

品牌定位：

> **Japanese Minimal × Boutique Ballet Studio × Wellness**

整體關鍵字：

- Japanese Minimal
- Nude Pink
- Warm Beige
- Ivory
- Quiet Luxury
- Editorial
- Boutique
- Soft
- Elegant
- Calm
- Feminine but Mature
- Natural
- Professional

避免：

- 少女粉紅風
- 可愛風
- 韓系網美感過強
- 健身房風格
- 大量漸層
- 高彩度
- 過度華麗
- 大量 Emoji
- 過多陰影與卡片

---

# 4. Visual Design System

## 4.1 Color Palette

### Primary Background
```css
#FCF9F7
```

用途：

- 網頁主要背景
- Hero
- 大面積留白區

### Secondary Background
```css
#F4EAE4
```

用途：

- 課程區塊
- Monthly Plan
- Section highlight

### Primary Nude Pink
```css
#DFC1B8
```

用途：

- 主品牌色
- Button
- Tag
- 細線
- Highlight

### Accent Rose
```css
#C99F95
```

用途：

- Hover
- CTA
- Highlight price
- Active state

### Brown Beige
```css
#A58B80
```

用途：

- 次要 icon
- Divider
- Secondary text

### Primary Text
```css
#514743
```

### Secondary Text
```css
#81736D
```

禁止主要使用純黑：

```css
#000000
```

---

# 5. Typography

## 5.1 中文標題

優先：

**Noto Serif TC**

用途：

- Hero
- Section Title
- 課程名稱
- 品牌主標題

Font Weight：

```text
400 / 500 / 600
```

## 5.2 中文正文

**Noto Sans TC**

用途：

- 說明文字
- FAQ
- Policy
- Price

## 5.3 英文字體

可使用：

- Cormorant Garamond
- Libre Baskerville
- EB Garamond

用途：

- Section eyebrow
- 英文課程名稱
- Editorial 裝飾

---

# 6. General Layout

## Desktop

最大內容寬度：

```text
1200px
```

主要內容區：

```text
1040px – 1120px
```

Section 上下間距：

```text
120px
```

## Tablet

Section：

```text
80px
```

## Mobile

左右 padding：

```text
20px – 24px
```

Section：

```text
64px – 80px
```

設計原則：

> Mobile First

主要使用情境預設為：

```text
Instagram
↓
Mobile Browser
↓
查看課程
↓
查看價格
↓
LINE 預約
```

---

# 7. Website Information Architecture

網站採：

**Single Page Landing Page**

主要導覽：

```text
Home
Classes
Pricing
Monthly Plan
Booking
Policy
FAQ
Contact
```

Navigation 可使用 anchor scroll。

---

# 8. Header

## Desktop

左側：

```text
Brand Logo
```

右側：

```text
Classes
Pricing
Booking
FAQ
LINE 預約
```

LINE 預約設為 CTA Button。

## Mobile

左：

```text
Logo
```

右：

```text
Hamburger Menu
```

或簡化為：

```text
Logo      預約
```

避免複雜導覽。

Header：

- Sticky
- 半透明暖白
- 可搭配 backdrop blur
- 高度約 64～72 px

---

# 9. Hero Section

## 9.1 Layout

Desktop：

```text
--------------------------------

文字區          舞蹈照片

--------------------------------
```

或：

```text
Full Width Photo
+
Overlay Text
```

偏好前者。

## 9.2 Content

Eyebrow：

```text
Ballet · Contemporary · Movement
```

H1：

```text
Move with Grace.
```

中文：

```text
找回身體的空間，
在流動裡感受自己的節奏。
```

Description：

```text
Ballet · Contemporary · Gyrokinesis · Stretching
```

CTA：

Primary：

```text
查看課程
```

Secondary：

```text
預約課程
```

## 9.3 Hero Image Direction

圖片風格：

- 自然光
- 舞蹈教室
- 木地板
- 淡色牆面
- 芭蕾鞋
- 腿部與手部線條
- 動態但安靜
- 大量留白

避免：

- 舞台演出照
- 高對比
- 彩色燈光
- 比賽風
- 明顯健身房器材

---

# 10. Classes Section

Section ID：

```text
#classes
```

Title：

```text
Classes
找到適合自己的練習方式
```

分成兩個主要區塊。

---

## 10.1 Ballet & Contemporary

中文：

```text
芭蕾・抒情當代
```

英文：

```text
Ballet & Contemporary
```

描述：

```text
在音樂與流動中建立身體控制，
感受線條、節奏與舞蹈表達。
```

Keyword：

```text
Technique
Control
Expression
Flow
```

適合：

```text
想精進舞蹈技巧
喜歡音樂與身體表達
希望提升身體控制能力
```

---

## 10.2 Movement & Stretch

中文：

```text
墊上嬋柔・拉筋伸展
```

英文：

```text
Gyrokinesis & Stretch
```

描述：

```text
從呼吸與身體流動開始，
釋放日常累積的緊繃，
找回關節空間與身體自由度。
```

Keyword：

```text
Mobility
Release
Breathing
Awareness
```

適合：

```text
零基礎
久坐上班族
希望增加柔軟度
希望改善身體緊繃
```

---

# 11. Pricing Section

Section ID：

```text
#pricing
```

Title：

```text
Pricing
課程費用
```

說明：

```text
以下皆為 60 分鐘課程之總價，
包含專業指導與教室租借費。
```

Supplement：

```text
1.5 小時或 2 小時課程將依比例另行報價。
```

---

# 12. Ballet / Contemporary Pricing

## Private

Label：

```text
Private
一對一私人課
```

Single：

```text
NT$1,500
```

Discount：

```text
NT$1,400
```

Discount Label：

```text
Monthly Plan
```

---

## Duo

```text
Duo
一對二雙人課
```

Single：

```text
NT$850 / 人
```

Discount：

```text
NT$750 / 人
```

---

## Group

```text
Group
3 人以上
```

Single：

```text
NT$650 / 人
```

Discount：

```text
NT$550 / 人
```

---

# 13. Gyrokinesis / Stretch Pricing

## Private

```text
NT$1,300
```

Discount：

```text
NT$1,200
```

## Duo

```text
NT$750 / 人
```

Discount：

```text
NT$650 / 人
```

## Group

```text
NT$600 / 人
```

Discount：

```text
NT$500 / 人
```

---

# 14. Pricing UI Requirement

不要使用傳統 HTML table。

使用：

```text
Pricing Card
```

每張卡片包含：

```text
類型
中文名稱
原價
優惠價
單位
```

原價可使用：

```text
text-decoration: line-through
```

優惠價為主要視覺。

---

# 15. Monthly Plan Section

Section ID：

```text
#monthly
```

此 Section 為整個網站最重要的轉換區域之一。

背景可使用：

```text
#F4EAE4
```

Title：

```text
Monthly 4 Classes
當月 4 堂優惠方案
```

Subheading：

```text
每月一次，安排自己的身體練習。
```

Content：

```text
只要於排課時一次預約當月 4 堂以上，
該批課程即可全面享有優惠價格。
```

Features：

```text
✓ 可跨課程類別
✓ 私人課 / 雙人課 / 團課皆可混搭
✓ 全部享優惠價格
```

Example：

```text
Your Monthly Plan

Ballet Private × 2
Stretch Group × 2

Total Classes: 4
```

CTA：

```text
開始安排本月課程
```

---

# 16. Booking Process

Section ID：

```text
#booking
```

Title：

```text
Booking
預約流程
```

採三步驟。

## Step 01

```text
Choose
選擇課程
```

## Step 02

```text
Schedule
確認日期
```

文案：

```text
請於每月 25 日前確認下個月排課日期。
```

## Step 03

```text
Payment
完成付款
```

```text
確認排課後 3 日內完成全額匯款，
即完成預約。
```

可用：

```text
01
02
03
```

作為視覺主元素。

不要使用彩色 icon。

---

# 17. Policy Section

Section ID：

```text
#policy
```

Title：

```text
Policy
預約與請假規範
```

使用 Accordion。

預設全部關閉。

---

## Accordion 01

Title：

```text
預約與繳費
```

Content：

```text
請於每月 25 日前確認下個月的排課日期，
並於 3 日內完成全額匯款。

完成付款後，即視為預約成功，
將為學員保留上課時段與教室。
```

---

## Accordion 02

Title：

```text
請假與補課
```

Content：

```text
如需請假，請最晚於課程開始前 24 小時通知老師。

提前請假的課程，
須於次月前兩週內完成補課。

逾期未補課，視同放棄該堂課程額度。
```

---

## Accordion 03

Title：

```text
24 小時內取消
```

Content：

```text
若於上課前 24 小時內取消，
或當日未出席，
因場地費用已產生，
將扣除基本場租費用。

其餘課程費用可作為後續補課額度使用。
```

Note：

正式上線前應補：

```text
場租實際金額
```

---

## Accordion 04

Title：

```text
雙人與團體課請假
```

Content：

```text
雙人課或團體課若僅部分學員請假，
課程仍正常進行。

若需整班取消，
須經所有學員確認，
並於至少 24 小時前通知。
```

---

## Accordion 05

Title：

```text
人數異動與費用
```

Content：

```text
若實際出席人數低於原報名人數級距，
當日費用將依實際出席人數之課程價格計算。
```

Example：

```text
原預約 3 人團體課，
當日僅 2 人出席，
則依雙人課費用計算。
```

---

# 18. FAQ

Section ID：

```text
#faq
```

至少包含：

### Q1
```text
完全沒有舞蹈基礎可以參加嗎？
```

### Q2
```text
可以混搭不同課程嗎？
```

### Q3
```text
4 堂優惠一定要同一種課嗎？
```

### Q4
```text
可以安排 90 分鐘課程嗎？
```

### Q5
```text
團體課需要自己找同學嗎？
```

### Q6
```text
臨時請假怎麼處理？
```

FAQ 可與 Policy 共用 Accordion Component。

---

# 19. Contact CTA

Section：

```text
Ready to Move?
```

中文：

```text
開始安排屬於自己的身體練習。
```

Buttons：

```text
LINE 預約
Instagram
```

可增加：

```text
課程相關問題，也歡迎先私訊詢問。
```

---

# 20. Footer

內容：

```text
Brand Name

Ballet
Contemporary
Gyrokinesis
Stretching
```

Social：

```text
LINE
Instagram
```

Legal：

```text
© 2026 Studio Name. All Rights Reserved.
```

---

# 21. Mobile Fixed CTA

Mobile bottom bar：

```text
LINE 預約課程
```

規格：

```text
position: fixed
bottom: 0
```

頁面內容底部需預留空間避免遮住 Footer。

---

# 22. Component List

前端建議拆分：

```text
Header
HeroSection
SectionHeading
ClassSection
ClassFeature
PricingSection
PricingCard
MonthlyPlan
BookingSteps
Accordion
FAQ
ContactCTA
Footer
MobileBookingBar
```

---

# 23. Interaction

## Hover

Button：

```text
background:
#DFC1B8 → #C99F95
```

Transition：

```text
200–300ms
```

## Scroll Animation

只使用：

```text
Fade In
Fade Up
```

Duration：

```text
400–700ms
```

避免：

- Parallax 過度使用
- 大幅 zoom
- 彈跳
- Spin
- 複雜 motion

---

# 24. Border Radius

整體不要過圓。

建議：

Buttons：

```text
4px – 8px
```

Cards：

```text
0px – 12px
```

圖片：

```text
0px – 8px
```

避免：

```text
24px+
```

---

# 25. Shadow

原則：

> Almost no shadow.

Card 建議使用：

```css
border: 1px solid rgba(...);
```

取代大量 box-shadow。

如果使用：

```css
box-shadow:
0 8px 30px rgba(81, 71, 67, 0.05);
```

必須極淡。

---

# 26. Image Style

圖片統一：

```text
Warm
Natural
Soft
Low saturation
Editorial
```

Aspect Ratio：

Hero：

```text
4:5
```

Class：

```text
3:4
```

或：

```text
4:5
```

建議避免每張圖比例不同。

---

# 27. Responsive Breakpoints

建議：

```css
Mobile:
< 640px

Tablet:
640px – 1023px

Desktop:
>= 1024px
```

Optional：

```css
Large Desktop:
>= 1440px
```

---

# 28. Accessibility

需符合基本 WCAG。

要求：

- Text contrast ≥ WCAG AA
- 圖片包含 alt
- Accordion 支援 keyboard
- Button focus visible
- font-size 不低於 16px
- clickable area ≥ 44px
- 不以顏色作為唯一資訊提示

---

# 29. SEO

Page Title：

```text
品牌名稱｜芭蕾・抒情當代・嬋柔・伸展課程
```

Description：

```text
提供芭蕾、抒情當代、墊上嬋柔與伸展課程，
包含私人課、雙人課與小班團課，
適合成人初學者與希望提升身體控制與活動度的學員。
```

---

# 30. Technical Recommendation

如果只是品牌 Landing Page：

建議：

```text
Vue 3
Vite
CSS / SCSS
```

或：

```text
Nuxt
```

若需要 SEO 更好：

推薦：

```text
Nuxt
```

因為：

```text
SSR / SSG
SEO
Metadata
Performance
```

這類網站沒有必要先加入大型後端。

第一版 Architecture：

```text
Browser
↓
Nuxt Frontend
↓
LINE / Instagram External Link
```

不需要資料庫。

---

# 31. Performance Target

目標：

```text
Lighthouse Performance ≥ 90
Accessibility ≥ 90
SEO ≥ 90
Best Practices ≥ 90
```

圖片：

```text
WebP / AVIF
Lazy Loading
Responsive Image
```

---

# 32. Out of Scope v1

第一版不做：

- 會員系統
- 帳號登入
- 線上付款
- 自動排課
- 課程管理後台
- 學員管理
- 信用卡付款
- Google Calendar 同步
- 點數制度
- 電子票券

---

# 33. Future v2

未來可擴充：

```text
Online Booking
↓
Calendar
↓
Teacher Availability
↓
Payment
↓
Booking Confirmation
↓
Reminder
```

可能加入：

- Google Calendar
- LINE Login
- LINE Messaging API
- 金流
- 課堂額度管理
- 自動補課管理

---

# 34. Core UX Flow

主要 Conversion Flow：

```text
Instagram
↓
Landing Page
↓
Hero
↓
Classes
↓
Pricing
↓
Monthly 4 Classes
↓
Booking Policy
↓
LINE
↓
完成預約
```

次要 Flow：

```text
Google Search
↓
Website
↓
Class
↓
FAQ
↓
LINE
```

---

# 35. Design Principle

整個網站須遵守：

> Content first.

不要為了「看起來很有設計感」加入大量裝飾。

視覺重點應來自：

```text
Typography
Photography
Whitespace
Spacing
Editorial Layout
```

而不是：

```text
Gradient
Shadow
Fancy UI
Emoji
Animation
```

---

# 36. Final Visual Direction

網站最終視覺應接近：

> 日本成人私人芭蕾教室  
> × Pilates Boutique Studio  
> × Lifestyle Editorial Brand

整體感受：

```text
安靜
柔和
成熟
專業
精緻
自然
```

使用者打開網站後不應感受到：

```text
舞蹈補習班
健身房
兒童芭蕾教室
網美模板網站
```

而應感受到：

> 一間有個人風格、專業且值得信任的小型 Boutique Movement Studio。