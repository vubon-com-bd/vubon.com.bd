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
