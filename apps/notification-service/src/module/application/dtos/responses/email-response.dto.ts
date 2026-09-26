export interface EmailResponseDTO {
  readonly success: boolean;
  readonly messageId: string | null;
  readonly providerName: string;
  readonly status: string;
  readonly error: string | null;
}
