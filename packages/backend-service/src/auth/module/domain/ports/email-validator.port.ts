// packages/backend-service/src/auth/module/domain/ports/email-validator.port.ts

// ✅ Shared types
import type { Email } from '../value-objects/email.vo';

/**
 * Email validation result interface
 */
export interface EmailValidationResult {
  /** Whether the email is valid */
  isValid: boolean;
  /** Whether the email is from a disposable/temporary service */
  isDisposable: boolean;
  /** Whether the email domain has valid MX records (if checked) */
  hasValidMx?: boolean;
  /** Whether the email is deliverable (if checked) */
  isDeliverable?: boolean;
  /** Error message if validation fails (optional) */
  error?: string;
  /** Normalized email address (if valid) */
  normalizedEmail?: string;
}

/**
 * Email Validator Port Interface
 *
 * ডোমেইন লেয়ারকে ইমেইল ভ্যালিডেশন সার্ভিস থেকে আলাদা রাখার জন্য পোর্ট।
 * এই পোর্টের মাধ্যমে ডোমেইন লেয়ার ইমেইল ভ্যালিডেশন করতে পারে।
 */
export interface IEmailValidator {
  /**
   * একটি ইমেইল ঠিকানা ভ্যালিড করে
   * @param email - ইমেইল ঠিকানা (Email Value Object বা স্ট্রিং)
   * @param options - ভ্যালিডেশন অপশন
   * @returns ইমেইল ভ্যালিডেশনের ফলাফল
   */
  validate(
    email: Email | string,
    options?: {
      /** Whether to check MX records */
      checkMx?: boolean;
      /** Whether to check deliverability (may be slow) */
      checkDeliverability?: boolean;
      /** Whether to check for disposable domains */
      checkDisposable?: boolean;
    }
  ): Promise<EmailValidationResult>;

  /**
   * একটি ইমেইল ঠিকানা ভ্যালিড কিনা চেক করে (দ্রুত চেক)
   * @param email - ইমেইল ঠিকানা (Email Value Object বা স্ট্রিং)
   * @returns true যদি ভ্যালিড হয়, false যদি না হয়
   */
  isValid(email: Email | string): boolean;

  /**
   * একটি ইমেইল ঠিকানা ডিসপোজেবল (টেম্পরারি) কিনা চেক করে
   * @param email - ইমেইল ঠিকানা (Email Value Object বা স্ট্রিং)
   * @returns true যদি ডিসপোজেবল হয়, false যদি না হয়
   */
  isDisposable(email: Email | string): boolean;

  /**
   * একটি ইমেইল ঠিকানা স্বাভাবিক করে (normalize)
   * @param email - ইমেইল ঠিকানা (Email Value Object বা স্ট্রিং)
   * @returns স্বাভাবিক করা ইমেইল ঠিকানা বা null যদি ইনভ্যালিড হয়
   */
  normalize(email: Email | string): string | null;

  /**
   * একটি ইমেইল ডোমেইনের MX রেকর্ড আছে কিনা চেক করে
   * @param email - ইমেইল ঠিকানা (Email Value Object বা স্ট্রিং)
   * @returns true যদি MX রেকর্ড থাকে, false যদি না থাকে
   */
  hasValidMx(email: Email | string): Promise<boolean>;
}
