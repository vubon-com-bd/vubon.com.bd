import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const AccountLockEmailTemplate: EmailTemplate = {
  name: 'account-lock',
  subject: 'Your Vubon account has been locked',
  html: `
    <h2>Account Locked</h2>
    <p>Hi {{name}},</p>
    <p>Your account was locked due to: <strong>{{reason}}</strong></p>
    <p>It will automatically unlock at {{unlockAt}}.</p>
    <p>If this wasn't you, contact support immediately.</p>
  `,
  text: 'Account locked: {{reason}}. Unlocks at {{unlockAt}}.',
  variables: ['name', 'reason', 'unlockAt'],
};
