import { BaseTemplate, type BaseTemplateData } from './base.template.js';

interface PasswordResetData extends BaseTemplateData {
  readonly resetUrl: string;
  readonly expiresInMinutes: number;
}

export class PasswordResetTemplate extends BaseTemplate<PasswordResetData> {
  readonly name = 'password-reset';

  subject(data: PasswordResetData): string {
    return `Reset your password, ${data.recipientName}`;
  }

  render(data: PasswordResetData): string {
    return this.wrap(
      `<h2>Password Reset Request</h2>
<p>Hi ${data.recipientName},</p>
<p>Click the button below to reset your password:</p>
<p style="margin: 24px 0;">
  <a href="${data.resetUrl}" style="background: #2563eb; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Reset Password</a>
</p>
<p>This link expires in ${data.expiresInMinutes} minutes.</p>
<p style="color: #dc2626;">If you didn't request a password reset, contact support immediately.</p>`,
      'Reset Password',
    );
  }
}
