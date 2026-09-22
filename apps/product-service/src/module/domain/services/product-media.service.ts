import { ProductMediaEntity } from '../entities/product-media.entity';

const MAX_MEDIA = 20;

export class ProductMediaService {
  static canAdd(current: readonly ProductMediaEntity[]): boolean {
    return current.length < MAX_MEDIA;
  }

  static sortByOrder(media: readonly ProductMediaEntity[]): readonly ProductMediaEntity[] {
    return [...media].sort((a, b) => a.order - b.order);
  }

  static getPrimaryImage(
    media: readonly ProductMediaEntity[],
  ): ProductMediaEntity | null {
    const images = media.filter((m) => m.type === 'image');
    if (images.length === 0) return null;
    return ProductMediaService.sortByOrder(images)[0] ?? null;
  }
}
