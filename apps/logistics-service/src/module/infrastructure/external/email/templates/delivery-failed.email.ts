import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const DeliveryFailedEmailTemplate: EmailTemplate = {
  name: 'delivery-failed',
  subject: 'Delivery attempt failed',
  html: '<h2>Delivery Failed</h2><p>We could not deliver your shipment. Reason: {{reason}}</p>',
  variables: ['reason'],
};
