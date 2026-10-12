/**
 * CanLiftSuspensionSpecification
 * @module vendor-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { VendorEntity } from '../entities/vendor.entity.js';
import { VendorSuspensionEntity } from '../entities/vendor-suspension.entity.js';

export interface CanLiftSuspensionContext {
  readonly vendor: VendorEntity;
  readonly suspension: VendorSuspensionEntity;
  readonly hasOpenDisputes?: boolean;
}

export class CanLiftSuspensionSpecification extends Specification<CanLiftSuspensionContext> {
  isSatisfiedBy(ctx: CanLiftSuspensionContext): boolean {
    const { vendor, suspension, hasOpenDisputes } = ctx;
    if (!vendor.isSuspended()) return false;
    if (suspension.isLifted) return false;
    if (hasOpenDisputes) return false;
    return true;
  }

  explain(ctx: CanLiftSuspensionContext): string | null {
    const { vendor, suspension, hasOpenDisputes } = ctx;
    if (!vendor.isSuspended()) return `vendor not suspended (status: ${vendor.status.value})`;
    if (suspension.isLifted) return 'suspension already lifted';
    if (hasOpenDisputes) return 'vendor has open disputes';
    return null;
  }
}
