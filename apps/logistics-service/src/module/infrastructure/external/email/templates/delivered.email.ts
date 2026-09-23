import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const DeliveredEmailTemplate: EmailTemplate = {
  name: 'delivered',
  subject: 'Your shipment has been delivered',
  html: '<h2>Delivered</h2><p>Your shipment {{trackingNumber}} has been delivered successfully.</p>',
  variables: ['trackingNumber'],
};
