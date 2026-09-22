import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { ProductPricingEntity } from '../../../../domain/entities/product-pricing.entity';
import { PriceIdVO } from '../../../../domain/value-objects/primitives/price-id.vo';
import { PriceAmountVO } from '../../../../domain/value-objects/primitives/price-amount.vo';
import { PriceCurrencyVO } from '../../../../domain/value-objects/primitives/price-currency.vo';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo';

interface Serialized {
  readonly id: string;
  readonly productId: string;
  readonly amount: number;
  readonly currency: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'product:pricing';
const TTL_SECONDS = 60 * 10;

@Injectable()
export class ProductPricingCacheRepository extends BaseCacheRepository<ProductPricingEntity, PriceIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(e: ProductPricingEntity): Serialized {
    return {
      id: e.id.value,
      productId: e.productId.value,
      amount: e.amount.value,
      currency: e.currency.value,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  private deserialize(d: Serialized): ProductPricingEntity {
    return ProductPricingEntity.reconstitute(
      PriceIdVO.create(d.id),
      {
        productId: ProductIdVO.create(d.productId),
        amount: PriceAmountVO.create(d.amount),
        currency: PriceCurrencyVO.create(d.currency),
      },
      d.createdAt,
      d.updatedAt,
      null,
    );
  }

  async findById(id: PriceIdVO): Promise<ProductPricingEntity | null> {
    const raw = await this.redis.get<Serialized>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly ProductPricingEntity[]> {
    return [];
  }

  async save(entity: ProductPricingEntity): Promise<ProductPricingEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: PriceIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
