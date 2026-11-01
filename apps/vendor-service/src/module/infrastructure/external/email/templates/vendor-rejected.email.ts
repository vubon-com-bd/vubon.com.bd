import { BaseTemplate, type BaseTemplateData } from './base.template.js';

interface VendorRejectedData extends BaseTemplateData {
  readonly vendorName: string;
  readonly reason: string;
  readonly appealUrl?: string;
}

export class VendorRejectedTemplate extends BaseTemplate<VendorRejectedData> {
  readonly name = 'vendor-rejected';

  subject(data: VendorRejectedData): string {
    return `Update on your vendor application "${data.vendorName}"`;
  }

  render(data: VendorRejectedData): string {
    const appeal = data.appealUrl
      ? `<p>You may appeal this decision: <a href="${data.appealUrl}">Submit appeal</a></p>`
      : '';
    return this.wrap(
      `<h2>Hello ${data.recipientName},</h2>
<p>We were unable to approve your vendor account <strong>${data.vendorName}</strong>.</p>
<p><strong>Reason:</strong> ${data.reason}</p>
${appeal}`,
      'Vendor Application Update',
    );
  }
}
