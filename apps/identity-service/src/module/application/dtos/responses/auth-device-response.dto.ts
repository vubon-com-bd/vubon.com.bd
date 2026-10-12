/**
 * Auth Device Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface AuthDeviceResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly name?: string;
  readonly os?: string;
  readonly browser?: string;
  readonly trusted: boolean;
  readonly trustedUntil?: string;
  readonly lastActiveAt: string;
  readonly isCurrent: boolean;
}
