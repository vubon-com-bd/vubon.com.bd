import { BaseTemplate, type BaseTemplateData } from './base.template.js';

interface PayoutProcessedData extends BaseTemplateData {
  readonly payoutId: string;
  readonly amount: number;
  readonly currency: string;
  readonly status: string;
}

export class PayoutProcessedTemplate extends BaseTemplate<PayoutProcessedData> {
  readonly name = 'payout-processed';

  subject(data: PayoutProcessedData): string {
    return `Payout ${data.status}: ${data.amount} ${data.currency}`;
  }

  render(data: PayoutProcessedData): string {
    return this.wrap(
      `<h2>Hello ${data.recipientName},</h2>
<p>Your payout <strong>#${data.payoutId}</strong> is <strong>${data.status}</strong>.</p>
<p>Amount: <strong>${data.amount} ${data.currency}</strong></p>`,
      'Payout Update',
    );
  }
}
