/**
 * BroadcastVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * Broadcast aggregate-এর immutable core state।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NOTIFICATION_BROADCAST } from '@vubon/shared-constants/platform';

import { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';
import { BroadcastTypeVO } from '@domain/primitives/broadcast-type.vo.js';
import { BroadcastStatusVO } from '@domain/primitives/broadcast-status.vo.js';
import { BroadcastAudienceVO } from '@domain/primitives/broadcast-audience.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { NotificationContentVO } from '@domain/composites/notification-content.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

export interface BroadcastVOProps {
  readonly id: BroadcastIdVO;
  readonly name: string;
  readonly type: BroadcastTypeVO;
  readonly status: BroadcastStatusVO;
  readonly audience: BroadcastAudienceVO;
  readonly channels: readonly NotificationChannelVO[];
  readonly templateId?: TemplateIdVO;
  readonly content?: NotificationContentVO;
  readonly createdBy: UserIdVO;
  readonly approvedBy?: UserIdVO;
  readonly scheduledAt?: string;
  readonly startedAt?: string;
  readonly completedAt?: string;
  readonly recipientCount: number;
  readonly sentCount: number;
  readonly failedCount: number;
}

export class BroadcastVO extends BaseVO<BroadcastVOProps> {
  private constructor(props: BroadcastVOProps) {
    super(Object.freeze(props));
  }

  static create(props: BroadcastVOProps): BroadcastVO {
    const vo = new BroadcastVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: BroadcastVOProps): BroadcastVO {
    return new BroadcastVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.name || v.name.trim().length === 0) {
      throw new ValidationError('Broadcast name cannot be empty', 'name');
    }
    if (v.channels.length === 0) {
      throw new ValidationError('Broadcast requires at least one channel', 'channels');
    }
    // Must have either template OR content (not both-empty)
    if (!v.templateId && !v.content) {
      throw new ValidationError(
        'Broadcast requires either templateId or content',
        'templateId',
      );
    }
    // Cannot have both template and content (mutually exclusive)
    if (v.templateId && v.content) {
      throw new ValidationError(
        'Broadcast cannot have both templateId and content',
        'content',
      );
    }
    // Recipient limit check
    if (v.recipientCount > NOTIFICATION_BROADCAST.MAX_RECIPIENTS) {
      throw new ValidationError(
        `Broadcast recipient count ${v.recipientCount} exceeds max ${NOTIFICATION_BROADCAST.MAX_RECIPIENTS}`,
        'recipientCount',
      );
    }
    if (v.sentCount + v.failedCount > v.recipientCount) {
      throw new ValidationError(
        'sentCount + failedCount cannot exceed recipientCount',
        'sentCount',
      );
    }
    // Sent/completed status requires completedAt
    if ((v.status.isSent() || v.status.isPartiallySent()) && !v.completedAt) {
      throw new ValidationError('Sent broadcast requires completedAt', 'completedAt');
    }
  }

  get id(): BroadcastIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get type(): BroadcastTypeVO { return this.value.type; }
  get status(): BroadcastStatusVO { return this.value.status; }
  get audience(): BroadcastAudienceVO { return this.value.audience; }
  get channels(): readonly NotificationChannelVO[] { return this.value.channels; }
  get templateId(): TemplateIdVO | undefined { return this.value.templateId; }
  get content(): NotificationContentVO | undefined { return this.value.content; }
  get createdBy(): UserIdVO { return this.value.createdBy; }
  get approvedBy(): UserIdVO | undefined { return this.value.approvedBy; }
  get scheduledAt(): string | undefined { return this.value.scheduledAt; }
  get startedAt(): string | undefined { return this.value.startedAt; }
  get completedAt(): string | undefined { return this.value.completedAt; }
  get recipientCount(): number { return this.value.recipientCount; }
  get sentCount(): number { return this.value.sentCount; }
  get failedCount(): number { return this.value.failedCount; }

  isDraft(): boolean { return this.status.isDraft(); }
  isScheduled(): boolean { return this.status.isScheduled(); }
  isSending(): boolean { return this.status.isSending(); }
  isSent(): boolean { return this.status.isSent(); }
  isFailed(): boolean { return this.status.isFailed(); }
  isCancelled(): boolean { return this.status.isCancelled(); }
  isTerminal(): boolean { return this.status.isTerminal(); }
  canBeCancelled(): boolean { return this.status.canBeCancelled(); }

  isApproved(): boolean { return this.value.approvedBy !== undefined; }
  requiresApproval(): boolean {
    return NOTIFICATION_BROADCAST.REQUIRE_APPROVAL && !this.isApproved();
  }

  usesTemplate(): boolean { return this.value.templateId !== undefined; }
  usesInlineContent(): boolean { return this.value.content !== undefined; }

  get pendingCount(): number {
    return this.value.recipientCount - this.value.sentCount - this.value.failedCount;
  }

  get successRate(): number {
    if (this.value.sentCount === 0) return 0;
    return this.value.sentCount / (this.value.sentCount + this.value.failedCount);
  }

  get channelsCount(): number { return this.value.channels.length; }

  hasChannel(channel: string): boolean {
    return this.value.channels.some((c) => c.value === channel);
  }

  withStatus(status: BroadcastStatusVO): BroadcastVO {
    return BroadcastVO.create({ ...this.value, status });
  }

  withProgress(sent: number, failed: number): BroadcastVO {
    return BroadcastVO.create({ ...this.value, sentCount: sent, failedCount: failed });
  }

  withApproval(approvedBy: UserIdVO): BroadcastVO {
    return BroadcastVO.create({ ...this.value, approvedBy });
  }
}
