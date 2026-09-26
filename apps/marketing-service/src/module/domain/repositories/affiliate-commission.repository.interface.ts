import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AffiliateCommissionEntity } from '../entities/affiliate-commission.entity';
import { AffiliateIdVO } from '../value-objects/primitives/affiliate-id.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';

export interface AffiliateCommissionRepository
  extends BaseRepository<AffiliateCommissionEntity, string> {
  findByAffiliate(affiliateId: AffiliateIdVO): Promise<readonly AffiliateCommissionEntity[]>;
  findByOrder(orderId: OrderIdVO): Promise<readonly AffiliateCommissionEntity[]>;
}
