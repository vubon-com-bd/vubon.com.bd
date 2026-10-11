/**
 * NotificationVO — full aggregate snapshot
 * @module notification-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NotificationIdVO } from '../primitives/notification-id.vo.js';
import { NotificationTypeVO } from '../primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../primitives/notification-category.vo.js';
import { NotificationChannelVO } from '../primitives/notification-channel.vo.js';
import { NotificationStatusVO } from '../primitives/notification-status.vo.js';
import { NotificationPriorityVO } from '../primitives/notification-priority.vo.js';
import { NotificationContentVO } from './notification-content.vo.js';
import { NotificationRecipientVO } from './notification-recipient.vo.js';
import { NotificationActionsVO } from './notification-actions.vo.js';
import { NotificationDeliveryVO } from './notification-delivery.vo.js';
import { NotificationReadVO } from './notification-read.vo.js';
import { NotificationReferenceVO } from './notification-reference.vo.js';

export interface NotificationVOProps {
  readonly id: NotificationIdVO;
  readonly type: NotificationTypeVO;
  readonly category: NotificationCategoryVO;
  readonly channel: NotificationChannelVO;
  readonly status: NotificationStatusVO;
  readonly priority: NotificationPriorityVO;
  readonly content: NotificationContentVO;
  readonly recipient: NotificationRecipientVO;
  readonly actions?: NotificationActionsVO;
  readonly delivery?: NotificationDeliveryVO;
  readonly read?: NotificationReadVO;
  readonly reference?: NotificationReferenceVO;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly expiresAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class NotificationVO extends BaseVO<NotificationVOProps> {
  private constructor(props: NotificationVOProps) {
    super(props);
  }

  static create(props: NotificationVOProps): NotificationVO {
    const vo = new NotificationVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: NotificationVOProps): NotificationVO {
    return new NotificationVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.recipient.channel.value !== v.channel.value) {
      throw new ValidationError(
        'Recipient channel must match notification channel',
        'recipient.channel',
      );
    }
    if (v.expiresAt && v.createdAt && v.expiresAt < v.createdAt) {
      throw new ValidationError('expiresAt cannot be before createdAt', 'expiresAt');
    }
  }

  get id(): NotificationIdVO { return this.value.id; }
  get type(): NotificationTypeVO { return this.value.type; }
  get category(): NotificationCategoryVO { return this.value.category; }
  get channel(): NotificationChannelVO { return this.value.channel; }
  get status(): NotificationStatusVO { return this.value.status; }
  get priority(): NotificationPriorityVO { return this.value.priority; }
  get content(): NotificationContentVO { return this.value.content; }
  get recipient(): NotificationRecipientVO { return this.value.recipient; }
  get actions(): NotificationActionsVO | undefined { return this.value.actions; }
  get delivery(): NotificationDeliveryVO | undefined { return this.value.delivery; }
  get read(): NotificationReadVO | undefined { return this.value.read; }
  get reference(): NotificationReferenceVO | undefined { return this.value.reference; }
  get imageUrl(): string | undefined { return this.value.imageUrl; }
  get iconUrl(): string | undefined { return this.value.iconUrl; }
  get expiresAt(): string | undefined { return this.value.expiresAt; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isDelivered(): boolean {
    return this.value.delivery?.status.isDelivered() ?? false;
  }

  isExpired(at: Date = new Date()): boolean {
    if (!this.value.expiresAt) return false;
    return new Date(this.value.expiresAt).getTime() <= at.getTime();
  }

  hasActions(): boolean {
    return this.value.actions !== undefined && !this.value.actions.isEmpty();
  }
}
