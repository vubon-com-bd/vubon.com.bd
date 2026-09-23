import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const LoyaltyPointsEarnedEmailTemplate: EmailTemplate = {
  name: 'marketing-loyalty-points-earned',
  subject: 'You earned {{points}} points!',
  html: `
    <h2>Hi {{name}},</h2>
    <p>You earned <strong>{{points}} points</strong>!</p>
    <p>Total balance: {{totalPoints}}</p>
  `,
  text: 'You earned {{points}} points! Total: {{totalPoints}}',
  variables: ['name', 'points', 'totalPoints'],
};
