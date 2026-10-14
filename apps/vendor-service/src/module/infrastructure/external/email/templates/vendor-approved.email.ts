import { BaseTemplate, type BaseTemplateData } from './base.template.js';

interface VendorApprovedData extends BaseTemplateData {
  readonly vendorName: string;
  readonly dashboardUrl: string;
}

export class VendorApprovedTemplate extends BaseTemplate<VendorApprovedData> {
  readonly name = 'vendor-approved';

  subject(data: VendorApprovedData): string {
    return `Your vendor account "${data.vendorName}" is approved!`;
  }

  render(data: VendorApprovedData): string {
    return this.wrap(
      `<h2>Congratulations ${data.recipientName}!</h2>
<p>Your vendor account <strong>${data.vendorName}</strong> has been approved.</p>
<p>You can now start listing products and receiving orders.</p>
<p><a href="${data.dashboardUrl}">Open Dashboard</a></p>`,
      'Vendor Approved',
    );
  }
}
