/**
 * BroadcastStatus Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_BROADCAST_STATUS } from '@vubon/shared-constants/platform';
import { InvalidBroadcastStatusError } from '@domain/errors/broadcast.errors.js';

export type BroadcastStatusValue =
  (typeof NOTIFICATION_BROADCAST_STATUS)[keyof typeof NOTIFICATION_BROADCAST_STATUS];

const ALLOWED = Object.values(NOTIFICATION_BROADCAST_STATUS) as readonly string[];

const VALID_TRANSITIONS: Readonly<Record<string, readonly string[]>> = {
  draft: ['scheduled', 'sending', 'cancelled'],
  scheduled: ['sending', 'cancelled'],
  sending: ['sent', 'partially_sent', 'failed'],
  sent: [],
  partially_sent: [],
  failed: ['draft', 'cancelled'],
  cancelled: [],
};

export class BroadcastStatusVO extends BaseStatusVO<BroadcastStatusValue> {
  private constructor(value: BroadcastStatusValue) {
    super(value);
  }

  static create(raw: string): BroadcastStatusVO {
    if (typeof raw !== 'string') {
      throw new InvalidBroadcastStatusError(String(raw), ALLOWED);
    }
    const normalized = raw.trim().toLowerCase();
    if (!ALLOWED.includes(normalized)) {
      throw new InvalidBroadcastStatusError(normalized, ALLOWED);
    }
    return new BroadcastStatusVO(normalized as BroadcastStatusValue);
  }

  static reconstitute(raw: string): BroadcastStatusVO {
    return new BroadcastStatusVO(raw as BroadcastStatusValue);
  }

  static draft(): BroadcastStatusVO { return new BroadcastStatusVO(NOTIFICATION_BROADCAST_STATUS.DRAFT); }
  static scheduled(): BroadcastStatusVO { return new BroadcastStatusVO(NOTIFICATION_BROADCAST_STATUS.SCHEDULED); }
  static sending(): BroadcastStatusVO { return new BroadcastStatusVO(NOTIFICATION_BROADCAST_STATUS.SENDING); }
  static sent(): BroadcastStatusVO { return new BroadcastStatusVO(NOTIFICATION_BROADCAST_STATUS.SENT); }
  static cancelled(): BroadcastStatusVO { return new BroadcastStatusVO(NOTIFICATION_BROADCAST_STATUS.CANCELLED); }

  isDraft(): boolean { return this.value === NOTIFICATION_BROADCAST_STATUS.DRAFT; }
  isScheduled(): boolean { return this.value === NOTIFICATION_BROADCAST_STATUS.SCHEDULED; }
  isSending(): boolean { return this.value === NOTIFICATION_BROADCAST_STATUS.SENDING; }
  isSent(): boolean { return this.value === NOTIFICATION_BROADCAST_STATUS.SENT; }
  isPartiallySent(): boolean { return this.value === NOTIFICATION_BROADCAST_STATUS.PARTIALLY_SENT; }
  isFailed(): boolean { return this.value === NOTIFICATION_BROADCAST_STATUS.FAILED; }
  isCancelled(): boolean { return this.value === NOTIFICATION_BROADCAST_STATUS.CANCELLED; }

  isTerminal(): boolean {
    return this.isSent() || this.isPartiallySent() || this.isCancelled();
  }

  canBeCancelled(): boolean {
    return this.isDraft() || this.isScheduled() || this.isSending();
  }

  canTransitionTo(target: string): boolean {
    return (VALID_TRANSITIONS[this.value] ?? []).includes(target);
  }
}
