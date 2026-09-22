import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const VerificationEmailTemplate: EmailTemplate = {
  name: 'vendor-verification',
  subject: 'Verify your vendor documents',
  html: `<p>Your verification is pending. Documents needed: {{documentCount}}</p>`,
  text: 'Verification pending. Documents needed: {{documentCount}}',
  variables: ['documentCount'],
};
