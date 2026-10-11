/**
 * BroadcastEntity — mass-send notification
 * @module notification-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NOTIFICATION_BROADCAST } from '@vubon/shared-constants/platform/notification';

import { BroadcastIdVO } from '../value-objects/primitives/broadcast-id.vo.js';
import { BroadcastTypeVO } from '../value-objects/primitives/broadcast-type.vo.js';
import { BroadcastStatusVO } from '../value-objects/primitives/broadcast-status.vo.js';
import { BroadcastTargetVO } from '../value-objects/primitives/broadcast-target.vo.js';

import {
  BroadcastCreatedEvent,
  BroadcastScheduledEvent,
  BroadcastStartedEvent,
  BroadcastProgressEvent,
  BroadcastCompletedEvent,
  BroadcastPartiallyCompletedEvent,
  BroadcastFailedEvent,
  BroadcastCancelledEvent,
} from '../events/broadcast.events.js';

export interface BroadcastEntityProps {
  readonly type: BroadcastTypeVO;
  readonly status: BroadcastStatusVO;
  readonly target: BroadcastTargetVO;
  readonly templateId: string;
  readonly estimatedRecipients?: number;
  readonly totalRecipients?: number;
  readonly processed?: number;
  readonly succeeded?: number;
  readonly failed?: number;
  readonly scheduledAt?: string;
  readonly startedAt?: string;
  readonly completedAt?: string;
  readonly failureReasons?: readonly string[];
  readonly createdBy: string;
  readonly approvedBy?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class BroadcastEntity extends AggregateRoot<string> {
  private _status: BroadcastStatusVO;
  private _estimatedRecipients?: number;
  private _totalRecipients?: number;
  private _processed: number;
  private _succeeded: number;
  private _failed: number;
  private _scheduledAt?: string;
  private _startedAt?: string;
  private _completedAt?: string;
  private _failureReasons: readonly string[];
  private _approvedBy?: string;

  private readonly _type: BroadcastTypeVO;
  private readonly _target: BroadcastTargetVO;
  private readonly _templateId: string;
  private readonly _createdBy: string;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: BroadcastEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._type = props.type;
    this._status = props.status;
    this._target = props.target;
    this._templateId = props.templateId;
    this._estimatedRecipients = props.estimatedRecipients;
    this._totalRecipients = props.totalRecipients;
    this._processed = props.processed ?? 0;
    this._succeeded = props.succeeded ?? 0;
    this._failed = props.failed ?? 0;
    this._scheduledAt = props.scheduledAt;
    this._startedAt = props.startedAt;
    this._completedAt = props.completedAt;
    this._failureReasons = props.failureReasons ?? [];
    this._createdBy = props.createdBy;
    this._approvedBy = props.approvedBy;
    this._metadata = props.metadata;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._templateId || this._templateId.length === 0) {
      throw new ValidationError('Broadcast requires a template id', 'templateId');
    }
    if (this._succeeded < 0 || this._failed < 0 || this._processed < 0) {
      throw new ValidationError('Counts cannot be negative', 'counts');
    }
    if (
      this._totalRecipients !== undefined &&
      this._totalRecipients > NOTIFICATION_BROADCAST.MAX_RECIPIENTS
    ) {
      throw new ValidationError(
        `Recipients exceed max ${NOTIFICATION_BROADCAST.MAX_RECIPIENTS}`,
        'totalRecipients',
      );
    }
  }

  get type(): BroadcastTypeVO { return this._type; }
  get status(): BroadcastStatusVO { return this._status; }
  get target(): BroadcastTargetVO { return this._target; }
  get templateId(): string { return this._templateId; }
  get estimatedRecipients(): number | undefined { return this._estimatedRecipients; }
  get totalRecipients(): number | undefined { return this._totalRecipients; }
  get processed(): number { return this._processed; }
  get succeeded(): number { return this._succeeded; }
  get failed(): number { return this._failed; }
  get scheduledAt(): string | undefined { return this._scheduledAt; }
  get startedAt(): string | undefined { return this._startedAt; }
  get completedAt(): string | undefined { return this._completedAt; }
  get failureReasons(): readonly string[] { return this._failureReasons; }
  get createdBy(): string { return this._createdBy; }
  get approvedBy(): string | undefined { return this._approvedBy; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): BroadcastIdVO { return BroadcastIdVO.reconstitute(this.id); }

  isDraft(): boolean { return this._status.isDraft(); }
  isScheduled(): boolean { return this._status.isScheduled(); }
  isSending(): boolean { return this._status.isSending(); }
  isSent(): boolean { return this._status.isSent(); }
  isFinal(): boolean { return this._status.isFinal(); }
  canCancel(): boolean { return this._status.canBeCancelled(); }

  progressPercent(): number {
    if (!this._totalRecipients || this._totalRecipients === 0) return 0;
    return Math.min(100, Math.round((this._processed / this._totalRecipients) * 100));
  }

  // ═══ Business Methods ═══
  schedule(scheduledAt: string, now: string = new Date().toISOString()): void {
    if (!this._status.isDraft()) {
      throw new BusinessRuleError(
        `Cannot schedule broadcast from status "${this._status.value}"`,
        'BROADCAST_CANNOT_BE_SCHEDULED',
        { broadcastId: this.id, status: this._status.value },
      );
    }
    this._status = BroadcastStatusVO.scheduled();
    this._scheduledAt = scheduledAt;
    this.addDomainEvent(
      new BroadcastScheduledEvent({
        aggregateId: this.id,
        payload: { broadcastId: this.id, scheduledAt },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  start(
    totalRecipients: number,
    approvedBy?: string,
    now: string = new Date().toISOString(),
  ): void {
    if (!this._status.isDraft() && !this._status.isScheduled()) {
      throw new BusinessRuleError(
        `Cannot start broadcast from status "${this._status.value}"`,
        'BROADCAST_CANNOT_BE_STARTED',
        { broadcastId: this.id, status: this._status.value },
      );
    }
    if (totalRecipients > NOTIFICATION_BROADCAST.MAX_RECIPIENTS) {
      throw new BusinessRuleError(
        `Total recipients ${totalRecipients} exceeds max ${NOTIFICATION_BROADCAST.MAX_RECIPIENTS}`,
        'BROADCAST_RECIPIENT_LIMIT_EXCEEDED',
        { broadcastId: this.id, totalRecipients, max: NOTIFICATION_BROADCAST.MAX_RECIPIENTS },
      );
    }
    this._status = BroadcastStatusVO.sending();
    this._totalRecipients = totalRecipients;
    this._startedAt = now;
    if (approvedBy) this._approvedBy = approvedBy;
    this.addDomainEvent(
      new BroadcastStartedEvent({
        aggregateId: this.id,
        payload: {
          broadcastId: this.id,
          startedAt: now,
          totalRecipients,
          batchSize: NOTIFICATION_BROADCAST.BATCH_SIZE,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  recordProgress(
    batchProcessed: number,
    batchSucceeded: number,
    batchFailed: number,
    now: string = new Date().toISOString(),
  ): void {
    if (!this._status.isSending()) {
      throw new BusinessRuleError(
        `Cannot record progress for broadcast "${this.id}" in status "${this._status.value}"`,
        'BROADCAST_NOT_SENDING',
        { broadcastId: this.id, status: this._status.value },
      );
    }
    this._processed += batchProcessed;
    this._succeeded += batchSucceeded;
    this._failed += batchFailed;
    this.addDomainEvent(
      new BroadcastProgressEvent({
        aggregateId: this.id,
        payload: {
          broadcastId: this.id,
          processed: this._processed,
          total: this._totalRecipients ?? 0,
          succeeded: this._succeeded,
          failed: this._failed,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  complete(now: string = new Date().toISOString()): void {
    if (!this._status.isSending()) {
      throw new BusinessRuleError(
        `Cannot complete broadcast from status "${this._status.value}"`,
        'BROADCAST_CANNOT_BE_COMPLETED',
        { broadcastId: this.id, status: this._status.value },
      );
    }
    this._status = BroadcastStatusVO.sent();
    this._completedAt = now;
    this.addDomainEvent(
      new BroadcastCompletedEvent({
        aggregateId: this.id,
        payload: {
          broadcastId: this.id,
          completedAt: now,
          totalRecipients: this._totalRecipients ?? 0,
          succeeded: this._succeeded,
          failed: this._failed,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  partiallyComplete(
    failureReasons: readonly string[],
    now: string = new Date().toISOString(),
  ): void {
    if (!this._status.isSending()) {
      throw new BusinessRuleError(
        `Cannot mark broadcast partially complete from "${this._status.value}"`,
        'BROADCAST_CANNOT_BE_COMPLETED',
        { broadcastId: this.id, status: this._status.value },
      );
    }
    this._status = BroadcastStatusVO.partiallySent();
    this._completedAt = now;
    this._failureReasons = failureReasons;
    this.addDomainEvent(
      new BroadcastPartiallyCompletedEvent({
        aggregateId: this.id,
        payload: {
          broadcastId: this.id,
          completedAt: now,
          totalRecipients: this._totalRecipients ?? 0,
          succeeded: this._succeeded,
          failed: this._failed,
          failureReasons,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  fail(reason: string, now: string = new Date().toISOString()): void {
    if (!this._status.isSending()) {
      throw new BusinessRuleError(
        `Cannot fail broadcast from status "${this._status.value}"`,
        'BROADCAST_CANNOT_BE_FAILED',
        { broadcastId: this.id, status: this._status.value },
      );
    }
    this._status = BroadcastStatusVO.failed();
    this._completedAt = now;
    this.addDomainEvent(
      new BroadcastFailedEvent({
        aggregateId: this.id,
        payload: {
          broadcastId: this.id,
          failedAt: now,
          reason,
          processedBeforeFailure: this._processed,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  cancel(cancelledBy?: string, reason?: string, now: string = new Date().toISOString()): void {
    if (!this.canCancel()) {
      throw new BusinessRuleError(
        `Cannot cancel broadcast in status "${this._status.value}"`,
        'BROADCAST_CANNOT_BE_CANCELLED',
        { broadcastId: this.id, status: this._status.value },
      );
    }
    this._status = BroadcastStatusVO.cancelled();
    this.addDomainEvent(
      new BroadcastCancelledEvent({
        aggregateId: this.id,
        payload: {
          broadcastId: this.id,
          cancelledAt: now,
          cancelledBy,
          reason,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    props: Omit<BroadcastEntityProps, 'status' | 'processed' | 'succeeded' | 'failed'>;
    now: string;
  }): BroadcastEntity {
    const fullProps: BroadcastEntityProps = {
      ...params.props,
      status: BroadcastStatusVO.draft(),
      processed: 0,
      succeeded: 0,
      failed: 0,
    };
    const entity = new BroadcastEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(
      new BroadcastCreatedEvent({
        aggregateId: params.id,
        payload: {
          broadcastId: params.id,
          type: params.props.type.value,
          target: params.props.target.value,
          createdBy: params.props.createdBy,
          estimatedRecipients: params.props.estimatedRecipients,
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
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
