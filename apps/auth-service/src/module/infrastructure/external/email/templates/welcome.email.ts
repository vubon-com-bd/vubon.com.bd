import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const WelcomeEmailTemplate: EmailTemplate = {
  name: 'welcome',
  subject: 'Welcome to Vubon',
  html: `
    <h1>Welcome, {{name}}!</h1>
    <p>Thank you for joining Vubon. Your account is ready.</p>
    <p>— The Vubon Team</p>
  `,
  text: 'Welcome, {{name}}! Thank you for joining Vubon.',
  variables: ['name'],
};
