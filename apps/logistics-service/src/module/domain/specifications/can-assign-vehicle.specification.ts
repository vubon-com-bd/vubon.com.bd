/**
 * CanAssignVehicleSpecification
 * @module logistics-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { VehicleEntity } from '../entities/vehicle.entity.js';

export interface VehicleAssignContext {
  readonly requiredWeightKg?: number;
  readonly requiredVolumeM3?: number;
  readonly at?: Date;
  readonly requireInsurance?: boolean;
  readonly requireRegistration?: boolean;
}

export class CanAssignVehicleSpecification extends Specification<{
  vehicle: VehicleEntity;
  ctx?: VehicleAssignContext;
}> {
  isSatisfiedBy(c: { vehicle: VehicleEntity; ctx?: VehicleAssignContext }): boolean {
    const { vehicle, ctx } = c;
    const at = ctx?.at ?? new Date();
    if (!vehicle.canBeAssigned()) return false;
    if (vehicle.isRetired()) return false;
    if (ctx?.requiredWeightKg !== undefined && !vehicle.canCarry(ctx.requiredWeightKg, ctx.requiredVolumeM3)) return false;
    if (ctx?.requireInsurance && vehicle.isInsuranceExpired(at)) return false;
    if (ctx?.requireRegistration && vehicle.isRegistrationExpired(at)) return false;
    return true;
  }

  explain(c: { vehicle: VehicleEntity; ctx?: VehicleAssignContext }): string | null {
    if (this.isSatisfiedBy(c)) return null;
    const { vehicle, ctx } = c;
    if (vehicle.isRetired()) return 'vehicle is retired';
    if (!vehicle.canBeAssigned()) return `vehicle status "${vehicle.status.value}" not assignable`;
    if (ctx?.requiredWeightKg !== undefined && !vehicle.canCarry(ctx.requiredWeightKg, ctx.requiredVolumeM3)) return 'vehicle cannot carry the load';
    const at = ctx?.at ?? new Date();
    if (ctx?.requireInsurance && vehicle.isInsuranceExpired(at)) return 'vehicle insurance expired';
    if (ctx?.requireRegistration && vehicle.isRegistrationExpired(at)) return 'vehicle registration expired';
    return 'vehicle cannot be assigned';
  }
}
