import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const ReEngagementEmailTemplate: EmailTemplate = {
  name: 'marketing-re-engagement',
  subject: 'We miss you, {{name}}!',
  html: `
    <h2>Come back, {{name}}!</h2>
    <p>It's been a while. Here's {{discountPercent}}% off your next order.</p>
    <p>Use code: <strong>{{discountCode}}</strong></p>
  `,
  text: 'We miss you! Use {{discountCode}} for {{discountPercent}}% off',
  variables: ['name', 'discountCode', 'discountPercent'],
};
