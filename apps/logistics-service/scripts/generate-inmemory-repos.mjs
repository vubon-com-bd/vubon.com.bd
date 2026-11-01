#!/usr/bin/env node
/**
 * Generate InMemory Repositories — Product Service
 * @module product-service/scripts
 *
 * Generates 11 InMemory repository implementations from spec metadata.
 *
 * Usage: pnpm generate:inmemory (or node scripts/generate-inmemory-repos.mjs)
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const MEMORY_DIR = join(
  ROOT,
  'src',
  'module',
  'infrastructure',
  'persistence',
  'memory',
  'repositories',
);

// ─────────────────────────────────────────────
// SPECS — All 11 repositories
// ─────────────────────────────────────────────
const SPECS = [
  // ═══════════════════════════════════════════
  // 1. PRODUCT
  // ═══════════════════════════════════════════
  {
    file: 'product.memory.repository.ts',
    entity: 'ProductEntity',
    className: 'Product',
    entityPath: '../../../../domain/entities/product.entity.js',
    interfaceName: 'ProductRepository',
    interfacePath: '../../../../domain/repositories/product.repository.interface.js',
    voImports: [
      { name: 'ProductIdVO', path: '../../../../domain/value-objects/primitives/product-id.vo.js' },
      { name: 'CategoryIdVO', path: '../../../../domain/value-objects/primitives/category-id.vo.js' },
      { name: 'BrandIdVO', path: '../../../../domain/value-objects/primitives/brand-id.vo.js' },
      { name: 'VendorIdVO', path: '../../../../domain/value-objects/primitives/vendor-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: ProductIdVO): Promise<ProductEntity | null> {
    return this.findById(id.value);
  }`,
      `async existsBySlug(slug: string): Promise<boolean> {
    const all = await this.findAll();
    return all.some((e) => e.vo.slug.value === slug);
  }`,
      `async existsBySku(sku: string): Promise<boolean> {
    const all = await this.findAll();
    return all.some((e) => e.vo.sku.value === sku);
  }`,
      `async findBySlug(slug: string): Promise<ProductEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.vo.slug.value === slug) ?? null;
  }`,
      `async findBySku(sku: string): Promise<ProductEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.vo.sku.value === sku) ?? null;
  }`,
      `async findByCategory(categoryId: CategoryIdVO): Promise<readonly ProductEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.vo.categoryId.value === categoryId.value);
  }`,
      `async findByBrand(brandId: BrandIdVO): Promise<readonly ProductEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.vo.brandId?.value === brandId.value);
  }`,
      `async findByVendor(vendorId: VendorIdVO): Promise<readonly ProductEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.vo.vendorId?.value === vendorId.value);
  }`,
      `async findByStatus(status: string): Promise<readonly ProductEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.status.value === status);
  }`,
      `async findFeatured(limit = 20): Promise<readonly ProductEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.vo.isFeatured && e.vo.isPublished).slice(0, limit);
  }`,
      `async findPublished(limit = 20): Promise<readonly ProductEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.vo.isPublished).slice(0, limit);
  }`,
      `async findPaginated(options: {
    page: number;
    limit: number;
    sortBy?: string;
    sortDir?: 'asc' | 'desc';
    filter?: unknown;
    includeDeleted?: boolean;
  }): Promise<{
    items: readonly ProductEntity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  }> {
    const all = await this.findAll();
    const start = (options.page - 1) * options.limit;
    const totalPages = Math.ceil(all.length / options.limit);
    return {
      items: all.slice(start, start + options.limit),
      total: all.length,
      page: options.page,
      limit: options.limit,
      totalPages,
      hasNext: options.page < totalPages,
      hasPrev: options.page > 1,
    };
  }`,
      `async search(term: string, limit = 20): Promise<readonly ProductEntity[]> {
    const lower = term.trim().toLowerCase();
    const all = await this.findAll();
    return all
      .filter(
        (e) =>
          e.vo.name.value.toLowerCase().includes(lower) ||
          e.vo.sku.value.toLowerCase().includes(lower) ||
          e.vo.description?.value.toLowerCase().includes(lower),
      )
      .slice(0, limit);
  }`,
      `async getStats(): Promise<{
    total: number;
    publishedCount: number;
    draftCount: number;
    outOfStockCount: number;
    totalStockUnits: number;
    byStatus: Readonly<Record<string, number>>;
    byType: Readonly<Record<string, number>>;
  }> {
    const all = await this.findAll();
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    let publishedCount = 0;
    let draftCount = 0;
    let outOfStockCount = 0;
    let totalStockUnits = 0;
    for (const p of all) {
      byStatus[p.status.value] = (byStatus[p.status.value] ?? 0) + 1;
      byType[p.vo.type.value] = (byType[p.vo.type.value] ?? 0) + 1;
      if (p.vo.isPublished) publishedCount++;
      if (p.status.isDraft()) draftCount++;
      if (p.vo.totalStock === 0) outOfStockCount++;
      totalStockUnits += p.vo.totalStock;
    }
    return { total: all.length, publishedCount, draftCount, outOfStockCount, totalStockUnits, byStatus, byType };
  }`,
      `async countByCategory(categoryId: CategoryIdVO): Promise<number> {
    return (await this.findByCategory(categoryId)).length;
  }`,
      `async countByBrand(brandId: BrandIdVO): Promise<number> {
    return (await this.findByBrand(brandId)).length;
  }`,
      `async countByVendor(vendorId: VendorIdVO): Promise<number> {
    return (await this.findByVendor(vendorId)).length;
  }`,
      `async findStaleDrafts(olderThanHours: number): Promise<readonly ProductEntity[]> {
    const cutoff = Date.now() - olderThanHours * 3600 * 1000;
    const all = await this.findAll();
    return all.filter(
      (e) => e.status.isDraft() && Date.parse(e.updatedAt) < cutoff,
    );
  }`,
      `async findLowStock(threshold: number): Promise<readonly ProductEntity[]> {
    const all = await this.findAll();
    return all.filter(
      (e) => e.vo.totalStock > 0 && e.vo.totalStock <= threshold,
    );
  }`,
      `async findOutOfStock(limit = 50): Promise<readonly ProductEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.vo.totalStock === 0).slice(0, limit);
  }`,
      `async saveMany(entities: readonly ProductEntity[]): Promise<readonly ProductEntity[]> {
    const saved: ProductEntity[] = [];
    for (const e of entities) saved.push(await this.save(e));
    return saved;
  }`,
      `async softDelete(id: string): Promise<void> {
    return this.softDeleteById(id);
  }`,
      `async restore(id: string): Promise<void> {
    return this.restoreById(id);
  }`,
    ],
  },

  // ═══════════════════════════════════════════
  // 2. PRODUCT VARIANT
  // ═══════════════════════════════════════════
  {
    file: 'product-variant.memory.repository.ts',
    entity: 'ProductVariantEntity',
    className: 'ProductVariant',
    entityPath: '../../../../domain/entities/product-variant.entity.js',
    interfaceName: 'ProductVariantRepository',
    interfacePath: '../../../../domain/repositories/product-variant.repository.interface.js',
    voImports: [
      { name: 'VariantIdVO', path: '../../../../domain/value-objects/primitives/variant-id.vo.js' },
      { name: 'ProductIdVO', path: '../../../../domain/value-objects/primitives/product-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: VariantIdVO): Promise<ProductVariantEntity | null> {
    return this.findById(id.value);
  }`,
      `async existsBySku(sku: string): Promise<boolean> {
    const all = await this.findAll();
    return all.some((e) => e.sku.value === sku);
  }`,
      `async findBySku(sku: string): Promise<ProductVariantEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.sku.value === sku) ?? null;
  }`,
      `async findByProduct(productId: ProductIdVO): Promise<readonly ProductVariantEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.vo.productId.value === productId.value);
  }`,
      `async findActiveByProduct(productId: ProductIdVO): Promise<readonly ProductVariantEntity[]> {
    const all = await this.findAll();
    return all.filter(
      (e) => e.vo.productId.value === productId.value && e.isActive,
    );
  }`,
      `async findPaginated(options: {
    page: number;
    limit: number;
    sortBy?: string;
    sortDir?: 'asc' | 'desc';
    filter?: unknown;
  }): Promise<{
    items: readonly ProductVariantEntity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const all = await this.findAll();
    const start = (options.page - 1) * options.limit;
    return {
      items: all.slice(start, start + options.limit),
      total: all.length,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(all.length / options.limit),
    };
  }`,
      `async getStats(productId?: string): Promise<{
    total: number;
    activeCount: number;
    outOfStockCount: number;
    totalStockUnits: number;
  }> {
    let all = await this.findAll();
    if (productId) all = all.filter((e) => e.vo.productId.value === productId);
    let activeCount = 0;
    let outOfStockCount = 0;
    let totalStockUnits = 0;
    for (const v of all) {
      if (v.isActive) activeCount++;
      if (v.stock.value === 0) outOfStockCount++;
      totalStockUnits += v.stock.value;
    }
    return { total: all.length, activeCount, outOfStockCount, totalStockUnits };
  }`,
      `async countByProduct(productId: ProductIdVO): Promise<number> {
    return (await this.findByProduct(productId)).length;
  }`,
      `async saveMany(
    entities: readonly ProductVariantEntity[],
  ): Promise<readonly ProductVariantEntity[]> {
    const saved: ProductVariantEntity[] = [];
    for (const e of entities) saved.push(await this.save(e));
    return saved;
  }`,
      `async deleteByProduct(productId: ProductIdVO): Promise<number> {
    const variants = await this.findByProduct(productId);
    for (const v of variants) await this.softDeleteById(v.id);
    return variants.length;
  }`,
      `async findLowStock(threshold: number): Promise<readonly ProductVariantEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.stock.value > 0 && e.stock.value <= threshold);
  }`,
      `async softDelete(id: string): Promise<void> {
    return this.softDeleteById(id);
  }`,
    ],
  },

  // ═══════════════════════════════════════════
  // 3. PRODUCT ATTRIBUTE
  // ═══════════════════════════════════════════
  {
    file: 'product-attribute.memory.repository.ts',
    entity: 'ProductAttributeEntity',
    className: 'ProductAttribute',
    entityPath: '../../../../domain/entities/product-attribute.entity.js',
    interfaceName: 'ProductAttributeRepository',
    interfacePath: '../../../../domain/repositories/product-attribute.repository.interface.js',
    voImports: [
      { name: 'AttributeIdVO', path: '../../../../domain/value-objects/primitives/attribute-id.vo.js' },
      { name: 'ProductIdVO', path: '../../../../domain/value-objects/primitives/product-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: AttributeIdVO): Promise<ProductAttributeEntity | null> {
    return this.findById(id.value);
  }`,
      `async findByProduct(productId: ProductIdVO): Promise<readonly ProductAttributeEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.vo.name.value.length > 0);
  }`,
      `async findFilterableByProduct(
    productId: ProductIdVO,
  ): Promise<readonly ProductAttributeEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isFilterable);
  }`,
      `async findSearchableByProduct(
    productId: ProductIdVO,
  ): Promise<readonly ProductAttributeEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isSearchable);
  }`,
      `async findPaginated(options: {
    page: number;
    limit: number;
    sortBy?: string;
    sortDir?: 'asc' | 'desc';
    filter?: unknown;
  }): Promise<{
    items: readonly ProductAttributeEntity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const all = await this.findAll();
    const start = (options.page - 1) * options.limit;
    return {
      items: all.slice(start, start + options.limit),
      total: all.length,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(all.length / options.limit),
    };
  }`,
      `async countByProduct(productId: ProductIdVO): Promise<number> {
    return (await this.findByProduct(productId)).length;
  }`,
      `async deleteByProduct(productId: ProductIdVO): Promise<number> {
    const items = await this.findByProduct(productId);
    for (const i of items) await this.softDeleteById(i.id);
    return items.length;
  }`,
      `async softDelete(id: string): Promise<void> {
    return this.softDeleteById(id);
  }`,
    ],
  },

  // ═══════════════════════════════════════════
  // 4. PRODUCT INVENTORY
  // ═══════════════════════════════════════════
  {
    file: 'product-inventory.memory.repository.ts',
    entity: 'ProductInventoryEntity',
    className: 'ProductInventory',
    entityPath: '../../../../domain/entities/product-inventory.entity.js',
    interfaceName: 'ProductInventoryRepository',
    interfacePath: '../../../../domain/repositories/product-inventory.repository.interface.js',
    voImports: [
      { name: 'InventoryIdVO', path: '../../../../domain/value-objects/primitives/inventory-id.vo.js' },
      { name: 'ProductIdVO', path: '../../../../domain/value-objects/primitives/product-id.vo.js' },
      { name: 'VariantIdVO', path: '../../../../domain/value-objects/primitives/variant-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: InventoryIdVO): Promise<ProductInventoryEntity | null> {
    return this.findById(id.value);
  }`,
      `async findByProduct(productId: ProductIdVO): Promise<ProductInventoryEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.vo.productId.value === productId.value && !e.vo.variantId) ?? null;
  }`,
      `async findByVariant(variantId: VariantIdVO): Promise<ProductInventoryEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.vo.variantId?.value === variantId.value) ?? null;
  }`,
      `async findBySku(sku: string): Promise<ProductInventoryEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.sku.value === sku) ?? null;
  }`,
      `async findPaginated(options: {
    page: number;
    limit: number;
    sortBy?: string;
    sortDir?: 'asc' | 'desc';
    filter?: unknown;
  }): Promise<{
    items: readonly ProductInventoryEntity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const all = await this.findAll();
    const start = (options.page - 1) * options.limit;
    return {
      items: all.slice(start, start + options.limit),
      total: all.length,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(all.length / options.limit),
    };
  }`,
      `async getStats(): Promise<{
    totalRecords: number;
    inStockCount: number;
    lowStockCount: number;
    outOfStockCount: number;
    totalQuantity: number;
    totalReserved: number;
    totalAvailable: number;
  }> {
    const all = await this.findAll();
    let inStockCount = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;
    let totalQuantity = 0;
    let totalReserved = 0;
    for (const i of all) {
      const available = i.available.value;
      if (available > 10) inStockCount++;
      else if (available > 0) lowStockCount++;
      else outOfStockCount++;
      totalQuantity += i.quantity.value;
      totalReserved += i.reserved.value;
    }
    return {
      totalRecords: all.length,
      inStockCount,
      lowStockCount,
      outOfStockCount,
      totalQuantity,
      totalReserved,
      totalAvailable: totalQuantity - totalReserved,
    };
  }`,
      `async findBelowThreshold(threshold: number): Promise<readonly ProductInventoryEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.available.value > 0 && e.available.value <= threshold);
  }`,
      `async findOutOfStock(): Promise<readonly ProductInventoryEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.available.value === 0);
  }`,
      `async findCritical(threshold: number): Promise<readonly ProductInventoryEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.available.value > 0 && e.available.value <= threshold);
  }`,
      `async adjustBatch(
    adjustments: readonly { id: string; delta: number }[],
  ): Promise<void> {
    for (const adj of adjustments) {
      const existing = await this.findById(adj.id);
      if (!existing) continue;
      try {
        existing.adjust(adj.delta);
        await this.save(existing);
      } catch {
        // skip on error
      }
    }
  }`,
      `async softDelete(id: string): Promise<void> {
    return this.softDeleteById(id);
  }`,
    ],
  },

  // ═══════════════════════════════════════════
  // 5. PRODUCT PRICING
  // ═══════════════════════════════════════════
  {
    file: 'product-pricing.memory.repository.ts',
    entity: 'ProductPricingEntity',
    className: 'ProductPricing',
    entityPath: '../../../../domain/entities/product-pricing.entity.js',
    interfaceName: 'ProductPricingRepository',
    interfacePath: '../../../../domain/repositories/product-pricing.repository.interface.js',
    voImports: [
      { name: 'PriceIdVO', path: '../../../../domain/value-objects/primitives/price-id.vo.js' },
      { name: 'ProductIdVO', path: '../../../../domain/value-objects/primitives/product-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: PriceIdVO): Promise<ProductPricingEntity | null> {
    return this.findById(id.value);
  }`,
      `async findByProduct(productId: ProductIdVO): Promise<ProductPricingEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.vo.productId.value === productId.value) ?? null;
  }`,
      `async findPaginated(options: {
    page: number;
    limit: number;
    sortBy?: string;
    sortDir?: 'asc' | 'desc';
    filter?: unknown;
  }): Promise<{
    items: readonly ProductPricingEntity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const all = await this.findAll();
    const start = (options.page - 1) * options.limit;
    return {
      items: all.slice(start, start + options.limit),
      total: all.length,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(all.length / options.limit),
    };
  }`,
      `async getStats(): Promise<{
    total: number;
    averageSellingPrice: number;
    minPrice: number;
    maxPrice: number;
    discountedCount: number;
    byCurrency: Readonly<Record<string, number>>;
  }> {
    const all = await this.findAll();
    if (all.length === 0) {
      return { total: 0, averageSellingPrice: 0, minPrice: 0, maxPrice: 0, discountedCount: 0, byCurrency: {} };
    }
    const prices = all.map((p) => p.sellingPrice.value);
    const sum = prices.reduce((a, b) => a + b, 0);
    const byCurrency: Record<string, number> = {};
    let discountedCount = 0;
    for (const p of all) {
      byCurrency[p.currency.value] = (byCurrency[p.currency.value] ?? 0) + 1;
      if (p.hasDiscount()) discountedCount++;
    }
    return {
      total: all.length,
      averageSellingPrice: Math.round((sum / all.length) * 100) / 100,
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
      discountedCount,
      byCurrency,
    };
  }`,
      `async findExpired(at: string): Promise<readonly ProductPricingEntity[]> {
    const now = Date.parse(at);
    const all = await this.findAll();
    return all.filter((e) => e.effectiveTo && Date.parse(e.effectiveTo) < now);
  }`,
      `async findExpiringSoon(
    withinHours: number,
    at: string,
  ): Promise<readonly ProductPricingEntity[]> {
    const now = Date.parse(at);
    const cutoff = now + withinHours * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => {
      if (!e.effectiveTo) return false;
      const t = Date.parse(e.effectiveTo);
      return t >= now && t <= cutoff;
    });
  }`,
      `async softDelete(id: string): Promise<void> {
    return this.softDeleteById(id);
  }`,
    ],
  },

  // ═══════════════════════════════════════════
  // 6. PRODUCT PRICING RULE
  // ═══════════════════════════════════════════
  {
    file: 'product-pricing-rule.memory.repository.ts',
    entity: 'ProductPricingRuleEntity',
    className: 'ProductPricingRule',
    entityPath: '../../../../domain/entities/product-pricing-rule.entity.js',
    interfaceName: 'ProductPricingRuleRepository',
    interfacePath: '../../../../domain/repositories/product-pricing-rule.repository.interface.js',
    voImports: [
      { name: 'PricingRuleIdVO', path: '../../../../domain/value-objects/primitives/pricing-rule-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: PricingRuleIdVO): Promise<ProductPricingRuleEntity | null> {
    return this.findById(id.value);
  }`,
      `async findActiveByPriority(): Promise<readonly ProductPricingRuleEntity[]> {
    const all = await this.findAll();
    return all
      .filter((e) => e.isActive)
      .sort((a, b) => a.priority - b.priority);
  }`,
      `async findByType(type: string): Promise<readonly ProductPricingRuleEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.vo.type.value === type);
  }`,
      `async findPaginated(options: {
    page: number;
    limit: number;
    sortBy?: string;
    sortDir?: 'asc' | 'desc';
    filter?: unknown;
  }): Promise<{
    items: readonly ProductPricingRuleEntity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const all = await this.findAll();
    const start = (options.page - 1) * options.limit;
    return {
      items: all.slice(start, start + options.limit),
      total: all.length,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(all.length / options.limit),
    };
  }`,
      `async softDelete(id: string): Promise<void> {
    return this.softDeleteById(id);
  }`,
    ],
  },

  // ═══════════════════════════════════════════
  // 7. PRODUCT COLLECTION
  // ═══════════════════════════════════════════
  {
    file: 'product-collection.memory.repository.ts',
    entity: 'ProductCollectionEntity',
    className: 'ProductCollection',
    entityPath: '../../../../domain/entities/product-collection.entity.js',
    interfaceName: 'ProductCollectionRepository',
    interfacePath: '../../../../domain/repositories/product-collection.repository.interface.js',
    voImports: [
      { name: 'CollectionIdVO', path: '../../../../domain/value-objects/primitives/collection-id.vo.js' },
      { name: 'ProductIdVO', path: '../../../../domain/value-objects/primitives/product-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: CollectionIdVO): Promise<ProductCollectionEntity | null> {
    return this.findById(id.value);
  }`,
      `async existsBySlug(slug: string): Promise<boolean> {
    const all = await this.findAll();
    return all.some((e) => e.slug === slug);
  }`,
      `async findBySlug(slug: string): Promise<ProductCollectionEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.slug === slug) ?? null;
  }`,
      `async findByType(type: string): Promise<readonly ProductCollectionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.type.value === type);
  }`,
      `async findFeatured(limit = 20): Promise<readonly ProductCollectionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.vo.isFeatured).slice(0, limit);
  }`,
      `async findActive(at: string): Promise<readonly ProductCollectionEntity[]> {
    const now = Date.parse(at);
    const all = await this.findAll();
    return all.filter((e) => {
      if (e.vo.startAt && Date.parse(e.vo.startAt) > now) return false;
      if (e.vo.endAt && Date.parse(e.vo.endAt) < now) return false;
      return true;
    });
  }`,
      `async findByProduct(productId: ProductIdVO): Promise<readonly ProductCollectionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.vo.productIds.some((p) => p.value === productId.value));
  }`,
      `async findPaginated(options: {
    page: number;
    limit: number;
    sortBy?: string;
    sortDir?: 'asc' | 'desc';
    filter?: unknown;
  }): Promise<{
    items: readonly ProductCollectionEntity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const all = await this.findAll();
    const start = (options.page - 1) * options.limit;
    return {
      items: all.slice(start, start + options.limit),
      total: all.length,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(all.length / options.limit),
    };
  }`,
      `async getStats(): Promise<{
    total: number;
    activeCount: number;
    featuredCount: number;
    totalProductRefs: number;
    byType: Readonly<Record<string, number>>;
  }> {
    const all = await this.findAll();
    let activeCount = 0;
    let featuredCount = 0;
    let totalProductRefs = 0;
    const byType: Record<string, number> = {};
    for (const c of all) {
      byType[c.type.value] = (byType[c.type.value] ?? 0) + 1;
      if (c.isActive) activeCount++;
      if (c.vo.isFeatured) featuredCount++;
      totalProductRefs += c.vo.productCount;
    }
    return { total: all.length, activeCount, featuredCount, totalProductRefs, byType };
  }`,
      `async findExpired(at: string): Promise<readonly ProductCollectionEntity[]> {
    const now = Date.parse(at);
    const all = await this.findAll();
    return all.filter((e) => e.vo.endAt && Date.parse(e.vo.endAt) < now);
  }`,
      `async findScheduledToActivate(
    at: string,
  ): Promise<readonly ProductCollectionEntity[]> {
    const now = Date.parse(at);
    const all = await this.findAll();
    return all.filter((e) => e.vo.startAt && Date.parse(e.vo.startAt) <= now);
  }`,
      `async softDelete(id: string): Promise<void> {
    return this.softDeleteById(id);
  }`,
    ],
  },

  // ═══════════════════════════════════════════
  // 8. PRODUCT REVIEW
  // ═══════════════════════════════════════════
  {
    file: 'product-review.memory.repository.ts',
    entity: 'ProductReviewEntity',
    className: 'ProductReview',
    entityPath: '../../../../domain/entities/product-review.entity.js',
    interfaceName: 'ProductReviewRepository',
    interfacePath: '../../../../domain/repositories/product-review.repository.interface.js',
    voImports: [
      { name: 'ReviewIdVO', path: '../../../../domain/value-objects/primitives/review-id.vo.js' },
      { name: 'ProductIdVO', path: '../../../../domain/value-objects/primitives/product-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: ReviewIdVO): Promise<ProductReviewEntity | null> {
    return this.findById(id.value);
  }`,
      `async existsByProductAndUser(
    productId: ProductIdVO,
    userId: string,
  ): Promise<boolean> {
    const all = await this.findAll();
    return all.some(
      (e) => e.vo.productId.value === productId.value && e.userId === userId,
    );
  }`,
      `async findByProductAndUser(
    productId: ProductIdVO,
    userId: string,
  ): Promise<ProductReviewEntity | null> {
    const all = await this.findAll();
    return (
      all.find(
        (e) => e.vo.productId.value === productId.value && e.userId === userId,
      ) ?? null
    );
  }`,
      `async findByProduct(productId: ProductIdVO): Promise<readonly ProductReviewEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.vo.productId.value === productId.value);
  }`,
      `async findApprovedByProduct(
    productId: ProductIdVO,
  ): Promise<readonly ProductReviewEntity[]> {
    const all = await this.findAll();
    return all.filter(
      (e) => e.vo.productId.value === productId.value && e.status.isApproved(),
    );
  }`,
      `async findByUser(userId: string): Promise<readonly ProductReviewEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId === userId);
  }`,
      `async findByStatus(status: string): Promise<readonly ProductReviewEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.status.value === status);
  }`,
      `async findPaginated(options: {
    page: number;
    limit: number;
    sortBy?: string;
    sortDir?: 'asc' | 'desc';
    filter?: unknown;
  }): Promise<{
    items: readonly ProductReviewEntity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const all = await this.findAll();
    const start = (options.page - 1) * options.limit;
    return {
      items: all.slice(start, start + options.limit),
      total: all.length,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(all.length / options.limit),
    };
  }`,
      `async getSummary(productId: ProductIdVO): Promise<{
    productId: string;
    totalReviews: number;
    averageRating: number;
    ratingDistribution: { 1: number; 2: number; 3: number; 4: number; 5: number };
    verifiedCount: number;
    approvedCount: number;
    pendingCount: number;
  }> {
    const all = await this.findAll();
    const forProduct = all.filter((e) => e.vo.productId.value === productId.value);
    const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
    };
    let sum = 0;
    let verifiedCount = 0;
    let approvedCount = 0;
    let pendingCount = 0;
    for (const r of forProduct) {
      sum += r.rating.value;
      const k = r.rating.value as 1 | 2 | 3 | 4 | 5;
      dist[k]++;
      if (r.vo.isVerifiedPurchase) verifiedCount++;
      if (r.status.isApproved()) approvedCount++;
      if (r.status.isPending()) pendingCount++;
    }
    return {
      productId: productId.value,
      totalReviews: forProduct.length,
      averageRating:
        forProduct.length > 0
          ? Math.round((sum / forProduct.length) * 100) / 100
          : 0,
      ratingDistribution: dist,
      verifiedCount,
      approvedCount,
      pendingCount,
    };
  }`,
      `async countByProduct(productId: ProductIdVO): Promise<number> {
    return (await this.findByProduct(productId)).length;
  }`,
      `async findPendingOlderThan(hours: number): Promise<readonly ProductReviewEntity[]> {
    const cutoff = Date.now() - hours * 3600 * 1000;
    const all = await this.findAll();
    return all.filter(
      (e) => e.status.isPending() && Date.parse(e.createdAt) < cutoff,
    );
  }`,
      `async findFlagged(threshold: number): Promise<readonly ProductReviewEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.reportCount >= threshold);
  }`,
      `async softDelete(id: string): Promise<void> {
    return this.softDeleteById(id);
  }`,
    ],
  },

  // ═══════════════════════════════════════════
  // 9. PRODUCT MEDIA
  // ═══════════════════════════════════════════
  {
    file: 'product-media.memory.repository.ts',
    entity: 'ProductMediaEntity',
    className: 'ProductMedia',
    entityPath: '../../../../domain/entities/product-media.entity.js',
    interfaceName: 'ProductMediaRepository',
    interfacePath: '../../../../domain/repositories/product-media.repository.interface.js',
    voImports: [
      { name: 'ProductIdVO', path: '../../../../domain/value-objects/primitives/product-id.vo.js' },
    ],
    customMethods: [
      `async findByProduct(productId: ProductIdVO): Promise<ProductMediaEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.vo.productId === productId.value) ?? null;
  }`,
      `async findAllByProduct(productId: ProductIdVO): Promise<readonly ProductMediaEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.vo.productId === productId.value);
  }`,
      `async deleteByProduct(productId: ProductIdVO): Promise<number> {
    const items = await this.findAllByProduct(productId);
    for (const i of items) await this.softDeleteById(i.id);
    return items.length;
  }`,
      `async softDelete(id: string): Promise<void> {
    return this.softDeleteById(id);
  }`,
    ],
  },

  // ═══════════════════════════════════════════
  // 10. BRAND
  // ═══════════════════════════════════════════
  {
    file: 'brand.memory.repository.ts',
    entity: 'BrandEntity',
    className: 'Brand',
    entityPath: '../../../../domain/entities/brand.entity.js',
    interfaceName: 'BrandRepository',
    interfacePath: '../../../../domain/repositories/brand.repository.interface.js',
    voImports: [
      { name: 'BrandIdVO', path: '../../../../domain/value-objects/primitives/brand-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: BrandIdVO): Promise<BrandEntity | null> {
    return this.findById(id.value);
  }`,
      `async existsBySlug(slug: string): Promise<boolean> {
    const all = await this.findAll();
    return all.some((e) => e.slug.value === slug);
  }`,
      `async findBySlug(slug: string): Promise<BrandEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.slug.value === slug) ?? null;
  }`,
      `async findByStatus(status: string): Promise<readonly BrandEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.vo.status === status);
  }`,
      `async findFeatured(limit = 20): Promise<readonly BrandEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.vo.isFeatured).slice(0, limit);
  }`,
      `async findPaginated(options: {
    page: number;
    limit: number;
    sortBy?: string;
    sortDir?: 'asc' | 'desc';
    filter?: unknown;
  }): Promise<{
    items: readonly BrandEntity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const all = await this.findAll();
    const start = (options.page - 1) * options.limit;
    return {
      items: all.slice(start, start + options.limit),
      total: all.length,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(all.length / options.limit),
    };
  }`,
      `async getStats(): Promise<{
    total: number;
    activeCount: number;
    featuredCount: number;
    totalProducts: number;
  }> {
    const all = await this.findAll();
    let activeCount = 0;
    let featuredCount = 0;
    let totalProducts = 0;
    for (const b of all) {
      if (b.vo.status === 'active') activeCount++;
      if (b.vo.isFeatured) featuredCount++;
      totalProducts += b.vo.productCount;
    }
    return { total: all.length, activeCount, featuredCount, totalProducts };
  }`,
      `async search(term: string, limit = 20): Promise<readonly BrandEntity[]> {
    const lower = term.trim().toLowerCase();
    const all = await this.findAll();
    return all
      .filter((e) => e.name.value.toLowerCase().includes(lower))
      .slice(0, limit);
  }`,
      `async softDelete(id: string): Promise<void> {
    return this.softDeleteById(id);
  }`,
    ],
  },

  // ═══════════════════════════════════════════
  // 11. CATEGORY
  // ═══════════════════════════════════════════
  {
    file: 'category.memory.repository.ts',
    entity: 'CategoryEntity',
    className: 'Category',
    entityPath: '../../../../domain/entities/category.entity.js',
    interfaceName: 'CategoryRepository',
    interfacePath: '../../../../domain/repositories/category.repository.interface.js',
    voImports: [
      { name: 'CategoryIdVO', path: '../../../../domain/value-objects/primitives/category-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: CategoryIdVO): Promise<CategoryEntity | null> {
    return this.findById(id.value);
  }`,
      `async existsBySlug(slug: string): Promise<boolean> {
    const all = await this.findAll();
    return all.some((e) => e.slug.value === slug);
  }`,
      `async findBySlug(slug: string): Promise<CategoryEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.slug.value === slug) ?? null;
  }`,
      `async findRoots(): Promise<readonly CategoryEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => !e.parentId);
  }`,
      `async findChildren(parentId: CategoryIdVO): Promise<readonly CategoryEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.parentId?.value === parentId.value);
  }`,
      `async findDescendants(path: readonly string[]): Promise<readonly CategoryEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.path.value.some((p) => path.includes(p)));
  }`,
      `async findAncestors(id: CategoryIdVO): Promise<readonly CategoryEntity[]> {
    const self = await this.findById(id.value);
    if (!self) return [];
    const ancestorIds = self.path.value.slice(0, -1);
    const all = await this.findAll();
    return all.filter((e) => ancestorIds.includes(e.id));
  }`,
      `async findFeatured(limit = 20): Promise<readonly CategoryEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.vo.isFeatured).slice(0, limit);
  }`,
      `async findByStatus(status: string): Promise<readonly CategoryEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.vo.status === status);
  }`,
      `async findPaginated(options: {
    page: number;
    limit: number;
    sortBy?: string;
    sortDir?: 'asc' | 'desc';
    filter?: unknown;
  }): Promise<{
    items: readonly CategoryEntity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const all = await this.findAll();
    const start = (options.page - 1) * options.limit;
    return {
      items: all.slice(start, start + options.limit),
      total: all.length,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(all.length / options.limit),
    };
  }`,
      `async getStats(): Promise<{
    total: number;
    activeCount: number;
    rootCount: number;
    maxDepth: number;
    totalProducts: number;
    byDepth: Readonly<Record<number, number>>;
  }> {
    const all = await this.findAll();
    let activeCount = 0;
    let rootCount = 0;
    let maxDepth = 0;
    let totalProducts = 0;
    const byDepth: Record<number, number> = {};
    for (const c of all) {
      if (c.vo.status === 'active') activeCount++;
      if (!c.parentId) rootCount++;
      const depth = c.depth;
      if (depth > maxDepth) maxDepth = depth;
      byDepth[depth] = (byDepth[depth] ?? 0) + 1;
      totalProducts += c.vo.productCount;
    }
    return { total: all.length, activeCount, rootCount, maxDepth, totalProducts, byDepth };
  }`,
      `async countChildren(parentId: CategoryIdVO): Promise<number> {
    return (await this.findChildren(parentId)).length;
  }`,
      `async loadTree(): Promise<readonly CategoryEntity[]> {
    return this.findAll();
  }`,
      `async reorder(orders: readonly { id: string; sortOrder: number }[]): Promise<void> {
    for (const o of orders) {
      const existing = await this.findById(o.id);
      if (existing) {
        const newVO = (existing.vo as unknown as { value: { sortOrder: number } }).value;
        void newVO;
      }
    }
  }`,
      `async softDelete(id: string): Promise<void> {
    return this.softDeleteById(id);
  }`,
    ],
  },
];

// ─────────────────────────────────────────────
// Generator function
// ─────────────────────────────────────────────
function generateRepo(spec) {
  const voImports = spec.voImports
    .map((v) => `import type { ${v.name} } from '${v.path}';`)
    .join('\n');

  const customMethods = spec.customMethods.join('\n\n  ');

  return `/**
 * ${spec.entity} In-Memory Repository
 * @module product-service/infrastructure/persistence/memory/repositories
 *
 * Implements: ${spec.interfaceName}
 * Auto-generated by scripts/generate-inmemory-repos.mjs
 */
import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { ${spec.entity} } from '${spec.entityPath}';
import type { ${spec.interfaceName} } from '${spec.interfacePath}';
${voImports}

@Injectable()
export class InMemory${spec.className}Repository
  extends InMemoryRepository<${spec.entity}, string>
  implements ${spec.interfaceName}
{
  protected idOf(entity: ${spec.entity}): string {
    return entity.id;
  }

  ${customMethods}
}
`;
}

// ─────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────
function main() {
  if (!existsSync(MEMORY_DIR)) {
    mkdirSync(MEMORY_DIR, { recursive: true });
  }

  console.log(`📦 Generating ${SPECS.length} InMemory repositories...`);
  console.log('');

  let generated = 0;
  let failed = 0;

  for (const spec of SPECS) {
    const target = join(MEMORY_DIR, spec.file);
    try {
      writeFileSync(target, generateRepo(spec), 'utf8');
      console.log(`  ✅ ${spec.file}`);
      generated++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ❌ ${spec.file} — ${msg}`);
      failed++;
    }
  }

  console.log('');
  console.log(`📊 Summary: ${generated} generated, ${failed} failed, ${SPECS.length} total`);
}

main();
