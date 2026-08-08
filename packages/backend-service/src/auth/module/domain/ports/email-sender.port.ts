// packages/backend-service/src/auth/module/domain/ports/email-sender.port.ts

// ✅ Shared types
import type { Email } from '../value-objects/email.vo';

/**
 * Email attachment interface
 */
export interface EmailAttachment {
  /** Filename of the attachment */
  filename: string;
  /** Content of the attachment (base64 or buffer) */
  content: string | Buffer;
  /** Content type of the attachment (optional) */
  contentType?: string;
}

/**
 * Email options interface
 */
export interface EmailOptions {
  /** Recipient email address */
  to: Email | Email[];
  /** Sender email address (optional, uses default if not provided) */
  from?: Email;
  /** Email subject line */
  subject: string;
  /** Plain text version of the email */
  text?: string;
  /** HTML version of the email */
  html?: string;
  /** Email attachments (optional) */
  attachments?: EmailAttachment[];
  /** Reply-to email address (optional) */
  replyTo?: Email;
  /** CC recipients (optional) */
  cc?: Email[];
  /** BCC recipients (optional) */
  bcc?: Email[];
  /** Additional metadata for tracking (optional) */
  metadata?: Record<string, unknown>;
}

/**
 * Email sending result interface
 */
export interface EmailResult {
  /** Whether the email was sent successfully */
  success: boolean;
  /** Message ID from the email service provider (optional) */
  messageId?: string;
  /** Error message if sending failed (optional) */
  error?: string;
  /** Additional data from the email service provider (optional) */
  data?: Record<string, unknown>;
}

/**
 * Email Sender Port Interface
 *
 * ডোমেইন লেয়ারকে ইমেইল পাঠানোর সার্ভিস থেকে আলাদা রাখার জন্য পোর্ট।
 * এই পোর্টের মাধ্যমে ডোমেইন লেয়ার ইমেইল পাঠানোর অনুরোধ করতে পারে।
 */
export interface IEmailSender {
  /**
   * একটি ইমেইল পাঠায়
   * @param options - ইমেইল অপশন
   * @returns ইমেইল পাঠানোর ফলাফল
   */
  sendEmail(options: EmailOptions): Promise<EmailResult>;

  /**
   * একাধিক ইমেইল পাঠায়
   * @param optionsArray - ইমেইল অপশনের অ্যারে
   * @returns ইমেইল পাঠানোর ফলাফলের অ্যারে
   */
  sendMultipleEmails(optionsArray: EmailOptions[]): Promise<EmailResult[]>;

  /**
   * একটি টেমপ্লেট ইমেইল পাঠায়
   * @param templateName - টেমপ্লেটের নাম
   * @param templateData - টেমপ্লেটের ডেটা
   * @param to - প্রাপকের ইমেইল
   * @param subject - ইমেইলের সাবজেক্ট
   * @param options - অতিরিক্ত ইমেইল অপশন (optional)
   * @returns ইমেইল পাঠানোর ফলাফল
   */
  sendTemplateEmail(
    templateName: string,
    templateData: Record<string, unknown>,
    to: Email | Email[],
    subject: string,
    options?: Partial<Omit<EmailOptions, 'to' | 'subject'>>
  ): Promise<EmailResult>;
}
