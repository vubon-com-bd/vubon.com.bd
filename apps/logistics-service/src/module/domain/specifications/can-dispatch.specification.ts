/**
 * CanDispatchSpecification — is a dispatch ready to leave?
 * @module logistics-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { DispatchEntity } from '../entities/dispatch.entity.js';

export interface DispatchContext {
  readonly requireManifest?: boolean;
  readonly requireDriver?: boolean;
  readonly requireVehicle?: boolean;
}

export class CanDispatchSpecification extends Specification<{
  dispatch: DispatchEntity;
  ctx?: DispatchContext;
}> {
  isSatisfiedBy(c: { dispatch: DispatchEntity; ctx?: DispatchContext }): boolean {
    const { dispatch, ctx } = c;
    if (!dispatch.hasCourier) return false;
    if (!dispatch.canBeStarted()) return false;
    if (dispatch.shipmentCount === 0) return false;
    const requireManifest = ctx?.requireManifest ?? true;
    const requireDriver = ctx?.requireDriver ?? false;
    const requireVehicle = ctx?.requireVehicle ?? false;
    if (requireManifest && !dispatch.hasManifest) return false;
    if (requireDriver && !dispatch.hasDriver) return false;
    if (requireVehicle && !dispatch.hasVehicle) return false;
    return true;
  }

  explain(c: { dispatch: DispatchEntity; ctx?: DispatchContext }): string | null {
    if (this.isSatisfiedBy(c)) return null;
    const { dispatch, ctx } = c;
    if (!dispatch.hasCourier) return 'no courier assigned';
    if (!dispatch.canBeStarted()) return `dispatch status "${dispatch.status.value}" cannot start`;
    if (dispatch.shipmentCount === 0) return 'dispatch has no shipments';
    const requireManifest = ctx?.requireManifest ?? true;
    if (requireManifest && !dispatch.hasManifest) return 'manifest not generated';
    if (ctx?.requireDriver && !dispatch.hasDriver) return 'driver not assigned';
    if (ctx?.requireVehicle && !dispatch.hasVehicle) return 'vehicle not assigned';
    return 'cannot dispatch';
  }
}
