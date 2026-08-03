/**
 * Auth schemas module exports
 * Central export point for all authentication-related validation schemas
 */

// Export register schemas
export {
  RegisterSchema,
  validateRegistration,
  safeValidateRegistration,
  type RegisterSchemaType,
  type ValidatedRegisterData,
} from './register.schema';

// Export login schemas
export {
  LoginSchema,
  PhoneLoginSchema,
  UsernameLoginSchema,
  RefreshTokenSchema,
  LogoutSchema,
  RevokeAllSessionsSchema as LogoutRevokeAllSessionsSchema,
  validateLogin,
  safeValidateLogin,
  validatePhoneLogin,
  safeValidatePhoneLogin,
  validateUsernameLogin,
  safeValidateUsernameLogin,
  validateRefreshToken,
  safeValidateRefreshToken,
  validateLogout,
  safeValidateLogout,
  validateRevokeAllSessions as validateLogoutRevokeAllSessions,
  safeValidateRevokeAllSessions as safeValidateLogoutRevokeAllSessions,
  type LoginSchemaType,
  type PhoneLoginSchemaType,
  type UsernameLoginSchemaType,
  type RefreshTokenSchemaType,
  type LogoutSchemaType,
  type RevokeAllSessionsSchemaType as LogoutRevokeAllSessionsSchemaType,
} from './login.schema';

// Export verification schemas
export {
  SendVerificationEmailSchema,
  VerifyEmailSchema,
  ResendVerificationEmailSchema,
  validateSendVerificationEmail,
  safeValidateSendVerificationEmail,
  validateVerifyEmail,
  safeValidateVerifyEmail,
  validateResendVerificationEmail,
  safeValidateResendVerificationEmail,
  type SendVerificationEmailSchemaType,
  type VerifyEmailSchemaType,
  type ResendVerificationEmailSchemaType,
} from './verification.schema';

// Export MFA schemas
export {
  EnableMFASchema,
  VerifyMFASchema,
  DisableMFASchema,
  validateEnableMFA,
  safeValidateEnableMFA,
  validateVerifyMFA,
  safeValidateVerifyMFA,
  validateDisableMFA,
  safeValidateDisableMFA,
  type EnableMFASchemaType,
  type VerifyMFASchemaType,
  type DisableMFASchemaType,
} from './mfa.schema';

// Export password reset schemas
export {
  ForgotPasswordSchema,
  ResetPasswordSchema,
  ResendResetLinkSchema,
  validateForgotPassword,
  safeValidateForgotPassword,
  validateResetPassword,
  safeValidateResetPassword,
  validateResendResetLink,
  safeValidateResendResetLink,
  type ForgotPasswordSchemaType,
  type ResetPasswordSchemaType,
  type ResendResetLinkSchemaType,
} from './password-reset.schema';

// Export admin schemas
export {
  AdminUserListSchema,
  AdminUpdateUserSchema,
  AdminCreateUserSchema,
  validateAdminUserList,
  safeValidateAdminUserList,
  validateAdminUpdateUser,
  safeValidateAdminUpdateUser,
  validateAdminCreateUser,
  safeValidateAdminCreateUser,
  type AdminUserListSchemaType,
  type AdminUpdateUserSchemaType,
  type AdminCreateUserSchemaType,
} from './admin.schema';

// Export security schemas
export {
  UnlockAccountSchema,
  BlockIPSchema,
  UnblockIPSchema,
  validateUnlockAccount,
  safeValidateUnlockAccount,
  validateBlockIP,
  safeValidateBlockIP,
  validateUnblockIP,
  safeValidateUnblockIP,
  type UnlockAccountSchemaType,
  type BlockIPSchemaType,
  type UnblockIPSchemaType,
} from './security.schema';

// Export social schemas
export {
  SocialLoginSchema,
  SocialCallbackSchema,
  LinkSocialAccountSchema,
  UnlinkSocialAccountSchema,
  validateSocialLogin,
  safeValidateSocialLogin,
  validateSocialCallback,
  safeValidateSocialCallback,
  validateLinkSocialAccount,
  safeValidateLinkSocialAccount,
  validateUnlinkSocialAccount,
  safeValidateUnlinkSocialAccount,
  type SocialLoginSchemaType,
  type SocialCallbackSchemaType,
  type LinkSocialAccountSchemaType,
  type UnlinkSocialAccountSchemaType,
} from './social.schema';

// Export user schemas
export {
  UpdateProfileSchema,
  DeleteAccountSchema,
  validateUpdateProfile,
  safeValidateUpdateProfile,
  validateDeleteAccount,
  safeValidateDeleteAccount,
  type UpdateProfileSchemaType,
  type DeleteAccountSchemaType,
} from './user.schema';

// Export session schemas
export {
  SessionIdSchema,
  RevokeAllSessionsSchema as SessionRevokeAllSessionsSchema,
  validateSessionId,
  safeValidateSessionId,
  validateRevokeAllSessions as validateSessionRevokeAllSessions,
  safeValidateRevokeAllSessions as safeValidateSessionRevokeAllSessions,
  type SessionIdSchemaType,
  type RevokeAllSessionsSchemaType as SessionRevokeAllSessionsSchemaType,
} from './session.schema';
