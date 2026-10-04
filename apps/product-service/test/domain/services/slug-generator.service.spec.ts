/**
 * SlugGeneratorService — unit tests
 */
import { jest } from '@jest/globals';
import { SlugGeneratorService, type SlugUniquenessChecker } from '../../../src/module/domain/services/slug-generator.service.js';

describe('SlugGeneratorService', () => {
  let service: SlugGeneratorService;

  beforeEach(() => {
    service = new SlugGeneratorService();
  });

  describe('toSlug()', () => {
    it('should convert simple text to slug', () => {
      expect(service.toSlug('Wireless Headphones')).toBe('wireless-headphones');
    });

    it('should remove accents', () => {
      expect(service.toSlug('Café Resto')).toBe('cafe-resto');
    });

    it('should remove special characters', () => {
      expect(service.toSlug('Hello! World?')).toBe('hello-world');
    });

    it('should collapse multiple spaces and dashes', () => {
      expect(service.toSlug('A   B --- C')).toBe('a-b-c');
    });

    it('should trim leading and trailing dashes', () => {
      expect(service.toSlug('--- text ---')).toBe('text');
    });

    it('should return empty string for non-alphanumeric input', () => {
      expect(service.toSlug('!!!')).toBe('');
    });
  });

  describe('generateUniqueSlug()', () => {
    it('should return base slug if unique', async () => {
      const checker: SlugUniquenessChecker = { isUnique: jest.fn(async () => true) };
      const slug = await service.generateUniqueSlug('New Product', checker);
      expect(slug).toBe('new-product');
    });

    it('should append -1 if base exists', async () => {
      let call = 0;
      const checker: SlugUniquenessChecker = {
        isUnique: jest.fn(async () => {
          call += 1;
          return call > 1;
        }),
      };
      const slug = await service.generateUniqueSlug('Test Product', checker);
      expect(slug).toBe('test-product-1');
    });

    it('should throw on empty input', async () => {
      const checker: SlugUniquenessChecker = { isUnique: jest.fn(async () => true) };
      await expect(service.generateUniqueSlug('!!!', checker)).rejects.toThrow();
    });

    it('should throw after maxAttempts exhaustion', async () => {
      const checker: SlugUniquenessChecker = { isUnique: jest.fn(async () => false) };
      await expect(
        service.generateUniqueSlug('Test', checker, 3),
      ).rejects.toThrow(/after 3 attempts/);
    });
  });
});
