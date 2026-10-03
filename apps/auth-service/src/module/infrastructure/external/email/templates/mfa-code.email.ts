/**
 * MFA Code Template
 * @module auth-service/infrastructure/external/email/templates
 */
export const MfaCodeEmailTemplate = {
  name: 'mfa-code',
  subject: 'Your Vubon verification code',
  body: `
    <h2>Your login code</h2>
    <h1 style="letter-spacing: 6px;">{{code}}</h1>
    <p>This code expires in 5 minutes.</p>
  `,
} as const;
