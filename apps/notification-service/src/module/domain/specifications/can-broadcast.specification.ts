/**
 * CanBroadcastSpecification
 * @module notification-service/domain/specifications
 *
 * Determines if a broadcast can be executed now।
 * Checks: status, approval, recipient count, template OR content।
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { NOTIFICATION_BROADCAST } from '@vubon/shared-constants/platform';
import type { BroadcastEntity } from '@domain/entities/broadcast.entity.js';

export interface CanBroadcastContext {
  readonly now?: Date;
  readonly requireApproval?: boolean;
}

export interface CanBroadcastCandidate {
  readonly broadcast: BroadcastEntity;
  readonly ctx?: CanBroadcastContext;
}

export class CanBroadcastSpecification extends Specification<CanBroadcastCandidate> {
  isSatisfiedBy(c: CanBroadcastCandidate): boolean {
    return this.explain(c) === null;
  }

  explain(c: CanBroadcastCandidate): string | null {
    const b = c.broadcast;
    const requireApproval = c.ctx?.requireApproval ?? NOTIFICATION_BROADCAST.REQUIRE_APPROVAL;

    if (!b.isDraft() && !b.isScheduled()) {
      return `broadcast status "${b.status.value}" cannot be started`;
    }

    if (requireApproval && !b.vo.isApproved()) {
      return 'broadcast requires approval before sending';
    }

    if (b.recipientCount === 0) {
      return 'broadcast has no recipients';
    }

    if (b.recipientCount > NOTIFICATION_BROADCAST.MAX_RECIPIENTS) {
      return `recipient count ${b.recipientCount} exceeds max ${NOTIFICATION_BROADCAST.MAX_RECIPIENTS}`;
    }

    if (!b.vo.usesTemplate() && !b.vo.usesInlineContent()) {
      return 'broadcast has neither template nor inline content';
    }

    if (b.vo.channelsCount === 0) {
      return 'broadcast has no channels';
    }

    return null;
  }

  static strict(): CanBroadcastSpecification {
    return new CanBroadcastSpecification();
  }
}
