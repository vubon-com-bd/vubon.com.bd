/**
 * ProductMediaService (Domain) — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { ProductMediaService } from '../../../../src/module/domain/services/product-media.service.js';
import type { ProductMediaItem } from '../../../../src/module/domain/value-objects/composites/product-media.vo.js';

function img(url: string, isPrimary = false, order = 0): ProductMediaItem {
  return { url, type: 'image', order, isPrimary };
}
function vid(url: string, order = 1): ProductMediaItem {
  return { url, type: 'video', order, isPrimary: false };
}

describe('ProductMediaService (Domain)', () => {
  describe('validate()', () => {
    it('valid items pass', () => {
      const r = ProductMediaService.validate([
        img('https://example.com/a.jpg', true),
        img('https://example.com/b.jpg', false, 1),
      ]);
      expect(r.valid).toBe(true);
      expect(r.reasons.length).toBe(0);
    });

    it('multiple primary → invalid', () => {
      const r = ProductMediaService.validate([
        img('https://example.com/a.jpg', true),
        img('https://example.com/b.jpg', true),
      ]);
      expect(r.valid).toBe(false);
    });

    it('empty url → invalid', () => {
      const r = ProductMediaService.validate([
        { url: '', type: 'image', order: 0, isPrimary: false },
      ]);
      expect(r.valid).toBe(false);
    });
  });

  describe('selectThumbnail()', () => {
    it('returns primary image when present', () => {
      const items = [
        img('https://example.com/a.jpg', false, 0),
        img('https://example.com/b.jpg', true, 1),
      ];
      expect(ProductMediaService.selectThumbnail(items)).toBe('https://example.com/b.jpg');
    });

    it('falls back to first image if no primary', () => {
      const items = [img('https://example.com/a.jpg'), img('https://example.com/b.jpg', false, 1)];
      expect(ProductMediaService.selectThumbnail(items)).toBe('https://example.com/a.jpg');
    });

    it('returns undefined when no images', () => {
      expect(ProductMediaService.selectThumbnail([])).toBeUndefined();
    });
  });

  describe('order()', () => {
    it('primary first, then by order field', () => {
      const items = [
        img('https://example.com/a.jpg', false, 5),
        img('https://example.com/b.jpg', true, 10),
        img('https://example.com/c.jpg', false, 1),
      ];
      const sorted = ProductMediaService.order(items);
      expect(sorted[0].url).toBe('https://example.com/b.jpg');
      expect(sorted[1].url).toBe('https://example.com/c.jpg');
      expect(sorted[2].url).toBe('https://example.com/a.jpg');
    });
  });

  describe('setPrimary()', () => {
    it('sets new primary and clears old', () => {
      const items = [
        img('https://example.com/a.jpg', true, 0),
        img('https://example.com/b.jpg', false, 1),
      ];
      const updated = ProductMediaService.setPrimary(items, 'https://example.com/b.jpg');
      expect(updated.find((i) => i.url === 'https://example.com/b.jpg')?.isPrimary).toBe(true);
      expect(updated.find((i) => i.url === 'https://example.com/a.jpg')?.isPrimary).toBe(false);
    });

    it('throws when url not found', () => {
      expect(() => ProductMediaService.setPrimary([], 'missing.jpg')).toThrow();
    });
  });

  describe('inferType()', () => {
    it('jpg → image', () => {
      expect(ProductMediaService.inferType('photo.jpg')).toBe('image');
    });
    it('png → image', () => {
      expect(ProductMediaService.inferType('photo.png')).toBe('image');
    });
    it('mp4 → video', () => {
      expect(ProductMediaService.inferType('video.mp4')).toBe('video');
    });
    it('pdf → document', () => {
      expect(ProductMediaService.inferType('file.pdf')).toBe('document');
    });
  });
});
