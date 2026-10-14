/**
 * CanBeSuspendedSpecification
 * @module vendor-service/domain/specifications
 *
 * Business rules — vendor suspension eligibility.
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { VendorEntity } from '../entities/vendor.entity.js';

export interface SuspendContext {
  readonly reasonSeverity: 'low' | 'medium' | 'high' | 'critical';
  readonly hasActiveSuspension?: boolean;
  readonly previousSuspensionCount?: number;
  readonly hasActiveOrders?: boolean;
}

export interface SuspendCandidate {
  readonly vendor: VendorEntity;
  readonly ctx: SuspendContext;
}

export class CanBeSuspendedSpecification extends Specification<SuspendCandidate> {
  isSatisfiedBy(c: SuspendCandidate): boolean {
    return this.explain(c) === null;
  }

  explain(c: SuspendCandidate): string | null {
    const { vendor, ctx } = c;

    if (vendor.isDeleted()) {
      return 'vendor is deleted';
    }
    if (vendor.isBlocked()) {
      return 'vendor is already blocked';
    }
    if (vendor.isSuspended() || ctx.hasActiveSuspension) {
      return 'vendor already has an active suspension';
    }
    if (!vendor.status.canTransitionTo('suspended')) {
      return `status "${vendor.status.value}" cannot transition to suspended`;
    }

    // Critical severity allows immediate suspension even with active orders
    if (ctx.reasonSeverity !== 'critical' && ctx.hasActiveOrders) {
      return 'cannot suspend vendor with active orders unless severity is critical';
    }

    if (ctx.previousSuspensionCount !== undefined && ctx.previousSuspensionCount >= 5) {
      return 'vendor exceeded maximum number of suspensions — consider blocking';
    }

    return null;
  }

  static strict(): CanBeSuspendedSpecification {
    return new CanBeSuspendedSpecification();
  }

  static relaxed(): CanBeSuspendedSpecification {
    return new CanBeSuspendedSpecification();
  }
}
