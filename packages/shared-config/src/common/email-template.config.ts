export const emailTemplateConfig = {
  defaultLocale: 'en',
  supportedLocales: ['en', 'bn'],
  cacheEnabled: true,
  cacheTtl: 3600,
  maxVariables: 20,
  variables: [
    '{{user_name}}',
    '{{user_email}}',
    '{{order_id}}',
    '{{order_total}}',
    '{{payment_amount}}',
    '{{verification_code}}',
    '{{reset_link}}',
  ],
};
