/**
 * User Role Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { UserRoleResponseDTO } from '../../dtos/responses/user-role-response.dto.js';

export const USER_ROLE_SERVICE = Symbol('USER_ROLE_SERVICE');

export interface UserRoleServiceInterface {
  readonly name: string;
  listForUser(userId: string): Promise<readonly UserRoleResponseDTO[]>;
  assign(userId: string, role: string, assignedBy: string, expiresAt?: string): Promise<void>;
  revoke(userId: string, role: string, revokedBy: string): Promise<void>;
  has(userId: string, role: string): Promise<boolean>;
}
