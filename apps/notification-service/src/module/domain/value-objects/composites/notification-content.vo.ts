/**
 * NotificationContentVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * Subject + body + optional media + data — notification-এর "what" অংশ।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { NotificationSubjectVO } from '@domain/primitives/notification-subject.vo.js';
import { NotificationBodyVO } from '@domain/primitives/notification-body.vo.js';
import { NotificationDataVO } from '@domain/primitives/notification-data.vo.js';
import { ActionUrlVO } from '@domain/primitives/action-url.vo.js';

export interface NotificationContentProps {
  readonly subject: NotificationSubjectVO;
  readonly body: NotificationBodyVO;
  readonly imageUrl?: ActionUrlVO;
  readonly iconUrl?: ActionUrlVO;
  readonly actionUrl?: ActionUrlVO;
  readonly data: NotificationDataVO;
}

export class NotificationContentVO extends BaseVO<NotificationContentProps> {
  private constructor(props: NotificationContentProps) {
    super(Object.freeze(props));
  }

  static create(props: NotificationContentProps): NotificationContentVO {
    const vo = new NotificationContentVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: NotificationContentProps): NotificationContentVO {
    return new NotificationContentVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.body.isEmpty) {
      throw new ValidationError('Notification body cannot be empty', 'body');
    }
    if (v.actionUrl && !v.actionUrl.isExternal) {
      throw new ValidationError('Action URL must be http(s)', 'actionUrl');
    }
  }

  get subject(): NotificationSubjectVO { return this.value.subject; }
  get body(): NotificationBodyVO { return this.value.body; }
  get imageUrl(): ActionUrlVO | undefined { return this.value.imageUrl; }
  get iconUrl(): ActionUrlVO | undefined { return this.value.iconUrl; }
  get actionUrl(): ActionUrlVO | undefined { return this.value.actionUrl; }
  get data(): NotificationDataVO { return this.value.data; }

  hasImage(): boolean { return this.value.imageUrl !== undefined; }
  hasAction(): boolean { return this.value.actionUrl !== undefined; }

  get plainTextPreview(): string {
    return this.value.body.value.slice(0, 100).replace(/\s+/g, ' ');
  }
}
