import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { ProductVariantEntity } from '../../../../domain/entities/product-variant.entity';
import { VariantIdVO } from '../../../../domain/value-objects/primitives/variant-id.vo';
import { VariantNameVO } from '../../../../domain/value-objects/primitives/variant-name.vo';
import { VariantSkuVO } from '../../../../domain/value-objects/primitives/variant-sku.vo';
import { PriceAmountVO } from '../../../../domain/value-objects/primitives/price-amount.vo';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo';

interface Serialized {
  readonly id: string;
  readonly productId: string;
  readonly name: string;
  readonly sku: string;
  readonly price: number;
  readonly isDefault: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'product:variant';
const TTL_SECONDS = 60 * 15;

@Injectable()
export class ProductVariantCacheRepository extends BaseCacheRepository<ProductVariantEntity, VariantIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(e: ProductVariantEntity): Serialized {
    return {
      id: e.id.value,
      productId: e.productId.value,
      name: e.name.value,
      sku: e.sku.value,
      price: e.price.value,
      isDefault: e.isDefault,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  private deserialize(d: Serialized): ProductVariantEntity {
    return ProductVariantEntity.reconstitute(
      VariantIdVO.create(d.id),
      {
        productId: ProductIdVO.create(d.productId),
        name: VariantNameVO.create(d.name),
        sku: VariantSkuVO.create(d.sku),
        price: PriceAmountVO.create(d.price),
        isDefault: d.isDefault,
      },
      d.createdAt,
      d.updatedAt,
      null,
    );
  }

  async findById(id: VariantIdVO): Promise<ProductVariantEntity | null> {
    const raw = await this.redis.get<Serialized>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly ProductVariantEntity[]> {
    return [];
  }

  async save(entity: ProductVariantEntity): Promise<ProductVariantEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: VariantIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
