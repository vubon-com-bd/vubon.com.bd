/**
 * NotificationRecipientEntity — Child of Notification
 * @module notification-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { NotificationRecipientVO } from '@domain/composites/notification-recipient.vo.js';
import type { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { DeliveryStatusVO } from '@domain/primitives/delivery-status.vo.js';

export interface NotificationRecipientEntityProps {
  readonly notificationId: NotificationIdVO;
  readonly recipient: NotificationRecipientVO;
  readonly deliveryStatus: DeliveryStatusVO;
  readonly deliveredAt?: string;
  readonly readAt?: string;
  readonly failureReason?: string;
}

export class NotificationRecipientEntity extends BaseEntity<string> {
  private props: NotificationRecipientEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: NotificationRecipientEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: string;
    notificationId: NotificationIdVO;
    recipient: NotificationRecipientVO;
    now: string;
  }): NotificationRecipientEntity {
    return new NotificationRecipientEntity(params.id, params.now, params.now, {
      notificationId: params.notificationId,
      recipient: params.recipient,
      deliveryStatus: DeliveryStatusVO.queued(),
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: NotificationRecipientEntityProps;
  }): NotificationRecipientEntity {
    return new NotificationRecipientEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
    );
  }

  get notificationId(): NotificationIdVO { return this.props.notificationId; }
  get recipient(): NotificationRecipientVO { return this.props.recipient; }
  get deliveryStatus(): DeliveryStatusVO { return this.props.deliveryStatus; }
  get deliveredAt(): string | undefined { return this.props.deliveredAt; }
  get readAt(): string | undefined { return this.props.readAt; }
  get failureReason(): string | undefined { return this.props.failureReason; }

  markDelivered(at: string): void {
    this.props = {
      ...this.props,
      deliveryStatus: DeliveryStatusVO.delivered(),
      deliveredAt: at,
    };
  }

  markRead(at: string): void {
    this.props = { ...this.props, readAt: at };
  }

  markFailed(reason: string): void {
    this.props = {
      ...this.props,
      deliveryStatus: DeliveryStatusVO.failed(),
      failureReason: reason,
    };
  }
}
