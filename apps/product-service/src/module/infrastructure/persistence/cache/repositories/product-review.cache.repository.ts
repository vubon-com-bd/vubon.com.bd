import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { ProductReviewEntity } from '../../../../domain/entities/product-review.entity';
import { ReviewIdVO } from '../../../../domain/value-objects/primitives/review-id.vo';
import { ReviewRatingVO } from '../../../../domain/value-objects/primitives/review-rating.vo';
import { ReviewContentVO } from '../../../../domain/value-objects/primitives/review-content.vo';
import { ReviewStatusVO } from '../../../../domain/value-objects/primitives/review-status.vo';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo';

interface Serialized {
  readonly id: string;
  readonly productId: string;
  readonly userId: string;
  readonly rating: number;
  readonly content: string;
  readonly status: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'product:review';
const TTL_SECONDS = 60 * 5;

@Injectable()
export class ProductReviewCacheRepository extends BaseCacheRepository<ProductReviewEntity, ReviewIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(e: ProductReviewEntity): Serialized {
    return {
      id: e.id.value,
      productId: e.productId.value,
      userId: e.userId,
      rating: e.rating.value,
      content: e.content.value,
      status: e.status.value,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  private deserialize(d: Serialized): ProductReviewEntity {
    return ProductReviewEntity.reconstitute(
      ReviewIdVO.create(d.id),
      {
        productId: ProductIdVO.create(d.productId),
        userId: d.userId,
        rating: ReviewRatingVO.create(d.rating),
        content: ReviewContentVO.create(d.content),
        status: ReviewStatusVO.create(d.status),
      },
      d.createdAt,
      d.updatedAt,
      null,
    );
  }

  async findById(id: ReviewIdVO): Promise<ProductReviewEntity | null> {
    const raw = await this.redis.get<Serialized>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly ProductReviewEntity[]> {
    return [];
  }

  async save(entity: ProductReviewEntity): Promise<ProductReviewEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: ReviewIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
