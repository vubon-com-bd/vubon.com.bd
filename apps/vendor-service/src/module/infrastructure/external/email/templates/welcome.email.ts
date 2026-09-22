import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const WelcomeEmailTemplate: EmailTemplate = {
  name: 'vendor-welcome',
  subject: 'Welcome to Vubon Vendor Program',
  html: `<h1>Welcome, {{vendorName}}!</h1><p>Your vendor account has been created.</p>`,
  text: 'Welcome, {{vendorName}}!',
  variables: ['vendorName'],
};
