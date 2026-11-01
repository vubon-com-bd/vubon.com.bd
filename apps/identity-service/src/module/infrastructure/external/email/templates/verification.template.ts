import { BaseTemplate, type BaseTemplateData } from './base.template.js';

interface VerificationData extends BaseTemplateData {
  readonly code: string;
  readonly expiresInMinutes: number;
}

export class VerificationTemplate extends BaseTemplate<VerificationData> {
  readonly name = 'verification';

  subject(data: VerificationData): string {
    return `Your verification code: ${data.code}`;
  }

  render(data: VerificationData): string {
    return this.wrap(
      `<h2>Hi ${data.recipientName},</h2>
<p>Your email verification code is:</p>
<p style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #2563eb; text-align: center; padding: 16px; background: #eff6ff; border-radius: 8px;">${data.code}</p>
<p>This code expires in ${data.expiresInMinutes} minutes.</p>
<p style="color: #dc2626;">If you didn't request this, please ignore this email.</p>`,
      'Verify Email',
    );
  }
}
