import { BaseEmailTemplate, type TemplateData } from './base.template.js';

export class InsuranceClaimedTemplate extends BaseEmailTemplate {
  readonly templateId = 'insurance-claimed';
  readonly subject = 'Insurance claim submitted';

  render(data: TemplateData): { html: string; text: string } {
    const body = `<p>Hello ${data['customerName'] ?? 'Customer'},</p>
<p>Your insurance claim <strong>${data['claimNumber']}</strong> has been submitted.</p>
<p><strong>Claim amount:</strong> ${data['amount']} ${data['currency'] ?? 'BDT'}</p>
<p>Our team will review and get back to you within 48 hours.</p>`;
    const text = `Insurance claim ${data['claimNumber']} submitted. Amount: ${data['amount']} ${data['currency'] ?? 'BDT'}`;
    return { html: this.wrapHtml('Insurance Claim Submitted', body), text };
  }
}
