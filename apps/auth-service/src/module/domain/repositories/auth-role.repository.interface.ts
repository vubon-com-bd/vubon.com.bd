/**
 * AuthRoleRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AuthRoleEntity } from '../entities/auth-role.entity';
import { RoleNameVO } from '../value-objects/primitives/role-name.vo';
import { PermissionNameVO } from '../value-objects/primitives/permission-name.vo';

export interface AuthRoleRepository extends BaseRepository<AuthRoleEntity, string> {
  findByName(name: RoleNameVO): Promise<AuthRoleEntity | null>;
  findManyByNames(
    names: readonly RoleNameVO[],
  ): Promise<readonly AuthRoleEntity[]>;
  findWithPermission(
    permission: PermissionNameVO,
  ): Promise<readonly AuthRoleEntity[]>;
  addPermissionToRole(roleId: string, permission: PermissionNameVO): Promise<void>;
  removePermissionFromRole(roleId: string, permission: PermissionNameVO): Promise<void>;
}
