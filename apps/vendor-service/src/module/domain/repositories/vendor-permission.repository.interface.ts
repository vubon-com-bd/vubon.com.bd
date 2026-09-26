import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorPermissionEntity } from '../entities/vendor-permission.entity';
import { PermissionIdVO } from '../value-objects/primitives/permission-id.vo';
import { TeamRoleVO } from '../value-objects/primitives/team-role.vo';

export interface VendorPermissionRepository
  extends BaseRepository<VendorPermissionEntity, PermissionIdVO> {
  findByRole(role: TeamRoleVO): Promise<VendorPermissionEntity | null>;
  findAll(): Promise<readonly VendorPermissionEntity[]>;
}
