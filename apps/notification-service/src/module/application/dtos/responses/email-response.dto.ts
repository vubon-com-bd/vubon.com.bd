/**
 * Email Response DTOs
 * @module notification-service/application/dtos/responses
 */
export interface EmailSendResponseDTO {
  readonly success: boolean;
  readonly messageId?: string;
  readonly status: string;
  readonly providerMessageId?: string;
  readonly error?: string;
}

export interface BulkEmailSendResponseDTO {
  readonly success: boolean;
  readonly totalRequested: number;
  readonly successCount: number;
  readonly failureCount: number;
  readonly failures: readonly {
    readonly email: string;
    readonly error: string;
  }[];
}
