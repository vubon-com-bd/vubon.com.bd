/**
 * SMS Provider Client Types
 * @module shared-kernel/infrastructure/external/sms
 */

export interface SmsMessageInput {
  readonly to: string | readonly string[];
  readonly message: string;
  readonly from?: string;
}

export interface SmsSendResult {
  readonly success: boolean;
  readonly messageId?: string;
  readonly error?: string;
}
