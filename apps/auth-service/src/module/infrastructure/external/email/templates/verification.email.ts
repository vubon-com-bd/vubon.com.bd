/**
 * Email Verification Template
 * @module auth-service/infrastructure/external/email/templates
 */
export const VerificationEmailTemplate = {
  name: 'verification',
  subject: 'Verify your Vubon email',
  body: `
    <h2>Verify your email</h2>
    <p>Your verification code is:</p>
    <h1 style="letter-spacing: 6px;">{{code}}</h1>
    <p>This code expires at {{expiresAt}}.</p>
  `,
} as const;
