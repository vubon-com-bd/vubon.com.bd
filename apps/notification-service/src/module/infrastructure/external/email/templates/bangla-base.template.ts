/**
 * Bangla Email Base Template — reusable HTML layout
 * @module notification-service/infrastructure/external/email/templates
 *
 * RTL-compatible Bangla email layout with brand colors.
 */
import { HeaderPartial } from '../../../template-engine/partials/header.partial.js';
import { FooterPartial } from '../../../template-engine/partials/footer.partial.js';
import { ButtonPartial, type ButtonPartialInput } from '../../../template-engine/partials/button.partial.js';

export interface BanglaEmailLayoutInput {
  readonly title: string;
  readonly greeting?: string;
  readonly bodyHtml: string;
  readonly ctaButton?: ButtonPartialInput;
  readonly locale?: 'en' | 'bn';
  readonly unsubscribeUrl?: string;
}

export class BanglaEmailTemplate {
  static render(input: BanglaEmailLayoutInput): string {
    const locale = input.locale ?? 'bn';
    const isBangla = locale === 'bn';
    const fontFamily = isBangla
      ? "'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif"
      : "'Inter', Arial, sans-serif";

    const headerHtml = HeaderPartial.render({
      brandName: 'Vubon',
      logoUrl: 'https://vubon.com.bd/logo.png',
      bgColor: '#0f172a',
      textColor: '#ffffff',
    });

    const ctaHtml = input.ctaButton ? ButtonPartial.render(input.ctaButton) : '';

    const footerHtml = FooterPartial.render({
      brandName: 'Vubon',
      addressLine: isBangla ? 'ঢাকা, বাংলাদেশ' : 'Dhaka, Bangladesh',
      unsubscribeUrl: input.unsubscribeUrl ?? '{{unsubscribeUrl}}',
      supportEmail: 'support@vubon.com.bd',
    });

    return `<!DOCTYPE html>
<html lang="${locale}" dir="ltr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${input.title}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:${fontFamily};color:#0f172a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr><td>${headerHtml}</td></tr>
          
          <!-- Body -->
          <tr>
            <td style="padding:32px 24px;">
              ${input.greeting ? `<p style="font-size:16px;margin:0 0 16px 0;color:#1e293b;">${input.greeting}</p>` : ''}
              <div style="font-size:15px;line-height:1.7;color:#334155;">
                ${input.bodyHtml}
              </div>
              ${ctaHtml}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr><td>${footerHtml}</td></tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }
}
