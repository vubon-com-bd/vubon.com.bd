/**
 * UserPermissionResponseDTO
 * @module auth-service/application/dtos/responses
 */
export interface UserPermissionResponseDTO {
  readonly permissions: readonly string[];
  readonly roles: readonly string[];
  readonly isSuperAdmin: boolean;
}
