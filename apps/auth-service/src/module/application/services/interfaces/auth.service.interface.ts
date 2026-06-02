/**
 * Auth Service Interface - Pure Domain Contract
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/auth.service.interface
 * 
 * @description
 * Service contract for authentication operations.
 * NO implementation - ONLY method signatures.
 * 
 * Enterprise Rules:
 * ✅ ONLY interface definitions
 * ✅ No business logic
 * ✅ No infrastructure imports
 * ✅ No framework decorators
 * ✅ Complete DTO-based contract
 * ✅ Bangladesh specific - Phone-based authentication
 */

import {
  LoginDto,
  LoginResponseDto,
  MFARequiredResponseDto,
  LogoutResponseDto
} from '../../dtos/auth/login.dto';
import {
  RegisterDto,
  RegisterResponseDto,
  EmailVerificationRequiredResponseDto,
  PhoneVerificationRequiredResponseDto,
  ResendVerificationResponseDto
} from '../../dtos/auth/register.dto';
import { RefreshTokenDto, TokenRefreshResponseDto } from '../../dtos/auth/refresh-token.dto';
import { LogoutDto, LogoutAllDevicesResponseDto } from '../../dtos/auth/logout.dto';
import {
  SocialLoginDto,
  SocialLoginResponseDto,
  SocialLinkDto,
  SocialLinkResponseDto,
  SocialUnlinkDto,
  SocialUnlinkResponseDto,
  ListLinkedAccountsResponseDto,
  SocialPhoneLoginDto
} from '../../dtos/auth/social-login.dto';
import {
  ChangePasswordDto,
  ChangePasswordResponseDto,
  ValidateCurrentPasswordResponseDto,
  PasswordRulesResponseDto
} from '../../dtos/user/change-password.dto';
import {
  ForgotPasswordDto,
  ForgotPasswordResponseDto,
  ForgotPasswordPhoneDto,
  ResetPasswordDto,
  ResetPasswordResponseDto,
  ValidateResetTokenResponseDto,
  ResetPasswordWithOtpDto,
  VerifyResetOtpDto
} from '../../dtos/user/forgot-password.dto';
import {
  VerifyMfaDto,
  MfaVerifyResponseDto,
  MfaSetupVerifyResponseDto
} from '../../dtos/mfa/verify-mfa.dto';
import {
  EnableMfaDto,
  EnableMfaResponseDto,
  MFAStatusResponseDto,
  DisableMfaDto,
  DisableMfaResponseDto
} from '../../dtos/mfa/enable-mfa.dto';

// ✅ Phase-1 (shared-types) থেকে ইম্পোর্ট - DeviceInfo টাইপ কেন্দ্রীভূত
import type { DeviceInfo } from '@vubon/shared-types';

// ============================================================
// Enums & Constants (For type safety)
// ============================================================

// ✅ Phase-1 (shared-constants) থেকে ইম্পোর্ট - কেন্দ্রীভূত কনফিগারেশন
import { 
  MFA_METHODS, 
  SOCIAL_PROVIDERS,
  LOGIN_METHODS,
  PASSWORD_POLICY 
} from '@vubon/shared-constants';

// Re-export types for convenience
export type { DeviceInfo };

// ============================================================
// Auth Service Interface
// ============================================================

/**
 * Contract for all authentication-related operations
 */
export interface AuthService {
  // ============================================================
  // Authentication
  // ============================================================
  
  /**
   * Authenticate user with email and password
   * @param dto - Login credentials
   * @param deviceInfo - Device context for security
   * @returns Login response or MFA required response
   */
  login(
    dto: LoginDto,
    deviceInfo: DeviceInfo
  ): Promise<LoginResponseDto | MFARequiredResponseDto>;
  
  /**
   * Authenticate user with phone number and password (Bangladesh specific)
   * @param phoneNumber - Phone number
   * @param password - Password
   * @param deviceInfo - Device context
   * @returns Login response or MFA required response
   */
  phoneLogin(
    phoneNumber: string,
    password: string,
    deviceInfo: DeviceInfo
  ): Promise<LoginResponseDto | MFARequiredResponseDto>;
  
  /**
   * Authenticate user with OTP (passwordless)
   * @param phoneNumber - Phone number
   * @param otpCode - OTP code
   * @param deviceInfo - Device context
   * @returns Login response
   */
  otpLogin(
    phoneNumber: string,
    otpCode: string,
    deviceInfo: DeviceInfo
  ): Promise<LoginResponseDto>;
  
  /**
   * Register new user
   * @param dto - Registration data
   * @param deviceInfo - Device context
   * @returns Registration response
   */
  register(
    dto: RegisterDto,
    deviceInfo: DeviceInfo
  ): Promise<RegisterResponseDto | EmailVerificationRequiredResponseDto | PhoneVerificationRequiredResponseDto>;
  
  /**
   * Register user with phone only (Bangladesh specific)
   * @param phoneNumber - Phone number
   * @param fullName - Full name
   * @param deviceInfo - Device context
   * @returns Registration response with OTP required
   */
  phoneRegister(
    phoneNumber: string,
    fullName: string,
    deviceInfo: DeviceInfo
  ): Promise<PhoneVerificationRequiredResponseDto>;
  
  /**
   * Refresh access token
   * @param dto - Refresh token data
   * @param deviceInfo - Device context
   * @returns New token response
   */
  refreshToken(
    dto: RefreshTokenDto,
    deviceInfo: DeviceInfo
  ): Promise<TokenRefreshResponseDto>;
  
  /**
   * Logout user
   * @param dto - Logout data
   * @param userId - User ID from JWT
   * @param deviceInfo - Device context
   * @returns Logout response
   */
  logout(
    dto: LogoutDto,
    userId: string,
    deviceInfo: DeviceInfo
  ): Promise<LogoutResponseDto>;
  
  /**
   * Logout from all devices
   * @param userId - User ID from JWT
   * @param deviceInfo - Device context
   * @returns Logout all devices response
   */
  logoutAllDevices(
    userId: string,
    deviceInfo: DeviceInfo
  ): Promise<LogoutAllDevicesResponseDto>;
  
  // ============================================================
  // Email/Phone Verification
  // ============================================================
  
  /**
   * Verify email address
   * @param token - Verification token
   * @param deviceInfo - Device context
   * @returns Success message
   */
  verifyEmail(
    token: string,
    deviceInfo: DeviceInfo
  ): Promise<{ message: string; messageBn?: string }>;
  
  /**
   * Verify phone number with OTP
   * @param phoneNumber - Phone number
   * @param otpCode - OTP code
   * @param deviceInfo - Device context
   * @returns Verification result
   */
  verifyPhone(
    phoneNumber: string,
    otpCode: string,
    deviceInfo: DeviceInfo
  ): Promise<{ success: boolean; message: string; messageBn?: string }>;
  
  /**
   * Resend verification email
   * @param email - User email
   * @param deviceInfo - Device context
   * @returns Resend response
   */
  resendVerificationEmail(
    email: string,
    deviceInfo: DeviceInfo
  ): Promise<ResendVerificationResponseDto>;
  
  /**
   * Resend verification OTP (Bangladesh specific)
   * @param phoneNumber - Phone number
   * @param method - SMS or WhatsApp
   * @param deviceInfo - Device context
   * @returns Resend response
   */
  resendVerificationOtp(
    phoneNumber: string,
    method: 'sms' | 'whatsapp',
    deviceInfo: DeviceInfo
  ): Promise<ResendVerificationResponseDto>;
  
  // ============================================================
  // Password Management
  // ============================================================
  
  /**
   * Initiate forgot password flow (email)
   * @param dto - Forgot password data
   * @param deviceInfo - Device context
   * @returns Always success response (no user enumeration)
   */
  forgotPassword(
    dto: ForgotPasswordDto,
    deviceInfo: DeviceInfo
  ): Promise<ForgotPasswordResponseDto>;
  
  /**
   * Initiate forgot password flow (phone - Bangladesh specific)
   * @param dto - Forgot password phone data
   * @param deviceInfo - Device context
   * @returns Response with OTP sent
   */
  forgotPasswordPhone(
    dto: ForgotPasswordPhoneDto,
    deviceInfo: DeviceInfo
  ): Promise<ForgotPasswordResponseDto>;
  
  /**
   * Reset password with token
   * @param dto - Reset password data
   * @param deviceInfo - Device context
   * @returns Reset response
   */
  resetPassword(
    dto: ResetPasswordDto,
    deviceInfo: DeviceInfo
  ): Promise<ResetPasswordResponseDto>;
  
  /**
   * Reset password with OTP (Bangladesh specific)
   * @param dto - Reset password with OTP data
   * @param deviceInfo - Device context
   * @returns Reset response
   */
  resetPasswordWithOtp(
    dto: ResetPasswordWithOtpDto,
    deviceInfo: DeviceInfo
  ): Promise<ResetPasswordResponseDto>;
  
  /**
   * Verify reset OTP (before password reset)
   * @param dto - Verify OTP data
   * @param deviceInfo - Device context
   * @returns Verification result with reset token
   */
  verifyResetOtp(
    dto: VerifyResetOtpDto,
    deviceInfo: DeviceInfo
  ): Promise<{ success: boolean; resetToken?: string; expiresInSeconds?: number }>;
  
  /**
   * Validate reset token (for UI)
   * @param token - Reset token
   * @returns Token validation result
   */
  validateResetToken(token: string): Promise<ValidateResetTokenResponseDto>;
  
  /**
   * Change password for authenticated user
   * @param userId - User ID from JWT
   * @param dto - Password change data
   * @param deviceInfo - Device context
   * @returns Change password response
   */
  changePassword(
    userId: string,
    dto: ChangePasswordDto,
    deviceInfo: DeviceInfo
  ): Promise<ChangePasswordResponseDto>;
  
  /**
   * Validate current password (for sensitive actions)
   * @param userId - User ID from JWT
   * @param password - Current password
   * @returns Validation result
   */
  validateCurrentPassword(
    userId: string,
    password: string
  ): Promise<ValidateCurrentPasswordResponseDto>;
  
  /**
   * Get password validation rules
   * @returns Password rules (using centralized constants)
   */
  getPasswordRules(): Promise<PasswordRulesResponseDto>;
  
  // ============================================================
  // MFA Management
  // ============================================================
  
  /**
   * Enable MFA for user
   * @param userId - User ID from JWT
   * @param dto - Enable MFA data
   * @param deviceInfo - Device context
   * @returns Setup data (secret, QR code, backup codes)
   */
  enableMFA(
    userId: string,
    dto: EnableMfaDto,
    deviceInfo: DeviceInfo
  ): Promise<EnableMfaResponseDto>;
  
  /**
   * Verify and complete MFA setup
   * @param userId - User ID from JWT
   * @param dto - Verification data
   * @param deviceInfo - Device context
   * @returns Setup verification response
   */
  verifyMFASetup(
    userId: string,
    dto: VerifyMfaDto,
    deviceInfo: DeviceInfo
  ): Promise<MfaSetupVerifyResponseDto>;
  
  /**
   * Verify MFA code after login
   * @param dto - MFA verification data
   * @param deviceInfo - Device context
   * @returns Login response on success
   */
  verifyMFA(
    dto: VerifyMfaDto,
    deviceInfo: DeviceInfo
  ): Promise<MfaVerifyResponseDto>;
  
  /**
   * Disable MFA for user
   * @param userId - User ID from JWT
   * @param dto - Disable MFA data
   * @param deviceInfo - Device context
   * @returns Disable response
   */
  disableMFA(
    userId: string,
    dto: DisableMfaDto,
    deviceInfo: DeviceInfo
  ): Promise<DisableMfaResponseDto>;
  
  /**
   * Get MFA status for user
   * @param userId - User ID from JWT
   * @returns MFA status (with available methods from constants)
   */
  getMFAStatus(userId: string): Promise<MFAStatusResponseDto>;
  
  /**
   * Generate new backup codes
   * @param userId - User ID from JWT
   * @param deviceInfo - Device context
   * @returns New backup codes
   */
  regenerateBackupCodes(
    userId: string,
    deviceInfo: DeviceInfo
  ): Promise<{ backupCodes: string[] }>;
  
  // ============================================================
  // Social Authentication
  // ============================================================
  
  /**
   * Social login with provider token
   * @param dto - Social login data
   * @param deviceInfo - Device context
   * @returns Login response
   */
  socialLogin(
    dto: SocialLoginDto,
    deviceInfo: DeviceInfo
  ): Promise<SocialLoginResponseDto>;
  
  /**
   * Social login with phone (WhatsApp/Imo - Bangladesh specific)
   * @param dto - Social phone login data
   * @param deviceInfo - Device context
   * @returns Login response
   */
  socialPhoneLogin(
    dto: SocialPhoneLoginDto,
    deviceInfo: DeviceInfo
  ): Promise<SocialLoginResponseDto>;
  
  /**
   * Link social account to existing user
   * @param userId - User ID from JWT
   * @param dto - Social link data
   * @param deviceInfo - Device context
   * @returns Link response
   */
  linkSocialAccount(
    userId: string,
    dto: SocialLinkDto,
    deviceInfo: DeviceInfo
  ): Promise<SocialLinkResponseDto>;
  
  /**
   * Unlink social account
   * @param userId - User ID from JWT
   * @param dto - Social unlink data
   * @param deviceInfo - Device context
   * @returns Unlink response
   */
  unlinkSocialAccount(
    userId: string,
    dto: SocialUnlinkDto,
    deviceInfo: DeviceInfo
  ): Promise<SocialUnlinkResponseDto>;
  
  /**
   * List linked social accounts
   * @param userId - User ID from JWT
   * @returns List of linked accounts
   */
  listLinkedAccounts(userId: string): Promise<ListLinkedAccountsResponseDto>;
  
  /**
   * Handle OAuth callback
   * @param provider - Social provider
   * @param code - Authorization code
   * @param state - OAuth state parameter
   * @param deviceInfo - Device context
   * @returns Login response
   */
  handleOAuthCallback(
    provider: string,
    code: string,
    state: string,
    deviceInfo: DeviceInfo
  ): Promise<SocialLoginResponseDto>;
  
  /**
   * Get OAuth authorization URL
   * @param provider - Social provider
   * @param redirectUri - Redirect URI
   * @param state - OAuth state parameter
   * @returns Authorization URL
   */
  getOAuthUrl(
    provider: string,
    redirectUri: string,
    state: string
  ): Promise<{ url: string; state: string }>;
}

// ============================================================
// Re-export constants for convenience
// ============================================================

export { MFA_METHODS, SOCIAL_PROVIDERS, LOGIN_METHODS, PASSWORD_POLICY };
