/**
 * CanUnsubscribeSpecification
 * @module notification-service/domain/specifications
 *
 * Determines if user can unsubscribe from a channel/category।
 * Security/transactional categories cannot be unsubscribed।
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { PreferenceEntity } from '@domain/entities/preference.entity.js';

const PROTECTED_CATEGORIES = new Set<string>([
  'auth',
  'security',
  'system',
]);

const PROTECTED_CHANNELS = new Set<string>([]);

export interface CanUnsubscribeContext {
  readonly channel: string;
  readonly category?: string;
}

export interface CanUnsubscribeCandidate {
  readonly preference: PreferenceEntity;
  readonly ctx: CanUnsubscribeContext;
}

export class CanUnsubscribeSpecification extends Specification<CanUnsubscribeCandidate> {
  isSatisfiedBy(c: CanUnsubscribeCandidate): boolean {
    return this.explain(c) === null;
  }

  explain(c: CanUnsubscribeCandidate): string | null {
    if (c.preference.locked) {
      return 'preferences are locked';
    }

    if (PROTECTED_CHANNELS.has(c.ctx.channel)) {
      return `channel "${c.ctx.channel}" is protected from unsubscribe`;
    }

    if (c.ctx.category && PROTECTED_CATEGORIES.has(c.ctx.category)) {
      return `category "${c.ctx.category}" is protected from unsubscribe`;
    }

    if (!c.preference.isChannelEnabled(c.ctx.channel)) {
      return `channel "${c.ctx.channel}" is already unsubscribed`;
    }

    return null;
  }

  static strict(): CanUnsubscribeSpecification {
    return new CanUnsubscribeSpecification();
  }
}
