/**
 * VariantPrismaRepository
 */
import { Injectable } from '@nestjs/common';
import type { PrismaClient } from '@prisma/client';
import { PrismaService } from '@vubon/shared-kernel/prisma';
import { BasePrismaRepository, type PrismaDelegate } from '@vubon/shared-kernel/prisma';
import { ProductVariantEntity } from '../../../../domain/entities/product-variant.entity.js';
import type { VariantRepository } from '../../../../domain/repositories/variant.repository.interface.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../../../../domain/value-objects/primitives/variant-id.vo.js';
import { VariantNameVO } from '../../../../domain/value-objects/primitives/variant-name.vo.js';
import { VariantSkuVO } from '../../../../domain/value-objects/primitives/variant-sku.vo.js';
import { PriceVO } from '../../../../domain/value-objects/primitives/price.vo.js';
import type { CurrencyCode } from '@vubon/shared-types/common';

interface PrismaVariantRow {
  id: string;
  productId: string;
  name: string;
  sku: string;
  barcode: string | null;
  type: string;
  options: unknown;
  price: { toNumber(): number } | number;
  compareAtPrice: { toNumber(): number } | number | null;
  cost: { toNumber(): number } | number | null;
  weight: { toNumber(): number } | number | null;
  imageUrl: string | null;
  status: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

@Injectable()
export class VariantPrismaRepository
  extends BasePrismaRepository<ProductVariantEntity, PrismaVariantRow, string>
  implements VariantRepository
{
  protected readonly model: PrismaDelegate<PrismaVariantRow>;

  constructor(private readonly prismaService: PrismaService) {
    super();
    const client = this.prismaService as unknown as { productVariant: PrismaDelegate<PrismaVariantRow> };
    this.model = client.productVariant;
  }

  private get client(): PrismaClient {
    return this.prismaService as unknown as PrismaClient;
  }

  private num(v: { toNumber(): number } | number | null | undefined): number {
    if (v === null || v === undefined) return 0;
    return typeof v === 'number' ? v : v.toNumber();
  }

  private numOrNull(v: { toNumber(): number } | number | null | undefined): number | undefined {
    if (v === null || v === undefined) return undefined;
    return typeof v === 'number' ? v : v.toNumber();
  }

  protected toDomain(raw: PrismaVariantRow): ProductVariantEntity {
    const options = (raw.options as readonly { name: string; value: string }[]) ?? [];
    const currency: CurrencyCode = 'BDT';
    return ProductVariantEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
      props: {
        productId: ProductIdVO.reconstitute(raw.productId),
        name: VariantNameVO.reconstitute(raw.name),
        sku: VariantSkuVO.reconstitute(raw.sku),
        barcode: raw.barcode ?? undefined,
        type: raw.type,
        options,
        price: PriceVO.reconstitute(this.num(raw.price), currency),
        compareAtPrice: raw.compareAtPrice ? PriceVO.reconstitute(this.num(raw.compareAtPrice), currency) : undefined,
        cost: raw.cost ? PriceVO.reconstitute(this.num(raw.cost), currency) : undefined,
        weight: this.numOrNull(raw.weight),
        imageUrl: raw.imageUrl ?? undefined,
        status: raw.status,
        stock: raw.stock,
      },
    });
  }

  protected toPersistence(domain: ProductVariantEntity): Record<string, unknown> {
    return {
      id: domain.id,
      productId: domain.productId.value,
      name: domain.name.value,
      sku: domain.sku.value,
      barcode: domain.barcode ?? null,
      type: domain.type,
      options: domain.options,
      price: domain.price.amount,
      compareAtPrice: domain.compareAtPrice?.amount ?? null,
      cost: domain.cost?.amount ?? null,
      weight: domain.weight ?? null,
      imageUrl: domain.imageUrl ?? null,
      status: domain.status,
      stock: domain.stock,
      deletedAt: domain.deletedAt ? new Date(domain.deletedAt) : null,
    };
  }

  protected idOf(domain: ProductVariantEntity): string { return domain.id; }
  protected whereForId(id: string): Record<string, unknown> { return { id }; }

  async findByIdVO(id: VariantIdVO): Promise<ProductVariantEntity | null> {
    return this.findById(id.value);
  }

  async findByProductId(productId: ProductIdVO): Promise<readonly ProductVariantEntity[]> {
    const rows = await this.client.productVariant.findMany({
      where: { productId: productId.value, deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaVariantRow));
  }

  async findBySku(sku: VariantSkuVO): Promise<ProductVariantEntity | null> {
    const raw = await this.client.productVariant.findUnique({ where: { sku: sku.value } });
    return raw ? this.toDomain(raw as unknown as PrismaVariantRow) : null;
  }

  async existsBySku(sku: VariantSkuVO): Promise<boolean> {
    const count = await this.client.productVariant.count({ where: { sku: sku.value } });
    return count > 0;
  }

  async findAvailableByProductId(productId: ProductIdVO): Promise<readonly ProductVariantEntity[]> {
    const rows = await this.client.productVariant.findMany({
      where: { productId: productId.value, deletedAt: null, status: 'active', stock: { gt: 0 } },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaVariantRow));
  }

  async countByProductId(productId: ProductIdVO): Promise<number> {
    return this.client.productVariant.count({ where: { productId: productId.value, deletedAt: null } });
  }

  async deleteByProductId(productId: ProductIdVO): Promise<number> {
    const result = await this.client.productVariant.deleteMany({ where: { productId: productId.value } });
    return result.count;
  }

  async findByIds(ids: readonly string[]): Promise<readonly ProductVariantEntity[]> {
    const rows = await this.client.productVariant.findMany({ where: { id: { in: [...ids] } } });
    return rows.map((r) => this.toDomain(r as unknown as PrismaVariantRow));
  }
}
