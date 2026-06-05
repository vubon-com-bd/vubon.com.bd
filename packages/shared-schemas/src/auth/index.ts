/**
 * Auth Schemas - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-schemas/auth/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure Zod schema exports only
 */

// ============================================================
// User & Authentication Schemas (No duplicate exports)
// ============================================================
export {
  // User Schemas
  UserIdSchema,
  UserEmailSchema,
  UserPhoneSchema,
  UserPhoneRequiredSchema,
  UserFirstNameSchema,
  UserLastNameSchema,
  UserDisplayNameSchema,
  UserAvatarSchema,
  UserPasswordSchema,
  UserStrongPasswordSchema,
  UserStatusSchema,
  UserVerificationStatusSchema,
  UserRoleSchema,
  UserTierSchema,
  UserMetadataSchema,
  UserSchema,
  CreateUserSchema,
  UpdateUserSchema,
  UpdateUserProfileSchema,
  UpdateUserRoleSchema,
  UpdateUserStatusSchema,
  UserFiltersSchema,
  UserResponseSchema,
  UserProfileResponseSchema,
  UserListResponseSchema,
  UserActivitySummarySchema,
  UserPreferencesSchema,
  UserErrorSchema,
} from './user.schema';

// ============================================================
// Login Schemas (Email, Phone, OTP, MFA Login)
// ============================================================
export {
  // Primitives
  LoginMethodSchema,
  RememberMeSchema,
  DeviceIdSchema as LoginDeviceIdSchema,
  ClientInfoSchema,
  CaptchaTokenSchema as LoginCaptchaTokenSchema,
  // Requests
  LoginSchema as EmailLoginSchema,
  PhoneLoginSchema,
  UsernameLoginSchema,
  OtpLoginSchema,
  MfaLoginSchema,
  RefreshTokenRequestSchema,
  LogoutRequestSchema,
  // Responses
  LoginResponseSchema,
  RefreshTokenResponseSchema,
  LogoutResponseSchema,
  // Errors
  LoginErrorSchema,
  // Additional

  MagicLinkRequestSchema,
  MagicLinkVerifySchema,
} from './login.schema';

// ============================================================
// Register Schemas
// ============================================================
export {
  UserEmailSchema as RegisterEmailSchema,
  UserPhoneSchema as RegisterPhoneSchema,
  UserPhoneRequiredSchema as RegisterPhoneRequiredSchema,
  UserFirstNameSchema as RegisterFirstNameSchema,
  UserLastNameSchema as RegisterLastNameSchema,
  UserDisplayNameSchema as RegisterDisplayNameSchema,
  UserPasswordSchema as RegisterPasswordSchema,
  UserStrongPasswordSchema as RegisterStrongPasswordSchema,
  UsernameSchema,
  AcceptTermsSchema,
  AcceptPrivacySchema,
  MarketingConsentSchema,
  AgeVerificationSchema,
  ReferralCodeSchema,
  RegisterSchema,
  EmailRegisterSchema,
  PhoneRegisterSchema,
  OTPRegisterSchema,
  SocialRegisterSchema,
  VendorRegisterSchema,
  RegisterResponseSchema,
  EmailVerificationRequiredSchema,
  PhoneVerificationRequiredSchema,
  RegisterErrorSchema,
} from './register.schema';

// ============================================================
// MFA Schemas
// ============================================================
export {
  MFAProviderSchema,
  MFAVerificationTypeSchema,
  MFAStatusSchema,
  OTPCodeSchema,
  BackupCodeSchema,
  MFAMethodIdSchema,
  MFAChallengeIdSchema,
  TOTPSecretSchema,
  WebAuthnChallengeSchema,
  MFASetupRequestSchema,
  MFAVerifyRequestSchema,
  MFARecoveryRequestSchema,
  MFAChallengeRequestSchema,
  DisableMFARequestSchema,
  TOTPSetupRequestSchema,
  WebAuthnRegistrationRequestSchema,
  WebAuthnAuthRequestSchema,
  WhatsAppMFARequestSchema,
  MFSMFARequestSchema,
  MFASetupResponseSchema,
  MFAChallengeResponseSchema,
  MFAVerifyResponseSchema,
  MFARecoveryResponseSchema,
  MFAMethodSchema,
  MFAStatusResponseSchema,
  TOTPSetupResponseSchema,
  WebAuthnRegistrationResponseSchema,
  WebAuthnAuthResponseSchema,
} from './mfa.schema';

// ============================================================
// Verification Schemas
// ============================================================
export {
  VerificationTypeSchema,
  VerificationStatusSchema,
  VerificationMethodSchema,
  VerificationTokenSchema as VerificationToken,
  VerificationCodeSchema,
  UserIdSchema as VerificationUserIdSchema,
  SessionIdSchema,
  SendVerificationSchema,
  VerifyEmailSchema,
  VerifyCodeSchema,
  ResendVerificationSchema,
  MagicLinkRequestSchema as VerificationMagicLinkRequestSchema,
  MagicLinkVerifySchema as VerificationMagicLinkVerifySchema,
  EmailChangeRequestSchema,
  EmailChangeVerifySchema,
  PhoneChangeRequestSchema,
  PhoneChangeVerifySchema,
  SendOTPRequestSchema,
  ResendOTPRequestSchema,
  WhatsAppVerificationSchema,
  VoiceVerificationSchema,
  VerificationResponseSchema,
  ResendVerificationResponseSchema,
  VerificationStatusResponseSchema,
  MagicLinkResponseSchema,
  MagicLinkVerifyResponseSchema,
  SendOTPResponseSchema,
  EmailChangeResponseSchema,
  PhoneChangeResponseSchema,
  WhatsAppVerificationResponseSchema,
  VoiceVerificationResponseSchema,
  VerificationErrorSchema,
} from './verification.schema';

// ============================================================
// Password Reset Schemas
// ============================================================
export {
  ResetEmailSchema,
  ResetPhoneSchema,
  ResetPasswordSchema,
  ResetPasswordStrengthSchema,
  ResetVerificationTokenSchema,
  ResetUserIdSchema,
  ResetSessionIdSchema,
  ResetCaptchaTokenSchema,
  ForgotPasswordSchema,
  ForgotPasswordPhoneSchema,
  ResetPasswordRequestSchema,
  StrongResetPasswordRequestSchema,
  ValidateResetTokenSchema,
  RequestResetOTPSchema,
  VerifyResetOTPSchema,
  ForgotPasswordResponseSchema,
  ForgotPasswordPhoneResponseSchema,
  ResetPasswordResponseSchema,
  TokenValidationResponseSchema,
  RequestResetOTPResponseSchema,
  VerifyResetOTPResponseSchema,
  PasswordResetErrorSchema,
} from './password-reset.schema';

// ============================================================
// Social Auth Schemas
// ============================================================
export {
  SocialProviderSchema,
  OAuthStateSchema,
  OAuthCodeSchema,
  OAuthScopeSchema,
  RedirectUriSchema,
  PKCECodeVerifierSchema,
  PKCECodeChallengeSchema,
  GoogleOAuthDataSchema,
  FacebookOAuthDataSchema,
  GitHubOAuthDataSchema,
  AppleOAuthDataSchema,
  WhatsAppOAuthDataSchema,
  BkashOAuthDataSchema,
  NagadOAuthDataSchema,
  RocketOAuthDataSchema,
  SocialLoginRequestSchema,
  SocialLoginResponseSchema,
  SocialCallbackSchema,
  SocialConnectRequestSchema,
  SocialDisconnectRequestSchema,
  SocialOTPRequestSchema,
  SocialOTPVerificationSchema,
  MFSAuthRequestSchema,
  SocialUserInfoSchema,
  SocialCallbackResponseSchema,
  SocialAccountSchema,
  SocialAccountsResponseSchema,
  SocialOTPResponseSchema,
  MFSAuthResponseSchema,
  SocialAuthErrorSchema,
} from './social.schema';
