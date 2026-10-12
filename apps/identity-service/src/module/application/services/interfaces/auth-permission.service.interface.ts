/**
 * Auth Permission Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { PermissionEntity } from '../../../domain/entities/permission.entity.js';
import type { UserPermissionResponseDTO } from '../../dtos/responses/user-permission-response.dto.js';

export const AUTH_PERMISSION_SERVICE = Symbol('AUTH_PERMISSION_SERVICE');

export interface AuthPermissionServiceInterface extends BaseServiceInterface<PermissionEntity, string> {
  listAll(): Promise<readonly PermissionEntity[]>;
  findByCategory(category: string): Promise<readonly PermissionEntity[]>;
  listForUser(userId: string): Promise<readonly UserPermissionResponseDTO[]>;
  hasPermission(userId: string, permission: string): Promise<boolean>;
}
