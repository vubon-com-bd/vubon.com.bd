import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AffiliateLinkServiceInterface } from '../interfaces/affiliate-link.service.interface';
import type { AffiliateLinkRepository } from '../../../domain/repositories/affiliate-link.repository.interface';
import { AffiliateLinkEntity } from '../../../domain/entities/affiliate-link.entity';
import { AffiliateIdVO } from '../../../domain/value-objects/primitives/affiliate-id.vo';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo';
import { AffiliateLinkVO } from '../../../domain/value-objects/composites/affiliate-link.vo';

@Injectable()
export class AffiliateLinkService
  extends BaseService<AffiliateLinkEntity, string>
  implements AffiliateLinkServiceInterface
{
  readonly name = 'AffiliateLinkService';

  constructor(private readonly repo: AffiliateLinkRepository) {
    super();
  }

  async generate(affiliateId: string, productId?: string): Promise<string> {
    const affiliateIdVO = AffiliateIdVO.create(affiliateId);
    const productIdVO = productId ? ProductIdVO.create(productId) : null;
    const url = `https://vubon.com.bd/ref/${affiliateId}${productId ? `/${productId}` : ''}`;
    const linkVO = AffiliateLinkVO.create({
      affiliateId: affiliateIdVO,
      productId: productIdVO,
      url,
      clicks: 0,
      conversions: 0,
    });
    const entity = AffiliateLinkEntity.create({ affiliateId: affiliateIdVO, link: linkVO });
    await this.repo.save(entity);
    return url;
  }

  async findByAffiliate(affiliateId: string): Promise<readonly AffiliateLinkEntity[]> {
    return this.repo.findByAffiliate(AffiliateIdVO.create(affiliateId));
  }
}
