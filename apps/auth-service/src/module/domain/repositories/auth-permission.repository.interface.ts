/**
 * AuthPermissionRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AuthPermissionEntity } from '../entities/auth-permission.entity';
import { PermissionNameVO } from '../value-objects/primitives/permission-name.vo';

export interface AuthPermissionRepository
  extends BaseRepository<AuthPermissionEntity, string> {
  findByName(name: PermissionNameVO): Promise<AuthPermissionEntity | null>;
  findByResource(resource: string): Promise<readonly AuthPermissionEntity[]>;
  findManyByNames(
    names: readonly PermissionNameVO[],
  ): Promise<readonly AuthPermissionEntity[]>;
}
