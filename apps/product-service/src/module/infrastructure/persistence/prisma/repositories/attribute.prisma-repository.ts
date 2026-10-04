/**
 * AttributePrismaRepository
 */
import { Injectable } from '@nestjs/common';
import type { PrismaClient } from '@prisma/client';
import { PrismaService } from '@vubon/shared-kernel/prisma';
import { BasePrismaRepository, type PrismaDelegate } from '@vubon/shared-kernel/prisma';
import {
  ProductAttributeEntity,
  type ProductAttributeOptionItem,
  type AttributeValuePrimitive,
} from '../../../../domain/entities/product-attribute.entity.js';
import type { AttributeRepository } from '../../../../domain/repositories/attribute.repository.interface.js';

interface PrismaAttributeRow {
  id: string;
  productId: string;
  name: string;
  slug: string;
  type: string;
  isRequired: boolean;
  isSearchable: boolean;
  isFilterable: boolean;
  unit: string | null;
  options: unknown;
  value: unknown;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

@Injectable()
export class AttributePrismaRepository
  extends BasePrismaRepository<ProductAttributeEntity, PrismaAttributeRow, string>
  implements AttributeRepository
{
  protected readonly model: PrismaDelegate<PrismaAttributeRow>;

  constructor(private readonly prismaService: PrismaService) {
    super();
    const client = this.prismaService as unknown as { productAttribute: PrismaDelegate<PrismaAttributeRow> };
    this.model = client.productAttribute;
  }

  private get client(): PrismaClient {
    return this.prismaService as unknown as PrismaClient;
  }

  protected toDomain(raw: PrismaAttributeRow): ProductAttributeEntity {
    return ProductAttributeEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
      props: {
        productId: raw.productId,
        name: raw.name,
        slug: raw.slug,
        type: raw.type,
        isRequired: raw.isRequired,
        isSearchable: raw.isSearchable,
        isFilterable: raw.isFilterable,
        unit: raw.unit ?? undefined,
        options: (raw.options as readonly ProductAttributeOptionItem[] | null) ?? undefined,
        value: (raw.value as AttributeValuePrimitive | null) ?? undefined,
      },
    });
  }

  protected toPersistence(domain: ProductAttributeEntity): Record<string, unknown> {
    return {
      id: domain.id,
      productId: domain.productId,
      name: domain.name,
      slug: domain.slug,
      type: domain.type,
      isRequired: domain.isRequired,
      isSearchable: domain.isSearchable,
      isFilterable: domain.isFilterable,
      unit: domain.unit ?? null,
      options: domain.options ?? null,
      value: domain.value ?? null,
      deletedAt: domain.deletedAt ? new Date(domain.deletedAt) : null,
    };
  }

  protected idOf(domain: ProductAttributeEntity): string { return domain.id; }
  protected whereForId(id: string): Record<string, unknown> { return { id }; }

  async findByProductId(productId: string): Promise<readonly ProductAttributeEntity[]> {
    const rows = await this.client.productAttribute.findMany({
      where: { productId, deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaAttributeRow));
  }

  async findBySlug(productId: string, slug: string): Promise<ProductAttributeEntity | null> {
    const raw = await this.client.productAttribute.findFirst({
      where: { productId, slug, deletedAt: null },
    });
    return raw ? this.toDomain(raw as unknown as PrismaAttributeRow) : null;
  }

  async findFilterable(productId: string): Promise<readonly ProductAttributeEntity[]> {
    const rows = await this.client.productAttribute.findMany({
      where: { productId, isFilterable: true, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaAttributeRow));
  }

  async findSearchable(productId: string): Promise<readonly ProductAttributeEntity[]> {
    const rows = await this.client.productAttribute.findMany({
      where: { productId, isSearchable: true, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaAttributeRow));
  }

  async countByProductId(productId: string): Promise<number> {
    return this.client.productAttribute.count({ where: { productId, deletedAt: null } });
  }

  async deleteByProductId(productId: string): Promise<number> {
    const result = await this.client.productAttribute.deleteMany({ where: { productId } });
    return result.count;
  }
}
