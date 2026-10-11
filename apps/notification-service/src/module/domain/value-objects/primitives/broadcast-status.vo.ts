/**
 * BroadcastStatus Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_BROADCAST_STATUS } from '@vubon/shared-constants/platform/notification';
import { InvalidBroadcastStatusError } from '../../errors/schedule.errors.js';

const ALLOWED = Object.values(NOTIFICATION_BROADCAST_STATUS) as readonly string[];

export class BroadcastStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BroadcastStatusVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidBroadcastStatusError(raw, ALLOWED);
    }
    return new BroadcastStatusVO(raw);
  }

  static reconstitute(raw: string): BroadcastStatusVO {
    return new BroadcastStatusVO(raw);
  }

  static draft(): BroadcastStatusVO { return new BroadcastStatusVO(NOTIFICATION_BROADCAST_STATUS.DRAFT); }
  static scheduled(): BroadcastStatusVO { return new BroadcastStatusVO(NOTIFICATION_BROADCAST_STATUS.SCHEDULED); }
  static sending(): BroadcastStatusVO { return new BroadcastStatusVO(NOTIFICATION_BROADCAST_STATUS.SENDING); }
  static sent(): BroadcastStatusVO { return new BroadcastStatusVO(NOTIFICATION_BROADCAST_STATUS.SENT); }
  static partiallySent(): BroadcastStatusVO { return new BroadcastStatusVO(NOTIFICATION_BROADCAST_STATUS.PARTIALLY_SENT); }
  static failed(): BroadcastStatusVO { return new BroadcastStatusVO(NOTIFICATION_BROADCAST_STATUS.FAILED); }
  static cancelled(): BroadcastStatusVO { return new BroadcastStatusVO(NOTIFICATION_BROADCAST_STATUS.CANCELLED); }

  isDraft(): boolean { return this.value === NOTIFICATION_BROADCAST_STATUS.DRAFT; }
  isScheduled(): boolean { return this.value === NOTIFICATION_BROADCAST_STATUS.SCHEDULED; }
  isSending(): boolean { return this.value === NOTIFICATION_BROADCAST_STATUS.SENDING; }
  isSent(): boolean { return this.value === NOTIFICATION_BROADCAST_STATUS.SENT; }
  isPartiallySent(): boolean { return this.value === NOTIFICATION_BROADCAST_STATUS.PARTIALLY_SENT; }
  isFailed(): boolean { return this.value === NOTIFICATION_BROADCAST_STATUS.FAILED; }
  isCancelled(): boolean { return this.value === NOTIFICATION_BROADCAST_STATUS.CANCELLED; }

  isSuccess(): boolean {
    return this.isSent() || this.isPartiallySent();
  }

  isFinal(): boolean {
    return this.isSent() || this.isPartiallySent() || this.isFailed() || this.isCancelled();
  }

  canBeCancelled(): boolean {
    return this.isDraft() || this.isScheduled();
  }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [NOTIFICATION_BROADCAST_STATUS.DRAFT]: [
        NOTIFICATION_BROADCAST_STATUS.SCHEDULED,
        NOTIFICATION_BROADCAST_STATUS.SENDING,
        NOTIFICATION_BROADCAST_STATUS.CANCELLED,
      ],
      [NOTIFICATION_BROADCAST_STATUS.SCHEDULED]: [
        NOTIFICATION_BROADCAST_STATUS.SENDING,
        NOTIFICATION_BROADCAST_STATUS.CANCELLED,
      ],
      [NOTIFICATION_BROADCAST_STATUS.SENDING]: [
        NOTIFICATION_BROADCAST_STATUS.SENT,
        NOTIFICATION_BROADCAST_STATUS.PARTIALLY_SENT,
        NOTIFICATION_BROADCAST_STATUS.FAILED,
      ],
      [NOTIFICATION_BROADCAST_STATUS.SENT]: [],
      [NOTIFICATION_BROADCAST_STATUS.PARTIALLY_SENT]: [],
      [NOTIFICATION_BROADCAST_STATUS.FAILED]: [],
      [NOTIFICATION_BROADCAST_STATUS.CANCELLED]: [],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
