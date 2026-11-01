/**
 * NotificationEntity — AGGREGATE ROOT
 * @module notification-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import type { NotificationVO } from '@domain/composites/notification.vo.js';
import type { NotificationContentVO } from '@domain/composites/notification-content.vo.js';
import type { NotificationRecipientVO } from '@domain/composites/notification-recipient.vo.js';
import type { NotificationActionVO } from '@domain/composites/notification-action.vo.js';
import type { NotificationDeliveryVO } from '@domain/composites/notification-delivery.vo.js';
import type { NotificationAttemptVO } from '@domain/composites/notification-attempt.vo.js';

import { NotificationStatusVO } from '@domain/primitives/notification-status.vo.js';
import type { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import type { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';

import {
  NotificationCreatedEvent,
  NotificationSentEvent,
  NotificationDeliveredEvent,
  NotificationCancelledEvent,
  NotificationExpiredEvent,
  NotificationStatusChangedEvent,
} from '@domain/events/notification.events.js';

export interface NotificationEntityProps {
  readonly vo: NotificationVO;
  readonly content: NotificationContentVO;
  readonly recipients: readonly NotificationRecipientVO[];
  readonly actions: readonly NotificationActionVO[];
  readonly delivery?: NotificationDeliveryVO;
  readonly attempts: readonly NotificationAttemptVO[];
  readonly scheduledAt?: string;
  readonly sentAt?: string;
  readonly deliveredAt?: string;
  readonly expiresAt?: string;
  readonly cancelledAt?: string;
  readonly cancelledBy?: string;
  readonly cancelledReason?: string;
}

export class NotificationEntity extends AggregateRoot<string> {
  private _vo: NotificationVO;
  private _content: NotificationContentVO;
  private _recipients: readonly NotificationRecipientVO[];
  private _actions: readonly NotificationActionVO[];
  private _delivery?: NotificationDeliveryVO;
  private _attempts: readonly NotificationAttemptVO[];
  private _scheduledAt?: string;
  private _sentAt?: string;
  private _deliveredAt?: string;
  private _expiresAt?: string;
  private _cancelledAt?: string;
  private _cancelledBy?: string;
  private _cancelledReason?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: NotificationEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
    this._content = props.content;
    this._recipients = props.recipients;
    this._actions = props.actions;
    this._delivery = props.delivery;
    this._attempts = props.attempts;
    this._scheduledAt = props.scheduledAt;
    this._sentAt = props.sentAt;
    this._deliveredAt = props.deliveredAt;
    this._expiresAt = props.expiresAt;
    this._cancelledAt = props.cancelledAt;
    this._cancelledBy = props.cancelledBy;
    this._cancelledReason = props.cancelledReason;

    this.assertInvariants();
  }

  private assertInvariants(): void {
    const status = this._vo.status;

    if (status.isSent() && !this._sentAt) {
      throw new ValidationError('Sent notification requires sentAt', 'sentAt');
    }
    if (status.isDelivered() && !this._deliveredAt) {
      throw new ValidationError('Delivered notification requires deliveredAt', 'deliveredAt');
    }
    if (status.isCancelled() && !this._cancelledAt) {
      throw new ValidationError('Cancelled notification requires cancelledAt', 'cancelledAt');
    }
    if (this._recipients.length === 0) {
      throw new ValidationError('Notification requires at least one recipient', 'recipients');
    }
    if (this._vo.isSilent() && this._vo.type.isSecurity()) {
      throw new ValidationError('Security notification cannot be silent', 'priority');
    }
  }

  get vo(): NotificationVO { return this._vo; }
  get notificationId(): NotificationIdVO { return this._vo.id; }
  get status(): NotificationStatusVO { return this._vo.status; }
  get priority(): NotificationPriorityVO { return this._vo.priority; }
  get content(): NotificationContentVO { return this._content; }
  get recipients(): readonly NotificationRecipientVO[] { return this._recipients; }
  get actions(): readonly NotificationActionVO[] { return this._actions; }
  get delivery(): NotificationDeliveryVO | undefined { return this._delivery; }
  get attempts(): readonly NotificationAttemptVO[] { return this._attempts; }
  get scheduledAt(): string | undefined { return this._scheduledAt; }
  get sentAt(): string | undefined { return this._sentAt; }
  get deliveredAt(): string | undefined { return this._deliveredAt; }
  get expiresAt(): string | undefined { return this._expiresAt; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get cancelledBy(): string | undefined { return this._cancelledBy; }
  get cancelledReason(): string | undefined { return this._cancelledReason; }

  isDraft(): boolean { return this.status.isDraft(); }
  isPending(): boolean { return this.status.isPending(); }
  isQueued(): boolean { return this.status.isQueued(); }
  isScheduled(): boolean { return this.status.isScheduled(); }
  isSending(): boolean { return this.status.isSending(); }
  isSent(): boolean { return this.status.isSent(); }
  isDelivered(): boolean { return this.status.isDelivered(); }
  isFailed(): boolean { return this.status.isFailed(); }
  isCancelled(): boolean { return this.status.isCancelled(); }
  isExpired(): boolean { return this.status.isExpired(); }
  isArchived(): boolean { return this.status.isArchived(); }
  isTerminal(): boolean { return this.status.isTerminal(); }
  isInFlight(): boolean { return this.status.isInFlight(); }

  isExpiredByDate(now: Date = new Date()): boolean {
    if (!this._expiresAt) return false;
    return new Date(this._expiresAt).getTime() < now.getTime();
  }

  canBeSent(): boolean {
    return this.status.isDraft() || this.status.isPending() || this.status.isQueued();
  }

  canBeCancelled(): boolean {
    return (
      this.status.isDraft() ||
      this.status.isPending() ||
      this.status.isQueued() ||
      this.status.isScheduled()
    );
  }

  canBeRetried(): boolean {
    return (
      this.status.isFailed() &&
      this.attempts.length < (this._delivery?.maxAttempts ?? 3)
    );
  }

  schedule(scheduledAt: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('scheduled');
    if (new Date(scheduledAt).getTime() <= new Date(now).getTime()) {
      throw new BusinessRuleError(
        'Scheduled time must be in the future',
        'NOTIFICATION_SCHEDULED_IN_PAST',
        { notificationId: this.id, scheduledAt },
      );
    }
    const from = this.status.value;
    this._vo = this._vo.withStatus(NotificationStatusVO.scheduled());
    this._scheduledAt = scheduledAt;
    this.emitStatusChange(from, 'scheduled');
    this.touch(now);
    this.incrementVersion();
  }

  queue(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('queued');
    const from = this.status.value;
    this._vo = this._vo.withStatus(NotificationStatusVO.queued());
    this.emitStatusChange(from, 'queued');
    this.touch(now);
    this.incrementVersion();
  }

  markSending(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('sending');
    const from = this.status.value;
    this._vo = this._vo.withStatus(NotificationStatusVO.sending());
    this.emitStatusChange(from, 'sending');
    this.touch(now);
    this.incrementVersion();
  }

  markSent(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('sent');
    const from = this.status.value;
    this._vo = this._vo.withStatus(NotificationStatusVO.sent());
    this._sentAt = now;
    this.emitStatusChange(from, 'sent');
    this.addDomainEvent(
      new NotificationSentEvent({
        aggregateId: this.id,
        payload: {
          notificationId: this.id,
          channel: this._vo.channel.value,
          providerName: this._delivery?.providerName?.value,
          providerMessageId: this._delivery?.providerMessageId?.value,
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
    const from = this.status.value;
    this._vo = this._vo.withStatus(NotificationStatusVO.delivered());
    this._deliveredAt = now;
    this.emitStatusChange(from, 'delivered');
    this.addDomainEvent(
      new NotificationDeliveredEvent({
        aggregateId: this.id,
        payload: {
          notificationId: this.id,
          deliveredAt: now,
          providerMessageId: this._delivery?.providerMessageId?.value,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markFailed(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('failed');
    const from = this.status.value;
    this._vo = this._vo.withStatus(NotificationStatusVO.failed());
    this.emitStatusChange(from, 'failed', undefined, reason);
    this.touch(now);
    this.incrementVersion();
  }

  cancel(
    reason?: string,
    cancelledBy?: string,
    now: string = new Date().toISOString(),
  ): void {
    if (!this.canBeCancelled()) {
      throw new BusinessRuleError(
        `Cannot cancel notification in status "${this.status.value}"`,
        'NOTIFICATION_CANNOT_BE_CANCELLED',
        { notificationId: this.id, status: this.status.value },
      );
    }
    this.assertTransitionTo('cancelled');
    const from = this.status.value;
    this._vo = this._vo.withStatus(NotificationStatusVO.cancelled());
    this._cancelledAt = now;
    this._cancelledBy = cancelledBy;
    this._cancelledReason = reason;
    this.emitStatusChange(from, 'cancelled', cancelledBy, reason);
    this.addDomainEvent(
      new NotificationCancelledEvent({
        aggregateId: this.id,
        payload: { notificationId: this.id, reason, cancelledBy, cancelledAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  expire(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('expired');
    const from = this.status.value;
    this._vo = this._vo.withStatus(NotificationStatusVO.expired());
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

  archive(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('archived');
    const from = this.status.value;
    this._vo = this._vo.withStatus(NotificationStatusVO.archived());
    this.emitStatusChange(from, 'archived');
    this.touch(now);
    this.incrementVersion();
  }

  changePriority(priority: NotificationPriorityVO, now: string = new Date().toISOString()): void {
    if (this.status.isTerminal()) {
      throw new BusinessRuleError(
        'Cannot change priority of terminal notification',
        'NOTIFICATION_TERMINAL',
        { notificationId: this.id, status: this.status.value },
      );
    }
    this._vo = this._vo.withPriority(priority);
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this.status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid notification status transition: "${this.status.value}" → "${target}"`,
        'INVALID_NOTIFICATION_STATUS_TRANSITION',
        { from: this.status.value, to: target, notificationId: this.id },
      );
    }
  }

  private emitStatusChange(
    from: string,
    to: string,
    changedBy?: string,
    reason?: string,
  ): void {
    this.addDomainEvent(
      new NotificationStatusChangedEvent({
        aggregateId: this.id,
        payload: {
          notificationId: this.id,
          fromStatus: from,
          toStatus: to,
          changedBy,
          reason,
        },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: NotificationIdVO;
    vo: NotificationVO;
    content: NotificationContentVO;
    recipients: readonly NotificationRecipientVO[];
    actions?: readonly NotificationActionVO[];
    expiresAt?: string;
    now: string;
  }): NotificationEntity {
    if (!params.vo.status.isDraft() && !params.vo.status.isPending()) {
      throw new ValidationError('New notification must be draft or pending', 'status');
    }

    const entity = new NotificationEntity(
      params.id.value,
      params.now,
      params.now,
      {
        vo: params.vo,
        content: params.content,
        recipients: params.recipients,
        actions: params.actions ?? [],
        attempts: [],
        expiresAt: params.expiresAt,
      },
      null,
    );

    entity.addDomainEvent(
      new NotificationCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          notificationId: params.id.value,
          userId: params.vo.userId.value,
          type: params.vo.type.value,
          category: params.vo.category.value,
          channel: params.vo.channel.value,
          priority: params.vo.priority.value,
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
    props: NotificationEntityProps;
    version?: number;
  }): NotificationEntity {
    const entity = new NotificationEntity(
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
