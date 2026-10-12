import { BaseTemplate, type BaseTemplateData } from './base.template.js';

interface MfaCodeData extends BaseTemplateData {
  readonly code: string;
  readonly expiresInMinutes: number;
}

export class MfaCodeTemplate extends BaseTemplate<MfaCodeData> {
  readonly name = 'mfa-code';

  subject(data: MfaCodeData): string {
    return `Your 2FA code: ${data.code}`;
  }

  render(data: MfaCodeData): string {
    return this.wrap(
      `<h2>Two-Factor Authentication</h2>
<p>Hi ${data.recipientName},</p>
<p>Your 2FA verification code is:</p>
<p style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #2563eb; text-align: center; padding: 16px; background: #eff6ff; border-radius: 8px;">${data.code}</p>
<p>Expires in ${data.expiresInMinutes} minutes.</p>
<p style="color: #dc2626;">If you didn't request this code, change your password immediately.</p>`,
      '2FA Code',
    );
  }
}
