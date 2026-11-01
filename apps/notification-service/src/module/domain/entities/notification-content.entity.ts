/**
 * NotificationContentEntity — Child of Notification
 * @module notification-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { NotificationContentVO } from '@domain/composites/notification-content.vo.js';
import type { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';

export interface NotificationContentEntityProps {
  readonly notificationId: NotificationIdVO;
  readonly content: NotificationContentVO;
  readonly renderedAt?: string;
}

export class NotificationContentEntity extends BaseEntity<string> {
  private props: NotificationContentEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: NotificationContentEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: string;
    notificationId: NotificationIdVO;
    content: NotificationContentVO;
    now: string;
  }): NotificationContentEntity {
    return new NotificationContentEntity(params.id, params.now, params.now, {
      notificationId: params.notificationId,
      content: params.content,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: NotificationContentEntityProps;
  }): NotificationContentEntity {
    return new NotificationContentEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
    );
  }

  get notificationId(): NotificationIdVO { return this.props.notificationId; }
  get content(): NotificationContentVO { return this.props.content; }
  get renderedAt(): string | undefined { return this.props.renderedAt; }

  markRendered(at: string): void {
    this.props = { ...this.props, renderedAt: at };
  }
}
