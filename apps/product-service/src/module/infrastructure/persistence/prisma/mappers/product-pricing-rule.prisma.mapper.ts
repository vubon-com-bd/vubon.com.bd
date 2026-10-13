/**
 * ProductPricingRulePrismaMapper
 * @module product-service/infrastructure/persistence/prisma/mappers
 */
import { ProductPricingRuleEntity } from '../../../../domain/entities/product-pricing-rule.entity.js';
import { ProductPricingRuleVO } from '../../../../domain/value-objects/composites/product-pricing-rule.vo.js';
import { PricingRuleIdVO } from '../../../../domain/value-objects/primitives/pricing-rule-id.vo.js';
import { PricingRuleTypeVO } from '../../../../domain/value-objects/primitives/pricing-rule-type.vo.js';
import { PricingRuleValueVO } from '../../../../domain/value-objects/primitives/pricing-rule-value.vo.js';

export interface PrismaProductPricingRuleRow {
  id: string;
  name: string;
  type: string;
  conditions: unknown;
  priceAdjustment: unknown;
  isPercent: boolean;
  priority: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v) {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v);
};

export class ProductPricingRulePrismaMapper {
  static toDomain(raw: PrismaProductPricingRuleRow): ProductPricingRuleEntity {
    const conditions =
      raw.conditions && typeof raw.conditions === 'object'
        ? (raw.conditions as Record<string, unknown>)
        : {};

    const vo = ProductPricingRuleVO.reconstitute({
      id: PricingRuleIdVO.reconstitute(raw.id),
      name: raw.name,
      type: PricingRuleTypeVO.reconstitute(raw.type),
      ruleValue: PricingRuleValueVO.reconstitute({
        amount: toNum(raw.priceAdjustment),
        isPercent: raw.isPercent,
      }),
      conditions,
      isActive: raw.isActive,
      priority: raw.priority,
    });

    return ProductPricingRuleEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      vo,
    });
  }

  static toPersistence(entity: ProductPricingRuleEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name,
      type: vo.type.value,
      conditions: vo.conditions,
      priceAdjustment: vo.ruleValue.amount,
      isPercent: vo.ruleValue.isPercent,
      priority: vo.priority,
      isActive: vo.isActive,
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
