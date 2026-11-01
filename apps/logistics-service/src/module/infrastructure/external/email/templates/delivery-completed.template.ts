import { BaseEmailTemplate, type TemplateData } from './base.template.js';

export class DeliveryCompletedTemplate extends BaseEmailTemplate {
  readonly templateId = 'delivery-completed';
  readonly subject = 'Your shipment has been delivered';

  render(data: TemplateData): { html: string; text: string } {
    const body = `<p>Hello ${data['customerName'] ?? 'Customer'},</p>
<p>Your shipment <strong>${data['trackingNumber']}</strong> has been delivered successfully.</p>
<p><strong>Delivered at:</strong> ${data['deliveredAt']}</p>
<p>Thank you for choosing Vubon!</p>`;
    const text = `Your shipment ${data['trackingNumber']} has been delivered at ${data['deliveredAt']}.`;
    return { html: this.wrapHtml('Shipment Delivered', body), text };
  }
}
