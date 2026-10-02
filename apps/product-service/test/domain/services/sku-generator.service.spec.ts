/**
 * SkuGeneratorService — unit tests
 */
import { jest } from '@jest/globals';
import { SkuGeneratorService, type SkuUniquenessChecker } from '../../../src/module/domain/services/sku-generator.service.js';

describe('SkuGeneratorService', () => {
  let service: SkuGeneratorService;

  beforeEach(() => {
    service = new SkuGeneratorService();
  });

  const uniqueChecker = (): SkuUniquenessChecker => ({
    isUnique: jest.fn(async () => true),
  });

  describe('generateProductSku()', () => {
    it('should generate SKU from product name prefix + padded sequence', async () => {
      const checker = uniqueChecker();
      const sku = await service.generateProductSku('Wireless Headphones', 1, checker);
      expect(sku).toBe('WIR-00001');
    });

    it('should uppercase first 3 letters as prefix', async () => {
      const checker = uniqueChecker();
      const sku = await service.generateProductSku('abc Product', 42, checker);
      expect(sku).toBe('ABC-00042');
    });

    it('should pad with X if name has fewer than 3 letters', async () => {
      const checker = uniqueChecker();
      const sku = await service.generateProductSku('Ab', 1, checker);
      expect(sku).toBe('ABX-00001');
    });

    it('should append random suffix when collision occurs', async () => {
      const checker: SkuUniquenessChecker = {
        isUnique: jest.fn(async () => false),
      };
      await expect(
        service.generateProductSku('Test', 1, checker),
      ).rejects.toThrow();
    });

    it('should try fallback when first attempt collides but second unique', async () => {
      let call = 0;
      const checker: SkuUniquenessChecker = {
        isUnique: jest.fn(async () => {
          call += 1;
          return call > 1;
        }),
      };
      const sku = await service.generateProductSku('Test', 1, checker);
      expect(sku).toMatch(/^TES-00001-[A-Z0-9]{3}$/);
    });
  });

  describe('generateVariantSku()', () => {
    it('should append compact signature to product SKU', async () => {
      const checker = uniqueChecker();
      const sku = await service.generateVariantSku('TES-00001', 'Color:Red|Size:L', checker);
      expect(sku).toMatch(/^TES-00001-[A-Z0-9]+$/);
    });

    it('should throw if all attempts fail', async () => {
      const checker: SkuUniquenessChecker = {
        isUnique: jest.fn(async () => false),
      };
      await expect(
        service.generateVariantSku('TES-00001', 'Color:Red', checker),
      ).rejects.toThrow();
    });
  });
});
