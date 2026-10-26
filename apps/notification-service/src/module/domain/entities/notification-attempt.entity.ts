/**
 * NotificationAttemptEntity — Child of Notification
 * @module notification-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { NotificationAttemptVO } from '@domain/composites/notification-attempt.vo.js';
import type { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';

export interface NotificationAttemptEntityProps {
  readonly notificationId: NotificationIdVO;
  readonly attempt: NotificationAttemptVO;
}

export class NotificationAttemptEntity extends BaseEntity<string> {
  private props: NotificationAttemptEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: NotificationAttemptEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: string;
    notificationId: NotificationIdVO;
    attempt: NotificationAttemptVO;
    now: string;
  }): NotificationAttemptEntity {
    return new NotificationAttemptEntity(params.id, params.now, params.now, {
      notificationId: params.notificationId,
      attempt: params.attempt,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: NotificationAttemptEntityProps;
  }): NotificationAttemptEntity {
    return new NotificationAttemptEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
    );
  }

  get notificationId(): NotificationIdVO { return this.props.notificationId; }
  get attempt(): NotificationAttemptVO { return this.props.attempt; }
  get succeeded(): boolean { return this.props.attempt.succeeded; }
  get isRetryable(): boolean { return this.props.attempt.isRetryable; }
}
