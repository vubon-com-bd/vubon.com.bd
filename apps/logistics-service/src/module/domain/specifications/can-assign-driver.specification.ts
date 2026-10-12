/**
 * CanAssignDriverSpecification
 * @module logistics-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { DriverEntity } from '../entities/driver.entity.js';

export interface AssignContext {
  readonly warehouseId?: string;
  readonly requiredLicenseType?: string;
  readonly cashHeadroomRequired?: number;
  readonly at?: Date;
}

export class CanAssignDriverSpecification extends Specification<{
  driver: DriverEntity;
  ctx?: AssignContext;
}> {
  isSatisfiedBy(c: { driver: DriverEntity; ctx?: AssignContext }): boolean {
    const { driver, ctx } = c;
    const at = ctx?.at ?? new Date();
    if (!driver.canBeAssigned()) return false;
    if (driver.isLicenseExpired(at)) return false;
    if (ctx?.warehouseId && driver.warehouseId?.value !== ctx.warehouseId) return false;
    if (ctx?.requiredLicenseType && driver.licenseType.rank < this.licenseRank(ctx.requiredLicenseType)) return false;
    if (ctx?.cashHeadroomRequired !== undefined && driver.availableCashLimit < ctx.cashHeadroomRequired) return false;
    return true;
  }

  explain(c: { driver: DriverEntity; ctx?: AssignContext }): string | null {
    if (this.isSatisfiedBy(c)) return null;
    const { driver, ctx } = c;
    if (!driver.canBeAssigned()) return `driver status "${driver.status.value}" not assignable`;
    const at = ctx?.at ?? new Date();
    if (driver.isLicenseExpired(at)) return 'driver license expired';
    if (ctx?.warehouseId && driver.warehouseId?.value !== ctx.warehouseId) return 'driver not in required warehouse';
    if (ctx?.cashHeadroomRequired !== undefined && driver.availableCashLimit < ctx.cashHeadroomRequired) return 'insufficient cash headroom';
    return 'driver cannot be assigned';
  }

  private licenseRank(type: string): number {
    const ranks: Record<string, number> = {
      motorcycle: 1, light: 2, medium: 3, heavy: 4, professional: 5,
    };
    return ranks[type] ?? 0;
  }
}
