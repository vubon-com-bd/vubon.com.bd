import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AuthRoleEntity } from '../entities/auth-role.entity';
import { RoleNameVO } from '../value-objects/primitives/role-name.vo';

export interface AuthRoleRepository
  extends BaseRepository<AuthRoleEntity, string> {
  findByName(name: RoleNameVO): Promise<AuthRoleEntity | null>;
  findWithPermissions(name: RoleNameVO): Promise<AuthRoleEntity | null>;
}
