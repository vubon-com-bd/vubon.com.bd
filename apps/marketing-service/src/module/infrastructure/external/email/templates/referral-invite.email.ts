import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const ReferralInviteEmailTemplate: EmailTemplate = {
  name: 'marketing-referral-invite',
  subject: '{{referrerName}} invited you to Vubon!',
  html: `
    <h2>Join Vubon with {{referrerName}}'s referral</h2>
    <p>Use referral code: <strong>{{referralCode}}</strong></p>
    <p>Get {{rewardAmount}} off your first purchase!</p>
  `,
  text: 'Use code {{referralCode}} for {{rewardAmount}} off',
  variables: ['referrerName', 'referralCode', 'rewardAmount'],
};
