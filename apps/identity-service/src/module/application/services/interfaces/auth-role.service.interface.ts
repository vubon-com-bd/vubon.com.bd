/**
 * Auth Role Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { RoleEntity } from '../../../domain/entities/role.entity.js';
import type { UserRoleResponseDTO } from '../../dtos/responses/user-role-response.dto.js';

export const AUTH_ROLE_SERVICE = Symbol('AUTH_ROLE_SERVICE');

export interface AuthRoleServiceInterface extends BaseServiceInterface<RoleEntity, string> {
  listAll(): Promise<readonly RoleEntity[]>;
  findByName(name: string): Promise<RoleEntity | null>;
  listForUser(userId: string): Promise<readonly UserRoleResponseDTO[]>;
  assign(userId: string, role: string, assignedBy: string): Promise<void>;
  revoke(userId: string, role: string, revokedBy: string): Promise<void>;
  hasRole(userId: string, role: string): Promise<boolean>;
}
