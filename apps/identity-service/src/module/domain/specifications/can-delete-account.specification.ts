/**
 * CanDeleteAccountSpecification
 * @module identity-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';

export interface CanDeleteAccountContext {
  readonly hasPendingOrders: boolean;
  readonly hasActiveSubscriptions: boolean;
  readonly walletBalance: number;
  readonly isLastAdmin: boolean;
  readonly hasActiveSessions: boolean;
}

export interface CanDeleteAccountCandidate {
  readonly userId: string;
  readonly userStatus: string;
  readonly context: CanDeleteAccountContext;
}

export class CanDeleteAccountSpecification extends Specification<CanDeleteAccountCandidate> {
  isSatisfiedBy(c: CanDeleteAccountCandidate): boolean {
    const ctx = c.context;
    if (c.userStatus === 'deleted') return false;
    if (ctx.hasPendingOrders) return false;
    if (ctx.hasActiveSubscriptions) return false;
    if (ctx.walletBalance > 0) return false;
    if (ctx.isLastAdmin) return false;
    return true;
  }

  explain(c: CanDeleteAccountCandidate): string | null {
    const ctx = c.context;
    if (c.userStatus === 'deleted') return 'account already deleted';
    if (ctx.hasPendingOrders) return 'user has pending orders';
    if (ctx.hasActiveSubscriptions) return 'user has active subscriptions';
    if (ctx.walletBalance > 0) return `wallet balance (${ctx.walletBalance}) must be zero`;
    if (ctx.isLastAdmin) return 'cannot delete last admin account';
    return null;
  }

  static strict(): CanDeleteAccountSpecification {
    return new CanDeleteAccountSpecification();
  }
}
