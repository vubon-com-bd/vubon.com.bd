/**
 * Welcome Email Template
 * @module user-service/infrastructure/external/email/templates
 */
export interface WelcomeEmailVariables {
  readonly userName: string;
  readonly loginUrl: string;
}

export const WelcomeEmailTemplate = {
  name: 'welcome',
  subjectKey: 'email.welcome.subject',
  subjectFallback: 'Welcome to Vubon!',
  variables: {
    userName: '{{user_name}}',
    loginUrl: '{{login_url}}',
  },
  buildVariables(input: WelcomeEmailVariables): Record<string, string> {
    return {
      user_name: input.userName,
      login_url: input.loginUrl,
    };
  },
} as const;
