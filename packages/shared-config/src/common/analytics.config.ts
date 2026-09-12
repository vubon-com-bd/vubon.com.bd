import { LOCALE } from '@vubon/shared-constants/src/common/locale.constants';
import { TIMEZONE } from '@vubon/shared-constants/src/common/timezone.constants';

export const analyticsConfig = {
  enabled: true,
  dataCollection: 'aggregated' as const,
  retentionDays: 90,
  realTimeEnabled: true,
  historicalEnabled: true,
  predictiveEnabled: false,
  privacyEnabled: true,
  securityEnabled: true,
  defaultTimezone: TIMEZONE.DHAKA,
  defaultLocale: LOCALE.BN_BD,
} as const;
