/**
 * DigestEntity — AGGREGATE ROOT
 * @module notification-service/domain/entities
 *
 * State machine:
 *   pending → generating → ready → sent
 *   pending/generating/ready → cancelled
 *   generating → failed → pending
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NOTIFICATION_DIGEST } from '@vubon/shared-constants/platform';

import { DigestVO } from '@domain/composites/digest.vo.js';
import type { DigestItemVO } from '@domain/composites/digest-item.vo.js';
import type { DigestIdVO } from '@domain/primitives/digest-id.vo.js';
import { DigestStatusVO } from '@domain/primitives/digest-status.vo.js';

import {
  DigestCreatedEvent,
  DigestGeneratedEvent,
  DigestSentEvent,
  DigestFailedEvent,
  DigestCancelledEvent,
} from '@domain/events/digest.events.js';

export interface DigestEntityProps {
  readonly vo: DigestVO;
  readonly items: readonly DigestItemVO[];
  readonly failureReason?: string;
  readonly cancelledAt?: string;
  readonly cancelledReason?: string;
}

export class DigestEntity extends AggregateRoot<string> {
  private _vo: DigestVO;
  private _items: readonly DigestItemVO[];
  private _failureReason?: string;
  private _cancelledAt?: string;
  private _cancelledReason?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: DigestEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
    this._items = props.items;
    this._failureReason = props.failureReason;
    this._cancelledAt = props.cancelledAt;
    this._cancelledReason = props.cancelledReason;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._items.length > NOTIFICATION_DIGEST.MAX_ITEMS_PER_DIGEST) {
      throw new ValidationError(
        `Digest items ${this._items.length} exceeds max ${NOTIFICATION_DIGEST.MAX_ITEMS_PER_DIGEST}`,
        'items',
      );
    }
    if (this._vo.status.isFailed() && !this._failureReason) {
      throw new ValidationError('Failed digest requires failureReason', 'failureReason');
    }
    if (this._vo.status.isCancelled() && !this._cancelledAt) {
      throw new ValidationError('Cancelled digest requires cancelledAt', 'cancelledAt');
    }
  }

  get vo(): DigestVO { return this._vo; }
  get digestId(): DigestIdVO { return this._vo.id; }
  get status(): DigestVO['status'] { return this._vo.status; }
  get items(): readonly DigestItemVO[] { return this._items; }
  get itemCount(): number { return this._items.length; }
  get failureReason(): string | undefined { return this._failureReason; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get cancelledReason(): string | undefined { return this._cancelledReason; }

  isPending(): boolean { return this._vo.isPending(); }
  isGenerating(): boolean { return this._vo.isGenerating(); }
  isReady(): boolean { return this._vo.isReady(); }
  isSent(): boolean { return this._vo.isSent(); }
  isFailed(): boolean { return this._vo.isFailed(); }
  isCancelled(): boolean { return this._vo.isCancelled(); }
  isEmpty(): boolean { return this.itemCount === 0; }
  canBeSent(): boolean { return this._vo.status.canBeSent() && !this.isEmpty(); }

  startGenerating(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('generating');
    this._vo = this._vo.withStatus(DigestStatusVO.generating());
    this.touch(now);
    this.incrementVersion();
  }

  completeGeneration(items: readonly DigestItemVO[], now: string = new Date().toISOString()): void {
    this.assertTransitionTo('ready');
    this._items = Object.freeze(items);
    this._vo = DigestVO.create({
      ...this._vo.value,
      status: DigestStatusVO.ready(),
      itemCount: items.length,
      generatedAt: now,
    });
    this.addDomainEvent(
      new DigestGeneratedEvent({
        aggregateId: this.id,
        payload: {
          digestId: this.id,
          userId: this._vo.userId.value,
          itemCount: items.length,
          generatedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markSent(now: string = new Date().toISOString()): void {
    if (this.isEmpty()) {
      throw new BusinessRuleError(
        'Cannot send empty digest',
        'DIGEST_EMPTY',
        { digestId: this.id },
      );
    }
    this.assertTransitionTo('sent');
    this._vo = DigestVO.create({
      ...this._vo.value,
      status: DigestStatusVO.sent(),
      sentAt: now,
    });
    this.addDomainEvent(
      new DigestSentEvent({
        aggregateId: this.id,
        payload: {
          digestId: this.id,
          userId: this._vo.userId.value,
          itemCount: this.itemCount,
          sentAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  fail(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('failed');
    this._vo = this._vo.withStatus(DigestStatusVO.failed());
    this._failureReason = reason;
    this.addDomainEvent(
      new DigestFailedEvent({
        aggregateId: this.id,
        payload: {
          digestId: this.id,
          userId: this._vo.userId.value,
          reason,
          failedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  cancel(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('cancelled');
    this._vo = this._vo.withStatus(DigestStatusVO.cancelled());
    this._cancelledAt = now;
    this._cancelledReason = reason;
    this.addDomainEvent(
      new DigestCancelledEvent({
        aggregateId: this.id,
        payload: {
          digestId: this.id,
          userId: this._vo.userId.value,
          reason,
          cancelledAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._vo.status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid digest status transition: "${this._vo.status.value}" → "${target}"`,
        'INVALID_DIGEST_STATUS_TRANSITION',
        { from: this._vo.status.value, to: target, digestId: this.id },
      );
    }
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: DigestIdVO;
    vo: DigestVO;
    now: string;
  }): DigestEntity {
    if (!params.vo.isPending()) {
      throw new ValidationError('New digest must be in pending status', 'status');
    }

    const entity = new DigestEntity(
      params.id.value,
      params.now,
      params.now,
      { vo: params.vo, items: [] },
      null,
    );

    entity.addDomainEvent(
      new DigestCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          digestId: params.id.value,
          userId: params.vo.userId.value,
          frequency: params.vo.period.frequency,
          type: params.vo.type.value,
          createdAt: params.now,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: DigestEntityProps;
    version?: number;
  }): DigestEntity {
    const entity = new DigestEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
