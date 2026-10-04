/**
 * PricingPrismaRepository
 */
import { Injectable } from '@nestjs/common';
import type { PrismaClient } from '@prisma/client';
import { PrismaService } from '@vubon/shared-kernel/prisma';
import { BasePrismaRepository, type PrismaDelegate } from '@vubon/shared-kernel/prisma';
import { ProductPricingEntity } from '../../../../domain/entities/product-pricing.entity.js';
import type { PricingRepository } from '../../../../domain/repositories/pricing.repository.interface.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../../../../domain/value-objects/primitives/variant-id.vo.js';
import { PriceVO } from '../../../../domain/value-objects/primitives/price.vo.js';
import { DiscountPercentVO } from '../../../../domain/value-objects/primitives/discount-vo.js';
import { TaxRateVO } from '../../../../domain/value-objects/primitives/tax-rate.vo.js';
import type { CurrencyCode } from '@vubon/shared-types/common';

interface PrismaPricingRow {
  id: string;
  productId: string;
  variantId: string | null;
  type: string;
  basePrice: { toNumber(): number } | number;
  sellingPrice: { toNumber(): number } | number;
  compareAtPrice: { toNumber(): number } | number | null;
  costPrice: { toNumber(): number } | number | null;
  wholesalePrice: { toNumber(): number } | number | null;
  msrp: { toNumber(): number } | number | null;
  currency: string;
  taxRate: { toNumber(): number } | number;
  taxInclusive: boolean;
  discountPercent: { toNumber(): number } | number;
  effectiveFrom: Date | null;
  effectiveTo: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

@Injectable()
export class PricingPrismaRepository
  extends BasePrismaRepository<ProductPricingEntity, PrismaPricingRow, string>
  implements PricingRepository
{
  protected readonly model: PrismaDelegate<PrismaPricingRow>;

  constructor(private readonly prismaService: PrismaService) {
    super();
    const client = this.prismaService as unknown as { productPricing: PrismaDelegate<PrismaPricingRow> };
    this.model = client.productPricing;
  }

  private get client(): PrismaClient {
    return this.prismaService as unknown as PrismaClient;
  }

  private num(v: { toNumber(): number } | number | null | undefined): number {
    if (v === null || v === undefined) return 0;
    return typeof v === 'number' ? v : v.toNumber();
  }

  private numOrUndef(v: { toNumber(): number } | number | null | undefined): number | undefined {
    if (v === null || v === undefined) return undefined;
    return typeof v === 'number' ? v : v.toNumber();
  }

  protected toDomain(raw: PrismaPricingRow): ProductPricingEntity {
    const currency = raw.currency as CurrencyCode;
    return ProductPricingEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
      props: {
        productId: ProductIdVO.reconstitute(raw.productId),
        variantId: raw.variantId ? VariantIdVO.reconstitute(raw.variantId) : undefined,
        type: raw.type,
        basePrice: PriceVO.reconstitute(this.num(raw.basePrice), currency),
        sellingPrice: PriceVO.reconstitute(this.num(raw.sellingPrice), currency),
        compareAtPrice: raw.compareAtPrice ? PriceVO.reconstitute(this.num(raw.compareAtPrice), currency) : undefined,
        costPrice: raw.costPrice ? PriceVO.reconstitute(this.num(raw.costPrice), currency) : undefined,
        wholesalePrice: raw.wholesalePrice ? PriceVO.reconstitute(this.num(raw.wholesalePrice), currency) : undefined,
        msrp: raw.msrp ? PriceVO.reconstitute(this.num(raw.msrp), currency) : undefined,
        taxRate: TaxRateVO.reconstitute(this.num(raw.taxRate)),
        taxInclusive: raw.taxInclusive,
        discountPercent: DiscountPercentVO.reconstitute(this.num(raw.discountPercent)),
        effectiveFrom: raw.effectiveFrom ? raw.effectiveFrom.toISOString() : undefined,
        effectiveTo: raw.effectiveTo ? raw.effectiveTo.toISOString() : undefined,
      },
    });
  }

  protected toPersistence(domain: ProductPricingEntity): Record<string, unknown> {
    return {
      id: domain.id,
      productId: domain.productId.value,
      variantId: domain.variantId?.value ?? null,
      type: domain.type,
      basePrice: domain.basePrice.amount,
      sellingPrice: domain.sellingPrice.amount,
      compareAtPrice: domain.compareAtPrice?.amount ?? null,
      costPrice: domain.costPrice?.amount ?? null,
      wholesalePrice: domain.wholesalePrice?.amount ?? null,
      msrp: domain.msrp?.amount ?? null,
      currency: domain.sellingPrice.currency,
      taxRate: domain.taxRate.value,
      taxInclusive: domain.taxInclusive,
      discountPercent: domain.discountPercent.value,
      effectiveFrom: domain.effectiveFrom ? new Date(domain.effectiveFrom) : null,
      effectiveTo: domain.effectiveTo ? new Date(domain.effectiveTo) : null,
      deletedAt: domain.deletedAt ? new Date(domain.deletedAt) : null,
    };
  }

  protected idOf(domain: ProductPricingEntity): string { return domain.id; }
  protected whereForId(id: string): Record<string, unknown> { return { id }; }

  async findByProductId(productId: ProductIdVO): Promise<ProductPricingEntity | null> {
    const raw = await this.client.productPricing.findUnique({ where: { productId: productId.value } });
    return raw ? this.toDomain(raw as unknown as PrismaPricingRow) : null;
  }

  async findByVariantId(variantId: VariantIdVO): Promise<ProductPricingEntity | null> {
    const raw = await this.client.productPricing.findFirst({ where: { variantId: variantId.value } });
    return raw ? this.toDomain(raw as unknown as PrismaPricingRow) : null;
  }

  async findAllByProductId(productId: ProductIdVO): Promise<readonly ProductPricingEntity[]> {
    const rows = await this.client.productPricing.findMany({ where: { productId: productId.value } });
    return rows.map((r) => this.toDomain(r as unknown as PrismaPricingRow));
  }

  async findDiscounted(): Promise<readonly ProductPricingEntity[]> {
    const rows = await this.client.productPricing.findMany({
      where: { discountPercent: { gt: 0 } },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaPricingRow));
  }

  async deleteByProductId(productId: ProductIdVO): Promise<number> {
    const result = await this.client.productPricing.deleteMany({ where: { productId: productId.value } });
    return result.count;
  }

  // expose unused helper
  protected _unusedNumOrUndef = this.numOrUndef;
}
