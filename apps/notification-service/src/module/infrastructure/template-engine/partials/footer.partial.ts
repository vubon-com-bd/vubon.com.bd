/**
 * Email Footer Partial
 * @module notification-service/infrastructure/template-engine/partials
 *
 * Reusable email footer with unsubscribe + company info।
 * Required by CAN-SPAM / GDPR regulations।
 */
export interface FooterPartialInput {
  readonly brandName?: string;
  readonly addressLine?: string;
  readonly unsubscribeUrl?: string;
  readonly preferencesUrl?: string;
  readonly supportEmail?: string;
  readonly year?: number;
}

export class FooterPartial {
  static readonly partialName = 'footer';

  static render(input: FooterPartialInput = {}): string {
    const brandName = input.brandName ?? 'Vubon';
    const address = input.addressLine ?? 'Dhaka, Bangladesh';
    const unsubscribeUrl = input.unsubscribeUrl ?? '{{unsubscribeUrl}}';
    const preferencesUrl = input.preferencesUrl ?? '{{preferencesUrl}}';
    const supportEmail = input.supportEmail ?? 'support@vubon.com.bd';
    const year = input.year ?? new Date().getFullYear();

    return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;margin-top:32px;">
  <tr>
    <td style="padding:24px;text-align:center;color:#64748b;font-size:12px;">
      <p style="margin:0 0 8px 0;">© ${year} ${brandName}. All rights reserved.</p>
      <p style="margin:0 0 8px 0;">${address}</p>
      <p style="margin:0;">
        <a href="${unsubscribeUrl}" style="color:#64748b;text-decoration:underline;">Unsubscribe</a> ·
        <a href="${preferencesUrl}" style="color:#64748b;text-decoration:underline;">Preferences</a> ·
        <a href="mailto:${supportEmail}" style="color:#64748b;text-decoration:underline;">Contact</a>
      </p>
    </td>
  </tr>
</table>`.trim();
  }
}
