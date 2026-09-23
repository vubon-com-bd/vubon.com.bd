import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { PromotionDiscountServiceInterface } from '../interfaces/promotion-discount.service.interface';
import type { PromotionDiscountRepository } from '../../../domain/repositories/promotion-discount.repository.interface';
import { PromotionDiscountEntity } from '../../../domain/entities/promotion-discount.entity';
import { PromotionDiscountService as DomainService } from '../../../domain/services/promotion-discount.service';

@Injectable()
export class PromotionDiscountService
  extends BaseService<PromotionDiscountEntity, string>
  implements PromotionDiscountServiceInterface
{
  readonly name = 'PromotionDiscountService';

  constructor(
    private readonly repo: PromotionDiscountRepository,
    private readonly domain: DomainService,
  ) {
    super();
  }

  async calculate(originalAmount: number, discountValue: number, discountType: string): Promise<number> {
    void this.repo;
    return this.domain.calculate(originalAmount, discountValue, discountType);
  }
}
