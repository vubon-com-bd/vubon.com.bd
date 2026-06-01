/**
 * Change Password Handler
 * 
 * @module application/commands/user/change-password.handler
 * 
 * @description
 * Handles user password change with security validation.
 * 
 * Enterprise Rules:
 * ✅ Password verification required
 * ✅ Password history check (prevent reuse)
 * ✅ Session revocation on password change
 * ✅ Event publishing
 * ✅ Email notification
 */

import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ChangePasswordCommand, ChangePasswordResult } from './types';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { PasswordHistoryRepository } from '../../../domain/repositories/password-history.repository.interface';
import { Password } from '../../../domain/value-objects/password.vo';
import { PasswordHasher } from '../../services/interfaces/password-hasher.interface';
import { EventBus } from '../../services/interfaces/event-bus.interface';
import { NotificationService } from '../../services/interfaces/notification.service.interface';
import { PasswordChangedEvent, PasswordChangeType, PasswordChangeReason } from '../../events/password-changed.event';

@Injectable()
@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler implements ICommandHandler < ChangePasswordCommand > {
  private readonly logger = new Logger(ChangePasswordHandler.name);
  private readonly PASSWORD_HISTORY_LIMIT = 5;
  
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly passwordHistoryRepository: PasswordHistoryRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly eventBus: EventBus,
    private readonly notificationService: NotificationService,
  ) {}
  
  async execute(command: ChangePasswordCommand): Promise < ChangePasswordResult > {
    const {
      userId,
      currentPassword,
      newPassword: newPasswordRaw,
      logoutOtherDevices,
      deviceId,
      ipAddress,
      userAgent,
      correlationId
    } = command;
    
    // 1. Find user
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }
    
    // 2. Check if new password is different from current (before hashing)
    if (currentPassword === newPasswordRaw) {
      throw new BadRequestException('New password must be different from current password');
    }
    
    // 3. Verify current password
    const isValid = await this.passwordHasher.compare(
      currentPassword,
      user.getPassword().getValue(),
    );
    
    if (!isValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }
    
    // 4. Validate new password
    let newPassword: Password;
    try {
      newPassword = new Password(newPasswordRaw);
      const validation = Password.validate(newPasswordRaw);
      
      if (!validation.isValid) {
        throw new BadRequestException(validation.errors.join(', '));
      }
      
      if (validation.strength === 'weak' || validation.strength === 'very_weak') {
        throw new BadRequestException('New password is too weak. Please choose a stronger password.');
      }
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException('Invalid password format');
    }
    
    // 5. Check password history (prevent reuse)
    const recentPasswords = await this.passwordHistoryRepository.getRecent(
      userId,
      this.PASSWORD_HISTORY_LIMIT,
    );
    
    for (const oldPasswordHash of recentPasswords) {
      const isReused = await this.passwordHasher.compare(newPasswordRaw, oldPasswordHash);
      if (isReused) {
        throw new BadRequestException(
          `Cannot reuse one of your last ${this.PASSWORD_HISTORY_LIMIT} passwords`,
        );
      }
    }
    
    // 6. Hash new password
    const hashedPassword = await this.passwordHasher.hash(newPasswordRaw);
    
    // 7. Update password
    user.changePassword(new Password(hashedPassword));
    await this.userRepository.save(user);
    
    // 8. Save to password history
    await this.passwordHistoryRepository.add(userId, hashedPassword);
    
    // 9. Revoke sessions
    let sessionsRevoked = 0;
    if (logoutOtherDevices) {
      if (deviceId) {
        sessionsRevoked = await this.sessionRepository.revokeAllExceptCurrent(
          userId,
          deviceId,
          'Password changed',
        );
      } else {
        // If no device ID, revoke all sessions
        sessionsRevoked = await this.sessionRepository.revokeAllByUserId(
          userId,
          'Password changed',
        );
      }
    }
    
    // 10. Publish event
    await this.eventBus.publish(
      new PasswordChangedEvent(
        userId,
        PasswordChangeType.USER_CHANGE,
        PasswordChangeReason.USER_INITIATED,
        correlationId,
        undefined,
        deviceId,
        ipAddress,
        userAgent,
        undefined,
        `Password changed. Sessions revoked: ${sessionsRevoked}`,
      ),
    );
    
    // 11. Send notification (fire and forget - non-blocking)
    this.notificationService.sendPasswordChangedNotification(userId).catch(err => {
      this.logger.error(`Failed to send password change notification to user ${userId}: ${err.message}`);
    });
    
    return {
      success: true,
      message: 'Password changed successfully',
      sessionsRevoked,
    };
  }
}
