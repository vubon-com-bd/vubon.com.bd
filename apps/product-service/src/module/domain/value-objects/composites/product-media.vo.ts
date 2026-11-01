/**
 * ProductMedia Composite Value Object
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';

export type MediaType = 'image' | 'video' | 'document';

export interface ProductMediaItem {
  readonly url: string;
  readonly type: MediaType;
  readonly alt?: string;
  readonly order: number;
  readonly isPrimary: boolean;
}

export interface ProductMediaVOProps {
  readonly productId: string;
  readonly items: readonly ProductMediaItem[];
  readonly thumbnailUrl?: string;
  readonly videoUrl?: string;
}

const ALLOWED_TYPES: readonly MediaType[] = ['image', 'video', 'document'];
const MAX_ITEMS = 30;

export class ProductMediaVO extends BaseVO<ProductMediaVOProps> {
  private constructor(props: ProductMediaVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: ProductMediaVOProps): ProductMediaVO {
    const vo = new ProductMediaVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: ProductMediaVOProps): ProductMediaVO {
    return new ProductMediaVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (v.items.length > MAX_ITEMS) {
      throw new ValidationError(`Media items cannot exceed ${MAX_ITEMS}`, 'items');
    }

    let primaryCount = 0;
    for (const item of v.items) {
      if (!REGEX.URL.test(item.url)) {
        throw new ValidationError(`Invalid media URL: ${item.url}`, 'items');
      }
      if (!ALLOWED_TYPES.includes(item.type)) {
        throw new ValidationError(`Invalid media type: ${item.type}`, 'items');
      }
      if (!Number.isInteger(item.order) || item.order < 0) {
        throw new ValidationError('Media item order must be a non-negative integer', 'items');
      }
      if (item.isPrimary) primaryCount++;
    }

    if (primaryCount > 1) {
      throw new ValidationError('Only one media item can be primary', 'items');
    }

    if (v.thumbnailUrl && !REGEX.URL.test(v.thumbnailUrl)) {
      throw new ValidationError('Invalid thumbnailUrl', 'thumbnailUrl');
    }
    if (v.videoUrl && !REGEX.URL.test(v.videoUrl)) {
      throw new ValidationError('Invalid videoUrl', 'videoUrl');
    }
  }

  get productId(): string { return this.value.productId; }
  get items(): readonly ProductMediaItem[] { return this.value.items; }
  get thumbnailUrl(): string | undefined { return this.value.thumbnailUrl; }
  get videoUrl(): string | undefined { return this.value.videoUrl; }

  get imageItems(): readonly ProductMediaItem[] {
    return this.items.filter((i) => i.type === 'image');
  }

  get videoItems(): readonly ProductMediaItem[] {
    return this.items.filter((i) => i.type === 'video');
  }

  get primaryImage(): ProductMediaItem | undefined {
    return this.items.find((i) => i.isPrimary && i.type === 'image')
      ?? this.items.find((i) => i.type === 'image');
  }

  hasImages(): boolean { return this.imageItems.length > 0; }
  hasVideos(): boolean { return this.videoItems.length > 0; }
  hasThumbnail(): boolean { return this.thumbnailUrl !== undefined; }
  hasVideo(): boolean { return this.videoUrl !== undefined; }
  isEmpty(): boolean { return this.items.length === 0; }

  sorted(): readonly ProductMediaItem[] {
    return [...this.items].sort((a, b) => a.order - b.order);
  }
}
