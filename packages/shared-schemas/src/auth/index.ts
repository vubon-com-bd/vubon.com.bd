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
  PasswordSchema,
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
  UsernameRegisterSchema,
  RegistrationMethodSchema,
  RegistrationMetadataSchema,
  RegistrationRateLimitSchema
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
  VerificationTokenSchema as Verification_Token,
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

// ============================================================
// Email Schemas
// ============================================================
export {
  // Core Email Schema
  EmailSchema,
  StrictEmailSchema,
  BangladeshEmailSchema,
  EducationalEmailSchema,
  GovernmentEmailSchema,
  CorporateEmailSchema,
  EmailWithSubaddressSchema,
  
  // Contextual Email Schemas
  LoginEmailSchema,
  RegistrationEmailSchema,
  ProfessionalEmailSchema,
  
  // Phone Schema (for WhatsApp/Imo OTP)
  BangladeshPhoneSchema,
  
  // Utility Functions
  getEmailCategory,
  isValidEmail,
  isFreeEmail,
  isDisposableEmail,
  isBangladeshEmail,
  isEducationalEmail,
  isGovernmentEmail,
  normalizeEmail,
  maskEmail,
} from './email.schema';

// ============================================================
// Phone Schemas (NEW - Enterprise Grade)
// ============================================================
export {
  // Base Schemas
  BasePhoneSchema,
  PhoneSchema,
  LenientPhoneSchema,
  PhoneWithOperatorSchema,
  PhoneWithTypeSchema,
  
  // Request/Response Schemas
  PhoneVerificationRequestSchema,
  PhoneVerificationResponseSchema,
  
  // Batch Schemas
  PhoneListSchema,
  PhoneListWithOperatorSchema,
  
  // MFA Phone Schemas
  MFAPhoneSchema,
  WhatsAppPhoneSchema,
  VoiceCallPhoneSchema,
  
  // Components Schema
  PhoneComponentsSchema,
  
  // Error Schema
  PhoneErrorSchema,
  
  // Helper Functions
  isValidBangladeshMobile,
  getBangladeshOperator,
  normalizeBangladeshPhone,
  maskPhoneNumber,
} from './phone.schema';

export type {
  // From mfa.schema
  MFAProvider,
  MFAVerificationType,
  MFAStatus,
  OTPCode,
  BackupCode,
  MFAMethodId,
  MFAChallengeId,
  TOTPSecret,
  WebAuthnChallenge,
  MFASetupRequest,
  MFAVerifyRequest,
  MFARecoveryRequest,
  MFAChallengeRequest,
  DisableMFARequest,
  TOTPSetupRequest,
  WebAuthnRegistrationRequest,
  WebAuthnAuthRequest,
  WhatsAppMFARequest,
  MFSMFARequest,
  MFASetupResponse,
  MFAChallengeResponse,
  MFAVerifyResponse,
  MFARecoveryResponse,
  MFAMethod,
  MFAStatusResponse,
  TOTPSetupResponse,
  WebAuthnRegistrationResponse,
  WebAuthnAuthResponse,
} from './mfa.schema';

export type {
  // From verification.schema
  VerificationType,
  VerificationStatus,
  VerificationMethod,
  VerificationToken,
  VerificationCode,
  SessionId,
  SendVerificationRequest,
  VerifyEmailRequest,
  VerifyCodeRequest,
  ResendVerificationRequest,
  MagicLinkRequest,
  MagicLinkVerifyRequest,
  EmailChangeRequest,
  EmailChangeVerifyRequest,
  PhoneChangeRequest,
  PhoneChangeVerifyRequest,
  SendOTPRequest,
  ResendOTPRequest,
  WhatsAppVerificationRequest,
  VoiceVerificationRequest,
  VerificationResponse,
  ResendVerificationResponse,
  VerificationStatusResponse,
  MagicLinkResponse,
  MagicLinkVerifyResponse,
  SendOTPResponse,
  EmailChangeResponse,
  PhoneChangeResponse,
  WhatsAppVerificationResponse,
  VoiceVerificationResponse,
  VerificationError,
} from './verification.schema';

export type {
  // From password-reset.schema
  ResetEmail,
  ResetPhone,
  ResetPassword,
  ResetPasswordStrength,
  ResetVerificationToken,
  ResetUserId,
  ResetSessionId,
  ResetCaptchaToken,
  ForgotPasswordRequest,
  ForgotPasswordPhoneRequest,
  ResetPasswordRequest,
  StrongResetPasswordRequest,
  ValidateResetTokenRequest,
  RequestResetOTPRequest,
  VerifyResetOTPRequest,
  ForgotPasswordResponse,
  ForgotPasswordPhoneResponse,
  ResetPasswordResponse,
  TokenValidationResponse,
  RequestResetOTPResponse,
  VerifyResetOTPResponse,
  PasswordResetError,
} from './password-reset.schema';

export type {
  // From social.schema
  SocialProvider,
  OAuthState,
  OAuthCode,
  OAuthScope,
  RedirectUri,
  PKCECodeVerifier,
  PKCECodeChallenge,
  GoogleOAuthData,
  FacebookOAuthData,
  GitHubOAuthData,
  AppleOAuthData,
  WhatsAppOAuthData,
  BkashOAuthData,
  NagadOAuthData,
  RocketOAuthData,
  SocialLoginRequest,
  SocialLoginResponse,
  SocialCallbackRequest,
  SocialConnectRequest,
  SocialDisconnectRequest,
  SocialOTPRequest,
  SocialOTPVerificationRequest,
  MFSAuthRequest,
  SocialUserInfo,
  SocialCallbackResponse,
  SocialAccount,
  SocialAccountsResponse,
  SocialOTPResponse,
  MFSAuthResponse,
  SocialAuthError,
} from './social.schema';

export type {
  // From email.schema
  EmailCategory,
  EmailBranded,
} from './email.schema';

export type {
  // From phone.schema
  Phone as PhoneType,
  LenientPhone,
  PhoneWithOperator,
  PhoneWithType,
  PhoneVerificationRequest,
  PhoneVerificationResponse,
  PhoneList,
  PhoneListWithOperator,
  MFAPhone,
  WhatsAppPhone,
  VoiceCallPhone,
  PhoneComponents,
  PhoneError,
  BDMobilePrefix,
  BDOperator,
} from './phone.schema';
