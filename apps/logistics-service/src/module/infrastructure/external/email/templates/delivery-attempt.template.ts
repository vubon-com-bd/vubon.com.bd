import { BaseEmailTemplate, type TemplateData } from './base.template.js';

export class DeliveryAttemptTemplate extends BaseEmailTemplate {
  readonly templateId = 'delivery-attempt';
  readonly subject = 'Delivery attempt failed';

  render(data: TemplateData): { html: string; text: string } {
    const body = `<p>Hello ${data['customerName'] ?? 'Customer'},</p>
<p>We attempted to deliver your shipment <strong>${data['trackingNumber']}</strong> but could not complete.</p>
<p><strong>Reason:</strong> ${data['reason'] ?? 'Customer unavailable'}</p>
<p>We will try again on: ${data['nextAttempt'] ?? 'TBD'}</p>`;
    const text = `Delivery attempt failed for ${data['trackingNumber']}.\nReason: ${data['reason'] ?? 'Customer unavailable'}`;
    return { html: this.wrapHtml('Delivery Attempt Failed', body), text };
  }
}
