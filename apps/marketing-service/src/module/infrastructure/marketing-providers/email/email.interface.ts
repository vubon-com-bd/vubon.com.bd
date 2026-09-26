export interface EmailOptions {
  readonly to: string;
  readonly subject: string;
  readonly html: string;
  readonly text?: string;
}

export interface EmailResult {
  readonly success: boolean;
  readonly messageId?: string;
  readonly error?: string;
}

export interface EmailProvider {
  send(options: EmailOptions): Promise<EmailResult>;
}
