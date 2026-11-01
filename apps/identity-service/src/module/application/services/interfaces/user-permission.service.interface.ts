/**
 * User Permission Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { UserPermissionResponseDTO } from '../../dtos/responses/user-permission-response.dto.js';

export const USER_PERMISSION_SERVICE = Symbol('USER_PERMISSION_SERVICE');

export interface UserPermissionServiceInterface {
  readonly name: string;
  listForUser(userId: string): Promise<readonly UserPermissionResponseDTO[]>;
  grant(userId: string, permission: string, grantedBy: string, expiresAt?: string): Promise<void>;
  revoke(userId: string, permission: string, revokedBy: string): Promise<void>;
  has(userId: string, permission: string): Promise<boolean>;
}
