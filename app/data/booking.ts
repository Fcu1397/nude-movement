import type { BookingContent } from './types'

export const booking: BookingContent = {
  heading: {
    eyebrow: 'Booking',
    title: '預約流程',
  },
  steps: [
    {
      no: '01',
      titleEn: 'Choose',
      titleZh: '選擇課程',
      body: [],
    },
    {
      no: '02',
      titleEn: 'Schedule',
      titleZh: '確認日期',
      body: [
        '請於每月 25 日前確認下個月排課日期。',
      ],
    },
    {
      no: '03',
      titleEn: 'Payment',
      titleZh: '完成付款',
      body: [
        '確認排課後 3 日內完成全額匯款，',
        '即完成預約。',
      ],
    },
  ],
}
