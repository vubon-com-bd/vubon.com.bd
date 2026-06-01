/**
 * Enable MFA Command Handler - Application Layer
 * 
 * @module application/commands/mfa/enable-mfa.handler
 * 
 * @description
 * Handles MFA enable use case with features including:
 * - TOTP secret generation
 * - QR code generation for authenticator apps
 * - Backup code generation for recovery
 * - SMS MFA phone number validation
 * - Audit logging
 * - Event publishing
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only MFA enable
 * ✅ Repository coordination
 * ✅ Security validation
 * ✅ Event publishing
 * ✅ Audit logging
 */

import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';

import { EnableMfaCommand, MfaType } from './enable-mfa.command';
import { MFARepository } from '../../../domain/repositories/mfa.repository.interface';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { MFA } from '../../../domain/entities/mfa.entity';

import { MfaSetupInitiatedEvent } from '../../events/mfa-setup-initiated.event';

import { MfaGenerator, EventBus, AuditService, IdGenerator } from './infrastructure.interface';

// ============================================================
// Enable MFA Response DTO
// ============================================================

export interface EnableMfaResponseDto {
  secret: string;
  qrCode: string;
  provisioningUri: string;
  backupCodes: string[];
  recoveryCodesCount: number;
}

// ============================================================
// Enable MFA Handler
// ============================================================

@Injectable()
export class EnableMfaHandler {
  constructor(
    private readonly mfaRepository: MFARepository,
    private readonly userRepository: UserRepository,
    private readonly mfaGenerator: MfaGenerator,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly idGenerator: IdGenerator
  ) {}
  
  async execute(userId: string, command: EnableMfaCommand): Promise < EnableMfaResponseDto > {
    const { type, deviceInfo, deviceName, correlationId, phoneNumber } = command;
    
    // 1. Validate SMS MFA has phone number
    if (command.isSms() && !command.validateSmsPhone()) {
      throw new BadRequestException('Phone number is required for SMS MFA');
    }
    
    // 2. Find user
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    // 3. Check if MFA already enabled for this type
    const existingMfa = await this.mfaRepository.findByUserIdAndType(userId, type);
    if (existingMfa && existingMfa.isEnabled()) {
      throw new ConflictException(`MFA with type ${type} is already enabled`);
    }
    
    // 4. Check if there's a pending setup
    if (existingMfa && existingMfa.isPending()) {
      // Delete or reuse pending setup? For now, delete and create new
      await this.mfaRepository.delete(existingMfa.getId());
    }
    
    // 5. Generate secret and backup codes
    const secret = this.mfaGenerator.generateSecret();
    const backupCodes = this.generateBackupCodes();
    const qrCode = await this.mfaGenerator.generateQrCode(secret, user.getEmail().getValue());
    const provisioningUri = this.mfaGenerator.getProvisioningUri(secret, user.getEmail().getValue());
    
    // 6. Create MFA entity (pending verification)
    const mfa = MFA.enable(
      userId,
      type,
      secret,
      backupCodes,
      this.idGenerator.generate()
    );
    
    // 7. For SMS MFA, store masked phone number in metadata
    if (command.isSms() && phoneNumber) {
      // Store phone number in MFA entity (would need additional field)
      // In production, you'd add a phone field to MFA entity
    }
    
    // 8. Save MFA entity
    await this.mfaRepository.save(mfa);
    
    // 9. Publish event
    await this.eventBus.publish(
      new MfaSetupInitiatedEvent(
        userId,
        type,
        deviceInfo?.ipAddress,
        deviceInfo?.deviceId,
        deviceInfo?.userAgent,
        correlationId,
        {
          deviceName,
          maskedPhone: command.getMaskedPhone(),
        }
      )
    );
    
    // 10. Audit log
    await this.auditService.log({
      action: 'MFA_SETUP_INITIATED',
      userId,
      mfaType: type,
      deviceName,
      maskedPhone: command.getMaskedPhone(),
      ipAddress: deviceInfo?.ipAddress,
      deviceId: deviceInfo?.deviceId,
      userAgent: deviceInfo?.userAgent,
      correlationId,
    });
    
    return {
      secret,
      qrCode,
      provisioningUri,
      backupCodes,
      recoveryCodesCount: backupCodes.length,
    };
  }
  
  // ============================================================
  // Private Helper Methods
  // ============================================================
  
  private generateBackupCodes(): string[] {
    const codes: string[] = [];
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    
    for (let i = 0; i < 10; i++) {
      let code = '';
      for (let j = 0; j < 8; j++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
        if (j === 3) code += '-';
      }
      codes.push(code);
    }
    
    return codes;
  }
}
