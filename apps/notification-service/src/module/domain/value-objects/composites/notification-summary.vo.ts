/**
 * NotificationSummaryVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * List/preview item — full notification নয়, শুধু summary।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { NotificationStatusVO } from '@domain/primitives/notification-status.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';

export interface NotificationSummaryVOProps {
  readonly id: NotificationIdVO;
  readonly title: string;
  readonly preview: string;
  readonly type: NotificationTypeVO;
  readonly channel: NotificationChannelVO;
  readonly status: NotificationStatusVO;
  readonly priority: NotificationPriorityVO;
  readonly isRead: boolean;
  readonly createdAt: string;
}

const MAX_TITLE_LENGTH = 200;
const MAX_PREVIEW_LENGTH = 200;

export class NotificationSummaryVO extends BaseVO<NotificationSummaryVOProps> {
  private constructor(props: NotificationSummaryVOProps) {
    super(Object.freeze(props));
  }

  static create(props: NotificationSummaryVOProps): NotificationSummaryVO {
    const vo = new NotificationSummaryVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: NotificationSummaryVOProps): NotificationSummaryVO {
    return new NotificationSummaryVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.title || v.title.trim().length === 0) {
      throw new ValidationError('Summary title cannot be empty', 'title');
    }
    if (v.title.length > MAX_TITLE_LENGTH) {
      throw new ValidationError(`Summary title exceeds ${MAX_TITLE_LENGTH} chars`, 'title');
    }
    if (v.preview.length > MAX_PREVIEW_LENGTH) {
      throw new ValidationError(`Summary preview exceeds ${MAX_PREVIEW_LENGTH} chars`, 'preview');
    }
    const created = new Date(v.createdAt);
    if (Number.isNaN(created.getTime())) {
      throw new ValidationError('Invalid createdAt', 'createdAt');
    }
    if (typeof v.isRead !== 'boolean') {
      throw new ValidationError('isRead must be boolean', 'isRead');
    }
  }

  get id(): NotificationIdVO { return this.value.id; }
  get title(): string { return this.value.title; }
  get preview(): string { return this.value.preview; }
  get type(): NotificationTypeVO { return this.value.type; }
  get channel(): NotificationChannelVO { return this.value.channel; }
  get status(): NotificationStatusVO { return this.value.status; }
  get priority(): NotificationPriorityVO { return this.value.priority; }
  get isRead(): boolean { return this.value.isRead; }
  get createdAt(): string { return this.value.createdAt; }

  isUnread(): boolean { return !this.value.isRead; }
  isUrgent(): boolean { return this.priority.isUrgent(); }
  isTerminal(): boolean { return this.status.isTerminal(); }

  get ageMs(): number {
    return Date.now() - new Date(this.value.createdAt).getTime();
  }
}
