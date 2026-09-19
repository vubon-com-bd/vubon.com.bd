import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const MfaCodeEmailTemplate: EmailTemplate = {
  name: 'mfa-code',
  subject: 'Your Vubon verification code',
  html: `
    <h2>Two-Factor Authentication</h2>
    <p>Your verification code is: <strong>{{code}}</strong></p>
    <p>This code expires in {{expiryMinutes}} minutes.</p>
    <p>Do not share this code with anyone.</p>
  `,
  text: 'Your MFA code is {{code}}. Expires in {{expiryMinutes}} minutes.',
  variables: ['code', 'expiryMinutes'],
};
