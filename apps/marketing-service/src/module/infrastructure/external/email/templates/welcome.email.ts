import type { EmailTemplate } from '@vubon/shared-kernel/infrastructure';

export const WelcomeEmailTemplate: EmailTemplate = {
  name: 'marketing-welcome',
  subject: 'Welcome to Vubon, {{name}}!',
  html: `
    <h1>Welcome, {{name}}!</h1>
    <p>Thank you for joining Vubon. We're excited to have you.</p>
    <p>Start exploring exclusive offers and rewards today.</p>
  `,
  text: 'Welcome, {{name}}! Thank you for joining Vubon.',
  variables: ['name'],
};
