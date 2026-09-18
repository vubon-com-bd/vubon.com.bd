import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AuthPermissionEntity } from '../entities/auth-permission.entity';
import { PermissionResourceVO } from '../value-objects/primitives/permission-resource.vo';
import { PermissionNameVO } from '../value-objects/primitives/permission-name.vo';

export interface AuthPermissionRepository
  extends BaseRepository<AuthPermissionEntity, string> {
  findByName(name: PermissionNameVO): Promise<AuthPermissionEntity | null>;
  findByResource(
    resource: PermissionResourceVO,
  ): Promise<readonly AuthPermissionEntity[]>;
}
