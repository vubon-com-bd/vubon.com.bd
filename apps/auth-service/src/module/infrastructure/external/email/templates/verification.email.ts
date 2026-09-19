import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const VerificationEmailTemplate: EmailTemplate = {
  name: 'verification',
  subject: 'Verify your email',
  html: `
    <h2>Email Verification</h2>
    <p>Hi {{name}},</p>
    <p>Your verification code is: <strong>{{code}}</strong></p>
    <p>This code will expire in {{expiryMinutes}} minutes.</p>
  `,
  text: 'Hi {{name}}, your verification code is {{code}}. Expires in {{expiryMinutes}} minutes.',
  variables: ['name', 'code', 'expiryMinutes'],
};
