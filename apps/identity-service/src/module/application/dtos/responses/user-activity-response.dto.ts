/**
 * User Activity Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface UserActivityResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly description?: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly deviceId?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly occurredAt: string;
}
