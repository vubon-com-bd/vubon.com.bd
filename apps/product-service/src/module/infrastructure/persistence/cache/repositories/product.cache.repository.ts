import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { ProductEntity } from '../../../../domain/entities/product.entity';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo';
import { ProductNameVO } from '../../../../domain/value-objects/primitives/product-name.vo';
import { ProductSlugVO } from '../../../../domain/value-objects/primitives/product-slug.vo';
import { ProductSkuVO } from '../../../../domain/value-objects/primitives/product-sku.vo';
import { ProductStatusVO } from '../../../../domain/value-objects/primitives/product-status.vo';
import { ProductTypeVO } from '../../../../domain/value-objects/primitives/product-type.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { CategoryIdVO } from '../../../../domain/value-objects/primitives/category-id.vo';
import { BrandIdVO } from '../../../../domain/value-objects/primitives/brand-id.vo';

interface Serialized {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly sku: string;
  readonly status: string;
  readonly type: string;
  readonly vendorId: string;
  readonly categoryId: string | null;
  readonly brandId: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'product:product';
const TTL_SECONDS = 60 * 15;

@Injectable()
export class ProductCacheRepository extends BaseCacheRepository<ProductEntity, ProductIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(e: ProductEntity): Serialized {
    return {
      id: e.id.value,
      name: e.name.value,
      slug: e.slug.value,
      sku: e.sku.value,
      status: e.status.value,
      type: e.type.value,
      vendorId: e.vendorId.value,
      categoryId: e.categoryId?.value ?? null,
      brandId: e.brandId?.value ?? null,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      deletedAt: e.deletedAt ?? null,
    };
  }

  private deserialize(d: Serialized): ProductEntity {
    return ProductEntity.reconstitute(
      ProductIdVO.create(d.id),
      {
        name: ProductNameVO.create(d.name),
        slug: ProductSlugVO.create(d.slug),
        sku: ProductSkuVO.create(d.sku),
        status: ProductStatusVO.create(d.status),
        type: ProductTypeVO.create(d.type),
        vendorId: VendorIdVO.create(d.vendorId),
        categoryId: d.categoryId ? CategoryIdVO.create(d.categoryId) : null,
        brandId: d.brandId ? BrandIdVO.create(d.brandId) : null,
      },
      d.createdAt,
      d.updatedAt,
      d.deletedAt,
    );
  }

  async findById(id: ProductIdVO): Promise<ProductEntity | null> {
    const raw = await this.redis.get<Serialized>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly ProductEntity[]> {
    return [];
  }

  async save(entity: ProductEntity): Promise<ProductEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: ProductIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
