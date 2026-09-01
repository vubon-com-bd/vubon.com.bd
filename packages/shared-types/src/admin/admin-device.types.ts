/**
 * Admin Device Types
 * Device detection and management definitions
 */

import { BaseEntity, ID, Timestamp, Nullable, JsonObject } from '../common/core-primitives.types';

/**
 * Device type
 * Based on DEVICE_TYPE from constants
 */
export type AdminDeviceType =
  | 'desktop'
  | 'laptop'
  | 'tablet'
  | 'mobile'
  | 'phone'
  | 'smart_tv'
  | 'console'
  | 'wearable'
  | 'iot'
  | 'server'
  | 'unknown';

/**
 * Device platform
 * Based on DEVICE_PLATFORM from constants
 */
export type AdminDevicePlatform =
  | 'windows'
  | 'macos'
  | 'linux'
  | 'ios'
  | 'android'
  | 'chrome_os'
  | 'firefox_os'
  | 'web_os'
  | 'tizen'
  | 'unix'
  | 'unknown';

/**
 * Device browser
 * Based on DEVICE_BROWSER from constants
 */
export type AdminDeviceBrowser =
  | 'chrome'
  | 'firefox'
  | 'safari'
  | 'edge'
  | 'opera'
  | 'brave'
  | 'vivaldi'
  | 'arc'
  | 'samsung'
  | 'uc'
  | 'qq'
  | 'unknown';

/**
 * Device trust level
 * Based on DEVICE_TRUST from constants
 */
export type AdminDeviceTrust = 'trusted' | 'untrusted' | 'suspicious' | 'blocked' | 'pending';

/**
 * Device status
 * Based on DEVICE_STATUS from constants
 */
export type AdminDeviceStatus =
  'active' | 'inactive' | 'suspended' | 'blocked' | 'revoked' | 'expired';

/**
 * Admin device interface
 * Represents a device associated with an admin
 */
export interface AdminDevice extends BaseEntity {
  /** Device ID */
  id: ID;
  /** Admin ID who owns the device */
  adminId: ID;
  /** Device type */
  type: AdminDeviceType;
  /** Device platform */
  platform: AdminDevicePlatform;
  /** Device browser */
  browser: AdminDeviceBrowser;
  /** Device trust level */
  trust: AdminDeviceTrust;
  /** Device status */
  status: AdminDeviceStatus;
  /** Device name (user-defined) */
  name?: Nullable<string>;
  /** Device model */
  model?: Nullable<string>;
  /** Device manufacturer */
  manufacturer?: Nullable<string>;
  /** Device operating system version */
  osVersion?: Nullable<string>;
  /** Browser version */
  browserVersion?: Nullable<string>;
  /** Device IP address */
  ipAddress: string;
  /** User agent string */
  userAgent: string;
  /** Device fingerprint (unique identifier) */
  fingerprint: string;
  /** Device token for push notifications */
  token?: Nullable<string>;
  /** Last activity timestamp */
  lastActivityAt: Timestamp;
  /** Trust granted timestamp */
  trustedAt?: Nullable<Timestamp>;
  /** Trust expiry timestamp */
  trustExpiry?: Nullable<Timestamp>;
  /** Additional metadata */
  metadata?: Nullable<JsonObject>;
  /** Whether device is verified */
  isVerified: boolean;
  /** Verification timestamp */
  verifiedAt?: Nullable<Timestamp>;
  /** Whether device is active */
  isActive: boolean;
  /** Deactivation reason */
  deactivationReason?: Nullable<string>;
}

/**
 * Device create data
 */
export interface AdminDeviceCreateData {
  /** Admin ID */
  adminId: ID;
  /** Device type */
  type: AdminDeviceType;
  /** Device platform */
  platform: AdminDevicePlatform;
  /** Device browser */
  browser: AdminDeviceBrowser;
  /** Device name */
  name?: string;
  /** Device model */
  model?: string;
  /** Device manufacturer */
  manufacturer?: string;
  /** OS version */
  osVersion?: string;
  /** Browser version */
  browserVersion?: string;
  /** IP address */
  ipAddress: string;
  /** User agent */
  userAgent: string;
  /** Device fingerprint */
  fingerprint: string;
  /** Device token */
  token?: string;
  /** Metadata */
  metadata?: JsonObject;
}

/**
 * Device update data
 */
export interface AdminDeviceUpdateData {
  /** Device name */
  name?: string;
  /** Device trust level */
  trust?: AdminDeviceTrust;
  /** Device status */
  status?: AdminDeviceStatus;
  /** IP address */
  ipAddress?: string;
  /** Device token */
  token?: string;
  /** Last activity timestamp */
  lastActivityAt?: Timestamp;
  /** Whether device is verified */
  isVerified?: boolean;
  /** Whether device is active */
  isActive?: boolean;
  /** Deactivation reason */
  deactivationReason?: string;
  /** Metadata */
  metadata?: JsonObject;
}

/**
 * Device filter parameters
 */
export interface AdminDeviceFilterParams {
  /** Filter by admin ID */
  adminId?: ID;
  /** Filter by device type */
  type?: AdminDeviceType | AdminDeviceType[];
  /** Filter by platform */
  platform?: AdminDevicePlatform | AdminDevicePlatform[];
  /** Filter by trust level */
  trust?: AdminDeviceTrust | AdminDeviceTrust[];
  /** Filter by status */
  status?: AdminDeviceStatus | AdminDeviceStatus[];
  /** Filter by active status */
  isActive?: boolean;
  /** Filter by verified status */
  isVerified?: boolean;
  /** Search term (name, model, manufacturer) */
  search?: string;
  /** Filter by IP address */
  ipAddress?: string;
  /** Filter by fingerprint */
  fingerprint?: string;
  /** Date range filter */
  dateRange?: {
    start?: Date;
    end?: Date;
  };
}

/**
 * Device statistics
 */
export interface AdminDeviceStatistics {
  /** Total number of devices */
  totalDevices: number;
  /** Count by type */
  typeCounts: Record<AdminDeviceType, number>;
  /** Count by platform */
  platformCounts: Record<AdminDevicePlatform, number>;
  /** Count by trust level */
  trustCounts: Record<AdminDeviceTrust, number>;
  /** Count by status */
  statusCounts: Record<AdminDeviceStatus, number>;
  /** Active devices count */
  activeCount: number;
  /** Trusted devices count */
  trustedCount: number;
  /** Blocked devices count */
  blockedCount: number;
  /** Verified devices count */
  verifiedCount: number;
  /** Average devices per admin */
  averageDevicesPerAdmin: number;
  /** Most common device type */
  mostCommonType?: AdminDeviceType;
}

/**
 * Device validation result
 */
export interface AdminDeviceValidationResult {
  /** Whether device is valid */
  isValid: boolean;
  /** Whether device is trusted */
  isTrusted: boolean;
  /** Whether device is active */
  isActive: boolean;
  /** Device if valid */
  device?: AdminDevice;
  /** Error message if invalid */
  errorMessage?: string;
}

/**
 * Get device type label
 */
export function getAdminDeviceTypeLabel(type: AdminDeviceType): string {
  const labels: Record<AdminDeviceType, string> = {
    desktop: 'Desktop Computer',
    laptop: 'Laptop',
    tablet: 'Tablet',
    mobile: 'Mobile Phone',
    phone: 'Phone',
    smart_tv: 'Smart TV',
    console: 'Game Console',
    wearable: 'Wearable Device',
    iot: 'IoT Device',
    server: 'Server',
    unknown: 'Unknown Device',
  };
  return labels[type] || type;
}

/**
 * Get device platform label
 */
export function getAdminDevicePlatformLabel(platform: AdminDevicePlatform): string {
  const labels: Record<AdminDevicePlatform, string> = {
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
    ios: 'iOS',
    android: 'Android',
    chrome_os: 'Chrome OS',
    firefox_os: 'Firefox OS',
    web_os: 'Web OS',
    tizen: 'Tizen',
    unix: 'Unix',
    unknown: 'Unknown Platform',
  };
  return labels[platform] || platform;
}

/**
 * Get device browser label
 */
export function getAdminDeviceBrowserLabel(browser: AdminDeviceBrowser): string {
  const labels: Record<AdminDeviceBrowser, string> = {
    chrome: 'Google Chrome',
    firefox: 'Mozilla Firefox',
    safari: 'Apple Safari',
    edge: 'Microsoft Edge',
    opera: 'Opera',
    brave: 'Brave',
    vivaldi: 'Vivaldi',
    arc: 'Arc',
    samsung: 'Samsung Internet',
    uc: 'UC Browser',
    qq: 'QQ Browser',
    unknown: 'Unknown Browser',
  };
  return labels[browser] || browser;
}

/**
 * Get device trust label
 */
export function getAdminDeviceTrustLabel(trust: AdminDeviceTrust): string {
  const labels: Record<AdminDeviceTrust, string> = {
    trusted: 'Trusted Device',
    untrusted: 'Untrusted Device',
    suspicious: 'Suspicious Device',
    blocked: 'Blocked Device',
    pending: 'Pending Trust',
  };
  return labels[trust] || trust;
}

/**
 * Get device status color
 */
export function getAdminDeviceStatusColor(status: AdminDeviceStatus): string {
  const colors: Record<AdminDeviceStatus, string> = {
    active: 'success',
    inactive: 'default',
    suspended: 'warning',
    blocked: 'error',
    revoked: 'error',
    expired: 'default',
  };
  return colors[status] || 'default';
}

/**
 * Check if device is trusted
 */
export function isAdminDeviceTrusted(trust: AdminDeviceTrust): boolean {
  return trust === 'trusted';
}

/**
 * Check if device is active
 */
export function isAdminDeviceActive(status: AdminDeviceStatus): boolean {
  return status === 'active';
}

/**
 * Check if device is valid for use
 */
export function isAdminDeviceValid(device: AdminDevice): boolean {
  return (
    isAdminDeviceActive(device.status) &&
    device.isActive &&
    (!device.trustExpiry || new Date() < device.trustExpiry)
  );
}

/**
 * Device detection result from user agent
 */
export interface AdminDeviceDetectionResult {
  type: AdminDeviceType;
  platform: AdminDevicePlatform;
  browser: AdminDeviceBrowser;
}

/**
 * Detect device information from user agent
 */
export function detectAdminDeviceFromUserAgent(userAgent: string): AdminDeviceDetectionResult {
  // Detect device type
  let type: AdminDeviceType = 'unknown';
  const tabletPattern = /iPad|Android(?!.*Mobile)|Tablet/i;
  const mobilePattern = /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i;
  const desktopPattern = /Windows|Macintosh|Linux/i;

  if (tabletPattern.test(userAgent)) {
    type = 'tablet';
  } else if (mobilePattern.test(userAgent)) {
    type = 'mobile';
  } else if (desktopPattern.test(userAgent)) {
    type = 'desktop';
  }

  // Detect browser
  let browser: AdminDeviceBrowser = 'unknown';
  const edgePattern = /Edg/i;
  const chromePattern = /Chrome/i;
  const firefoxPattern = /Firefox/i;
  const safariPattern = /Safari/i;
  const operaPattern = /Opera|OPR/i;

  if (chromePattern.test(userAgent) && !edgePattern.test(userAgent)) {
    browser = 'chrome';
  } else if (firefoxPattern.test(userAgent)) {
    browser = 'firefox';
  } else if (safariPattern.test(userAgent)) {
    browser = 'safari';
  } else if (edgePattern.test(userAgent)) {
    browser = 'edge';
  } else if (operaPattern.test(userAgent)) {
    browser = 'opera';
  }

  // Detect platform
  let platform: AdminDevicePlatform = 'unknown';
  if (/Windows/i.test(userAgent)) {
    platform = 'windows';
  } else if (/Macintosh|Mac OS X/i.test(userAgent)) {
    platform = 'macos';
  } else if (/Linux/i.test(userAgent) && !/Android/i.test(userAgent)) {
    platform = 'linux';
  } else if (/Android/i.test(userAgent)) {
    platform = 'android';
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    platform = 'ios';
  }

  return { type, platform, browser };
}

/**
 * Create device from user agent (returns only the data needed for creation)
 */
export function createAdminDeviceFromUserAgent(
  adminId: ID,
  userAgent: string,
  ipAddress: string,
  fingerprint: string
): Omit<AdminDeviceCreateData, 'type' | 'platform' | 'browser'> {
  // Detection is used internally to populate the data
  // but we only return the fields that are requested
  return {
    adminId,
    ipAddress,
    userAgent,
    fingerprint,
  };
}

/**
 * Create device from user agent with full data
 */
export function createFullAdminDeviceFromUserAgent(
  adminId: ID,
  userAgent: string,
  ipAddress: string,
  fingerprint: string
): AdminDeviceCreateData {
  const detection = detectAdminDeviceFromUserAgent(userAgent);

  return {
    adminId,
    type: detection.type,
    platform: detection.platform,
    browser: detection.browser,
    ipAddress,
    userAgent,
    fingerprint,
  };
}

/**
 * Create device statistics from array
 */
export function createAdminDeviceStatistics(devices: AdminDevice[]): AdminDeviceStatistics {
  const stats: AdminDeviceStatistics = {
    totalDevices: devices.length,
    typeCounts: {
      desktop: 0,
      laptop: 0,
      tablet: 0,
      mobile: 0,
      phone: 0,
      smart_tv: 0,
      console: 0,
      wearable: 0,
      iot: 0,
      server: 0,
      unknown: 0,
    },
    platformCounts: {
      windows: 0,
      macos: 0,
      linux: 0,
      ios: 0,
      android: 0,
      chrome_os: 0,
      firefox_os: 0,
      web_os: 0,
      tizen: 0,
      unix: 0,
      unknown: 0,
    },
    trustCounts: {
      trusted: 0,
      untrusted: 0,
      suspicious: 0,
      blocked: 0,
      pending: 0,
    },
    statusCounts: {
      active: 0,
      inactive: 0,
      suspended: 0,
      blocked: 0,
      revoked: 0,
      expired: 0,
    },
    activeCount: 0,
    trustedCount: 0,
    blockedCount: 0,
    verifiedCount: 0,
    averageDevicesPerAdmin: 0,
    mostCommonType: undefined,
  };

  const adminDeviceCounts: Record<ID, number> = {};
  let typeMaxCount = 0;

  devices.forEach((device) => {
    stats.typeCounts[device.type] = (stats.typeCounts[device.type] || 0) + 1;
    stats.platformCounts[device.platform] = (stats.platformCounts[device.platform] || 0) + 1;
    stats.trustCounts[device.trust] = (stats.trustCounts[device.trust] || 0) + 1;
    stats.statusCounts[device.status] = (stats.statusCounts[device.status] || 0) + 1;

    if (isAdminDeviceActive(device.status)) stats.activeCount++;
    if (isAdminDeviceTrusted(device.trust)) stats.trustedCount++;
    if (device.trust === 'blocked') stats.blockedCount++;
    if (device.isVerified) stats.verifiedCount++;

    adminDeviceCounts[device.adminId] = (adminDeviceCounts[device.adminId] || 0) + 1;

    // Find most common type
    const typeCount = stats.typeCounts[device.type] || 0;
    if (typeCount > typeMaxCount) {
      typeMaxCount = typeCount;
      stats.mostCommonType = device.type;
    }
  });

  // Calculate average devices per admin
  const adminCount = Object.keys(adminDeviceCounts).length;
  stats.averageDevicesPerAdmin = adminCount > 0 ? stats.totalDevices / adminCount : 0;

  return stats;
}
