import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { MarketingPermissionEntity } from '../entities/marketing-permission.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface MarketingPermissionRepository
  extends BaseRepository<MarketingPermissionEntity, string> {
  findByUser(userId: UserIdVO): Promise<readonly MarketingPermissionEntity[]>;
}
