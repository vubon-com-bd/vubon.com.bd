import { ProductPricingEntity } from '../../domain/entities/product-pricing.entity';
import type { PricingResponseDTO } from '../dtos/responses/pricing-response.dto';

export class PricingMapper {
  static toResponse(entity: ProductPricingEntity): PricingResponseDTO {
    return {
      productId: entity.productId.value,
      amount: entity.amount.value,
      currency: entity.currency.value,
    } as unknown as PricingResponseDTO;
  }
}
