/**
 * Device Types - Pure TypeScript type contracts for Device Management
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-types/auth/device.types
 *
 * RULES:
 * ✅ ONLY type declarations, interfaces, unions
 * ✅ NO fingerprint generation, device detection logic
 * ✅ NO functions, classes, enums
 * ✅ NO validation schemas (Zod)
 * ✅ NO framework imports
 */

import type {
  DEVICE_TYPES,
  OS_TYPES,
  BROWSER_TYPES,
  DEVICE_RISK_LEVEL,
  FINGERPRINT_COMPONENTS,
  DEVICE_RISK_INDICATORS,
} from '@vubon/shared-constants';

// ============================================================
// Device Type Unions (Based on constants - NO enums)
// ============================================================
export type BaseDeviceType = keyof typeof DEVICE_TYPES;
export type DeviceType = typeof DEVICE_TYPES[keyof typeof DEVICE_TYPES];

// Extended device types for Bangladesh market
export type ExtendedDeviceType = 
  | DeviceType
  | 'feature_phone'
  | 'tablet_phone'
  | 'kiosk'
  | 'pos_device';

// ============================================================
// Operating System Types
// ============================================================
export type BaseOSType = keyof typeof OS_TYPES;
export type OSType = typeof OS_TYPES[keyof typeof OS_TYPES];

// Extended OS types for Bangladesh
export type ExtendedOSType = 
  | OSType
  | 'symphony_os'
  | 'walton_os';

// ============================================================
// Browser Types
// ============================================================
export type BaseBrowserType = keyof typeof BROWSER_TYPES;
export type BrowserType = typeof BROWSER_TYPES[keyof typeof BROWSER_TYPES];

// Extended browser types for Bangladesh
export type ExtendedBrowserType = 
  | BrowserType
  | 'uc_browser'
  | 'opera_mini'
  | 'bd_browser';

// ============================================================
// Network Types (Bangladesh specific)
// ============================================================
export type NetworkType = 
  | '2g'
  | '3g'
  | '4g'
  | '5g'
  | 'wifi_home'
  | 'wifi_public'
  | 'ethernet'
  | 'vpn'
  | 'proxy'
  | 'tor'
  | 'unknown';

// Mobile operator types (Bangladesh)
export type MobileOperator = 
  | 'gp'
  | 'robi'
  | 'banglalink'
  | 'teletalk'
  | 'unknown';

// ============================================================
// Device Trust Level (Based on constants)
// ============================================================
export type DeviceTrustLevel = typeof DEVICE_RISK_LEVEL[keyof typeof DEVICE_RISK_LEVEL];

// Extended trust levels
export type ExtendedTrustLevel = 
  | DeviceTrustLevel
  | 'maximum_trust'
  | 'family_trusted';

// ============================================================
// Device Information (Complete device metadata)
// ============================================================
export interface DeviceInfo {
  readonly deviceId: string;
  readonly deviceType: ExtendedDeviceType;
  readonly os: ExtendedOSType;
  readonly osVersion?: string;
  readonly browser: ExtendedBrowserType;
  readonly browserVersion?: string;
  readonly isMobile: boolean;
  readonly isTouchDevice: boolean;
  readonly screenResolution?: string;
  readonly screenWidth?: number;
  readonly screenHeight?: number;
  readonly colorDepth?: number;
  readonly language: string;
  readonly timezone: string;
  readonly timezoneOffset: number;

  // Bangladesh specific
  readonly networkType?: NetworkType;
  readonly mobileOperator?: MobileOperator;
  readonly dataSaverEnabled?: boolean;
  readonly district?: string;
  readonly upazila?: string;
}

// ============================================================
// Device Fingerprint (Hashed, not raw data)
// ============================================================
export type FingerprintComponentValue = Extract<keyof typeof FINGERPRINT_COMPONENTS, string>;

export interface DeviceFingerprint {
  readonly hash: string;
  readonly components: readonly FingerprintComponentValue[];
  readonly componentVersions: Record<FingerprintComponentValue, string>;
  readonly generatedAt: Date;
  readonly version: number;
}

export interface FingerprintData {
  readonly component: FingerprintComponentValue;
  readonly value: string | number | boolean;
}

// ============================================================
// Trusted Device Entity (Core domain model)
// ============================================================
export interface TrustedDevice {
  readonly id: string;
  readonly userId: string;
  readonly deviceId: string;
  readonly deviceInfo: DeviceInfo;
  readonly fingerprint: DeviceFingerprint;
  readonly trustLevel: ExtendedTrustLevel;
  readonly trustScore: number;
  readonly trustedAt: Date;
  readonly lastUsedAt: Date;
  readonly expiresAt: Date | null;
  readonly name: string | null;
  readonly isFamilyShared: boolean;
  readonly familyMemberId?: string;
}

// ============================================================
// Register Device Request (API DTO)
// ============================================================
export interface RegisterDeviceRequest {
  readonly userId: string;
  readonly deviceInfo: DeviceInfo;
  readonly fingerprint: DeviceFingerprint;
  readonly name?: string;
  readonly trustDevice: boolean;
  readonly trustDurationDays?: number;
  readonly isFamilyShared?: boolean;
  readonly familyMemberId?: string;
}

// ============================================================
// Device DTO for API Responses
// ============================================================
export interface DeviceDTO {
  readonly id: string;
  readonly deviceId: string;
  readonly deviceInfo: DeviceInfo;
  readonly trustLevel: ExtendedTrustLevel;
  readonly trustedAt: string;
  readonly lastUsedAt: string;
  readonly expiresAt: string | null;
  readonly name: string | null;
  readonly isCurrent: boolean;
  readonly isFamilyShared: boolean;
  readonly familyMemberName?: string;
}

// ============================================================
// Update Device Trust Request (API DTO)
// ============================================================
export interface UpdateDeviceTrustRequest {
  readonly deviceId: string;
  readonly userId: string;
  readonly trustLevel: ExtendedTrustLevel;
  readonly durationDays?: number;
  readonly reason?: string;
  readonly adminId?: string;
}

// ============================================================
// Remove Device Request (API DTO)
// ============================================================
export interface RemoveDeviceRequest {
  readonly deviceId: string;
  readonly userId: string;
  readonly reason?: string;
  readonly revokeTrustOnly?: boolean;
}

// ============================================================
// Device Activity Types
// ============================================================
export type DeviceActivityType = 
  | 'login'
  | 'logout'
  | 'token_refresh'
  | 'mfa_verified'
  | 'trust_granted'
  | 'trust_revoked'
  | 'trust_escalated'
  | 'trust_deescalated'
  | 'device_removed'
  | 'device_name_changed'
  | 'device_fingerprint_changed'
  | 'suspicious_activity_detected';

// Device Activity Log Entry
export interface DeviceActivity {
  readonly id: string;
  readonly deviceId: string;
  readonly userId: string;
  readonly activityType: DeviceActivityType;
  readonly timestamp: Date;
  readonly ipAddress: string;
  readonly userAgent?: string;
  readonly location?: LocationInfo;
  readonly metadata?: Record<string, unknown>;
}

// ============================================================
// Location Information (Based on IP)
// ============================================================
export interface LocationInfo {
  readonly country: string;
  readonly city: string;
  readonly district?: string;
  readonly upazila?: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly isp?: string;
}

// ============================================================
// Device Risk Assessment
// ============================================================
export interface DeviceRiskAssessment {
  readonly deviceId: string;
  readonly userId: string;
  readonly riskScore: number;
  readonly riskLevel: 'low' | 'medium' | 'high' | 'critical';
  readonly factors: readonly DeviceRiskFactor[];
  readonly requiresMfa: boolean;
  readonly requiresAdditionalVerification: boolean;
  readonly recommendedTrustLevel: ExtendedTrustLevel;
  readonly assessedAt: Date;
}

export interface DeviceRiskFactor {
  readonly factor: string;
  readonly score: number;
  readonly weight: number;
  readonly reason: string;
  readonly evidence?: string;
}

// ============================================================
// Device Risk Factors (Based on constants)
// ============================================================
export type RiskIndicator = typeof DEVICE_RISK_INDICATORS[keyof typeof DEVICE_RISK_INDICATORS];

// ============================================================
// Device Statistics (For admin dashboard)
// ============================================================
export interface DeviceStatistics {
  readonly totalDevices: number;
  readonly uniqueUsers: number;
  readonly trustedDevices: number;
  readonly untrustedDevices: number;
  readonly suspendedDevices: number;
  readonly familySharedDevices: number;
  readonly averageTrustScore: number;

  readonly devicesByType: ReadonlyArray<{
    readonly type: ExtendedDeviceType;
    readonly count: number;
    readonly percentage: number;
  }>;

  readonly devicesByOS: ReadonlyArray<{
    readonly os: ExtendedOSType;
    readonly count: number;
    readonly percentage: number;
  }>;

  readonly devicesByBrowser: ReadonlyArray<{
    readonly browser: ExtendedBrowserType;
    readonly count: number;
    readonly percentage: number;
  }>;

  readonly devicesByNetworkType: ReadonlyArray<{
    readonly network: NetworkType;
    readonly count: number;
  }>;

  readonly devicesByMobileOperator: ReadonlyArray<{
    readonly operator: MobileOperator;
    readonly count: number;
  }>;

  readonly devicesByDistrict: ReadonlyArray<{
    readonly district: string;
    readonly count: number;
  }>;

  readonly suspiciousDevices: number;
  readonly highRiskDevices: number;
}

// ============================================================
// Device Session Transfer (Bangladesh specific)
// ============================================================
export interface DeviceSessionTransfer {
  readonly transferId: string;
  readonly fromDeviceId: string;
  readonly toDeviceId: string;
  readonly userId: string;
  readonly transferMethod: 'qr_code' | 'magic_link' | 'otp';
  readonly status: 'pending' | 'completed' | 'expired' | 'rejected';
  readonly initiatedAt: Date;
  readonly completedAt?: Date;
  readonly expiresAt: Date;
  readonly qrCode?: string;
  readonly otpCode?: string;
  readonly magicLinkToken?: string;
}

// ============================================================
// Device Pairing (Family sharing)
// ============================================================
export interface DevicePairing {
  readonly id: string;
  readonly ownerUserId: string;
  readonly pairedDeviceId: string;
  readonly pairedUserId: string;
  readonly relationship: 'parent' | 'child' | 'spouse' | 'sibling' | 'other';
  readonly permissions: ReadonlyArray<PairedDevicePermission>;
  readonly pairedAt: Date;
  readonly expiresAt: Date | null;
  readonly status: 'active' | 'revoked' | 'expired';
}

export type PairedDevicePermission = 
  | 'view_orders'
  | 'track_orders'
  | 'add_to_cart'
  | 'wishlist'
  | 'view_addresses'
  | 'limited_payment'
  | 'full_payment';

// ============================================================
// Public/Shared Device Session (Cyber cafe, kiosk)
// ============================================================
export interface PublicDeviceSession {
  readonly sessionId: string;
  readonly deviceId: string;
  readonly userId: string;
  readonly startedAt: Date;
  readonly expiresAt: Date;
  readonly lastActivityAt: Date;
  readonly isActive: boolean;
  readonly restrictions: ReadonlyArray<PublicDeviceRestriction>;
}

export type PublicDeviceRestriction = 
  | 'no_card_payment'
  | 'no_bank_transfer'
  | 'mfs_only'
  | 'no_address_save'
  | 'auto_logout_on_close';

// ============================================================
// Device Verification Request (For new devices)
// ============================================================
export interface DeviceVerificationRequest {
  readonly deviceId: string;
  readonly userId: string;
  readonly deviceInfo: DeviceInfo;
  readonly fingerprint: DeviceFingerprint;
  readonly verificationMethod: 'email' | 'sms' | 'mfa' | 'admin';
  readonly verificationCode?: string;
  readonly status: 'pending' | 'verified' | 'rejected' | 'expired';
  readonly requestedAt: Date;
  readonly verifiedAt?: Date;
  readonly expiresAt: Date;
}

// ============================================================
// Device Webhook Events (For real-time updates)
// ============================================================
export type DeviceWebhookEventType = 
  | 'device.registered'
  | 'device.trust_changed'
  | 'device.removed'
  | 'device.suspicious_activity'
  | 'device.paired'
  | 'device.unpaired';

export interface DeviceWebhookPayload {
  readonly eventType: DeviceWebhookEventType;
  readonly userId: string;
  readonly deviceId: string;
  readonly timestamp: Date;
  readonly data: Record<string, unknown>;
}

// ============================================================
// Device Filter Options (For list APIs)
// ============================================================
export interface DeviceFilterOptions {
  readonly userId?: string;
  readonly trustLevel?: ExtendedTrustLevel;
  readonly deviceType?: ExtendedDeviceType;
  readonly isActive?: boolean;
  readonly isFamilyShared?: boolean;
  readonly fromDate?: Date;
  readonly toDate?: Date;
  readonly limit?: number;
  readonly offset?: number;
  readonly sortBy?: 'trustedAt' | 'lastUsedAt' | 'trustLevel';
  readonly sortOrder?: 'asc' | 'desc';
}

// ============================================================
// Device Trust Duration Type (Replacement for DEVICE_TRUST_DURATION)
// ============================================================
export type DeviceTrustDurationValue = 
  | 0
  | 86400
  | 259200
  | 604800
  | 1209600
  | 2592000
  | 7776000
  | 31536000
  | -1;

export interface DeviceTrustDuration {
  readonly NEVER: 0;
  readonly ONE_DAY: 86400;
  readonly THREE_DAYS: 259200;
  readonly SEVEN_DAYS: 604800;
  readonly FOURTEEN_DAYS: 1209600;
  readonly THIRTY_DAYS: 2592000;
  readonly NINETY_DAYS: 7776000;
  readonly ONE_YEAR: 31536000;
  readonly FOREVER: -1;
}

// ============================================================
// Device Type to Category Mapping
// ============================================================
export type DeviceCategory = 'high_trust' | 'medium_trust' | 'low_trust' | 'restricted';

export interface DeviceTypeToCategoryMap {
  readonly desktop: 'high_trust';
  readonly laptop: 'high_trust';
  readonly tablet: 'medium_trust';
  readonly mobile: 'medium_trust';
  readonly tablet_phone: 'medium_trust';
  readonly feature_phone: 'low_trust';
  readonly kiosk: 'low_trust';
  readonly pos_device: 'low_trust';
  readonly tv: 'restricted';
  readonly console: 'restricted';
  readonly wearable: 'restricted';
  readonly other: 'low_trust';
}

// ============================================================
// Browser Trust Levels
// ============================================================
export type BrowserTrustScore = 
  | 90  // Chrome, Firefox, Safari
  | 85  // Edge, Brave
  | 80  // Vivaldi, Samsung
  | 70  // Opera
  | 65  // Xiaomi, Huawei
  | 40  // UC Browser
  | 35  // Opera Mini
  | 30  // UC Mini, WebView
  | 25  // Chrome WebView
  | 20; // Unknown

export interface BrowserTrustLevels {
  readonly chrome: 90;
  readonly firefox: 90;
  readonly safari: 90;
  readonly edge: 85;
  readonly brave: 85;
  readonly vivaldi: 80;
  readonly samsung_browser: 80;
  readonly opera: 70;
  readonly xiaomi_browser: 65;
  readonly huawei_browser: 65;
  readonly uc_browser: 40;
  readonly opera_mini: 35;
  readonly uc_mini: 35;
  readonly bd_browser: 30;
  readonly webview: 25;
  readonly chrome_webview: 30;
  readonly other: 20;
}

// ============================================================
// Network Security Levels
// ============================================================
export type NetworkSecurityScore = 
  | 90  // wifi_secure, ethernet
  | 70  // wifi
  | 65  // 5g
  | 60  // 4g
  | 40  // 3g
  | 35  // wifi_public
  | 20  // 2g
  | 15  // mobile_unknown
  | 10  // vpn
  | 5   // proxy
  | 0   // tor
  | 25; // unknown

export interface NetworkSecurityLevels {
  readonly wifi_secure: 90;
  readonly ethernet: 90;
  readonly wifi: 70;
  readonly mobile_5g: 65;
  readonly mobile_4g: 60;
  readonly mobile_3g: 40;
  readonly wifi_public: 35;
  readonly mobile_2g: 20;
  readonly mobile_unknown: 15;
  readonly vpn: 10;
  readonly proxy: 5;
  readonly tor: 0;
  readonly unknown: 25;
}

// ============================================================
// Device Metrics (For monitoring)
// ============================================================
export interface DeviceMetrics {
  readonly enabled: true;
  readonly metrics: {
    readonly ACTIVE_DEVICES: 'vubon_devices_active';
    readonly NEW_DEVICES_7_DAYS: 'vubon_devices_new_7d';
    readonly UNKNOWN_DEVICES: 'vubon_devices_unknown';
    readonly HIGH_RISK_DEVICES: 'vubon_devices_high_risk';
    readonly BLOCKED_DEVICES: 'vubon_devices_blocked';
    readonly DEVICE_TYPE_DISTRIBUTION: 'vubon_devices_by_type';
    readonly BROWSER_DISTRIBUTION: 'vubon_devices_by_browser';
    readonly OS_DISTRIBUTION: 'vubon_devices_by_os';
    readonly NETWORK_TYPE_DISTRIBUTION: 'vubon_devices_by_network';
    readonly DEVICE_MULTI_ACCOUNT: 'vubon_devices_multi_account';
  };
  readonly alertThresholds: {
    readonly HIGH_RISK_DEVICE_PERCENTAGE: 10;
    readonly MULTI_ACCOUNT_DEVICE_COUNT: 10;
    readonly NEW_DEVICE_DAILY_SPIKE: 1000;
  };
}


// packages/shared-types/src/common/trust-level.types.ts

/**
 * Trust Level Types - Enterprise Grade
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/common/trust-level.types
 * 
 * @description
 * Trust level definitions for devices, sessions, and users.
 * Used for security scoring and risk assessment.
 * 
 * Enterprise Rules:
 * ✅ Pure TypeScript type declarations - NO runtime logic
 * ✅ Framework-agnostic
 * ✅ Reusable across all services
 * ✅ Single source of truth for trust levels
 */

// ============================================================
// Trust Level Types
// ============================================================

/**
 * Trust level for devices and sessions
 * Higher trust level = more privileged access
 */
export type TrustLevel = 
  | 'untrusted'      // No trust - full verification required
  | 'standard'       // Basic trust - standard verification
  | 'trusted'        // Medium trust - reduced verification
  | 'high_trust'     // High trust - minimal verification
  | 'maximum_trust'; // Maximum trust - no additional verification

/**
 * Trust score range (0-100)
 */
export type TrustScore = number;

/**
 * Trust level configuration
 */
export interface TrustLevelConfig {
  /** Trust level name */
  level: TrustLevel;
  
  /** Numeric trust score (0-100) */
  score: TrustScore;
  
  /** Whether MFA is required for this trust level */
  requiresMfa: boolean;
  
  /** Whether additional verification is required */
  requiresAdditionalVerification: boolean;
  
  /** Maximum session duration in seconds for this trust level */
  maxSessionDurationSeconds: number;
  
  /** Maximum idle timeout in seconds for this trust level */
  maxIdleTimeoutSeconds: number;
  
  /** Allowed actions for this trust level */
  allowedActions: readonly string[];
}

// ============================================================
// Trust Level Constants (Type-only)
// ============================================================

/**
 * Trust level scores
 */
export const TRUST_LEVEL_SCORES: Record<TrustLevel, TrustScore> = {
  untrusted: 0,
  standard: 25,
  trusted: 50,
  high_trust: 75,
  maximum_trust: 100,
} as const;

/**
 * Trust level requirements
 */
export const TRUST_LEVEL_REQUIREMENTS: Record<TrustLevel, TrustLevelConfig> = {
  untrusted: {
    level: 'untrusted',
    score: 0,
    requiresMfa: true,
    requiresAdditionalVerification: true,
    maxSessionDurationSeconds: 300,
    maxIdleTimeoutSeconds: 60,
    allowedActions: ['read_public', 'view_pages'],
  },
  standard: {
    level: 'standard',
    score: 25,
    requiresMfa: false,
    requiresAdditionalVerification: false,
    maxSessionDurationSeconds: 3600,
    maxIdleTimeoutSeconds: 600,
    allowedActions: ['read', 'view', 'profile'],
  },
  trusted: {
    level: 'trusted',
    score: 50,
    requiresMfa: false,
    requiresAdditionalVerification: false,
    maxSessionDurationSeconds: 7200,
    maxIdleTimeoutSeconds: 1200,
    allowedActions: ['read', 'write', 'profile', 'orders'],
  },
  high_trust: {
    level: 'high_trust',
    score: 75,
    requiresMfa: false,
    requiresAdditionalVerification: false,
    maxSessionDurationSeconds: 14400,
    maxIdleTimeoutSeconds: 1800,
    allowedActions: ['read', 'write', 'profile', 'orders', 'payments'],
  },
  maximum_trust: {
    level: 'maximum_trust',
    score: 100,
    requiresMfa: false,
    requiresAdditionalVerification: false,
    maxSessionDurationSeconds: 86400,
    maxIdleTimeoutSeconds: 3600,
    allowedActions: ['read', 'write', 'profile', 'orders', 'payments', 'admin'],
  },
} as const;

// ============================================================
// Utility Types
// ============================================================

/**
 * Check if a trust level is valid
 */
export function isValidTrustLevel(level: string): level is TrustLevel {
  return ['untrusted', 'standard', 'trusted', 'high_trust', 'maximum_trust'].includes(level);
}

/**
 * Get trust level score
 */
export function getTrustLevelScore(level: TrustLevel): TrustScore {
  return TRUST_LEVEL_SCORES[level];
}

/**
 * Get trust level config
 */
export function getTrustLevelConfig(level: TrustLevel): TrustLevelConfig {
  return TRUST_LEVEL_REQUIREMENTS[level];
}

/**
 * Check if a trust level meets a minimum requirement
 */
export function trustLevelMeetsMinimum(
  level: TrustLevel, 
  minimum: TrustLevel
): boolean {
  const levels: TrustLevel[] = ['untrusted', 'standard', 'trusted', 'high_trust', 'maximum_trust'];
  return levels.indexOf(level) >= levels.indexOf(minimum);
}



// packages/shared-types/src/common/revocation-scope.types.ts

/**
 * Revocation Scope Types - Enterprise Grade
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/common/revocation-scope.types
 * 
 * @description
 * Revocation scope definitions for tokens, sessions, and devices.
 * Used for bulk operations and security policies.
 * 
 * Enterprise Rules:
 * ✅ Pure TypeScript type declarations - NO runtime logic
 * ✅ Framework-agnostic
 * ✅ Reusable across all services
 * ✅ Single source of truth for revocation scopes
 */

// ============================================================
// Revocation Scope Types
// ============================================================

/**
 * Revocation scope for session/token revocation
 */
export type RevocationScope = 
  | 'single'   // Revoke a single session/token
  | 'all'      // Revoke all sessions/tokens
  | 'except'   // Revoke all except specified
  | 'device'   // Revoke all sessions/tokens for a device
  | 'bulk';    // Revoke multiple sessions/tokens

/**
 * Revocation scope with additional context
 */
export interface RevocationScopeContext {
  /** Type of revocation scope */
  scope: RevocationScope;
  
  /** Target ID (sessionId, tokenId, deviceId, etc.) */
  targetId?: string;
  
  /** List of IDs for bulk operations */
  targetIds?: readonly string[];
  
  /** IDs to exclude (for 'except' scope) */
  excludeIds?: readonly string[];
  
  /** Additional metadata for the revocation */
  metadata?: Record<string, unknown>;
}

// ============================================================
// Revocation Scope Constants (Type-only)
// ============================================================

/**
 * Valid revocation scope values
 */
export const REVOCATION_SCOPE_VALUES: readonly RevocationScope[] = [
  'single',
  'all',
  'except',
  'device',
  'bulk',
] as const;

// ============================================================
// Utility Types
// ============================================================

/**
 * Check if a string is a valid revocation scope
 */
export function isValidRevocationScope(value: string): value is RevocationScope {
  return REVOCATION_SCOPE_VALUES.includes(value as RevocationScope);
}

/**
 * Check if a revocation scope is a bulk operation
 */
export function isBulkScope(scope: RevocationScope): boolean {
  return scope === 'bulk' || scope === 'all' || scope === 'device';
}

/**
 * Check if a revocation scope requires confirmation
 */
export function requiresConfirmation(scope: RevocationScope): boolean {
  return scope === 'all' || scope === 'bulk' || scope === 'device';
}

/**
 * Get scope display name
 */
export function getRevocationScopeDisplayName(scope: RevocationScope): string {
  const names: Record<RevocationScope, string> = {
    single: 'Single Session',
    all: 'All Sessions',
    except: 'All Except',
    device: 'Device Sessions',
    bulk: 'Bulk Sessions',
  };
  return names[scope] || scope;
}
// ============================================================
// Type Exports
// ============================================================
export type DeviceInfoType = DeviceInfo;
export type DeviceFingerprintType = DeviceFingerprint;
export type TrustedDeviceType = TrustedDevice;
export type DeviceDTOType = DeviceDTO;
export type DeviceActivityTypeType = DeviceActivityType;
export type DeviceRiskAssessmentType = DeviceRiskAssessment;
export type DeviceStatisticsType = DeviceStatistics;
export type DevicePairingType = DevicePairing;
export type PublicDeviceSessionType = PublicDeviceSession;

