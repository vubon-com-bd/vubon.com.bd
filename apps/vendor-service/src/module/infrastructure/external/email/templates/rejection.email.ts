import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const RejectionEmailTemplate: EmailTemplate = {
  name: 'vendor-rejection',
  subject: 'Vendor application update',
  html: `<p>Hello {{vendorName}},</p><p>Your application was not approved. Reason: {{reason}}</p>`,
  text: 'Your application was not approved. Reason: {{reason}}',
  variables: ['vendorName', 'reason'],
};
