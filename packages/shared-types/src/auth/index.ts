/**
 * Auth Types - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/auth/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure TypeScript type exports only
 */

// ============================================================
// Core Auth Types
// ============================================================
export * from './user.types';
export * from './session.types';
export * from './token.types';
export * from './role.types';
export * from './permission.types';

// ============================================================
// Security & MFA Types
// ============================================================
export * from './mfa.types';
// export * from './device.types';  // Device types will be exported selectively to avoid conflicts
export * from './verification.types';
export * from './account-lock.types';
export * from './login-attempt.types';

// ============================================================
// Social Auth Types
// ============================================================
export * from './social.types';
export * from './reset-method.types';
// ============================================================
// Device Types (Selective export to avoid duplicate LocationInfo)
// ============================================================
export {
  type BaseDeviceType,
  type DeviceType,
  type ExtendedDeviceType,
  type BaseOSType,
  type OSType,
  type ExtendedOSType,
  type BaseBrowserType,
  type BrowserType,
  type ExtendedBrowserType,
  type NetworkType,
  type MobileOperator,
  type DeviceTrustLevel,
  type ExtendedTrustLevel,
  type DeviceInfo,
  type FingerprintComponentValue,
  type DeviceFingerprint,
  type FingerprintData,
  type TrustedDevice,
  type RegisterDeviceRequest,
  type DeviceDTO,
  type UpdateDeviceTrustRequest,
  type RemoveDeviceRequest,
  type DeviceActivityType,
  type DeviceActivity,
  type DeviceRiskAssessment,
  type DeviceRiskFactor,
  type RiskIndicator,
  type DeviceStatistics,
  type DeviceSessionTransfer,
  type DevicePairing,
  type PairedDevicePermission,
  type PublicDeviceSession,
  type PublicDeviceRestriction,
  type DeviceVerificationRequest,
  type DeviceWebhookEventType,
  type DeviceWebhookPayload,
  type DeviceFilterOptions,
  type DeviceTrustDurationValue,
  type DeviceTrustDuration,
  type DeviceCategory,
  type DeviceTypeToCategoryMap,
  type BrowserTrustScore,
  type BrowserTrustLevels,
  type NetworkSecurityScore,
  type NetworkSecurityLevels,
  type DeviceMetrics,
  type DeviceInfoType,
  type DeviceFingerprintType,
  type TrustedDeviceType,
  type DeviceDTOType,
  type DeviceActivityTypeType,
  type DeviceRiskAssessmentType,
  type DeviceStatisticsType,
  type DevicePairingType,
  type PublicDeviceSessionType,
  type TrustLevel,
  type TrustScore,
  type TrustLevelConfig,
  type RevocationScope,
  type RevocationScopeContext,
} from './device.types';

// LocationInfo is already exported from common/location.types
// Do not re-export it from here to avoid conflicts
// If you need LocationInfo, import directly from common or common/index
