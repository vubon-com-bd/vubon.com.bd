/**
 * Change Password Command Handler - Application Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/change-password.handler
 * 
 * @description
 * Handles the change password use case.
 * Orchestrates password validation, update, session revocation, and notifications.
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only change password
 * ✅ Repository coordination
 * ✅ Event publishing
 * ✅ Transaction management
 * ✅ Security audit
 * ✅ Bangladesh specific - Bengali notifications and mobile operator tracking
 */

import { Injectable, NotFoundException, UnauthorizedException, BadRequestException, ForbiddenException } from '@nestjs/common';

import { ChangePasswordCommand, AdminForceChangePasswordCommand } from './change-password.command';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { PasswordHistoryRepository } from '../../../domain/repositories/password-history.repository.interface';
import { AccountLockRepository } from '../../../domain/repositories/account-lock.repository.interface';

import { User } from '../../../domain/entities/user.entity';
import { Password } from '../../../domain/value-objects/password.vo';

import { PasswordChangedEvent, PasswordChangeType, PasswordChangeReason } from '../../events/password-changed.event';
import { LoginFailedEvent } from '../../events/login-failed.event';
import { AccountLockedEvent } from '../../events/account-locked.event';

import { PasswordHasher, EventBus, TransactionManager, NotificationService, AuditService, CacheService } from './infrastructure.interface';

// ============================================================
// Constants
// ============================================================

const PASSWORD_CONFIG = {
  MAX_DAILY_CHANGES: 3,
  PREVENT_REUSE_COUNT: 5,        // Prevent reuse of last 5 passwords
  MAX_FAILED_ATTEMPTS: 5,        // Max failed password change attempts
  LOCKOUT_DURATION_MINUTES: 15,  // Lockout duration after max attempts
};

// ============================================================
// Change Password Handler
// ============================================================

@Injectable()
export class ChangePasswordHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly passwordHistoryRepository: PasswordHistoryRepository,
    private readonly accountLockRepository: AccountLockRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly eventBus: EventBus,
    private readonly transactionManager: TransactionManager,
    private readonly notificationService: NotificationService,
    private readonly auditService: AuditService,
    private readonly cacheService: CacheService,
  ) {}
  
  /**
   * Execute change password command (user-initiated)
   */
  async execute(command: ChangePasswordCommand): Promise<{ success: boolean; sessionsRevoked?: number }> {
    const { userId, currentPassword, newPassword: newPasswordRaw, deviceInfo, correlationId } = command;
    
    // 1. Check if account is locked
    await this.checkAccountLock(userId);
    
    // 2. Rate limiting check
    await this.checkRateLimiting(userId);
    
    // 3. Find user
    const user = await this.findUserOrThrow(userId);
    
    // 4. Verify current password (unless skipped for reset flow)
    if (!command.skipCurrentPasswordValidation) {
      await this.verifyCurrentPassword(user, currentPassword, deviceInfo);
    }
    
    // 5. Validate new password
    const newPassword = await this.validateNewPassword(userId, newPasswordRaw);
    
    // 6. Check password history (prevent reuse)
    await this.checkPasswordHistory(userId, newPassword);
    
    // 7. Hash new password
    const hashedPassword = await this.passwordHasher.hash(newPassword.getValue());
    
    // 8. Execute password change with transaction
    let sessionsRevoked = 0;
    const oldPasswordHash = user.getPassword().getValue();
    
    await this.transactionManager.runInTransaction(async () => {
      // Update password in domain
      user.changePassword(new Password(hashedPassword));
      await this.userRepository.save(user);
      
      // Add to password history
      await this.passwordHistoryRepository.add(userId, hashedPassword);
      
      // Revoke sessions (except current if provided)
      if (command.logoutOtherDevices) {
        if (deviceInfo?.sessionId) {
          sessionsRevoked = await this.sessionRepository.revokeAllExceptCurrent(
            userId,
            deviceInfo.sessionId,
            'Password changed'
          );
        } else {
          sessionsRevoked = await this.sessionRepository.revokeAllByUserId(userId, 'Password changed');
        }
      }
      
      // Reset failed attempts on successful change
      await this.accountLockRepository.resetFailureCountForUser(userId);
    });
    
    // 9. Invalidate cache
    await this.cacheService.delPattern(`user:${userId}:*`);
    await this.cacheService.delPattern(`session:user:${userId}:*`);
    
    // 10. Publish domain event
    await this.eventBus.publish(
      new PasswordChangedEvent(
        userId,
        command.isAdminInitiated() ? PasswordChangeType.ADMIN_FORCE : PasswordChangeType.USER_CHANGE,
        command.reason === 'reset' ? PasswordChangeReason.PASSWORD_RESET : PasswordChangeReason.USER_INITIATED,
        correlationId,
        command.adminId,
        deviceInfo?.deviceId,
        deviceInfo?.ipAddress,
        deviceInfo?.userAgent,
        deviceInfo?.district,
        `Password changed. Sessions revoked: ${sessionsRevoked}`,
        deviceInfo?.mobileOperator,
        deviceInfo?.networkType
      )
    );
    
    // 11. Send notification
    if (command.sendNotification) {
      await this.notificationService.sendPasswordChangedNotification(
        userId,
        user.getEmail().getValue(),
        user.getFullName(),
        {
          deviceName: deviceInfo?.deviceId,
          location: deviceInfo?.district,
          ipAddress: deviceInfo?.ipAddress,
          time: new Date(),
        },
        { locale: command.notificationMethod === 'sms' ? 'bn' : 'en' }
      );
    }
    
    // 12. Audit log
    await this.auditService.security(
      'PASSWORD_CHANGED',
      userId,
      {
        adminId: command.adminId,
        reason: command.reason,
        logoutOtherDevices: command.logoutOtherDevices,
        sessionsRevoked,
        deviceInfo,
        isAdminInitiated: command.isAdminInitiated(),
        isResetFlow: command.isResetFlow(),
      },
      {
        ipAddress: deviceInfo?.ipAddress,
        deviceId: deviceInfo?.deviceId,
        userAgent: deviceInfo?.userAgent,
        district: deviceInfo?.district,
        mobileOperator: deviceInfo?.mobileOperator,
      }
    );
    
    return { success: true, sessionsRevoked };
  }
  
  /**
   * Execute admin force change password command
   */
  async executeAdminForce(command: AdminForceChangePasswordCommand): Promise<{ success: boolean; temporaryPassword: string }> {
    const { adminId, targetUserId, newPassword: newPasswordRaw, deviceInfo, correlationId } = command;
    
    // 1. Verify admin has permission
    const admin = await this.userRepository.findById(adminId);
    if (!admin || !admin.isAdmin()) {
      throw new ForbiddenException('Admin privileges required');
    }
    
    // 2. Find target user
    const user = await this.findUserOrThrow(targetUserId);
    
    // 3. Validate new password
    const newPassword = await this.validateNewPassword(targetUserId, newPasswordRaw);
    
    // 4. Hash new password
    const hashedPassword = await this.passwordHasher.hash(newPassword.getValue());
    
    // 5. Execute force password change
    let sessionsRevoked = 0;
    
    await this.transactionManager.runInTransaction(async () => {
      // Update password
      user.changePassword(new Password(hashedPassword));
      await this.userRepository.save(user);
      
      // Add to history
      await this.passwordHistoryRepository.add(targetUserId, hashedPassword);
      
      // Revoke all sessions if requested
      if (command.revokeSessions) {
        sessionsRevoked = await this.sessionRepository.revokeAllByUserId(targetUserId, `Admin forced password change: ${command.reason || 'Security policy'}`);
      }
    });
    
    // 6. Invalidate cache
    await this.cacheService.delPattern(`user:${targetUserId}:*`);
    
    // 7. Publish event
    await this.eventBus.publish(
      new PasswordChangedEvent(
        targetUserId,
        PasswordChangeType.ADMIN_FORCE,
        PasswordChangeReason.ADMIN_FORCED,
        correlationId,
        adminId,
        deviceInfo?.deviceId,
        deviceInfo?.ipAddress,
        deviceInfo?.userAgent,
        deviceInfo?.district,
        `Admin forced password change. Reason: ${command.reason || 'Not specified'}. Sessions revoked: ${sessionsRevoked}`,
        deviceInfo?.mobileOperator,
        deviceInfo?.networkType
      )
    );
    
    // 8. Send notification to user
    if (command.notifyUser) {
      await this.notificationService.sendPasswordResetEmail(
        targetUserId,
        user.getEmail().getValue(),
        user.getFullName(),
        {
          isAdminReset: true,
          adminName: admin.getFullName(),
          requireChangeOnNextLogin: command.requireChangeOnNextLogin,
        },
        { locale: 'bn' }
      );
    }
    
    // 9. Audit log
    await this.auditService.security(
      'PASSWORD_FORCED_CHANGE',
      targetUserId,
      {
        adminId,
        reason: command.reason,
        requireChangeOnNextLogin: command.requireChangeOnNextLogin,
        revokeSessions: command.revokeSessions,
        sessionsRevoked,
        notifyUser: command.notifyUser,
      },
      {
        ipAddress: deviceInfo?.ipAddress,
        deviceId: deviceInfo?.deviceId,
        userAgent: deviceInfo?.userAgent,
      }
    );
    
    return { success: true, temporaryPassword: newPasswordRaw };
  }
  
  // ============================================================
  // Private Helper Methods
  // ============================================================
  
  private async findUserOrThrow(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    if (user.isDeleted()) {
      throw new UnauthorizedException('Account has been deleted');
    }
    if (user.isSuspended()) {
      throw new UnauthorizedException('Account is suspended');
    }
    return user;
  }
  
  private async checkAccountLock(userId: string): Promise<void> {
    const lockStatus = await this.accountLockRepository.getLockStatus(userId);
    if (lockStatus.isLocked) {
      throw new UnauthorizedException(
        `Account is locked. Please try again in ${Math.ceil(lockStatus.remainingLockTime / 60)} minutes`
      );
    }
  }
  
  private async verifyCurrentPassword(
    user: User, 
    currentPassword: string, 
    deviceInfo?: ChangePasswordCommand['deviceInfo']
  ): Promise<void> {
    const isValid = await this.passwordHasher.compare(
      currentPassword,
      user.getPassword().getValue()
    );
    
    if (!isValid) {
      // Increment failure count
      const failureCount = await this.accountLockRepository.incrementFailureCountForUser(user.getId());
      const remainingAttempts = Math.max(0, PASSWORD_CONFIG.MAX_FAILED_ATTEMPTS - failureCount);
      
      // Audit failed attempt
      await this.auditService.warn(
        'PASSWORD_CHANGE_FAILED',
        user.getId(),
        { reason: 'Invalid current password', remainingAttempts },
        {
          ipAddress: deviceInfo?.ipAddress,
          deviceId: deviceInfo?.deviceId,
          userAgent: deviceInfo?.userAgent,
          district: deviceInfo?.district,
        }
      );
      
      // Publish failed event
      await this.eventBus.publish(
        new LoginFailedEvent(
          user.getId(),
          user.getEmail().getValue(),
          'invalid_password',
          deviceInfo?.ipAddress,
          deviceInfo?.userAgent,
          deviceInfo?.deviceId,
          remainingAttempts
        )
      );
      
      // Lock account if max attempts reached
      if (failureCount >= PASSWORD_CONFIG.MAX_FAILED_ATTEMPTS) {
        await this.accountLockRepository.lockAccount(user.getId(), 'Too many failed password change attempts');
        await this.eventBus.publish(new AccountLockedEvent(user.getId(), 'too_many_failed_attempts', PASSWORD_CONFIG.LOCKOUT_DURATION_MINUTES));
        
        throw new UnauthorizedException(
          `Account locked due to too many failed attempts. Please try again in ${PASSWORD_CONFIG.LOCKOUT_DURATION_MINUTES} minutes`
        );
      }
      
      throw new UnauthorizedException(`Current password is incorrect. ${remainingAttempts} attempts remaining`);
    }
    
    // Reset failure count on successful verification
    await this.accountLockRepository.resetFailureCountForUser(user.getId());
  }
  
  private async validateNewPassword(userId: string, newPasswordRaw: string): Promise<Password> {
    let newPassword: Password;
    
    try {
      newPassword = new Password(newPasswordRaw);
    } catch (error) {
      throw new BadRequestException(error instanceof Error ? error.message : 'Invalid password format');
    }
    
    // Check password strength
    const validation = Password.validate(newPasswordRaw);
    if (!validation.isValid) {
      throw new BadRequestException(validation.errors.join(', '));
    }
    
    // Check if password is weak (security policy)
    if (validation.strength === 'weak' || validation.strength === 'very_weak') {
      throw new BadRequestException(
        'Password is too weak. Please choose a stronger password with at least 12 characters, including uppercase, lowercase, numbers, and special characters.'
      );
    }
    
    return newPassword;
  }
  
  private async checkPasswordHistory(userId: string, newPassword: Password): Promise<void> {
    const recentPasswords = await this.passwordHistoryRepository.getRecent(userId, PASSWORD_CONFIG.PREVENT_REUSE_COUNT);
    
    for (const oldPasswordHash of recentPasswords) {
      const isReused = await this.passwordHasher.compare(newPassword.getValue(), oldPasswordHash);
      if (isReused) {
        throw new BadRequestException(
          `Cannot reuse one of your last ${PASSWORD_CONFIG.PREVENT_REUSE_COUNT} passwords. Please choose a new password.`
        );
      }
    }
  }
  
  private async checkRateLimiting(userId: string): Promise<void> {
    const changesToday = await this.passwordHistoryRepository.countChangesInLast24Hours(userId);
    
    if (changesToday >= PASSWORD_CONFIG.MAX_DAILY_CHANGES) {
      throw new BadRequestException(
        `You have exceeded the maximum of ${PASSWORD_CONFIG.MAX_DAILY_CHANGES} password changes per day for security reasons. Please try again tomorrow.`
      );
    }
  }
}

// ============================================================
// Infrastructure Interfaces (to be implemented in infrastructure layer)
// ============================================================

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

export interface SessionRepository {
  revokeAllExceptCurrent(userId: string, currentSessionId: string, reason: string): Promise<number>;
  revokeAllByUserId(userId: string, reason: string): Promise<number>;
}

export interface PasswordHistoryRepository {
  add(userId: string, hashedPassword: string): Promise<void>;
  getRecent(userId: string, count: number): Promise<string[]>;
  countChangesInLast24Hours(userId: string): Promise<number>;
}

export interface AccountLockRepository {
  getLockStatus(userId: string): Promise<{ isLocked: boolean; remainingLockTime: number }>;
  incrementFailureCountForUser(userId: string): Promise<number>;
  resetFailureCountForUser(userId: string): Promise<void>;
  lockAccount(userId: string, reason: string): Promise<void>;
}

export interface PasswordHasher {
  compare(plain: string, hashed: string): Promise<boolean>;
  hash(password: string): Promise<string>;
}

export interface EventBus {
  publish(event: unknown): Promise<void>;
}

export interface TransactionManager {
  runInTransaction<T>(callback: () => Promise<T>): Promise<T>;
}

export interface NotificationService {
  sendPasswordChangedNotification(
    userId: string,
    email: string,
    name: string,
    data: { deviceName?: string; location?: string; ipAddress?: string; time: Date },
    options?: { locale?: 'en' | 'bn' }
  ): Promise<void>;
  sendPasswordResetEmail(
    userId: string,
    email: string,
    name: string,
    data: { isAdminReset: boolean; adminName?: string; requireChangeOnNextLogin: boolean },
    options?: { locale?: 'en' | 'bn' }
  ): Promise<void>;
}

export interface AuditService {
  security(action: string, userId: string, details: Record<string, unknown>, context?: Record<string, unknown>): Promise<void>;
  warn(action: string, userId: string | undefined, details: Record<string, unknown>, context?: Record<string, unknown>): Promise<void>;
}

export interface CacheService {
  delPattern(pattern: string): Promise<number>;
}
