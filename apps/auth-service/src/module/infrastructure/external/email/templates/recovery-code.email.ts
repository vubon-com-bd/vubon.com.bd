/**
 * Recovery Codes Template
 * @module auth-service/infrastructure/external/email/templates
 */
export const RecoveryCodeEmailTemplate = {
  name: 'recovery-code',
  subject: 'Your Vubon recovery codes',
  body: `
    <h2>Recovery codes ({{count}})</h2>
    <p>Store these in a safe place. Each can only be used once.</p>
    <pre>{{codes}}</pre>
  `,
} as const;
