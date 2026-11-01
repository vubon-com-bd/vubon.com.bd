/**
 * User Permission Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface UserPermissionResponseDTO {
  readonly userId: string;
  readonly permission: string;
  readonly grantedBy?: string;
  readonly grantedAt?: string;
  readonly expiresAt?: string;
}
