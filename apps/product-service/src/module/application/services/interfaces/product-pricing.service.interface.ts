/**
 * IProductPricingService — contract
 * @module product-service/application/services/interfaces
 */
import type { UpdatePriceRequestDTO } from '../../dtos/requests/pricing/index.js';
import type {
  PricingResponseDTO,
  PricingPublicResponseDTO,
  PricingListResponseDTO,
  PricingStatsResponseDTO,
  PriceCalculationResponseDTO,
} from '../../dtos/responses/pricing-response.dto.js';

export const PRICING_SERVICE = Symbol('PRICING_SERVICE');

export interface PricingListFilterDTO {
  readonly productId?: string;
  readonly currency?: string;
  readonly hasDiscount?: boolean;
  readonly effectiveAt?: string;
}

export interface PricingListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'sellingPrice' | 'updatedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: PricingListFilterDTO;
}

export interface PriceCalculationInputDTO {
  readonly productId: string;
  readonly variantId?: string;
  readonly quantity: number;
  readonly currency?: string;
  readonly applyAit?: boolean;
}

export interface IProductPricingService {
  // Commands
  updatePrice(dto: UpdatePriceRequestDTO): Promise<PricingResponseDTO>;

  // Queries
  getById(id: string): Promise<PricingResponseDTO>;
  getByProduct(productId: string): Promise<PricingResponseDTO>;
  getPublic(productId: string): Promise<PricingPublicResponseDTO>;
  calculate(input: PriceCalculationInputDTO): Promise<PriceCalculationResponseDTO>;
  list(options: PricingListOptionsDTO): Promise<PricingListResponseDTO>;
  getStats(filter?: PricingListFilterDTO): Promise<PricingStatsResponseDTO>;
}
