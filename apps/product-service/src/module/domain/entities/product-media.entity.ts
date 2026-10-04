/**
 * ProductMediaEntity — Child of Product aggregate
 * @module product-service/domain/entities
 *
 * Business rules:
 * - URL must be valid http(s)
 * - size limited by type (image 5MB, video 100MB, doc 10MB)
 * - sortOrder non-negative
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { MediaSizeExceededError, InvalidMediaTypeError } from '../errors/media.errors.js';

export type ProductMediaType = 'image' | 'video' | 'document';

const ALLOWED_TYPES: readonly ProductMediaType[] = ['image', 'video', 'document'];
const MAX_SIZE_MB: Record<ProductMediaType, number> = {
  image: 5,
  video: 100,
  document: 10,
};

export interface ProductMediaEntityProps {
  readonly productId: string;
  readonly type: ProductMediaType;
  readonly url: string;
  readonly thumbnailUrl?: string;
  readonly alt?: string;
  readonly sortOrder: number;
  readonly sizeBytes?: number;
  readonly mimeType?: string;
  readonly width?: number;
  readonly height?: number;
  readonly isPrimary: boolean;
}

export class ProductMediaEntity extends BaseEntity<string> {
  private readonly _productId: string;
  private readonly _type: ProductMediaType;
  private readonly _url: string;
  private _thumbnailUrl?: string;
  private _alt?: string;
  private _sortOrder: number;
  private readonly _sizeBytes?: number;
  private readonly _mimeType?: string;
  private readonly _width?: number;
  private readonly _height?: number;
  private _isPrimary: boolean;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: ProductMediaEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._productId = props.productId;
    this._type = props.type;
    this._url = props.url;
    this._thumbnailUrl = props.thumbnailUrl;
    this._alt = props.alt;
    this._sortOrder = props.sortOrder;
    this._sizeBytes = props.sizeBytes;
    this._mimeType = props.mimeType;
    this._width = props.width;
    this._height = props.height;
    this._isPrimary = props.isPrimary;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!ALLOWED_TYPES.includes(this._type)) {
      throw new InvalidMediaTypeError(this._type, ALLOWED_TYPES);
    }
    if (!/^https?:\/\/[^\s]+$/.test(this._url)) {
      throw new ValidationError('Media URL must be a valid http(s) URL', 'url');
    }
    if (this._sortOrder < 0) {
      throw new ValidationError('sortOrder cannot be negative', 'sortOrder');
    }
    if (this._sizeBytes !== undefined) {
      const sizeMb = this._sizeBytes / (1024 * 1024);
      if (sizeMb > MAX_SIZE_MB[this._type]) {
        throw new MediaSizeExceededError(sizeMb, MAX_SIZE_MB[this._type]);
      }
    }
  }

  // Getters
  get productId(): string { return this._productId; }
  get type(): ProductMediaType { return this._type; }
  get url(): string { return this._url; }
  get thumbnailUrl(): string | undefined { return this._thumbnailUrl; }
  get alt(): string | undefined { return this._alt; }
  get sortOrder(): number { return this._sortOrder; }
  get sizeBytes(): number | undefined { return this._sizeBytes; }
  get mimeType(): string | undefined { return this._mimeType; }
  get width(): number | undefined { return this._width; }
  get height(): number | undefined { return this._height; }
  get isPrimary(): boolean { return this._isPrimary; }

  // Business methods
  public changeSortOrder(order: number): void {
    if (order < 0) throw new ValidationError('sortOrder cannot be negative', 'sortOrder');
    this._sortOrder = order;
  }

  public updateAlt(alt: string | undefined): void {
    this._alt = alt;
  }

  public updateThumbnail(url: string | undefined): void {
    if (url !== undefined && !/^https?:\/\/[^\s]+$/.test(url)) {
      throw new ValidationError('Thumbnail URL must be valid', 'thumbnailUrl');
    }
    this._thumbnailUrl = url;
  }

  public setPrimary(value: boolean): void {
    if (value && this._type !== 'image') {
      throw new BusinessRuleError(
        'Only images can be marked as primary',
        'ONLY_IMAGE_PRIMARY',
      );
    }
    this._isPrimary = value;
  }

  // Queries
  public isImage(): boolean { return this._type === 'image'; }
  public isVideo(): boolean { return this._type === 'video'; }

  public sizeInMb(): number {
    if (!this._sizeBytes) return 0;
    return Math.round((this._sizeBytes / (1024 * 1024)) * 100) / 100;
  }

  public isWithinSizeLimit(): boolean {
    if (!this._sizeBytes) return true;
    return this.sizeInMb() <= MAX_SIZE_MB[this._type];
  }

  // Factories
  public static create(params: {
    id: string;
    props: ProductMediaEntityProps;
    now: string;
  }): ProductMediaEntity {
    return new ProductMediaEntity(params.id, params.now, params.now, params.props);
  }

  public static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: ProductMediaEntityProps;
  }): ProductMediaEntity {
    return new ProductMediaEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
