/**
 * Email Button Partial — CTA button
 * @module notification-service/infrastructure/template-engine/partials
 */
export interface ButtonPartialInput {
  readonly label: string;
  readonly url: string;
  readonly bgColor?: string;
  readonly textColor?: string;
  readonly align?: 'left' | 'center' | 'right';
  readonly variant?: 'primary' | 'secondary' | 'danger';
}

export class ButtonPartial {
  static readonly partialName = 'button';

  static render(input: ButtonPartialInput): string {
    const colors = {
      primary: { bg: '#3b82f6', text: '#ffffff' },
      secondary: { bg: '#e2e8f0', text: '#0f172a' },
      danger: { bg: '#ef4444', text: '#ffffff' },
    };

    const variant = input.variant ?? 'primary';
    const bgColor = input.bgColor ?? colors[variant].bg;
    const textColor = input.textColor ?? colors[variant].text;
    const align = input.align ?? 'center';

    return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td style="text-align:${align};padding:16px 0;">
      <a href="${input.url}" style="display:inline-block;padding:12px 24px;background:${bgColor};color:${textColor};text-decoration:none;border-radius:6px;font-weight:600;font-size:14px;">
        ${this.escape(input.label)}
      </a>
    </td>
  </tr>
</table>`.trim();
  }

  private static escape(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
