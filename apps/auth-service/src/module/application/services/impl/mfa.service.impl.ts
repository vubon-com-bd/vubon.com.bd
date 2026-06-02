/**
 * MFA Service Implementation - Application Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/impl/mfa.service.impl
 * 
 * @description
 * Orchestrates Multi-Factor Authentication use cases.
 * NO business logic - coordinates domain entities and repositories.
 * 
 * Enterprise Rules:
 * ✅ Use-case orchestration only
 * ✅ Repository coordination
 * ✅ Event publishing
 * ✅ DTO mapping
 * ✅ Transaction management
 * ✅ Bangladesh specific - WhatsApp, Imo, bKash, Nagad, Rocket MFA support
 */

import { 
  Injectable, 
  NotFoundException, 
  ConflictException, 
  BadRequestException, 
  UnauthorizedException,
  TooManyRequestsException,
  Logger
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { MfaService, DeviceInfo, MfaStatistics, MFALockStatus, MFARecoveryOptions, MFAMethodInfo } from '../interfaces/mfa.service.interface';
import { EnableMfaDto, EnableMfaResponseDto, MFAStatusResponseDto, MFAType as DtoMFAType } from '../../dtos/mfa/enable-mfa.dto';
import { VerifyMfaDto, MfaVerifyResponseDto, MfaVerificationResponseDto } from '../../dtos/mfa/verify-mfa.dto';
import { DisableMfaDto, DisableMfaResponseDto } from '../../dtos/mfa/disable-mfa.dto';

import { MFARepository } from '../../../domain/repositories/mfa.repository.interface';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { DeviceRepository } from '../../../domain/repositories/device.repository.interface';

import { MFA, MFAType, MFAStatus } from '../../../domain/entities/mfa.entity';
import { User } from '../../../domain/entities/user.entity';
import { Session } from '../../../domain/entities/session.entity';
import { DeviceId } from '../../../domain/value-objects/device-id.vo';
import { IpAddress } from '../../../domain/value-objects/ip-address.vo';
import { UserAgent } from '../../../domain/value-objects/user-agent.vo';
import { Token } from '../../../domain/value-objects/token.vo';

// Import from shared-constants (Phase 1)
import { 
  MFA_CONFIG, 
  MFA_PRIORITY, 
  MFA_DISPLAY_NAMES,
  MFA_DISPLAY_NAMES_BN,
  MFA_METHOD_PRIORITY,
  BACKUP_CODE_CONFIG,
  OTP_CONFIG as SHARED_OTP_CONFIG
} from '@vubon/shared-constants';

// Import from shared-types (Phase 1)
import type { MFAType as SharedMFAType, MFAStatus as SharedMFAStatus } from '@vubon/shared-types';

// Import events
import { MfaEnabledEvent } from '../../events/mfa-enabled.event';
import { MfaDisabledEvent, MFADisableReason } from '../../events/mfa-disabled.event';
import { MfaVerificationFailedEvent } from '../../events/mfa-verification-failed.event';
import { MfaBackupCodeUsedEvent } from '../../events/mfa-backup-code-used.event';
import { MfaBackupCodesRegeneratedEvent } from '../../events/mfa-backup-codes-regenerated.event';
import { MfaLockResetEvent } from '../../events/mfa-lock-reset.event';
import { MfaPrimaryMethodChangedEvent } from '../../events/mfa-primary-method-changed.event';
import { MfaMethodRemovedEvent } from '../../events/mfa-method-removed.event';

import { MfaMapper, MfaBackupCodesResponseDto } from '../../mappers/mfa.mapper';
import { MfaGenerator, EventBus, TransactionManager, CacheService, PasswordHasher, TokenGenerator } from './infrastructure.interface';
import { CacheKeyBuilder } from '../interfaces/cache.service.interface';

// ============================================================
// Helper Functions
// ============================================================

/**
 * Generate unique ID
 */
function generateId(): string {
  return uuidv4();
}

/**
 * Generate event ID
 */
function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
}

/**
 * Hash backup codes for storage
 */
async function hashBackupCodes(codes: string[], hasher: PasswordHasher): Promise<string[]> {
  const hashed: string[] = [];
  for (const code of codes) {
    hashed.push(await hasher.hash(code));
  }
  return hashed;
}

/**
 * Mask email for privacy
 */
function maskEmail(email: string): string {
  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) return email;
  if (localPart.length <= 2) {
    return `${localPart[0]}***@${domain}`;
  }
  const firstChar = localPart[0];
  const lastChar = localPart[localPart.length - 1];
  return `${firstChar}***${lastChar}@${domain}`;
}

/**
 * Mask phone number for privacy
 */
function maskPhone(phone: string): string {
  if (phone.length <= 8) return phone;
  const prefix = phone.substring(0, phone.length - 6);
  const suffix = phone.substring(phone.length - 2);
  return `${prefix}******${suffix}`;
}

/**
 * Mask account number for privacy
 */
function maskAccountNumber(account: string): string {
  if (account.length <= 8) return account;
  const prefix = account.substring(0, account.length - 6);
  const suffix = account.substring(account.length - 4);
  return `${prefix}****${suffix}`;
}

/**
 * Mask identifier based on MFA type
 */
function maskIdentifier(identifier: string, type: MFAType): string {
  switch (type) {
    case MFAType.EMAIL:
      return maskEmail(identifier);
    case MFAType.SMS:
    case MFAType.WHATSAPP:
    case MFAType.IMO:
    case MFAType.VOICE_CALL:
      return maskPhone(identifier);
    case MFAType.BKASH_PIN:
    case MFAType.NAGAD_PIN:
    case MFAType.ROCKET_PIN:
      return maskAccountNumber(identifier);
    default:
      return identifier;
  }
}

/**
 * Get MFA type display name (English)
 */
function getMfaTypeDisplayName(type: MFAType): string {
  const names: Record<MFAType, string> = {
    [MFAType.TOTP]: 'Authenticator App',
    [MFAType.SMS]: 'SMS',
    [MFAType.EMAIL]: 'Email',
    [MFAType.WEBAUTHN]: 'Biometric (Passkey)',
    [MFAType.WHATSAPP]: 'WhatsApp',
    [MFAType.IMO]: 'Imo',
    [MFAType.BKASH_PIN]: 'bKash PIN',
    [MFAType.NAGAD_PIN]: 'Nagad PIN',
    [MFAType.ROCKET_PIN]: 'Rocket PIN',
    [MFAType.VOICE_CALL]: 'Voice Call',
  };
  return names[type] || 'Unknown';
}

/**
 * Get MFA type display name (Bengali)
 */
function getMfaTypeDisplayNameBn(type: MFAType): string {
  const names: Record<MFAType, string> = {
    [MFAType.TOTP]: 'অথেনটিকেটর অ্যাপ',
    [MFAType.SMS]: 'এসএমএস',
    [MFAType.EMAIL]: 'ইমেইল',
    [MFAType.WEBAUTHN]: 'বায়োমেট্রিক (পাসকি)',
    [MFAType.WHATSAPP]: 'হোয়াটসঅ্যাপ',
    [MFAType.IMO]: 'আইএমও',
    [MFAType.BKASH_PIN]: 'বিকাশ পিন',
    [MFAType.NAGAD_PIN]: 'নগদ পিন',
    [MFAType.ROCKET_PIN]: 'রকেট পিন',
    [MFAType.VOICE_CALL]: 'ভয়েস কল',
  };
  return names[type] || 'অজানা';
}

// ============================================================
// MFA Service Implementation
// ============================================================

@Injectable()
export class MfaServiceImpl implements MfaService {
  private readonly logger = new Logger(MfaServiceImpl.name);

  constructor(
    private readonly mfaRepository: MFARepository,
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly deviceRepository: DeviceRepository,
    private readonly mfaGenerator: MfaGenerator,
    private readonly eventBus: EventBus,
    private readonly transactionManager: TransactionManager,
    private readonly cacheService: CacheService,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenGenerator: TokenGenerator,
  ) {}

  // ============================================================
  // Private Helper Methods
  // ============================================================

  private async findUserOrThrow(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private async findMfaOrThrow(methodId: string, userId?: string): Promise<MFA> {
    const mfa = await this.mfaRepository.findById(methodId);
    if (!mfa) {
      throw new NotFoundException('MFA method not found');
    }
    if (userId && mfa.getUserId() !== userId) {
      throw new UnauthorizedException('MFA method does not belong to this user');
    }
    return mfa;
  }

  private async checkBackupCodeRegenerationLimit(userId: string): Promise<boolean> {
    const key = CacheKeyBuilder.mfaBackupRegenerate(userId);
    const lastRegenerate = await this.cacheService.get<number>(key);
    const cooldownMs = MFA_CONFIG.BACKUP_CODE_REGENERATE_COOLDOWN_HOURS * 60 * 60 * 1000;
    return !lastRegenerate || (Date.now() - lastRegenerate) > cooldownMs;
  }

  private async recordBackupCodeRegeneration(userId: string): Promise<void> {
    const key = CacheKeyBuilder.mfaBackupRegenerate(userId);
    await this.cacheService.set(key, Date.now(), MFA_CONFIG.BACKUP_CODE_REGENERATE_COOLDOWN_HOURS * 3600);
  }

  private async createTrustedDevice(
    user: User,
    deviceId: string,
    deviceInfo: DeviceInfo
  ): Promise<string | undefined> {
    try {
      const device = await this.deviceRepository.findByDeviceId(new DeviceId(deviceId));
      if (device) {
        device.trust();
        await this.deviceRepository.save(device);
        return device.getId();
      }
      return undefined;
    } catch (error) {
      this.logger.warn(`Failed to create trusted device: ${error.message}`);
      return undefined;
    }
  }

  private getMfaPriority(type: MFAType): number {
    const priorityMap: Record<MFAType, number> = {
      [MFAType.WEBAUTHN]: 1,
      [MFAType.TOTP]: 2,
      [MFAType.PUSH]: 3,
      [MFAType.WHATSAPP]: 4,
      [MFAType.SMS]: 5,
      [MFAType.IMO]: 6,
      [MFAType.BKASH_PIN]: 7,
      [MFAType.NAGAD_PIN]: 7,
      [MFAType.ROCKET_PIN]: 7,
      [MFAType.EMAIL]: 8,
      [MFAType.VOICE_CALL]: 9,
      [MFAType.BACKUP_CODE]: 10,
    };
    return priorityMap[type] || 10;
  }

  // ============================================================
  // MFA Setup
  // ============================================================

  async enableMfa(
    userId: string,
    dto: EnableMfaDto,
    deviceInfo: DeviceInfo
  ): Promise<EnableMfaResponseDto> {
    const user = await this.findUserOrThrow(userId);

    // Check if MFA already enabled for this type
    const existingMfa = await this.mfaRepository.findByUserIdAndType(userId, dto.type as MFAType);
    if (existingMfa && existingMfa.isEnabled()) {
      throw new ConflictException(`MFA with type ${dto.type} is already enabled`);
    }

    let setupResult;

    switch (dto.type) {
      case DtoMFAType.TOTP:
        setupResult = await this.setupTOTP(user, dto, deviceInfo);
        break;
      case DtoMFAType.SMS:
        setupResult = await this.setupSMS(user, dto, deviceInfo);
        break;
      case DtoMFAType.EMAIL:
        setupResult = await this.setupEmail(user, dto, deviceInfo);
        break;
      case DtoMFAType.WHATSAPP:
        setupResult = await this.setupWhatsApp(user, dto, deviceInfo);
        break;
      case DtoMFAType.BKASH_PIN:
        setupResult = await this.setupBkashPin(user, dto, deviceInfo);
        break;
      case DtoMFAType.NAGAD_PIN:
        setupResult = await this.setupNagadPin(user, dto, deviceInfo);
        break;
      case DtoMFAType.ROCKET_PIN:
        setupResult = await this.setupRocketPin(user, dto, deviceInfo);
        break;
      default:
        throw new BadRequestException(`Unsupported MFA type: ${dto.type}`);
    }

    return new EnableMfaResponseDto(dto.type as MFAType, setupResult);
  }

  private async setupTOTP(
    user: User,
    dto: EnableMfaDto,
    deviceInfo: DeviceInfo
  ): Promise<any> {
    const email = user.getEmail().getValue();
    const secret = await this.mfaGenerator.generateTOTPSecret(email);
    const backupCodes = await this.mfaGenerator.generateBackupCodes(
      BACKUP_CODE_CONFIG.DEFAULT_COUNT,
      BACKUP_CODE_CONFIG.DEFAULT_LENGTH,
      'formatted-with-hyphen'
    );
    const hashedBackupCodes = await hashBackupCodes(backupCodes, this.passwordHasher);
    const priority = this.getMfaPriority(MFAType.TOTP);

    const mfa = MFA.enable(
      user.getId(),
      MFAType.TOTP,
      email,
      secret.secret,
      hashedBackupCodes,
      dto.makePrimary || false,
      priority,
      { generate: () => generateId() }
    );

    await this.mfaRepository.save(mfa);

    return {
      methodId: mfa.getId(),
      secret: secret.secret,
      qrCodeUri: secret.qrCodeUri,
      provisioningUri: secret.provisioningUri,
      recoveryCodes: backupCodes,
    };
  }

  private async setupSMS(
    user: User,
    dto: EnableMfaDto,
    deviceInfo: DeviceInfo
  ): Promise<any> {
    if (!dto.phone) {
      throw new BadRequestException('Phone number is required for SMS MFA');
    }

    const otpResult = await this.mfaGenerator.generateSmsOtp(dto.phone, 'bn');
    const backupCodes = await this.mfaGenerator.generateBackupCodes(
      BACKUP_CODE_CONFIG.DEFAULT_COUNT,
      BACKUP_CODE_CONFIG.DEFAULT_LENGTH,
      'formatted-with-hyphen'
    );
    const hashedBackupCodes = await hashBackupCodes(backupCodes, this.passwordHasher);
    const priority = this.getMfaPriority(MFAType.SMS);

    const mfa = MFA.enable(
      user.getId(),
      MFAType.SMS,
      dto.phone,
      '',
      hashedBackupCodes,
      dto.makePrimary || false,
      priority,
      { generate: () => generateId() }
    );

    await this.mfaRepository.save(mfa);

    // Store OTP session using CacheKeyBuilder
    const otpKey = CacheKeyBuilder.mfaOtp(mfa.getId());
    await this.cacheService.set(
      otpKey,
      { sessionId: otpResult.sessionId, phone: dto.phone },
      MFA_CONFIG.VERIFICATION_SESSION_TTL_SECONDS
    );

    return {
      methodId: mfa.getId(),
      maskedPhone: otpResult.maskedPhone,
      recoveryCodes: backupCodes,
      resendCooldownSeconds: otpResult.resendCooldownSeconds,
    };
  }

  private async setupWhatsApp(
    user: User,
    dto: EnableMfaDto,
    deviceInfo: DeviceInfo
  ): Promise<any> {
    if (!dto.phone) {
      throw new BadRequestException('Phone number is required for WhatsApp MFA');
    }

    const otpResult = await this.mfaGenerator.generateWhatsAppOtp(dto.phone, 'bn');
    const backupCodes = await this.mfaGenerator.generateBackupCodes(
      BACKUP_CODE_CONFIG.DEFAULT_COUNT,
      BACKUP_CODE_CONFIG.DEFAULT_LENGTH,
      'formatted-with-hyphen'
    );
    const hashedBackupCodes = await hashBackupCodes(backupCodes, this.passwordHasher);
    const priority = this.getMfaPriority(MFAType.WHATSAPP);

    const mfa = MFA.enable(
      user.getId(),
      MFAType.WHATSAPP,
      dto.phone,
      '',
      hashedBackupCodes,
      dto.makePrimary || false,
      priority,
      { generate: () => generateId() }
    );

    await this.mfaRepository.save(mfa);

    const otpKey = CacheKeyBuilder.mfaOtp(mfa.getId());
    await this.cacheService.set(
      otpKey,
      { sessionId: otpResult.sessionId, phone: dto.phone },
      MFA_CONFIG.VERIFICATION_SESSION_TTL_SECONDS
    );

    return {
      methodId: mfa.getId(),
      maskedPhone: otpResult.maskedPhone,
      recoveryCodes: backupCodes,
      resendCooldownSeconds: otpResult.resendCooldownSeconds,
    };
  }

  private async setupBkashPin(
    user: User,
    dto: EnableMfaDto,
    deviceInfo: DeviceInfo
  ): Promise<any> {
    if (!dto.bkashAccount) {
      throw new BadRequestException('bKash account is required for bKash PIN MFA');
    }

    const backupCodes = await this.mfaGenerator.generateBackupCodes(
      BACKUP_CODE_CONFIG.DEFAULT_COUNT,
      BACKUP_CODE_CONFIG.DEFAULT_LENGTH,
      'formatted-with-hyphen'
    );
    const hashedBackupCodes = await hashBackupCodes(backupCodes, this.passwordHasher);
    const priority = this.getMfaPriority(MFAType.BKASH_PIN);

    const mfa = MFA.enable(
      user.getId(),
      MFAType.BKASH_PIN,
      dto.bkashAccount,
      '',
      hashedBackupCodes,
      dto.makePrimary || false,
      priority,
      { generate: () => generateId() }
    );

    await this.mfaRepository.save(mfa);

    return {
      methodId: mfa.getId(),
      maskedAccount: maskAccountNumber(dto.bkashAccount),
      provider: 'bKash',
      recoveryCodes: backupCodes,
    };
  }

  private async setupNagadPin(
    user: User,
    dto: EnableMfaDto,
    deviceInfo: DeviceInfo
  ): Promise<any> {
    if (!dto.nagadAccount) {
      throw new BadRequestException('Nagad account is required for Nagad PIN MFA');
    }

    const backupCodes = await this.mfaGenerator.generateBackupCodes(
      BACKUP_CODE_CONFIG.DEFAULT_COUNT,
      BACKUP_CODE_CONFIG.DEFAULT_LENGTH,
      'formatted-with-hyphen'
    );
    const hashedBackupCodes = await hashBackupCodes(backupCodes, this.passwordHasher);
    const priority = this.getMfaPriority(MFAType.NAGAD_PIN);

    const mfa = MFA.enable(
      user.getId(),
      MFAType.NAGAD_PIN,
      dto.nagadAccount,
      '',
      hashedBackupCodes,
      dto.makePrimary || false,
      priority,
      { generate: () => generateId() }
    );

    await this.mfaRepository.save(mfa);

    return {
      methodId: mfa.getId(),
      maskedAccount: maskAccountNumber(dto.nagadAccount),
      provider: 'Nagad',
      recoveryCodes: backupCodes,
    };
  }

  private async setupRocketPin(
    user: User,
    dto: EnableMfaDto,
    deviceInfo: DeviceInfo
  ): Promise<any> {
    if (!dto.rocketAccount) {
      throw new BadRequestException('Rocket account is required for Rocket PIN MFA');
    }

    const backupCodes = await this.mfaGenerator.generateBackupCodes(
      BACKUP_CODE_CONFIG.DEFAULT_COUNT,
      BACKUP_CODE_CONFIG.DEFAULT_LENGTH,
      'formatted-with-hyphen'
    );
    const hashedBackupCodes = await hashBackupCodes(backupCodes, this.passwordHasher);
    const priority = this.getMfaPriority(MFAType.ROCKET_PIN);

    const mfa = MFA.enable(
      user.getId(),
      MFAType.ROCKET_PIN,
      dto.rocketAccount,
      '',
      hashedBackupCodes,
      dto.makePrimary || false,
      priority,
      { generate: () => generateId() }
    );

    await this.mfaRepository.save(mfa);

    return {
      methodId: mfa.getId(),
      maskedAccount: maskAccountNumber(dto.rocketAccount),
      provider: 'Rocket',
      recoveryCodes: backupCodes,
    };
  }

  private async setupEmail(
    user: User,
    dto: EnableMfaDto,
    deviceInfo: DeviceInfo
  ): Promise<any> {
    const email = user.getEmail().getValue();
    const otpResult = await this.mfaGenerator.generateEmailOtp(email, 'bn');
    const backupCodes = await this.mfaGenerator.generateBackupCodes(
      BACKUP_CODE_CONFIG.DEFAULT_COUNT,
      BACKUP_CODE_CONFIG.DEFAULT_LENGTH,
      'formatted-with-hyphen'
    );
    const hashedBackupCodes = await hashBackupCodes(backupCodes, this.passwordHasher);
    const priority = this.getMfaPriority(MFAType.EMAIL);

    const mfa = MFA.enable(
      user.getId(),
      MFAType.EMAIL,
      email,
      '',
      hashedBackupCodes,
      dto.makePrimary || false,
      priority,
      { generate: () => generateId() }
    );

    await this.mfaRepository.save(mfa);

    const otpKey = CacheKeyBuilder.mfaOtp(mfa.getId());
    await this.cacheService.set(
      otpKey,
      { sessionId: otpResult.sessionId, email },
      MFA_CONFIG.VERIFICATION_SESSION_TTL_SECONDS
    );

    return {
      methodId: mfa.getId(),
      maskedEmail: maskEmail(email),
      recoveryCodes: backupCodes,
      resendCooldownSeconds: otpResult.resendCooldownSeconds,
    };
  }

  // ============================================================
  // MFA Verification (Setup & Login)
  // ============================================================

  async verifyMfaSetup(
    userId: string,
    type: string,
    code: string,
    deviceInfo: DeviceInfo
  ): Promise<MfaVerificationResponseDto> {
    const mfa = await this.mfaRepository.findByUserIdAndType(userId, type as MFAType);
    
    if (!mfa || mfa.getStatus() !== MFAStatus.PENDING_VERIFICATION) {
      throw new BadRequestException('MFA setup not found or already verified');
    }

    let isValid = false;

    switch (type as MFAType) {
      case MFAType.TOTP:
        isValid = await this.mfaGenerator.verifyTOTPCode(mfa.getSecret(), code);
        break;
      case MFAType.SMS:
      case MFAType.WHATSAPP:
      case MFAType.EMAIL:
        const otpKey = CacheKeyBuilder.mfaOtp(mfa.getId());
        const otpData = await this.cacheService.get<{ sessionId: string; phone?: string; email?: string }>(otpKey);
        if (otpData) {
          if (type === MFAType.SMS) {
            isValid = await this.mfaGenerator.verifySmsOtp(otpData.phone!, code, otpData.sessionId);
          } else if (type === MFAType.WHATSAPP) {
            isValid = await this.mfaGenerator.verifyWhatsAppOtp(otpData.phone!, code, otpData.sessionId);
          } else {
            isValid = await this.mfaGenerator.verifyEmailOtp(otpData.email!, code, otpData.sessionId);
          }
        }
        break;
      case MFAType.BKASH_PIN:
        isValid = (await this.mfaGenerator.verifyBkashPin(mfa.getIdentifier(), code)).isValid;
        break;
      case MFAType.NAGAD_PIN:
        isValid = (await this.mfaGenerator.verifyNagadPin(mfa.getIdentifier(), code)).isValid;
        break;
      case MFAType.ROCKET_PIN:
        isValid = (await this.mfaGenerator.verifyRocketPin(mfa.getIdentifier(), code)).isValid;
        break;
      default:
        throw new BadRequestException(`Unsupported MFA type: ${type}`);
    }
    
    if (!isValid) {
      mfa.recordVerificationFailure();
      await this.mfaRepository.save(mfa);
      throw new BadRequestException('Invalid verification code');
    }

    // Complete MFA setup
    mfa.markAsVerified();
    
    const user = await this.findUserOrThrow(userId);
    user.enableMFA();

    await this.transactionManager.runInTransaction(async () => {
      await this.mfaRepository.save(mfa);
      await this.userRepository.save(user);
    });

    // Clean up OTP session
    const otpKey = CacheKeyBuilder.mfaOtp(mfa.getId());
    await this.cacheService.del(otpKey);

    await this.eventBus.publish(
      new MfaEnabledEvent(
        userId,
        type as MFAType,
        mfa.getId(),
        generateEventId(),
        deviceInfo.correlationId || generateEventId(),
        deviceInfo.ipAddress,
        deviceInfo.userAgent,
        { setupTime: new Date().toISOString() }
      )
    );

    return {
      success: true,
      message: 'MFA enabled successfully',
      messageBn: 'এমএফএ সফলভাবে সক্রিয় করা হয়েছে',
      methodId: mfa.getId(),
    };
  }

  async verifyMfaSetupWithMethodId(
    userId: string,
    methodId: string,
    code: string,
    deviceInfo: DeviceInfo
  ): Promise<MfaVerificationResponseDto> {
    const mfa = await this.findMfaOrThrow(methodId, userId);
    return this.verifyMfaSetup(userId, mfa.getType(), code, deviceInfo);
  }

  async verifyMfa(
    userId: string,
    dto: VerifyMfaDto,
    deviceInfo: DeviceInfo
  ): Promise<MfaVerifyResponseDto> {
    // Get MFA session from cache
    const sessionKey = CacheKeyBuilder.mfaLoginSession(dto.mfaSessionId);
    const sessionData = await this.cacheService.get<{ userId: string; sessionId: string }>(sessionKey);
    if (!sessionData || sessionData.userId !== userId) {
      throw new UnauthorizedException('Invalid or expired MFA session');
    }

    const method = dto.method as MFAType;
    const mfa = await this.mfaRepository.findByUserIdAndType(userId, method);
    
    if (!mfa || !mfa.isEnabled()) {
      throw new BadRequestException('MFA is not enabled for this user');
    }

    // Check if MFA is locked
    if (mfa.isLocked()) {
      const remainingMinutes = mfa.getRemainingLockTimeMinutes();
      throw new UnauthorizedException(`MFA is locked. Try again in ${remainingMinutes} minutes.`);
    }

    let verified = false;

    // Verify using appropriate method
    if (dto.backupCode) {
      const hashedCode = await this.passwordHasher.hash(dto.backupCode);
      const backupCodes = mfa.getBackupCodes() as string[];
      const index = backupCodes.findIndex(code => code === hashedCode);
      verified = index !== -1;
      
      if (verified) {
        const updatedCodes = [...backupCodes];
        updatedCodes.splice(index, 1);
        await this.mfaRepository.updateBackupCodes(mfa.getId(), updatedCodes);
        
        await this.eventBus.publish(
          new MfaBackupCodeUsedEvent(
            userId,
            generateEventId(),
            deviceInfo.correlationId || generateEventId(),
            updatedCodes.length
          )
        );
      }
    } else if (dto.code) {
      switch (method) {
        case MFAType.TOTP:
          verified = await this.mfaGenerator.verifyTOTPCode(mfa.getSecret(), dto.code);
          break;
        case MFAType.SMS:
          verified = await this.mfaGenerator.verifySmsOtp(mfa.getIdentifier(), dto.code, dto.sessionId);
          break;
        case MFAType.WHATSAPP:
          verified = await this.mfaGenerator.verifyWhatsAppOtp(mfa.getIdentifier(), dto.code, dto.sessionId);
          break;
        case MFAType.EMAIL:
          verified = await this.mfaGenerator.verifyEmailOtp(mfa.getIdentifier(), dto.code, dto.sessionId);
          break;
        case MFAType.BKASH_PIN:
          verified = (await this.mfaGenerator.verifyBkashPin(mfa.getIdentifier(), dto.code)).isValid;
          break;
        case MFAType.NAGAD_PIN:
          verified = (await this.mfaGenerator.verifyNagadPin(mfa.getIdentifier(), dto.code)).isValid;
          break;
        case MFAType.ROCKET_PIN:
          verified = (await this.mfaGenerator.verifyRocketPin(mfa.getIdentifier(), dto.code)).isValid;
          break;
        default:
          throw new BadRequestException(`Unsupported MFA method: ${method}`);
      }
    }

    // Track verification attempt
    if (!verified) {
      mfa.recordVerificationFailure();
      await this.mfaRepository.save(mfa);
      
      await this.eventBus.publish(
        new MfaVerificationFailedEvent(
          userId,
          deviceInfo.ipAddress,
          mfa.getRemainingAttempts(),
          generateEventId(),
          deviceInfo.correlationId || generateEventId()
        )
      );
      
      const remainingAttempts = mfa.getRemainingAttempts();
      if (remainingAttempts === 0) {
        throw new UnauthorizedException('MFA has been locked due to too many failed attempts');
      }
      
      throw new UnauthorizedException(`Invalid MFA code. ${remainingAttempts} attempts remaining.`);
    }

    // Reset failed attempts on success
    mfa.recordSuccessfulVerification();
    await this.mfaRepository.save(mfa);

    // Generate new tokens
    const user = await this.findUserOrThrow(userId);
    const tokenPair = await this.tokenGenerator.generateTokenPair(
      userId,
      user.getEmail().getValue(),
      user.getRole(),
      { sessionId: sessionData.sessionId }
    );

    // Create trusted device session if requested
    let trustedDeviceId: string | undefined;
    if (dto.trustDevice && dto.deviceId) {
      trustedDeviceId = await this.createTrustedDevice(user, dto.deviceId, deviceInfo);
    }

    // Delete MFA session from cache
    await this.cacheService.del(sessionKey);

    return {
      success: true,
      verified: true,
      methodUsed: method,
      remainingAttempts: MFA_CONFIG.MAX_VERIFICATION_ATTEMPTS,
      accessToken: tokenPair.accessToken,
      refreshToken: tokenPair.refreshToken || '',
      expiresIn: tokenPair.expiresIn,
      refreshExpiresIn: tokenPair.refreshExpiresIn || 604800,
      tokenType: 'Bearer',
      sessionId: sessionData.sessionId,
      user: {
        id: user.getId(),
        email: user.getEmail().getValue(),
        fullName: user.getFullName(),
        role: user.getRole(),
      },
      deviceTrusted: !!trustedDeviceId,
    };
  }

  async verifyBackupCode(
    userId: string,
    backupCode: string,
    deviceInfo: DeviceInfo
  ): Promise<{ isValid: boolean; remainingCodes: number; warning?: string; warningBn?: string; isLow: boolean }> {
    const mfa = await this.mfaRepository.findByUserId(userId);
    
    if (!mfa || !mfa.isEnabled()) {
      return { isValid: false, remainingCodes: 0, isLow: false };
    }

    const hashedCode = await this.passwordHasher.hash(backupCode);
    const backupCodes = mfa.getBackupCodes() as string[];
    const index = backupCodes.findIndex(code => code === hashedCode);
    
    const isValid = index !== -1;
    const remainingCodes = isValid ? backupCodes.length - 1 : backupCodes.length;
    
    if (isValid) {
      const updatedCodes = [...backupCodes];
      updatedCodes.splice(index, 1);
      await this.mfaRepository.updateBackupCodes(mfa.getId(), updatedCodes);
      
      const isLow = remainingCodes <= 3;
      const warning = isLow 
        ? `You have only ${remainingCodes} backup codes remaining. Please generate new ones.`
        : undefined;
      const warningBn = isLow
        ? `আপনার কাছে মাত্র ${remainingCodes}টি ব্যাকআপ কোড বাকি আছে। অনুগ্রহ করে নতুন জেনারেট করুন।`
        : undefined;
      
      return {
        isValid: true,
        remainingCodes,
        warning,
        warningBn,
        isLow,
      };
    }
    
    return { isValid: false, remainingCodes, isLow: remainingCodes <= 3 };
  }

  async verifyRecoveryCode(
    userId: string,
    recoveryCode: string,
    deviceInfo: DeviceInfo
  ): Promise<{ isValid: boolean; temporaryAccessToken?: string; expiresIn?: number }> {
    const mfa = await this.mfaRepository.findByUserId(userId);
    
    if (!mfa || !mfa.isEnabled()) {
      return { isValid: false };
    }

    const hashedCode = await this.passwordHasher.hash(recoveryCode);
    const backupCodes = mfa.getBackupCodes() as string[];
    const isValid = backupCodes.includes(hashedCode);
    
    if (isValid) {
      // Generate temporary access token for recovery
      const user = await this.findUserOrThrow(userId);
      const temporaryToken = await this.tokenGenerator.generateAccessToken(
        userId,
        user.getEmail().getValue(),
        user.getRole(),
        { expiresIn: '15m' }
      );
      
      return {
        isValid: true,
        temporaryAccessToken: temporaryToken,
        expiresIn: 900, // 15 minutes
      };
    }
    
    return { isValid: false };
  }

  // ============================================================
  // MFA Management
  // ============================================================

  async disableMfa(
    userId: string,
    dto: DisableMfaDto,
    deviceInfo: DeviceInfo
  ): Promise<DisableMfaResponseDto> {
    let mfa: MFA | null = null;
    
    if (dto.methodId) {
      mfa = await this.findMfaOrThrow(dto.methodId, userId);
    } else {
      mfa = await this.mfaRepository.findByUserId(userId);
    }
    
    if (!mfa || !mfa.isEnabled()) {
      throw new BadRequestException('MFA is not enabled');
    }

    let verified = false;

    // Verify using appropriate method
    if (dto.code) {
      switch (mfa.getType()) {
        case MFAType.TOTP:
          verified = await this.mfaGenerator.verifyTOTPCode(mfa.getSecret(), dto.code);
          break;
        case MFAType.SMS:
          verified = await this.mfaGenerator.
