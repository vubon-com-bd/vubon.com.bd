// packages/backend-service/src/auth/module/domain/ports/otp-generator.port.ts

// ✅ Shared types
import type { OtpCode } from '../value-objects/otp-code.vo';

/**
 * OTP type definitions
 */
export type OtpType =
  'email_verification' | 'phone_verification' | 'password_reset' | 'mfa' | 'transaction';

/**
 * OTP generation options interface
 */
export interface OtpGenerationOptions {
  /** OTP length (default: 6) */
  length?: number;
  /** OTP expiry time in seconds (default: 300) */
  expiresInSeconds?: number;
  /** OTP type (default: 'email_verification') */
  type?: OtpType;
  /** Custom OTP charset (default: digits only) */
  charset?: string;
  /** Whether the OTP should be numeric only (default: true) */
  numericOnly?: boolean;
  /** Additional metadata for tracking */
  metadata?: Record<string, unknown>;
}

/**
 * OTP verification result interface
 */
export interface OtpVerificationResult {
  /** Whether the OTP is valid */
  isValid: boolean;
  /** Whether the OTP has expired */
  isExpired: boolean;
  /** Whether the OTP has been used before (replay attack prevention) */
  isUsed: boolean;
  /** Remaining attempts (if applicable) */
  remainingAttempts?: number;
  /** Error message (if invalid) */
  error?: string;
}

/**
 * OTP Generator Port Interface
 *
 * ডোমেইন লেয়ারকে OTP জেনারেশন ও ভেরিফিকেশন সার্ভিস থেকে আলাদা রাখার জন্য পোর্ট।
 * এই পোর্টের মাধ্যমে ডোমেইন লেয়ার OTP জেনারেট, ভেরিফাই এবং পরিচালনা করতে পারে।
 */
export interface IOtpGenerator {
  /**
   * একটি OTP জেনারেট করে
   * @param identifier - OTP এর জন্য ইউনিক আইডেন্টিফায়ার (ইমেইল, ফোন নম্বর, বা ইউজার আইডি)
   * @param options - OTP জেনারেশন অপশন (optional)
   * @returns জেনারেটেড OTP কোড (OtpCode Value Object)
   */
  generateOtp(identifier: string, options?: OtpGenerationOptions): Promise<OtpCode>;

  /**
   * একটি OTP ভেরিফাই করে
   * @param identifier - OTP এর জন্য ইউনিক আইডেন্টিফায়ার
   * @param code - OTP কোড (OtpCode Value Object বা স্ট্রিং)
   * @param type - OTP টাইপ (optional)
   * @returns OTP ভেরিফিকেশন ফলাফল
   */
  verifyOtp(
    identifier: string,
    code: OtpCode | string,
    type?: OtpType
  ): Promise<OtpVerificationResult>;

  /**
   * একটি OTP অবৈধ করে (ইউজ করার পর বা রিভোক করার জন্য)
   * @param identifier - OTP এর জন্য ইউনিক আইডেন্টিফায়ার
   * @param code - OTP কোড (OtpCode Value Object বা স্ট্রিং)
   * @returns সফল হলে true, না হলে false
   */
  invalidateOtp(identifier: string, code: OtpCode | string): Promise<boolean>;

  /**
   * একটি OTP-র বাকি সময় (সেকেন্ডে) পাওয়ার জন্য
   * @param identifier - OTP এর জন্য ইউনিক আইডেন্টিফায়ার
   * @param code - OTP কোড (OtpCode Value Object বা স্ট্রিং)
   * @returns অবশিষ্ট সময় (সেকেন্ডে) বা 0 যদি OTP না থাকে বা মেয়াদ শেষ হয়ে থাকে
   */
  getOtpRemainingTime(identifier: string, code: OtpCode | string): Promise<number>;

  /**
   * একটি OTP-র প্রচেষ্টার সংখ্যা (attempts) চেক করার জন্য
   * @param identifier - OTP এর জন্য ইউনিক আইডেন্টিফায়ার
   * @param code - OTP কোড (OtpCode Value Object বা স্ট্রিং)
   * @returns প্রচেষ্টার সংখ্যা
   */
  getOtpAttempts(identifier: string, code: OtpCode | string): Promise<number>;

  /**
   * একটি OTP-র স্ট্যাটাস চেক করার জন্য
   * @param identifier - OTP এর জন্য ইউনিক আইডেন্টিফায়ার
   * @param code - OTP কোড (OtpCode Value Object বা স্ট্রিং)
   * @returns OTP স্ট্যাটাস ('active', 'expired', 'used', 'invalid')
   */
  getOtpStatus(
    identifier: string,
    code: OtpCode | string
  ): Promise<'active' | 'expired' | 'used' | 'invalid'>;

  /**
   * একটি OTP-র প্রচেষ্টার সংখ্যা ইনক্রিমেন্ট করে
   * @param identifier - OTP এর জন্য ইউনিক আইডেন্টিফায়ার
   * @param code - OTP কোড (OtpCode Value Object বা স্ট্রিং)
   * @param maxAttempts - সর্বোচ্চ প্রচেষ্টার সংখ্যা (ঐচ্ছিক)
   * @returns নতুন প্রচেষ্টার সংখ্যা
   */
  incrementOtpAttempts(
    identifier: string,
    code: OtpCode | string,
    maxAttempts?: number
  ): Promise<number>;

  /**
   * একটি OTP-র প্রচেষ্টার সংখ্যা রিসেট করে
   * @param identifier - OTP এর জন্য ইউনিক আইডেন্টিফায়ার
   * @param code - OTP কোড (OtpCode Value Object বা স্ট্রিং)
   * @returns সফল হলে true, না হলে false
   */
  resetOtpAttempts(identifier: string, code: OtpCode | string): Promise<boolean>;

  /**
   * একটি OTP-র কুলডাউন (resend cooldown) সময় চেক করার জন্য
   * @param identifier - OTP এর জন্য ইউনিক আইডেন্টিফায়ার
   * @param cooldownSeconds - কুলডাউন সময় (সেকেন্ডে)
   * @returns true যদি কুলডাউন শেষ হয়, false যদি না হয়
   */
  isOtpResendAllowed(identifier: string, cooldownSeconds: number): Promise<boolean>;

  /**
   * একটি OTP-র বাকি কুলডাউন সময় (সেকেন্ডে) পাওয়ার জন্য
   * @param identifier - OTP এর জন্য ইউনিক আইডেন্টিফায়ার
   * @param cooldownSeconds - কুলডাউন সময় (সেকেন্ডে)
   * @returns বাকি কুলডাউন সময় (সেকেন্ডে) বা 0
   */
  getOtpResendCooldown(identifier: string, cooldownSeconds: number): Promise<number>;

  /**
   * একটি আইডেন্টিফায়ারের জন্য একটি নতুন OTP জেনারেট করে (পুরানোটিকে প্রতিস্থাপন করে)
   * @param identifier - OTP এর জন্য ইউনিক আইডেন্টিফায়ার
   * @param options - OTP জেনারেশন অপশন (optional)
   * @returns জেনারেটেড OTP কোড (OtpCode Value Object)
   */
  regenerateOtp(identifier: string, options?: OtpGenerationOptions): Promise<OtpCode>;
}
