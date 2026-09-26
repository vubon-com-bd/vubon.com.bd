import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const ApprovalEmailTemplate: EmailTemplate = {
  name: 'vendor-approval',
  subject: 'Your vendor account is approved',
  html: `<h1>Congratulations, {{vendorName}}!</h1><p>Your vendor account has been approved.</p>`,
  text: 'Congratulations, {{vendorName}}! Your account is approved.',
  variables: ['vendorName'],
};
