/**
 * NotificationDeliveryEntity — Child of Notification
 * @module notification-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { NotificationDeliveryVO } from '@domain/composites/notification-delivery.vo.js';
import type { DeliveryStatusVO } from '@domain/primitives/delivery-status.vo.js';
import type { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';

export interface NotificationDeliveryEntityProps {
  readonly notificationId: NotificationIdVO;
  readonly delivery: NotificationDeliveryVO;
  readonly startedAt?: string;
  readonly completedAt?: string;
}

export class NotificationDeliveryEntity extends BaseEntity<string> {
  private props: NotificationDeliveryEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: NotificationDeliveryEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: string;
    notificationId: NotificationIdVO;
    delivery: NotificationDeliveryVO;
    now: string;
  }): NotificationDeliveryEntity {
    return new NotificationDeliveryEntity(params.id, params.now, params.now, {
      notificationId: params.notificationId,
      delivery: params.delivery,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: NotificationDeliveryEntityProps;
  }): NotificationDeliveryEntity {
    return new NotificationDeliveryEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
    );
  }

  get notificationId(): NotificationIdVO { return this.props.notificationId; }
  get delivery(): NotificationDeliveryVO { return this.props.delivery; }
  get startedAt(): string | undefined { return this.props.startedAt; }
  get completedAt(): string | undefined { return this.props.completedAt; }
  get status(): DeliveryStatusVO { return this.props.delivery.status; }
  get canRetry(): boolean { return this.props.delivery.canRetry; }

  transitionTo(status: DeliveryStatusVO): void {
    this.props = {
      ...this.props,
      delivery: NotificationDeliveryVO.create({
        ...this.props.delivery.value,
        status,
      }),
    };
  }
}
