/**
 * Delete Account Handler
 * 
 * @module application/commands/user/delete-account.handler
 * 
 * @description
 * Handles user account deletion (soft delete with retention).
 * 
 * Enterprise Rules:
 * ✅ Confirmation required for destructive action
 * ✅ Password verification for security
 * ✅ Soft delete with data retention
 * ✅ Data anonymization for GDPR
 * ✅ Session and token revocation
 * ✅ GDPR compliance
 */

import { Injectable, BadRequestException, UnauthorizedException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteAccountCommand, DeleteAccountResult } from './types';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { RefreshTokenRepository } from '../../../domain/repositories/refresh-token.repository.interface';
import { PasswordHasher } from '../../services/interfaces/password-hasher.interface';
import { EventBus } from '../../services/interfaces/event-bus.interface';
import { NotificationService } from '../../services/interfaces/notification.service.interface';
import { AuditService } from '../../services/interfaces/audit.service.interface';
import { AccountDeletedEvent } from '../../events/account-deleted.event';

const DATA_RETENTION_DAYS = 30;
const CANCELLATION_WINDOW_DAYS = 7;

@Injectable()
@CommandHandler(DeleteAccountCommand)
export class DeleteAccountHandler implements ICommandHandler < DeleteAccountCommand > {
  private readonly logger = new Logger(DeleteAccountHandler.name);
  
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly eventBus: EventBus,
    private readonly notificationService: NotificationService,
    private readonly auditService: AuditService,
  ) {}
  
  async execute(command: DeleteAccountCommand): Promise < DeleteAccountResult > {
    const {
      userId,
      confirm,
      currentPassword,
      reason,
      deviceId,
      ipAddress,
      userAgent,
      correlationId
    } = command;
    
    // 1. Validate confirmation (destructive action protection)
    if (!confirm) {
      throw new BadRequestException('Confirmation required to delete account');
    }
    
    // 2. Find user
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }
    
    // 3. Check if already deleted
    if (user.isDeleted()) {
      throw new BadRequestException('Account is already scheduled for deletion');
    }
    
    // 4. Verify current password for security
    if (!currentPassword) {
      throw new BadRequestException('Current password is required to delete account');
    }
    
    const isValid = await this.passwordHasher.compare(
      currentPassword,
      user.getPassword().getValue(),
    );
    
    if (!isValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }
    
    // 5. Store user data for notification (before anonymization)
    const userEmail = user.getEmail().getValue();
    const userName = user.getFullName();
    
    // 6. Soft delete and anonymize user data (GDPR compliance)
    user.delete();
    
    // Anonymize personal data
    user.anonymize(`deleted_user_${userId.slice(-8)}`);
    
    await this.userRepository.save(user);
    
    // 7. Revoke all sessions
    const sessionsRevoked = await this.sessionRepository.revokeAllByUserId(
      userId,
      'Account deleted',
    );
    
    // 8. Revoke all refresh tokens
    await this.refreshTokenRepository.revokeAllByUserId(userId, 'Account deleted');
    
    // 9. Audit log for compliance
    await this.auditService.log({
      action: 'ACCOUNT_DELETED',
      userId,
      reason,
      ipAddress,
      deviceId,
      userAgent,
      correlationId,
      dataRetentionDays: DATA_RETENTION_DAYS,
      cancellationWindowDays: CANCELLATION_WINDOW_DAYS,
      timestamp: new Date(),
    });
    
    // 10. Publish event
    await this.eventBus.publish(
      new AccountDeletedEvent(
        userId,
        userEmail,
        reason,
        deviceId,
        ipAddress,
        userAgent,
        correlationId,
        DATA_RETENTION_DAYS,
        CANCELLATION_WINDOW_DAYS,
      ),
    );
    
    // 11. Send confirmation email (fire and forget - non-blocking)
    this.notificationService.sendAccountDeletedNotification(
      userId,
      userEmail,
      userName,
      DATA_RETENTION_DAYS,
      CANCELLATION_WINDOW_DAYS,
    ).catch(err => {
      this.logger.error(`Failed to send account deletion notification to user ${userId}: ${err.message}`);
    });
    
    return {
      success: true,
      message: `Your account has been scheduled for deletion. You have ${CANCELLATION_WINDOW_DAYS} days to cancel. Data will be permanently deleted after ${DATA_RETENTION_DAYS} days.`,
      userId,
      deletedAt: new Date(),
      dataRetentionDays: DATA_RETENTION_DAYS,
      cancellationWindowDays: CANCELLATION_WINDOW_DAYS,
    };
  }
}
