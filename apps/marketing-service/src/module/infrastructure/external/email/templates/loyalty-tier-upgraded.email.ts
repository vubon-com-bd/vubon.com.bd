import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const LoyaltyTierUpgradedEmailTemplate: EmailTemplate = {
  name: 'marketing-loyalty-tier-upgraded',
  subject: 'You reached {{newTier}} tier! 🎉',
  html: `
    <h2>Congratulations, {{name}}!</h2>
    <p>You've been upgraded to <strong>{{newTier}}</strong>.</p>
    <p>New benefits: {{benefits}}</p>
  `,
  text: 'You reached {{newTier}} tier!',
  variables: ['name', 'newTier', 'benefits'],
};
