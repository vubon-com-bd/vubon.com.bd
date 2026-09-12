import { LOCALE } from '@vubon/shared-constants/src/common/locale.constants';

export const emailTemplateConfig = {
  defaultLocale: LOCALE.EN_US,
  supportedLocales: [LOCALE.EN_US, LOCALE.BN_BD] as const,
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
} as const;
