/**
 * Authentication Device Constants
 * Device management configuration
 */

import { AUTH_DEVICE_TYPE } from './auth-device-type.constants';
import { AUTH_DEVICE_STATUS } from './auth-device-status.constants';

export const DEVICE_PLATFORMS = {
  WEB: 'web',
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
  SMART_TV: 'smart_tv',
  GAMING_CONSOLE: 'gaming_console',
  WEARABLE: 'wearable',
  IOT: 'iot',
  EMBEDDED: 'embedded',
  API: 'api',
  CLI: 'cli',
} as const;

export const DEVICE_TRUST_LEVELS = {
  UNTRUSTED: 0,
  BASIC: 1,
  STANDARD: 2,
  TRUSTED: 3,
  HIGH_TRUST: 4,
  MAXIMUM_TRUST: 5,
} as const;

export const DEVICE_EVENTS = {
  REGISTERED: 'device:registered',
  VERIFIED: 'device:verified',
  BLOCKED: 'device:blocked',
  UNBLOCKED: 'device:unblocked',
  REMOVED: 'device:removed',
  TRUSTED: 'device:trusted',
  UNTRUSTED: 'device:untrusted',
  SUSPICIOUS: 'device:suspicious',
  ACTIVITY: 'device:activity',
  LOCATION_CHANGED: 'device:location_changed',
  IP_CHANGED: 'device:ip_changed',
  USER_AGENT_CHANGED: 'device:user_agent_changed',
} as const;

export const DEVICE_CONFIG = {
  MAX_DEVICES_PER_USER: 5,
  MAX_ACTIVE_SESSIONS: 3,
  SESSION_TIMEOUT_MINUTES: 30,
  REMEMBER_ME_DAYS: 30,
  TRACK_LOCATION: true,
  TRACK_IP: true,
  TRACK_USER_AGENT: true,
  TRACK_ACTIVITY: true,
  NOTIFY_ON_NEW_DEVICE: true,
  NOTIFY_ON_SUSPICIOUS: true,
  REQUIRE_VERIFICATION_FOR_NEW: true,
  AUTO_BLOCK_SUSPICIOUS: false,
} as const;

export const DEVICE_DEFAULTS = {
  STATUS: AUTH_DEVICE_STATUS.PENDING,
  TYPE: AUTH_DEVICE_TYPE.WEB,
  PLATFORM: DEVICE_PLATFORMS.WEB,
  TRUST_LEVEL: DEVICE_TRUST_LEVELS.UNTRUSTED,
  MAX_DEVICES: 5,
} as const;

export const AUTH_DEVICE = {
  CONFIG: DEVICE_CONFIG,
  PLATFORMS: DEVICE_PLATFORMS,
  TRUST_LEVELS: DEVICE_TRUST_LEVELS,
  EVENTS: DEVICE_EVENTS,
  DEFAULTS: DEVICE_DEFAULTS,
} as const;

export type AuthDeviceConfig = typeof DEVICE_CONFIG;
export type AuthDevicePlatform = (typeof DEVICE_PLATFORMS)[keyof typeof DEVICE_PLATFORMS];
export type AuthDeviceTrustLevel = (typeof DEVICE_TRUST_LEVELS)[keyof typeof DEVICE_TRUST_LEVELS];
export type AuthDeviceEvent = (typeof DEVICE_EVENTS)[keyof typeof DEVICE_EVENTS];
export type AuthDeviceDefaults = typeof DEVICE_DEFAULTS;

export const AUTHDEVICE_PLATFORMS_LIST: AuthDevicePlatform[] = [
  DEVICE_PLATFORMS.WEB,
  DEVICE_PLATFORMS.MOBILE,
  DEVICE_PLATFORMS.TABLET,
  DEVICE_PLATFORMS.DESKTOP,
  DEVICE_PLATFORMS.SMART_TV,
  DEVICE_PLATFORMS.GAMING_CONSOLE,
  DEVICE_PLATFORMS.WEARABLE,
  DEVICE_PLATFORMS.IOT,
  DEVICE_PLATFORMS.EMBEDDED,
  DEVICE_PLATFORMS.API,
  DEVICE_PLATFORMS.CLI,
];

export const AUTHDEVICE_MOBILE_PLATFORMS: AuthDevicePlatform[] = [
  DEVICE_PLATFORMS.MOBILE,
  DEVICE_PLATFORMS.TABLET,
  DEVICE_PLATFORMS.WEARABLE,
];

export const AUTHDEVICE_DESKTOP_PLATFORMS: AuthDevicePlatform[] = [
  DEVICE_PLATFORMS.DESKTOP,
  DEVICE_PLATFORMS.WEB,
];

export const AUTHDEVICE_EMBEDDED_PLATFORMS: AuthDevicePlatform[] = [
  DEVICE_PLATFORMS.SMART_TV,
  DEVICE_PLATFORMS.GAMING_CONSOLE,
  DEVICE_PLATFORMS.IOT,
  DEVICE_PLATFORMS.EMBEDDED,
];

export function isAuthdevicePlatform(platform: string): platform is AuthDevicePlatform {
  return AUTHDEVICE_PLATFORMS_LIST.includes(platform as AuthDevicePlatform);
}

export function isAuthdeviceMobilePlatform(platform: AuthDevicePlatform): boolean {
  return AUTHDEVICE_MOBILE_PLATFORMS.includes(platform);
}

export function isAuthdeviceDesktopPlatform(platform: AuthDevicePlatform): boolean {
  return AUTHDEVICE_DESKTOP_PLATFORMS.includes(platform);
}

export function isAuthdeviceEmbeddedPlatform(platform: AuthDevicePlatform): boolean {
  return AUTHDEVICE_EMBEDDED_PLATFORMS.includes(platform);
}

export function getAuthdevicePlatformLabel(platform: AuthDevicePlatform): string {
  const labels: Record<AuthDevicePlatform, string> = {
    [DEVICE_PLATFORMS.WEB]: 'Web Browser',
    [DEVICE_PLATFORMS.MOBILE]: 'Mobile Phone',
    [DEVICE_PLATFORMS.TABLET]: 'Tablet',
    [DEVICE_PLATFORMS.DESKTOP]: 'Desktop Computer',
    [DEVICE_PLATFORMS.SMART_TV]: 'Smart TV',
    [DEVICE_PLATFORMS.GAMING_CONSOLE]: 'Gaming Console',
    [DEVICE_PLATFORMS.WEARABLE]: 'Wearable Device',
    [DEVICE_PLATFORMS.IOT]: 'IoT Device',
    [DEVICE_PLATFORMS.EMBEDDED]: 'Embedded Device',
    [DEVICE_PLATFORMS.API]: 'API Client',
    [DEVICE_PLATFORMS.CLI]: 'CLI Client',
  };

  return labels[platform] || 'Unknown Platform';
}

export function getAuthdevicePlatformIcon(platform: AuthDevicePlatform): string {
  const icons: Record<AuthDevicePlatform, string> = {
    [DEVICE_PLATFORMS.WEB]: '🌐',
    [DEVICE_PLATFORMS.MOBILE]: '📱',
    [DEVICE_PLATFORMS.TABLET]: '📱',
    [DEVICE_PLATFORMS.DESKTOP]: '💻',
    [DEVICE_PLATFORMS.SMART_TV]: '📺',
    [DEVICE_PLATFORMS.GAMING_CONSOLE]: '🎮',
    [DEVICE_PLATFORMS.WEARABLE]: '⌚',
    [DEVICE_PLATFORMS.IOT]: '📡',
    [DEVICE_PLATFORMS.EMBEDDED]: '🔌',
    [DEVICE_PLATFORMS.API]: '🔗',
    [DEVICE_PLATFORMS.CLI]: '💻',
  };

  return icons[platform] || '📱';
}

export function getAuthdeviceTrustLevel(level: AuthDeviceTrustLevel): number {
  const levels: Record<AuthDeviceTrustLevel, number> = {
    [DEVICE_TRUST_LEVELS.UNTRUSTED]: 0,
    [DEVICE_TRUST_LEVELS.BASIC]: 1,
    [DEVICE_TRUST_LEVELS.STANDARD]: 2,
    [DEVICE_TRUST_LEVELS.TRUSTED]: 3,
    [DEVICE_TRUST_LEVELS.HIGH_TRUST]: 4,
    [DEVICE_TRUST_LEVELS.MAXIMUM_TRUST]: 5,
  };

  return levels[level] || 0;
}

export function getAuthdeviceTrustLevelLabel(level: AuthDeviceTrustLevel): string {
  const labels: Record<AuthDeviceTrustLevel, string> = {
    [DEVICE_TRUST_LEVELS.UNTRUSTED]: 'Untrusted',
    [DEVICE_TRUST_LEVELS.BASIC]: 'Basic Trust',
    [DEVICE_TRUST_LEVELS.STANDARD]: 'Standard Trust',
    [DEVICE_TRUST_LEVELS.TRUSTED]: 'Trusted',
    [DEVICE_TRUST_LEVELS.HIGH_TRUST]: 'High Trust',
    [DEVICE_TRUST_LEVELS.MAXIMUM_TRUST]: 'Maximum Trust',
  };

  return labels[level] || 'Unknown';
}

export function getAuthdeviceTrustLevelColor(level: AuthDeviceTrustLevel): string {
  const colors: Record<AuthDeviceTrustLevel, string> = {
    [DEVICE_TRUST_LEVELS.UNTRUSTED]: '#EF4444',
    [DEVICE_TRUST_LEVELS.BASIC]: '#F59E0B',
    [DEVICE_TRUST_LEVELS.STANDARD]: '#3B82F6',
    [DEVICE_TRUST_LEVELS.TRUSTED]: '#10B981',
    [DEVICE_TRUST_LEVELS.HIGH_TRUST]: '#059669',
    [DEVICE_TRUST_LEVELS.MAXIMUM_TRUST]: '#047857',
  };

  return colors[level] || '#6B7280';
}

export function getAuthdeviceMaxDevicesPerUser(): number {
  return DEVICE_CONFIG.MAX_DEVICES_PER_USER;
}

export function getAuthdeviceMaxActiveSessions(): number {
  return DEVICE_CONFIG.MAX_ACTIVE_SESSIONS;
}

export function getAuthdeviceSessionTimeoutMinutes(): number {
  return DEVICE_CONFIG.SESSION_TIMEOUT_MINUTES;
}

export function getAuthdeviceRememberMeDays(): number {
  return DEVICE_CONFIG.REMEMBER_ME_DAYS;
}

export function isAuthdeviceTrusted(level: AuthDeviceTrustLevel): boolean {
  return level >= DEVICE_TRUST_LEVELS.TRUSTED;
}

export function isAuthdeviceUntrusted(level: AuthDeviceTrustLevel): boolean {
  return level <= DEVICE_TRUST_LEVELS.UNTRUSTED;
}

export function getAuthdeviceTrustLevelFromHistory(
  loginCount: number,
  failedAttempts: number,
  ageDays: number
): AuthDeviceTrustLevel {
  let score = 0;

  if (loginCount >= 10) score += 2;
  else if (loginCount >= 5) score += 1;

  if (failedAttempts === 0) score += 2;
  else if (failedAttempts <= 2) score += 1;
  else if (failedAttempts >= 5) score -= 1;

  if (ageDays >= 30) score += 1;
  else if (ageDays >= 7) score += 0.5;

  if (score >= 4) return DEVICE_TRUST_LEVELS.MAXIMUM_TRUST;
  if (score >= 3) return DEVICE_TRUST_LEVELS.HIGH_TRUST;
  if (score >= 2) return DEVICE_TRUST_LEVELS.TRUSTED;
  if (score >= 1) return DEVICE_TRUST_LEVELS.STANDARD;
  if (score >= 0) return DEVICE_TRUST_LEVELS.BASIC;
  return DEVICE_TRUST_LEVELS.UNTRUSTED;
}
