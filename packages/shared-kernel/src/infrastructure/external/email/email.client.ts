/**
 * Email Provider Client Types
 * @module shared-kernel/infrastructure/external/email
 */
export interface EmailProviderClient {
  send(message: EmailMessageInput): Promise<EmailSendResult>;
}

export interface EmailMessageInput {
  readonly to: string | readonly string[];
  readonly subject: string;
  readonly text?: string;
  readonly html?: string;
  readonly from?: string;
  readonly replyTo?: string;
}

export interface EmailSendResult {
  readonly success: boolean;
  readonly messageId?: string;
  readonly error?: string;
}
