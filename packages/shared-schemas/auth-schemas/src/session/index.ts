/**
 * Session & Device Schemas - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-schemas/session/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure Zod schema exports only
 */

// ============================================================
// Session Schemas
// ============================================================

// Export from session.schema (Session-specific)
export {
  // Primitives
  SessionIdSchema,
  RefreshTokenSchema,
  AccessTokenSchema,
  TokenIdSchema,
  SessionStatusSchema,
  SessionTrustLevelSchema,
  LocationInfoSchema,
  SessionTokensSchema,
  // Domain
  SessionSchema,
  // Requests
  CreateSessionSchema,
  RefreshSessionSchema,
  TerminateSessionSchema,
  TerminateSessionsRequestSchema,
  ValidateSessionSchema,
  SessionHeartbeatSchema,
  SessionTransferRequestSchema,
  SessionFilterSchema,
  SessionCleanupRequestSchema,
  // Responses
  CreateSessionResponseSchema,
  RefreshSessionResponseSchema,
  TerminateSessionsResponseSchema,
  SessionValidationResponseSchema,
  SessionHeartbeatResponseSchema,
  SessionTransferResponseSchema,
  SessionListResponseSchema,
  SessionStatisticsResponseSchema,
  SessionCleanupResponseSchema,
  // Errors
  SessionErrorSchema,
  // Types
  type SessionId,
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
} from './session.schema';

// ============================================================
// Device Schemas
// ============================================================

// Export from device.schema (Device-specific)
// Note: Some types may conflict with session.schema, so we rename or selectively export
export {
  // Primitives
  DeviceIdSchema,
  DeviceTypeSchema,
  OSTypeSchema,
  BrowserTypeSchema,
  DeviceTrustLevelSchema,
  // Domain
  DeviceInfoSchema,
  DeviceFingerprintSchema,
  TrustedDeviceSchema,
  DeviceRiskAssessmentSchema,
  DeviceActivitySchema,
  // Requests
  RegisterDeviceSchema,
  UpdateDeviceTrustSchema,
  RemoveDeviceSchema,
  DeviceSessionTransferSchema,
  DevicePairingSchema,
  DeviceUnpairSchema,
  DeviceFilterSchema,
  // Responses
  DeviceResponseSchema,
  DeviceListResponseSchema,
  DeviceSessionTransferResponseSchema,
  DevicePairingResponseSchema,
  DeviceStatisticsResponseSchema,
  // Errors
  DeviceErrorSchema,
  // Types
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
} from './device.schema';

// ============================================================
// Shared Types (Re-export from device.schema with renamed exports if needed)
// ============================================================

// Re-export NetworkType and MobileOperator from device.schema with device prefix
export {
  NetworkTypeSchema as DeviceNetworkTypeSchema,
  MobileOperatorSchema as DeviceMobileOperatorSchema,
  type NetworkType as DeviceNetworkType,
  type MobileOperator as DeviceMobileOperator,
} from './device.schema';
