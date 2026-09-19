import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const RecoveryCodeEmailTemplate: EmailTemplate = {
  name: 'recovery-code',
  subject: 'Your Vubon recovery codes',
  html: `
    <h2>Account Recovery Codes</h2>
    <p>Hi {{name}},</p>
    <p>Store these recovery codes in a safe place. Each can be used once:</p>
    <pre>{{codes}}</pre>
    <p>Keep them secure and don't share them.</p>
  `,
  text: 'Hi {{name}}, your recovery codes: {{codes}}',
  variables: ['name', 'codes'],
};
