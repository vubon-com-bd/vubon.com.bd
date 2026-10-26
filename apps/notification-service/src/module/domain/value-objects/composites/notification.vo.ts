/**
 * NotificationVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * Notification aggregate-এর immutable core state।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { NotificationStatusVO } from '@domain/primitives/notification-status.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import { NotificationSubjectVO } from '@domain/primitives/notification-subject.vo.js';
import { NotificationBodyVO } from '@domain/primitives/notification-body.vo.js';
import { NotificationDataVO } from '@domain/primitives/notification-data.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

export interface NotificationVOProps {
  readonly id: NotificationIdVO;
  readonly userId: UserIdVO;
  readonly type: NotificationTypeVO;
  readonly category: NotificationCategoryVO;
  readonly channel: NotificationChannelVO;
  readonly priority: NotificationPriorityVO;
  readonly status: NotificationStatusVO;
  readonly subject: NotificationSubjectVO;
  readonly body: NotificationBodyVO;
  readonly data: NotificationDataVO;
}

export class NotificationVO extends BaseVO<NotificationVOProps> {
  private constructor(props: NotificationVOProps) {
    super(Object.freeze(props));
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
    if (v.type.isPromotional() && v.category.isTransactional()) {
      throw new ValidationError(
        'Promotional notification cannot have transactional category',
        'category',
      );
    }
    if (v.priority.isSilent() && v.type.isSecurity()) {
      throw new ValidationError(
        'Security notification cannot have silent priority',
        'priority',
      );
    }
  }

  get id(): NotificationIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get type(): NotificationTypeVO { return this.value.type; }
  get category(): NotificationCategoryVO { return this.value.category; }
  get channel(): NotificationChannelVO { return this.value.channel; }
  get priority(): NotificationPriorityVO { return this.value.priority; }
  get status(): NotificationStatusVO { return this.value.status; }
  get subject(): NotificationSubjectVO { return this.value.subject; }
  get body(): NotificationBodyVO { return this.value.body; }
  get data(): NotificationDataVO { return this.value.data; }

  isTransactional(): boolean { return this.type.isTransactional(); }
  isPromotional(): boolean { return this.type.isPromotional(); }
  isUrgent(): boolean { return this.priority.isUrgent(); }
  isSilent(): boolean { return this.priority.isSilent(); }
  isTerminal(): boolean { return this.status.isTerminal(); }
  canOptOut(): boolean { return this.type.canOptOut(); }

  withStatus(status: NotificationStatusVO): NotificationVO {
    return NotificationVO.create({ ...this.value, status });
  }

  withPriority(priority: NotificationPriorityVO): NotificationVO {
    return NotificationVO.create({ ...this.value, priority });
  }

  withSubject(subject: NotificationSubjectVO): NotificationVO {
    return NotificationVO.create({ ...this.value, subject });
  }

  withBody(body: NotificationBodyVO): NotificationVO {
    return NotificationVO.create({ ...this.value, body });
  }
}
