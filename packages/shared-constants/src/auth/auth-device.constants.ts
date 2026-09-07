import { DEVICE as COMMON_DEVICE } from '../common/device.constants';

export const AUTH_DEVICE = {
  ...COMMON_DEVICE,
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
  UNKNOWN: 'unknown',
} as const;
