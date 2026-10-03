/**
 * IPricingService Interface
 */
import type { UpdatePriceRequestDTO } from '../../dtos/requests/pricing/update-price.dto.js';
import type { PricingResponseDTO } from '../../dtos/responses/pricing-response.dto.js';

export const PRICING_SERVICE = Symbol('PRICING_SERVICE');

export interface IPricingService {
  update(dto: UpdatePriceRequestDTO): Promise<PricingResponseDTO>;
  getByProduct(productId: string): Promise<PricingResponseDTO | null>;
  applyDiscount(productId: string, discountPercent: number, actorId: string): Promise<PricingResponseDTO>;
  removeDiscount(productId: string, actorId: string): Promise<PricingResponseDTO>;
  quotePrice(productId: string, quantity: number): Promise<{ unitPrice: number; subtotal: number; taxAmount: number; total: number; currency: string }>;
}
