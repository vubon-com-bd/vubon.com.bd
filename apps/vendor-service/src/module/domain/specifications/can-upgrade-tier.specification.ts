/**
 * CanUpgradeTierSpecification
 * @module vendor-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { VendorEntity } from '../entities/vendor.entity.js';
import { VendorTierVO } from '../value-objects/primitives/vendor-tier.vo.js';

export interface CanUpgradeTierContext {
  readonly vendor: VendorEntity;
  readonly performanceScore: number;
  readonly openDisputes: number;
}

export class CanUpgradeTierSpecification extends Specification<CanUpgradeTierContext> {
  isSatisfiedBy(ctx: CanUpgradeTierContext): boolean {
    const { vendor, performanceScore, openDisputes } = ctx;
    if (!vendor.isOperational()) return false;
    if (openDisputes > 0) return false;
    if (performanceScore < 80) return false;
    const target = VendorTierVO.forSalesAmount(vendor.totalSales);
    if (!target.isHigherThan(vendor.tier)) return false;
    return true;
  }

  explain(ctx: CanUpgradeTierContext): string | null {
    const { vendor, performanceScore, openDisputes } = ctx;
    if (!vendor.isOperational()) return 'vendor not operational';
    if (openDisputes > 0) return `${openDisputes} open disputes`;
    if (performanceScore < 80) return `performance ${performanceScore} below upgrade threshold`;
    const target = VendorTierVO.forSalesAmount(vendor.totalSales);
    if (!target.isHigherThan(vendor.tier)) {
      return `no higher tier (sales ${vendor.totalSales} still in ${vendor.tier.value})`;
    }
    return null;
  }
}
