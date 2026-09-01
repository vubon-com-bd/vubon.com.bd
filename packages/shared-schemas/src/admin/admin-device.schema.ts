/**
 * Admin Device Schema
 * Zod schemas for admin device management definitions
 */

import { z } from 'zod';
import {
  idSchema,
  timestampSchema,
  jsonObjectSchema,
  nullable,
  stringWithLength,
} from '../common/core-primitives.schema';

/**
 * Admin device type enum schema (from constants)
 */
export const adminDeviceTypeSchema = z.enum([
  'desktop',
  'laptop',
  'tablet',
  'mobile',
  'phone',
  'smart_tv',
  'console',
  'wearable',
  'iot',
  'server',
  'unknown',
]);

/**
 * Admin device platform enum schema (from constants)
 */
export const adminDevicePlatformSchema = z.enum([
  'windows',
  'macos',
  'linux',
  'ios',
  'android',
  'chrome_os',
  'firefox_os',
  'web_os',
  'tizen',
  'unix',
  'unknown',
]);

/**
 * Admin device browser enum schema (from constants)
 */
export const adminDeviceBrowserSchema = z.enum([
  'chrome',
  'firefox',
  'safari',
  'edge',
  'opera',
  'brave',
  'vivaldi',
  'arc',
  'samsung',
  'uc',
  'qq',
  'unknown',
]);

/**
 * Admin device trust level enum schema (from constants)
 */
export const adminDeviceTrustSchema = z.enum([
  'trusted',
  'untrusted',
  'suspicious',
  'blocked',
  'pending',
]);

/**
 * Admin device status enum schema (from constants)
 */
export const adminDeviceStatusSchema = z.enum([
  'active',
  'inactive',
  'suspended',
  'blocked',
  'revoked',
  'expired',
]);

/**
 * Admin device schema
 */
export const adminDeviceSchema = z.object({
  id: idSchema,
  adminId: idSchema,
  type: adminDeviceTypeSchema,
  platform: adminDevicePlatformSchema,
  browser: adminDeviceBrowserSchema,
  trust: adminDeviceTrustSchema,
  status: adminDeviceStatusSchema,
  name: nullable(stringWithLength(1, 100)),
  model: nullable(stringWithLength(1, 100)),
  manufacturer: nullable(stringWithLength(1, 100)),
  osVersion: nullable(stringWithLength(1, 50)),
  browserVersion: nullable(stringWithLength(1, 50)),
  ipAddress: z.string(),
  userAgent: z.string(),
  fingerprint: z.string(),
  token: nullable(z.string()),
  lastActivityAt: timestampSchema,
  trustedAt: nullable(timestampSchema),
  trustExpiry: nullable(timestampSchema),
  metadata: nullable(jsonObjectSchema),
  isVerified: z.boolean().default(false),
  verifiedAt: nullable(timestampSchema),
  isActive: z.boolean().default(true),
  deactivationReason: nullable(z.string()),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  deletedAt: nullable(timestampSchema).default(null),
});

/**
 * Admin device create data schema
 */
export const adminDeviceCreateDataSchema = z.object({
  adminId: idSchema,
  type: adminDeviceTypeSchema,
  platform: adminDevicePlatformSchema,
  browser: adminDeviceBrowserSchema,
  name: stringWithLength(1, 100).optional(),
  model: stringWithLength(1, 100).optional(),
  manufacturer: stringWithLength(1, 100).optional(),
  osVersion: stringWithLength(1, 50).optional(),
  browserVersion: stringWithLength(1, 50).optional(),
  ipAddress: z.string(),
  userAgent: z.string(),
  fingerprint: z.string(),
  token: z.string().optional(),
  metadata: jsonObjectSchema.optional(),
});

/**
 * Admin device update data schema
 */
export const adminDeviceUpdateDataSchema = z.object({
  name: stringWithLength(1, 100).optional(),
  trust: adminDeviceTrustSchema.optional(),
  status: adminDeviceStatusSchema.optional(),
  ipAddress: z.string().optional(),
  token: z.string().optional(),
  lastActivityAt: timestampSchema.optional(),
  isVerified: z.boolean().optional(),
  isActive: z.boolean().optional(),
  deactivationReason: z.string().optional(),
  metadata: jsonObjectSchema.optional(),
});

/**
 * Admin device filter parameters schema
 */
export const adminDeviceFilterParamsSchema = z.object({
  adminId: idSchema.optional(),
  type: z.union([adminDeviceTypeSchema, z.array(adminDeviceTypeSchema)]).optional(),
  platform: z.union([adminDevicePlatformSchema, z.array(adminDevicePlatformSchema)]).optional(),
  trust: z.union([adminDeviceTrustSchema, z.array(adminDeviceTrustSchema)]).optional(),
  status: z.union([adminDeviceStatusSchema, z.array(adminDeviceStatusSchema)]).optional(),
  isActive: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  search: z.string().optional(),
  ipAddress: z.string().optional(),
  fingerprint: z.string().optional(),
  dateRange: z
    .object({
      start: timestampSchema.optional(),
      end: timestampSchema.optional(),
    })
    .optional(),
});

/**
 * Admin device statistics schema
 */
export const adminDeviceStatisticsSchema = z.object({
  totalDevices: z.number().int().min(0),
  typeCounts: z.record(z.string(), z.number().int().min(0)),
  platformCounts: z.record(z.string(), z.number().int().min(0)),
  trustCounts: z.record(z.string(), z.number().int().min(0)),
  statusCounts: z.record(z.string(), z.number().int().min(0)),
  activeCount: z.number().int().min(0),
  trustedCount: z.number().int().min(0),
  blockedCount: z.number().int().min(0),
  verifiedCount: z.number().int().min(0),
  averageDevicesPerAdmin: z.number().min(0),
  mostCommonType: z.string().optional(),
});

/**
 * Admin device validation result schema
 */
export const adminDeviceValidationResultSchema = z.object({
  isValid: z.boolean(),
  isTrusted: z.boolean(),
  isActive: z.boolean(),
  device: adminDeviceSchema.optional(),
  errorMessage: z.string().optional(),
});

/**
 * Admin device detection result schema
 */
export const adminDeviceDetectionResultSchema = z.object({
  type: adminDeviceTypeSchema,
  platform: adminDevicePlatformSchema,
  browser: adminDeviceBrowserSchema,
});

/**
 * Type inference from schemas
 */
export type AdminDeviceTypeSchema = z.infer<typeof adminDeviceTypeSchema>;
export type AdminDevicePlatformSchema = z.infer<typeof adminDevicePlatformSchema>;
export type AdminDeviceBrowserSchema = z.infer<typeof adminDeviceBrowserSchema>;
export type AdminDeviceTrustSchema = z.infer<typeof adminDeviceTrustSchema>;
export type AdminDeviceStatusSchema = z.infer<typeof adminDeviceStatusSchema>;
export type AdminDeviceSchema = z.infer<typeof adminDeviceSchema>;
export type AdminDeviceCreateDataSchema = z.infer<typeof adminDeviceCreateDataSchema>;
export type AdminDeviceUpdateDataSchema = z.infer<typeof adminDeviceUpdateDataSchema>;
export type AdminDeviceFilterParamsSchema = z.infer<typeof adminDeviceFilterParamsSchema>;
export type AdminDeviceStatisticsSchema = z.infer<typeof adminDeviceStatisticsSchema>;
export type AdminDeviceValidationResultSchema = z.infer<typeof adminDeviceValidationResultSchema>;
export type AdminDeviceDetectionResultSchema = z.infer<typeof adminDeviceDetectionResultSchema>;

/**
 * Helper function to get device type label
 */
export function getAdminDeviceTypeLabelFromType(type: AdminDeviceTypeSchema): string {
  const labelMap: Record<AdminDeviceTypeSchema, string> = {
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
  return labelMap[type] || type;
}

/**
 * Helper function to get device platform label
 */
export function getAdminDevicePlatformLabelFromPlatform(
  platform: AdminDevicePlatformSchema
): string {
  const labelMap: Record<AdminDevicePlatformSchema, string> = {
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
  return labelMap[platform] || platform;
}

/**
 * Helper function to get device browser label
 */
export function getAdminDeviceBrowserLabelFromBrowser(browser: AdminDeviceBrowserSchema): string {
  const labelMap: Record<AdminDeviceBrowserSchema, string> = {
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
  return labelMap[browser] || browser;
}

/**
 * Helper function to get device trust label
 */
export function getAdminDeviceTrustLabelFromTrust(trust: AdminDeviceTrustSchema): string {
  const labelMap: Record<AdminDeviceTrustSchema, string> = {
    trusted: 'Trusted Device',
    untrusted: 'Untrusted Device',
    suspicious: 'Suspicious Device',
    blocked: 'Blocked Device',
    pending: 'Pending Trust',
  };
  return labelMap[trust] || trust;
}

/**
 * Helper function to get device status color
 */
export function getAdminDeviceStatusColorFromStatus(status: AdminDeviceStatusSchema): string {
  const colorMap: Record<AdminDeviceStatusSchema, string> = {
    active: 'success',
    inactive: 'default',
    suspended: 'warning',
    blocked: 'error',
    revoked: 'error',
    expired: 'default',
  };
  return colorMap[status] || 'default';
}

/**
 * Helper function to check if device is trusted
 */
export function isAdminDeviceTrustedFromTrust(trust: AdminDeviceTrustSchema): boolean {
  return trust === 'trusted';
}

/**
 * Helper function to check if device is active
 */
export function isAdminDeviceActiveFromStatus(status: AdminDeviceStatusSchema): boolean {
  return status === 'active';
}

/**
 * Helper function to check if device is valid for use
 */
export function isAdminDeviceValid(device: AdminDeviceSchema): boolean {
  return (
    isAdminDeviceActiveFromStatus(device.status as AdminDeviceStatusSchema) &&
    device.isActive &&
    (!device.trustExpiry || new Date() < device.trustExpiry)
  );
}

/**
 * Helper function to detect device information from user agent
 */
export function detectAdminDeviceFromUserAgent(
  userAgent: string
): AdminDeviceDetectionResultSchema {
  // Detect device type
  let type: AdminDeviceTypeSchema = 'unknown';
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
  let browser: AdminDeviceBrowserSchema = 'unknown';
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
  let platform: AdminDevicePlatformSchema = 'unknown';
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
 * Helper function to create device from user agent with full data
 */
export function createFullAdminDeviceFromUserAgent(
  adminId: string,
  userAgent: string,
  ipAddress: string,
  fingerprint: string
): AdminDeviceCreateDataSchema {
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
 * Helper function to create device statistics from array
 */
export function createAdminDeviceStatisticsFromArray(
  devices: AdminDeviceSchema[]
): AdminDeviceStatisticsSchema {
  const stats: AdminDeviceStatisticsSchema = {
    totalDevices: devices.length,
    typeCounts: {},
    platformCounts: {},
    trustCounts: {},
    statusCounts: {},
    activeCount: 0,
    trustedCount: 0,
    blockedCount: 0,
    verifiedCount: 0,
    averageDevicesPerAdmin: 0,
    mostCommonType: undefined,
  };

  const adminDeviceCounts: Record<string, number> = {};
  let typeMaxCount = 0;

  devices.forEach((device) => {
    const type = device.type as AdminDeviceTypeSchema;
    const platform = device.platform as AdminDevicePlatformSchema;
    const trust = device.trust as AdminDeviceTrustSchema;
    const status = device.status as AdminDeviceStatusSchema;

    stats.typeCounts[type] = (stats.typeCounts[type] || 0) + 1;
    stats.platformCounts[platform] = (stats.platformCounts[platform] || 0) + 1;
    stats.trustCounts[trust] = (stats.trustCounts[trust] || 0) + 1;
    stats.statusCounts[status] = (stats.statusCounts[status] || 0) + 1;

    if (isAdminDeviceActiveFromStatus(status)) stats.activeCount++;
    if (isAdminDeviceTrustedFromTrust(trust)) stats.trustedCount++;
    if (trust === 'blocked') stats.blockedCount++;
    if (device.isVerified) stats.verifiedCount++;

    adminDeviceCounts[device.adminId] = (adminDeviceCounts[device.adminId] || 0) + 1;

    const typeCount = stats.typeCounts[type] || 0;
    if (typeCount > typeMaxCount) {
      typeMaxCount = typeCount;
      stats.mostCommonType = type;
    }
  });

  const adminCount = Object.keys(adminDeviceCounts).length;
  stats.averageDevicesPerAdmin = adminCount > 0 ? stats.totalDevices / adminCount : 0;

  return stats;
}

/**
 * Export schemas as an object for convenient access
 */
export const adminDeviceSchemas = {
  device: adminDeviceSchema,
  type: adminDeviceTypeSchema,
  platform: adminDevicePlatformSchema,
  browser: adminDeviceBrowserSchema,
  trust: adminDeviceTrustSchema,
  status: adminDeviceStatusSchema,
  createData: adminDeviceCreateDataSchema,
  updateData: adminDeviceUpdateDataSchema,
  filter: adminDeviceFilterParamsSchema,
  statistics: adminDeviceStatisticsSchema,
  validationResult: adminDeviceValidationResultSchema,
  detectionResult: adminDeviceDetectionResultSchema,
  getTypeLabel: getAdminDeviceTypeLabelFromType,
  getPlatformLabel: getAdminDevicePlatformLabelFromPlatform,
  getBrowserLabel: getAdminDeviceBrowserLabelFromBrowser,
  getTrustLabel: getAdminDeviceTrustLabelFromTrust,
  getStatusColor: getAdminDeviceStatusColorFromStatus,
  isTrusted: isAdminDeviceTrustedFromTrust,
  isActive: isAdminDeviceActiveFromStatus,
  isValid: isAdminDeviceValid,
  detectFromUserAgent: detectAdminDeviceFromUserAgent,
  createFullFromUserAgent: createFullAdminDeviceFromUserAgent,
  createStatistics: createAdminDeviceStatisticsFromArray,
};

export default adminDeviceSchemas;
