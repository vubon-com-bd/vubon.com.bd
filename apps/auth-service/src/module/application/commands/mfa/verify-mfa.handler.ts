/**
 * Verify MFA Command Handler - Application Layer
 * 
 * @module application/commands/mfa/verify-mfa.handler
 * 
 * @description
 * Handles MFA verification use case for both:
 * - Setup verification (enabling MFA)
 * - Login verification (authenticating)
 * 
 * Features:
 * - Rate limiting for failed attempts
 * - Lockout after max attempts
 * - Audit logging
 * - Event publishing
 * - Transaction management
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles MFA verification
 * ✅ Repository coordination
 * ✅ Security validation
 * ✅ Event publishing
 * ✅ Transaction management
 */

import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';

import { VerifyMfaCommand } from './verify-mfa.command';
import { MFARepository } from '../../../domain/repositories/mfa.repository.interface';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';

import { MfaEnabledEvent } from '../../events/mfa-enabled.event';
import { MfaVerificationFailedEvent } from '../../events/mfa-verification-failed.event';

import { MfaGenerator, EventBus, AuditService, TransactionManager, CacheService } from './infrastructure.interface';

// ============================================================
// Constants
// ============================================================

const MFA_CONFIG = {
  MAX_VERIFICATION_ATTEMPTS: 3,
  LOCKOUT_DURATION_MINUTES: 15,
  VERIFICATION_SESSION_TTL_SECONDS: 300, // 5 minutes
};

// ============================================================
// Verify MFA Response DTO
// ============================================================

export interface VerifyMfaResponseDto {
  success: boolean;
  requiresMfa?: boolean;
  remainingAttempts?: number;
  isLocked?: boolean;
  remainingLockTimeMinutes?: number;
  mfaSessionId?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: any;
}

// ============================================================
// Verify MFA Handler
// ============================================================

@Injectable()
export class VerifyMfaHandler {
  constructor(
    private readonly mfaRepository: MFARepository,
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly mfaGenerator: MfaGenerator,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly transactionManager: TransactionManager,
    private readonly cacheService: CacheService,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async execute(command: VerifyMfaCommand): Promise<VerifyMfaResponseDto> {
    // 1. Validate command
    if (!command.isValid()) {
      throw new BadRequestException(command.getValidationError());
    }

    // 2. Get MFA session from cache
    const mfaSession = await this.cacheService.get(`mfa:session:${command.mfaSessionId}`);
    if (!mfaSession) {
      throw new UnauthorizedException('Invalid or expired MFA session');
    }

    const userId = mfaSession.userId;
    const isSetupFlow = mfaSession.isSetup || false;

    // 3. Find MFA configuration
    const mfa = await this.mfaRepository.findByUserId(userId);
    if (!mfa) {
      throw new BadRequestException('MFA is not set up for this user');
    }

    // 4. Check if MFA is locked
    if (mfa.isLocked()) {
      const remainingMinutes = mfa.getRemainingLockTimeMinutes();
      throw new UnauthorizedException(
        `MFA is locked. Please try again in ${remainingMinutes} minutes.`
      );
    }

    // 5. Verify the code
    let verified = false;

    if (command.hasBackupCode()) {
      verified = await this.verifyBackupCode(mfa, command.getBackupCode()!, userId, command);
    } else if (command.hasCode()) {
      verified = await this.verifyTotpCode(mfa, command.getCode()!, userId, command, isSetupFlow);
    }

    // 6. Handle failed verification
    if (!verified) {
      const remainingAttempts = mfa.getRemainingAttempts();
      const isLocked = mfa.isLocked();
      
      await this.auditService.log({
        action: 'MFA_VERIFICATION_FAILED',
        userId,
        remainingAttempts,
        isLocked,
        ipAddress: command.getIpAddress(),
        deviceId: command.getDeviceId(),
        correlationId: command.correlationId,
      });

      await this.eventBus.publish(
        new MfaVerificationFailedEvent(
          userId,
          command.getIpAddress(),
          remainingAttempts,
          command.correlationId
        )
      );

      return {
        success: false,
        remainingAttempts,
        isLocked,
        remainingLockTimeMinutes: isLocked ? mfa.getRemainingLockTimeMinutes() : undefined,
      };
    }

    // 7. Handle successful verification
    await this.transactionManager.runInTransaction(async () => {
      mfa.recordSuccessfulVerification();
      await this.mfaRepository.save(mfa);

      if (isSetupFlow) {
        // Complete MFA setup
        mfa.markAsVerified();
        await this.mfaRepository.save(mfa);

        const user = await this.userRepository.findById(userId);
        if (user) {
          user.enableMFA();
          await this.userRepository.save(user);
        }

        await this.eventBus.publish(
          new MfaEnabledEvent(
            userId,
            mfa.getType(),
            this.getMFAMethodForType(mfa.getType()),
            command.correlationId,
            undefined,
            command.getDeviceId(),
            command.getIpAddress(),
            command.getUserAgent()
          )
        );
      }
    });

    // 8. For login flow, generate tokens
    let accessToken: string | undefined;
    let refreshToken: string | undefined;
    let userData: any;

    if (!isSetupFlow) {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      accessToken = await this.tokenGenerator.generateAccessToken(
        userId,
        user.getEmail().getValue()
      );
      refreshToken = await this.tokenGenerator.generateRefreshToken(userId);

      // Trust device if requested
      if (command.shouldTrustDevice() && command.getDeviceId()) {
        await this.trustDevice(userId, command.getDeviceId()!);
      }

      userData = {
        id: user.getId(),
        email: user.getEmail().getValue(),
        fullName: user.getFullName(),
        role: user.getRole(),
      };
    }

    // 9. Delete MFA session from cache
    await this.cacheService.del(`mfa:session:${command.mfaSessionId}`);

    // 10. Audit log
    await this.auditService.log({
      action: isSetupFlow ? 'MFA_VERIFIED_SETUP' : 'MFA_VERIFIED_LOGIN',
      userId,
      mfaType: mfa.getType(),
      ipAddress: command.getIpAddress(),
      deviceId: command.getDeviceId(),
      userAgent: command.getUserAgent(),
      correlationId: command.correlationId,
    });

    return {
      success: true,
      ...(isSetupFlow ? {} : { accessToken, refreshToken, user: userData }),
    };
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  private async verifyTotpCode(
    mfa: any,
    code: string,
    userId: string,
    command: VerifyMfaCommand,
    isSetupFlow: boolean
  ): Promise<boolean> {
    const isValid = this.mfaGenerator.verifyCode(mfa.getSecret(), code);

    if (!isValid) {
      mfa.recordVerificationFailure();
      await this.mfaRepository.save(mfa);
      return false;
    }

    // For setup flow, we don't increment attempts on success
    if (!isSetupFlow) {
      mfa.recordSuccessfulVerification();
      await this.mfaRepository.save(mfa);
    }

    return true;
  }

  private async verifyBackupCode(
    mfa: any,
    backupCode: string,
    userId: string,
    command: VerifyMfaCommand
  ): Promise<boolean> {
    // Hash the backup code for comparison
    const hashedCode = await this.hashBackupCode(backupCode);
    const isValid = mfa.useBackupCode(hashedCode);

    if (!isValid) {
      mfa.recordVerificationFailure();
      await this.mfaRepository.save(mfa);
      return false;
    }

    await this.mfaRepository.save(mfa);

    await this.auditService.log({
      action: 'MFA_BACKUP_CODE_USED',
      userId,
      remainingCodes: mfa.getRemainingBackupCodesCount(),
      ipAddress: command.getIpAddress(),
      deviceId: command.getDeviceId(),
      correlationId: command.correlationId,
    });

    return true;
  }

  private async trustDevice(userId: string, deviceId: string): Promise<void> {
    const trustedDevices = await this.cacheService.get(`trusted_devices:${userId}`) || [];
    if (!trustedDevices.includes(deviceId)) {
      trustedDevices.push(deviceId);
      await this.cacheService.set(
        `trusted_devices:${userId}`,
        trustedDevices,
        30 * 24 * 3600 // 30 days
      );
    }
  }

  private getMFAMethodForType(type: string): string {
    switch (type) {
      case 'TOTP': return 'AUTHENTICATOR_APP';
      case 'SMS': return 'SMS_OTP';
      case 'EMAIL': return 'EMAIL_OTP';
      default: return 'AUTHENTICATOR_APP';
    }
  }

  private async hashBackupCode(code: string): Promise<string> {
    // Hash backup code for storage
    return this.passwordHasher.hash(code);
  }
}
