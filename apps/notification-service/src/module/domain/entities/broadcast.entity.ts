/**
 * BroadcastEntity — AGGREGATE ROOT
 * @module notification-service/domain/entities
 *
 * State machine:
 *   draft → scheduled → sending → sent/partially_sent
 *   draft/scheduled/sending → cancelled
 *   sending → failed → draft/cancelled
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { BroadcastVO } from '@domain/composites/broadcast.vo.js';
import type { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';
import { BroadcastStatusVO } from '@domain/primitives/broadcast-status.vo.js';
import type { UserIdVO } from '@domain/primitives/user-id.vo.js';

import {
  BroadcastCreatedEvent,
  BroadcastScheduledEvent,
  BroadcastApprovedEvent,
  BroadcastStartedEvent,
  BroadcastCompletedEvent,
  BroadcastFailedEvent,
  BroadcastCancelledEvent,
} from '@domain/events/broadcast.events.js';

export interface BroadcastEntityProps {
  readonly vo: BroadcastVO;
  readonly cancelledAt?: string;
  readonly cancelledBy?: string;
  readonly cancelledReason?: string;
  readonly failureReason?: string;
}

export class BroadcastEntity extends AggregateRoot<string> {
  private _vo: BroadcastVO;
  private _cancelledAt?: string;
  private _cancelledBy?: string;
  private _cancelledReason?: string;
  private _failureReason?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: BroadcastEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
    this._cancelledAt = props.cancelledAt;
    this._cancelledBy = props.cancelledBy;
    this._cancelledReason = props.cancelledReason;
    this._failureReason = props.failureReason;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._vo.status.isCancelled() && !this._cancelledAt) {
      throw new ValidationError('Cancelled broadcast requires cancelledAt', 'cancelledAt');
    }
    if (this._vo.status.isFailed() && !this._failureReason) {
      throw new ValidationError('Failed broadcast requires failureReason', 'failureReason');
    }
  }

  get vo(): BroadcastVO { return this._vo; }
  get broadcastId(): BroadcastIdVO { return this._vo.id; }
  get status(): BroadcastVO['status'] { return this._vo.status; }
  get recipientCount(): number { return this._vo.recipientCount; }
  get sentCount(): number { return this._vo.sentCount; }
  get failedCount(): number { return this._vo.failedCount; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get cancelledBy(): string | undefined { return this._cancelledBy; }
  get cancelledReason(): string | undefined { return this._cancelledReason; }
  get failureReason(): string | undefined { return this._failureReason; }

  isDraft(): boolean { return this._vo.isDraft(); }
  isScheduled(): boolean { return this._vo.isScheduled(); }
  isSending(): boolean { return this._vo.isSending(); }
  isSent(): boolean { return this._vo.isSent(); }
  isFailed(): boolean { return this._vo.isFailed(); }
  isCancelled(): boolean { return this._vo.isCancelled(); }
  isTerminal(): boolean { return this._vo.isTerminal(); }

  approve(approvedBy: UserIdVO, now: string = new Date().toISOString()): void {
    if (!this.isDraft()) {
      throw new BusinessRuleError(
        'Only draft broadcasts can be approved',
        'BROADCAST_NOT_APPROVABLE',
        { broadcastId: this.id, status: this._vo.status.value },
      );
    }
    this._vo = this._vo.withApproval(approvedBy);
    this.addDomainEvent(
      new BroadcastApprovedEvent({
        aggregateId: this.id,
        payload: { broadcastId: this.id, approvedBy: approvedBy.value, approvedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  schedule(scheduledAt: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('scheduled');
    this._vo = this._vo.withStatus(BroadcastStatusVO.scheduled());
    this.addDomainEvent(
      new BroadcastScheduledEvent({
        aggregateId: this.id,
        payload: {
          broadcastId: this.id,
          scheduledAt,
          recipientCount: this._vo.recipientCount,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  start(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('sending');
    if (this._vo.requiresApproval()) {
      throw new BusinessRuleError(
        'Broadcast requires approval before sending',
        'BROADCAST_REQUIRES_APPROVAL',
        { broadcastId: this.id },
      );
    }
    this._vo = this._vo.withStatus(BroadcastStatusVO.sending());
    this.addDomainEvent(
      new BroadcastStartedEvent({
        aggregateId: this.id,
        payload: {
          broadcastId: this.id,
          startedAt: now,
          recipientCount: this._vo.recipientCount,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updateProgress(sent: number, failed: number, now: string = new Date().toISOString()): void {
    if (!this.isSending()) {
      throw new BusinessRuleError(
        'Can only update progress while sending',
        'BROADCAST_NOT_SENDING',
        { broadcastId: this.id, status: this._vo.status.value },
      );
    }
    this._vo = this._vo.withProgress(sent, failed);
    this.touch(now);
    this.incrementVersion();
  }

  complete(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('sent');
    this._vo = BroadcastVO.create({
      ...this._vo.value,
      status: BroadcastStatusVO.sent(),
      completedAt: now,
    });
    this.addDomainEvent(
      new BroadcastCompletedEvent({
        aggregateId: this.id,
        payload: {
          broadcastId: this.id,
          completedAt: now,
          recipientCount: this._vo.recipientCount,
          sentCount: this._vo.sentCount,
          failedCount: this._vo.failedCount,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  fail(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('failed');
    this._vo = this._vo.withStatus(BroadcastStatusVO.create('failed'));
    this._failureReason = reason;
    this.addDomainEvent(
      new BroadcastFailedEvent({
        aggregateId: this.id,
        payload: {
          broadcastId: this.id,
          reason,
          failedAt: now,
          sentCount: this._vo.sentCount,
          failedCount: this._vo.failedCount,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  cancel(
    reason?: string,
    cancelledBy?: string,
    now: string = new Date().toISOString(),
  ): void {
    if (!this._vo.canBeCancelled()) {
      throw new BusinessRuleError(
        `Cannot cancel broadcast in status "${this._vo.status.value}"`,
        'BROADCAST_CANNOT_BE_CANCELLED',
        { broadcastId: this.id, status: this._vo.status.value },
      );
    }
    this.assertTransitionTo('cancelled');
    this._vo = this._vo.withStatus(BroadcastStatusVO.cancelled());
    this._cancelledAt = now;
    this._cancelledBy = cancelledBy;
    this._cancelledReason = reason;
    this.addDomainEvent(
      new BroadcastCancelledEvent({
        aggregateId: this.id,
        payload: { broadcastId: this.id, reason, cancelledBy, cancelledAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._vo.status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid broadcast status transition: "${this._vo.status.value}" → "${target}"`,
        'INVALID_BROADCAST_STATUS_TRANSITION',
        { from: this._vo.status.value, to: target, broadcastId: this.id },
      );
    }
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: BroadcastIdVO;
    vo: BroadcastVO;
    now: string;
  }): BroadcastEntity {
    if (!params.vo.isDraft()) {
      throw new ValidationError('New broadcast must be in draft status', 'status');
    }

    const entity = new BroadcastEntity(
      params.id.value,
      params.now,
      params.now,
      { vo: params.vo },
      null,
    );

    entity.addDomainEvent(
      new BroadcastCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          broadcastId: params.id.value,
          name: params.vo.name,
          type: params.vo.type.value,
          target: params.vo.audience.target,
          channels: params.vo.channels.map((c) => c.value),
          createdBy: params.vo.createdBy.value,
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
    props: BroadcastEntityProps;
    version?: number;
  }): BroadcastEntity {
    const entity = new BroadcastEntity(
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
