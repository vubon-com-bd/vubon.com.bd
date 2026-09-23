export interface SmsOptions {
  readonly to: string;
  readonly message: string;
}

export interface SmsResult {
  readonly success: boolean;
  readonly messageId?: string;
  readonly error?: string;
}

export interface SmsProvider {
  send(options: SmsOptions): Promise<SmsResult>;
}
