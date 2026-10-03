/**
 * IMediaService Interface
 */
import type { ProductMediaType } from '../../../domain/entities/product-media.entity.js';

export interface MediaItemDTO {
  readonly id: string;
  readonly productId: string;
  readonly type: ProductMediaType;
  readonly url: string;
  readonly thumbnailUrl?: string;
  readonly alt?: string;
  readonly sortOrder: number;
  readonly sizeBytes?: number;
  readonly isPrimary: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export const MEDIA_SERVICE = Symbol('MEDIA_SERVICE');

export interface IMediaService {
  add(params: {
    productId: string;
    type: ProductMediaType;
    url: string;
    thumbnailUrl?: string;
    alt?: string;
    sortOrder?: number;
    sizeBytes?: number;
    mimeType?: string;
    width?: number;
    height?: number;
    isPrimary?: boolean;
  }, actorId: string): Promise<MediaItemDTO>;
  remove(mediaId: string, actorId: string): Promise<void>;
  setPrimary(mediaId: string, actorId: string): Promise<MediaItemDTO>;
  reorder(productId: string, orderedIds: readonly string[], actorId: string): Promise<void>;
  listByProduct(productId: string): Promise<readonly MediaItemDTO[]>;
}
