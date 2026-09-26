import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ProductPricingEntity } from '../../../domain/entities/product-pricing.entity';
import type { PricingResponseDTO } from '../../dtos/responses/pricing-response.dto';

export interface ProductPricingServiceInterface
  extends BaseServiceInterface<ProductPricingEntity, string> {
  findByProduct(productId: string): Promise<PricingResponseDTO | null>;
  updatePrice(productId: string, amount: number, currency?: string): Promise<PricingResponseDTO>;
  calculateFinalPrice(productId: string): Promise<number>;
}
