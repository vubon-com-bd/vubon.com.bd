/**
 * Product Guards — unit tests
 */
import { jest } from '@jest/globals';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { OwnProductGuard } from '../../../src/module/interfaces/guards/own-product.guard.js';
import { VendorProductGuard } from '../../../src/module/interfaces/guards/vendor-product.guard.js';
import { ProductPublishedGuard } from '../../../src/module/interfaces/guards/product-published.guard.js';
import { createMockProductRepository, type MockedProductRepository } from '../../mocks/repositories.js';
import { buildProduct } from '../../fixtures.js';
import { PRODUCT_ID, USER_ID } from '../../helpers.js';

function mockContext(params: Record<string, string>, user?: { userId?: string; role?: string; vendorId?: string }): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ params, user }),
    }),
  } as unknown as ExecutionContext;
}

describe('Product Guards', () => {
  let productRepo: MockedProductRepository;

  beforeEach(() => {
    productRepo = createMockProductRepository();
  });

  describe('OwnProductGuard', () => {
    it('should allow when no productId param', async () => {
      const guard = new OwnProductGuard(productRepo);
      expect(await guard.canActivate(mockContext({}, { userId: USER_ID }))).toBe(true);
    });

    it('should allow admin bypass', async () => {
      const guard = new OwnProductGuard(productRepo);
      expect(
        await guard.canActivate(mockContext({ productId: PRODUCT_ID }, { userId: 'x', role: 'admin' })),
      ).toBe(true);
    });

    it('should reject without authentication', async () => {
      const guard = new OwnProductGuard(productRepo);
      await expect(guard.canActivate(mockContext({ productId: PRODUCT_ID }))).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should reject when product not found', async () => {
      productRepo.findById.mockResolvedValueOnce(null);
      const guard = new OwnProductGuard(productRepo);
      await expect(
        guard.canActivate(mockContext({ productId: PRODUCT_ID }, { userId: USER_ID })),
      ).rejects.toThrow(/not found/);
    });

    it('should reject when not owner', async () => {
      productRepo.findById.mockResolvedValueOnce(buildProduct({ vendorId: 'other-vendor' }));
      const guard = new OwnProductGuard(productRepo);
      await expect(
        guard.canActivate(mockContext({ productId: PRODUCT_ID }, { userId: USER_ID })),
      ).rejects.toThrow(/do not own/);
    });

    it('should allow when owner', async () => {
      productRepo.findById.mockResolvedValueOnce(buildProduct({ vendorId: USER_ID }));
      const guard = new OwnProductGuard(productRepo);
      expect(
        await guard.canActivate(mockContext({ productId: PRODUCT_ID }, { userId: USER_ID })),
      ).toBe(true);
    });
  });

  describe('VendorProductGuard', () => {
    it('should allow admin bypass', async () => {
      const guard = new VendorProductGuard(productRepo);
      expect(
        await guard.canActivate(mockContext({ productId: PRODUCT_ID }, { userId: 'x', role: 'admin' })),
      ).toBe(true);
    });

    it('should reject without user', async () => {
      const guard = new VendorProductGuard(productRepo);
      await expect(guard.canActivate(mockContext({ productId: PRODUCT_ID }))).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should reject when vendorId missing', async () => {
      productRepo.findById.mockResolvedValueOnce(buildProduct({ vendorId: 'v-1' }));
      const guard = new VendorProductGuard(productRepo);
      await expect(
        guard.canActivate(mockContext({ productId: PRODUCT_ID }, { userId: USER_ID })),
      ).rejects.toThrow(/does not belong/);
    });

    it('should allow when vendor matches', async () => {
      productRepo.findById.mockResolvedValueOnce(buildProduct({ vendorId: 'v-1' }));
      const guard = new VendorProductGuard(productRepo);
      expect(
        await guard.canActivate(
          mockContext({ productId: PRODUCT_ID }, { userId: USER_ID, vendorId: 'v-1' }),
        ),
      ).toBe(true);
    });
  });

  describe('ProductPublishedGuard', () => {
    it('should allow admin bypass', async () => {
      const guard = new ProductPublishedGuard(productRepo);
      expect(
        await guard.canActivate(mockContext({ productId: PRODUCT_ID }, { role: 'admin' })),
      ).toBe(true);
    });

    it('should allow vendor bypass', async () => {
      const guard = new ProductPublishedGuard(productRepo);
      expect(
        await guard.canActivate(mockContext({ productId: PRODUCT_ID }, { role: 'vendor' })),
      ).toBe(true);
    });

    it('should allow when no productId', async () => {
      const guard = new ProductPublishedGuard(productRepo);
      expect(await guard.canActivate(mockContext({}))).toBe(true);
    });

    it('should reject unpublished for non-admin', async () => {
      productRepo.findById.mockResolvedValueOnce(buildProduct({ isPublished: false }));
      const guard = new ProductPublishedGuard(productRepo);
      await expect(
        guard.canActivate(mockContext({ productId: PRODUCT_ID })),
      ).rejects.toThrow(/not published/);
    });

    it('should allow published product', async () => {
      const product = buildProduct();
      product.publish(USER_ID, new Date().toISOString());
      productRepo.findById.mockResolvedValueOnce(product);
      const guard = new ProductPublishedGuard(productRepo);
      expect(await guard.canActivate(mockContext({ productId: PRODUCT_ID }))).toBe(true);
    });

    it('should reject when product missing', async () => {
      productRepo.findById.mockResolvedValueOnce(null);
      const guard = new ProductPublishedGuard(productRepo);
      await expect(
        guard.canActivate(mockContext({ productId: PRODUCT_ID })),
      ).rejects.toThrow(/not published/);
    });
  });
});
