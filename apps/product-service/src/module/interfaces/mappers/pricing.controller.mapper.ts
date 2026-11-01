/**
 * PricingControllerMapper — HTTP DTO ↔ App DTO
 * @module product-service/interfaces/mappers
 */
import type {
  UpdatePriceHttpDTO,
  CalculatePriceHttpDTO,
} from '../dtos/requests/pricing.request.dto.js';

import type { UpdatePriceRequestDTO } from '../../application/dtos/requests/pricing/index.js';
import type { PriceCalculationInputDTO } from '../../application/services/interfaces/product-pricing.service.interface.js';

import type {
  PricingResponseDTO,
  PricingPublicResponseDTO,
  PricingListResponseDTO,
  PricingStatsResponseDTO,
  PriceCalculationResponseDTO,
} from '../../application/dtos/responses/pricing-response.dto.js';

import {
  PricingHttpResponseDTO,
  PricingPublicHttpResponseDTO,
  PricingListHttpResponseDTO,
  PricingStatsHttpResponseDTO,
  PriceCalculationHttpResponseDTO,
} from '../dtos/responses/pricing.response.dto.js';

export class PricingControllerMapper {
  static toUpdatePriceAppDto(productId: string, dto: UpdatePriceHttpDTO): UpdatePriceRequestDTO {
    return {
      productId,
      sellingPrice: dto.sellingPrice,
      compareAtPrice: dto.compareAtPrice,
      costPrice: dto.costPrice,
      reason: dto.reason,
      actorRole: dto.actorRole as never,
      bypassMinMargin: dto.bypassMinMargin,
    };
  }

  static toCalculateAppDto(dto: CalculatePriceHttpDTO): PriceCalculationInputDTO {
    return {
      productId: dto.productId,
      variantId: dto.variantId,
      quantity: dto.quantity,
      currency: dto.currency,
      applyAit: dto.applyAit,
    };
  }

  static toHttpResponse(app: PricingResponseDTO): PricingHttpResponseDTO {
    return app as unknown as PricingHttpResponseDTO;
  }

  static toPublicHttpResponse(app: PricingPublicResponseDTO): PricingPublicHttpResponseDTO {
    return app as unknown as PricingPublicHttpResponseDTO;
  }

  static toListHttp(app: PricingListResponseDTO): PricingListHttpResponseDTO {
    return app as unknown as PricingListHttpResponseDTO;
  }

  static toStatsHttp(app: PricingStatsResponseDTO): PricingStatsHttpResponseDTO {
    return app as unknown as PricingStatsHttpResponseDTO;
  }

  static toCalculationHttp(app: PriceCalculationResponseDTO): PriceCalculationHttpResponseDTO {
    return app as unknown as PriceCalculationHttpResponseDTO;
  }
}
