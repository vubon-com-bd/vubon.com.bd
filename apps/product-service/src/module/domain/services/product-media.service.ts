/**
 * ProductMediaService — Real business logic
 * @module product-service/domain/services
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import type { ProductMediaItem, MediaType } from '../value-objects/composites/product-media.vo.js';

const MAX_MEDIA_ITEMS = 30;
const MAX_IMAGES = 20;
const MAX_VIDEOS = 5;

export interface MediaValidationResult {
  readonly valid: boolean;
  readonly reasons: readonly string[];
}

export interface MediaOrderInput {
  readonly items: readonly ProductMediaItem[];
}

export class ProductMediaService {
  /**
   * Media items validate।
   */
  static validate(items: readonly ProductMediaItem[]): MediaValidationResult {
    const reasons: string[] = [];

    if (items.length > MAX_MEDIA_ITEMS) {
      reasons.push(`too many media items (${items.length} > ${MAX_MEDIA_ITEMS})`);
    }

    const images = items.filter((i) => i.type === 'image').length;
    const videos = items.filter((i) => i.type === 'video').length;

    if (images > MAX_IMAGES) reasons.push(`too many images (${images} > ${MAX_IMAGES})`);
    if (videos > MAX_VIDEOS) reasons.push(`too many videos (${videos} > ${MAX_VIDEOS})`);

    const primaryCount = items.filter((i) => i.isPrimary).length;
    if (primaryCount > 1) reasons.push('multiple primary items');

    for (const item of items) {
      if (!item.url || item.url.trim().length === 0) {
        reasons.push('media item has empty url');
      }
    }

    return { valid: reasons.length === 0, reasons };
  }

  /**
   * Primary image detect।
   */
  static selectThumbnail(items: readonly ProductMediaItem[]): string | undefined {
    const primary = items.find((i) => i.isPrimary && i.type === 'image');
    if (primary) return primary.url;

    const firstImage = items.find((i) => i.type === 'image');
    return firstImage?.url;
  }

  /**
   * Media order সাজায় (order field, তারপর primary প্রথমে)।
   */
  static order(items: readonly ProductMediaItem[]): readonly ProductMediaItem[] {
    return [...items].sort((a, b) => {
      if (a.isPrimary !== b.isPrimary) return a.isPrimary ? -1 : 1;
      return a.order - b.order;
    });
  }

  /**
   * Media list থেকে primary set করে।
   */
  static setPrimary(
    items: readonly ProductMediaItem[],
    targetUrl: string,
  ): readonly ProductMediaItem[] {
    const exists = items.some((i) => i.url === targetUrl);
    if (!exists) {
      throw new BusinessRuleError(
        `Cannot set primary — url "${targetUrl}" not found`,
        'MEDIA_PRIMARY_NOT_FOUND',
        { url: targetUrl },
      );
    }
    return items.map((i) => ({ ...i, isPrimary: i.url === targetUrl }));
  }

  /**
   * Media type detect by file extension (simple heuristic)।
   */
  static inferType(url: string): MediaType {
    const lower = url.toLowerCase().split('?')[0];
    if (/\.(jpg|jpeg|png|webp|gif|avif|svg)$/.test(lower)) return 'image';
    if (/\.(mp4|webm|mov|avi|mkv)$/.test(lower)) return 'video';
    return 'document';
  }

  /**
   * সব media URL valid কিনা।
   */
  static allHaveValidUrls(items: readonly ProductMediaItem[]): boolean {
    return items.every((i) => i.url && i.url.startsWith('http'));
  }
}
