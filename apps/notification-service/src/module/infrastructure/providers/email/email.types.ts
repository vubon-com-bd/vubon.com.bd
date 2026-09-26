export interface EmailAttachment {
  readonly filename: string;
  readonly content: string | Buffer;
  readonly contentType?: string;
}

export interface EmailProviderInput {
  readonly to: string | readonly string[];
  readonly from?: string;
  readonly subject: string;
  readonly html?: string;
  readonly text?: string;
  readonly replyTo?: string;
  readonly attachments?: readonly EmailAttachment[];
  readonly tags?: Readonly<Record<string, string>>;
}
