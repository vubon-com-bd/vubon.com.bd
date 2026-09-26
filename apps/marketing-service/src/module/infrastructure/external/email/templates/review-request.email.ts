import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const ReviewRequestEmailTemplate: EmailTemplate = {
  name: 'marketing-review-request',
  subject: 'How was your purchase, {{name}}?',
  html: `
    <h2>Hi {{name}},</h2>
    <p>Share your experience with {{productName}} and earn {{rewardPoints}} points!</p>
    <p><a href="{{reviewUrl}}">Write a Review</a></p>
  `,
  text: 'Review {{productName}}: {{reviewUrl}}',
  variables: ['name', 'productName', 'rewardPoints', 'reviewUrl'],
};
