/**
 * CanAssignCourierSpecification
 * @module logistics-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { CourierEntity } from '../entities/courier.entity.js';

export interface CanAssignCourierContext {
  readonly requiresCOD?: boolean;
  readonly requiresInsurance?: boolean;
  readonly requiresInternational?: boolean;
  readonly zone?: string;
}

export type CanAssignCourierCandidate = {
  readonly courier: CourierEntity;
  readonly ctx?: CanAssignCourierContext;
};

export class CanAssignCourierSpecification extends Specification<CanAssignCourierCandidate> {
  isSatisfiedBy(c: CanAssignCourierCandidate): boolean {
    const { courier, ctx } = c;
    if (!courier.isOperational()) return false;
    if (ctx?.requiresCOD && !courier.supportsCOD) return false;
    if (ctx?.requiresInsurance && !courier.supportsInsurance) return false;
    if (ctx?.requiresInternational && !courier.supportsInternational) return false;
    if (ctx?.zone && !courier.coversZone(ctx.zone)) return false;
    return true;
  }

  explain(c: CanAssignCourierCandidate): string | null {
    const { courier, ctx } = c;
    if (!courier.isOperational()) {
      return `Courier status "${courier.status.value}" is not operational`;
    }
    if (ctx?.requiresCOD && !courier.supportsCOD) {
      return 'Courier does not support COD';
    }
    if (ctx?.requiresInsurance && !courier.supportsInsurance) {
      return 'Courier does not support insurance';
    }
    if (ctx?.requiresInternational && !courier.supportsInternational) {
      return 'Courier does not support international';
    }
    if (ctx?.zone && !courier.coversZone(ctx.zone)) {
      return `Courier does not cover zone "${ctx.zone}"`;
    }
    return null;
  }

  static strict(): CanAssignCourierSpecification {
    return new CanAssignCourierSpecification();
  }
}
