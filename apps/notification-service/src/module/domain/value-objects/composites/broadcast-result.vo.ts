/**
 * BroadcastResultVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * Broadcast send result summary (analytics-ready)।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';

export interface BroadcastResultVOProps {
  readonly broadcastId: BroadcastIdVO;
  readonly recipientCount: number;
  readonly sentCount: number;
  readonly deliveredCount: number;
  readonly failedCount: number;
  readonly openCount: number;
  readonly clickCount: number;
  readonly unsubscribedCount: number;
  readonly startedAt: string;
  readonly completedAt: string;
}

export class BroadcastResultVO extends BaseVO<BroadcastResultVOProps> {
  private constructor(props: BroadcastResultVOProps) {
    super(Object.freeze(props));
  }

  static create(props: BroadcastResultVOProps): BroadcastResultVO {
    const vo = new BroadcastResultVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: BroadcastResultVOProps): BroadcastResultVO {
    return new BroadcastResultVO(props);
  }

  protected validate(): void {
    const v = this.value;
    for (const [k, val] of Object.entries({
      recipientCount: v.recipientCount,
      sentCount: v.sentCount,
      deliveredCount: v.deliveredCount,
      failedCount: v.failedCount,
      openCount: v.openCount,
      clickCount: v.clickCount,
      unsubscribedCount: v.unsubscribedCount,
    })) {
      if (!Number.isInteger(val) || val < 0) {
        throw new ValidationError(`${k} must be a non-negative integer`, k);
      }
    }
    if (v.sentCount + v.failedCount > v.recipientCount) {
      throw new ValidationError('sent + failed exceeds recipient count', 'sentCount');
    }
    if (v.deliveredCount > v.sentCount) {
      throw new ValidationError('delivered exceeds sent', 'deliveredCount');
    }
    if (v.openCount > v.deliveredCount) {
      throw new ValidationError('opened exceeds delivered', 'openCount');
    }
    if (v.clickCount > v.openCount) {
      throw new ValidationError('clicked exceeds opened', 'clickCount');
    }
    const start = new Date(v.startedAt);
    const end = new Date(v.completedAt);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw new ValidationError('Invalid ISO timestamps', 'startedAt');
    }
    if (end.getTime() < start.getTime()) {
      throw new ValidationError('completedAt cannot be before startedAt', 'completedAt');
    }
  }

  get broadcastId(): BroadcastIdVO { return this.value.broadcastId; }
  get recipientCount(): number { return this.value.recipientCount; }
  get sentCount(): number { return this.value.sentCount; }
  get deliveredCount(): number { return this.value.deliveredCount; }
  get failedCount(): number { return this.value.failedCount; }
  get openCount(): number { return this.value.openCount; }
  get clickCount(): number { return this.value.clickCount; }
  get unsubscribedCount(): number { return this.value.unsubscribedCount; }
  get startedAt(): string { return this.value.startedAt; }
  get completedAt(): string { return this.value.completedAt; }

  get deliveryRate(): number {
    return this.value.sentCount === 0 ? 0 : this.value.deliveredCount / this.value.sentCount;
  }

  get openRate(): number {
    return this.value.deliveredCount === 0 ? 0 : this.value.openCount / this.value.deliveredCount;
  }

  get clickRate(): number {
    return this.value.openCount === 0 ? 0 : this.value.clickCount / this.value.openCount;
  }

  get unsubscribeRate(): number {
    return this.value.deliveredCount === 0
      ? 0
      : this.value.unsubscribedCount / this.value.deliveredCount;
  }

  get failureRate(): number {
    return this.value.recipientCount === 0 ? 0 : this.value.failedCount / this.value.recipientCount;
  }

  get durationMs(): number {
    return new Date(this.value.completedAt).getTime() - new Date(this.value.startedAt).getTime();
  }

  get throughputPerSecond(): number {
    const seconds = this.durationMs / 1000;
    return seconds <= 0 ? 0 : this.value.sentCount / seconds;
  }
}
