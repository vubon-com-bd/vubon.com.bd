/**
 * Push Response DTOs
 * @module notification-service/application/dtos/responses
 */
export interface PushSendResponseDTO {
  readonly success: boolean;
  readonly messageId?: string;
  readonly successCount: number;
  readonly failureCount: number;
  readonly invalidTokens?: readonly string[];
  readonly error?: string;
}

export interface BulkPushSendResponseDTO {
  readonly success: boolean;
  readonly totalTokens: number;
  readonly successCount: number;
  readonly failureCount: number;
  readonly invalidTokens: readonly string[];
}
