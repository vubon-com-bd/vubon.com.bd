import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const KycSubmittedEmailTemplate: EmailTemplate = {
  name: 'kyc-submitted',
  subject: 'KYC submitted',
  html: `<p>Hi {{name}}, we received your KYC documents. Review will take up to {{hours}} hours.</p>`,
  text: 'Hi {{name}}, we received your KYC documents. Review will take up to {{hours}} hours.',
  variables: ['name', 'hours'],
};
