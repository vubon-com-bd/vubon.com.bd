/**
 * Interface Mappers — App DTO → HTTP DTO
 */
import { ProductControllerMapper } from '../../../src/module/interfaces/mappers/product.controller.mapper.js';
import { VariantControllerMapper } from '../../../src/module/interfaces/mappers/variant.controller.mapper.js';
import { InventoryControllerMapper } from '../../../src/module/interfaces/mappers/inventory.controller.mapper.js';
import { PricingControllerMapper } from '../../../src/module/interfaces/mappers/pricing.controller.mapper.js';
import { ReviewControllerMapper } from '../../../src/module/interfaces/mappers/review.controller.mapper.js';

import type { ProductResponseDTO as AppProductResponse } from '../../../src/module/application/dtos/responses/product-response.dto.js';
import type { ProductPublicResponseDTO as AppProductPublic } from '../../../src/module/application/dtos/responses/product-public-response.dto.js';
import type { VariantResponseDTO as AppVariantResponse } from '../../../src/module/application/dtos/responses/variant-response.dto.js';
import type { InventoryResponseDTO as AppInventoryResponse } from '../../../src/module/application/dtos/responses/inventory-response.dto.js';
import type { PricingResponseDTO as AppPricingResponse } from '../../../src/module/application/dtos/responses/pricing-response.dto.js';
import type { ReviewResponseDTO as AppReviewResponse } from '../../../src/module/application/dtos/responses/review-response.dto.js';

import { mockProductResponse, mockVariantResponse, mockInventoryResponse, mockPricingResponse, mockReviewResponse } from '../../mocks/responses.js';
import { PRODUCT_ID, VARIANT_ID, NOW } from '../../helpers.js';

describe('Interface Mappers', () => {
  describe('ProductControllerMapper', () => {
    it('toHttp transforms full response', () => {
      const input = mockProductResponse() as unknown as AppProductResponse;
      const out = ProductControllerMapper.toHttp(input);
      expect(out.id).toBe(PRODUCT_ID);
      expect(out.name).toBe('Test Product');
      expect(out.price).toBe(1000);
    });

    it('toPublicHttp transforms public response', () => {
      const base = mockProductResponse();
      const input = base as unknown as AppProductPublic;
      const out = ProductControllerMapper.toPublicHttp(input);
      expect(out.id).toBe(PRODUCT_ID);
    });

    it('toHttpList maps each item', () => {
      const input = mockProductResponse() as unknown as AppProductResponse;
      expect(ProductControllerMapper.toHttpList([input]).length).toBe(1);
    });

    it('toPublicHttpList maps each item', () => {
      const input = mockProductResponse() as unknown as AppProductPublic;
      expect(ProductControllerMapper.toPublicHttpList([input]).length).toBe(1);
    });
  });

  describe('VariantControllerMapper', () => {
    it('toHttp transforms variant', () => {
      const input = mockVariantResponse() as unknown as AppVariantResponse;
      const out = VariantControllerMapper.toHttp(input);
      expect(out.id).toBe(VARIANT_ID);
      expect(out.sku).toBe('TEST-RED-L');
    });

    it('toHttpList maps each', () => {
      const input = mockVariantResponse() as unknown as AppVariantResponse;
      expect(VariantControllerMapper.toHttpList([input]).length).toBe(1);
    });
  });

  describe('InventoryControllerMapper', () => {
    it('toHttp transforms inventory', () => {
      const input = mockInventoryResponse() as unknown as AppInventoryResponse;
      const out = InventoryControllerMapper.toHttp(input);
      expect(out.quantity).toBe(100);
      expect(out.available).toBe(100);
    });

    it('toHttpList maps each', () => {
      const input = mockInventoryResponse() as unknown as AppInventoryResponse;
      expect(InventoryControllerMapper.toHttpList([input]).length).toBe(1);
    });
  });

  describe('PricingControllerMapper', () => {
    it('toHttp transforms pricing', () => {
      const input = mockPricingResponse() as unknown as AppPricingResponse;
      const out = PricingControllerMapper.toHttp(input);
      expect(out.basePrice).toBe(1000);
      expect(out.sellingPrice).toBe(900);
    });
  });

  describe('ReviewControllerMapper', () => {
    it('toHttp transforms review', () => {
      const input = mockReviewResponse() as unknown as AppReviewResponse;
      const out = ReviewControllerMapper.toHttp(input);
      expect(out.rating).toBe(5);
      expect(out.status).toBe('pending');
    });

    it('toHttpList maps each', () => {
      const input = mockReviewResponse() as unknown as AppReviewResponse;
      expect(ReviewControllerMapper.toHttpList([input]).length).toBe(1);
    });

    void NOW;
  });
});
