import { BaseTemplate, type BaseTemplateData } from './base.template.js';

interface VendorSuspendedData extends BaseTemplateData {
  readonly vendorName: string;
  readonly reason: string;
  readonly durationDays?: number;
  readonly appealDeadline?: string;
}

export class VendorSuspendedTemplate extends BaseTemplate<VendorSuspendedData> {
  readonly name = 'vendor-suspended';

  subject(data: VendorSuspendedData): string {
    return `Important: your vendor account "${data.vendorName}" has been suspended`;
  }

  render(data: VendorSuspendedData): string {
    return this.wrap(
      `<h2>Hello ${data.recipientName},</h2>
<p>Your vendor account <strong>${data.vendorName}</strong> has been suspended.</p>
<p><strong>Reason:</strong> ${data.reason}</p>
${data.durationDays ? `<p><strong>Duration:</strong> ${data.durationDays} days</p>` : ''}
${data.appealDeadline ? `<p><strong>Appeal by:</strong> ${data.appealDeadline}</p>` : ''}`,
      'Vendor Suspended',
    );
  }
}
