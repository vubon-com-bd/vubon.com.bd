import { BaseTemplate, type BaseTemplateData } from './base.template.js';

interface VendorRegisteredData extends BaseTemplateData {
  readonly vendorName: string;
  readonly dashboardUrl: string;
}

export class VendorRegisteredTemplate extends BaseTemplate<VendorRegisteredData> {
  readonly name = 'vendor-registered';

  subject(data: VendorRegisteredData): string {
    return `Welcome ${data.vendorName} — your vendor account is pending approval`;
  }

  render(data: VendorRegisteredData): string {
    return this.wrap(
      `<h2>Hello ${data.recipientName},</h2>
<p>Your vendor account <strong>${data.vendorName}</strong> has been registered successfully.</p>
<p>Our team will review your details shortly. You can check status anytime:</p>
<p><a href="${data.dashboardUrl}">Go to Dashboard</a></p>`,
      'Vendor Registered',
    );
  }
}
