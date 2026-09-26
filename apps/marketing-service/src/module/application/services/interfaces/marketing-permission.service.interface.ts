import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { MarketingPermissionEntity } from '../../../domain/entities/marketing-permission.entity';

export interface MarketingPermissionServiceInterface
  extends BaseServiceInterface<MarketingPermissionEntity, string> {
  findByUser(userId: string): Promise<readonly MarketingPermissionEntity[]>;
  check(userId: string, action: string, resource: string): Promise<boolean>;
}
