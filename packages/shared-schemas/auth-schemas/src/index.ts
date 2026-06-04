/**
 * Shared Schemas - Root Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-schemas/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure Zod schema exports only
 */

// Auth Domain Schemas
export * from './auth';

// Role & Permission Schemas
export * from './role';

// Session & Device Schemas (rename conflicting exports to avoid ambiguity)
export {
  // Session schemas (renamed to avoid conflict with auth)
  SessionIdSchema as SessionDocumentIdSchema,
  UserIdSchema as SessionUserIdSchema,
  NetworkTypeSchema as SessionNetworkTypeSchema,
  MobileOperatorSchema as SessionMobileOperatorSchema,
  // Re-export all other session exports
  RefreshTokenSchema,
  AccessTokenSchema,
  TokenIdSchema,
  SessionStatusSchema,
  SessionTrustLevelSchema,
  LocationInfoSchema,
  SessionTokensSchema,
  SessionSchema,
  CreateSessionSchema,
  RefreshSessionSchema,
  TerminateSessionSchema,
  TerminateSessionsRequestSchema,
  ValidateSessionSchema,
  SessionHeartbeatSchema,
  SessionTransferRequestSchema,
  SessionFilterSchema,
  SessionCleanupRequestSchema,
  CreateSessionResponseSchema,
  RefreshSessionResponseSchema,
  TerminateSessionsResponseSchema,
  SessionValidationResponseSchema,
  SessionHeartbeatResponseSchema,
  SessionTransferResponseSchema,
  SessionListResponseSchema,
  SessionStatisticsResponseSchema,
  SessionCleanupResponseSchema,
  SessionErrorSchema,
  // Device schemas (no conflicts)
  DeviceIdSchema,
  DeviceTypeSchema,
  OSTypeSchema,
  BrowserTypeSchema,
  DeviceTrustLevelSchema,
  DeviceInfoSchema,
  DeviceFingerprintSchema,
  TrustedDeviceSchema,
  DeviceRiskAssessmentSchema,
  DeviceActivitySchema,
  RegisterDeviceSchema,
  UpdateDeviceTrustSchema,
  RemoveDeviceSchema,
  DeviceSessionTransferSchema,
  DevicePairingSchema,
  DeviceUnpairSchema,
  DeviceFilterSchema,
  DeviceResponseSchema,
  DeviceListResponseSchema,
  DeviceSessionTransferResponseSchema,
  DevicePairingResponseSchema,
  DeviceStatisticsResponseSchema,
  DeviceErrorSchema,
  // Types
  type RefreshToken,
  type AccessToken,
  type TokenId,
  type SessionStatus,
  type SessionTrustLevel,
  type LocationInfo,
  type SessionTokens,
  type Session,
  type CreateSessionRequest,
  type CreateSessionResponse,
  type RefreshSessionRequest,
  type RefreshSessionResponse,
  type TerminateSessionRequest,
  type TerminateSessionsRequest,
  type TerminateSessionsResponse,
  type ValidateSessionRequest,
  type SessionValidationResponse,
  type SessionHeartbeatRequest,
  type SessionHeartbeatResponse,
  type SessionTransferRequest,
  type SessionTransferResponse,
  type SessionFilterRequest,
  type SessionListResponse,
  type SessionStatisticsResponse,
  type SessionCleanupRequest,
  type SessionCleanupResponse,
  type SessionError,
  // Device types
  type DeviceId,
  type DeviceType,
  type OSType,
  type BrowserType,
  type DeviceTrustLevel,
  type DeviceInfo,
  type DeviceFingerprint,
  type TrustedDevice,
  type DeviceRiskAssessment,
  type DeviceActivity,
  type RegisterDeviceRequest,
  type UpdateDeviceTrustRequest,
  type RemoveDeviceRequest,
  type DeviceSessionTransferRequest,
  type DevicePairingRequest,
  type DeviceUnpairRequest,
  type DeviceFilterRequest,
  type DeviceResponse,
  type DeviceListResponse,
  type DeviceSessionTransferResponse,
  type DevicePairingResponse,
  type DeviceStatisticsResponse,
  type DeviceError,
} from './session';
