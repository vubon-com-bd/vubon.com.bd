/**
 * Auth Device Constants
 * @module shared-constants/auth/auth-device
 *
 * Note: Does NOT spread COMMON_DEVICE — only auth-scoped device types are
 * listed here. Where values overlap with DEVICE.TYPE, they are referenced
 * to avoid drift. WEARABLE/UNKNOWN are auth-scoped additions.
 */

import { DEVICE } from '../common/device.constants';

export const AUTH_DEVICE = {
  // Referenced from DEVICE.TYPE (avoid drift)
  MOBILE: DEVICE.TYPE.MOBILE,
  TABLET: DEVICE.TYPE.TABLET,
  DESKTOP: DEVICE.TYPE.DESKTOP,
  LAPTOP: DEVICE.TYPE.LAPTOP,
  SMART_TV: DEVICE.TYPE.SMART_TV,

  // Auth-scoped additions (not in DEVICE.TYPE)
  WEARABLE: 'wearable',
  UNKNOWN: 'unknown',
} as const;

export type AuthDeviceType = (typeof AUTH_DEVICE)[keyof typeof AUTH_DEVICE];
