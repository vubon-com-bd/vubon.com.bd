/**
 * Get MFA Status Query Handler - Application Layer
 * 
 * @module application/queries/mfa/get-mfa-status.handler
 * 
 * @description
 * Handles retrieving MFA status for a user.
 * Features:
 * - Complete MFA status including lock state
 * - Backup codes information
 * - Masked contact info for SMS/Email MFA
 * - Audit logging
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only MFA status retrieval
 * ✅ Repository coordination
 * ✅ Read-only operation (no state change)
 * ✅ DTO mapping
 * ✅ Audit logging
 */

import { Injectable } from '@nestjs/common';

import { GetMfaStatusQuery } from './get-mfa-status.query';
import { MFARepository } from '../../../domain/repositories/mfa.repository.interface';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';

import { AuditService } from './infrastructure.interface';

// ============================================================
// MFA Status Response DTO
// ============================================================

export interface MfaStatusResponseDto {
  enabled: boolean;
  type ? : string;
  isVerified: boolean;
  isPending ? : boolean;
  isLocked ? : boolean;
  remainingAttempts ? : number;
  remainingLockTimeMinutes ? : number;
  hasBackupCodes ? : boolean;
  remainingBackupCodes ? : number;
  areBackupCodesLow ? : boolean;
  maskedPhone ? : string;
  maskedEmail ? : string;
  verifiedAt ? : string;
  lastUsedAt ? : string;
}

// ============================================================
// Get MFA Status Handler
// ============================================================

@Injectable()
export class GetMfaStatusHandler {
  constructor(
    private readonly mfaRepository: MFARepository,
    private readonly userRepository: UserRepository,
    private readonly auditService: AuditService
  ) {}
  
  async execute(query: GetMfaStatusQuery): Promise < MfaStatusResponseDto > {
    const { userId, correlationId } = query;
    
    // 1. Find MFA configuration
    const mfa = await this.mfaRepository.findByUserId(userId);
    
    if (!mfa || !mfa.isEnabled()) {
      // Audit log for status check
      await this.auditService.log({
        action: 'MFA_STATUS_CHECK',
        userId,
        enabled: false,
        correlationId,
      });
      
      return {
        enabled: false,
        isVerified: false,
      };
    }
    
    // 2. Get user info for masked contact details
    const user = await this.userRepository.findById(userId);
    
    // 3. Build response with complete status
    const backupCodes = mfa.getBackupCodes();
    const remainingCount = backupCodes.length;
    
    const response: MfaStatusResponseDto = {
      enabled: mfa.isEnabled(),
      type: mfa.getType(),
      isVerified: mfa.isEnabled(),
      isPending: mfa.isPending(),
      isLocked: mfa.isLocked(),
      remainingAttempts: mfa.getRemainingAttempts(),
      remainingLockTimeMinutes: mfa.getRemainingLockTimeMinutes(),
      hasBackupCodes: remainingCount > 0,
      remainingBackupCodes: remainingCount,
      areBackupCodesLow: mfa.areBackupCodesLow(),
      verifiedAt: mfa.getVerifiedAt()?.toISOString(),
      lastUsedAt: mfa.getLastUsedAt()?.toISOString(),
    };
    
    // 4. Add masked contact info for SMS/Email MFA
    if (mfa.getType() === 'SMS' && user?.getPhone()) {
      response.maskedPhone = this.maskPhone(user.getPhone() !.getValue());
    }
    
    if (mfa.getType() === 'EMAIL') {
      response.maskedEmail = this.maskEmail(user?.getEmail().getValue() || '');
    }
    
    // 5. Audit log
    await this.auditService.log({
      action: 'MFA_STATUS_CHECK',
      userId,
      enabled: true,
      mfaType: mfa.getType(),
      isLocked: mfa.isLocked(),
      remainingBackupCodes: remainingCount,
      correlationId,
    });
    
    return response;
  }
  
  // ============================================================
  // Private Helper Methods
  // ============================================================
  
  private maskPhone(phone: string): string {
    if (phone.length <= 6) return '***';
    return phone.substring(0, phone.length - 4) + '****';
  }
  
  private maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    if (!local || !domain) return email;
    const maskedLocal = local.length <= 2 ?
      local[0] + '***' :
      local[0] + '***' + local[local.length - 1];
    return `${maskedLocal}@${domain}`;
  }
}
