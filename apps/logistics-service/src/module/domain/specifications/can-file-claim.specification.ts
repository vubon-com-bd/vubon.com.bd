/**
 * CanFileClaimSpecification
 * @module logistics-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { INSURANCE } from '@vubon/shared-constants/logistics';
import type { InsuranceEntity } from '../entities/insurance.entity.js';

export interface ClaimContext {
  readonly at?: Date;
  readonly amount?: number;
  readonly hasPhotoEvidence?: boolean;
  readonly coverage?: string;
}

export class CanFileClaimSpecification extends Specification<{
  insurance: InsuranceEntity;
  ctx?: ClaimContext;
}> {
  isSatisfiedBy(c: { insurance: InsuranceEntity; ctx?: ClaimContext }): boolean {
    const { insurance, ctx } = c;
    const at = ctx?.at ?? new Date();
    if (insurance.isClaimed) return false;
    if (insurance.isCancelled()) return false;
    if (!insurance.canFileClaim(at)) return false;
    if (ctx?.coverage && !insurance.covers(ctx.coverage)) return false;
    if (ctx?.amount !== undefined && (ctx.amount <= 0 || ctx.amount > insurance.declaredValue.amount)) return false;
    if (INSURANCE.REQUIRE_PHOTOS && !ctx?.hasPhotoEvidence) return false;
    return true;
  }

  explain(c: { insurance: InsuranceEntity; ctx?: ClaimContext }): string | null {
    if (this.isSatisfiedBy(c)) return null;
    const { insurance, ctx } = c;
    if (insurance.isClaimed) return 'claim already filed';
    if (insurance.isCancelled()) return 'policy is cancelled';
    if (!insurance.isClaimWindowOpen()) return `claim window (${INSURANCE.CLAIM_WINDOW_DAYS}d) expired`;
    if (ctx?.coverage && !insurance.covers(ctx.coverage)) return `coverage "${ctx.coverage}" not included`;
    if (ctx?.amount !== undefined && ctx.amount > insurance.declaredValue.amount) return 'claim amount exceeds declared value';
    if (INSURANCE.REQUIRE_PHOTOS && !ctx?.hasPhotoEvidence) return 'photo evidence required';
    return 'cannot file claim';
  }
}
