/**
 * Account Lock Template
 * @module auth-service/infrastructure/external/email/templates
 */
export const AccountLockEmailTemplate = {
  name: 'account-lock',
  subject: 'Your Vubon account has been locked',
  body: `
    <h2>Account locked</h2>
    <p>Reason: {{reason}}</p>
    <p>Unlock time: {{unlockAt}}</p>
    <p>If this wasn't you, contact support immediately.</p>
  `,
} as const;
