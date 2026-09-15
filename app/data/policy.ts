import type { AccordionSectionContent } from './types'

export const policy: AccordionSectionContent = {
  heading: {
    eyebrow: 'Policy',
    title: '預約與請假規範',
  },
  entries: [
    {
      id: 'policy-reservation',
      title: '預約與繳費',
      body: [
        '請於每月 25 日前確認下個月的排課日期，',
        '並於 3 日內完成全額匯款。',
        '完成付款後，即視為預約成功，',
        '將為學員保留上課時段與教室。',
      ],
    },
    {
      id: 'policy-leave',
      title: '請假與補課',
      body: [
        '如需請假，請最晚於課程開始前 24 小時通知老師。',
        '提前請假的課程，',
        '須於次月前兩週內完成補課。',
        '逾期未補課，視同放棄該堂課程額度。',
      ],
    },
    {
      id: 'policy-late-cancellation',
      title: '24 小時內取消',
      body: [
        '若於上課前 24 小時內取消，',
        '或當日未出席，',
        '因場地費用已產生，',
        '將扣除基本場租費用。',
        '其餘課程費用可作為後續補課額度使用。',
      ],
    },
    {
      id: 'policy-duo-group',
      title: '雙人與團體課請假',
      body: [
        '雙人課或團體課若僅部分學員請假，',
        '課程仍正常進行。',
        '若需整班取消，',
        '須經所有學員確認，',
        '並於至少 24 小時前通知。',
      ],
    },
    {
      id: 'policy-attendance',
      title: '人數異動與費用',
      body: [
        '若實際出席人數低於原報名人數級距，',
        '當日費用將依實際出席人數之課程價格計算。',
      ],
      example: [
        '原預約 3 人團體課，',
        '當日僅 2 人出席，',
        '則依雙人課費用計算。',
      ],
    },
  ],
}
