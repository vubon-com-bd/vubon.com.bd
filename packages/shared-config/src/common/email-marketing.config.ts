export const emailMarketingConfig = {
  enabled: true,
  maxSubjectLength: 100,
  maxContentLength: 10_000,
  sendLimitPerHour: 1000,
  sendLimitPerDay: 10_000,
  minSendInterval: 5,
  providers: ['sendgrid', 'aws_ses', 'mailgun', 'smtp'] as const,
  defaultProvider: 'smtp' as const,
  templates: {
    welcome: 'welcome',
    newsletter: 'newsletter',
    promotional: 'promotional',
    transactional: 'transactional',
  },
} as const;
