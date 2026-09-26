/**
 * AuthRoleServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthRoleEntity } from '../../../domain/entities/auth-role.entity';
import type { UserRoleResponseDTO } from '../../dtos/responses/user-role-response.dto';

export interface AuthRoleServiceInterface
  extends BaseServiceInterface<AuthRoleEntity, string> {
  findByNames(names: readonly string[]): Promise<readonly AuthRoleEntity[]>;

  assignToUser(userId: UserId, roleName: string): Promise<void>;

  revokeFromUser(userId: UserId, roleName: string): Promise<void>;

  addPermission(roleId: string, permission: string): Promise<void>;

  removePermission(roleId: string, permission: string): Promise<void>;

  listForUser(userId: UserId): Promise<readonly AuthRoleEntity[]>;

  toResponse(role: AuthRoleEntity): UserRoleResponseDTO;
}
