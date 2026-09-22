import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const PayoutEmailTemplate: EmailTemplate = {
  name: 'vendor-payout',
  subject: 'Payout processed',
  html: `<h2>Payout sent</h2><p>Amount: {{amount}} {{currency}}</p><p>Reference: {{reference}}</p>`,
  text: 'Payout sent: {{amount}} {{currency}}. Ref: {{reference}}',
  variables: ['amount', 'currency', 'reference'],
};
