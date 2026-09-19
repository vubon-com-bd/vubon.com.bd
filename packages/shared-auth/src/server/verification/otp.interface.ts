export interface OtpSender {
  send(input: {
    target: string;
    code: string;
    expiresAt: number;
    channel: 'email' | 'sms';
  }): Promise<void>;
}

export interface OtpRecord {
  readonly id: string;
  readonly target: string;
  readonly channel: 'email' | 'sms';
  readonly codeHash: string;
  readonly expiresAt: number;
  readonly attempts: number;
  readonly maxAttempts: number;
}

export interface OtpStore {
  set(record: OtpRecord): Promise<void>;
  get(id: string): Promise<OtpRecord | null>;
  delete(id: string): Promise<void>;
}
