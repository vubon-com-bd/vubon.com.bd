/**
 * PricingService
 */
import { Injectable, Inject } from '@nestjs/common';
import type { IPricingService } from '../interfaces/pricing.service.interface.js';
import { PRICING_REPOSITORY, type PricingRepository } from '../../../domain/repositories/pricing.repository.interface.js';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';
import { PriceVO } from '../../../domain/value-objects/primitives/price.vo.js';
import { DiscountPercentVO } from '../../../domain/value-objects/primitives/discount-vo.js';
import { PricingMapper } from '../../mappers/pricing.mapper.js';
import type { UpdatePriceRequestDTO } from '../../dtos/requests/pricing/update-price.dto.js';
import type { PricingResponseDTO } from '../../dtos/responses/pricing-response.dto.js';
import { PricingNotFoundApplicationError } from '../../errors/pricing.errors.js';

@Injectable()
export class PricingService implements IPricingService {
  constructor(
    @Inject(PRICING_REPOSITORY) private readonly pricingRepo: PricingRepository,
  ) {}

  async update(dto: UpdatePriceRequestDTO): Promise<PricingResponseDTO> {
    const pricing = await this.pricingRepo.findById(dto.pricingId);
    if (!pricing) throw new PricingNotFoundApplicationError(dto.pricingId);
    if (dto.basePrice !== undefined) pricing.changeBasePrice(PriceVO.create(dto.basePrice, pricing.basePrice.currency));
    if (dto.sellingPrice !== undefined) pricing.changeSellingPrice(PriceVO.create(dto.sellingPrice, pricing.sellingPrice.currency));
    if (dto.costPrice !== undefined) pricing.changeCostPrice(PriceVO.create(dto.costPrice, pricing.sellingPrice.currency));
    await this.pricingRepo.save(pricing);
    return PricingMapper.toResponse(pricing);
  }

  async getByProduct(productId: string): Promise<PricingResponseDTO | null> {
    const pricing = await this.pricingRepo.findByProductId(ProductIdVO.create(productId));
    return pricing ? PricingMapper.toResponse(pricing) : null;
  }

  async applyDiscount(productId: string, discountPercent: number, actorId: string): Promise<PricingResponseDTO> {
    const pricing = await this.pricingRepo.findByProductId(ProductIdVO.create(productId));
    if (!pricing) throw new PricingNotFoundApplicationError(productId);
    pricing.applyDiscount(DiscountPercentVO.create(discountPercent));
    await this.pricingRepo.save(pricing);
    void actorId;
    return PricingMapper.toResponse(pricing);
  }

  async removeDiscount(productId: string, actorId: string): Promise<PricingResponseDTO> {
    const pricing = await this.pricingRepo.findByProductId(ProductIdVO.create(productId));
    if (!pricing) throw new PricingNotFoundApplicationError(productId);
    pricing.removeDiscount();
    await this.pricingRepo.save(pricing);
    void actorId;
    return PricingMapper.toResponse(pricing);
  }

  async quotePrice(productId: string, quantity: number): Promise<{ unitPrice: number; subtotal: number; taxAmount: number; total: number; currency: string }> {
    const pricing = await this.pricingRepo.findByProductId(ProductIdVO.create(productId));
    if (!pricing) throw new PricingNotFoundApplicationError(productId);
    const unitPrice = pricing.sellingPrice.amount;
    const subtotal = pricing.totalFor(quantity);
    const taxAmount = pricing.taxInclusive ? 0 : Math.round(subtotal * pricing.taxRate.value * 100) / 100;
    const total = Math.round((subtotal + taxAmount) * 100) / 100;
    return { unitPrice, subtotal, taxAmount, total, currency: pricing.sellingPrice.currency };
  }
}
