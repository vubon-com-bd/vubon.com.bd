/**
 * MFA Mapper - Pure Entity to DTO Conversion
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/mappers/mfa.mapper
 * 
 * @description
 * Mapper for converting MFA entity to various DTO formats.
 * NO business logic, NO validation, NO repository calls.
 * 
 * Enterprise Rules:
 * ✅ ONLY entity to DTO conversion
 * ✅ Stateless static methods
 * ✅ Type-safe with DTO interfaces
 * ✅ Handles null/undefined gracefully
 * ✅ No side effects
 * ✅ Bangladesh specific - WhatsApp, Imo, bKash, Nagad, Rocket MFA support
 */

import { MFA, MFAType, MFAStatus } from '../../domain/entities/mfa.entity';
import { MfaSetupResponseDto as MfaSetupResponseType } from '../dtos/mfa/enable-mfa.dto';
import { MfaVerificationResponseDto as MfaVerificationResponseType } from '../dtos/mfa/verify-mfa.dto';
import { BaseResponseDto } from '../dtos/common/base-response.dto';
import { PaginatedResponseDto } from '../dtos/common/pagination.dto';

// ============================================================
// DTO Interfaces
// ============================================================

/**
 * Full MFA Response DTO
 */
export interface MfaResponseDto {
  id: string;
  userId: string;
  type: MFAType;
  typeDisplayName: string;
  typeDisplayNameBn?: string;
  status: MFAStatus;
  isEnabled: boolean;
  isPending: boolean;
  isLocked: boolean;
  isRecoveryMode: boolean;
  isPrimary: boolean;
  verifiedAt?: string;
  lastUsedAt?: string;
  remainingBackupCodes: number;
  areBackupCodesLow: boolean;
  remainingAttempts: number;
  remainingLockTimeMinutes: number;
  // Type-specific fields
  maskedIdentifier?: string;
  identifierType?: 'phone' | 'email' | 'account';
  providerName?: string;  // For MFS (bKash/Nagad/Rocket)
  deviceName?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Brief MFA Response DTO (for lists/status checks)
 */
export interface BriefMfaResponseDto {
  id: string;
  type: MFAType;
  typeDisplayName: string;
  isEnabled: boolean;
  isPrimary: boolean;
  isLocked?: boolean;
  remainingAttempts?: number;
  lastUsedAt?: string;
}

/**
 * MFA Setup Response DTO (for TOTP setup)
 */
export interface MfaSetupResponseDto {
  methodId: string;
  type: MFAType;
  typeDisplayName: string;
  secret?: string;
  qrCodeUri?: string;
  provisioningUri?: string;
  recoveryCodes: string[];
  maskedPhone?: string;
  maskedEmail?: string;
  maskedAccount?: string;
  providerName?: string;
  instructions?: string;
  instructionsBn?: string;
  expiresAt: string;
}

/**
 * MFA Backup Codes Response DTO
 */
export interface MfaBackupCodesResponseDto {
  codes: string[];
  count: number;
  regeneratedAt: string;
  warning?: string;
  warningBn?: string;
}

/**
 * MFA Verification Response DTO
 */
export interface MfaVerificationResponseDto {
  success: boolean;
  remainingAttempts: number;
  isLocked: boolean;
  remainingLockTimeMinutes: number;
  lockExpiresAt?: string;
  requiresAlternativeMethod?: boolean;
  alternativeMethods?: MFAType[];
}

/**
 * MFA Type Display Names
 */
export const MFA_TYPE_DISPLAY_NAMES: Record<MFAType, { en: string; bn: string }> = {
  [MFAType.TOTP]: { en: 'Authenticator App', bn: 'অথেনটিকেটর অ্যাপ' },
  [MFAType.SMS]: { en: 'SMS', bn: 'এসএমএস' },
  [MFAType.EMAIL]: { en: 'Email', bn: 'ইমেইল' },
  [MFAType.WEBAUTHN]: { en: 'Biometric (Passkey)', bn: 'বায়োমেট্রিক (পাসকি)' },
  [MFAType.WHATSAPP]: { en: 'WhatsApp', bn: 'হোয়াটসঅ্যাপ' },
  [MFAType.IMO]: { en: 'Imo', bn: 'আইএমও' },
  [MFAType.BKASH_PIN]: { en: 'bKash PIN', bn: 'বিকাশ পিন' },
  [MFAType.NAGAD_PIN]: { en: 'Nagad PIN', bn: 'নগদ পিন' },
  [MFAType.ROCKET_PIN]: { en: 'Rocket PIN', bn: 'রকেট পিন' },
  [MFAType.VOICE_CALL]: { en: 'Voice Call', bn: 'ভয়েস কল' },
};

/**
 * MFA Provider Display Names (for MFS)
 */
export const MFA_PROVIDER_NAMES: Record<string, { en: string; bn: string }> = {
  bkash: { en: 'bKash', bn: 'বিকাশ' },
  nagad: { en: 'Nagad', bn: 'নগদ' },
  rocket: { en: 'Rocket', bn: 'রকেট' },
};

// ============================================================
// MFA Mapper
// ============================================================

/**
 * MFA Mapper - Pure conversion methods
 */
export class MfaMapper {
  /**
   * Get display name for MFA type
   * @param type - MFA type
   * @param locale - Locale ('en' or 'bn')
   * @returns Display name
   */
  private static getTypeDisplayName(type: MFAType, locale: 'en' | 'bn' = 'en'): string {
    const names = MFA_TYPE_DISPLAY_NAMES[type];
    if (!names) return type;
    return locale === 'bn' ? names.bn : names.en;
  }

  /**
   * Get masked identifier based on MFA type
   * @param mfa - MFA entity
   * @param identifier - Raw identifier
   * @returns Masked identifier
   */
  private static getMaskedIdentifier(mfa: MFA, identifier?: string): string | undefined {
    if (!identifier) return undefined;
    
    switch (mfa.getType()) {
      case MFAType.SMS:
      case MFAType.WHATSAPP:
      case MFAType.IMO:
        // Mask phone: +88017******78
        if (identifier.length >= 10) {
          return identifier.slice(0, 6) + '******' + identifier.slice(-2);
        }
        return identifier.slice(0, 3) + '****' + identifier.slice(-2);
      
      case MFAType.EMAIL:
        // Mask email: u***r@example.com
        const [local, domain] = identifier.split('@');
        if (local && local.length >= 3) {
          return `${local[0]}***${local[local.length - 1]}@${domain}`;
        }
        return `${local?.[0]}***@${domain}`;
      
      case MFAType.BKASH_PIN:
      case MFAType.NAGAD_PIN:
      case MFAType.ROCKET_PIN:
        // Mask account: +88017******78
        if (identifier.length >= 10) {
          return identifier.slice(0, 6) + '******' + identifier.slice(-2);
        }
        return identifier.slice(0, 4) + '****' + identifier.slice(-2);
      
      default:
        return identifier.slice(0, 4) + '****';
    }
  }

  /**
   * Get provider name for MFS types
   * @param type - MFA type
   * @param locale - Locale
   * @returns Provider name
   */
  private static getProviderName(type: MFAType, locale: 'en' | 'bn' = 'en'): string | undefined {
    let provider: string | undefined;
    
    switch (type) {
      case MFAType.BKASH_PIN:
        provider = 'bkash';
        break;
      case MFAType.NAGAD_PIN:
        provider = 'nagad';
        break;
      case MFAType.ROCKET_PIN:
        provider = 'rocket';
        break;
      default:
        return undefined;
    }
    
    const names = MFA_PROVIDER_NAMES[provider];
    if (!names) return provider;
    return locale === 'bn' ? names.bn : names.en;
  }

  /**
   * Convert MFA entity to Full Response DTO
   * @param mfa - MFA entity (can be null)
   * @param identifier - Optional identifier (phone/email/account)
   * @param locale - Locale for display names
   * @returns MfaResponseDto or null
   */
  static toDto(
    mfa: MFA | null | undefined,
    identifier?: string,
    locale: 'en' | 'bn' = 'en'
  ): MfaResponseDto | null {
    if (!mfa) {
      return null;
    }
    
    const backupCodes = mfa.getBackupCodes();
    const remainingCount = backupCodes.length;
    const type = mfa.getType();
    
    let identifierType: 'phone' | 'email' | 'account' | undefined;
    if (type === MFAType.SMS || type === MFAType.WHATSAPP || type === MFAType.IMO) {
      identifierType = 'phone';
    } else if (type === MFAType.EMAIL) {
      identifierType = 'email';
    } else if (type === MFAType.BKASH_PIN || type === MFAType.NAGAD_PIN || type === MFAType.ROCKET_PIN) {
      identifierType = 'account';
    }
    
    return {
      id: mfa.id,
      userId: mfa.getUserId(),
      type,
      typeDisplayName: this.getTypeDisplayName(type, locale),
      typeDisplayNameBn: locale === 'bn' ? this.getTypeDisplayName(type, 'bn') : undefined,
      status: mfa.getStatus(),
      isEnabled: mfa.isEnabled(),
      isPending: mfa.isPending(),
      isLocked: mfa.isLocked(),
      isRecoveryMode: mfa.isRecoveryMode(),
      isPrimary: mfa.isPrimary(),
      verifiedAt: mfa.getVerifiedAt()?.toISOString(),
      lastUsedAt: mfa.getLastUsedAt()?.toISOString(),
      remainingBackupCodes: remainingCount,
      areBackupCodesLow: mfa.areBackupCodesLow(),
      remainingAttempts: mfa.getRemainingAttempts(),
      remainingLockTimeMinutes: mfa.getRemainingLockTimeMinutes(),
      maskedIdentifier: this.getMaskedIdentifier(mfa, identifier),
      identifierType,
      providerName: this.getProviderName(type, locale),
      deviceName: undefined, // Would need to be stored in MFA entity
      createdAt: mfa.createdAt.toISOString(),
      updatedAt: mfa.updatedAt.toISOString(),
    };
  }
  
  /**
   * Convert MFA entity to Brief Response DTO
   * @param mfa - MFA entity (can be null)
   * @param locale - Locale for display names
   * @returns BriefMfaResponseDto or null
   */
  static toBriefDto(mfa: MFA | null | undefined, locale: 'en' | 'bn' = 'en'): BriefMfaResponseDto | null {
    if (!mfa) {
      return null;
    }
    
    return {
      id: mfa.id,
      type: mfa.getType(),
      typeDisplayName: this.getTypeDisplayName(mfa.getType(), locale),
      isEnabled: mfa.isEnabled(),
      isPrimary: mfa.isPrimary(),
      isLocked: mfa.isLocked(),
      remainingAttempts: mfa.getRemainingAttempts(),
      lastUsedAt: mfa.getLastUsedAt()?.toISOString(),
    };
  }
  
  /**
   * Convert MFA entity list to DTO list
   * @param mfaList - Array of MFA entities
   * @param identifiers - Map of MFA ID to identifier
   * @param locale - Locale for display names
   * @returns Array of MfaResponseDto
   */
  static toDtoList(
    mfaList: MFA[],
    identifiers?: Map<string, string>,
    locale: 'en' | 'bn' = 'en'
  ): MfaResponseDto[] {
    if (!mfaList || mfaList.length === 0) {
      return [];
    }
    return mfaList
      .map(mfa => this.toDto(mfa, identifiers?.get(mfa.id), locale))
      .filter((dto): dto is MfaResponseDto => dto !== null);
  }
  
  /**
   * Convert MFA entity list to Brief DTO list
   * @param mfaList - Array of MFA entities
   * @param locale - Locale for display names
   * @returns Array of BriefMfaResponseDto
   */
  static toBriefDtoList(mfaList: MFA[], locale: 'en' | 'bn' = 'en'): BriefMfaResponseDto[] {
    if (!mfaList || mfaList.length === 0) {
      return [];
    }
    return mfaList
      .map(mfa => this.toBriefDto(mfa, locale))
      .filter((dto): dto is BriefMfaResponseDto => dto !== null);
  }
  
  /**
   * Convert backup codes to DTO
   * @param backupCodes - Array of backup codes
   * @param regeneratedAt - Optional regeneration timestamp
   * @param warning - Optional warning message
   * @param warningBn - Optional Bengali warning message
   * @returns MfaBackupCodesResponseDto
   */
  static backupCodesToDto(
    backupCodes: string[],
    regeneratedAt?: Date,
    warning?: string,
    warningBn?: string
  ): MfaBackupCodesResponseDto {
    const remainingCount = backupCodes.length;
    let warningMessage = warning;
    let warningMessageBn = warningBn;
    
    if (!warningMessage && remainingCount <= 3 && remainingCount > 0) {
      warningMessage = `You have only ${remainingCount} backup codes remaining. Please regenerate new codes soon.`;
      warningMessageBn = `আপনার কাছে মাত্র ${remainingCount}টি ব্যাকআপ কোড বাকি আছে। অনুগ্রহ করে শীঘ্রই নতুন কোড তৈরি করুন।`;
    }
    
    if (!warningMessage && remainingCount === 0) {
      warningMessage = 'No backup codes remaining. Please regenerate new codes immediately.';
      warningMessageBn = 'কোনো ব্যাকআপ কোড বাকি নেই। অনুগ্রহ করে এখনই নতুন কোড তৈরি করুন।';
    }
    
    return {
      codes: backupCodes,
      count: remainingCount,
      regeneratedAt: (regeneratedAt || new Date()).toISOString(),
      warning: warningMessage,
      warningBn: warningMessageBn,
    };
  }
  
  /**
   * Create verification response
   * @param success - Whether verification succeeded
   * @param mfa - MFA entity (for remaining attempts/lock info)
   * @param alternativeMethods - Alternative MFA methods available
   * @returns MfaVerificationResponseDto
   */
  static toVerificationResponse(
    success: boolean,
    mfa: MFA | null,
    alternativeMethods?: MFAType[]
  ): MfaVerificationResponseDto {
    if (!mfa) {
      return {
        success,
        remainingAttempts: 3,
        isLocked: false,
        remainingLockTimeMinutes: 0,
        requiresAlternativeMethod: false,
        alternativeMethods: alternativeMethods,
      };
    }
    
    return {
      success,
      remainingAttempts: mfa.getRemainingAttempts(),
      isLocked: mfa.isLocked(),
      remainingLockTimeMinutes: mfa.getRemainingLockTimeMinutes(),
      lockExpiresAt: mfa.getLockedUntil()?.toISOString(),
      requiresAlternativeMethod: mfa.isLocked() && !!alternativeMethods?.length,
      alternativeMethods: mfa.isLocked() ? alternativeMethods : undefined,
    };
  }
  
  /**
   * Convert to setup response DTO
   * @param methodId - Method ID
   * @param type - MFA type
   * @param secret - TOTP secret
   * @param qrCodeUri - QR code URI
   * @param provisioningUri - Provisioning URI
   * @param recoveryCodes - Recovery codes
   * @param maskedIdentifier - Masked identifier (phone/email)
   * @param providerName - Provider name (for MFS)
   * @returns MfaSetupResponseDto
   */
  static toSetupDto(
    methodId: string,
    type: MFAType,
    secret: string,
    qrCodeUri: string,
    provisioningUri: string,
    recoveryCodes: string[],
    maskedIdentifier?: string,
    providerName?: string
  ): MfaSetupResponseDto {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes expiry
    
    let maskedPhone: string | undefined;
    let maskedEmail: string | undefined;
    let maskedAccount: string | undefined;
    
    if (type === MFAType.SMS || type === MFAType.WHATSAPP || type === MFAType.IMO) {
      maskedPhone = maskedIdentifier;
    } else if (type === MFAType.EMAIL) {
      maskedEmail = maskedIdentifier;
    } else if (type === MFAType.BKASH_PIN || type === MFAType.NAGAD_PIN || type === MFAType.ROCKET_PIN) {
      maskedAccount = maskedIdentifier;
    }
    
    return {
      methodId,
      type,
      typeDisplayName: this.getTypeDisplayName(type),
      secret,
      qrCodeUri,
      provisioningUri,
      recoveryCodes,
      maskedPhone,
      maskedEmail,
      maskedAccount,
      providerName,
      instructions: this.getSetupInstructions(type),
      instructionsBn: this.getSetupInstructions(type, 'bn'),
      expiresAt: expiresAt.toISOString(),
    };
  }
  
  /**
   * Get setup instructions for MFA type
   * @param type - MFA type
   * @param locale - Locale
   * @returns Instructions string
   */
  private static getSetupInstructions(type: MFAType, locale: 'en' | 'bn' = 'en'): string {
    const instructions: Record<MFAType, { en: string; bn: string }> = {
      [MFAType.TOTP]: {
        en: 'Scan the QR code with Google Authenticator or any TOTP app, then enter the 6-digit code.',
        bn: 'QR কোড স্ক্যান করুন Google Authenticator বা যেকোনো TOTP অ্যাপ দিয়ে, তারপর 6-ডিজিটের কোডটি লিখুন।',
      },
      [MFAType.SMS]: {
        en: 'A verification code will be sent to your phone via SMS. Enter the code to verify.',
        bn: 'আপনার ফোনে একটি ভেরিফিকেশন কোড এসএমএসের মাধ্যমে পাঠানো হবে। কোডটি লিখুন যাচাই করতে।',
      },
      [MFAType.EMAIL]: {
        en: 'A verification code will be sent to your email. Enter the code to verify.',
        bn: 'আপনার ইমেইলে একটি ভেরিফিকেশন কোড পাঠানো হবে। কোডটি লিখুন যাচাই করতে।',
      },
      [MFAType.WEBAUTHN]: {
        en: 'Use your device\'s biometric (fingerprint, face ID) or security key to verify.',
        bn: 'আপনার ডিভাইসের বায়োমেট্রিক (আঙুলের ছাপ, ফেস আইডি) বা সিকিউরিটি কী ব্যবহার করে যাচাই করুন।',
      },
      [MFAType.WHATSAPP]: {
        en: 'A verification code will be sent to your WhatsApp. Enter the code to verify.',
        bn: 'আপনার হোয়াটসঅ্যাপে একটি ভেরিফিকেশন কোড পাঠানো হবে। কোডটি লিখুন যাচাই করতে।',
      },
      [MFAType.IMO]: {
        en: 'A verification code will be sent to your Imo. Enter the code to verify.',
        bn: 'আপনার আইএমওতে একটি ভেরিফিকেশন কোড পাঠানো হবে। কোডটি লিখুন যাচাই করতে।',
      },
      [MFAType.BKASH_PIN]: {
        en: 'Enter your bKash PIN to verify. This is your 4-digit bKash mobile menu PIN.',
        bn: 'আপনার বিকাশ পিন লিখুন যাচাই করতে। এটি আপনার 4-ডিজিটের বিকাশ মোবাইল মেনু পিন।',
      },
      [MFAType.NAGAD_PIN]: {
        en: 'Enter your Nagad PIN to verify. This is your 4-digit Nagad account PIN.',
        bn: 'আপনার নগদ পিন লিখুন যাচাই করতে। এটি আপনার 4-ডিজিটের নগদ অ্যাকাউন্ট পিন।',
      },
      [MFAType.ROCKET_PIN]: {
        en: 'Enter your Rocket PIN to verify. This is your 4-digit Rocket account PIN.',
        bn: 'আপনার রকেট পিন লিখুন যাচাই করতে। এটি আপনার 4-ডিজিটের রকেট অ্যাকাউন্ট পিন।',
      },
      [MFAType.VOICE_CALL]: {
        en: 'A voice call will be made to your phone with the verification code.',
        bn: 'আপনার ফোনে একটি ভয়েস কল করা হবে যাতে ভেরিফিকেশন কোড থাকবে।',
      },
    };
    
    const instr = instructions[type];
    if (!instr) return '';
    return locale === 'bn' ? instr.bn : instr.en;
  }
  
  /**
   * Convert to paginated response
   * @param items - Array of MFA response DTOs
   * @param total - Total count
   * @param page - Page number
   * @param limit - Items per page
   * @returns PaginatedResponseDto
   */
  static toPaginatedResponse(
    items: MfaResponseDto[],
    total: number,
    page: number,
    limit: number
  ): PaginatedResponseDto<MfaResponseDto> {
    return new PaginatedResponseDto(items, total, page, limit);
  }
  
  /**
   * Convert to base response
   * @param data - Response data
   * @param message - Success message
   * @param messageBn - Bengali success message
   * @returns BaseResponseDto
   */
  static toBaseResponse<T>(
    data: T,
    message?: string,
    messageBn?: string
  ): BaseResponseDto<T> {
    return BaseResponseDto.success(data, message, 200, undefined, messageBn);
  }
  
  /**
   * Convert to error response
   * @param message - Error message
   * @param statusCode - HTTP status code
   * @param messageBn - Bengali error message
   * @returns BaseResponseDto
   */
  static toErrorResponse(
    message: string,
    statusCode: number = 400,
    messageBn?: string
  ): BaseResponseDto<null> {
    return BaseResponseDto.error(message, statusCode, undefined, undefined, undefined, messageBn);
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  MfaResponseDto as MfaResponseDtoType,
  BriefMfaResponseDto as BriefMfaResponseDtoType,
  MfaSetupResponseDto as MfaSetupResponseDtoType,
  MfaBackupCodesResponseDto as MfaBackupCodesResponseDtoType,
  MfaVerificationResponseDto as MfaVerificationResponseDtoType
};
