/**
 * User Role Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface UserRoleResponseDTO {
  readonly userId: string;
  readonly role: string;
  readonly level: number;
  readonly assignedBy?: string;
  readonly assignedAt?: string;
  readonly expiresAt?: string;
  readonly isPrimary: boolean;
}
