/**
 * CanShipToZoneSpecification
 * @module logistics-service/domain/specifications
 *
 * Business Rule: Shipment can go to a zone if:
 *   - Zone is active (usable)
 *   - Zone is not restricted
 *   - COD (if requested) is enabled and within limit
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { ZoneEntity } from '../entities/zone.entity.js';

export interface CanShipToZoneContext {
  readonly isCOD?: boolean;
  readonly codAmount?: number;
}

export type CanShipToZoneCandidate = {
  readonly zone: ZoneEntity;
  readonly ctx?: CanShipToZoneContext;
};

export class CanShipToZoneSpecification extends Specification<CanShipToZoneCandidate> {
  isSatisfiedBy(c: CanShipToZoneCandidate): boolean {
    const { zone, ctx } = c;
    if (!zone.isUsable()) return false;
    if (zone.isRestricted()) return false;
    if (ctx?.isCOD && ctx.codAmount !== undefined) {
      if (!zone.canAcceptCOD(ctx.codAmount)) return false;
    }
    return true;
  }

  explain(c: CanShipToZoneCandidate): string | null {
    const { zone, ctx } = c;
    if (!zone.isUsable()) {
      return `Zone status "${zone.status.value}" is not usable for shipping`;
    }
    if (zone.isRestricted()) {
      return `Zone "${zone.code}" is restricted (${zone.statusReason ?? 'no reason given'})`;
    }
    if (ctx?.isCOD && ctx.codAmount !== undefined) {
      if (!zone.codEnabled) {
        return 'Zone does not support COD';
      }
      if (!zone.canAcceptCOD(ctx.codAmount)) {
        return `COD amount ${ctx.codAmount} exceeds zone limit ${zone.codMaxAmount ?? 'unlimited'}`;
      }
    }
    return null;
  }

  static strict(): CanShipToZoneSpecification {
    return new CanShipToZoneSpecification();
  }
}
