import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const ShipmentCreatedEmailTemplate: EmailTemplate = {
  name: 'shipment-created',
  subject: 'Your shipment has been created',
  html: '<h2>Shipment Created</h2><p>Your order has been shipped. Tracking: {{trackingNumber}}</p>',
  variables: ['trackingNumber'],
};
