/**
 * Session & Device Schemas - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-schemas/session/index
 *
 * @description
 * Central export point for all session and device management schemas.
 * Includes session lifecycle, device registration, trust management,
 * and Bangladesh-specific fields (district, upazila, mobile operator).
 *
 * Enterprise Rules:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure Zod schema exports only
 * ✅ Type-safe with complete type exports
 */

// ============================================================
// Device Schemas & Types
// ============================================================
export {
  // Primitive Schemas
  DeviceIdSchema,
  UserIdSchema,
  SessionIdSchema,
  DeviceTypeSchema,
  OSTypeSchema,
  BrowserTypeSchema,
  DeviceTrustLevelSchema,
  NetworkTypeSchema,
  MobileOperatorSchema,

  // Domain Schemas
  DeviceInfoSchema,
  DeviceFingerprintSchema,
  TrustedDeviceSchema,
  DeviceRiskAssessmentSchema,
  DeviceActivitySchema,

  // Request Schemas
  RegisterDeviceSchema,
  UpdateDeviceTrustSchema,
  RemoveDeviceSchema,
  DeviceSessionTransferSchema,
  DevicePairingSchema,
  DeviceUnpairSchema,
  DeviceFilterSchema,

  // Response Schemas
  DeviceResponseSchema,
  DeviceListResponseSchema,
  DeviceSessionTransferResponseSchema,
  DevicePairingResponseSchema,
  DeviceStatisticsResponseSchema,

  // Error Schema
  DeviceErrorSchema,
} from './device.schema';

export type {
  // Primitive Types
  DeviceId,
  UserId as DeviceUserId,
  SessionId as DeviceSessionId,
  DeviceType,
  OSType,
  BrowserType,
  DeviceTrustLevel,
  NetworkType as DeviceNetworkType,
  MobileOperator,

  // Domain Types
  DeviceInfo,
  DeviceFingerprint,
  TrustedDevice,
  DeviceRiskAssessment,
  DeviceActivity,

  // Request Types
  RegisterDeviceRequest,
  UpdateDeviceTrustRequest,
  RemoveDeviceRequest,
  DeviceSessionTransferRequest,
  DevicePairingRequest,
  DeviceUnpairRequest,
  DeviceFilterRequest,

  // Response Types
  DeviceResponse,
  DeviceListResponse,
  DeviceSessionTransferResponse,
  DevicePairingResponse,
  DeviceStatisticsResponse,

  // Error Type
  DeviceError,

  // Helper Types
  DeviceRegistrationFormData,
  DeviceTrustFormData,
  DevicePairingFormData,
} from './device.schema';

// ============================================================
// Session Schemas & Types
// ============================================================
export {
  // Primitive Schemas
  SessionIdSchema as SessionIdSchemaAlias,
  RefreshTokenSchema,
  AccessTokenSchema,
  TokenIdSchema,
  UserIdSchema as SessionUserIdSchema,
  SessionStatusSchema,
  SessionTrustLevelSchema,
  NetworkTypeSchema as SessionNetworkTypeSchema,
  MobileOperatorSchema as SessionMobileOperatorSchema,

  // Domain Schemas
  LocationInfoSchema,
  SessionTokensSchema,
  SessionSchema,

  // Request Schemas
  CreateSessionSchema,
  RefreshSessionSchema,
  TerminateSessionSchema,
  TerminateSessionsSchema,
  ValidateSessionSchema,
  SessionHeartbeatSchema,
  SessionTransferRequestSchema,
  SessionFilterSchema,
  SessionCleanupRequestSchema,

  // Response Schemas
  CreateSessionResponseSchema,
  RefreshSessionResponseSchema,
  TerminateSessionsResponseSchema,
  SessionValidationResponseSchema,
  SessionHeartbeatResponseSchema,
  SessionTransferResponseSchema,
  SessionListResponseSchema,
  SessionStatisticsResponseSchema,
  SessionCleanupResponseSchema,

  // Error Schema
  SessionErrorSchema,
} from './session.schema';

export type {
  // Primitive Types
  SessionId,
  RefreshToken,
  AccessToken,
  TokenId,
  UserId as SessionUserId,
  SessionStatus,
  SessionTrustLevel,
  NetworkType as SessionNetworkType,
  MobileOperator as SessionMobileOperator,

  // Domain Types
  LocationInfo,
  SessionTokens,
  Session,

  // Request Types
  CreateSessionRequest,
  RefreshSessionRequest,
  TerminateSessionRequest,
  TerminateSessionsRequest,
  ValidateSessionRequest,
  SessionHeartbeatRequest,
  SessionTransferRequest,
  SessionFilterRequest,
  SessionCleanupRequest,

  // Response Types
  CreateSessionResponse,
  RefreshSessionResponse,
  TerminateSessionsResponse,
  SessionValidationResponse,
  SessionHeartbeatResponse,
  SessionTransferResponse,
  SessionListResponse,
  SessionStatisticsResponse,
  SessionCleanupResponse,

  // Error Type
  SessionError,
} from './session.schema';

// ============================================================
// Cross-Domain Types (Session & Device Combined)
// ============================================================
export type {
  // Re-export commonly combined types
  DeviceInfo as SessionDeviceInfo,
  DeviceType as SessionDeviceType,
  DeviceTrustLevel as SessionDeviceTrustLevel,
  NetworkType as SessionNetwork,
  MobileOperator as SessionMobileOperatorType,
} from './device.schema';
