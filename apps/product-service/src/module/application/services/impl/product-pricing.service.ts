import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ProductPricingServiceInterface } from '../interfaces/product-pricing.service.interface';
import type { ProductPricingRepository } from '../../../domain/repositories/product-pricing.repository.interface';
import { ProductPricingEntity } from '../../../domain/entities/product-pricing.entity';
import { PriceAmountVO } from '../../../domain/value-objects/primitives/price-amount.vo';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo';
import { PricingOperationFailedError } from '../../errors/pricing.errors';
import type { PricingResponseDTO } from '../../dtos/responses/pricing-response.dto';

@Injectable()
export class ProductPricingService
  extends BaseService<ProductPricingEntity, string>
  implements ProductPricingServiceInterface
{
  readonly name = 'ProductPricingService';

  constructor(
    private readonly pricingRepo: ProductPricingRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async findByProduct(productId: string): Promise<PricingResponseDTO | null> {
    const entity = await this.pricingRepo.findByProduct(ProductIdVO.create(productId));
    return entity ? this.toDTO(entity) : null;
  }

  async updatePrice(productId: string, amount: number, currency?: string): Promise<PricingResponseDTO> {
    void currency;
    const entity = await this.pricingRepo.findByProduct(ProductIdVO.create(productId));
    if (!entity) throw new PricingOperationFailedError('pricing not found');
    const updated = entity.changeAmount(PriceAmountVO.create(amount));
    await this.pricingRepo.save(updated);
    await this.publishEvents(updated);
    return this.toDTO(updated);
  }

  async calculateFinalPrice(productId: string): Promise<number> {
    const entity = await this.pricingRepo.findByProduct(ProductIdVO.create(productId));
    if (!entity) throw new PricingOperationFailedError('pricing not found');
    return entity.amount.value;
  }

  private toDTO(entity: ProductPricingEntity): PricingResponseDTO {
    return {
      productId: entity.productId.value,
      amount: entity.amount.value,
      currency: entity.currency.value,
    } as unknown as PricingResponseDTO;
  }

  private async publishEvents(entity: ProductPricingEntity): Promise<void> {
    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
