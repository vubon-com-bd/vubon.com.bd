import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ProductMediaEntity } from '../../../domain/entities/product-media.entity';

export interface ProductMediaServiceInterface
  extends BaseServiceInterface<ProductMediaEntity, string> {
  add(productId: string, url: string, type: 'image' | 'video' | 'document'): Promise<unknown>;
  remove(mediaId: string): Promise<void>;
  reorder(mediaId: string, order: number): Promise<void>;
  listByProduct(productId: string): Promise<readonly unknown[]>;
}
