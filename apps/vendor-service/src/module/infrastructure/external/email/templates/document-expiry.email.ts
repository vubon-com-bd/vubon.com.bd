import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const DocumentExpiryEmailTemplate: EmailTemplate = {
  name: 'vendor-document-expiry',
  subject: 'Document expiring soon',
  html: `<p>Your document ({{documentType}}) is expiring on {{expiresAt}}.</p>`,
  text: 'Document {{documentType}} is expiring on {{expiresAt}}',
  variables: ['documentType', 'expiresAt'],
};
