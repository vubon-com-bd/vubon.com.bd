/**
 * ProductVariantService — Unit Tests (mocked repo)
 */
import { describe, it, expect, jest } from '@jest/globals';
import { ProductVariantService } from '../../../../src/module/application/services/impl/product-variant.service.js';
import { ProductVariantEntity } from '../../../../src/module/domain/entities/product-variant.entity.js';
import { ProductVariantVO } from '../../../../src/module/domain/value-objects/composites/product-variant.vo.js';
import { VariantIdVO } from '../../../../src/module/domain/value-objects/primitives/variant-id.vo.js';
import { ProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { VariantNameVO } from '../../../../src/module/domain/value-objects/primitives/variant-name.vo.js';
import { VariantSkuVO } from '../../../../src/module/domain/value-objects/primitives/variant-sku.vo.js';
import { PriceAmountVO } from '../../../../src/module/domain/value-objects/primitives/price-amount.vo.js';
import { PriceCurrencyVO } from '../../../../src/module/domain/value-objects/primitives/price-currency.vo.js';
import { InventoryQuantityVO } from '../../../../src/module/domain/value-objects/primitives/inventory-quantity.vo.js';

const VALID_VARIANT_ID = '33333333-3333-4333-8333-333333333333';
const VALID_PRODUCT_ID = '11111111-1111-4111-8111-111111111111';
const NOW = '2026-01-01T00:00:00.000Z';

function buildRealEntity() {
  const vo = ProductVariantVO.reconstitute({
    id: VariantIdVO.reconstitute(VALID_VARIANT_ID),
    productId: ProductIdVO.reconstitute(VALID_PRODUCT_ID),
    name: VariantNameVO.reconstitute('Test Variant'),
    sku: VariantSkuVO.reconstitute('TEST-VAR-001'),
    options: [{ name: 'size', value: 'M' }],
    price: PriceAmountVO.reconstitute(1000),
    currency: PriceCurrencyVO.reconstitute('BDT'),
    stock: InventoryQuantityVO.reconstitute(10),
    isActive: true,
  });

  return ProductVariantEntity.reconstitute({
    id: VALID_VARIANT_ID,
    createdAt: NOW,
    updatedAt: NOW,
    vo,
  });
}

describe('ProductVariantService (mocked)', () => {
  function buildService(overrides: {
    repo?: Record<string, unknown>;
    productRepo?: Record<string, unknown>;
    eventBridge?: Record<string, unknown>;
  } = {}) {
    const repo = {
      findByIdVO: jest.fn(),
      findAll: jest.fn().mockResolvedValue([] as never),
      save: jest.fn(async (e: unknown) => e),
      delete: jest.fn(),
      exists: jest.fn().mockResolvedValue(false),
      existsBySku: jest.fn().mockResolvedValue(false),
      findBySku: jest.fn(),
      findByProduct: jest.fn().mockResolvedValue([] as never),
      findActiveByProduct: jest.fn().mockResolvedValue([] as never),
      findPaginated: jest.fn(),
      getStats: jest.fn(),
      countByProduct: jest.fn(),
      saveMany: jest.fn(),
      deleteByProduct: jest.fn(),
      findLowStock: jest.fn(),
      softDelete: jest.fn(),
      ...(overrides.repo ?? {}),
    };

    const productRepo = {
      findByIdVO: jest.fn().mockResolvedValue({
        id: VALID_PRODUCT_ID,
        vo: { vendorId: undefined },
      } as never),
      ...(overrides.productRepo ?? {}),
    };

    const eventBridge = {
      publishFromEntity: jest.fn().mockResolvedValue(undefined as never),
      publish: jest.fn(),
      publishBatch: jest.fn(),
      publishInProcess: jest.fn(),
      ...(overrides.eventBridge ?? {}),
    };

    return {
      service: new ProductVariantService(
        repo as never,
        productRepo as never,
        eventBridge as never,
      ),
      repo,
      productRepo,
      eventBridge,
    };
  }

  describe('getById()', () => {
    it('returns mapped DTO when entity found', async () => {
      const entity = buildRealEntity();
      const { service } = buildService({
        repo: { findByIdVO: jest.fn().mockResolvedValue(entity as never) },
      });
      const result = await service.getById(VALID_VARIANT_ID);
      expect(result.id).toBe(VALID_VARIANT_ID);
      expect(result.productId).toBe(VALID_PRODUCT_ID);
      expect(result.name).toBe('Test Variant');
      expect(result.sku).toBe('TEST-VAR-001');
      expect(result.price).toBe(1000);
      expect(result.currency).toBe('BDT');
    });

    it('throws when not found', async () => {
      const { service } = buildService({
        repo: { findByIdVO: jest.fn().mockResolvedValue(null as never) },
      });
      await expect(service.getById(VALID_VARIANT_ID)).rejects.toThrow();
    });
  });

  describe('add()', () => {
    it('throws on duplicate SKU', async () => {
      const { service } = buildService({
        repo: { existsBySku: jest.fn().mockResolvedValue(true as never) },
      });
      await expect(
        service.add(
          {
            productId: VALID_PRODUCT_ID,
            name: 'V',
            sku: 'DUP-SKU',
            type: 'size',
            options: [{ name: 'size', value: 'M' }],
            price: 100,
          } as never,
        ),
      ).rejects.toThrow();
    });
  });
});
