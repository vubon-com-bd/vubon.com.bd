import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const PromotionEmailTemplate: EmailTemplate = {
  name: 'marketing-promotion',
  subject: '{{promotionTitle}} — Exclusive Offer!',
  html: `
    <h2>Hi {{name}},</h2>
    <p>{{promotionDescription}}</p>
    <p>Use code: <strong>{{promotionCode}}</strong></p>
    <p>Valid until {{validUntil}}.</p>
  `,
  text: '{{promotionTitle}}: use {{promotionCode}}',
  variables: ['name', 'promotionTitle', 'promotionDescription', 'promotionCode', 'validUntil'],
};
