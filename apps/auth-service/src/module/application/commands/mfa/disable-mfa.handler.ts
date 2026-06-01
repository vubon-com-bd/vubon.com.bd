/**
 * Disable MFA Command Handler - Application Layer
 * 
 * @module application/commands/mfa/disable-mfa.handler
 * 
 * @description
 * Handles MFA disable use case with security features including:
 * - Verification requirement (MFA code, password, or backup code)
 * - Session revocation
 * - Audit logging
 * - Email notification
 * - Transaction management
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only MFA disable
 * ✅ Repository coordination
 * ✅ Security verification required
 * ✅ Event publishing
 * ✅ Transaction management
 */

import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';

import { DisableMfaCommand, DisableMfaVerificationType } from './disable-mfa.command';
import { MFARepository } from '../../../domain/repositories/mfa.repository.interface';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';

import { MfaDisabledEvent, MFADisableReason } from '../../events/mfa-disabled.event';

import {
  EventBus,
  AuditService,
  TransactionManager,
  NotificationService,
  PasswordHasher,
  MfaVerificationService
} from './infrastructure.interface';

// ============================================================
// Disable MFA Response DTO
// ============================================================

export interface DisableMfaResponseDto {
  success: boolean;
  message: string;
  sessionsRevoked ? : number;
}

// ============================================================
// Disable MFA Handler
// ============================================================

@Injectable()
export class DisableMfaHandler {
  constructor(
    private readonly mfaRepository: MFARepository,
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly mfaVerificationService: MfaVerificationService,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly transactionManager: TransactionManager,
    private readonly notificationService: NotificationService
  ) {}
  
  async execute(userId: string, command: DisableMfaCommand): Promise < DisableMfaResponseDto > {
    const { verificationType, verificationCode, deviceInfo, reason, correlationId, targetUserId } = command;
    
    // 1. Determine effective user ID
    const effectiveUserId = command.getEffectiveUserId(userId);
    
    // 2. Check if admin override is valid
    if (command.isAdminOverride()) {
      // Verify admin permissions (handled by controller/guard)
      if (!command.adminId) {
        throw new UnauthorizedException('Admin ID required for override');
      }
    }
    
    // 3. Find MFA configuration
    const mfa = await this.mfaRepository.findByUserId(effectiveUserId);
    
    if (!mfa || !mfa.isEnabled()) {
      throw new BadRequestException('MFA is not enabled for this user');
    }
    
    // 4. Verify the request (unless admin override)
    if (!command.isAdminOverride()) {
      const isValid = await this.verifyRequest(
        effectiveUserId,
        verificationType,
        verificationCode,
        mfa,
        deviceInfo,
        correlationId
      );
      
      if (!isValid) {
        throw new UnauthorizedException('Invalid verification code');
      }
    }
    
    // 5. Execute MFA disable with transaction
    let sessionsRevoked = 0;
    
    await this.transactionManager.runInTransaction(async () => {
      // Disable MFA
      mfa.disable();
      await this.mfaRepository.save(mfa);
      
      // Update user entity
      const user = await this.userRepository.findById(effectiveUserId);
      if (user) {
        user.disableMFA();
        await this.userRepository.save(user);
      }
      
      // Revoke all sessions for security
      sessionsRevoked = await this.sessionRepository.revokeAllByUserId(
        effectiveUserId,
        'MFA disabled'
      );
    });
    
    // 6. Determine disable reason
    const disableReason = command.isAdminOverride() ?
      MFADisableReason.ADMIN_DISABLED :
      MFADisableReason.USER_DISABLED;
    
    // 7. Publish event
    await this.eventBus.publish(
      new MfaDisabledEvent(
        effectiveUserId,
        mfa.getType(),
        disableReason,
        correlationId,
        undefined,
        command.isAdminOverride() ? command.adminId : undefined,
        {
          verificationType: verificationType,
          reason: command.getReason(),
          adminOverride: command.isAdminOverride(),
          sessionsRevoked,
        }
      )
    );
    
    // 8. Send notification
    const user = await this.userRepository.findById(effectiveUserId);
    if (user) {
      await this.notificationService.sendMFADisabledNotification(
        effectiveUserId,
        user.getEmail().getValue(),
        mfa.getType(),
        command.isAdminOverride(),
        command.isAdminOverride() ? command.adminId : undefined
      );
    }
    
    // 9. Audit log
    await this.auditService.log({
      action: 'MFA_DISABLED',
      userId: effectiveUserId,
      mfaType: mfa.getType(),
      verificationType: verificationType,
      reason: command.getReason(),
      isAdminOverride: command.isAdminOverride(),
      adminId: command.adminId,
      sessionsRevoked,
      ipAddress: deviceInfo?.ipAddress,
      deviceId: deviceInfo?.deviceId,
      userAgent: deviceInfo?.userAgent,
      correlationId,
    });
    
    return {
      success: true,
      message: command.isAdminOverride() ?
        'MFA has been disabled by administrator' :
        'MFA has been disabled successfully',
      sessionsRevoked,
    };
  }
  
  // ============================================================
  // Private Helper Methods
  // ============================================================
  
  private async verifyRequest(
    userId: string,
    verificationType: DisableMfaVerificationType,
    verificationCode: string | undefined,
    mfa: any,
    deviceInfo: any,
    correlationId ? : string
  ): Promise < boolean > {
    if (!verificationCode) {
      await this.auditService.log({
        action: 'MFA_DISABLE_NO_VERIFICATION',
        userId,
        ipAddress: deviceInfo?.ipAddress,
        correlationId,
      });
      return false;
    }
    
    switch (verificationType) {
      case DisableMfaVerificationType.MFA_CODE:
        // Verify MFA code
        const isValidCode = await this.mfaVerificationService.verifyCode(
          userId,
          verificationCode
        );
        if (!isValidCode) {
          await this.auditService.log({
            action: 'MFA_DISABLE_INVALID_CODE',
            userId,
            ipAddress: deviceInfo?.ipAddress,
            correlationId,
          });
        }
        return isValidCode;
        
      case DisableMfaVerificationType.PASSWORD:
        // Verify user password
        const user = await this.userRepository.findById(userId);
        if (!user) return false;
        
        const isValidPassword = await this.passwordHasher.compare(
          verificationCode,
          user.getPassword().getValue()
        );
        
        if (!isValidPassword) {
          await this.auditService.log({
            action: 'MFA_DISABLE_INVALID_PASSWORD',
            userId,
            ipAddress: deviceInfo?.ipAddress,
            correlationId,
          });
        }
        return isValidPassword;
        
      case DisableMfaVerificationType.BACKUP_CODE:
        // Verify backup code
        const isValidBackup = mfa.verifyBackupCode(verificationCode);
        if (isValidBackup) {
          await this.mfaRepository.save(mfa);
        } else {
          await this.auditService.log({
            action: 'MFA_DISABLE_INVALID_BACKUP_CODE',
            userId,
            ipAddress: deviceInfo?.ipAddress,
            correlationId,
          });
        }
        return isValidBackup;
        
      default:
        return false;
    }
  }
}
