import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const SuspensionEmailTemplate: EmailTemplate = {
  name: 'vendor-suspension',
  subject: 'Vendor account suspended',
  html: `<p>Hello {{vendorName}},</p><p>Your vendor account has been suspended.</p><p>Reason: {{reason}}</p>`,
  text: 'Your account has been suspended. Reason: {{reason}}',
  variables: ['vendorName', 'reason'],
};
