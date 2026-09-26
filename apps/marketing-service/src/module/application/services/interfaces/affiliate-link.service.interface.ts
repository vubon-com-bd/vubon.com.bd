import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AffiliateLinkEntity } from '../../../domain/entities/affiliate-link.entity';

export interface AffiliateLinkServiceInterface
  extends BaseServiceInterface<AffiliateLinkEntity, string> {
  generate(affiliateId: string, productId?: string): Promise<string>;
  findByAffiliate(affiliateId: string): Promise<readonly AffiliateLinkEntity[]>;
}
