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

import { MfaMapper, MfaBackupCodesResponseDto } from '../../mappers/mfa.mapper';
import { MfaGenerator, EventBus, TransactionManager, CacheService, PasswordHasher, TokenGenerator } from './infrastructure.interface';

// ============================================================
// Constants
// ============================================================

const MFA_CONFIG = {
  MAX_VERIFICATION_ATTEMPTS: 3,
  VERIFICATION_SESSION_TTL_SECONDS: 300, // 5 minutes
  BACKUP_CODE_REGENERATE_COOLDOWN_HOURS: 24,
  TRUSTED_SESSION_DAYS: 30,
  OTP_RESEND_COOLDOWN_SECONDS: 30,
  MAX_OTP_REQUESTS_PER_HOUR: 5,
};

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
    const qrCodeUri = secret.qrCodeUri;
    const provisioningUri = secret.provisioningUri;
    const backupCodes = await this.mfaGenerator.generateBackupCodes();

    // Hash backup codes for storage
    const hashedBackupCodes = await this.hashBackupCodes(backupCodes);

    // Create MFA entity (pending verification)
    const mfa = MFA.enable(
      user.getId(),
      MFAType.TOTP,
      email,
      secret.secret,
      hashedBackupCodes,
      dto.makePrimary || false,
      1,
      this.generateId
    );

    await this.mfaRepository.save(mfa);

    return {
      methodId: mfa.getId(),
      secret: secret.secret,
      qrCodeUri,
      provisioningUri,
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
      this.generateId
    );

    await this.mfaRepository.save(mfa);

    // Store OTP session
    await this.cacheService.set(
      `mfa:otp:${mfa.getId()}`,
      { otp: otpResult.sessionId, phone: dto.phone },
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
      this.generateId
    );

    await this.mfaRepository.save(mfa);

    await this.cacheService.set(
      `mfa:otp:${mfa.getId()}`,
      { otp: otpResult.sessionId, phone: dto.phone },
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
      this.generateId
    );

    await this.mfaRepository.save(mfa);

    return {
      methodId: mfa.getId(),
      maskedAccount: this.maskAccountNumber(dto.bkashAccount),
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
      this.generateId
    );

    await this.mfaRepository.save(mfa);

    return {
      methodId: mfa.getId(),
      maskedAccount: this.maskAccountNumber(dto.nagadAccount),
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
      this.generateId
    );

    await this.mfaRepository.save(mfa);

    return {
      methodId: mfa.getId(),
      maskedAccount: this.maskAccountNumber(dto.rocketAccount),
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
      this.generateId
    );

    await this.mfaRepository.save(mfa);

    await this.cacheService.set(
      `mfa:otp:${mfa.getId()}`,
      { otp: otpResult.sessionId, email },
      MFA_CONFIG.VERIFICATION_SESSION_TTL_SECONDS
    );

    return {
      methodId: mfa.getId(),
      maskedEmail: this.maskEmail(email),
      recoveryCodes: backupCodes,
      resendCooldownSeconds: otpResult.resendCooldownSeconds,
    };
  }

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
        const otpData = await this.cacheService.get(`mfa:otp:${mfa.getId()}`);
        if (otpData) {
          if (type === MFAType.SMS) {
            isValid = await this.mfaGenerator.verifySmsOtp(otpData.phone, code, otpData.otp);
          } else if (type === MFAType.WHATSAPP) {
            isValid = await this.mfaGenerator.verifyWhatsAppOtp(otpData.phone, code, otpData.otp);
          } else {
            isValid = await this.mfaGenerator.verifyEmailOtp(otpData.email, code, otpData.otp);
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

    // Complete MFA setup
    mfa.markAsVerified();
    
    const user = await this.findUserOrThrow(userId);
    user.enableMFA();

    await this.transactionManager.runInTransaction(async () => {
      await this.mfaRepository.save(mfa);
      await this.userRepository.save(user);
    });

    // Clean up OTP session
    await this.cacheService.del(`mfa:otp:${mfa.getId()}`);

    await this.eventBus.publish(
      new MfaEnabledEvent(
        userId,
        type as MFAType,
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
    // Get MFA session from cache
    const sessionData = await this.cacheService.get(`mfa:login:session:${dto.mfaSessionId}`);
    if (!sessionData) {
      throw new UnauthorizedException('Invalid or expired MFA session');
    }

    const mfa = await this.mfaRepository.findByUserIdAndType(userId, dto.method as MFAType);
    
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
      const hashedCode = await this.mfaGenerator.hashBackupCode(dto.backupCode);
      const result = await this.mfaGenerator.verifyBackupCode(hashedCode, mfa.getBackupCodes() as string[]);
      verified = result.isValid;
      
      if (verified) {
        // Remove used backup code
        const updatedCodes = [...mfa.getBackupCodes()];
        updatedCodes.splice(result.usedIndex!, 1);
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

    // Delete MFA session from cache
    await this.cacheService.del(`mfa:login:session:${dto.mfaSessionId}`);

    return new MfaVerifyResponseDto(
      tokenPair.accessToken,
      tokenPair.refreshToken || '',
      tokenPair.expiresIn,
      tokenPair.refreshExpiresIn || 604800,
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
    
    if (result.isValid) {
      const updatedCodes = [...mfa.getBackupCodes()];
      updatedCodes.splice(result.usedIndex!, 1);
      await this.mfaRepository.updateBackupCodes(mfa.getId(), updatedCodes);
      
      const warning = result.remainingCodes <= 3 
        ? `You have only ${result.remainingCodes} backup codes remaining. Please generate new ones.`
        : undefined;
      const warningBn = result.remainingCodes <= 3
        ? `আপনার কাছে মাত্র ${result.remainingCodes}টি ব্যাকআপ কোড বাকি আছে। অনুগ্রহ করে নতুন জেনারেট করুন।`
        : undefined;
      
      return {
        isValid: true,
        remainingCodes: result.remainingCodes,
        warning,
        warningBn,
        isLow: result.remainingCodes <= 3,
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

    // Disable MFA
    mfa.disable();
    
    const user = await this.findUserOrThrow(userId);
    
    // Check if user has other MFA methods
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

    // Revoke all sessions if no MFA left
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
      [methodId],
      hasOtherMethods
    );
  }

  async getMfaStatus(userId: string): Promise<MFAStatusResponseDto> {
    const methods = await this.mfaRepository.findAllByUserId(userId);
    const user = await this.userRepository.findById(userId);
    
    const enabledMethods = methods.filter(m => m.isEnabled());
    const primaryMethod = enabledMethods.find(m => m.isPrimary()) || enabledMethods[0];
    
    return new MFAStatusResponseDto(
      enabledMethods.length > 0,
      primaryMethod?.getType(),
      enabledMethods.map(m => m.getType()),
      undefined, // maskedPhone
      undefined, // maskedEmail
      methods.some(m => m.getStatus() === MFAStatus.PENDING_VERIFICATION),
      methods.reduce((sum, m) => sum + m.getRemainingBackupCodesCount(), 0),
      methods.some(m => m.areBackupCodesLow()),
      undefined, // maskedBkashAccount
      primaryMethod?.getType()
    );
  }

  async getDetailedMfaStatus(userId: string, adminId: string): Promise<MFAStatusResponseDto> {
    // Admin audit log
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
      maskedIdentifier: this.maskIdentifier(m.getIdentifier(), m.getType()),
      isPrimary: m.isPrimary(),
      isVerified: m.isEnabled(),
      createdAt: m.getCreatedAt(),
      lastUsedAt: m.getLastUsedAt(),
    }));
  }

  async setPrimaryMfaMethod(userId: string, methodId: string, deviceInfo: DeviceInfo): Promise<void> {
    const methods = await this.mfaRepository.findAllByUserId(userId);
    
    for (const method of methods) {
      const isPrimary = method.getId() === methodId;
      if (method.isPrimary() !== isPrimary) {
        method.setPrimary(isPrimary);
        await this.mfaRepository.save(method);
      }
    }
    
    await this.eventBus.publish(
      new MfaPrimaryMethodChangedEvent(userId, methodId, deviceInfo.correlationId)
    );
  }

  async removeMfaMethod(userId: string, methodId: string, deviceInfo: DeviceInfo): Promise<void> {
    const mfa = await this.mfaRepository.findById(methodId);
    
    if (!mfa || mfa.getUserId() !== userId) {
      throw new NotFoundException('MFA method not found');
    }
    
    if (!mfa.isEnabled()) {
      throw new BadRequestException('MFA method is not enabled');
    }
    
    mfa.disable();
    await this.mfaRepository.save(mfa);
    
    const otherMethods = await this.mfaRepository.findAllByUserId(userId);
    const hasOtherMethods = otherMethods.some(m => m.getId() !== methodId && m.isEnabled());
    
    if (!hasOtherMethods) {
      const user = await this.findUserOrThrow(userId);
      user.disableMFA();
      await this.userRepository.save(user);
    }
    
    await this.eventBus.publish(
      new MfaMethodRemovedEvent(userId, mfa.getType(), methodId, deviceInfo.correlationId)
    );
  }

  // ============================================================
  // Backup Codes Management
  // ============================================================

  async generateBackupCodes(
    userId: string,
    deviceInfo: DeviceInfo
  ): Promise<MfaBackupCodesResponseDto> {
    const methods = await this.mfaRepository.findAllByUserId(userId);
    const enabledMethods = methods.filter(m => m.isEnabled());
    
    if (enabledMethods.length === 0) {
      throw new BadRequestException('No MFA methods enabled');
    }
    
    // Generate for primary method or first enabled
    const targetMethod = enabledMethods.find(m => m.isPrimary()) || enabledMethods[0];
    
    // Rate limiting check
    const canRegenerate = await this.checkBackupCodeRegenerationLimit(userId);
    if (!canRegenerate) {
      throw new TooManyRequestsException(
        `Backup codes can only be regenerated once every ${MFA_CONFIG.BACKUP_CODE_REGENERATE_COOLDOWN_HOURS} hours`
      );
    }
    
    const newBackupCodes = await this.mfaGenerator.generateBackupCodes();
    const hashedCodes = await this.hashBackupCodes(newBackupCodes);
    
    await this.mfaRepository.updateBackupCodes(targetMethod.getId(), hashedCodes);
    
    await this.cacheService.set(
      `mfa:backup:regenerate:${userId}`,
      Date.now(),
      MFA_CONFIG.BACKUP_CODE_REGENERATE_COOLDOWN_HOURS * 3600
    );
    
    await this.eventBus.publish(
      new MfaBackupCodesRegeneratedEvent(userId, deviceInfo.correlationId)
    );
    
    return {
      backupCodes: newBackupCodes,
      remainingCount: newBackupCodes.length,
      regeneratedAt: new Date(),
    };
  }

  async regenerateBackupCodes(
    userId: string,
    deviceInfo: DeviceInfo
  ): Promise<MfaBackupCodesResponseDto> {
    return this.generateBackupCodes(userId, deviceInfo);
  }

  async getRemainingBackupCodesCount(userId: string): Promise<number> {
    const methods = await this.mfaRepository.findAllByUserId(userId);
    return methods.reduce((sum, m) => sum + m.getRemainingBackupCodesCount(), 0);
  }

  async getMaskedBackupCodes(userId: string): Promise<{ codes: string[]; remainingCount: number }> {
    const methods = await this.mfaRepository.findAllByUserId(userId);
    const primaryMethod = methods.find(m => m.isPrimary()) || methods[0];
    
    if (!primaryMethod) {
      return { codes: [], remainingCount: 0 };
    }
    
    // Return masked codes (last 4 chars only)
    const codes = primaryMethod.getBackupCodes().map(code => `****-****-${code.slice(-4)}`);
    return {
      codes,
      remainingCount: primaryMethod.getRemainingBackupCodesCount(),
    };
  }

  // ============================================================
  // MFA Lock Management
  // ============================================================

  async isMfaLocked(userId: string): Promise<MFALockStatus> {
    const mfa = await this.mfaRepository.findByUserId(userId);
    if (!mfa) {
      return { isLocked: false, remainingMinutes: 0, remainingSeconds: 0 };
    }
    
    const remainingSeconds = mfa.getRemainingLockTimeMinutes() * 60;
    return {
      isLocked: mfa.isLocked(),
      remainingMinutes: mfa.getRemainingLockTimeMinutes(),
      remainingSeconds,
      lockedAt: mfa.getLockedAt(),
      expiresAt: mfa.getLockedUntil(),
    };
  }

  async getRemainingVerificationAttempts(userId: string): Promise<number> {
    const mfa = await this.mfaRepository.findByUserId(userId);
    if (!mfa) {
      return MFA_CONFIG.MAX_VERIFICATION_ATTEMPTS;
    }
    return mfa.getRemainingAttempts();
  }

  async resetMfaLock(userId: string, adminId: string, deviceInfo: DeviceInfo): Promise<void> {
    const mfa = await this.mfaRepository.findByUserId(userId);
    if (!mfa) {
      throw new NotFoundException('MFA not found');
    }
    
    mfa.unlock();
    await this.mfaRepository.save(mfa);
    
    await this.eventBus.publish(
      new MfaLockResetEvent(userId, adminId, deviceInfo.correlationId)
    );
  }

  // ============================================================
  // Recovery Options
  // ============================================================

  async getRecoveryOptions(userId: string): Promise<MFARecoveryOptions> {
    const mfa = await this.mfaRepository.findByUserId(userId);
    const user = await this.userRepository.findById(userId);
    
    const recoveryEmail = user?.getEmail().getValue();
    const recoveryPhone = user?.getPhone()?.getE164
