/**
 * Application Mappers — comprehensive tests
 */
import { ProductMapper } from '../../../src/module/application/mappers/product.mapper.js';
import { VariantMapper } from '../../../src/module/application/mappers/variant.mapper.js';
import { InventoryMapper } from '../../../src/module/application/mappers/inventory.mapper.js';
import { PricingMapper } from '../../../src/module/application/mappers/pricing.mapper.js';
import { AttributeMapper } from '../../../src/module/application/mappers/attribute.mapper.js';
import { ReviewMapper } from '../../../src/module/application/mappers/review.mapper.js';
import { BrandMapper } from '../../../src/module/application/mappers/brand.mapper.js';
import { CategoryMapper } from '../../../src/module/application/mappers/category.mapper.js';
import { CollectionMapper } from '../../../src/module/application/mappers/collection.mapper.js';
import { MediaMapper } from '../../../src/module/application/mappers/media.mapper.js';
import { ProductDetailAssembler } from '../../../src/module/application/mappers/product-detail.assembler.js';

import { buildProduct, buildVariant, buildInventory, buildPricing, buildAttribute, buildReview, buildBrand, buildCategory, buildCollection, buildMedia } from '../../fixtures.js';
import { USER_ID, PRODUCT_ID, CATEGORY_ID, BRAND_ID, VARIANT_ID } from '../../helpers.js';

describe('Application Mappers', () => {
  describe('ProductMapper', () => {
    it('toResponse transforms all fields', () => {
      const product = buildProduct();
      const dto = ProductMapper.toResponse(product);
      expect(dto.id).toBe(PRODUCT_ID);
      expect(dto.name).toBe('Test Product');
      expect(dto.slug).toBe('test-product');
      expect(dto.sku).toBe('TEST-001');
      expect(dto.type).toBe('physical');
      expect(dto.categoryId).toBe(CATEGORY_ID);
      expect(dto.price).toBe(1000);
      expect(dto.currency).toBe('BDT');
      expect(dto.totalStock).toBe(10);
    });

    it('toResponse handles missing optional fields', () => {
      const product = buildProduct({ brandId: undefined, thumbnailUrl: undefined });
      const dto = ProductMapper.toResponse(product);
      expect(dto.brandId).toBeUndefined();
      expect(dto.thumbnailUrl).toBeUndefined();
    });

    it('toPublicResponse produces reduced shape', () => {
      const product = buildProduct();
      const dto = ProductMapper.toPublicResponse(product);
      expect(dto.id).toBe(PRODUCT_ID);
      expect(dto).not.toHaveProperty('createdAt');
    });

    it('toResponseList maps each item', () => {
      const products = [buildProduct(), buildProduct()];
      expect(ProductMapper.toResponseList(products).length).toBe(2);
    });

    it('toPublicResponseList maps each item', () => {
      const products = [buildProduct(), buildProduct()];
      expect(ProductMapper.toPublicResponseList(products).length).toBe(2);
    });
  });

  describe('VariantMapper', () => {
    it('toResponse transforms variant', () => {
      const variant = buildVariant();
      const dto = VariantMapper.toResponse(variant);
      expect(dto.id).toBe(VARIANT_ID);
      expect(dto.name).toBe('Red / Large');
      expect(dto.sku).toBe('TEST-RED-L');
      expect(dto.options.length).toBeGreaterThan(0);
      expect(dto.stock).toBe(10);
    });

    it('toResponse handles optional cost', () => {
      const variant = buildVariant({ cost: undefined });
      const dto = VariantMapper.toResponse(variant);
      expect(dto.cost).toBeUndefined();
    });

    it('toResponseList maps list', () => {
      expect(VariantMapper.toResponseList([buildVariant()]).length).toBe(1);
    });
  });

  describe('InventoryMapper', () => {
    it('toResponse transforms inventory', () => {
      const inv = buildInventory();
      const dto = InventoryMapper.toResponse(inv);
      expect(dto.sku).toBe('TEST-001');
      expect(dto.quantity).toBe(100);
      expect(dto.available).toBe(100);
      expect(dto.status).toBeTruthy();
    });

    it('toResponseList maps list', () => {
      expect(InventoryMapper.toResponseList([buildInventory()]).length).toBe(1);
    });
  });

  describe('PricingMapper', () => {
    it('toResponse transforms pricing', () => {
      const pricing = buildPricing();
      const dto = PricingMapper.toResponse(pricing);
      expect(dto.basePrice).toBe(1200);
      expect(dto.sellingPrice).toBe(1000);
      expect(dto.currency).toBe('BDT');
      expect(dto.taxInclusive).toBe(true);
    });

    it('toResponse handles optional cost/wholesale/msrp', () => {
      const pricing = buildPricing();
      const dto = PricingMapper.toResponse(pricing);
      expect(dto.costPrice).toBeUndefined();
      expect(dto.wholesalePrice).toBeUndefined();
      expect(dto.msrp).toBeUndefined();
    });
  });

  describe('AttributeMapper', () => {
    it('toResponse transforms attribute', () => {
      const attr = buildAttribute();
      const dto = AttributeMapper.toResponse(attr);
      expect(dto.name).toBe('Color');
      expect(dto.slug).toBe('color');
      expect(dto.type).toBe('select');
      expect(dto.options?.length).toBeGreaterThan(0);
    });

    it('toResponseList maps list', () => {
      expect(AttributeMapper.toResponseList([buildAttribute()]).length).toBe(1);
    });
  });

  describe('ReviewMapper', () => {
    it('toResponse transforms review', () => {
      const review = buildReview();
      const dto = ReviewMapper.toResponse(review);
      expect(dto.rating).toBe(5);
      expect(dto.status).toBe('pending');
      expect(dto.helpfulCount).toBe(0);
    });

    it('toResponseList maps list', () => {
      expect(ReviewMapper.toResponseList([buildReview()]).length).toBe(1);
    });
  });

  describe('BrandMapper', () => {
    it('toResponse transforms brand', () => {
      const brand = buildBrand();
      const dto = BrandMapper.toResponse(brand);
      expect(dto.name).toBe('Sony');
      expect(dto.slug).toBe('sony');
      expect(dto.status).toBe('active');
    });

    it('toResponseList maps list', () => {
      expect(BrandMapper.toResponseList([buildBrand()]).length).toBe(1);
    });
  });

  describe('CategoryMapper', () => {
    it('toResponse transforms category', () => {
      const cat = buildCategory();
      const dto = CategoryMapper.toResponse(cat);
      expect(dto.id).toBe(CATEGORY_ID);
      expect(dto.name).toBe('Electronics');
      expect(dto.slug).toBe('electronics');
    });

    it('toResponseList maps list', () => {
      expect(CategoryMapper.toResponseList([buildCategory()]).length).toBe(1);
    });

    it('toTree builds nested tree', () => {
      const tree = CategoryMapper.toTree([
        { category: buildCategory(), children: [] },
      ]);
      expect(tree.length).toBe(1);
      expect(tree[0].children).toEqual([]);
    });

    it('toTree handles deep nesting', () => {
      const child = { category: buildCategory(), children: [] };
      const tree = CategoryMapper.toTree([
        { category: buildCategory(), children: [child] },
      ]);
      expect(tree[0].children.length).toBe(1);
    });
  });

  describe('CollectionMapper', () => {
    it('toResponse transforms collection', () => {
      const col = buildCollection();
      const dto = CollectionMapper.toResponse(col);
      expect(dto.name).toBe('Summer Sale');
      expect(dto.slug).toBe('summer-sale');
      expect(dto.productIds).toEqual([]);
    });

    it('toResponseList maps list', () => {
      expect(CollectionMapper.toResponseList([buildCollection()]).length).toBe(1);
    });
  });

  describe('MediaMapper', () => {
    it('toDTO transforms media', () => {
      const media = buildMedia();
      const dto = MediaMapper.toDTO(media);
      expect(dto.type).toBe('image');
      expect(dto.url).toBe('https://cdn.example.com/img.jpg');
      expect(dto.isPrimary).toBe(false);
    });

    it('toDTOList maps list', () => {
      expect(MediaMapper.toDTOList([buildMedia()]).length).toBe(1);
    });
  });

  describe('ProductDetailAssembler', () => {
    it('assemble combines all parts', () => {
      const dto = ProductDetailAssembler.assemble({
        product: buildProduct(),
        variants: [buildVariant()],
        inventory: [buildInventory()],
        pricing: buildPricing(),
        attributes: [buildAttribute()],
      });
      expect(dto.product.id).toBe(PRODUCT_ID);
      expect(dto.variants.length).toBe(1);
      expect(dto.inventory.length).toBe(1);
      expect(dto.pricing).toBeDefined();
      expect(dto.attributes.length).toBe(1);
    });

    it('assemble handles null pricing', () => {
      const dto = ProductDetailAssembler.assemble({
        product: buildProduct(),
        variants: [],
        inventory: [],
        pricing: null,
        attributes: [],
      });
      expect(dto.pricing).toBeUndefined();
    });

    void USER_ID;
    void BRAND_ID;
  });
});
