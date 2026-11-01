/**
 * Email Provider Types
 * @module notification-service/infrastructure/providers/email
 */
export type EmailProviderName =
  | 'sendgrid'
  | 'mailgun'
  | 'ses'
  | 'postmark'
  | 'resend'
  | 'smtp';

export interface EmailProviderConfig {
  readonly name: EmailProviderName;
  readonly enabled: boolean;
  readonly priority: number;
}

export interface SendgridResult {
  readonly success: boolean;
  readonly messageId?: string;
  readonly error?: string;
}

export interface MailgunResult {
  readonly success: boolean;
  readonly messageId?: string;
  readonly error?: string;
}

export interface SesResult {
  readonly success: boolean;
  readonly messageId?: string;
  readonly error?: string;
}
