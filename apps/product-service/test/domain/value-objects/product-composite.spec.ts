/**
 * ProductCompositeVO + ProductAggregateVO — comprehensive tests
 */
import { ProductCompositeVO } from '../../../src/module/domain/value-objects/composites/product.vo.js';
import { ProductAggregateVO } from '../../../src/module/domain/value-objects/composites/product-aggregate.vo.js';
import { VariantCompositeVO } from '../../../src/module/domain/value-objects/composites/variant.vo.js';
import { InventoryCompositeVO } from '../../../src/module/domain/value-objects/composites/inventory.vo.js';
import { PricingCompositeVO } from '../../../src/module/domain/value-objects/composites/pricing.vo.js';
import { MediaCompositeVO } from '../../../src/module/domain/value-objects/composites/media.vo.js';
import { CategoryCompositeVO } from '../../../src/module/domain/value-objects/composites/category.vo.js';
import { BrandCompositeVO } from '../../../src/module/domain/value-objects/composites/brand.vo.js';

import { ProductIdVO } from '../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { ProductNameVO } from '../../../src/module/domain/value-objects/primitives/product-name.vo.js';
import { ProductSlugVO } from '../../../src/module/domain/value-objects/primitives/product-slug.vo.js';
import { ProductSkuVO } from '../../../src/module/domain/value-objects/primitives/product-sku.vo.js';
import { ProductTypeVO } from '../../../src/module/domain/value-objects/primitives/product-type.vo.js';
import { ProductStatusVO } from '../../../src/module/domain/value-objects/primitives/product-status.vo.js';
import { ProductDescriptionVO } from '../../../src/module/domain/value-objects/primitives/product-description.vo.js';
import { CategoryIdVO } from '../../../src/module/domain/value-objects/primitives/category-id.vo.js';
import { BrandIdVO } from '../../../src/module/domain/value-objects/primitives/brand-id.vo.js';
import { CategoryNameVO } from '../../../src/module/domain/value-objects/primitives/category-name.vo.js';
import { CategorySlugVO } from '../../../src/module/domain/value-objects/primitives/category-slug.vo.js';
import { CategoryPathVO } from '../../../src/module/domain/value-objects/primitives/category-path.vo.js';
import { BrandNameVO } from '../../../src/module/domain/value-objects/primitives/brand-name.vo.js';
import { BrandSlugVO } from '../../../src/module/domain/value-objects/primitives/brand-slug.vo.js';
import { BrandLogoVO } from '../../../src/module/domain/value-objects/primitives/brand-logo.vo.js';
import { VariantIdVO } from '../../../src/module/domain/value-objects/primitives/variant-id.vo.js';
import { VariantNameVO } from '../../../src/module/domain/value-objects/primitives/variant-name.vo.js';
import { VariantSkuVO } from '../../../src/module/domain/value-objects/primitives/variant-sku.vo.js';
import { InventoryIdVO } from '../../../src/module/domain/value-objects/primitives/inventory-id.vo.js';
import { InventoryQuantityVO } from '../../../src/module/domain/value-objects/primitives/inventory-quantity.vo.js';
import { InventoryThresholdVO } from '../../../src/module/domain/value-objects/primitives/inventory-threshold.vo.js';
import { PriceVO } from '../../../src/module/domain/value-objects/primitives/price.vo.js';
import { DiscountPercentVO } from '../../../src/module/domain/value-objects/primitives/discount-vo.js';
import { TaxRateVO } from '../../../src/module/domain/value-objects/primitives/tax-rate.vo.js';
import {
  PRODUCT_TYPE,
  PRODUCT_STATUS,
  PRICING_TYPE,
  VARIANT_STATUS,
} from '@vubon/shared-constants/business/product';
import { NOW, PRODUCT_ID, CATEGORY_ID, BRAND_ID, DEFAULT_CURRENCY } from '../../helpers.js';

function buildProductComposite(overrides: {
  type?: string;
  status?: string;
  price?: number;
  compareAt?: number;
  totalStock?: number;
  descriptionEmpty?: boolean;
} = {}): ProductCompositeVO {
  return ProductCompositeVO.reconstitute({
    id: ProductIdVO.create(PRODUCT_ID),
    name: ProductNameVO.create('Test Product'),
    slug: ProductSlugVO.create('test-product'),
    sku: ProductSkuVO.create('TEST-001'),
    type: ProductTypeVO.create(overrides.type ?? PRODUCT_TYPE.PHYSICAL),
    status: ProductStatusVO.create(overrides.status ?? PRODUCT_STATUS.DRAFT),
    description: overrides.descriptionEmpty
      ? ProductDescriptionVO.empty()
      : ProductDescriptionVO.create('A valid description'),
    categoryId: CategoryIdVO.create(CATEGORY_ID),
    brandId: BrandIdVO.create(BRAND_ID),
    price: PriceVO.create(overrides.price ?? 1000, DEFAULT_CURRENCY),
    compareAtPrice: overrides.compareAt
      ? PriceVO.create(overrides.compareAt, DEFAULT_CURRENCY)
      : undefined,
    totalStock: overrides.totalStock ?? 10,
    variantIds: [],
    isFeatured: false,
    tags: [],
  });
}

describe('ProductCompositeVO', () => {
  describe('create / reconstitute', () => {
    it('creates with valid props', () => {
      const vo = buildProductComposite();
      expect(vo.name.value).toBe('Test Product');
      expect(vo.isInStock()).toBe(true);
    });

    it('rejects too many tags (>50)', () => {
      expect(() =>
        ProductCompositeVO.create({
          id: ProductIdVO.create(PRODUCT_ID),
          name: ProductNameVO.create('Test'),
          slug: ProductSlugVO.create('test'),
          sku: ProductSkuVO.create('T-001'),
          type: ProductTypeVO.create(PRODUCT_TYPE.PHYSICAL),
          status: ProductStatusVO.create(PRODUCT_STATUS.DRAFT),
          description: ProductDescriptionVO.create('Desc'),
          categoryId: CategoryIdVO.create(CATEGORY_ID),
          price: PriceVO.create(100),
          totalStock: 0,
          variantIds: [],
          isFeatured: false,
          tags: Array.from({ length: 51 }, (_, i) => `t-${i}`),
        }),
      ).toThrow();
    });

    it('rejects negative totalStock', () => {
      expect(() =>
        ProductCompositeVO.create({
          id: ProductIdVO.create(PRODUCT_ID),
          name: ProductNameVO.create('Test'),
          slug: ProductSlugVO.create('test'),
          sku: ProductSkuVO.create('T-001'),
          type: ProductTypeVO.create(PRODUCT_TYPE.PHYSICAL),
          status: ProductStatusVO.create(PRODUCT_STATUS.DRAFT),
          description: ProductDescriptionVO.create('Desc'),
          categoryId: CategoryIdVO.create(CATEGORY_ID),
          price: PriceVO.create(100),
          totalStock: -1,
          variantIds: [],
          isFeatured: false,
          tags: [],
        }),
      ).toThrow();
    });
  });

  describe('canBePublished', () => {
    it('allows well-formed physical product', () => {
      expect(buildProductComposite().canBePublished().allowed).toBe(true);
    });

    it('rejects already published', () => {
      const vo = buildProductComposite({ status: PRODUCT_STATUS.PUBLISHED });
      const result = vo.canBePublished();
      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('already published');
    });

    it('rejects physical with no stock', () => {
      const vo = buildProductComposite({ totalStock: 0 });
      expect(vo.canBePublished().reason).toContain('stock');
    });

    it('rejects zero price', () => {
      const vo = buildProductComposite({ price: 0 });
      expect(vo.canBePublished().reason).toContain('price');
    });

    it('rejects empty description', () => {
      const vo = buildProductComposite({ descriptionEmpty: true });
      expect(vo.canBePublished().reason).toContain('description');
    });

    it('allows digital product with no stock', () => {
      const vo = buildProductComposite({ type: PRODUCT_TYPE.DIGITAL, totalStock: 0 });
      expect(vo.canBePublished().allowed).toBe(true);
    });
  });

  describe('canBeArchived', () => {
    it('true for draft', () => {
      expect(buildProductComposite().canBeArchived()).toBe(true);
    });

    it('false for archived', () => {
      const vo = buildProductComposite({ status: PRODUCT_STATUS.ARCHIVED });
      expect(vo.canBeArchived()).toBe(false);
    });
  });

  describe('getDiscountPercent', () => {
    it('0 without compareAtPrice', () => {
      expect(buildProductComposite().getDiscountPercent()).toBe(0);
    });

    it('calculates 20% discount', () => {
      const vo = buildProductComposite({ price: 800, compareAt: 1000 });
      expect(vo.getDiscountPercent()).toBe(20);
    });

    it('0 when compareAt < price', () => {
      const vo = buildProductComposite({ price: 1000, compareAt: 800 });
      expect(vo.getDiscountPercent()).toBe(0);
    });
  });

  describe('isInStock / requiresShipping / getEffectivePrice', () => {
    it('isInStock true with stock', () => {
      expect(buildProductComposite({ totalStock: 5 }).isInStock()).toBe(true);
    });

    it('isInStock false without stock', () => {
      expect(buildProductComposite({ totalStock: 0 }).isInStock()).toBe(false);
    });

    it('requiresShipping true for PHYSICAL', () => {
      expect(buildProductComposite({ type: PRODUCT_TYPE.PHYSICAL }).requiresShipping()).toBe(true);
    });

    it('requiresShipping false for DIGITAL', () => {
      expect(buildProductComposite({ type: PRODUCT_TYPE.DIGITAL }).requiresShipping()).toBe(false);
    });

    it('getEffectivePrice returns selling price', () => {
      expect(buildProductComposite({ price: 1234 }).getEffectivePrice()).toBe(1234);
    });
  });

  describe('toJSON', () => {
    it('returns plain object snapshot', () => {
      const json = buildProductComposite().toPlainJSON();
      expect(json.id).toBe(PRODUCT_ID);
      expect(json.name).toBe('Test Product');
      expect(json.price).toBe(1000);
    });
  });
});

describe('ProductAggregateVO', () => {
  function buildVariant(id: string, stock: number, price: number): VariantCompositeVO {
    return VariantCompositeVO.reconstitute({
      id: VariantIdVO.create(id),
      productId: ProductIdVO.create(PRODUCT_ID),
      name: VariantNameVO.create('Red / L'),
      sku: VariantSkuVO.create(`SKU-${id.slice(-3)}`),
      type: 'color',
      options: [{ name: 'Color', value: 'Red' }],
      price: PriceVO.create(price, DEFAULT_CURRENCY),
      status: VARIANT_STATUS.ACTIVE,
      stock,
    });
  }

  function buildInventory(id: string, qty: number): InventoryCompositeVO {
    return InventoryCompositeVO.create({
      id: InventoryIdVO.create(id),
      productId: ProductIdVO.create(PRODUCT_ID),
      sku: `SKU-${id.slice(-3)}`,
      quantity: InventoryQuantityVO.create(qty),
      reserved: InventoryQuantityVO.zero(),
      lowStockThreshold: InventoryThresholdVO.default(),
      trackQuantity: true,
      allowBackorder: false,
    });
  }

  function buildPricing(): PricingCompositeVO {
    return PricingCompositeVO.create({
      productId: ProductIdVO.create(PRODUCT_ID),
      type: PRICING_TYPE.FIXED,
      basePrice: PriceVO.create(1000, DEFAULT_CURRENCY),
      sellingPrice: PriceVO.create(1000, DEFAULT_CURRENCY),
      taxRate: TaxRateVO.zero(),
      taxInclusive: true,
      discountPercent: DiscountPercentVO.none(),
    });
  }

  function buildMedia(id: string, type: 'image' | 'video', sortOrder: number): MediaCompositeVO {
    return MediaCompositeVO.create({
      id,
      type,
      url: `https://cdn.example.com/${id}.jpg`,
      sortOrder,
    });
  }

  function buildCategory(): CategoryCompositeVO {
    return CategoryCompositeVO.create({
      id: CategoryIdVO.create(CATEGORY_ID),
      name: CategoryNameVO.create('Electronics'),
      slug: CategorySlugVO.create('electronics'),
      path: CategoryPathVO.root(),
      status: 'active',
      sortOrder: 0,
      productCount: 0,
    });
  }

  function buildBrand(): BrandCompositeVO {
    return BrandCompositeVO.create({
      id: BrandIdVO.create(BRAND_ID),
      name: BrandNameVO.create('Sony'),
      slug: BrandSlugVO.create('sony'),
      logo: BrandLogoVO.create('https://cdn.example.com/logo.png'),
      description: 'Electronics',
      status: 'active',
      isFeatured: false,
      productCount: 0,
    });
  }

  function buildAggregate(variantStocks: number[] = [10, 20]) {
    return ProductAggregateVO.create({
      product: buildProductComposite(),
      variants: variantStocks.map((s, i) => buildVariant(`var-${i + 1}`, s, 1000 + i * 100)),
      inventory: [
        buildInventory('inv-1', 50),
        buildInventory('inv-2', 30),
      ],
      pricing: buildPricing(),
      media: [
        buildMedia('img-2', 'image', 1),
        buildMedia('img-1', 'image', 0),
        buildMedia('video-1', 'video', 0),
      ],
      category: buildCategory(),
      brand: buildBrand(),
    });
  }

  describe('getTotalAvailableStock', () => {
    it('sums inventory available', () => {
      const agg = buildAggregate();
      expect(agg.getTotalAvailableStock()).toBe(80);
    });

    it('0 for empty inventory', () => {
      const agg = ProductAggregateVO.create({
        product: buildProductComposite(),
        variants: [],
        inventory: [],
        pricing: buildPricing(),
        media: [],
      });
      expect(agg.getTotalAvailableStock()).toBe(0);
    });
  });

  describe('allVariantsInStock', () => {
    it('true when all variants have stock', () => {
      const agg = buildAggregate([10, 20]);
      expect(agg.allVariantsInStock()).toBe(true);
    });

    it('false when any variant is 0 stock', () => {
      const agg = buildAggregate([10, 0]);
      expect(agg.allVariantsInStock()).toBe(false);
    });
  });

  describe('getPrimaryImage', () => {
    it('returns image with lowest sortOrder', () => {
      const agg = buildAggregate();
      expect(agg.getPrimaryImage()?.id).toBe('img-1');
    });

    it('returns undefined for no images', () => {
      const agg = ProductAggregateVO.create({
        product: buildProductComposite(),
        variants: [],
        inventory: [],
        pricing: buildPricing(),
        media: [],
      });
      expect(agg.getPrimaryImage()).toBeUndefined();
    });
  });

  describe('getPriceRange', () => {
    it('returns range across variants', () => {
      const agg = buildAggregate([10, 20, 30]);
      const range = agg.getPriceRange();
      expect(range?.min).toBe(1000);
      expect(range?.max).toBe(1200);
    });

    it('returns single price for no variants', () => {
      const agg = ProductAggregateVO.create({
        product: buildProductComposite({ price: 500 }),
        variants: [],
        inventory: [],
        pricing: buildPricing(),
        media: [],
      });
      const range = agg.getPriceRange();
      expect(range?.min).toBe(1000);
      expect(range?.max).toBe(1000);
    });
  });

  describe('canPublish', () => {
    it('allows when product + images valid', () => {
      const agg = buildAggregate();
      expect(agg.canPublish().allowed).toBe(true);
    });

    it('rejects when no images', () => {
      const agg = ProductAggregateVO.create({
        product: buildProductComposite(),
        variants: [],
        inventory: [],
        pricing: buildPricing(),
        media: [buildMedia('v-1', 'video', 0)],
      });
      expect(agg.canPublish().reason).toContain('image');
    });

    it('rejects when product itself fails', () => {
      const agg = ProductAggregateVO.create({
        product: buildProductComposite({ price: 0 }),
        variants: [],
        inventory: [],
        pricing: buildPricing(),
        media: [buildMedia('img-1', 'image', 0)],
      });
      expect(agg.canPublish().allowed).toBe(false);
    });
  });

  describe('getters', () => {
    it('exposes product, variants, inventory, pricing, media', () => {
      const agg = buildAggregate();
      expect(agg.product).toBeDefined();
      expect(agg.variants.length).toBe(2);
      expect(agg.inventory.length).toBe(2);
      expect(agg.pricing).toBeDefined();
      expect(agg.media.length).toBe(3);
    });

    it('exposes optional category and brand', () => {
      const agg = buildAggregate();
      expect(agg.category).toBeDefined();
      expect(agg.brand).toBeDefined();
    });

    it('returns undefined for missing category/brand', () => {
      const agg = ProductAggregateVO.create({
        product: buildProductComposite(),
        variants: [],
        inventory: [],
        pricing: buildPricing(),
        media: [],
      });
      expect(agg.category).toBeUndefined();
      expect(agg.brand).toBeUndefined();
    });
  });

  void NOW;
});
