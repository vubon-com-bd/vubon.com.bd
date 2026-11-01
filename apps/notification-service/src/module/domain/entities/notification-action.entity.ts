/**
 * NotificationActionEntity — Child of Notification
 * @module notification-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { NotificationActionVO } from '@domain/composites/notification-action.vo.js';
import type { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';

export interface NotificationActionEntityProps {
  readonly notificationId: NotificationIdVO;
  readonly action: NotificationActionVO;
  readonly triggeredAt?: string;
  readonly triggeredBy?: string;
  readonly triggerCount: number;
}

export class NotificationActionEntity extends BaseEntity<string> {
  private props: NotificationActionEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: NotificationActionEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: string;
    notificationId: NotificationIdVO;
    action: NotificationActionVO;
    now: string;
  }): NotificationActionEntity {
    return new NotificationActionEntity(params.id, params.now, params.now, {
      notificationId: params.notificationId,
      action: params.action,
      triggerCount: 0,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: NotificationActionEntityProps;
  }): NotificationActionEntity {
    return new NotificationActionEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
    );
  }

  get notificationId(): NotificationIdVO { return this.props.notificationId; }
  get action(): NotificationActionVO { return this.props.action; }
  get triggeredAt(): string | undefined { return this.props.triggeredAt; }
  get triggeredBy(): string | undefined { return this.props.triggeredBy; }
  get triggerCount(): number { return this.props.triggerCount; }

  trigger(by: string, at: string): void {
    this.props = {
      ...this.props,
      triggeredAt: at,
      triggeredBy: by,
      triggerCount: this.props.triggerCount + 1,
    };
  }
}
