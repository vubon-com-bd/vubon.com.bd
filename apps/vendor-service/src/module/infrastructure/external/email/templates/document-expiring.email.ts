import { BaseTemplate, type BaseTemplateData } from './base.template.js';

interface DocumentExpiringData extends BaseTemplateData {
  readonly documentType: string;
  readonly expiresAt: string;
  readonly daysRemaining: number;
  readonly renewalUrl: string;
}

export class DocumentExpiringTemplate extends BaseTemplate<DocumentExpiringData> {
  readonly name = 'document-expiring';

  subject(data: DocumentExpiringData): string {
    return `Action needed: ${data.documentType} expires in ${data.daysRemaining} day(s)`;
  }

  render(data: DocumentExpiringData): string {
    return this.wrap(
      `<h2>Hello ${data.recipientName},</h2>
<p>Your document <strong>${data.documentType}</strong> expires on ${data.expiresAt}
(${data.daysRemaining} day(s) remaining).</p>
<p><a href="${data.renewalUrl}">Renew now</a></p>`,
      'Document Expiring',
    );
  }
}
