/**
 * CollectionPrismaRepository
 */
import { Injectable } from '@nestjs/common';
import type { PrismaClient } from '@prisma/client';
import { PrismaService } from '@vubon/shared-kernel/prisma';
import { BasePrismaRepository, type PrismaDelegate } from '@vubon/shared-kernel/prisma';
import { CollectionEntity } from '../../../../domain/entities/collection.entity.js';
import type {
  CollectionRepository,
  CollectionPaginationOptions,
  CollectionPaginationResult,
} from '../../../../domain/repositories/collection.repository.interface.js';
import { CollectionIdVO } from '../../../../domain/value-objects/primitives/collection-id.vo.js';
import { CollectionNameVO } from '../../../../domain/value-objects/primitives/collection-name.vo.js';
import { CollectionSlugVO } from '../../../../domain/value-objects/primitives/collection-slug.vo.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';

interface PrismaCollectionRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  type: string;
  status: string;
  imageUrl: string | null;
  bannerUrl: string | null;
  productCount: number;
  isFeatured: boolean;
  sortOrder: number;
  startAt: Date | null;
  endAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

@Injectable()
export class CollectionPrismaRepository
  extends BasePrismaRepository<CollectionEntity, PrismaCollectionRow, string>
  implements CollectionRepository
{
  protected readonly model: PrismaDelegate<PrismaCollectionRow>;

  constructor(private readonly prismaService: PrismaService) {
    super();
    const client = this.prismaService as unknown as { collection: PrismaDelegate<PrismaCollectionRow> };
    this.model = client.collection;
  }

  private get client(): PrismaClient {
    return this.prismaService as unknown as PrismaClient;
  }

  private async loadProductIds(collectionId: string): Promise<readonly string[]> {
    const rows = await this.client.collectionProduct.findMany({
      where: { collectionId },
      orderBy: { sortOrder: 'asc' },
      select: { productId: true },
    });
    return rows.map((r) => r.productId);
  }

  protected toDomain(raw: PrismaCollectionRow): CollectionEntity {
    // Sync version — caller should use `withProductIds` for full load
    return CollectionEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
      props: {
        name: CollectionNameVO.reconstitute(raw.name),
        slug: CollectionSlugVO.reconstitute(raw.slug),
        description: raw.description ?? undefined,
        type: raw.type,
        status: raw.status,
        imageUrl: raw.imageUrl ?? undefined,
        bannerUrl: raw.bannerUrl ?? undefined,
        productIds: [],
        isFeatured: raw.isFeatured,
        sortOrder: raw.sortOrder,
        startAt: raw.startAt ? raw.startAt.toISOString() : undefined,
        endAt: raw.endAt ? raw.endAt.toISOString() : undefined,
      },
    });
  }

  private async toDomainFull(raw: PrismaCollectionRow): Promise<CollectionEntity> {
    const productIds = await this.loadProductIds(raw.id);
    return CollectionEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
      props: {
        name: CollectionNameVO.reconstitute(raw.name),
        slug: CollectionSlugVO.reconstitute(raw.slug),
        description: raw.description ?? undefined,
        type: raw.type,
        status: raw.status,
        imageUrl: raw.imageUrl ?? undefined,
        bannerUrl: raw.bannerUrl ?? undefined,
        productIds,
        isFeatured: raw.isFeatured,
        sortOrder: raw.sortOrder,
        startAt: raw.startAt ? raw.startAt.toISOString() : undefined,
        endAt: raw.endAt ? raw.endAt.toISOString() : undefined,
      },
    });
  }

  protected toPersistence(domain: CollectionEntity): Record<string, unknown> {
    return {
      id: domain.id,
      name: domain.name.value,
      slug: domain.slug.value,
      description: domain.description ?? null,
      type: domain.type,
      status: domain.status,
      imageUrl: domain.imageUrl ?? null,
      bannerUrl: domain.bannerUrl ?? null,
      productCount: domain.productCount,
      isFeatured: domain.isFeatured,
      sortOrder: domain.sortOrder,
      startAt: domain.startAt ? new Date(domain.startAt) : null,
      endAt: domain.endAt ? new Date(domain.endAt) : null,
      deletedAt: domain.deletedAt ? new Date(domain.deletedAt) : null,
    };
  }

  protected idOf(domain: CollectionEntity): string { return domain.id; }
  protected whereForId(id: string): Record<string, unknown> { return { id }; }

  async findById(id: string): Promise<CollectionEntity | null> {
    const raw = await this.client.collection.findUnique({ where: { id } });
    return raw ? this.toDomainFull(raw as unknown as PrismaCollectionRow) : null;
  }

  async findByIdVO(id: CollectionIdVO): Promise<CollectionEntity | null> {
    return this.findById(id.value);
  }

  async findBySlug(slug: CollectionSlugVO): Promise<CollectionEntity | null> {
    const raw = await this.client.collection.findUnique({ where: { slug: slug.value } });
    return raw ? this.toDomainFull(raw as unknown as PrismaCollectionRow) : null;
  }

  async existsBySlug(slug: CollectionSlugVO): Promise<boolean> {
    const count = await this.client.collection.count({ where: { slug: slug.value } });
    return count > 0;
  }

  async findByProductId(productId: ProductIdVO): Promise<readonly CollectionEntity[]> {
    const links = await this.client.collectionProduct.findMany({
      where: { productId: productId.value },
      select: { collectionId: true },
    });
    if (links.length === 0) return [];
    const rows = await this.client.collection.findMany({
      where: { id: { in: links.map((l) => l.collectionId) }, deletedAt: null },
    });
    return Promise.all(rows.map((r) => this.toDomainFull(r as unknown as PrismaCollectionRow)));
  }

  async findFeatured(limit = 20): Promise<readonly CollectionEntity[]> {
    const rows = await this.client.collection.findMany({
      where: { isFeatured: true, deletedAt: null },
      take: limit,
    });
    return Promise.all(rows.map((r) => this.toDomainFull(r as unknown as PrismaCollectionRow)));
  }

  async findActive(now: string): Promise<readonly CollectionEntity[]> {
    const t = new Date(now);
    const rows = await this.client.collection.findMany({
      where: {
        status: 'active',
        deletedAt: null,
        OR: [
          { startAt: null },
          { startAt: { lte: t } },
        ],
        AND: [
          { OR: [{ endAt: null }, { endAt: { gte: t } }] },
        ],
      },
    });
    return Promise.all(rows.map((r) => this.toDomainFull(r as unknown as PrismaCollectionRow)));
  }

  async findPaginated(options: CollectionPaginationOptions): Promise<CollectionPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (options.type) where.type = options.type;
    if (options.status) where.status = options.status;
    if (options.isFeatured !== undefined) where.isFeatured = options.isFeatured;

    const [rows, total] = await Promise.all([
      this.client.collection.findMany({
        where,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.client.collection.count({ where }),
    ]);
    const items = await Promise.all(
      rows.map((r) => this.toDomainFull(r as unknown as PrismaCollectionRow)),
    );
    return { items, total, page: options.page, limit: options.limit };
  }

  async addProduct(collectionId: string, productId: ProductIdVO): Promise<void> {
    await this.client.collectionProduct.upsert({
      where: { collectionId_productId: { collectionId, productId: productId.value } },
      update: {},
      create: { collectionId, productId: productId.value },
    });
    await this.client.collection.update({
      where: { id: collectionId },
      data: { productCount: { increment: 1 } },
    });
  }

  async removeProduct(collectionId: string, productId: ProductIdVO): Promise<void> {
    await this.client.collectionProduct.deleteMany({
      where: { collectionId, productId: productId.value },
    });
    await this.client.collection.update({
      where: { id: collectionId },
      data: { productCount: { decrement: 1 } },
    });
  }

  async countByProductId(productId: ProductIdVO): Promise<number> {
    return this.client.collectionProduct.count({ where: { productId: productId.value } });
  }
}
