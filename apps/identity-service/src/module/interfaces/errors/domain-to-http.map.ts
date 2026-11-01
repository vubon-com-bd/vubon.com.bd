/**
 * Domain Error → HTTP Status Mapping
 * @module identity-service/interfaces/errors
 *
 * Explicit map for auth-service domain errors → HTTP status codes.
 * Used by exception filters and OpenAPI docs.
 */
import { HttpStatus } from '@nestjs/common';

/**
 * Auth-specific error name → HTTP status mapping.
 * When adding new domain errors, register here for proper mapping.
 */
export const AUTH_ERROR_HTTP_MAP: Readonly<Record<string, number>> =
  Object.freeze({
    // ─── Auth ─────────────────────────────
    AuthNotFoundError: HttpStatus.NOT_FOUND,
    AuthNotFoundByUserError: HttpStatus.NOT_FOUND,
    AuthAlreadyExistsError: HttpStatus.CONFLICT,
    InvalidAuthTypeError: HttpStatus.UNPROCESSABLE_ENTITY,
    InvalidAuthStatusError: HttpStatus.UNPROCESSABLE_ENTITY,
    InvalidAuthProviderError: HttpStatus.UNPROCESSABLE_ENTITY,
    InvalidAuthMethodError: HttpStatus.UNPROCESSABLE_ENTITY,
    InvalidAuthStatusTransitionError: HttpStatus.BAD_REQUEST,
    AuthLockedError: HttpStatus.LOCKED,
    AuthExpiredError: HttpStatus.BAD_REQUEST,
    AuthUnverifiedError: HttpStatus.BAD_REQUEST,

    // ─── Credential ───────────────────────
    CredentialMismatchError: HttpStatus.UNAUTHORIZED,
    PasswordExpiredError: HttpStatus.BAD_REQUEST,
    PasswordReusedError: HttpStatus.BAD_REQUEST,
    PasswordTooWeakError: HttpStatus.UNPROCESSABLE_ENTITY,
    PasswordHashInvalidError: HttpStatus.UNPROCESSABLE_ENTITY,
    CurrentPasswordMismatchError: HttpStatus.BAD_REQUEST,
    PasswordPolicyViolationError: HttpStatus.UNPROCESSABLE_ENTITY,

    // ─── Session ──────────────────────────
    SessionNotFoundError: HttpStatus.NOT_FOUND,
    SessionExpiredError: HttpStatus.UNAUTHORIZED,
    SessionRevokedError: HttpStatus.UNAUTHORIZED,
    SessionIdleTimeoutError: HttpStatus.UNAUTHORIZED,
    ConcurrentSessionLimitError: HttpStatus.BAD_REQUEST,
    InvalidSessionTransitionError: HttpStatus.BAD_REQUEST,
    SessionAlreadyRevokedError: HttpStatus.BAD_REQUEST,

    // ─── Token ────────────────────────────
    TokenNotFoundError: HttpStatus.NOT_FOUND,
    TokenReusedError: HttpStatus.CONFLICT,
    InvalidTokenTypeError: HttpStatus.UNPROCESSABLE_ENTITY,
    InvalidTokenFormatError: HttpStatus.UNPROCESSABLE_ENTITY,
    TokenInvalidError: HttpStatus.UNAUTHORIZED,
    TokenExpiredError: HttpStatus.UNAUTHORIZED,
    RefreshTokenRevokedError: HttpStatus.UNAUTHORIZED,
    AccessTokenRevokedError: HttpStatus.UNAUTHORIZED,
    TokenSignatureInvalidError: HttpStatus.UNAUTHORIZED,
    TokenAudienceMismatchError: HttpStatus.UNAUTHORIZED,
    ResetTokenUsedError: HttpStatus.BAD_REQUEST,
    VerifyTokenUsedError: HttpStatus.BAD_REQUEST,

    // ─── MFA ──────────────────────────────
    MfaNotFoundError: HttpStatus.NOT_FOUND,
    MfaAlreadyEnabledError: HttpStatus.CONFLICT,
    InvalidMfaMethodError: HttpStatus.UNPROCESSABLE_ENTITY,
    MfaRequiredError: HttpStatus.UNAUTHORIZED,
    MfaInvalidCodeError: HttpStatus.UNAUTHORIZED,
    MfaNotEnabledError: HttpStatus.BAD_REQUEST,
    MfaCodeExpiredError: HttpStatus.BAD_REQUEST,
    MfaMaxAttemptsError: HttpStatus.TOO_MANY_REQUESTS,
    BackupCodeExhaustedError: HttpStatus.BAD_REQUEST,
    BackupCodeInvalidError: HttpStatus.UNAUTHORIZED,
    MfaChallengeExpiredError: HttpStatus.BAD_REQUEST,

    // ─── Account Lock ─────────────────────
    AccountLockNotFoundError: HttpStatus.NOT_FOUND,
    AccountLockedError: HttpStatus.LOCKED,
    TooManyLoginAttemptsError: HttpStatus.TOO_MANY_REQUESTS,
    TooManyLoginAttemptsPerIpError: HttpStatus.TOO_MANY_REQUESTS,
    AccountAlreadyLockedError: HttpStatus.BAD_REQUEST,
    AccountNotLockedError: HttpStatus.BAD_REQUEST,

    // ─── Device ───────────────────────────
    DeviceNotFoundError: HttpStatus.NOT_FOUND,
    DeviceAlreadyTrustedError: HttpStatus.CONFLICT,
    DeviceAlreadyRegisteredError: HttpStatus.CONFLICT,
    DeviceLimitExceededError: HttpStatus.BAD_REQUEST,
    DeviceNotTrustedError: HttpStatus.BAD_REQUEST,
    DeviceTrustExpiredError: HttpStatus.BAD_REQUEST,
    InvalidDeviceTypeError: HttpStatus.UNPROCESSABLE_ENTITY,

    // ─── Verification ─────────────────────
    VerificationNotFoundError: HttpStatus.NOT_FOUND,
    OtpExpiredError: HttpStatus.BAD_REQUEST,
    OtpInvalidError: HttpStatus.UNAUTHORIZED,
    OtpMaxAttemptsError: HttpStatus.TOO_MANY_REQUESTS,
    OtpResendCooldownError: HttpStatus.TOO_MANY_REQUESTS,
    OtpMaxResendError: HttpStatus.TOO_MANY_REQUESTS,
    VerificationAlreadyVerifiedError: HttpStatus.BAD_REQUEST,
    InvalidVerificationChannelError: HttpStatus.UNPROCESSABLE_ENTITY,
    InvalidVerificationPurposeError: HttpStatus.UNPROCESSABLE_ENTITY,
    InvalidOtpFormatError: HttpStatus.UNPROCESSABLE_ENTITY,

    // ─── Social/OAuth/SSO ─────────────────
    SocialAccountNotFoundError: HttpStatus.NOT_FOUND,
    OAuthClientNotFoundError: HttpStatus.NOT_FOUND,
    SsoConfigNotFoundError: HttpStatus.NOT_FOUND,
    SocialAccountAlreadyLinkedError: HttpStatus.CONFLICT,
    SocialAccountNotLinkedError: HttpStatus.BAD_REQUEST,
    OAuthInvalidGrantError: HttpStatus.BAD_REQUEST,
    OAuthInvalidClientError: HttpStatus.UNAUTHORIZED,
    OAuthInvalidRedirectUriError: HttpStatus.BAD_REQUEST,
    OAuthPkceVerificationError: HttpStatus.BAD_REQUEST,
    SsoConfigurationError: HttpStatus.INTERNAL_SERVER_ERROR,
    SsoAssertionInvalidError: HttpStatus.UNAUTHORIZED,
    InvalidSocialProviderError: HttpStatus.UNPROCESSABLE_ENTITY,
    InvalidOAuthGrantTypeError: HttpStatus.UNPROCESSABLE_ENTITY,

    // ─── Role & Permission ────────────────
    RoleNotFoundError: HttpStatus.NOT_FOUND,
    PermissionNotFoundError: HttpStatus.NOT_FOUND,
    PermissionDeniedError: HttpStatus.FORBIDDEN,
    RoleAlreadyAssignedError: HttpStatus.CONFLICT,
    RoleAlreadyExistsError: HttpStatus.CONFLICT,
    RoleNotAssignedError: HttpStatus.BAD_REQUEST,
    SystemRoleCannotBeDeletedError: HttpStatus.BAD_REQUEST,
    PermissionNotGrantedError: HttpStatus.BAD_REQUEST,
    InvalidRoleNameError: HttpStatus.UNPROCESSABLE_ENTITY,
    InvalidPermissionNameError: HttpStatus.UNPROCESSABLE_ENTITY,

    // ─── User ─────────────────────────────
    UserNotFoundError: HttpStatus.NOT_FOUND,
    UserNotFoundByEmailError: HttpStatus.NOT_FOUND,
    UserAlreadyExistsError: HttpStatus.CONFLICT,
    UserAlreadyActiveError: HttpStatus.CONFLICT,
    InvalidUserStatusError: HttpStatus.UNPROCESSABLE_ENTITY,
    InvalidUserTypeError: HttpStatus.UNPROCESSABLE_ENTITY,
    UserSuspendedError: HttpStatus.FORBIDDEN,
    UserInactiveError: HttpStatus.FORBIDDEN,
    UserDeletedError: HttpStatus.GONE,
    UserCannotBeDeletedError: HttpStatus.BAD_REQUEST,
    UserEmailNotVerifiedError: HttpStatus.FORBIDDEN,
    InvalidUserStatusTransitionError: HttpStatus.BAD_REQUEST,

    // ─── KYC ──────────────────────────────
    KycNotFoundError: HttpStatus.NOT_FOUND,
    KycAlreadySubmittedError: HttpStatus.CONFLICT,
    KycAlreadyVerifiedError: HttpStatus.CONFLICT,
    InvalidKycStatusError: HttpStatus.UNPROCESSABLE_ENTITY,
    InvalidKycDocumentTypeError: HttpStatus.UNPROCESSABLE_ENTITY,
    KycNotVerifiedError: HttpStatus.FORBIDDEN,
    KycAlreadyPendingError: HttpStatus.CONFLICT,
    KycCannotBeVerifiedError: HttpStatus.BAD_REQUEST,
    KycDocumentMissingError: HttpStatus.BAD_REQUEST,
    KycExpiredError: HttpStatus.BAD_REQUEST,

    // ─── Biometric ────────────────────────
    BiometricNotFoundError: HttpStatus.NOT_FOUND,
    BiometricAlreadyEnabledError: HttpStatus.CONFLICT,
    InvalidBiometricTypeError: HttpStatus.UNPROCESSABLE_ENTITY,
    BiometricNotEnabledError: HttpStatus.BAD_REQUEST,
    BiometricVerificationFailedError: HttpStatus.UNAUTHORIZED,
    BiometricMaxAttemptsError: HttpStatus.TOO_MANY_REQUESTS,
    BiometricDeviceMismatchError: HttpStatus.BAD_REQUEST,

    // ─── 2FA ──────────────────────────────
    TwoFactorNotFoundError: HttpStatus.NOT_FOUND,
    TwoFactorAlreadyEnabledError: HttpStatus.CONFLICT,
    InvalidTwoFactorMethodError: HttpStatus.UNPROCESSABLE_ENTITY,
    TwoFactorNotEnabledError: HttpStatus.BAD_REQUEST,
    TwoFactorRequiredError: HttpStatus.UNAUTHORIZED,
    TwoFactorInvalidCodeError: HttpStatus.UNAUTHORIZED,

    // ─── Recovery Code ────────────────────
    RecoveryCodeNotFoundError: HttpStatus.NOT_FOUND,
    RecoveryCodeAlreadyUsedError: HttpStatus.BAD_REQUEST,
    RecoveryCodeInvalidError: HttpStatus.UNAUTHORIZED,
    RecoveryCodesExhaustedError: HttpStatus.BAD_REQUEST,
    RecoveryCodesNotGeneratedError: HttpStatus.BAD_REQUEST,

    // ─── Profile ──────────────────────────
    ProfileNotFoundError: HttpStatus.NOT_FOUND,
    AddressNotFoundError: HttpStatus.NOT_FOUND,
    ContactNotFoundError: HttpStatus.NOT_FOUND,
    InvalidAddressTypeError: HttpStatus.UNPROCESSABLE_ENTITY,
    InvalidAddressError: HttpStatus.UNPROCESSABLE_ENTITY,
    AddressLimitExceededError: HttpStatus.BAD_REQUEST,
    CannotDeleteDefaultAddressError: HttpStatus.BAD_REQUEST,

    // ─── Rate Limit ───────────────────────
    RateLimitExceededError: HttpStatus.TOO_MANY_REQUESTS,
    QuietHoursError: HttpStatus.FORBIDDEN,
  });

/**
 * Lookup HTTP status by error class name.
 * Falls back to 500 if not found.
 */
export function httpStatusForError(errorName: string): number {
  return AUTH_ERROR_HTTP_MAP[errorName] ?? HttpStatus.INTERNAL_SERVER_ERROR;
}
