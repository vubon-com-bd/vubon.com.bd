// packages/backend-service/src/auth/module/application/dtos/auth/index.ts

/**
 * Auth DTOs Exports
 * Central export point for all authentication-related DTOs
 */

// ✅ Export Register DTO
export { RegisterDto } from './register.dto';
export type { RegisterDtoProps } from './register.dto';

// ✅ Export Login DTO
export { LoginDto } from './login.dto';
export type { LoginDtoProps, LoginDeviceInfo } from './login.dto';

// ✅ Export Login Response DTO
export { LoginResponseDto } from './login-response.dto';
export type { LoginResponseDtoProps, LoginUserResponseDto } from './login-response.dto';

// ✅ Export Refresh Token DTO
export { RefreshTokenDto } from './refresh-token.dto';
export type { RefreshTokenDtoProps } from './refresh-token.dto';

// ✅ Export Logout DTO
export { LogoutDto } from './logout.dto';
export type { LogoutDtoProps } from './logout.dto';

// ✅ Export Email Verification DTOs
export {
  SendVerificationEmailDto,
  VerifyEmailDto,
  ResendVerificationEmailDto,
} from './email-verification.dto';
export type {
  SendVerificationEmailDtoProps,
  VerifyEmailDtoProps,
  ResendVerificationEmailDtoProps,
} from './email-verification.dto';

// ✅ Export Password Reset DTOs
export { ForgotPasswordDto } from './forgot-password.dto';
export type { ForgotPasswordDtoProps } from './forgot-password.dto';
export { ResetPasswordDto } from './reset-password.dto';
export type { ResetPasswordDtoProps } from './reset-password.dto';

// ✅ Export MFA DTOs
export { EnableMfaDto } from './enable-mfa.dto';
export type { EnableMfaDtoProps } from './enable-mfa.dto';
export { VerifyMfaDto } from './verify-mfa.dto';
export type { VerifyMfaDtoProps } from './verify-mfa.dto';
export { DisableMfaDto } from './disable-mfa.dto';
export type { DisableMfaDtoProps } from './disable-mfa.dto';

// ✅ Export Session DTOs
// export { SessionDto } from './session.dto';
// export { RevokeSessionDto } from './revoke-session.dto';
// export type { SessionDtoProps } from './session.dto';

// ✅ Export Profile DTOs
// export { UpdateProfileDto } from './update-profile.dto';
// export { UserPreferencesDto } from './user-preferences.dto';
// export { DeleteAccountDto } from './delete-account.dto';
// export type { UpdateProfileDtoProps } from './update-profile.dto';

// ✅ Export Social Login DTOs
// export { SocialLoginDto } from './social-login.dto';
// export { SocialCallbackDto } from './social-callback.dto';
// export type { SocialLoginDtoProps } from './social-login.dto';

// ✅ Export Admin DTOs
// export { AdminUserListDto } from './admin-user-list.dto';
// export { AdminUpdateUserDto } from './admin-update-user.dto';
// export { AdminCreateUserDto } from './admin-create-user.dto';
// export type { AdminUserListDtoProps } from './admin-user-list.dto';
