import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const WelcomeEmailTemplate: EmailTemplate = {
  name: 'welcome',
  subject: 'Welcome to Vubon',
  html: `<h1>Welcome, {{name}}!</h1><p>Your account is ready.</p>`,
  text: 'Welcome, {{name}}! Your account is ready.',
  variables: ['name'],
};
