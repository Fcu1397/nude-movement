import type { ClassesContent } from './types'

export const classes: ClassesContent = {
  heading: {
    eyebrow: 'Classes',
    title: '找到適合自己的練習方式',
  },
  items: [
    {
      id: 'ballet',
      titleZh: '芭蕾・抒情當代',
      titleEn: 'Ballet & Contemporary',
      description: [
        '在音樂與流動中建立身體控制，',
        '感受線條、節奏與舞蹈表達。',
      ],
      keywords: [
        'Technique',
        'Control',
        'Expression',
        'Flow',
      ],
      suitableLabel: '適合',
      suitableFor: [
        '想精進舞蹈技巧',
        '喜歡音樂與身體表達',
        '希望提升身體控制能力',
      ],
      image: {
        src: '/images/placeholder/class-ballet.jpg',
        alt: '舞者在教室中練習芭蕾與抒情當代動作',
      },
    },
    {
      id: 'stretch',
      titleZh: '墊上嬋柔・拉筋伸展',
      titleEn: 'Gyrokinesis & Stretch',
      description: [
        '從呼吸與身體流動開始，',
        '釋放日常累積的緊繃，',
        '找回關節空間與身體自由度。',
      ],
      keywords: [
        'Mobility',
        'Release',
        'Breathing',
        'Awareness',
      ],
      suitableLabel: '適合',
      suitableFor: [
        '零基礎',
        '久坐上班族',
        '希望增加柔軟度',
        '希望改善身體緊繃',
      ],
      image: {
        src: '/images/placeholder/class-stretch.jpg',
        alt: '學員在墊上進行嬋柔與拉筋伸展練習',
      },
    },
  ],
}
