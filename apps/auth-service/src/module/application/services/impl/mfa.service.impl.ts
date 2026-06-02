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

import { MfaService, DeviceInfo, MfaStatistics, MFALockStatus, MFARecoveryOptions } from '../interfaces/mfa.service.interface';
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

// ✅ GRUP 1: shared-constants থেকে ইম্পোর্ট
import { 
  MFA_CONFIG,
  MFA_TYPES,
  TOKEN_TYPES,
  SESSION_CONFIG,
  OTP_CONFIG,
  CACHE_KEY_PATTERNS
} from '@vubon/shared-constants';

// ✅ GRUP 2: shared-utils থেকে ইম্পোর্ট
import { 
  maskEmail, 
  maskPhoneNumber, 
  maskAccountNumber 
} from '@vubon/shared-utils';

// ✅ GRUP 3: CacheKeyBuilder ব্যবহার
import { CacheKeyBuilder } from '../interfaces/cache.service.interface';

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

  private generateId(): string {
    return crypto.randomUUID();
  }

  private async findUserOrThrow(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private async hashBackupCodes(codes: string[]): Promise<string[]> {
    const hashedCodes = await Promise.all(
      codes.map(code => this.mfaGenerator.hashBackupCode(code))
    );
    return hashedCodes;
  }

  private getMfaTypeDisplayName(type: MFAType): string {
    const displayNames: Record<MFAType, string> = {
      [MFAType.TOTP]: 'Authenticator App',
      [MFAType.SMS]: 'SMS',
      [MFAType.EMAIL]: 'Email',
      [MFAType.WEBAUTHN]: 'Passkey/Biometric',
      [MFAType.WHATSAPP]: 'WhatsApp',
      [MFAType.IMO]: 'Imo',
      [MFAType.BKASH_PIN]: 'bKash PIN',
      [MFAType.NAGAD_PIN]: 'Nagad PIN',
      [MFAType.ROCKET_PIN]: 'Rocket PIN',
      [MFAType.VOICE_CALL]: 'Voice Call',
    };
    return displayNames[type] || type;
  }

  private getMfaTypeDisplayNameBn(type: MFAType): string {
    const displayNamesBn: Record<MFAType, string> = {
      [MFAType.TOTP]: 'অথেনটিকেটর অ্যাপ',
      [MFAType.SMS]: 'এসএমএস',
      [MFAType.EMAIL]: 'ইমেইল',
      [MFAType.WEBAUTHN]: 'পাসকি/বায়োমেট্রিক',
      [MFAType.WHATSAPP]: 'হোয়াটসঅ্যাপ',
      [MFAType.IMO]: 'আইএমও',
      [MFAType.BKASH_PIN]: 'বিকাশ পিন',
      [MFAType.NAGAD_PIN]: 'নগদ পিন',
      [MFAType.ROCKET_PIN]: 'রকেট পিন',
      [MFAType.VOICE_CALL]: 'ভয়েস কল',
    };
    return displayNamesBn[type] || type;
  }

  private async checkBackupCodeRegenerationLimit(userId: string): Promise<boolean> {
    const cacheKey = CacheKeyBuilder.mfaBackupRegenerate(userId);
    const lastRegeneration = await this.cacheService.get<number>(cacheKey);
    
    if (!lastRegeneration) {
      return true;
    }
    
    const hoursSinceLastRegeneration = (Date.now() - lastRegeneration) / (1000 * 60 * 60);
    return hoursSinceLastRegeneration >= MFA_CONFIG.BACKUP_CODE_REGENERATE_COOLDOWN_HOURS;
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

    // ✅ GRUP 4: এনাম টাইপ ব্যবহার
    const mfaType = dto.type as MFAType;
    
    const existingMfa = await this.mfaRepository.findByUserIdAndType(userId, mfaType);
    if (existingMfa && existingMfa.isEnabled()) {
      throw new ConflictException(`MFA with type ${dto.type} is already enabled`);
    }

    let setupResult;

    switch (mfaType) {
      case MFAType.TOTP:
        setupResult = await this.setupTOTP(user, dto, deviceInfo);
        break;
      case MFAType.SMS:
        setupResult = await this.setupSMS(user, dto, deviceInfo);
        break;
      case MFAType.EMAIL:
        setupResult = await this.setupEmail(user, dto, deviceInfo);
        break;
      case MFAType.WHATSAPP:
        setupResult = await this.setupWhatsApp(user, dto, deviceInfo);
        break;
      case MFAType.BKASH_PIN:
        setupResult = await this.setupBkashPin(user, dto, deviceInfo);
        break;
      case MFAType.NAGAD_PIN:
        setupResult = await this.setupNagadPin(user, dto, deviceInfo);
        break;
      case MFAType.ROCKET_PIN:
        setupResult = await this.setupRocketPin(user, dto, deviceInfo);
        break;
      default:
        throw new BadRequestException(`Unsupported MFA type: ${dto.type}`);
    }

    return new EnableMfaResponseDto(mfaType, setupResult);
  }

  private async setupTOTP(
    user: User,
    dto: EnableMfaDto,
    deviceInfo: DeviceInfo
  ): Promise<any> {
    const email = user.getEmail().getValue();
    const secret = await this.mfaGenerator.generateTOTPSecret(email);
    const backupCodes = await this.mfaGenerator.generateBackupCodes();

    const hashedBackupCodes = await this.hashBackupCodes(backupCodes);

    const mfa = MFA.enable(
      user.getId(),
      MFAType.TOTP,
      email,
      secret.secret,
      hashedBackupCodes,
      dto.makePrimary || false,
      1,
      () => this.generateId()
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
    const backupCodes = await this.mfaGenerator.generateBackupCodes();
    const hashedBackupCodes = await this.hashBackupCodes(backupCodes);

    const mfa = MFA.enable(
      user.getId(),
      MFAType.SMS,
      dto.phone,
      '',
      hashedBackupCodes,
      dto.makePrimary || false,
      2,
      () => this.generateId()
    );

    await this.mfaRepository.save(mfa);

    // ✅ GRUP 3: CacheKeyBuilder ব্যবহার
    const otpKey = CacheKeyBuilder.mfaOtp(mfa.getId());
    await this.cacheService.set(
      otpKey,
      { otp: otpResult.sessionId, phone: dto.phone },
      MFA_CONFIG.VERIFICATION_SESSION_TTL_SECONDS
    );

    return {
      methodId: mfa.getId(),
      // ✅ GRUP 2: shared-utils থেকে মাস্কিং ফাংশন
      maskedPhone: maskPhoneNumber(dto.phone),
      recoveryCodes: backupCodes,
      resendCooldownSeconds: MFA_CONFIG.RESEND_COOLDOWN_SECONDS,
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
    const backupCodes = await this.mfaGenerator.generateBackupCodes();
    const hashedBackupCodes = await this.hashBackupCodes(backupCodes);

    const mfa = MFA.enable(
      user.getId(),
      MFAType.WHATSAPP,
      dto.phone,
      '',
      hashedBackupCodes,
      dto.makePrimary || false,
      4,
      () => this.generateId()
    );

    await this.mfaRepository.save(mfa);

    // ✅ GRUP 3: CacheKeyBuilder ব্যবহার
    const otpKey = CacheKeyBuilder.mfaOtp(mfa.getId());
    await this.cacheService.set(
      otpKey,
      { otp: otpResult.sessionId, phone: dto.phone },
      MFA_CONFIG.VERIFICATION_SESSION_TTL_SECONDS
    );

    return {
      methodId: mfa.getId(),
      maskedPhone: maskPhoneNumber(dto.phone),
      recoveryCodes: backupCodes,
      resendCooldownSeconds: MFA_CONFIG.RESEND_COOLDOWN_SECONDS,
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

    const backupCodes = await this.mfaGenerator.generateBackupCodes();
    const hashedBackupCodes = await this.hashBackupCodes(backupCodes);

    const mfa = MFA.enable(
      user.getId(),
      MFAType.BKASH_PIN,
      dto.bkashAccount,
      '',
      hashedBackupCodes,
      dto.makePrimary || false,
      7,
      () => this.generateId()
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

    const backupCodes = await this.mfaGenerator.generateBackupCodes();
    const hashedBackupCodes = await this.hashBackupCodes(backupCodes);

    const mfa = MFA.enable(
      user.getId(),
      MFAType.NAGAD_PIN,
      dto.nagadAccount,
      '',
      hashedBackupCodes,
      dto.makePrimary || false,
      7,
      () => this.generateId()
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

    const backupCodes = await this.mfaGenerator.generateBackupCodes();
    const hashedBackupCodes = await this.hashBackupCodes(backupCodes);

    const mfa = MFA.enable(
      user.getId(),
      MFAType.ROCKET_PIN,
      dto.rocketAccount,
      '',
      hashedBackupCodes,
      dto.makePrimary || false,
      7,
      () => this.generateId()
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
    const backupCodes = await this.mfaGenerator.generateBackupCodes();
    const hashedBackupCodes = await this.hashBackupCodes(backupCodes);

    const mfa = MFA.enable(
      user.getId(),
      MFAType.EMAIL,
      email,
      '',
      hashedBackupCodes,
      dto.makePrimary || false,
      3,
      () => this.generateId()
    );

    await this.mfaRepository.save(mfa);

    // ✅ GRUP 3: CacheKeyBuilder ব্যবহার
    const otpKey = CacheKeyBuilder.mfaOtp(mfa.getId());
    await this.cacheService.set(
      otpKey,
      { otp: otpResult.sessionId, email },
      MFA_CONFIG.VERIFICATION_SESSION_TTL_SECONDS
    );

    return {
      methodId: mfa.getId(),
      maskedEmail: maskEmail(email),
      recoveryCodes: backupCodes,
      resendCooldownSeconds: MFA_CONFIG.RESEND_COOLDOWN_SECONDS,
    };
  }

  async verifyMfaSetup(
    userId: string,
    type: string,
    code: string,
    deviceInfo: DeviceInfo
  ): Promise<MfaVerificationResponseDto> {
    // ✅ GRUP 4: এনাম টাইপ ব্যবহার
    const mfaType = type as MFAType;
    const mfa = await this.mfaRepository.findByUserIdAndType(userId, mfaType);
    
    if (!mfa || mfa.getStatus() !== MFAStatus.PENDING_VERIFICATION) {
      throw new BadRequestException('MFA setup not found or already verified');
    }

    let isValid = false;

    switch (mfaType) {
      case MFAType.TOTP:
        isValid = await this.mfaGenerator.verifyTOTPCode(mfa.getSecret(), code);
        break;
      case MFAType.SMS:
      case MFAType.WHATSAPP:
      case MFAType.EMAIL:
        // ✅ GRUP 3: CacheKeyBuilder ব্যবহার
        const otpKey = CacheKeyBuilder.mfaOtp(mfa.getId());
        const otpData = await this.cacheService.get<{ otp: string; phone?: string; email?: string }>(otpKey);
        
        if (otpData) {
          if (mfaType === MFAType.SMS) {
            isValid = await this.mfaGenerator.verifySmsOtp(otpData.phone!, code, otpData.otp);
          } else if (mfaType === MFAType.WHATSAPP) {
            isValid = await this.mfaGenerator.verifyWhatsAppOtp(otpData.phone!, code, otpData.otp);
          } else {
            isValid = await this.mfaGenerator.verifyEmailOtp(otpData.email!, code, otpData.otp);
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
      throw new BadRequestException('Invalid verification code');
    }

    mfa.markAsVerified();
    
    const user = await this.findUserOrThrow(userId);
    user.enableMFA();

    await this.transactionManager.runInTransaction(async () => {
      await this.mfaRepository.save(mfa);
      await this.userRepository.save(user);
    });

    // ✅ GRUP 3: CacheKeyBuilder ব্যবহার করে ক্লিনআপ
    const otpKey = CacheKeyBuilder.mfaOtp(mfa.getId());
    await this.cacheService.del(otpKey);

    await this.eventBus.publish(
      new MfaEnabledEvent(
        userId,
        mfaType,
        mfa.getId(),
        deviceInfo.correlationId,
        deviceInfo.ipAddress,
        deviceInfo.userAgent,
        { setupTime: Date.now() }
      )
    );

    return {
      success: true,
      message: 'MFA enabled successfully',
      messageBn: 'এমএফএ সফলভাবে সক্রিয় করা হয়েছে',
      methodId: mfa.getId(),
    };
  }

  // ============================================================
  // MFA Verification (Login)
  // ============================================================

  async verifyMfa(
    userId: string,
    dto: VerifyMfaDto,
    deviceInfo: DeviceInfo
  ): Promise<MfaVerifyResponseDto> {
    // ✅ GRUP 3: CacheKeyBuilder ব্যবহার
    const mfaSessionKey = CacheKeyBuilder.mfaSession(dto.mfaSessionId);
    const sessionData = await this.cacheService.get<{ sessionId: string; userId: string }>(mfaSessionKey);
    
    if (!sessionData) {
      throw new UnauthorizedException('Invalid or expired MFA session');
    }

    const mfa = await this.mfaRepository.findByUserIdAndType(userId, dto.method as MFAType);
    
    if (!mfa || !mfa.isEnabled()) {
      throw new BadRequestException('MFA is not enabled for this user');
    }

    if (mfa.isLocked()) {
      const remainingMinutes = mfa.getRemainingLockTimeMinutes();
      throw new UnauthorizedException(`MFA is locked. Try again in ${remainingMinutes} minutes.`);
    }

    let verified = false;

    // Verify using appropriate method
    if (dto.backupCode) {
      const hashedCode = await this.mfaGenerator.hashBackupCode(dto.backupCode);
      const result = await this.mfaGenerator.verifyBackupCode(hashedCode, mfa.getBackupCodes() as string[]);
      verified = result.isValid;
      
      if (verified && result.usedIndex !== undefined) {
        const updatedCodes = [...mfa.getBackupCodes()];
        updatedCodes.splice(result.usedIndex, 1);
        await this.mfaRepository.updateBackupCodes(mfa.getId(), updatedCodes);
        
        await this.eventBus.publish(
          new MfaBackupCodeUsedEvent(userId, deviceInfo.correlationId, updatedCodes.length)
        );
      }
    } else if (dto.code) {
      switch (dto.method) {
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
          throw new BadRequestException(`Unsupported MFA method: ${dto.method}`);
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
          deviceInfo.correlationId
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

    // ✅ GRUP 3: CacheKeyBuilder ব্যবহার করে ক্লিনআপ
    await this.cacheService.del(mfaSessionKey);

    return new MfaVerifyResponseDto(
      tokenPair.accessToken,
      tokenPair.refreshToken || '',
      tokenPair.expiresIn,
      tokenPair.refreshExpiresIn || MFA_CONFIG.TRUSTED_SESSION_DAYS * 86400,
      sessionData.sessionId,
      {
        id: user.getId(),
        email: user.getEmail().getValue(),
        fullName: user.getFullName(),
        role: user.getRole(),
      },
      !!trustedDeviceId
    );
  }

  private async createTrustedDevice(
    user: User,
    deviceId: string,
    deviceInfo: DeviceInfo
  ): Promise<string> {
    // Create trusted device record
    const device = await this.deviceRepository.createOrUpdate(
      user.getId(),
      deviceId,
      deviceInfo.userAgent,
      deviceInfo.ipAddress,
      MFA_CONFIG.TRUSTED_SESSION_DAYS
    );
    
    return device.getId();
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

    const hashedCode = await this.mfaGenerator.hashBackupCode(backupCode);
    const result = await this.mfaGenerator.verifyBackupCode(hashedCode, mfa.getBackupCodes() as string[]);
    
    if (result.isValid && result.usedIndex !== undefined) {
      const updatedCodes = [...mfa.getBackupCodes()];
      updatedCodes.splice(result.usedIndex, 1);
      await this.mfaRepository.updateBackupCodes(mfa.getId(), updatedCodes);
      
      const isLow = result.remainingCodes <= 3;
      const warning = isLow 
        ? `You have only ${result.remainingCodes} backup codes remaining. Please generate new ones.`
        : undefined;
      const warningBn = isLow
        ? `আপনার কাছে মাত্র ${result.remainingCodes}টি ব্যাকআপ কোড বাকি আছে। অনুগ্রহ করে নতুন জেনারেট করুন।`
        : undefined;
      
      return {
        isValid: true,
        remainingCodes: result.remainingCodes,
        warning,
        warningBn,
        isLow,
      };
    }
    
    return { isValid: false, remainingCodes: result.remainingCodes, isLow: result.remainingCodes <= 3 };
  }

  // ============================================================
  // MFA Management
  // ============================================================

  async disableMfa(
    userId: string,
    dto: DisableMfaDto,
    deviceInfo: DeviceInfo
  ): Promise<DisableMfaResponseDto> {
    const methodId = dto.methodId;
    let mfa: MFA | null = null;
    
    if (methodId) {
      mfa = await this.mfaRepository.findById(methodId);
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
      }
    } else if (dto.backupCode) {
      const hashedCode = await this.mfaGenerator.hashBackupCode(dto.backupCode);
      const result = await this.mfaGenerator.verifyBackupCode(hashedCode, mfa.getBackupCodes() as string[]);
      verified = result.isValid;
    } else if (dto.bkashPin) {
      const result = await this.mfaGenerator.verifyBkashPin(mfa.getIdentifier(), dto.bkashPin);
      verified = result.isValid;
    } else if (dto.nagadPin) {
      const result = await this.mfaGenerator.verifyNagadPin(mfa.getIdentifier(), dto.nagadPin);
      verified = result.isValid;
    } else if (dto.rocketPin) {
      const result = await this.mfaGenerator.verifyRocketPin(mfa.getIdentifier(), dto.rocketPin);
      verified = result.isValid;
    }

    if (!verified) {
      throw new UnauthorizedException('Invalid verification');
    }

    mfa.disable();
    
    const user = await this.findUserOrThrow(userId);
    
    const otherMethods = await this.mfaRepository.findAllByUserId(userId);
    const hasOtherMethods = otherMethods.some(m => m.getId() !== mfa.getId() && m.isEnabled());
    
    if (!hasOtherMethods) {
      user.disableMFA();
    }

    await this.transactionManager.runInTransaction(async () => {
      await this.mfaRepository.save(mfa);
      if (!hasOtherMethods) {
        await this.userRepository.save(user);
      }
    });

    if (!hasOtherMethods) {
      await this.sessionRepository.revokeAllByUserId(userId, 'MFA disabled');
    }

    await this.eventBus.publish(
      new MfaDisabledEvent(
        userId,
        mfa.getType(),
        MFADisableReason.USER_DISABLED,
        deviceInfo.correlationId,
        deviceInfo.ipAddress,
        dto.adminId,
        { methodId, hasOtherMethods }
      )
    );

    return new DisableMfaResponseDto(
      true,
      userId,
      'MFA disabled successfully',
      undefined,
      1,
      !hasOtherMethods,
      [methodId || mfa.getId()],
      hasOtherMethods
    );
  }

  async getMfaStatus(userId: string): Promise<MFAStatusResponseDto> {
    const methods = await this.mfaRepository.findAllByUserId(userId);
    const user = await this.userRepository.findById(userId);
    
    const enabledMethods = methods.filter(m => m.isEnabled());
    const primaryMethod = enabledMethods.find(m => m.isPrimary()) || enabledMethods[0];
    
    const maskedPhone = methods.find(m => m.getType() === MFAType.SMS || m.getType() === MFAType.WHATSAPP)
      ?.getIdentifier();
    const maskedEmail = methods.find(m => m.getType() === MFAType.EMAIL)
      ?.getIdentifier();
    const maskedBkashAccount = methods.find(m => m.getType() === MFAType.BKASH_PIN)
      ?.getIdentifier();
    
    return new MFAStatusResponseDto(
      enabledMethods.length > 0,
      primaryMethod?.getType(),
      enabledMethods.map(m => m.getType()),
      maskedPhone ? maskPhoneNumber(maskedPhone) : undefined,
      maskedEmail ? maskEmail(maskedEmail) : undefined,
      methods.some(m => m.getStatus() === MFAStatus.PENDING_VERIFICATION),
      methods.reduce((sum, m) => sum + m.getRemainingBackupCodesCount(), 0),
      methods.some(m => m.areBackupCodesLow()),
      maskedBkashAccount ? maskAccountNumber(maskedBkashAccount) : undefined,
      primaryMethod?.getType()
    );
  }

  async getDetailedMfaStatus(userId: string, adminId: string): Promise<MFAStatusResponseDto> {
    this.logger.log(`Admin ${adminId} accessed MFA details for user ${userId}`);
    return this.getMfaStatus(userId);
  }

  async getUserMfaMethods(userId: string): Promise<MFAMethodInfo[]> {
    const methods = await this.mfaRepository.findAllByUserId(userId);
    
    return methods.map(m => ({
      id: m.getId(),
      type: m.getType(),
      typeDisplayName: this.getMfaTypeDisplayName(m.getType()),
      typeDisplayNameBn: this.getMfaTypeDisplayNameBn(m.getType()),
      identifier: m.getIdentifier(),
      maskedIdentifier: this.maskIdentifier(m.getIdentifier(),
