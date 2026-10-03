/**
 * Composite VOs — grouped tests
 */
import { VariantOptionSetVO } from '../../../src/module/domain/value-objects/composites/variant-option-set.vo.js';
import { MediaCompositeVO } from '../../../src/module/domain/value-objects/composites/media.vo.js';
import { AttributeCompositeVO } from '../../../src/module/domain/value-objects/composites/attribute.vo.js';
import { CategoryCompositeVO } from '../../../src/module/domain/value-objects/composites/category.vo.js';
import { BrandCompositeVO } from '../../../src/module/domain/value-objects/composites/brand.vo.js';
import { CollectionCompositeVO } from '../../../src/module/domain/value-objects/composites/collection.vo.js';
import { InventoryCompositeVO } from '../../../src/module/domain/value-objects/composites/inventory.vo.js';
import { PricingCompositeVO } from '../../../src/module/domain/value-objects/composites/pricing.vo.js';
import { ReviewCompositeVO } from '../../../src/module/domain/value-objects/composites/review.vo.js';
import { VariantCompositeVO } from '../../../src/module/domain/value-objects/composites/variant.vo.js';

import { AttributeIdVO } from '../../../src/module/domain/value-objects/primitives/attribute-id.vo.js';
import { AttributeNameVO } from '../../../src/module/domain/value-objects/primitives/attribute-name.vo.js';
import { CategoryIdVO } from '../../../src/module/domain/value-objects/primitives/category-id.vo.js';
import { CategoryNameVO } from '../../../src/module/domain/value-objects/primitives/category-name.vo.js';
import { CategorySlugVO } from '../../../src/module/domain/value-objects/primitives/category-slug.vo.js';
import { CategoryPathVO } from '../../../src/module/domain/value-objects/primitives/category-path.vo.js';
import { BrandIdVO } from '../../../src/module/domain/value-objects/primitives/brand-id.vo.js';
import { BrandNameVO } from '../../../src/module/domain/value-objects/primitives/brand-name.vo.js';
import { BrandSlugVO } from '../../../src/module/domain/value-objects/primitives/brand-slug.vo.js';
import { BrandLogoVO } from '../../../src/module/domain/value-objects/primitives/brand-logo.vo.js';
import { CollectionIdVO } from '../../../src/module/domain/value-objects/primitives/collection-id.vo.js';
import { CollectionNameVO } from '../../../src/module/domain/value-objects/primitives/collection-name.vo.js';
import { CollectionSlugVO } from '../../../src/module/domain/value-objects/primitives/collection-slug.vo.js';
import { InventoryIdVO } from '../../../src/module/domain/value-objects/primitives/inventory-id.vo.js';
import { InventoryQuantityVO } from '../../../src/module/domain/value-objects/primitives/inventory-quantity.vo.js';
import { InventoryThresholdVO } from '../../../src/module/domain/value-objects/primitives/inventory-threshold.vo.js';
import { ProductIdVO } from '../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../../../src/module/domain/value-objects/primitives/variant-id.vo.js';
import { VariantNameVO } from '../../../src/module/domain/value-objects/primitives/variant-name.vo.js';
import { VariantSkuVO } from '../../../src/module/domain/value-objects/primitives/variant-sku.vo.js';
import { PriceVO } from '../../../src/module/domain/value-objects/primitives/price.vo.js';
import { DiscountPercentVO } from '../../../src/module/domain/value-objects/primitives/discount-vo.js';
import { TaxRateVO } from '../../../src/module/domain/value-objects/primitives/tax-rate.vo.js';
import { ReviewIdVO } from '../../../src/module/domain/value-objects/primitives/review-id.vo.js';
import { ReviewRatingVO } from '../../../src/module/domain/value-objects/primitives/review-rating.vo.js';
import { ReviewCommentVO } from '../../../src/module/domain/value-objects/primitives/review-comment.vo.js';

import { ATTRIBUTE_TYPE, COLLECTION_TYPE, INVENTORY_STATUS, PRICING_TYPE, VARIANT_STATUS } from '@vubon/shared-constants/business/product';
import { NOW, USER_ID, PRODUCT_ID, DEFAULT_CURRENCY } from '../../helpers.js';

describe('VariantOptionSetVO', () => {
  it('create with valid options', () => {
    const vo = VariantOptionSetVO.create([
      { name: 'Color', value: 'Red' },
      { name: 'Size', value: 'L' },
    ]);
    expect(vo.size).toBe(2);
  });

  it('rejects empty options', () => {
    expect(() => VariantOptionSetVO.create([])).toThrow();
  });

  it('rejects duplicate options', () => {
    expect(() =>
      VariantOptionSetVO.create([
        { name: 'Color', value: 'Red' },
        { name: 'Color', value: 'Red' },
      ]),
    ).toThrow();
  });

  it('signature is stable regardless of order', () => {
    const a = VariantOptionSetVO.create([
      { name: 'Color', value: 'Red' },
      { name: 'Size', value: 'L' },
    ]);
    const b = VariantOptionSetVO.create([
      { name: 'Size', value: 'L' },
      { name: 'Color', value: 'Red' },
    ]);
    expect(a.signature()).toBe(b.signature());
  });

  it('has() is case-insensitive', () => {
    const vo = VariantOptionSetVO.create([{ name: 'Color', value: 'Red' }]);
    expect(vo.has('color', 'red')).toBe(true);
  });
});

describe('MediaCompositeVO', () => {
  it('create with valid URL', () => {
    const vo = MediaCompositeVO.create({
      id: 'm1',
      type: 'image',
      url: 'https://cdn.example.com/img.jpg',
      sortOrder: 0,
    });
    expect(vo.isImage()).toBe(true);
  });

  it('rejects invalid URL', () => {
    expect(() =>
      MediaCompositeVO.create({ id: 'm1', type: 'image', url: 'bad', sortOrder: 0 }),
    ).toThrow();
  });

  it('rejects negative sortOrder', () => {
    expect(() =>
      MediaCompositeVO.create({
        id: 'm1',
        type: 'image',
        url: 'https://cdn.example.com/img.jpg',
        sortOrder: -1,
      }),
    ).toThrow();
  });

  it('sizeInMb computes correctly', () => {
    const vo = MediaCompositeVO.create({
      id: 'm1',
      type: 'image',
      url: 'https://cdn.example.com/img.jpg',
      sortOrder: 0,
      sizeBytes: Math.round(2.5 * 1024 * 1024),
    });
    expect(vo.sizeInMb()).toBeCloseTo(2.5, 1);
  });

  it('isWithinSizeLimit true for small image', () => {
    const vo = MediaCompositeVO.create({
      id: 'm1',
      type: 'image',
      url: 'https://cdn.example.com/img.jpg',
      sortOrder: 0,
      sizeBytes: 100 * 1024,
    });
    expect(vo.isWithinSizeLimit()).toBe(true);
  });

  it('isVideo detects video type', () => {
    const vo = MediaCompositeVO.create({
      id: 'v1',
      type: 'video',
      url: 'https://cdn.example.com/v.mp4',
      sortOrder: 0,
    });
    expect(vo.isVideo()).toBe(true);
    expect(vo.isImage()).toBe(false);
  });
});

describe('AttributeCompositeVO', () => {
  it('create select with options', () => {
    const vo = AttributeCompositeVO.create({
      id: AttributeIdVO.create('attr-1'),
      name: AttributeNameVO.create('Color'),
      slug: 'color',
      type: ATTRIBUTE_TYPE.SELECT,
      isRequired: false,
      isSearchable: true,
      isFilterable: true,
      options: [{ value: 'red', label: 'Red', sortOrder: 1 }],
    });
    expect(vo.isFilterable).toBe(true);
  });

  it('rejects select without options', () => {
    expect(() =>
      AttributeCompositeVO.create({
        id: AttributeIdVO.create('attr-1'),
        name: AttributeNameVO.create('Color'),
        slug: 'color',
        type: ATTRIBUTE_TYPE.SELECT,
        isRequired: false,
        isSearchable: true,
        isFilterable: true,
      }),
    ).toThrow();
  });

  it('validateValue works for select', () => {
    const vo = AttributeCompositeVO.create({
      id: AttributeIdVO.create('attr-1'),
      name: AttributeNameVO.create('Color'),
      slug: 'color',
      type: ATTRIBUTE_TYPE.SELECT,
      isRequired: false,
      isSearchable: true,
      isFilterable: true,
      options: [{ value: 'red', label: 'Red', sortOrder: 1 }],
    });
    expect(vo.validateValue({ value: 'red' } as never)).toBe(true);
    expect(vo.validateValue({ value: 'blue' } as never)).toBe(false);
  });
});

describe('CategoryCompositeVO', () => {
  it('create root category', () => {
    const vo = CategoryCompositeVO.create({
      id: CategoryIdVO.create('cat-1'),
      name: CategoryNameVO.create('Electronics'),
      slug: CategorySlugVO.create('electronics'),
      path: CategoryPathVO.root(),
      status: 'active',
      sortOrder: 0,
      productCount: 0,
    });
    expect(vo.isRoot()).toBe(true);
    expect(vo.isActive()).toBe(true);
  });

  it('rejects negative sortOrder', () => {
    expect(() =>
      CategoryCompositeVO.create({
        id: CategoryIdVO.create('cat-1'),
        name: CategoryNameVO.create('Xy'),
        slug: CategorySlugVO.create('x'),
        path: CategoryPathVO.root(),
        status: 'active',
        sortOrder: -1,
        productCount: 0,
      }),
    ).toThrow();
  });

  it('isLeaf based on productCount', () => {
    const vo = CategoryCompositeVO.create({
      id: CategoryIdVO.create('cat-1'),
      name: CategoryNameVO.create('Xy'),
      slug: CategorySlugVO.create('x'),
      path: CategoryPathVO.root(),
      status: 'active',
      sortOrder: 0,
      productCount: 5,
    });
    expect(vo.isLeaf()).toBe(true);
  });
});

describe('BrandCompositeVO', () => {
  it('create valid brand', () => {
    const vo = BrandCompositeVO.create({
      id: BrandIdVO.create('b-1'),
      name: BrandNameVO.create('Sony'),
      slug: BrandSlugVO.create('sony'),
      logo: BrandLogoVO.create('https://cdn.example.com/logo.png'),
      description: 'Electronics',
      status: 'active',
      isFeatured: false,
      productCount: 0,
    });
    expect(vo.isActive()).toBe(true);
    expect(vo.hasLogo()).toBe(true);
  });

  it('rejects negative productCount', () => {
    expect(() =>
      BrandCompositeVO.create({
        id: BrandIdVO.create('b-1'),
        name: BrandNameVO.create('X'),
        slug: BrandSlugVO.create('x'),
        logo: BrandLogoVO.empty(),
        description: '',
        status: 'active',
        isFeatured: false,
        productCount: -1,
      }),
    ).toThrow();
  });
});

describe('CollectionCompositeVO', () => {
  it('create with empty products', () => {
    const vo = CollectionCompositeVO.create({
      id: CollectionIdVO.create('c-1'),
      name: CollectionNameVO.create('Sale'),
      slug: CollectionSlugVO.create('sale'),
      type: COLLECTION_TYPE.MANUAL,
      status: 'active',
      productIds: [],
      isFeatured: false,
      sortOrder: 0,
    });
    expect(vo.productCount).toBe(0);
    expect(vo.canAddProduct()).toBe(true);
  });

  it('rejects endAt <= startAt', () => {
    expect(() =>
      CollectionCompositeVO.create({
        id: CollectionIdVO.create('c-1'),
        name: CollectionNameVO.create('Sale'),
        slug: CollectionSlugVO.create('sale'),
        type: COLLECTION_TYPE.SEASONAL,
        status: 'active',
        productIds: [],
        isFeatured: false,
        sortOrder: 0,
        startAt: '2025-06-01T00:00:00Z',
        endAt: '2025-05-01T00:00:00Z',
      }),
    ).toThrow();
  });

  it('isAutomatic detects automatic type', () => {
    const vo = CollectionCompositeVO.create({
      id: CollectionIdVO.create('c-1'),
      name: CollectionNameVO.create('Sale'),
      slug: CollectionSlugVO.create('sale'),
      type: COLLECTION_TYPE.AUTOMATIC,
      status: 'active',
      productIds: [],
      isFeatured: false,
      sortOrder: 0,
    });
    expect(vo.isAutomatic()).toBe(true);
  });
});

describe('InventoryCompositeVO', () => {
  const baseProps = {
    id: InventoryIdVO.create('inv-1'),
    productId: ProductIdVO.create(PRODUCT_ID),
    sku: 'SKU-1',
    quantity: InventoryQuantityVO.create(100),
    reserved: InventoryQuantityVO.zero(),
    lowStockThreshold: InventoryThresholdVO.default(),
    trackQuantity: true,
    allowBackorder: false,
  };

  it('create with valid props', () => {
    const vo = InventoryCompositeVO.create(baseProps);
    expect(vo.available).toBe(100);
  });

  it('available = quantity - reserved', () => {
    const vo = InventoryCompositeVO.create({
      ...baseProps,
      reserved: InventoryQuantityVO.create(30),
    });
    expect(vo.available).toBe(70);
  });

  it('rejects reserved > quantity', () => {
    expect(() =>
      InventoryCompositeVO.create({
        ...baseProps,
        quantity: InventoryQuantityVO.create(10),
        reserved: InventoryQuantityVO.create(20),
      }),
    ).toThrow();
  });

  it('getStatus IN_STOCK for healthy stock', () => {
    const vo = InventoryCompositeVO.create(baseProps);
    expect(vo.getStatus()).toBe(INVENTORY_STATUS.IN_STOCK);
  });

  it('getStatus OUT_OF_STOCK when quantity 0', () => {
    const vo = InventoryCompositeVO.create({
      ...baseProps,
      quantity: InventoryQuantityVO.zero(),
    });
    expect(vo.getStatus()).toBe(INVENTORY_STATUS.OUT_OF_STOCK);
  });

  it('reserve increases reserved', () => {
    const vo = InventoryCompositeVO.create(baseProps).reserve(20);
    expect(vo.reserved).toBe(20);
  });

  it('release decreases reserved', () => {
    const vo = InventoryCompositeVO.create({
      ...baseProps,
      reserved: InventoryQuantityVO.create(20),
    }).release(10);
    expect(vo.reserved).toBe(10);
  });

  it('addStock increases quantity', () => {
    const vo = InventoryCompositeVO.create(baseProps).addStock(50, NOW);
    expect(vo.quantity).toBe(150);
  });
});

describe('PricingCompositeVO', () => {
  const baseProps = {
    productId: ProductIdVO.create(PRODUCT_ID),
    type: PRICING_TYPE.FIXED,
    basePrice: PriceVO.create(1000, DEFAULT_CURRENCY),
    sellingPrice: PriceVO.create(1000, DEFAULT_CURRENCY),
    taxRate: TaxRateVO.zero(),
    taxInclusive: true,
    discountPercent: DiscountPercentVO.none(),
  };

  it('create valid pricing', () => {
    const vo = PricingCompositeVO.create(baseProps);
    expect(vo.sellingPrice.amount).toBe(1000);
  });

  it('rejects selling > base', () => {
    expect(() =>
      PricingCompositeVO.create({
        ...baseProps,
        sellingPrice: PriceVO.create(1500, DEFAULT_CURRENCY),
      }),
    ).toThrow();
  });

  it('totalFor multiplies by quantity', () => {
    const vo = PricingCompositeVO.create(baseProps);
    expect(vo.totalFor(5)).toBe(5000);
  });

  it('finalPrice adds tax when not inclusive', () => {
    const vo = PricingCompositeVO.create({
      ...baseProps,
      taxInclusive: false,
      taxRate: TaxRateVO.create(0.15),
    });
    expect(vo.finalPrice()).toBe(1150);
  });

  it('profitMargin computes correctly', () => {
    const vo = PricingCompositeVO.create({
      ...baseProps,
      costPrice: PriceVO.create(700, DEFAULT_CURRENCY),
    });
    expect(vo.profitMargin()).toBe(30);
  });

  it('hasDiscount detects compareAtPrice > selling', () => {
    const vo = PricingCompositeVO.create({
      ...baseProps,
      sellingPrice: PriceVO.create(800, DEFAULT_CURRENCY),
      compareAtPrice: PriceVO.create(1000, DEFAULT_CURRENCY),
    });
    expect(vo.hasDiscount()).toBe(true);
    expect(vo.effectiveDiscountPercent()).toBe(20);
  });
});

describe('ReviewCompositeVO', () => {
  const baseProps = {
    id: ReviewIdVO.create('rev-1'),
    productId: ProductIdVO.create(PRODUCT_ID),
    userId: USER_ID,
    rating: ReviewRatingVO.create(5),
    comment: ReviewCommentVO.create('A great product with good quality'),
    images: [],
    status: 'approved',
    isVerifiedPurchase: true,
    helpfulCount: 0,
    reportCount: 0,
    createdAt: NOW,
  };

  it('create valid review', () => {
    const vo = ReviewCompositeVO.create(baseProps);
    expect(vo.rating.value).toBe(5);
  });

  it('isEditable for recent APPROVED review', () => {
    const vo = ReviewCompositeVO.create(baseProps);
    expect(vo.isEditable(NOW)).toBe(true);
  });

  it('isSpamSuspicious when reportCount >= 5', () => {
    const vo = ReviewCompositeVO.create({ ...baseProps, reportCount: 5 });
    expect(vo.isSpamSuspicious()).toBe(true);
  });

  it('isHighQuality for positive + long comment', () => {
    const vo = ReviewCompositeVO.create({
      ...baseProps,
      comment: ReviewCommentVO.create('A'.repeat(150)),
    });
    expect(vo.isHighQuality()).toBe(true);
  });

  it('isHighQuality false for negative rating', () => {
    const vo = ReviewCompositeVO.create({
      ...baseProps,
      rating: ReviewRatingVO.create(2),
      comment: ReviewCommentVO.create('A'.repeat(150)),
    });
    expect(vo.isHighQuality()).toBe(false);
  });
});

describe('VariantCompositeVO', () => {
  const baseProps = {
    id: VariantIdVO.create('v-1'),
    productId: ProductIdVO.create(PRODUCT_ID),
    name: VariantNameVO.create('Red / L'),
    sku: VariantSkuVO.create('VAR-001'),
    type: 'color',
    options: [{ name: 'Color', value: 'Red' }],
    price: PriceVO.create(1200, DEFAULT_CURRENCY),
    status: VARIANT_STATUS.ACTIVE,
    stock: 10,
  };

  it('create valid variant', () => {
    const vo = VariantCompositeVO.create(baseProps);
    expect(vo.isAvailable()).toBe(true);
  });

  it('isAvailable false when stock 0', () => {
    const vo = VariantCompositeVO.create({ ...baseProps, stock: 0 });
    expect(vo.isAvailable()).toBe(false);
  });

  it('getProfitMargin with cost', () => {
    const vo = VariantCompositeVO.create({
      ...baseProps,
      cost: PriceVO.create(800, DEFAULT_CURRENCY),
    });
    expect(vo.getProfitMargin()).toBeGreaterThan(0);
  });

  it('rejects empty options', () => {
    expect(() => VariantCompositeVO.create({ ...baseProps, options: [] })).toThrow();
  });
});
