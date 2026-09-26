export interface SmsProviderInput {
  readonly to: string;
  readonly body: string;
  readonly from?: string;
  readonly unicode?: boolean;
}

export interface SmsProviderResult {
  readonly success: boolean;
  readonly messageId: string | null;
  readonly parts: number;
  readonly error: string | null;
}
