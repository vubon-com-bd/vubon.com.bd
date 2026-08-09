// packages/backend-service/src/auth/module/application/dtos/auth/disable-mfa.dto.ts

// ✅ External libraries
import { z } from 'zod';

// ✅ Domain Value Objects
import { OtpCode } from '../../../domain/value-objects/otp-code.vo';

/**
 * Disable MFA DTO (Data Transfer Object)
 *
 * অ্যাপ্লিকেশন লেয়ারে MFA নিষ্ক্রিয় করার জন্য ডেটা ট্রান্সফারের জন্য ব্যবহৃত হয়।
 * ক্লায়েন্ট থেকে আসা যাচাইকরণ কোড অথবা ব্যাকআপ কোড গ্রহণ করে এবং ভ্যালিডেট করে।
 */
export class DisableMfaDto {
  public readonly code?: string;
  public readonly backupCode?: string;

  private constructor(data: DisableMfaDtoProps) {
    this.code = data.code;
    this.backupCode = data.backupCode;
  }

  /**
   * Zod Schema for runtime validation
   */
  public static readonly schema = z
    .object({
      code: z
        .string()
        .optional()
        .refine(
          (val) => {
            if (!val) return true;
            return val.length === 6 && /^\d{6}$/.test(val);
          },
          {
            message: 'Code must be exactly 6 digits',
          }
        ),

      backupCode: z
        .string()
        .optional()
        .refine(
          (val) => {
            if (!val) return true;
            return val.length >= 8 && /^[A-Za-z0-9]+$/.test(val);
          },
          {
            message: 'Backup code must be at least 8 alphanumeric characters',
          }
        ),
    })
    .strict()
    .refine(
      (data) => {
        return !!(data.code || data.backupCode);
      },
      {
        message: 'Either verification code or backup code is required',
        path: ['code'],
      }
    )
    .refine(
      (data) => {
        // If both are provided, both must be valid
        if (data.code && data.backupCode) {
          return (
            data.code.length === 6 &&
            /^\d{6}$/.test(data.code) &&
            data.backupCode.length >= 8 &&
            /^[A-Za-z0-9]+$/.test(data.backupCode)
          );
        }
        return true;
      },
      {
        message: 'Invalid code or backup code format',
        path: ['code'],
      }
    );

  /**
   * Create DisableMfaDto from raw data with validation
   * @throws {z.ZodError} if validation fails
   */
  public static create(data: unknown): DisableMfaDto {
    const validated = DisableMfaDto.schema.parse(data);
    return new DisableMfaDto(validated);
  }

  /**
   * Safely create DisableMfaDto from raw data
   * @returns { success: boolean; data?: DisableMfaDto; error?: z.ZodError }
   */
  public static safeCreate(data: unknown): {
    success: boolean;
    data?: DisableMfaDto;
    error?: z.ZodError;
  } {
    const result = DisableMfaDto.schema.safeParse(data);
    if (result.success) {
      return {
        success: true,
        data: new DisableMfaDto(result.data),
      };
    }
    return {
      success: false,
      error: result.error,
    };
  }

  /**
   * Check if verification code is provided
   */
  public hasCode(): boolean {
    return !!this.code;
  }

  /**
   * Check if backup code is provided
   */
  public hasBackupCode(): boolean {
    return !!this.backupCode;
  }

  /**
   * Check if both code and backup code are provided
   */
  public hasBoth(): boolean {
    return !!this.code && !!this.backupCode;
  }

  /**
   * Check if either code or backup code is provided
   */
  public hasAny(): boolean {
    return !!this.code || !!this.backupCode;
  }

  /**
   * Convert DTO to domain OtpCode Value Object (if code is provided)
   */
  public toDomainOtpCode(): OtpCode | null {
    if (!this.code) return null;
    return OtpCode.create(this.code);
  }

  /**
   * Get masked code for logging
   */
  public getMaskedCode(): string {
    if (!this.code) return '';
    const otp = OtpCode.create(this.code);
    return otp.mask();
  }

  /**
   * Get masked backup code for logging
   */
  public getMaskedBackupCode(): string {
    if (!this.backupCode) return '';
    const length = this.backupCode.length;
    if (length <= 4) return '****';
    const visible = 2;
    const masked = '*'.repeat(length - visible);
    const visiblePart = this.backupCode.slice(-visible);
    return `${masked}${visiblePart}`;
  }

  /**
   * Check if the verification code is valid format
   */
  public isValidCode(): boolean {
    return !!this.code && this.code.length === 6 && /^\d{6}$/.test(this.code);
  }

  /**
   * Check if the backup code is valid format
   */
  public isValidBackupCode(): boolean {
    return (
      !!this.backupCode && this.backupCode.length >= 8 && /^[A-Za-z0-9]+$/.test(this.backupCode)
    );
  }

  /**
   * Get the primary verification method
   * Returns 'code' if code is provided, 'backup' if only backup code is provided
   */
  public getPrimaryMethod(): 'code' | 'backup' {
    if (this.code) return 'code';
    return 'backup';
  }

  /**
   * Convert DTO to plain object for serialization
   */
  public toJSON(): DisableMfaDtoProps {
    return {
      code: this.code,
      backupCode: this.backupCode,
    };
  }
}

/**
 * Disable MFA DTO properties interface
 */
export interface DisableMfaDtoProps {
  code?: string;
  backupCode?: string;
}

/**
 * Create a DisableMfaDto with verification code
 */
export function createDisableMfaWithCodeDto(code: string): DisableMfaDto {
  return DisableMfaDto.create({
    code,
  });
}

/**
 * Create a DisableMfaDto with backup code
 */
export function createDisableMfaWithBackupCodeDto(backupCode: string): DisableMfaDto {
  return DisableMfaDto.create({
    backupCode,
  });
}

/**
 * Create a DisableMfaDto from domain OtpCode
 */
export function createDisableMfaDtoFromDomain(otp: OtpCode): DisableMfaDto {
  return DisableMfaDto.create({
    code: otp.getValue(),
  });
}
