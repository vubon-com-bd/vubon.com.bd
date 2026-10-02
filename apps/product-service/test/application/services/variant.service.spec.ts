/**
 * VariantService — unit tests
 */
import { jest } from '@jest/globals';
import { VariantService } from '../../../src/module/application/services/impl/variant.service.js';
import { VariantNotFoundApplicationError, VariantSkuConflictError } from '../../../src/module/application/errors/variant.errors.js';
import { ProductNotFoundApplicationError } from '../../../src/module/application/errors/product.errors.js';
import {
  createMockVariantRepository,
  createMockProductRepository,
  type MockedVariantRepository,
  type MockedProductRepository,
} from '../../mocks/repositories.js';
import { buildVariant, buildProduct } from '../../fixtures.js';
import { USER_ID, PRODUCT_ID, VARIANT_ID, DEFAULT_CURRENCY } from '../../helpers.js';

describe('VariantService', () => {
  let service: VariantService;
  let variantRepo: MockedVariantRepository;
  let productRepo: MockedProductRepository;

  beforeEach(() => {
    variantRepo = createMockVariantRepository();
    productRepo = createMockProductRepository();
    variantRepo.save.mockImplementation(async (e) => e);
    variantRepo.existsBySku.mockResolvedValue(false);
    productRepo.save.mockImplementation(async (e) => e);
    service = new VariantService(variantRepo, productRepo);
  });

  describe('add()', () => {
    it('should add variant to product', async () => {
      const product = buildProduct();
      productRepo.findById.mockResolvedValueOnce(product);

      const result = await service.add({
        productId: PRODUCT_ID,
        name: 'Red / L',
        sku: 'NEW-RED-L',
        type: 'color',
        options: [{ name: 'Color', value: 'Red' }],
        price: 1500,
      } as never, USER_ID);

      expect(result.sku).toBe('NEW-RED-L');
      expect(variantRepo.save).toHaveBeenCalled();
      expect(productRepo.save).toHaveBeenCalled();
    });

    it('should reject when product not found', async () => {
      productRepo.findById.mockResolvedValueOnce(null);
      await expect(
        service.add({
          productId: 'missing-product-id-111',
          name: 'X',
          sku: 'X-1',
          type: 'color',
          options: [{ name: 'Color', value: 'Red' }],
          price: 100,
        } as never, USER_ID),
      ).rejects.toThrow(ProductNotFoundApplicationError);
    });

    it('should reject duplicate SKU', async () => {
      productRepo.findById.mockResolvedValueOnce(buildProduct());
      variantRepo.existsBySku.mockResolvedValueOnce(true);

      await expect(
        service.add({
          productId: PRODUCT_ID,
          name: 'X',
          sku: 'DUP-1',
          type: 'color',
          options: [{ name: 'Color', value: 'Red' }],
          price: 100,
        } as never, USER_ID),
      ).rejects.toThrow(VariantSkuConflictError);
    });
  });

  describe('update()', () => {
    it('should update variant', async () => {
      const variant = buildVariant();
      variantRepo.findById.mockResolvedValueOnce(variant);

      const result = await service.update({
        variantId: VARIANT_ID,
        price: 1500,
      });

      expect(result.price).toBe(1500);
    });

    it('should throw VariantNotFound for missing', async () => {
      variantRepo.findById.mockResolvedValueOnce(null);
      await expect(
        service.update({ variantId: 'missing' }),
      ).rejects.toThrow(VariantNotFoundApplicationError);
    });

    it('should update weight/image', async () => {
      const variant = buildVariant();
      variantRepo.findById.mockResolvedValueOnce(variant);

      const result = await service.update({
        variantId: VARIANT_ID,
        weight: 0.5,
        imageUrl: 'https://cdn.example.com/v.jpg',
      });
      expect(result.weight).toBe(0.5);
    });
  });

  describe('remove()', () => {
    it('should delete variant and update product', async () => {
      const variant = buildVariant();
      variantRepo.findById.mockResolvedValueOnce(variant);
      productRepo.findById.mockResolvedValueOnce(buildProduct());

      await service.remove(VARIANT_ID, USER_ID);

      expect(variantRepo.delete).toHaveBeenCalledWith(VARIANT_ID);
      expect(productRepo.save).toHaveBeenCalled();
    });

    it('should throw for missing variant', async () => {
      variantRepo.findById.mockResolvedValueOnce(null);
      await expect(service.remove('missing', USER_ID)).rejects.toThrow(VariantNotFoundApplicationError);
    });
  });

  describe('listByProduct()', () => {
    it('should return mapped list', async () => {
      variantRepo.findByProductId.mockResolvedValueOnce([buildVariant()]);
      const result = await service.listByProduct(PRODUCT_ID);
      expect(result.length).toBe(1);
    });
  });

  describe('regenerateMatrix()', () => {
    it('should return variants list', async () => {
      variantRepo.findByProductId.mockResolvedValueOnce([buildVariant()]);
      const result = await service.regenerateMatrix(PRODUCT_ID, USER_ID);
      expect(result.length).toBe(1);
    });
  });

  void DEFAULT_CURRENCY;
});
