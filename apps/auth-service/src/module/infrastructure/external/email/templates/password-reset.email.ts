import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const PasswordResetEmailTemplate: EmailTemplate = {
  name: 'password-reset',
  subject: 'Reset your Vubon password',
  html: `
    <h2>Password Reset Request</h2>
    <p>Hi {{name}},</p>
    <p>Click the link below to reset your password:</p>
    <p><a href="{{resetUrl}}">Reset Password</a></p>
    <p>If you didn't request this, ignore this email.</p>
    <p>Link expires in {{expiryMinutes}} minutes.</p>
  `,
  text: 'Reset your password: {{resetUrl}}',
  variables: ['name', 'resetUrl', 'expiryMinutes'],
};
