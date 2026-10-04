/**
 * ProductMediaEntity — unit tests
 */
import { ProductMediaEntity } from '../../../src/module/domain/entities/product-media.entity.js';
import { buildMedia } from '../../fixtures.js';

describe('ProductMediaEntity', () => {
  describe('constructor invariants', () => {
    it('should reject invalid media type', () => {
      expect(() => buildMedia({ type: 'audio' as never })).toThrow(Error);
    });

    it('should reject invalid URL', () => {
      expect(() => buildMedia({ url: 'not-a-url' })).toThrow(Error);
    });

    it('should reject negative sortOrder', () => {
      expect(() => buildMedia({ sortOrder: -1 })).toThrow(Error);
    });

    it('should reject image over size limit', () => {
      const tooBig = 6 * 1024 * 1024; // 6MB > 5MB
      expect(() => buildMedia({ type: 'image', sizeBytes: tooBig })).toThrow(Error);
    });

    it('should accept video within size limit', () => {
      const media = buildMedia({ type: 'video', sizeBytes: 50 * 1024 * 1024 });
      expect(media.type).toBe('video');
    });
  });

  describe('changeSortOrder()', () => {
    it('should update sortOrder', () => {
      const media = buildMedia();
      media.changeSortOrder(5);
      expect(media.sortOrder).toBe(5);
    });

    it('should reject negative', () => {
      const media = buildMedia();
      expect(() => media.changeSortOrder(-1)).toThrow(Error);
    });
  });

  describe('updateAlt()', () => {
    it('should update alt text', () => {
      const media = buildMedia();
      media.updateAlt('New alt text');
      expect(media.alt).toBe('New alt text');
    });

    it('should allow undefined', () => {
      const media = buildMedia();
      media.updateAlt(undefined);
      expect(media.alt).toBeUndefined();
    });
  });

  describe('updateThumbnail()', () => {
    it('should accept valid URL', () => {
      const media = buildMedia();
      media.updateThumbnail('https://cdn.example.com/thumb.jpg');
      expect(media.thumbnailUrl).toBe('https://cdn.example.com/thumb.jpg');
    });

    it('should reject invalid URL', () => {
      const media = buildMedia();
      expect(() => media.updateThumbnail('not-url')).toThrow(Error);
    });

    it('should allow undefined', () => {
      const media = buildMedia();
      media.updateThumbnail(undefined);
      expect(media.thumbnailUrl).toBeUndefined();
    });
  });

  describe('setPrimary()', () => {
    it('should set primary for image', () => {
      const media = buildMedia();
      media.setPrimary(true);
      expect(media.isPrimary).toBe(true);
    });

    it('should reject setting video primary', () => {
      const media = buildMedia({ type: 'video' });
      expect(() => media.setPrimary(true)).toThrow(Error);
    });

    it('should allow unset for any type', () => {
      const media = buildMedia({ type: 'video', isPrimary: false });
      media.setPrimary(false);
      expect(media.isPrimary).toBe(false);
    });
  });

  describe('size calculations', () => {
    it('sizeInMb rounds correctly', () => {
      const media = buildMedia({ sizeBytes: Math.round(1.5 * 1024 * 1024) });
      expect(media.sizeInMb()).toBeCloseTo(1.5, 2);
    });

    it('sizeInMb returns 0 when undefined', () => {
      const media = buildMedia({ sizeBytes: undefined });
      expect(media.sizeInMb()).toBe(0);
    });

    it('isWithinSizeLimit true for small image', () => {
      expect(buildMedia({ sizeBytes: 100 * 1024 }).isWithinSizeLimit()).toBe(true);
    });
  });

  describe('queries', () => {
    it('isImage / isVideo', () => {
      expect(buildMedia({ type: 'image' }).isImage()).toBe(true);
      expect(buildMedia({ type: 'image' }).isVideo()).toBe(false);
      expect(buildMedia({ type: 'video' }).isVideo()).toBe(true);
    });
  });

  void ProductMediaEntity;
});
