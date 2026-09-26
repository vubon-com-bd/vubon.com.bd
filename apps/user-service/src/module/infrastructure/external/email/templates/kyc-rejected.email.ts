import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const KycRejectedEmailTemplate: EmailTemplate = {
  name: 'kyc-rejected',
  subject: 'KYC rejected',
  html: `<p>Hi {{name}}, your KYC was rejected: {{reason}}</p>`,
  text: 'Hi {{name}}, your KYC was rejected: {{reason}}',
  variables: ['name', 'reason'],
};
