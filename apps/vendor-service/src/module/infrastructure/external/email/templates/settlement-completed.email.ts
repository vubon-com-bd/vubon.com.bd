import { BaseTemplate, type BaseTemplateData } from './base.template.js';

interface SettlementCompletedData extends BaseTemplateData {
  readonly settlementId: string;
  readonly netAmount: number;
  readonly currency: string;
  readonly periodStart: string;
  readonly periodEnd: string;
}

export class SettlementCompletedTemplate extends BaseTemplate<SettlementCompletedData> {
  readonly name = 'settlement-completed';

  subject(data: SettlementCompletedData): string {
    return `Settlement completed — ${data.netAmount} ${data.currency}`;
  }

  render(data: SettlementCompletedData): string {
    return this.wrap(
      `<h2>Hello ${data.recipientName},</h2>
<p>Your settlement <strong>#${data.settlementId}</strong> is complete.</p>
<p>Period: ${data.periodStart} — ${data.periodEnd}</p>
<p>Net Amount: <strong>${data.netAmount} ${data.currency}</strong></p>`,
      'Settlement Completed',
    );
  }
}
