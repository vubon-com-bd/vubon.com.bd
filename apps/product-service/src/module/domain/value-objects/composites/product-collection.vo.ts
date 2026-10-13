/**
 * ProductCollection Composite Value Object
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';
import { COLLECTION } from '@vubon/shared-constants/business';

import { CollectionIdVO } from '../primitives/collection-id.vo.js';
import { CollectionNameVO } from '../primitives/collection-name.vo.js';
import { CollectionTypeVO } from '../primitives/collection-type.vo.js';
import { ProductIdVO } from '../primitives/product-id.vo.js';

export interface ProductCollectionVOProps {
  readonly id: CollectionIdVO;
  readonly name: CollectionNameVO;
  readonly slug: string;
  readonly type: CollectionTypeVO;
  readonly description?: string;
  readonly imageUrl?: string;
  readonly productIds: readonly ProductIdVO[];
  readonly isFeatured: boolean;
  readonly sortOrder: number;
  readonly startAt?: string;
  readonly endAt?: string;
}

export class ProductCollectionVO extends BaseVO<ProductCollectionVOProps> {
  private constructor(props: ProductCollectionVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: ProductCollectionVOProps): ProductCollectionVO {
    const vo = new ProductCollectionVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: ProductCollectionVOProps): ProductCollectionVO {
    return new ProductCollectionVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (!REGEX.SLUG.test(v.slug)) {
      throw new ValidationError('Collection slug is invalid', 'slug');
    }

    if (v.productIds.length > COLLECTION.MAX_PRODUCTS) {
      throw new ValidationError(
        `Collection products cannot exceed ${COLLECTION.MAX_PRODUCTS}`,
        'productIds',
      );
    }

    if (v.imageUrl && !REGEX.URL.test(v.imageUrl)) {
      throw new ValidationError('Collection imageUrl must be a valid URL', 'imageUrl');
    }

    if (v.startAt && v.endAt && v.startAt > v.endAt) {
      throw new ValidationError('Collection startAt cannot be after endAt', 'startAt');
    }

    if (!Number.isInteger(v.sortOrder)) {
      throw new ValidationError('Collection sortOrder must be an integer', 'sortOrder');
    }
  }

  get id(): CollectionIdVO { return this.value.id; }
  get name(): CollectionNameVO { return this.value.name; }
  get slug(): string { return this.value.slug; }
  get type(): CollectionTypeVO { return this.value.type; }
  get description(): string | undefined { return this.value.description; }
  get imageUrl(): string | undefined { return this.value.imageUrl; }
  get productIds(): readonly ProductIdVO[] { return this.value.productIds; }
  get isFeatured(): boolean { return this.value.isFeatured; }
  get sortOrder(): number { return this.value.sortOrder; }
  get startAt(): string | undefined { return this.value.startAt; }
  get endAt(): string | undefined { return this.value.endAt; }

  get productCount(): number { return this.productIds.length; }

  hasProducts(): boolean { return this.productIds.length > 0; }

  contains(productId: ProductIdVO): boolean {
    return this.productIds.some((p) => p.equals(productId));
  }

  isScheduled(at: string): boolean {
    return this.startAt !== undefined && at < this.startAt;
  }

  isExpired(at: string): boolean {
    return this.endAt !== undefined && at > this.endAt;
  }

  isActive(at: string): boolean {
    return !this.isScheduled(at) && !this.isExpired(at);
  }

  withProduct(productId: ProductIdVO): ProductCollectionVO {
    if (this.contains(productId)) return this;
    return ProductCollectionVO.create({
      ...this.value,
      productIds: [...this.productIds, productId],
    });
  }

  withoutProduct(productId: ProductIdVO): ProductCollectionVO {
    return ProductCollectionVO.create({
      ...this.value,
      productIds: this.productIds.filter((p) => !p.equals(productId)),
    });
  }
}
