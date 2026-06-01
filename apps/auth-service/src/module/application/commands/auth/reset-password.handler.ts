/**
 * Reset Password Command Handler - Application Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/reset-password.handler
 * 
 * @description
 * Handles password reset use case with security features including:
 * - Token validation with expiry (email-based)
 * - OTP validation (phone-based - Bangladesh specific)
 * - Password strength validation
 * - Password history check (prevent reuse)
 * - Session revocation
 * - Audit logging
 * - Email/WhatsApp/SMS notification
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only password reset
 * ✅ Repository coordination
 * ✅ Event publishing
 * ✅ Security validation
 * ✅ Transaction management
 * ✅ Bangladesh specific - OTP-based reset support
 */

import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { ResetPasswordCommand, ResetPasswordWithOtpCommand, ValidateResetTokenCommand, VerifyResetOtpCommand, ResendResetOtpCommand } from './reset-password.command';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { PasswordResetRepository } from '../../../domain/repositories/password-reset.repository.interface';
import { PasswordHistoryRepository } from '../../../domain/repositories/password-history.repository.interface';

import { Password } from '../../../domain/value-objects/password.vo';
import { Token, TokenType } from '../../../domain/value-objects/token.vo';
import { Email } from '../../../domain/value-objects/email.vo';
import { Phone } from '../../../domain/value-objects/phone.vo';

import { PasswordChangedEvent, PasswordChangeType, PasswordChangeReason } from '../../events/password-changed.event';
import { PasswordResetEvent, PasswordResetEventType } from '../../events/password-reset.event';

import { PasswordHasher, EventBus, AuditService, TransactionManager, NotificationService, TokenVerifier, CacheService, MfaGenerator } from './infrastructure.interface';

// ============================================================
// Constants
// ============================================================

const PASSWORD_CONFIG = {
  PREVENT_REUSE_COUNT: 5,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
};

const OTP_CONFIG = {
  LENGTH: 6,
  EXPIRY_SECONDS: 300,
  RESEND_COOLDOWN_SECONDS: 30,
  MAX_VERIFICATION_ATTEMPTS: 3,
};

// ============================================================
// Reset Password Handler (Token-based - Email)
// ============================================================

@Injectable()
export class ResetPasswordHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly passwordResetRepository: PasswordResetRepository,
    private readonly passwordHistoryRepository: PasswordHistoryRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenVerifier: TokenVerifier,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly transactionManager: TransactionManager,
    private readonly notificationService: NotificationService,
    private readonly cacheService: CacheService,
    private readonly mfaGenerator: MfaGenerator
  ) {}
  
  // ============================================================
  // Token-based Reset (Email)
  // ============================================================
  
  async execute(command: ResetPasswordCommand): Promise<{ message: string; messageBn?: string }> {
    const { token: tokenValue, newPassword: newPasswordRaw, confirmPassword, deviceInfo, correlationId } = command;
    
    // 0. Validate passwords match
    if (newPasswordRaw !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    
    // 1. Validate token format
    let token: Token;
    try {
      token = new Token(tokenValue, TokenType.RESET);
    } catch (error) {
      await this.auditService.security('PASSWORD_RESET_INVALID_TOKEN', undefined, {
        tokenPreview: tokenValue.substring(0, 20),
        ipAddress: deviceInfo?.ipAddress,
        correlationId,
      });
      throw new BadRequestException('Invalid reset token format');
    }
    
    // 2. Find password reset request
    const passwordReset = await this.passwordResetRepository.findByToken(token);
    
    if (!passwordReset) {
      await this.auditService.security('PASSWORD_RESET_TOKEN_NOT_FOUND', undefined, {
        tokenId: tokenValue.substring(0, 20),
        ipAddress: deviceInfo?.ipAddress,
        correlationId,
      });
      throw new BadRequestException('Invalid or expired reset token');
    }
    
    // 3. Check if token is expired
    if (passwordReset.isExpired()) {
      await this.auditService.security('PASSWORD_RESET_TOKEN_EXPIRED', passwordReset.getUserId(), {
        tokenId: passwordReset.getId(),
        ipAddress: deviceInfo?.ipAddress,
        correlationId,
      });
      throw new BadRequestException('Reset token has expired. Please request a new one.');
    }
    
    // 4. Check if token is already used
    if (passwordReset.isUsed()) {
      await this.auditService.security('PASSWORD_RESET_TOKEN_ALREADY_USED', passwordReset.getUserId(), {
        tokenId: passwordReset.getId(),
        ipAddress: deviceInfo?.ipAddress,
        correlationId,
      });
      throw new BadRequestException('Reset token has already been used');
    }
    
    // 5. Verify token signature
    const isValidToken = await this.tokenVerifier.verify(passwordReset.getToken(), tokenValue);
    if (!isValidToken) {
      await this.auditService.security('PASSWORD_RESET_TOKEN_INVALID_SIGNATURE', passwordReset.getUserId(), {
        tokenId: passwordReset.getId(),
        ipAddress: deviceInfo?.ipAddress,
        correlationId,
      });
      throw new BadRequestException('Invalid reset token');
    }
    
    // 6. Get user
    const user = await this.userRepository.findById(passwordReset.getUserId());
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    // 7. Check account status
    if (user.isLocked()) {
      throw new UnauthorizedException('Account is locked. Cannot reset password.');
    }
    if (!user.isActive()) {
      throw new UnauthorizedException('Account is inactive. Please contact support.');
    }
    
    // 8. Validate new password strength
    let newPassword: Password;
    try {
      newPassword = new Password(newPasswordRaw);
      const validation = Password.validate(newPasswordRaw);
      
      if (!validation.isValid) {
        throw new BadRequestException(validation.errors.join(', '));
      }
      
      if (validation.strength === 'very_weak') {
        throw new BadRequestException('Password is too weak. Please choose a stronger password.');
      }
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException('Invalid password format');
    }
    
    // 9. Check password history (prevent reuse)
    const recentPasswords = await this.passwordHistoryRepository.getRecent(
      user.getId(),
      PASSWORD_CONFIG.PREVENT_REUSE_COUNT
    );
    
    for (const oldPasswordHash of recentPasswords) {
      const isReused = await this.passwordHasher.compare(newPasswordRaw, oldPasswordHash);
      if (isReused) {
        throw new BadRequestException(
          `Cannot reuse one of your last ${PASSWORD_CONFIG.PREVENT_REUSE_COUNT} passwords`
        );
      }
    }
    
    // 10. Hash new password
    const hashedPassword = await this.passwordHasher.hash(newPassword.getValue());
    
    // 11. Execute password reset with transaction
    let sessionsRevoked = 0;
    
    await this.transactionManager.runInTransaction(async () => {
      // Change password
      user.changePassword(new Password(hashedPassword));
      await this.userRepository.save(user);
      
      // Save to password history
      await this.passwordHistoryRepository.add(user.getId(), hashedPassword);
      
      // Mark password reset as used
      passwordReset.markUsed();
      await this.passwordResetRepository.save(passwordReset);
      
      // Revoke all active sessions (security measure)
      sessionsRevoked = await this.sessionRepository.revokeAllByUserId(
        user.getId(),
        'Password reset'
      );
    });
    
    // 12. Clear password reset attempts from cache
    await this.cacheService.del(`password_reset_attempts:${user.getId()}`);
    
    // 13. Publish event
    await this.eventBus.publish(
      new PasswordChangedEvent(
        user.getId(),
        PasswordChangeType.USER_RESET,
        PasswordChangeReason.FORGOT_PASSWORD,
        correlationId,
        undefined,
        deviceInfo?.deviceId,
        deviceInfo?.ipAddress,
        deviceInfo?.userAgent,
        undefined,
        `Password reset via forgot password flow. Sessions revoked: ${sessionsRevoked}`
      )
    );
    
    // 14. Send confirmation notification
    await this.notificationService.sendPasswordResetConfirmation(
      user.getId(),
      user.getEmail().getValue(),
      deviceInfo
    );
    
    // 15. Audit log
    await this.auditService.log({
      action: 'PASSWORD_RESET_SUCCESS',
      userId: user.getId(),
      email: user.getEmail().getValue(),
      tokenId: passwordReset.getId(),
      sessionsRevoked,
      ipAddress: deviceInfo?.ipAddress,
      deviceId: deviceInfo?.deviceId,
      userAgent: deviceInfo?.userAgent,
      correlationId,
    });
    
    return {
      message: 'Password reset successful. You can now log in with your new password.',
      messageBn: 'পাসওয়ার্ড রিসেট সফল হয়েছে। আপনি এখন আপনার নতুন পাসওয়ার্ড দিয়ে লগইন করতে পারেন।',
    };
  }
  
  // ============================================================
  // OTP-based Reset (Phone - Bangladesh specific)
  // ============================================================
  
  async executeWithOtp(command: ResetPasswordWithOtpCommand): Promise<{ message: string; messageBn?: string }> {
    const { phoneNumber, otpCode, newPassword: newPasswordRaw, confirmPassword, deviceInfo, sessionId, correlationId } = command;
    
    // 0. Validate passwords match
    if (newPasswordRaw !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    
    // 1. Validate phone number
    let phone: Phone;
    try {
      phone = new Phone(phoneNumber);
      if (!phone.isBangladesh()) {
        throw new BadRequestException('Only Bangladesh phone numbers are supported for OTP reset');
      }
    } catch (error) {
      throw new BadRequestException('Invalid phone number format');
    }
    
    // 2. Verify OTP from cache
    const cacheKey = `reset_otp:${phone.getE164()}`;
    const storedOtp = await this.cacheService.get<string>(cacheKey);
    
    if (!storedOtp || storedOtp !== otpCode) {
      // Track failed attempts
      const attemptsKey = `reset_otp_attempts:${phone.getE164()}`;
      const attempts = await this.cacheService.incr(attemptsKey);
      await this.cacheService.expire(attemptsKey, OTP_CONFIG.EXPIRY_SECONDS);
      
      await this.auditService.security('PASSWORD_RESET_OTP_INVALID', undefined, {
        phoneNumber: phone.getE164(),
        attempts,
        ipAddress: deviceInfo?.ipAddress,
        correlationId,
      });
      
      const remainingAttempts = OTP_CONFIG.MAX_VERIFICATION_ATTEMPTS - attempts;
      throw new BadRequestException(`Invalid OTP code. ${remainingAttempts} attempts remaining.`);
    }
    
    // 3. Get user by phone
    const user = await this.userRepository.findByPhone(phone);
    if (!user) {
      throw new NotFoundException('No account found with this phone number');
    }
    
    // 4. Check account status
    if (user.isLocked()) {
      throw new UnauthorizedException('Account is locked. Cannot reset password.');
    }
    if (!user.isActive()) {
      throw new UnauthorizedException('Account is inactive. Please contact support.');
    }
    
    // 5. Validate new password strength
    let newPassword: Password;
    try {
      newPassword = new Password(newPasswordRaw);
      const validation = Password.validate(newPasswordRaw);
      
      if (!validation.isValid) {
        throw new BadRequestException(validation.errors.join(', '));
      }
      
      if (validation.strength === 'very_weak') {
        throw new BadRequestException('Password is too weak. Please choose a stronger password.');
      }
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException('Invalid password format');
    }
    
    // 6. Check password history (prevent reuse)
    const recentPasswords = await this.passwordHistoryRepository.getRecent(
      user.getId(),
      PASSWORD_CONFIG.PREVENT_REUSE_COUNT
    );
    
    for (const oldPasswordHash of recentPasswords) {
      const isReused = await this.passwordHasher.compare(newPasswordRaw, oldPasswordHash);
      if (isReused) {
        throw new BadRequestException(
          `Cannot reuse one of your last ${PASSWORD_CONFIG.PREVENT_REUSE_COUNT} passwords`
        );
      }
    }
    
    // 7. Hash new password
    const hashedPassword = await this.passwordHasher.hash(newPassword.getValue());
    
    // 8. Execute password reset with transaction
    let sessionsRevoked = 0;
    
    await this.transactionManager.runInTransaction(async () => {
      user.changePassword(new Password(hashedPassword));
      await this.userRepository.save(user);
      await this.passwordHistoryRepository.add(user.getId(), hashedPassword);
      sessionsRevoked = await this.sessionRepository.revokeAllByUserId(user.getId(), 'Password reset via OTP');
    });
    
    // 9. Clear OTP from cache
    await this.cacheService.del(cacheKey);
    await this.cacheService.del(`reset_otp_attempts:${phone.getE164()}`);
    
    // 10. Publish event
    await this.eventBus.publish(
      new PasswordChangedEvent(
        user.getId(),
        PasswordChangeType.USER_RESET,
        PasswordChangeReason.FORGOT_PASSWORD,
        correlationId,
        undefined,
        deviceInfo?.deviceId,
        deviceInfo?.ipAddress,
        deviceInfo?.userAgent,
        undefined,
        `Password reset via OTP. Sessions revoked: ${sessionsRevoked}`
      )
    );
    
    // 11. Send confirmation notification
    await this.notificationService.sendPasswordResetConfirmation(
      user.getId(),
      user.getEmail()?.getValue(),
      deviceInfo
    );
    
    // 12. Audit log
    await this.auditService.log({
      action: 'PASSWORD_RESET_OTP_SUCCESS',
      userId: user.getId(),
      phoneNumber: phone.getE164(),
      sessionsRevoked,
      ipAddress: deviceInfo?.ipAddress,
      deviceId: deviceInfo?.deviceId,
      correlationId,
    });
    
    return {
      message: 'Password reset successful. You can now log in with your new password.',
      messageBn: 'পাসওয়ার্ড রিসেট সফল হয়েছে। আপনি এখন আপনার নতুন পাসওয়ার্ড দিয়ে লগইন করতে পারেন।',
    };
  }
  
  // ============================================================
  // Validate Reset Token
  // ============================================================
  
  async validateToken(command: ValidateResetTokenCommand): Promise<{ valid: boolean; userId?: string; email?: string; expiresAt?: Date }> {
    const { token: tokenValue, correlationId } = command;
    
    try {
      const token = new Token(tokenValue, TokenType.RESET);
      const passwordReset = await this.passwordResetRepository.findByToken(token);
      
      if (!passwordReset || passwordReset.isExpired() || passwordReset.isUsed()) {
        return { valid: false };
      }
      
      const isValidToken = await this.tokenVerifier.verify(passwordReset.getToken(), tokenValue);
      if (!isValidToken) {
        return { valid: false };
      }
      
      const user = await this.userRepository.findById(passwordReset.getUserId());
      if (!user) {
        return { valid: false };
      }
      
      return {
        valid: true,
        userId: user.getId(),
        email: user.getEmail().getValue(),
        expiresAt: passwordReset.getExpiresAt(),
      };
    } catch (error) {
      return { valid: false };
    }
  }
  
  // ============================================================
  // Verify Reset OTP
  // ============================================================
  
  async verifyOtp(command: VerifyResetOtpCommand): Promise<{ valid: boolean; resetToken?: string; expiresIn?: number }> {
    const { phoneNumber, otpCode, sessionId, deviceInfo, correlationId } = command;
    
    // Validate phone number
    let phone: Phone;
    try {
      phone = new Phone(phoneNumber);
    } catch (error) {
      throw new BadRequestException('Invalid phone number format');
    }
    
    // Verify OTP from cache
    const cacheKey = `reset_otp:${phone.getE164()}`;
    const storedOtp = await this.cacheService.get<string>(cacheKey);
    
    if (!storedOtp || storedOtp !== otpCode) {
      const attemptsKey = `reset_otp_attempts:${phone.getE164()}`;
      const attempts = await this.cacheService.incr(attemptsKey);
      await this.cacheService.expire(attemptsKey, OTP_CONFIG.EXPIRY_SECONDS);
      
      await this.auditService.security('PASSWORD_RESET_OTP_VERIFY_FAILED', undefined, {
        phoneNumber: phone.getE164(),
        attempts,
        ipAddress: deviceInfo?.ipAddress,
        correlationId,
      });
      
      const remainingAttempts = OTP_CONFIG.MAX_VERIFICATION_ATTEMPTS - attempts;
      throw new BadRequestException(`Invalid OTP code. ${remainingAttempts} attempts remaining.`);
    }
    
    // Generate reset token for successful OTP verification
    const user = await this.userRepository.findByPhone(phone);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    // Generate a temporary reset token
    const resetToken = await this.tokenVerifier.generate({
      userId: user.getId(),
      type: 'reset',
      expiresIn: '15m',
    });
    
    // Clear OTP from cache
    await this.cacheService.del(cacheKey);
    await this.cacheService.del(`reset_otp_attempts:${phone.getE164()}`);
    
    await this.auditService.log({
      action: 'PASSWORD_RESET_OTP_VERIFIED',
      userId: user.getId(),
      phoneNumber: phone.getE164(),
      ipAddress: deviceInfo?.ipAddress,
      correlationId,
    });
    
    return {
      valid: true,
      resetToken,
      expiresIn: 900, // 15 minutes
    };
  }
  
  // ============================================================
  // Resend Reset OTP
  // ============================================================
  
  async resendOtp(command: ResendResetOtpCommand): Promise<{ message: string; expiresInSeconds: number; resendCooldownSeconds: number }> {
    const { phoneNumber, method, deviceInfo, correlationId } = command;
    
    // Validate phone number
    let phone: Phone;
    try {
      phone = new Phone(phoneNumber);
    } catch (error) {
      throw new BadRequestException('Invalid phone number format');
    }
    
    // Check rate limiting
    const rateLimitKey = `reset_otp_resend:${phone.getE164()}`;
    const lastResend = await this.cacheService.get<number>(rateLimitKey);
    
    if (lastResend) {
      const elapsed = Date.now() - lastResend;
      if (elapsed < OTP_CONFIG.RESEND_COOLDOWN_SECONDS * 1000) {
        const remainingSeconds = Math.ceil((OTP_CONFIG.RESEND_COOLDOWN_SECONDS * 1000 - elapsed) / 1000);
        throw new BadRequestException(`Please wait ${remainingSeconds} seconds before requesting another OTP`);
      }
    }
    
    // Check if user exists (silent check - don't reveal existence)
    const user = await this.userRepository.findByPhone(phone);
    if (!user) {
      // Return success even if user doesn't exist (security)
      return {
        message: 'If an account exists with this number, you will receive a reset OTP',
        expiresInSeconds: OTP_CONFIG.EXPIRY_SECONDS,
        resendCooldownSeconds: OTP_CONFIG.RESEND_COOLDOWN_SECONDS,
      };
    }
    
    // Generate OTP
    const otpCode = await this.mfaGenerator.generateSmsOtp(phoneNumber, 'bn');
    
    // Store OTP in cache
    const cacheKey = `reset_otp:${phone.getE164()}`;
    await this.cacheService.set(cacheKey, otpCode, OTP_CONFIG.EXPIRY_SECONDS);
    
    // Store resend timestamp
    await this.cacheService.set(rateLimitKey, Date.now(), OTP_CONFIG.RESEND_COOLDOWN_SECONDS);
    
    // Send OTP based on method
    if (method === 'whatsapp') {
      await this.mfaGenerator.generateWhatsAppOtp(phoneNumber, 'bn');
    } else {
      await this.mfaGenerator.generateSmsOtp(phoneNumber, 'bn');
    }
    
    await this.auditService.log({
      action: 'PASSWORD_RESET_OTP_RESENT',
      userId: user.getId(),
      phoneNumber: phone.getE164(),
      method,
      ipAddress: deviceInfo?.ipAddress,
      correlationId,
    });
    
    return {
      message: `Reset OTP sent to your ${method === 'whatsapp' ? 'WhatsApp' : 'phone'}`,
      expiresInSeconds: OTP_CONFIG.EXPIRY_SECONDS,
      resendCooldownSeconds: OTP_CONFIG.RESEND_COOLDOWN_SECONDS,
    };
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { ResetPasswordCommand, ResetPasswordWithOtpCommand, ValidateResetTokenCommand, VerifyResetOtpCommand, ResendResetOtpCommand };
