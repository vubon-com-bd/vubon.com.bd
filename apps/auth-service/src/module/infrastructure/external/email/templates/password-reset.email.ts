/**
 * Password Reset Template
 * @module auth-service/infrastructure/external/email/templates
 */
export const PasswordResetEmailTemplate = {
  name: 'password-reset',
  subject: 'Reset your Vubon password',
  body: `
    <h2>Password Reset Request</h2>
    <p>Click the link below to reset your password:</p>
    <p><a href="{{resetUrl}}">Reset Password</a></p>
    <p>This link expires at {{expiresAt}}.</p>
    <p>If you didn't request this, ignore this email.</p>
  `,
} as const;
