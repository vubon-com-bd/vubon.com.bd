/**
 * AuthPermissionServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthPermissionEntity } from '../../../domain/entities/auth-permission.entity';
import type { AuthRoleEntity } from '../../../domain/entities/auth-role.entity';

export interface AuthPermissionServiceInterface
  extends BaseServiceInterface<AuthPermissionEntity, string> {
  listAll(): Promise<readonly AuthPermissionEntity[]>;

  listByResource(resource: string): Promise<readonly AuthPermissionEntity[]>;

  hasPermission(
    userId: UserId,
    roles: readonly AuthRoleEntity[],
    requiredPermission: string,
  ): Promise<boolean>;

  evaluateEffective(
    userId: UserId,
  ): Promise<readonly string[]>;
}
