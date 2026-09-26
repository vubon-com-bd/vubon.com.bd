import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const OutForDeliveryEmailTemplate: EmailTemplate = {
  name: 'out-for-delivery',
  subject: 'Your shipment is out for delivery',
  html: '<h2>Out for Delivery</h2><p>Your shipment {{trackingNumber}} is on the way.</p>',
  variables: ['trackingNumber'],
};
