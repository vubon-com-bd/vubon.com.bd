/**
 * Composite VOs — edge cases & missing methods
 */
import { ProductCompositeVO } from '../../../src/module/domain/value-objects/composites/product.vo.js';
import { VariantCompositeVO } from '../../../src/module/domain/value-objects/composites/variant.vo.js';
import { ReviewCompositeVO } from '../../../src/module/domain/value-objects/composites/review.vo.js';
import { CategoryCompositeVO } from '../../../src/module/domain/value-objects/composites/category.vo.js';
import { BrandCompositeVO } from '../../../src/module/domain/value-objects/composites/brand.vo.js';
import { CollectionCompositeVO } from '../../../src/module/domain/value-objects/composites/collection.vo.js';
import { InventoryCompositeVO } from '../../../src/module/domain/value-objects/composites/inventory.vo.js';
import { PricingCompositeVO } from '../../../src/module/domain/value-objects/composites/pricing.vo.js';
import { AttributeCompositeVO } from '../../../src/module/domain/value-objects/composites/attribute.vo.js';
import { MediaCompositeVO } from '../../../src/module/domain/value-objects/composites/media.vo.js';

import { ProductIdVO } from '../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { ProductNameVO } from '../../../src/module/domain/value-objects/primitives/product-name.vo.js';
import { ProductSlugVO } from '../../../src/module/domain/value-objects/primitives/product-slug.vo.js';
import { ProductSkuVO } from '../../../src/module/domain/value-objects/primitives/product-sku.vo.js';
import { ProductTypeVO } from '../../../src/module/domain/value-objects/primitives/product-type.vo.js';
import { ProductStatusVO } from '../../../src/module/domain/value-objects/primitives/product-status.vo.js';
import { ProductDescriptionVO } from '../../../src/module/domain/value-objects/primitives/product-description.vo.js';
import { CategoryIdVO } from '../../../src/module/domain/value-objects/primitives/category-id.vo.js';
import { BrandIdVO } from '../../../src/module/domain/value-objects/primitives/brand-id.vo.js';
import { VariantIdVO } from '../../../src/module/domain/value-objects/primitives/variant-id.vo.js';
import { VariantNameVO } from '../../../src/module/domain/value-objects/primitives/variant-name.vo.js';
import { VariantSkuVO } from '../../../src/module/domain/value-objects/primitives/variant-sku.vo.js';
import { ReviewIdVO } from '../../../src/module/domain/value-objects/primitives/review-id.vo.js';
import { ReviewRatingVO } from '../../../src/module/domain/value-objects/primitives/review-rating.vo.js';
import { ReviewCommentVO } from '../../../src/module/domain/value-objects/primitives/review-comment.vo.js';
import { CategoryNameVO } from '../../../src/module/domain/value-objects/primitives/category-name.vo.js';
import { CategorySlugVO } from '../../../src/module/domain/value-objects/primitives/category-slug.vo.js';
import { CategoryPathVO } from '../../../src/module/domain/value-objects/primitives/category-path.vo.js';
import { BrandNameVO } from '../../../src/module/domain/value-objects/primitives/brand-name.vo.js';
import { BrandSlugVO } from '../../../src/module/domain/value-objects/primitives/brand-slug.vo.js';
import { BrandLogoVO } from '../../../src/module/domain/value-objects/primitives/brand-logo.vo.js';
import { CollectionIdVO } from '../../../src/module/domain/value-objects/primitives/collection-id.vo.js';
import { CollectionNameVO } from '../../../src/module/domain/value-objects/primitives/collection-name.vo.js';
import { CollectionSlugVO } from '../../../src/module/domain/value-objects/primitives/collection-slug.vo.js';
import { InventoryIdVO } from '../../../src/module/domain/value-objects/primitives/inventory-id.vo.js';
import { InventoryQuantityVO } from '../../../src/module/domain/value-objects/primitives/inventory-quantity.vo.js';
import { InventoryThresholdVO } from '../../../src/module/domain/value-objects/primitives/inventory-threshold.vo.js';
import { AttributeIdVO } from '../../../src/module/domain/value-objects/primitives/attribute-id.vo.js';
import { AttributeNameVO } from '../../../src/module/domain/value-objects/primitives/attribute-name.vo.js';
import { PriceVO } from '../../../src/module/domain/value-objects/primitives/price.vo.js';
import { DiscountPercentVO } from '../../../src/module/domain/value-objects/primitives/discount-vo.js';
import { TaxRateVO } from '../../../src/module/domain/value-objects/primitives/tax-rate.vo.js';
import {
  PRODUCT_TYPE, PRODUCT_STATUS, PRICING_TYPE, VARIANT_STATUS,
  COLLECTION_TYPE, ATTRIBUTE_TYPE, INVENTORY_STATUS,
} from '@vubon/shared-constants/business/product';
import { NOW, USER_ID, PRODUCT_ID, CATEGORY_ID, BRAND_ID, DEFAULT_CURRENCY } from '../../helpers.js';

describe('Composite VOs — edge cases', () => {
  describe('ProductCompositeVO', () => {
    const props = {
      id: ProductIdVO.create(PRODUCT_ID),
      name: ProductNameVO.create('Test'),
      slug: ProductSlugVO.create('test'),
      sku: ProductSkuVO.create('T-001'),
      type: ProductTypeVO.create(PRODUCT_TYPE.PHYSICAL),
      status: ProductStatusVO.create(PRODUCT_STATUS.DRAFT),
      description: ProductDescriptionVO.create('Desc'),
      categoryId: CategoryIdVO.create(CATEGORY_ID),
      price: PriceVO.create(1000, DEFAULT_CURRENCY),
      totalStock: 5,
      variantIds: [],
      isFeatured: false,
      tags: [],
    };

    it('exposes all getters', () => {
      const vo = ProductCompositeVO.create(props);
      expect(vo.id.value).toBe(PRODUCT_ID);
      expect(vo.name.value).toBe('Test');
      expect(vo.slug.value).toBe('test');
      expect(vo.sku.value).toBe('T-001');
      expect(vo.type.value).toBe(PRODUCT_TYPE.PHYSICAL);
      expect(vo.status.value).toBe(PRODUCT_STATUS.DRAFT);
      expect(vo.description.value).toBe('Desc');
      expect(vo.categoryId.value).toBe(CATEGORY_ID);
      expect(vo.totalStock).toBe(5);
      expect(vo.isFeatured).toBe(false);
      expect(vo.tags).toEqual([]);
      expect(vo.variantIds).toEqual([]);
    });

    it('exposes optional brandId getter', () => {
      const vo = ProductCompositeVO.create({ ...props, brandId: BrandIdVO.create(BRAND_ID) });
      expect(vo.brandId?.value).toBe(BRAND_ID);
    });

    it('exposes optional compareAtPrice getter', () => {
      const vo = ProductCompositeVO.create({
        ...props,
        compareAtPrice: PriceVO.create(1500, DEFAULT_CURRENCY),
      });
      expect(vo.compareAtPrice?.amount).toBe(1500);
    });

    it('toPlainJSON includes all fields', () => {
      const vo = ProductCompositeVO.create({
        ...props,
        brandId: BrandIdVO.create(BRAND_ID),
        compareAtPrice: PriceVO.create(1500, DEFAULT_CURRENCY),
        variantIds: [VariantIdVO.create('v-1')],
        tags: ['tag1'],
      });
      const json = vo.toPlainJSON();
      expect(json.brandId).toBe(BRAND_ID);
      expect(json.compareAtPrice).toBe(1500);
      expect(json.variantCount).toBe(1);
      expect(json.tags).toEqual(['tag1']);
    });
  });

  describe('VariantCompositeVO', () => {
    const props = {
      id: VariantIdVO.create('v-1'),
      productId: ProductIdVO.create(PRODUCT_ID),
      name: VariantNameVO.create('Red / L'),
      sku: VariantSkuVO.create('V-001'),
      type: 'color',
      options: [{ name: 'Color', value: 'Red' }],
      price: PriceVO.create(1200, DEFAULT_CURRENCY),
      status: VARIANT_STATUS.ACTIVE,
      stock: 10,
    };

    it('exposes all getters', () => {
      const vo = VariantCompositeVO.create(props);
      expect(vo.id.value).toBe('v-1');
      expect(vo.productId.value).toBe(PRODUCT_ID);
      expect(vo.name.value).toBe('Red / L');
      expect(vo.sku.value).toBe('V-001');
      expect(vo.options.length).toBe(1);
      expect(vo.price.amount).toBe(1200);
      expect(vo.stock).toBe(10);
      expect(vo.status).toBe(VARIANT_STATUS.ACTIVE);
    });

    it('getProfitMargin returns 0 without cost', () => {
      const vo = VariantCompositeVO.create(props);
      expect(vo.getProfitMargin()).toBe(0);
    });

    it('toPlainJSON works', () => {
      const vo = VariantCompositeVO.create(props);
      const json = vo.toPlainJSON();
      expect(json.id).toBe('v-1');
      expect(json.stock).toBe(10);
    });

    it('isAvailable false for inactive status', () => {
      const vo = VariantCompositeVO.create({ ...props, status: VARIANT_STATUS.INACTIVE });
      expect(vo.isAvailable()).toBe(false);
    });
  });

  describe('ReviewCompositeVO', () => {
    const props = {
      id: ReviewIdVO.create('r-1'),
      productId: ProductIdVO.create(PRODUCT_ID),
      userId: USER_ID,
      rating: ReviewRatingVO.create(5),
      comment: ReviewCommentVO.create('A valid comment'),
      images: [],
      status: 'approved',
      isVerifiedPurchase: true,
      helpfulCount: 0,
      reportCount: 0,
      createdAt: NOW,
    };

    it('exposes all getters', () => {
      const vo = ReviewCompositeVO.create(props);
      expect(vo.id.value).toBe('r-1');
      expect(vo.productId.value).toBe(PRODUCT_ID);
      expect(vo.userId).toBe(USER_ID);
      expect(vo.rating.value).toBe(5);
      expect(vo.comment.value).toBe('A valid comment');
      expect(vo.status).toBe('approved');
      expect(vo.isVerifiedPurchase).toBe(true);
      expect(vo.helpfulCount).toBe(0);
    });

    it('rejects too many images', () => {
      expect(() =>
        ReviewCompositeVO.create({
          ...props,
          images: Array.from({ length: 6 }, (_, i) => `img-${i}`),
        }),
      ).toThrow();
    });

    it('rejects long title', () => {
      expect(() =>
        ReviewCompositeVO.create({ ...props, title: 'A'.repeat(151) }),
      ).toThrow();
    });

    it('rejects negative counts', () => {
      expect(() => ReviewCompositeVO.create({ ...props, helpfulCount: -1 })).toThrow();
      expect(() => ReviewCompositeVO.create({ ...props, reportCount: -1 })).toThrow();
    });

    it('isEditable returns false for PENDING outside window', () => {
      const later = new Date(new Date(NOW).getTime() + 48 * 3600 * 1000).toISOString();
      const vo = ReviewCompositeVO.create({ ...props, status: 'pending' });
      expect(vo.isEditable(later)).toBe(false);
    });
  });

  describe('CategoryCompositeVO — edges', () => {
    it('rejects negative productCount', () => {
      expect(() =>
        CategoryCompositeVO.create({
          id: CategoryIdVO.create('c-1'),
          name: CategoryNameVO.create('Electronics'),
          slug: CategorySlugVO.create('electronics'),
          path: CategoryPathVO.root(),
          status: 'active',
          sortOrder: 0,
          productCount: -1,
        }),
      ).toThrow();
    });

    it('getDepth returns path depth', () => {
      const vo = CategoryCompositeVO.create({
        id: CategoryIdVO.create('c-1'),
        name: CategoryNameVO.create('Electronics'),
        slug: CategorySlugVO.create('electronics'),
        path: CategoryPathVO.create(['p1', 'p2']),
        status: 'active',
        sortOrder: 0,
        productCount: 0,
      });
      expect(vo.getDepth()).toBe(2);
    });

    it('canHaveChildren at max depth is false', () => {
      const vo = CategoryCompositeVO.create({
        id: CategoryIdVO.create('c-1'),
        name: CategoryNameVO.create('Electronics'),
        slug: CategorySlugVO.create('electronics'),
        path: CategoryPathVO.create(['1', '2', '3', '4', '5']),
        status: 'active',
        sortOrder: 0,
        productCount: 0,
      });
      expect(vo.canHaveChildren()).toBe(false);
    });
  });

  describe('BrandCompositeVO — edges', () => {
    it('rejects too long description', () => {
      expect(() =>
        BrandCompositeVO.create({
          id: BrandIdVO.create('b-1'),
          name: BrandNameVO.create('Sony'),
          slug: BrandSlugVO.create('sony'),
          logo: BrandLogoVO.empty(),
          description: 'A'.repeat(2001),
          status: 'active',
          isFeatured: false,
          productCount: 0,
        }),
      ).toThrow();
    });

    it('hasProducts returns true when count > 0', () => {
      const vo = BrandCompositeVO.create({
        id: BrandIdVO.create('b-1'),
        name: BrandNameVO.create('Sony'),
        slug: BrandSlugVO.create('sony'),
        logo: BrandLogoVO.empty(),
        description: '',
        status: 'active',
        isFeatured: false,
        productCount: 5,
      });
      expect(vo.hasProducts()).toBe(true);
    });

    it('exposes isFeatured getter', () => {
      const vo = BrandCompositeVO.create({
        id: BrandIdVO.create('b-1'),
        name: BrandNameVO.create('Sony'),
        slug: BrandSlugVO.create('sony'),
        logo: BrandLogoVO.empty(),
        description: '',
        status: 'active',
        isFeatured: true,
        productCount: 0,
      });
      expect(vo.isFeatured).toBe(true);
    });
  });

  describe('CollectionCompositeVO — edges', () => {
    const baseProps = {
      id: CollectionIdVO.create('c-1'),
      name: CollectionNameVO.create('Sale'),
      slug: CollectionSlugVO.create('sale'),
      type: COLLECTION_TYPE.MANUAL,
      status: 'active',
      productIds: [],
      isFeatured: false,
      sortOrder: 0,
    };

    it('rejects too long description', () => {
      expect(() =>
        CollectionCompositeVO.create({ ...baseProps, description: 'A'.repeat(2001) }),
      ).toThrow();
    });

    it('hasProduct returns true when present', () => {
      const pid = ProductIdVO.create(PRODUCT_ID);
      const vo = CollectionCompositeVO.create({ ...baseProps, productIds: [pid] });
      expect(vo.hasProduct(pid)).toBe(true);
    });

    it('isActive false when status INACTIVE', () => {
      const vo = CollectionCompositeVO.create({ ...baseProps, status: 'inactive' });
      expect(vo.isActive(NOW)).toBe(false);
    });

    it('isActive false before startAt', () => {
      const vo = CollectionCompositeVO.create({
        ...baseProps,
        startAt: '2026-01-01T00:00:00Z',
      });
      expect(vo.isActive(NOW)).toBe(false);
    });

    it('isActive false after endAt', () => {
      const vo = CollectionCompositeVO.create({
        ...baseProps,
        endAt: '2020-01-01T00:00:00Z',
      });
      expect(vo.isActive(NOW)).toBe(false);
    });
  });

  describe('InventoryCompositeVO — edges', () => {
    const baseProps = {
      id: InventoryIdVO.create('i-1'),
      productId: ProductIdVO.create(PRODUCT_ID),
      sku: 'SKU-1',
      quantity: InventoryQuantityVO.create(100),
      reserved: InventoryQuantityVO.zero(),
      lowStockThreshold: InventoryThresholdVO.default(),
      trackQuantity: true,
      allowBackorder: false,
    };

    it('getStatus LOW_STOCK at threshold', () => {
      const vo = InventoryCompositeVO.create({
        ...baseProps,
        quantity: InventoryQuantityVO.create(10),
      });
      expect(vo.getStatus()).toBe(INVENTORY_STATUS.LOW_STOCK);
    });

    it('getStatus BACKORDER when allowBackorder + qty 0', () => {
      const vo = InventoryCompositeVO.create({
        ...baseProps,
        quantity: InventoryQuantityVO.zero(),
        allowBackorder: true,
      });
      expect(vo.getStatus()).toBe(INVENTORY_STATUS.BACKORDER);
    });

    it('canFulfill false when insufficient', () => {
      const vo = InventoryCompositeVO.create({
        ...baseProps,
        quantity: InventoryQuantityVO.create(5),
      });
      expect(vo.canFulfill(10)).toBe(false);
    });

    it('canFulfill true when backorder allowed', () => {
      const vo = InventoryCompositeVO.create({
        ...baseProps,
        quantity: InventoryQuantityVO.zero(),
        allowBackorder: true,
      });
      expect(vo.canFulfill(10)).toBe(true);
    });

    it('reserve throws when insufficient', () => {
      const vo = InventoryCompositeVO.create({
        ...baseProps,
        quantity: InventoryQuantityVO.create(5),
      });
      expect(() => vo.reserve(10)).toThrow();
    });

    it('reserve throws when trackQuantity false', () => {
      const vo = InventoryCompositeVO.create({ ...baseProps, trackQuantity: false });
      expect(() => vo.reserve(10)).toThrow();
    });

    it('removeStock throws when insufficient', () => {
      const vo = InventoryCompositeVO.create({
        ...baseProps,
        quantity: InventoryQuantityVO.create(5),
      });
      expect(() => vo.removeStock(10)).toThrow();
    });

    it('isLowStock / isOutOfStock / isCritical', () => {
      const vo = InventoryCompositeVO.create({
        ...baseProps,
        quantity: InventoryQuantityVO.create(2),
      });
      expect(vo.isLowStock()).toBe(true);
      expect(vo.isCritical()).toBe(true);
      expect(vo.isOutOfStock()).toBe(false);
    });
  });

  describe('PricingCompositeVO — edges', () => {
    const baseProps = {
      productId: ProductIdVO.create(PRODUCT_ID),
      type: PRICING_TYPE.FIXED,
      basePrice: PriceVO.create(1000, DEFAULT_CURRENCY),
      sellingPrice: PriceVO.create(1000, DEFAULT_CURRENCY),
      taxRate: TaxRateVO.zero(),
      taxInclusive: true,
      discountPercent: DiscountPercentVO.none(),
    };

    it('totalFor rejects 0 quantity', () => {
      const vo = PricingCompositeVO.create(baseProps);
      expect(() => vo.totalFor(0)).toThrow();
    });

    it('hasDiscount false when compareAt <= selling', () => {
      const vo = PricingCompositeVO.create({
        ...baseProps,
        compareAtPrice: PriceVO.create(1000, DEFAULT_CURRENCY),
      });
      expect(vo.hasDiscount()).toBe(false);
    });

    it('effectiveDiscountPercent 0 without discount', () => {
      const vo = PricingCompositeVO.create(baseProps);
      expect(vo.effectiveDiscountPercent()).toBe(0);
    });

    it('exposes all getters', () => {
      const vo = PricingCompositeVO.create(baseProps);
      expect(vo.type).toBe(PRICING_TYPE.FIXED);
      expect(vo.basePrice.amount).toBe(1000);
      expect(vo.taxInclusive).toBe(true);
    });
  });

  describe('AttributeCompositeVO — edges', () => {
    it('rejects invalid attribute type', () => {
      expect(() =>
        AttributeCompositeVO.create({
          id: AttributeIdVO.create('a-1'),
          name: AttributeNameVO.create('Color'),
          slug: 'color',
          type: 'invalid_type',
          isRequired: false,
          isSearchable: true,
          isFilterable: true,
        }),
      ).toThrow();
    });

    it('validateValue for TEXT type', () => {
      const vo = AttributeCompositeVO.create({
        id: AttributeIdVO.create('a-1'),
        name: AttributeNameVO.create('Description'),
        slug: 'description',
        type: ATTRIBUTE_TYPE.TEXT,
        isRequired: false,
        isSearchable: true,
        isFilterable: false,
      });
      expect(vo.validateValue({ value: 'text' } as never)).toBe(true);
      expect(vo.validateValue({ value: 123 } as never)).toBe(false);
    });

    it('validateValue for NUMBER', () => {
      const vo = AttributeCompositeVO.create({
        id: AttributeIdVO.create('a-1'),
        name: AttributeNameVO.create('Weight'),
        slug: 'weight',
        type: ATTRIBUTE_TYPE.NUMBER,
        isRequired: false,
        isSearchable: true,
        isFilterable: true,
      });
      expect(vo.validateValue({ value: 100 } as never)).toBe(true);
      expect(vo.validateValue({ value: 'text' } as never)).toBe(false);
    });

    it('validateValue for BOOLEAN', () => {
      const vo = AttributeCompositeVO.create({
        id: AttributeIdVO.create('a-1'),
        name: AttributeNameVO.create('Active'),
        slug: 'active',
        type: ATTRIBUTE_TYPE.BOOLEAN,
        isRequired: false,
        isSearchable: false,
        isFilterable: true,
      });
      expect(vo.validateValue({ value: true } as never)).toBe(true);
    });

    it('validateValue for MULTISELECT', () => {
      const vo = AttributeCompositeVO.create({
        id: AttributeIdVO.create('a-1'),
        name: AttributeNameVO.create('Tags'),
        slug: 'tags',
        type: ATTRIBUTE_TYPE.MULTISELECT,
        isRequired: false,
        isSearchable: true,
        isFilterable: true,
        options: [
          { value: 'a', label: 'A', sortOrder: 1 },
          { value: 'b', label: 'B', sortOrder: 2 },
        ],
      });
      expect(vo.validateValue({ value: ['a', 'b'] } as never)).toBe(true);
      expect(vo.validateValue({ value: ['a', 'z'] } as never)).toBe(false);
    });

    it('validateValue for DATE', () => {
      const vo = AttributeCompositeVO.create({
        id: AttributeIdVO.create('a-1'),
        name: AttributeNameVO.create('Date'),
        slug: 'date',
        type: ATTRIBUTE_TYPE.DATE,
        isRequired: false,
        isSearchable: false,
        isFilterable: true,
      });
      expect(vo.validateValue({ value: '2025-01-01' } as never)).toBe(true);
      expect(vo.validateValue({ value: 'bad-date' } as never)).toBe(false);
    });

    it('exposes isRequired getter', () => {
      const vo = AttributeCompositeVO.create({
        id: AttributeIdVO.create('a-1'),
        name: AttributeNameVO.create('Color'),
        slug: 'color',
        type: ATTRIBUTE_TYPE.TEXT,
        isRequired: true,
        isSearchable: true,
        isFilterable: true,
      });
      expect(vo.isRequired).toBe(true);
    });
  });

  describe('MediaCompositeVO — edges', () => {
    it('rejects invalid type', () => {
      expect(() =>
        MediaCompositeVO.create({
          id: 'm-1',
          type: 'audio' as never,
          url: 'https://cdn.example.com/a.mp3',
          sortOrder: 0,
        }),
      ).toThrow();
    });

    it('sizeInMb returns 0 without sizeBytes', () => {
      const vo = MediaCompositeVO.create({
        id: 'm-1',
        type: 'image',
        url: 'https://cdn.example.com/img.jpg',
        sortOrder: 0,
      });
      expect(vo.sizeInMb()).toBe(0);
    });

    it('exposes getters', () => {
      const vo = MediaCompositeVO.create({
        id: 'm-1',
        type: 'image',
        url: 'https://cdn.example.com/img.jpg',
        sortOrder: 0,
      });
      expect(vo.id).toBe('m-1');
      expect(vo.type).toBe('image');
      expect(vo.url).toBe('https://cdn.example.com/img.jpg');
      expect(vo.sortOrder).toBe(0);
    });

    it('isWithinSizeLimit true without sizeBytes', () => {
      const vo = MediaCompositeVO.create({
        id: 'm-1',
        type: 'image',
        url: 'https://cdn.example.com/img.jpg',
        sortOrder: 0,
      });
      expect(vo.isWithinSizeLimit()).toBe(true);
    });
  });
});
