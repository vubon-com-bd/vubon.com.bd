import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const KycVerifiedEmailTemplate: EmailTemplate = {
  name: 'kyc-verified',
  subject: 'KYC verified',
  html: `<p>Hi {{name}}, your KYC has been verified.</p>`,
  text: 'Hi {{name}}, your KYC has been verified.',
  variables: ['name'],
};
