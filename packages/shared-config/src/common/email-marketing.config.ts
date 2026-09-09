export const emailMarketingConfig = {
  enabled: true,
  maxSubjectLength: 100,
  maxContentLength: 10000,
  sendLimitPerHour: 1000,
  sendLimitPerDay: 10000,
  minSendInterval: 5, // seconds
  providers: ['sendgrid', 'aws_ses', 'mailgun', 'smtp'],
  defaultProvider: 'smtp',
  templates: {
    welcome: 'welcome',
    newsletter: 'newsletter',
    promotional: 'promotional',
    transactional: 'transactional',
  },
};
