/**
 * Email Header Partial
 * @module notification-service/infrastructure/template-engine/partials
 *
 * Reusable email header with logo + brand name।
 */
export interface HeaderPartialInput {
  readonly brandName?: string;
  readonly logoUrl?: string;
  readonly bgColor?: string;
  readonly textColor?: string;
}

export class HeaderPartial {
  static readonly partialName = 'header';

  static render(input: HeaderPartialInput = {}): string {
    const brandName = input.brandName ?? 'Vubon';
    const logoUrl = input.logoUrl ?? 'https://vubon.com.bd/logo.png';
    const bgColor = input.bgColor ?? '#0f172a';
    const textColor = input.textColor ?? '#ffffff';

    return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${bgColor};">
  <tr>
    <td style="padding:24px;text-align:center;">
      <img src="${logoUrl}" alt="${brandName}" height="40" style="display:inline-block;vertical-align:middle;" />
      <span style="color:${textColor};font-size:20px;font-weight:600;margin-left:12px;vertical-align:middle;">
        ${brandName}
      </span>
    </td>
  </tr>
</table>`.trim();
  }
}
