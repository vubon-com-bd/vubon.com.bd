import { BaseEmailTemplate, type TemplateData } from './base.template.js';

export class ShipmentCreatedTemplate extends BaseEmailTemplate {
  readonly templateId = 'shipment-created';
  readonly subject = 'Your shipment has been created';

  render(data: TemplateData): { html: string; text: string } {
    const body = `<p>Hello ${data['customerName'] ?? 'Customer'},</p>
<p>Your shipment <strong>${data['shipmentNumber']}</strong> has been created.</p>
<p><strong>Tracking Number:</strong> ${data['trackingNumber']}</p>
<p><strong>Estimated delivery:</strong> ${data['estimatedDelivery'] ?? 'TBD'}</p>
<p>You can track it at any time using your tracking number.</p>`;
    const text = `Hello ${data['customerName'] ?? 'Customer'},\n\nYour shipment ${data['shipmentNumber']} has been created.\nTracking: ${data['trackingNumber']}\nEstimated delivery: ${data['estimatedDelivery'] ?? 'TBD'}`;
    return { html: this.wrapHtml('Shipment Created', body), text };
  }
}
