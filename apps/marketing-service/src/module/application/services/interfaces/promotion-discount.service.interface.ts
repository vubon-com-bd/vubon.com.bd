import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { PromotionDiscountEntity } from '../../../domain/entities/promotion-discount.entity';

export interface PromotionDiscountServiceInterface
  extends BaseServiceInterface<PromotionDiscountEntity, string> {
  calculate(originalAmount: number, discountValue: number, discountType: string): Promise<number>;
}
