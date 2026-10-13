/**
 * ProductMediaEntity — Child of Product aggregate
 * @module product-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ProductMediaVO, type ProductMediaItem } from '../value-objects/composites/product-media.vo.js';

export class ProductMediaEntity extends BaseEntity<string> {
  private _vo: ProductMediaVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    vo: ProductMediaVO,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = vo;
  }

  get vo(): ProductMediaVO { return this._vo; }
  get productId(): string { return this._vo.productId; }
  get items(): readonly ProductMediaItem[] { return this._vo.items; }
  get thumbnailUrl(): string | undefined { return this._vo.thumbnailUrl; }
  get videoUrl(): string | undefined { return this._vo.videoUrl; }

  hasImages(): boolean { return this._vo.hasImages(); }
  hasVideos(): boolean { return this._vo.hasVideos(); }
  hasThumbnail(): boolean { return this._vo.hasThumbnail(); }
  isEmpty(): boolean { return this._vo.isEmpty(); }

  sorted(): readonly ProductMediaItem[] { return this._vo.sorted(); }

  updateVo(vo: ProductMediaVO, now: string = new Date().toISOString()): void {
    this._vo = vo;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    vo: ProductMediaVO;
    now: string;
  }): ProductMediaEntity {
    return new ProductMediaEntity(params.id, params.now, params.now, params.vo, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    vo: ProductMediaVO;
  }): ProductMediaEntity {
    return new ProductMediaEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.vo,
      params.deletedAt ?? null,
    );
  }
}
