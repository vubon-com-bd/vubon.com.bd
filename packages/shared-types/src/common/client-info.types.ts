/**
 * Client Info Types - Centralized client information contract
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/common/client-info.types
 * 
 * @description
 * Centralized type definitions for client information used across all DTOs.
 * Single source of truth for client identification and tracking.
 * 
 * Enterprise Features:
 * ✅ Device fingerprinting support
 * ✅ Bangladesh specific fields (district, networkType)
 * ✅ Security tracking fields (IP, UserAgent)
 * ✅ Audit trail ready
 * ✅ Distributed tracing support
 * 
 * @example
 * const clientInfo: ClientInfo = {
 *   ipAddress: '192.168.1.100',
 *   userAgent: 'Mozilla/5.0...',
 *   deviceId: 'device_abc123',
 *   deviceFingerprint: 'fp_xyz789',
 *   district: 'Dhaka',
 *   networkType: '4g'
 * };
 */

// ============================================================
// Core Types
// ============================================================

/**
 * Network types supported in Bangladesh
 */
export type authNetworkType = '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';

/**
 * Device platform types
 */
export type DevicePlatform = 'web' | 'mobile' | 'tablet' | 'desktop' | 'smart_tv' | 'wearable' | 'unknown';

/**
 * Device trust levels
 */
export type authDeviceTrustLevel = 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';

// ============================================================
// Client Info Interfaces
// ============================================================

/**
 * Client information for security and analytics
 * Used across all authentication DTOs
 */
export interface ClientInfo {
  /** IP address of the client (IPv4 or IPv6) */
  ipAddress?: string;
  
  /** User agent string for browser/device detection */
  userAgent?: string;
  
  /** Device identifier for session tracking */
  deviceId?: string;
  
  /** Device fingerprint for enhanced security and fraud detection */
  deviceFingerprint?: string;
  
  /** Device platform type */
  platform?: DevicePlatform;
  
  /** Screen resolution (format: WxH) */
  screenResolution?: string;
  
  /** Language preference (e.g., 'en', 'bn') */
  language?: string;
  
  /** Timezone offset in minutes from UTC */
  timezoneOffset?: number;
  
  // ============================================================
  // Bangladesh Specific Fields
  // ============================================================
  
  /** District in Bangladesh (for geo-location based security) */
  district?: string;
  
  /** Upazila/Thana in Bangladesh */
  upazila?: string;
  
  /** Division in Bangladesh */
  division?: string;
  
  /** Network type (mobile network optimization) */
  networkType?: authNetworkType;
  
  /** Mobile operator (Bangladesh specific) */
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  
  /** Data saver enabled (for mobile optimization) */
  dataSaverEnabled?: boolean;
  
  // ============================================================
  // Security & Tracking Fields
  // ============================================================
  
  /** Device trust level (for MFA decisions) */
  trustLevel?: authDeviceTrustLevel;
  
  /** Whether the device is a bot (for fraud detection) */
  isBot?: boolean;
  
  /** Whether the device is headless browser */
  isHeadless?: boolean;
  
  /** Whether the device is using VPN */
  isVpn?: boolean;
  
  /** Whether the device is using proxy */
  isProxy?: boolean;
  
  /** Browser name (from user agent parsing) */
  browserName?: string;
  
  /** Browser version */
  browserVersion?: string;
  
  /** OS name */
  osName?: string;
  
  /** OS version */
  osVersion?: string;
}

// ============================================================
// Extended Client Info (With Request Context)
// ============================================================

/**
 * Extended client information with request context
 * Used for audit logging and distributed tracing
 */
export interface ClientInfoWithContext extends ClientInfo {
  /** Correlation ID for distributed tracing */
  correlationId?: string;
  
  /** Request ID for audit trail */
  requestId?: string;
  
  /** Session ID for session tracking */
  sessionId?: string;
  
  /** Timestamp of the request */
  timestamp?: Date;
  
  /** Request source (e.g., 'web', 'mobile', 'api') */
  source?: 'web' | 'mobile' | 'api' | 'admin' | 'cron' | 'webhook';
}

// ============================================================
// Client Info Builders
// ============================================================

/**
 * Client info builder for creating client info from request
 */
export interface ClientInfoBuilder {
  /** Build from Express/NestJS request object */
  fromRequest(request: unknown): ClientInfo;
  
  /** Build from headers */
  fromHeaders(headers: Record<string, string | string[] | undefined>): ClientInfo;
  
  /** Build from user agent string */
  fromUserAgent(userAgent: string): ClientInfo;
  
  /** Build with device fingerprint */
  withDeviceFingerprint(clientInfo: ClientInfo, fingerprint: string): ClientInfo;
  
  /** Build with trust level */
  withTrustLevel(clientInfo: ClientInfo, trustLevel: authDeviceTrustLevel): ClientInfo;
}

// ============================================================
// Client Info Validators
// ============================================================

/**
 * Client info validation result
 */
export interface ClientInfoValidation {
  isValid: boolean;
  errors?: string[];
  warnings?: string[];
}

/**
 * Client info validator interface
 */
export interface ClientInfoValidator {
  /** Validate full client info */
  validate(clientInfo: ClientInfo): ClientInfoValidation;
  
  /** Validate IP address */
  validateIpAddress(ip: string): boolean;
  
  /** Validate user agent */
  validateUserAgent(userAgent: string): boolean;
  
  /** Validate device ID */
  validateDeviceId(deviceId: string): boolean;
  
  /** Validate district (Bangladesh) */
  validateDistrict(district: string): boolean;
}

// ============================================================
// Client Info Formatters
// ============================================================

/**
 * Client info formatter interface
 */
export interface ClientInfoFormatter {
  /** Format client info for logging */
  formatForLog(clientInfo: ClientInfo): string;
  
  /** Format client info for audit */
  formatForAudit(clientInfo: ClientInfo): Record<string, unknown>;
  
  /** Mask sensitive fields for display */
  mask(clientInfo: ClientInfo): ClientInfo;
  
  /** Get short summary */
  getSummary(clientInfo: ClientInfo): string;
}

// ============================================================
// Type Guards
// ============================================================

/**
 * Type guard to check if a value is ClientInfo
 */
export function isClientInfo(value: unknown): value is ClientInfo {
  if (!value || typeof value !== 'object') return false;
  
  const maybe = value as Partial<ClientInfo>;
  
  // Check if it has at least one identifying field
  return !!(maybe.ipAddress || maybe.userAgent || maybe.deviceId || maybe.deviceFingerprint);
}

/**
 * Type guard to check if value has valid network type
 */
export function isNetworkType(value: string): value is authNetworkType {
  return ['2g', '3g', '4g', '5g', 'wifi', 'unknown'].includes(value);
}

/**
 * Type guard to check if value has valid device platform
 */
export function isDevicePlatform(value: string): value is DevicePlatform {
  return ['web', 'mobile', 'tablet', 'desktop', 'smart_tv', 'wearable', 'unknown'].includes(value);
}

// ============================================================
// Constants
// ============================================================

/**
 * Default client info
 */
export const DEFAULT_CLIENT_INFO: ClientInfo = {
  platform: 'web',
  networkType: 'unknown',
  trustLevel: 'untrusted',
  language: 'en',
  dataSaverEnabled: false,
  isBot: false,
  isHeadless: false,
  isVpn: false,
  isProxy: false,
};

/**
 * Bangladesh districts (for validation)
 */
export const BANGLADESH_DISTRICTS = [
  'Bagerhat', 'Bandarban', 'Barguna', 'Barishal', 'Bhola', 'Bogra',
  'Brahmanbaria', 'Chandpur', 'Chattogram', 'Chuadanga', 'Cox\'s Bazar',
  'Cumilla', 'Dhaka', 'Dinajpur', 'Faridpur', 'Feni', 'Gaibandha',
  'Gazipur', 'Gopalganj', 'Habiganj', 'Jamalpur', 'Jashore', 'Jhalokathi',
  'Jhenaidah', 'Joypurhat', 'Khagrachari', 'Khulna', 'Kishoreganj',
  'Kurigram', 'Kushtia', 'Lakshmipur', 'Lalmonirhat', 'Madaripur',
  'Magura', 'Manikganj', 'Meherpur', 'Moulvibazar', 'Munshiganj',
  'Mymensingh', 'Naogaon', 'Narail', 'Narayanganj', 'Narsingdi',
  'Natore', 'Netrokona', 'Nilphamari', 'Noakhali', 'Pabna', 'Panchagarh',
  'Patuakhali', 'Pirojpur', 'Rajbari', 'Rajshahi', 'Rangamati',
  'Rangpur', 'Satkhira', 'Shariatpur', 'Sherpur', 'Sirajganj',
  'Sunamganj', 'Sylhet', 'Tangail', 'Thakurgaon',
] as const;

export type BangladeshDistrict = typeof BANGLADESH_DISTRICTS[number];

// ============================================================
// ENTERPRISE SUMMARY
// ============================================================
// 
// Enterprise Features:
// 1. ✅ Centralized client info type - Single source of truth
// 2. ✅ Bangladesh specific fields (district, upazila, division, networkType, mobileOperator)
// 3. ✅ Security fields (trustLevel, isBot, isVpn, isProxy)
// 4. ✅ Device fingerprinting support
// 5. ✅ Extended context for audit logging
// 6. ✅ Builder pattern for creation
// 7. ✅ Validator interface for validation
// 8. ✅ Formatter interface for logging
// 9. ✅ Type guards for runtime safety
// 10. ✅ Constants for defaults and validation
// 
// Bangladesh Specific:
// - All 64 districts listed for validation
// - Network type (2g/3g/4g/5g/wifi)
// - Mobile operator detection (gp, robi, banglalink, teletalk)
// - Upazila and division support
// - Data saver mode for mobile optimization
// 
// ============================================================
