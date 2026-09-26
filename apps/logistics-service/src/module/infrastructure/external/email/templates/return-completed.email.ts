import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const ReturnCompletedEmailTemplate: EmailTemplate = {
  name: 'return-completed',
  subject: 'Your return has been completed',
  html: '<h2>Return Completed</h2><p>Your return {{returnId}} has been completed.</p>',
  variables: ['returnId'],
};
