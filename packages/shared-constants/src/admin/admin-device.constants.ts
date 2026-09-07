import { DEVICE as COMMON_DEVICE } from '../common/device.constants';

export const ADMIN_DEVICE = {
  ...COMMON_DEVICE,
  DESKTOP: 'desktop',
  LAPTOP: 'laptop',
  MOBILE: 'mobile',
} as const;
