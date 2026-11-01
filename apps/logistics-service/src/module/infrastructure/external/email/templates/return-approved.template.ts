import { BaseEmailTemplate, type TemplateData } from './base.template.js';

export class ReturnApprovedTemplate extends BaseEmailTemplate {
  readonly templateId = 'return-approved';
  readonly subject = 'Your return has been approved';

  render(data: TemplateData): { html: string; text: string } {
    const body = `<p>Hello ${data['customerName'] ?? 'Customer'},</p>
<p>Your return request <strong>${data['rmaNumber']}</strong> has been approved.</p>
<p><strong>Pickup scheduled for:</strong> ${data['pickupDate'] ?? 'TBD'}</p>
<p>Please keep the items ready for pickup.</p>`;
    const text = `Your return ${data['rmaNumber']} has been approved. Pickup: ${data['pickupDate'] ?? 'TBD'}`;
    return { html: this.wrapHtml('Return Approved', body), text };
  }
}
