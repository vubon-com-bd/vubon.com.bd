/**
 * ProductPrismaRepository
 * @module product-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { PrismaClient } from '@prisma/client';
import { PrismaService } from '@vubon/shared-kernel/prisma';
import { BasePrismaRepository, type PrismaDelegate } from '@vubon/shared-kernel/prisma';
import { ProductEntity } from '../../../../domain/entities/product.entity.js';
import type {
  ProductRepository,
  ProductListOptions,
  ProductPaginationResult,
} from '../../../../domain/repositories/product.repository.interface.js';
import { ProductNameVO } from '../../../../domain/value-objects/primitives/product-name.vo.js';
import { ProductSlugVO } from '../../../../domain/value-objects/primitives/product-slug.vo.js';
import { ProductSkuVO } from '../../../../domain/value-objects/primitives/product-sku.vo.js';
import { ProductStatusVO } from '../../../../domain/value-objects/primitives/product-status.vo.js';
import { ProductTypeVO } from '../../../../domain/value-objects/primitives/product-type.vo.js';
import { ProductDescriptionVO } from '../../../../domain/value-objects/primitives/product-description.vo.js';
import { CategoryIdVO } from '../../../../domain/value-objects/primitives/category-id.vo.js';
import { BrandIdVO } from '../../../../domain/value-objects/primitives/brand-id.vo.js';
import { PriceVO } from '../../../../domain/value-objects/primitives/price.vo.js';
import type { CurrencyCode } from '@vubon/shared-types/common';

interface PrismaProductRow {
  id: string;
  name: string;
  slug: string;
  sku: string;
  barcode: string | null;
  type: string;
  status: string;
  description: string | null;
  shortDescription: string | null;
  categoryId: string;
  brandId: string | null;
  vendorId: string | null;
  price: { toNumber(): number } | number;
  compareAtPrice: { toNumber(): number } | number | null;
  currency: string;
  tags: string[];
  images: string[];
  thumbnailUrl: string | null;
  videoUrl: string | null;
  totalStock: number;
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt: Date | null;
  weight: { toNumber(): number } | number | null;
  dimensions: unknown;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

@Injectable()
export class ProductPrismaRepository
  extends BasePrismaRepository<ProductEntity, PrismaProductRow, string>
  implements ProductRepository
{
  protected readonly model: PrismaDelegate<PrismaProductRow>;

  constructor(private readonly prismaService: PrismaService) {
    super();
    const client = this.prismaService as unknown as { product: PrismaDelegate<PrismaProductRow> };
    this.model = client.product;
  }

  private get client(): PrismaClient {
    return this.prismaService as unknown as PrismaClient;
  }

  private num(v: { toNumber(): number } | number | null | undefined): number {
    if (v === null || v === undefined) return 0;
    if (typeof v === 'number') return v;
    return v.toNumber();
  }

  private numOrNull(v: { toNumber(): number } | number | null | undefined): number | undefined {
    if (v === null || v === undefined) return undefined;
    if (typeof v === 'number') return v;
    return v.toNumber();
  }

  // ─── Base overrides ──────────────────────────────────────────

  protected toDomain(raw: PrismaProductRow): ProductEntity {
    return ProductEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
      props: {
        name: ProductNameVO.reconstitute(raw.name),
        slug: ProductSlugVO.reconstitute(raw.slug),
        sku: ProductSkuVO.reconstitute(raw.sku),
        type: ProductTypeVO.reconstitute(raw.type),
        status: ProductStatusVO.reconstitute(raw.status),
        description: ProductDescriptionVO.reconstitute(raw.description ?? ''),
        shortDescription: raw.shortDescription ?? undefined,
        categoryId: CategoryIdVO.reconstitute(raw.categoryId),
        brandId: raw.brandId ? BrandIdVO.reconstitute(raw.brandId) : undefined,
        vendorId: raw.vendorId ?? undefined,
        price: PriceVO.reconstitute(this.num(raw.price), raw.currency as CurrencyCode),
        compareAtPrice: raw.compareAtPrice
          ? PriceVO.reconstitute(this.num(raw.compareAtPrice), raw.currency as CurrencyCode)
          : undefined,
        tags: raw.tags,
        images: raw.images,
        thumbnailUrl: raw.thumbnailUrl ?? undefined,
        videoUrl: raw.videoUrl ?? undefined,
        totalStock: raw.totalStock,
        variantIds: [],
        isFeatured: raw.isFeatured,
        isPublished: raw.isPublished,
        publishedAt: raw.publishedAt ? raw.publishedAt.toISOString() : undefined,
        weight: this.numOrNull(raw.weight),
        barcode: raw.barcode ?? undefined,
      },
    });
  }

  protected toPersistence(domain: ProductEntity): Record<string, unknown> {
    return {
      id: domain.id,
      name: domain.name.value,
      slug: domain.slug.value,
      sku: domain.sku.value,
      barcode: domain.barcode ?? null,
      type: domain.type.value,
      status: domain.status.value,
      description: domain.description.value || null,
      shortDescription: domain.shortDescription ?? null,
      categoryId: domain.categoryId.value,
      brandId: domain.brandId?.value ?? null,
      vendorId: domain.vendorId ?? null,
      price: domain.price.amount,
      compareAtPrice: domain.compareAtPrice?.amount ?? null,
      currency: domain.price.currency,
      tags: [...domain.tags],
      images: [...domain.images],
      thumbnailUrl: domain.thumbnailUrl ?? null,
      videoUrl: domain.videoUrl ?? null,
      totalStock: domain.totalStock,
      isFeatured: domain.isFeatured,
      isPublished: domain.isPublished,
      publishedAt: domain.publishedAt ? new Date(domain.publishedAt) : null,
      weight: domain.weight ?? null,
      deletedAt: domain.deletedAt ? new Date(domain.deletedAt) : null,
    };
  }

  protected idOf(domain: ProductEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  // ─── Custom queries ──────────────────────────────────────────

  async findBySlug(slug: ProductSlugVO): Promise<ProductEntity | null> {
    const raw = await this.client.product.findUnique({ where: { slug: slug.value } });
    return raw ? this.toDomain(raw as unknown as PrismaProductRow) : null;
  }

  async findBySku(sku: ProductSkuVO): Promise<ProductEntity | null> {
    const raw = await this.client.product.findUnique({ where: { sku: sku.value } });
    return raw ? this.toDomain(raw as unknown as PrismaProductRow) : null;
  }

  async existsBySlug(slug: ProductSlugVO): Promise<boolean> {
    const count = await this.client.product.count({ where: { slug: slug.value } });
    return count > 0;
  }

  async existsBySku(sku: ProductSkuVO): Promise<boolean> {
    const count = await this.client.product.count({ where: { sku: sku.value } });
    return count > 0;
  }

  async findByIdVO(id: { value: string }): Promise<ProductEntity | null> {
    return this.findById(id.value);
  }

  async findByIds(ids: readonly string[]): Promise<readonly ProductEntity[]> {
    const rows = await this.client.product.findMany({ where: { id: { in: [...ids] } } });
    return rows.map((r) => this.toDomain(r as unknown as PrismaProductRow));
  }

  async findByCategory(categoryId: CategoryIdVO): Promise<readonly ProductEntity[]> {
    const rows = await this.client.product.findMany({ where: { categoryId: categoryId.value } });
    return rows.map((r) => this.toDomain(r as unknown as PrismaProductRow));
  }

  async findByBrand(brandId: BrandIdVO): Promise<readonly ProductEntity[]> {
    const rows = await this.client.product.findMany({ where: { brandId: brandId.value } });
    return rows.map((r) => this.toDomain(r as unknown as PrismaProductRow));
  }

  async findFeatured(limit = 20): Promise<readonly ProductEntity[]> {
    const rows = await this.client.product.findMany({
      where: { isFeatured: true, isPublished: true, deletedAt: null },
      take: limit,
      orderBy: { updatedAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaProductRow));
  }

  async findPublished(): Promise<readonly ProductEntity[]> {
    const rows = await this.client.product.findMany({
      where: { isPublished: true, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaProductRow));
  }

  async findPaginated(options: ProductListOptions): Promise<ProductPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (options.filter) {
      const f = options.filter;
      if (f.status) where.status = f.status;
      if (f.type) where.type = f.type;
      if (f.categoryId) where.categoryId = f.categoryId;
      if (f.brandId) where.brandId = f.brandId;
      if (f.vendorId) where.vendorId = f.vendorId;
      if (f.isFeatured !== undefined) where.isFeatured = f.isFeatured;
      if (f.search) where.name = { contains: f.search, mode: 'insensitive' };
      if (f.minPrice !== undefined || f.maxPrice !== undefined) {
        const range: Record<string, number> = {};
        if (f.minPrice !== undefined) range.gte = f.minPrice;
        if (f.maxPrice !== undefined) range.lte = f.maxPrice;
        where.price = range;
      }
    }

    const [rows, total] = await Promise.all([
      this.client.product.findMany({
        where,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
        orderBy: { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' },
      }),
      this.client.product.count({ where }),
    ]);
    const items = rows.map((r) => this.toDomain(r as unknown as PrismaProductRow));
    return {
      items,
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async countByCategory(categoryId: CategoryIdVO): Promise<number> {
    return this.client.product.count({ where: { categoryId: categoryId.value, deletedAt: null } });
  }

  async countByBrand(brandId: BrandIdVO): Promise<number> {
    return this.client.product.count({ where: { brandId: brandId.value, deletedAt: null } });
  }

  async incrementCategoryCount(categoryId: CategoryIdVO): Promise<void> {
    await this.client.category.update({
      where: { id: categoryId.value },
      data: { productCount: { increment: 1 } },
    });
  }

  async decrementCategoryCount(categoryId: CategoryIdVO): Promise<void> {
    await this.client.category.update({
      where: { id: categoryId.value },
      data: { productCount: { decrement: 1 } },
    });
  }
}
