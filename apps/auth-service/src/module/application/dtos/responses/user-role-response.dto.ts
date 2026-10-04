/**
 * UserRoleResponseDTO
 * @module auth-service/application/dtos/responses
 */
export interface UserRoleResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly permissions: readonly string[];
  readonly isSystem: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}
