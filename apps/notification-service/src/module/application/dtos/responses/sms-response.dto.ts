export interface SmsResponseDTO {
  readonly success: boolean;
  readonly messageId: string | null;
  readonly providerName: string;
  readonly status: string;
  readonly parts: number;
  readonly error: string | null;
}
