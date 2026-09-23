import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const ReturnApprovedEmailTemplate: EmailTemplate = {
  name: 'return-approved',
  subject: 'Your return has been approved',
  html: '<h2>Return Approved</h2><p>Your return request {{returnId}} has been approved.</p>',
  variables: ['returnId'],
};
