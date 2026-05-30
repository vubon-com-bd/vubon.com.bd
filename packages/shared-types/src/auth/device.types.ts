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
  DEVICE_TRUST_DURATION,
  FINGERPRINT_COMPONENTS,
  DEVICE_RISK_INDICATORS,
} from '@vubon/auth-constants';

// ============================================================
// Device Type Unions (Based on constants - NO enums)
// ============================================================
export type BaseDeviceType = keyof typeof DEVICE_TYPES;
export type DeviceType = typeof DEVICE_TYPES[keyof typeof DEVICE_TYPES];

// Extended device types for Bangladesh market
export type ExtendedDeviceType = 
  | DeviceType
  | 'feature_phone'      // Keypad phones still used in BD
  | 'tablet_phone'       // Hybrid devices
  | 'kiosk'              // Public e-commerce kiosks
  | 'pos_device';        // Payment terminals

// ============================================================
// Operating System Types
// ============================================================
export type BaseOSType = keyof typeof OS_TYPES;
export type OSType = typeof OS_TYPES[keyof typeof OS_TYPES];

// Extended OS types for Bangladesh
export type ExtendedOSType = 
  | OSType
  | 'symphony_os'        // Local BD brand
  | 'walton_os';         // Local BD brand

// ============================================================
// Browser Types
// ============================================================
export type BaseBrowserType = keyof typeof BROWSER_TYPES;
export type BrowserType = typeof BROWSER_TYPES[keyof typeof BROWSER_TYPES];

// Extended browser types for Bangladesh
export type ExtendedBrowserType = 
  | BrowserType
  | 'uc_browser'         // Popular in BD
  | 'opera_mini'         // Data saving
  | 'bd_browser';        // Local browsers

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
  | 'gp'          // Grameenphone
  | 'robi'        // Robi
  | 'banglalink'  // Banglalink
  | 'teletalk'    // Teletalk
  | 'unknown';

// ============================================================
// Device Trust Level (Based on constants)
// ============================================================
export type DeviceTrustLevel = typeof DEVICE_RISK_LEVEL[keyof typeof DEVICE_RISK_LEVEL];

// Extended trust levels
export type ExtendedTrustLevel = 
  | DeviceTrustLevel
  | 'maximum_trust'      // KYC verified devices
  | 'family_trusted';    // Shared family devices

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
  readonly district?: string;           // Detected from IP
  readonly upazila?: string;
}

// ============================================================
// Device Fingerprint (Hashed, not raw data)
// ============================================================
export type FingerprintComponent = typeof FINGERPRINT_COMPONENTS[keyof typeof FINGERPRINT_COMPONENTS];

export interface DeviceFingerprint {
  readonly hash: string;                 // SHA-256 hashed fingerprint
  readonly components: ReadonlyArray<FingerprintComponent>;
  readonly componentVersions: Record<FingerprintComponent, string>;
  readonly generatedAt: Date;
  readonly version: number;              // Fingerprint version (for updates)
}

export interface FingerprintData {
  readonly component: FingerprintComponent;
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
  readonly trustScore: number;            // 0-100
  readonly trustedAt: Date;
  readonly lastUsedAt: Date;
  readonly expiresAt: Date | null;
  readonly name: string | null;
  readonly isFamilyShared: boolean;          // Family sharing enabled
  readonly familyMemberId?: string;        // Which family member owns
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
  readonly trustDurationDays?: number;     // From DEVICE_TRUST_DURATION
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
  readonly trustedAt: string;              // ISO date string
  readonly lastUsedAt: string;             // ISO date string
  readonly expiresAt: string | null;       // ISO date string
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
  readonly userId: string;                 // For authorization
  readonly trustLevel: ExtendedTrustLevel;
  readonly durationDays?: number;          // How long to trust
  readonly reason?: string;
  readonly adminId?: string;               // If updated by admin
}

// ============================================================
// Remove Device Request (API DTO)
// ============================================================
export interface RemoveDeviceRequest {
  readonly deviceId: string;
  readonly userId: string;
  readonly reason?: string;
  readonly revokeTrustOnly?: boolean;      // Keep device but remove trust
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
  readonly district?: string;      // Bangladesh specific
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
  readonly riskScore: number;           // 0-100
  readonly riskLevel: 'low' | 'medium' | 'high' | 'critical';
  readonly factors: ReadonlyArray<DeviceRiskFactor>;
  readonly requiresMfa: boolean;
  readonly requiresAdditionalVerification: boolean;
  readonly recommendedTrustLevel: ExtendedTrustLevel;
  readonly assessedAt: Date;
}

export interface DeviceRiskFactor {
  readonly factor: string;
  readonly score: number;               // Contribution to total score (0-100)
  readonly weight: number;              // Importance (0-1)
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

  // Bangladesh specific
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
  readonly pairedUserId: string;           // Family member's user ID
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
  | 'limited_payment'      // Up to certain amount
  | 'full_payment';        // Requires owner approval

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
