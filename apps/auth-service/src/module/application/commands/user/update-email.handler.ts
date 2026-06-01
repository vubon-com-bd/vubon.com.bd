/**
 * Update Email Handler
 * 
 * @module application/commands/user/update-email.handler
 * 
 * @description
 * Handles user email update with password verification.
 * 
 * Enterprise Rules:
 * ✅ Current password verification required
 * ✅ Email uniqueness check
 * ✅ Verification email sent before change
 * ✅ Rate limiting and cooldown
 * ✅ Audit logging
 */

import { Injectable, UnauthorizedException, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as crypto from 'crypto';

import { UpdateEmailCommand, UpdateEmailResult } from './types';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { Email } from '../../../domain/value-objects/email.vo';
import { PasswordHasher } from '../../services/interfaces/password-hasher.interface';
import { EventBus } from '../../services/interfaces/event-bus.interface';
import { NotificationService } from '../../services/interfaces/notification.service.interface';
import { CacheService } from '../../services/interfaces/cache.service.interface';
import { AuditService } from '../../services/interfaces/audit.service.interface';
import { EmailChangeRequestedEvent } from '../../events/email-change-requested.event';

const EMAIL_CHANGE_COOLDOWN_HOURS = 24;
const VERIFICATION_TOKEN_EXPIRY_HOURS = 24;
const MAX_REQUESTS_PER_DAY = 3;

@Injectable()
@CommandHandler(UpdateEmailCommand)
export class UpdateEmailHandler implements ICommandHandler < UpdateEmailCommand > {
  private readonly logger = new Logger(UpdateEmailHandler.name);
  
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly eventBus: EventBus,
    private readonly notificationService: NotificationService,
    private readonly cacheService: CacheService,
    private readonly auditService: AuditService,
  ) {}
  
  async execute(command: UpdateEmailCommand): Promise < UpdateEmailResult > {
    const {
      userId,
      newEmail: newEmailRaw,
      currentPassword,
      deviceId,
      ipAddress,
      userAgent,
      correlationId
    } = command;
    
    // 1. Rate limiting check
    const requestCount = await this.getRequestCount(userId);
    if (requestCount >= MAX_REQUESTS_PER_DAY) {
      throw new BadRequestException(
        `You have exceeded the maximum of ${MAX_REQUESTS_PER_DAY} email change requests per day`,
      );
    }
    
    // 2. Cooldown check (prevent frequent changes)
    const lastChangeTime = await this.getLastEmailChangeTime(userId);
    if (lastChangeTime) {
      const hoursSinceLastChange = (Date.now() - lastChangeTime) / (1000 * 60 * 60);
      if (hoursSinceLastChange < EMAIL_CHANGE_COOLDOWN_HOURS) {
        const remainingHours = Math.ceil(EMAIL_CHANGE_COOLDOWN_HOURS - hoursSinceLastChange);
        throw new BadRequestException(
          `Please wait ${remainingHours} hours before changing your email again`,
        );
      }
    }
    
    // 3. Find user
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }
    
    // 4. Verify current password
    const isValid = await this.passwordHasher.compare(
      currentPassword,
      user.getPassword().getValue(),
    );
    
    if (!isValid) {
      // Audit failed attempt
      await this.auditService.log({
        action: 'EMAIL_CHANGE_FAILED',
        userId,
        reason: 'Invalid password',
        ipAddress,
        deviceId,
        correlationId,
      });
      throw new UnauthorizedException('Current password is incorrect');
    }
    
    // 5. Validate new email format
    let newEmail: Email;
    try {
      newEmail = new Email(newEmailRaw);
    } catch (error) {
      throw new BadRequestException('Invalid email format');
    }
    
    // 6. Check if email is already taken
    const existingUser = await this.userRepository.findByEmail(newEmail);
    if (existingUser && existingUser.getId() !== userId) {
      throw new ConflictException('Email is already taken');
    }
    
    // 7. Check if same as current email
    const currentEmail = user.getEmail().getValue();
    if (newEmail.getValue() === currentEmail) {
      throw new BadRequestException('New email is the same as current email');
    }
    
    // 8. Check if there's a pending change already
    const pendingChange = await this.cacheService.get(`email_change:${userId}`);
    if (pendingChange) {
      throw new BadRequestException(
        'An email change is already pending. Please check your email for verification link.',
      );
    }
    
    // 9. Generate verification token
    const verificationToken = this.generateVerificationToken();
    
    // 10. Store pending email in cache
    await this.cacheService.set(
      `email_change:${userId}`,
      {
        newEmail: newEmail.getValue(),
        token: verificationToken,
        oldEmail: currentEmail,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + VERIFICATION_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000),
        deviceId,
        ipAddress,
      },
      VERIFICATION_TOKEN_EXPIRY_HOURS * 60 * 60,
    );
    
    // 11. Increment request count
    await this.incrementRequestCount(userId);
    
    // 12. Publish event
    await this.eventBus.publish(
      new EmailChangeRequestedEvent(
        userId,
        currentEmail,
        newEmail.getValue(),
        correlationId,
        ipAddress,
        deviceId,
      ),
    );
    
    // 13. Send verification email to new address
    await this.notificationService.sendEmailChangeVerification(
      newEmail.getValue(),
      verificationToken,
      user.getFullName(),
    );
    
    // 14. Send security notification to old email
    await this.notificationService.sendEmailChangeAlert(
      currentEmail,
      newEmail.getValue(),
      user.getFullName(),
      ipAddress,
      deviceId,
    );
    
    // 15. Audit log
    await this.auditService.log({
      action: 'EMAIL_CHANGE_REQUESTED',
      userId,
      oldEmail: this.maskEmail(currentEmail),
      newEmail: this.maskEmail(newEmail.getValue()),
      ipAddress,
      deviceId,
      userAgent,
      correlationId,
    });
    
    return {
      success: true,
      message: `Verification email sent to ${this.maskEmail(newEmail.getValue())}. Please verify to complete email change. The link expires in ${VERIFICATION_TOKEN_EXPIRY_HOURS} hours.`,
      requiresVerification: true,
      maskedEmail: this.maskEmail(newEmail.getValue()),
    };
  }
  
  private generateVerificationToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
  
  private maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    if (!local || !domain) return email;
    const maskedLocal = local.length <= 2 ?
      local[0] + '***' :
      local[0] + '***' + local[local.length - 1];
    return `${maskedLocal}@${domain}`;
  }
  
  private async getRequestCount(userId: string): Promise < number > {
    const key = `email_change_requests:${userId}`;
    const count = await this.cacheService.get(key);
    return count ? parseInt(count, 10) : 0;
  }
  
  private async incrementRequestCount(userId: string): Promise < void > {
    const key = `email_change_requests:${userId}`;
    const currentCount = await this.getRequestCount(userId);
    await this.cacheService.set(key, (currentCount + 1).toString(), 24 * 60 * 60);
  }
  
  private async getLastEmailChangeTime(userId: string): Promise < number | null > {
    const key = `last_email_change:${userId}`;
    const timestamp = await this.cacheService.get(key);
    return timestamp ? parseInt(timestamp, 10) : null;
  }
}
