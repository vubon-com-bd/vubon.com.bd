/**
 * NotificationEntity — AGGREGATE ROOT
 * @module notification-service/domain/entities
 *
 * Lifecycle: draft → pending → queued → sending → sent → delivered
 *            pending → scheduled → queued → ...
 *            any → failed → (retry) pending
 *            any → cancelled | expired | archived
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { NotificationIdVO } from '../value-objects/primitives/notification-id.vo.js';
import { NotificationTypeVO } from '../value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../value-objects/primitives/notification-category.vo.js';
import { NotificationChannelVO } from '../value-objects/primitives/notification-channel.vo.js';
import { NotificationStatusVO } from '../value-objects/primitives/notification-status.vo.js';
import { NotificationPriorityVO } from '../value-objects/primitives/notification-priority.vo.js';
import { DeliveryStatusVO } from '../value-objects/primitives/delivery-status.vo.js';
import { DeliveryFailureReasonVO } from '../value-objects/primitives/delivery-failure-reason.vo.js';
import { ReadStatusVO } from '../value-objects/primitives/read-status.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { EmailAddressVO } from '../value-objects/primitives/email-address.vo.js';
import { PhoneNumberVO } from '../value-objects/primitives/phone-number.vo.js';
import { DeviceTokenVO } from '../value-objects/primitives/device-token.vo.js';

import { NotificationContentVO } from '../value-objects/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '../value-objects/composites/notification-recipient.vo.js';
import { NotificationActionsVO } from '../value-objects/composites/notification-actions.vo.js';
import { NotificationReferenceVO } from '../value-objects/composites/notification-reference.vo.js';

import {
  NotificationCreatedEvent,
  NotificationQueuedEvent,
  NotificationScheduledEvent,
  NotificationSendingEvent,
  NotificationSentEvent,
  NotificationDeliveredEvent,
  NotificationReadEvent,
  NotificationFailedEvent,
  NotificationCancelledEvent,
  NotificationExpiredEvent,
  NotificationArchivedEvent,
  NotificationStatusChangedEvent,
  NotificationRetryAttemptedEvent,
} from '../events/notification.events.js';

export interface NotificationEntityProps {
  readonly type: NotificationTypeVO;
  readonly category: NotificationCategoryVO;
  readonly channel: NotificationChannelVO;
  readonly status: NotificationStatusVO;
  readonly priority: NotificationPriorityVO;
  readonly content: NotificationContentVO;
  readonly recipient: NotificationRecipientVO;
  readonly actions?: NotificationActionsVO;
  readonly reference?: NotificationReferenceVO;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly data?: Readonly<Record<string, unknown>>;
  readonly scheduledAt?: string;
  readonly expiresAt?: string;
  readonly deliveryStatus?: DeliveryStatusVO;
  readonly provider?: string;
  readonly providerMessageId?: string;
  readonly failureReason?: DeliveryFailureReasonVO;
  readonly deliveryAttempts?: number;
  readonly readStatus?: ReadStatusVO;
  readonly readAt?: string;
  readonly sentAt?: string;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
  readonly cancelledAt?: string;
  readonly expiredAt?: string;
  readonly archivedAt?: string;
  readonly retryAttempts?: number;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class NotificationEntity extends AggregateRoot<string> {
  private _status: NotificationStatusVO;
  private _priority: NotificationPriorityVO;
  private _scheduledAt?: string;
  private _expiresAt?: string;
  private _deliveryStatus: DeliveryStatusVO;
  private _provider?: string;
  private _providerMessageId?: string;
  private _failureReason?: DeliveryFailureReasonVO;
  private _deliveryAttempts: number;
  private _readStatus: ReadStatusVO;
  private _readAt?: string;
  private _sentAt?: string;
  private _deliveredAt?: string;
  private _failedAt?: string;
  private _cancelledAt?: string;
  private _expiredAt?: string;
  private _archivedAt?: string;
  private _retryAttempts: number;

  private readonly _type: NotificationTypeVO;
  private readonly _category: NotificationCategoryVO;
  private readonly _channel: NotificationChannelVO;
  private readonly _content: NotificationContentVO;
  private readonly _recipient: NotificationRecipientVO;
  private readonly _actions?: NotificationActionsVO;
  private readonly _reference?: NotificationReferenceVO;
  private readonly _imageUrl?: string;
  private readonly _iconUrl?: string;
  private readonly _data?: Readonly<Record<string, unknown>>;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: NotificationEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._type = props.type;
    this._category = props.category;
    this._channel = props.channel;
    this._status = props.status;
    this._priority = props.priority;
    this._content = props.content;
    this._recipient = props.recipient;
    this._actions = props.actions;
    this._reference = props.reference;
    this._imageUrl = props.imageUrl;
    this._iconUrl = props.iconUrl;
    this._data = props.data;
    this._scheduledAt = props.scheduledAt;
    this._expiresAt = props.expiresAt;
    this._deliveryStatus = props.deliveryStatus ?? DeliveryStatusVO.queued();
    this._provider = props.provider;
    this._providerMessageId = props.providerMessageId;
    this._failureReason = props.failureReason;
    this._deliveryAttempts = props.deliveryAttempts ?? 0;
    this._readStatus = props.readStatus ?? ReadStatusVO.unread();
    this._readAt = props.readAt;
    this._sentAt = props.sentAt;
    this._deliveredAt = props.deliveredAt;
    this._failedAt = props.failedAt;
    this._cancelledAt = props.cancelledAt;
    this._expiredAt = props.expiredAt;
    this._archivedAt = props.archivedAt;
    this._retryAttempts = props.retryAttempts ?? 0;
    this._metadata = props.metadata;
    this.assertInvariants();
  }

  // ═══ Invariants ═══
  private assertInvariants(): void {
    if (this._recipient.channel.value !== this._channel.value) {
      throw new ValidationError(
        'Recipient channel must match notification channel',
        'recipientChannel',
      );
    }
    if (this._expiresAt && this.createdAt && this._expiresAt <= this.createdAt) {
      throw new ValidationError('expiresAt must be after createdAt', 'expiresAt');
    }
    if (this._retryAttempts < 0) {
      throw new ValidationError('Retry attempts cannot be negative', 'retryAttempts');
    }
    if (this._deliveryAttempts < 0) {
      throw new ValidationError('Delivery attempts cannot be negative', 'deliveryAttempts');
    }
  }

  // ═══ Getters ═══
  get type(): NotificationTypeVO { return this._type; }
  get category(): NotificationCategoryVO { return this._category; }
  get channel(): NotificationChannelVO { return this._channel; }
  get status(): NotificationStatusVO { return this._status; }
  get priority(): NotificationPriorityVO { return this._priority; }
  get content(): NotificationContentVO { return this._content; }
  get recipient(): NotificationRecipientVO { return this._recipient; }
  get actions(): NotificationActionsVO | undefined { return this._actions; }
  get reference(): NotificationReferenceVO | undefined { return this._reference; }
  get imageUrl(): string | undefined { return this._imageUrl; }
  get iconUrl(): string | undefined { return this._iconUrl; }
  get data(): Readonly<Record<string, unknown>> | undefined { return this._data; }
  get scheduledAt(): string | undefined { return this._scheduledAt; }
  get expiresAt(): string | undefined { return this._expiresAt; }
  get deliveryStatus(): DeliveryStatusVO { return this._deliveryStatus; }
  get provider(): string | undefined { return this._provider; }
  get providerMessageId(): string | undefined { return this._providerMessageId; }
  get failureReason(): DeliveryFailureReasonVO | undefined { return this._failureReason; }
  get deliveryAttempts(): number { return this._deliveryAttempts; }
  get readStatus(): ReadStatusVO { return this._readStatus; }
  get readAt(): string | undefined { return this._readAt; }
  get sentAt(): string | undefined { return this._sentAt; }
  get deliveredAt(): string | undefined { return this._deliveredAt; }
  get failedAt(): string | undefined { return this._failedAt; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get expiredAt(): string | undefined { return this._expiredAt; }
  get archivedAt(): string | undefined { return this._archivedAt; }
  get retryAttempts(): number { return this._retryAttempts; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): NotificationIdVO { return NotificationIdVO.reconstitute(this.id); }
  get userId(): UserIdVO { return this._recipient.userId; }

  // ═══ Predicates ═══
  isDraft(): boolean { return this._status.isDraft(); }
  isPending(): boolean { return this._status.isPending(); }
  isQueued(): boolean { return this._status.isQueued(); }
  isScheduled(): boolean { return this._status.isScheduled(); }
  isSending(): boolean { return this._status.isSending(); }
  isSent(): boolean { return this._status.isSent(); }
  isDelivered(): boolean { return this._status.isDelivered(); }
  isFailed(): boolean { return this._status.isFailed(); }
  isCancelled(): boolean { return this._status.isCancelled(); }
  isExpired(): boolean { return this._status.isExpired(); }
  isArchived(): boolean { return this._status.isArchived(); }
  isRead(): boolean { return this._readStatus.isRead(); }
  isUnread(): boolean { return this._readStatus.isUnread(); }
  isSuccess(): boolean { return this._status.isSuccess(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isInFlight(): boolean { return this._status.isInFlight(); }

  canBeCancelled(): boolean {
    return !this._status.isFinal() && !this._status.isSent() && !this._status.isDelivered();
  }

  canBeRetried(maxAttempts: number): boolean {
    return this._status.isRecoverable() && this._retryAttempts < maxAttempts;
  }

  isExpiredAt(at: Date = new Date()): boolean {
    if (!this._expiresAt) return false;
    return new Date(this._expiresAt).getTime() <= at.getTime();
  }

  // ═══ Business Methods ═══
  queue(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('queued');
    const from = this._status.value;
    this._status = NotificationStatusVO.queued();
    this._deliveryStatus = DeliveryStatusVO.queued();
    this.emitStatusChange(from, 'queued');
    this.addDomainEvent(
      new NotificationQueuedEvent({
        aggregateId: this.id,
        payload: {
          notificationId: this.id,
          userId: this.userId.value,
          channel: this._channel.value,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  schedule(scheduledAt: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('scheduled');
    if (new Date(scheduledAt).getTime() <= new Date(now).getTime()) {
      throw new BusinessRuleError(
        `Scheduled time must be in the future`,
        'SCHEDULE_TIME_IN_PAST',
        { scheduledAt, now },
      );
    }
    const from = this._status.value;
    this._status = NotificationStatusVO.scheduled();
    this._scheduledAt = scheduledAt;
    this.emitStatusChange(from, 'scheduled');
    this.addDomainEvent(
      new NotificationScheduledEvent({
        aggregateId: this.id,
        payload: {
          notificationId: this.id,
          userId: this.userId.value,
          channel: this._channel.value,
          scheduledAt,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  startSending(provider: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('sending');
    const from = this._status.value;
    this._status = NotificationStatusVO.sending();
    this._deliveryStatus = DeliveryStatusVO.sending();
    this._provider = provider;
    this._deliveryAttempts += 1;
    this.emitStatusChange(from, 'sending');
    this.addDomainEvent(
      new NotificationSendingEvent({
        aggregateId: this.id,
        payload: {
          notificationId: this.id,
          channel: this._channel.value,
          provider,
          attempt: this._deliveryAttempts,
          startedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markSent(providerMessageId?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('sent');
    const from = this._status.value;
    this._status = NotificationStatusVO.sent();
    this._deliveryStatus = DeliveryStatusVO.sent();
    if (providerMessageId) this._providerMessageId = providerMessageId;
    this._sentAt = now;
    this.emitStatusChange(from, 'sent');
    this.addDomainEvent(
      new NotificationSentEvent({
        aggregateId: this.id,
        payload: {
          notificationId: this.id,
          userId: this.userId.value,
          channel: this._channel.value,
          provider: this._provider ?? 'unknown',
          providerMessageId,
          sentAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markDelivered(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('delivered');
    const from = this._status.value;
    this._status = NotificationStatusVO.delivered();
    this._deliveryStatus = DeliveryStatusVO.delivered();
    this._deliveredAt = now;
    this.emitStatusChange(from, 'delivered');
    this.addDomainEvent(
      new NotificationDeliveredEvent({
        aggregateId: this.id,
        payload: {
          notificationId: this.id,
          userId: this.userId.value,
          channel: this._channel.value,
          deliveredAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markRead(now: string = new Date().toISOString()): void {
    if (!this._readStatus.isUnread()) {
      throw new BusinessRuleError(
        `Notification "${this.id}" is already in read-status "${this._readStatus.value}"`,
        'NOTIFICATION_ALREADY_READ',
        { notificationId: this.id, readStatus: this._readStatus.value },
      );
    }
    this._readStatus = ReadStatusVO.read();
    this._readAt = now;
    this._deliveryStatus = DeliveryStatusVO.read();
    this.addDomainEvent(
      new NotificationReadEvent({
        aggregateId: this.id,
        payload: {
          notificationId: this.id,
          userId: this.userId.value,
          readAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  fail(
    reason: DeliveryFailureReasonVO,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('failed');
    const from = this._status.value;
    this._status = NotificationStatusVO.failed();
    this._deliveryStatus = DeliveryStatusVO.failed();
    this._failureReason = reason;
    this._failedAt = now;
    this.emitStatusChange(from, 'failed');
    this.addDomainEvent(
      new NotificationFailedEvent({
        aggregateId: this.id,
        payload: {
          notificationId: this.id,
          userId: this.userId.value,
          channel: this._channel.value,
          failedAt: now,
          reason: reason.value,
          attempt: this._deliveryAttempts,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  cancel(reason?: string, cancelledBy?: string, now: string = new Date().toISOString()): void {
    if (!this.canBeCancelled()) {
      throw new BusinessRuleError(
        `Notification "${this.id}" cannot be cancelled in status "${this._status.value}"`,
        'NOTIFICATION_CANNOT_BE_CANCELLED',
        { notificationId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('cancelled');
    const from = this._status.value;
    this._status = NotificationStatusVO.cancelled();
    this._cancelledAt = now;
    this.emitStatusChange(from, 'cancelled', cancelledBy);
    this.addDomainEvent(
      new NotificationCancelledEvent({
        aggregateId: this.id,
        payload: {
          notificationId: this.id,
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

  expire(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('expired');
    const from = this._status.value;
    this._status = NotificationStatusVO.expired();
    this._expiredAt = now;
    this.emitStatusChange(from, 'expired');
    this.addDomainEvent(
      new NotificationExpiredEvent({
        aggregateId: this.id,
        payload: { notificationId: this.id, expiredAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  archive(archivedBy?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('archived');
    const from = this._status.value;
    this._status = NotificationStatusVO.archived();
    this._readStatus = ReadStatusVO.archived();
    this._archivedAt = now;
    this.emitStatusChange(from, 'archived', archivedBy);
    this.addDomainEvent(
      new NotificationArchivedEvent({
        aggregateId: this.id,
        payload: {
          notificationId: this.id,
          archivedAt: now,
          archivedBy,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  retry(now: string = new Date().toISOString()): void {
    if (!this._status.isRecoverable()) {
      throw new BusinessRuleError(
        `Notification "${this.id}" cannot be retried from status "${this._status.value}"`,
        'NOTIFICATION_CANNOT_BE_RETRIED',
        { notificationId: this.id, status: this._status.value },
      );
    }
    const from = this._status.value;
    this._retryAttempts += 1;
    this._status = NotificationStatusVO.pending();
    this._deliveryStatus = DeliveryStatusVO.queued();
    this._failureReason = undefined;
    this._failedAt = undefined;
    this.emitStatusChange(from, 'pending');
    this.addDomainEvent(
      new NotificationRetryAttemptedEvent({
        aggregateId: this.id,
        payload: {
          notificationId: this.id,
          attempt: this._retryAttempts,
          attemptedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  // ═══ Private Helpers ═══
  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid notification status transition: "${this._status.value}" → "${target}"`,
        'INVALID_NOTIFICATION_STATUS_TRANSITION',
        { from: this._status.value, to: target, notificationId: this.id },
      );
    }
  }

  private emitStatusChange(from: string, to: string, changedBy?: string): void {
    this.addDomainEvent(
      new NotificationStatusChangedEvent({
        aggregateId: this.id,
        payload: {
          notificationId: this.id,
          fromStatus: from,
          toStatus: to,
          changedBy,
        },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    props: Omit<
      NotificationEntityProps,
      'status' | 'deliveryStatus' | 'readStatus' | 'deliveryAttempts' | 'retryAttempts'
    >;
    now: string;
  }): NotificationEntity {
    const fullProps: NotificationEntityProps = {
      ...params.props,
      status: NotificationStatusVO.pending(),
      deliveryStatus: DeliveryStatusVO.queued(),
      readStatus: ReadStatusVO.unread(),
      deliveryAttempts: 0,
      retryAttempts: 0,
    };
    const entity = new NotificationEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(
      new NotificationCreatedEvent({
        aggregateId: params.id,
        payload: {
          notificationId: params.id,
          userId: params.props.recipient.userId.value,
          type: params.props.type.value,
          category: params.props.category.value,
          channel: params.props.channel.value,
          priority: params.props.priority.value,
          title: params.props.content.title.value,
          hasData: params.props.content.hasData(),
          actionCount: params.props.actions?.count ?? 0,
          referenceType: params.props.reference?.type,
          referenceId: params.props.reference?.id,
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
    props: NotificationEntityProps;
    version?: number;
  }): NotificationEntity {
    const entity = new NotificationEntity(
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
