import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorSubscriptionEntity } from '../entities/vendor-subscription.entity';
import { SubscriptionIdVO } from '../value-objects/primitives/subscription-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorSubscriptionRepository
  extends BaseRepository<VendorSubscriptionEntity, SubscriptionIdVO> {
  findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorSubscriptionEntity[]>;
  findActive(vendorId: VendorIdVO): Promise<VendorSubscriptionEntity | null>;
}
