import { Injectable } from '@nestjs/common';
import { ProductPricingRule as PrismaProductPricingRule } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ProductPricingRuleEntity } from '../../../../domain/entities/product-pricing-rule.entity';
import { PricingRuleIdVO } from '../../../../domain/value-objects/primitives/pricing-rule-id.vo';
import { PricingRuleTypeVO } from '../../../../domain/value-objects/primitives/pricing-rule-type.vo';
import { PricingRuleValueVO } from '../../../../domain/value-objects/primitives/pricing-rule-value.vo';
import { PriceIdVO } from '../../../../domain/value-objects/primitives/price-id.vo';
import type { ProductPricingRuleRepository } from '../../../../domain/repositories/product-pricing-rule.repository.interface';

@Injectable()
export class ProductPricingRulePrismaRepository
  extends BasePrismaRepository<ProductPricingRuleEntity, PricingRuleIdVO>
  implements ProductPricingRuleRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaProductPricingRule): ProductPricingRuleEntity {
    return ProductPricingRuleEntity.reconstitute(
      PricingRuleIdVO.create(raw.id),
      {
        pricingId: PriceIdVO.create(raw.pricingId),
        type: PricingRuleTypeVO.create(raw.type),
        value: PricingRuleValueVO.create(raw.value),
        isActive: raw.isActive,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: PricingRuleIdVO): Promise<ProductPricingRuleEntity | null> {
    const raw = await this.prisma.productPricingRule.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ProductPricingRuleEntity[]> {
    const rows = await this.prisma.productPricingRule.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ProductPricingRuleEntity): Promise<ProductPricingRuleEntity> {
    const data = {
      pricingId: entity.pricingId.value,
      type: entity.type.value,
      value: entity.value.value,
      isActive: entity.isActive,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.productPricingRule.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: PricingRuleIdVO): Promise<void> {
    await this.prisma.productPricingRule.delete({ where: { id: id.value } });
  }

  async findByPricing(pricingId: PriceIdVO): Promise<readonly ProductPricingRuleEntity[]> {
    const rows = await this.prisma.productPricingRule.findMany({
      where: { pricingId: pricingId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findActiveByPricing(pricingId: PriceIdVO): Promise<readonly ProductPricingRuleEntity[]> {
    const rows = await this.prisma.productPricingRule.findMany({
      where: { pricingId: pricingId.value, isActive: true },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async deleteByPricing(pricingId: PriceIdVO): Promise<void> {
    await this.prisma.productPricingRule.deleteMany({
      where: { pricingId: pricingId.value },
    });
  }
}
