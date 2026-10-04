/**
 * CollectionCompositeVO
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CollectionIdVO } from '../primitives/collection-id.vo.js';
import { CollectionNameVO } from '../primitives/collection-name.vo.js';
import { CollectionSlugVO } from '../primitives/collection-slug.vo.js';
import { ProductIdVO } from '../primitives/product-id.vo.js';
import { COLLECTION, COLLECTION_TYPE, COLLECTION_STATUS } from '@vubon/shared-constants/business/product';

export interface CollectionCompositeProps {
  readonly id: CollectionIdVO;
  readonly name: CollectionNameVO;
  readonly slug: CollectionSlugVO;
  readonly description?: string;
  readonly type: string;
  readonly status: string;
  readonly imageUrl?: string;
  readonly productIds: readonly ProductIdVO[];
  readonly isFeatured: boolean;
  readonly sortOrder: number;
  readonly startAt?: string;
  readonly endAt?: string;
}

export class CollectionCompositeVO extends BaseVO<CollectionCompositeProps> {
  private constructor(props: CollectionCompositeProps) {
    super(props);
  }

  static create(props: CollectionCompositeProps): CollectionCompositeVO {
    if (props.productIds.length > COLLECTION.MAX_PRODUCTS) {
      throw new Error(`Collection cannot have more than ${COLLECTION.MAX_PRODUCTS} products`);
    }
    if (props.description && props.description.length > COLLECTION.DESCRIPTION_MAX_LENGTH) {
      throw new Error(`Collection description cannot exceed ${COLLECTION.DESCRIPTION_MAX_LENGTH} chars`);
    }
    if (props.startAt && props.endAt) {
      if (new Date(props.startAt) >= new Date(props.endAt)) {
        throw new Error('startAt must be before endAt');
      }
    }
    return new CollectionCompositeVO(props);
  }

  static reconstitute(props: CollectionCompositeProps): CollectionCompositeVO {
    return new CollectionCompositeVO(props);
  }

  get id(): CollectionIdVO { return this.value.id; }
  get name(): CollectionNameVO { return this.value.name; }
  get slug(): CollectionSlugVO { return this.value.slug; }
  get type(): string { return this.value.type; }
  get status(): string { return this.value.status; }
  get productIds(): readonly ProductIdVO[] { return this.value.productIds; }
  get isFeatured(): boolean { return this.value.isFeatured; }
  get productCount(): number { return this.value.productIds.length; }

  isActive(now: string): boolean {
    if (this.value.status !== COLLECTION_STATUS.ACTIVE) return false;
    const t = new Date(now).getTime();
    if (this.value.startAt && t < new Date(this.value.startAt).getTime()) return false;
    if (this.value.endAt && t > new Date(this.value.endAt).getTime()) return false;
    return true;
  }

  isAutomatic(): boolean {
    return this.value.type === COLLECTION_TYPE.AUTOMATIC;
  }

  hasProduct(productId: ProductIdVO): boolean {
    return this.value.productIds.some((p) => p.value === productId.value);
  }

  canAddProduct(): boolean {
    return this.value.productIds.length < COLLECTION.MAX_PRODUCTS;
  }
}
