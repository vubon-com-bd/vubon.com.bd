/**
 * DigestEntity — aggregated notification summary
 * @module notification-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { DigestIdVO } from '../value-objects/primitives/digest-id.vo.js';
import { DigestFrequencyVO } from '../value-objects/primitives/digest-frequency.vo.js';
import { DigestTypeVO } from '../value-objects/primitives/digest-type.vo.js';
import { DigestStatusVO } from '../value-objects/primitives/digest-status.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

import {
  DigestCreatedEvent,
  DigestGeneratingEvent,
  DigestReadyEvent,
  DigestSentEvent,
  DigestFailedEvent,
  DigestCancelledEvent,
} from '../events/digest.events.js';

export interface DigestEntityProps {
  readonly userId: string;
  readonly frequency: DigestFrequencyVO;
  readonly type: DigestTypeVO;
  readonly status: DigestStatusVO;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly itemCount: number;
  readonly itemIds?: readonly string[];
  readonly generatedAt?: string;
  readonly sentAt?: string;
  readonly channel?: string;
  readonly failureReason?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class DigestEntity extends AggregateRoot<string> {
  private _status: DigestStatusVO;
  private _itemCount: number;
  private _itemIds: readonly string[];
  private _generatedAt?: string;
  private _sentAt?: string;
  private _channel?: string;
  private _failureReason?: string;

  private readonly _userId: string;
  private readonly _frequency: DigestFrequencyVO;
  private readonly _type: DigestTypeVO;
  private readonly _periodStart: string;
  private readonly _periodEnd: string;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: DigestEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._frequency = props.frequency;
    this._type = props.type;
    this._status = props.status;
    this._periodStart = props.periodStart;
    this._periodEnd = props.periodEnd;
    this._itemCount = props.itemCount;
    this._itemIds = props.itemIds ?? [];
    this._generatedAt = props.generatedAt;
    this._sentAt = props.sentAt;
    this._channel = props.channel;
    this._failureReason = props.failureReason;
    this._metadata = props.metadata;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._periodEnd <= this._periodStart) {
      throw new ValidationError('periodEnd must be after periodStart', 'periodEnd');
    }
    if (this._itemCount < 0) {
      throw new ValidationError('itemCount cannot be negative', 'itemCount');
    }
  }

  get userId(): string { return this._userId; }
  get frequency(): DigestFrequencyVO { return this._frequency; }
  get type(): DigestTypeVO { return this._type; }
  get status(): DigestStatusVO { return this._status; }
  get periodStart(): string { return this._periodStart; }
  get periodEnd(): string { return this._periodEnd; }
  get itemCount(): number { return this._itemCount; }
  get itemIds(): readonly string[] { return this._itemIds; }
  get generatedAt(): string | undefined { return this._generatedAt; }
  get sentAt(): string | undefined { return this._sentAt; }
  get channel(): string | undefined { return this._channel; }
  get failureReason(): string | undefined { return this._failureReason; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): DigestIdVO { return DigestIdVO.reconstitute(this.id); }
  get toUserIdVO(): UserIdVO { return UserIdVO.reconstitute(this._userId); }

  isPending(): boolean { return this._status.isPending(); }
  isGenerating(): boolean { return this._status.isGenerating(); }
  isReady(): boolean { return this._status.isReady(); }
  isSent(): boolean { return this._status.isSent(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isEmpty(): boolean { return this._itemCount === 0; }

  // ═══ Business Methods ═══
  startGenerating(now: string = new Date().toISOString()): void {
    if (!this._status.isPending()) {
      throw new BusinessRuleError(
        `Cannot start generating digest from status "${this._status.value}"`,
        'DIGEST_CANNOT_START_GENERATING',
        { digestId: this.id, status: this._status.value },
      );
    }
    this._status = DigestStatusVO.generating();
    this.addDomainEvent(
      new DigestGeneratingEvent({
        aggregateId: this.id,
        payload: { digestId: this.id, startedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markReady(
    itemIds: readonly string[],
    now: string = new Date().toISOString(),
  ): void {
    if (!this._status.isGenerating()) {
      throw new BusinessRuleError(
        `Cannot mark digest ready from status "${this._status.value}"`,
        'DIGEST_CANNOT_BE_READY',
        { digestId: this.id, status: this._status.value },
      );
    }
    this._status = DigestStatusVO.ready();
    this._itemIds = itemIds;
    this._itemCount = itemIds.length;
    this._generatedAt = now;
    this.addDomainEvent(
      new DigestReadyEvent({
        aggregateId: this.id,
        payload: { digestId: this.id, readyAt: now, itemCount: this._itemCount },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markSent(channel: string, now: string = new Date().toISOString()): void {
    if (!this._status.canBeSent()) {
      throw new BusinessRuleError(
        `Cannot send digest from status "${this._status.value}"`,
        'DIGEST_CANNOT_BE_SENT',
        { digestId: this.id, status: this._status.value },
      );
    }
    this._status = DigestStatusVO.sent();
    this._sentAt = now;
    this._channel = channel;
    this.addDomainEvent(
      new DigestSentEvent({
        aggregateId: this.id,
        payload: {
          digestId: this.id,
          sentAt: now,
          channel,
          itemCount: this._itemCount,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  fail(reason: string, now: string = new Date().toISOString()): void {
    this._status = DigestStatusVO.failed();
    this._failureReason = reason;
    this.addDomainEvent(
      new DigestFailedEvent({
        aggregateId: this.id,
        payload: { digestId: this.id, failedAt: now, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  cancel(reason?: string, now: string = new Date().toISOString()): void {
    if (this._status.isFinal()) {
      throw new BusinessRuleError(
        `Cannot cancel digest from status "${this._status.value}"`,
        'DIGEST_CANNOT_BE_CANCELLED',
        { digestId: this.id, status: this._status.value },
      );
    }
    this._status = DigestStatusVO.cancelled();
    this.addDomainEvent(
      new DigestCancelledEvent({
        aggregateId: this.id,
        payload: { digestId: this.id, cancelledAt: now, reason },
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
    props: Omit<
      DigestEntityProps,
      'status' | 'itemCount' | 'itemIds' | 'generatedAt' | 'sentAt'
    > & { itemCount?: number };
    now: string;
  }): DigestEntity {
    const fullProps: DigestEntityProps = {
      ...params.props,
      status: DigestStatusVO.pending(),
      itemCount: params.props.itemCount ?? 0,
      itemIds: [],
    };
    const entity = new DigestEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(
      new DigestCreatedEvent({
        aggregateId: params.id,
        payload: {
          digestId: params.id,
          userId: params.props.userId,
          frequency: params.props.frequency.value,
          type: params.props.type.value,
          periodStart: params.props.periodStart,
          periodEnd: params.props.periodEnd,
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
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
