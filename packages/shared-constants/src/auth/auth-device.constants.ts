/**
 * Auth Device Constants
 * @module shared-constants/auth/auth-device
 *
 * Note: Does NOT spread COMMON_DEVICE — this is the auth-scoped device
 * type list only (mobile, tablet, desktop, etc.).
 */

export const AUTH_DEVICE = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
  LAPTOP: 'laptop',
  SMART_TV: 'smart_tv',
  WEARABLE: 'wearable',
  UNKNOWN: 'unknown',
} as const;

export type AuthDeviceType = (typeof AUTH_DEVICE)[keyof typeof AUTH_DEVICE];
