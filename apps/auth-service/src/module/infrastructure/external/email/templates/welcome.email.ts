/**
 * Welcome Email Template
 * @module auth-service/infrastructure/external/email/templates
 */
export const WelcomeEmailTemplate = {
  name: 'welcome',
  subject: 'Welcome to Vubon 🎉',
  body: `
    <h1>Welcome, {{name}}!</h1>
    <p>Your Vubon account is now active.</p>
    <p>Get started by exploring the marketplace.</p>
    <p>— The Vubon Team</p>
  `,
} as const;
