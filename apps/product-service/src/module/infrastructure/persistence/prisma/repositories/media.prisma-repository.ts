/**
 * MediaPrismaRepository
 */
import { Injectable } from '@nestjs/common';
import type { PrismaClient } from '@prisma/client';
import { PrismaService } from '@vubon/shared-kernel/prisma';
import { BasePrismaRepository, type PrismaDelegate } from '@vubon/shared-kernel/prisma';
import { ProductMediaEntity, type ProductMediaType } from '../../../../domain/entities/product-media.entity.js';
import type { MediaRepository } from '../../../../domain/repositories/media.repository.interface.js';

interface PrismaMediaRow {
  id: string;
  productId: string;
  type: string;
  url: string;
  thumbnailUrl: string | null;
  alt: string | null;
  sortOrder: number;
  sizeBytes: number | null;
  mimeType: string | null;
  width: number | null;
  height: number | null;
  isPrimary: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

@Injectable()
export class MediaPrismaRepository
  extends BasePrismaRepository<ProductMediaEntity, PrismaMediaRow, string>
  implements MediaRepository
{
  protected readonly model: PrismaDelegate<PrismaMediaRow>;

  constructor(private readonly prismaService: PrismaService) {
    super();
    const client = this.prismaService as unknown as { productMedia: PrismaDelegate<PrismaMediaRow> };
    this.model = client.productMedia;
  }

  private get client(): PrismaClient {
    return this.prismaService as unknown as PrismaClient;
  }

  protected toDomain(raw: PrismaMediaRow): ProductMediaEntity {
    return ProductMediaEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
      props: {
        productId: raw.productId,
        type: raw.type as ProductMediaType,
        url: raw.url,
        thumbnailUrl: raw.thumbnailUrl ?? undefined,
        alt: raw.alt ?? undefined,
        sortOrder: raw.sortOrder,
        sizeBytes: raw.sizeBytes ?? undefined,
        mimeType: raw.mimeType ?? undefined,
        width: raw.width ?? undefined,
        height: raw.height ?? undefined,
        isPrimary: raw.isPrimary,
      },
    });
  }

  protected toPersistence(domain: ProductMediaEntity): Record<string, unknown> {
    return {
      id: domain.id,
      productId: domain.productId,
      type: domain.type,
      url: domain.url,
      thumbnailUrl: domain.thumbnailUrl ?? null,
      alt: domain.alt ?? null,
      sortOrder: domain.sortOrder,
      sizeBytes: domain.sizeBytes ?? null,
      mimeType: domain.mimeType ?? null,
      width: domain.width ?? null,
      height: domain.height ?? null,
      isPrimary: domain.isPrimary,
      deletedAt: domain.deletedAt ? new Date(domain.deletedAt) : null,
    };
  }

  protected idOf(domain: ProductMediaEntity): string { return domain.id; }
  protected whereForId(id: string): Record<string, unknown> { return { id }; }

  async findByProductId(productId: string): Promise<readonly ProductMediaEntity[]> {
    const rows = await this.client.productMedia.findMany({
      where: { productId, deletedAt: null },
      orderBy: { sortOrder: 'asc' },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaMediaRow));
  }

  async findPrimaryByProductId(productId: string): Promise<ProductMediaEntity | null> {
    const raw = await this.client.productMedia.findFirst({
      where: { productId, isPrimary: true, deletedAt: null },
    });
    return raw ? this.toDomain(raw as unknown as PrismaMediaRow) : null;
  }

  async findImagesByProductId(productId: string): Promise<readonly ProductMediaEntity[]> {
    const rows = await this.client.productMedia.findMany({
      where: { productId, type: 'image', deletedAt: null },
      orderBy: { sortOrder: 'asc' },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaMediaRow));
  }

  async countByProductId(productId: string): Promise<number> {
    return this.client.productMedia.count({ where: { productId, deletedAt: null } });
  }

  async deleteByProductId(productId: string): Promise<number> {
    const result = await this.client.productMedia.deleteMany({ where: { productId } });
    return result.count;
  }

  async reorder(productId: string, orderedIds: readonly string[]): Promise<void> {
    await this.client.$transaction(
      orderedIds.map((id, index) =>
        this.client.productMedia.update({
          where: { id },
          data: { sortOrder: index },
        }),
      ),
    );
    void productId;
  }

  async clearPrimaryForProduct(productId: string): Promise<void> {
    await this.client.productMedia.updateMany({
      where: { productId, isPrimary: true },
      data: { isPrimary: false },
    });
  }
}
