/**
 * Verify Email Command Handler - Application Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/verify-email.handler
 * 
 * @description
 * Handles email verification use case with security features including:
 * - Token validation with expiry
 * - User status verification
 * - Welcome email trigger
 * - Audit logging
 * - Transaction management
 * - Rate limiting prevention
 * - Bangladesh specific - Bengali message support
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only email verification
 * ✅ Repository coordination
 * ✅ Event publishing
 * ✅ Security validation
 * ✅ Transaction management
 */

import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';

import { VerifyEmailCommand } from './verify-email.command';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { EmailVerificationRepository } from '../../../domain/repositories/email-verification.repository.interface';
import { Token, TokenType } from '../../../domain/value-objects/token.vo';
import { AuditAction, AuditSeverity } from '../../../application/services/interfaces/audit.service.interface';

import { EmailVerifiedEvent, EmailVerificationMethod, EmailVerificationSource } from '../../events/email-verified.event';
import { WelcomeEmailEvent } from '../../events/welcome-email.event';

import { EventBus, AuditService, TransactionManager, NotificationService, CacheService } from './infrastructure.interface';

// ============================================================
// Verify Email Response DTO
// ============================================================

export interface VerifyEmailResponseDto {
  success: boolean;
  message: string;
  messageBn?: string;
  email?: string;
  alreadyVerified?: boolean;
  verifiedAt?: Date;
}

// ============================================================
// Verify Email Handler
// ============================================================

@Injectable()
export class VerifyEmailHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailVerificationRepository: EmailVerificationRepository,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly transactionManager: TransactionManager,
    private readonly notificationService: NotificationService,
    private readonly cacheService: CacheService
  ) {}
  
  async execute(command: VerifyEmailCommand): Promise<VerifyEmailResponseDto> {
    const { token: tokenValue, deviceInfo, correlationId } = command;
    
    // 1. Rate limiting check (prevent brute force)
    const rateLimitKey = `verify_email:${tokenValue.substring(0, 20)}`;
    const attempts = await this.cacheService.get<number>(rateLimitKey) || 0;
    
    if (attempts >= 5) {
      throw new BadRequestException('Too many verification attempts. Please request a new verification email.');
    }
    
    // 2. Validate token format
    if (!tokenValue || tokenValue.length < 10) {
      await this.incrementRateLimit(rateLimitKey);
      throw new BadRequestException('Invalid token format');
    }
    
    // 3. Create token value object
    let token: Token;
    try {
      token = new Token(tokenValue, TokenType.VERIFICATION);
    } catch (error) {
      await this.incrementRateLimit(rateLimitKey);
      throw new BadRequestException('Invalid verification token');
    }
    
    // 4. Find verification request with caching
    const cacheKey = `email_verification:${tokenValue}`;
    let verification = await this.cacheService.get(cacheKey);
    
    if (!verification) {
      verification = await this.emailVerificationRepository.findByToken(token);
      if (verification) {
        await this.cacheService.set(cacheKey, verification, 300); // Cache for 5 minutes
      }
    }
    
    if (!verification) {
      await this.incrementRateLimit(rateLimitKey);
      await this.auditService.security(
        AuditAction.EMAIL_VERIFICATION_FAILED,
        undefined,
        { 
          reason: 'Token not found',
          tokenPrefix: tokenValue.substring(0, 20),
          ipAddress: deviceInfo?.ipAddress,
          correlationId 
        }
      );
      throw new BadRequestException('Invalid or expired verification token');
    }
    
    // 5. Check if token is expired
    if (verification.isExpired()) {
      await this.incrementRateLimit(rateLimitKey);
      await this.auditService.security(
        AuditAction.EMAIL_VERIFICATION_FAILED,
        verification.getUserId(),
        { 
          reason: 'Token expired',
          tokenId: verification.id,
          ipAddress: deviceInfo?.ipAddress,
          correlationId 
        }
      );
      throw new BadRequestException(
        'Verification token has expired. Please request a new one.',
        'টোকেনের মেয়াদ শেষ হয়ে গেছে। অনুগ্রহ করে একটি নতুন ভেরিফিকেশন ইমেইল রিকোয়েস্ট করুন।'
      );
    }
    
    // 6. Verify the code
    const isValid = verification.verify(tokenValue);
    
    if (!isValid) {
      await this.incrementRateLimit(rateLimitKey);
      await this.auditService.security(
        AuditAction.EMAIL_VERIFICATION_FAILED,
        verification.getUserId(),
        { 
          reason: 'Invalid code',
          tokenId: verification.id,
          attemptNumber: attempts + 1,
          ipAddress: deviceInfo?.ipAddress,
          correlationId 
        }
      );
      throw new BadRequestException('Invalid verification code');
    }
    
    // 7. Get user
    const user = await this.userRepository.findById(verification.getUserId());
    if (!user) {
      await this.auditService.error(
        AuditAction.EMAIL_VERIFICATION_FAILED,
        verification.getUserId(),
        'User not found',
        { 
          tokenId: verification.id,
          correlationId 
        }
      );
      throw new NotFoundException('User not found');
    }
    
    // 8. Check if email is already verified
    if (user.isEmailVerified()) {
      await this.cacheService.del(rateLimitKey);
      return {
        success: true,
        message: 'Email already verified',
        messageBn: 'ইমেইল ইতিমধ্যে ভেরিফাই করা হয়েছে',
        email: user.getEmail().getValue(),
        alreadyVerified: true,
        verifiedAt: user.getEmailVerifiedAt(),
      };
    }
    
    // 9. Execute verification with transaction
    await this.transactionManager.runInTransaction(async () => {
      // Verify email in user entity
      user.verifyEmail();
      await this.userRepository.save(user);
      
      // Mark verification as completed
      verification.markAsCompleted();
      await this.emailVerificationRepository.save(verification);
      
      // Clear verification cache
      await this.cacheService.del(cacheKey);
    });
    
    // 10. Clear rate limit
    await this.cacheService.del(rateLimitKey);
    
    // 11. Publish email verified event
    await this.eventBus.publish(
      new EmailVerifiedEvent(
        user.getId(),
        user.getEmail().getValue(),
        EmailVerificationMethod.TOKEN,
        EmailVerificationSource.REGISTRATION,
        correlationId,
        undefined,
        deviceInfo?.ipAddress,
        deviceInfo?.deviceId,
        deviceInfo?.userAgent,
        deviceInfo?.district,
        deviceInfo?.mobileOperator
      )
    );
    
    // 12. Send welcome email (if first verification)
    await this.eventBus.publish(
      new WelcomeEmailEvent(
        user.getId(),
        user.getEmail().getValue(),
        user.getFullName(),
        correlationId,
        deviceInfo?.ipAddress,
        deviceInfo?.mobileOperator
      )
    );
    
    // 13. Send notification (email + SMS if phone exists)
    await this.notificationService.sendEmailVerifiedNotification(
      user.getId(),
      user.getEmail().getValue(),
      user.getFullName(),
      { correlationId, locale: command.deviceInfo?.district === 'Dhaka' ? 'en' : 'bn' }
    );
    
    // 14. Audit log
    await this.auditService.info(
      AuditAction.EMAIL_VERIFIED,
      user.getId(),
      { 
        email: user.getEmail().getValue(),
        tokenId: verification.id,
        deviceInfo,
        correlationId 
      }
    );
    
    // 15. Invalidate user cache
    await this.cacheService.del(`user:${user.getId()}`);
    await this.cacheService.del(`user:email:${user.getEmail().getValue()}`);
    
    return {
      success: true,
      message: 'Email verified successfully',
      messageBn: 'ইমেইল সফলভাবে ভেরিফাই করা হয়েছে',
      email: user.getEmail().getValue(),
      alreadyVerified: false,
      verifiedAt: new Date(),
    };
  }
  
  /**
   * Increment rate limit counter for token
   */
  private async incrementRateLimit(key: string): Promise<void> {
    const attempts = await this.cacheService.get<number>(key) || 0;
    await this.cacheService.set(key, attempts + 1, 900); // 15 minutes window
  }
}

// ============================================================
// Infrastructure Interfaces (for dependency injection)
// ============================================================

export interface TransactionManager {
  runInTransaction<T>(callback: () => Promise<T>): Promise<T>;
}

export interface EventBus {
  publish(event: unknown): Promise<void>;
}

export interface AuditService {
  info(action: AuditAction, userId?: string, details?: Record<string, unknown>): Promise<void>;
  error(action: AuditAction, userId: string | undefined, error: string, details?: Record<string, unknown>): Promise<void>;
  security(action: AuditAction, userId?: string, details?: Record<string, unknown>): Promise<void>;
}

export interface NotificationService {
  sendEmailVerifiedNotification(
    userId: string,
    email: string,
    name: string,
    options?: { correlationId?: string; locale?: string }
  ): Promise<void>;
}

export interface CacheService {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: unknown, ttl?: number): Promise<void>;
  del(key: string): Promise<void>;
}

// ============================================================
// Type Exports
// ============================================================

export type { VerifyEmailResponseDto as VerifyEmailResponseDtoType };
