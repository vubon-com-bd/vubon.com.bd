import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { PromotionRuleServiceInterface } from '../interfaces/promotion-rule.service.interface';
import type { PromotionRuleRepository } from '../../../domain/repositories/promotion-rule.repository.interface';
import { PromotionRuleEntity } from '../../../domain/entities/promotion-rule.entity';
import { PromotionIdVO } from '../../../domain/value-objects/primitives/promotion-id.vo';

@Injectable()
export class PromotionRuleService
  extends BaseService<PromotionRuleEntity, string>
  implements PromotionRuleServiceInterface
{
  readonly name = 'PromotionRuleService';

  constructor(private readonly repo: PromotionRuleRepository) {
    super();
  }

  async findByPromotion(promotionId: string): Promise<readonly PromotionRuleEntity[]> {
    return this.repo.findByPromotionId(PromotionIdVO.create(promotionId));
  }
}
