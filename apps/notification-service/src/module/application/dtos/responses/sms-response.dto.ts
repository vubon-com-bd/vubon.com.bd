/**
 * SMS Response DTOs
 * @module notification-service/application/dtos/responses
 */
export interface SmsSendResponseDTO {
  readonly success: boolean;
  readonly messageId?: string;
  readonly status: string;
  readonly segments: number;
  readonly providerMessageId?: string;
  readonly error?: string;
}

export interface BulkSmsSendResponseDTO {
  readonly success: boolean;
  readonly totalRequested: number;
  readonly successCount: number;
  readonly failureCount: number;
  readonly totalSegments: number;
  readonly failures: readonly {
    readonly phone: string;
    readonly error: string;
  }[];
}
