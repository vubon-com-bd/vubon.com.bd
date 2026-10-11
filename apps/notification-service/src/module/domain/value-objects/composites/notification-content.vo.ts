/**
 * NotificationContentVO — title + body + optional data
 * @module notification-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NotificationTitleVO } from '../primitives/notification-title.vo.js';
import { NotificationBodyVO } from '../primitives/notification-body.vo.js';
import { NotificationDataVO } from '../primitives/notification-data.vo.js';

export interface NotificationContentVOProps {
  readonly title: NotificationTitleVO;
  readonly body: NotificationBodyVO;
  readonly data?: NotificationDataVO;
}

export class NotificationContentVO extends BaseVO<NotificationContentVOProps> {
  private constructor(props: NotificationContentVOProps) {
    super(props);
  }

  static create(props: NotificationContentVOProps): NotificationContentVO {
    const vo = new NotificationContentVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: NotificationContentVOProps): NotificationContentVO {
    return new NotificationContentVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.title || !v.body) {
      throw new ValidationError('Title and body are required', 'content');
    }
  }

  get title(): NotificationTitleVO { return this.value.title; }
  get body(): NotificationBodyVO { return this.value.body; }
  get data(): NotificationDataVO | undefined { return this.value.data; }

  hasData(): boolean {
    return this.value.data !== undefined && !this.value.data.isEmpty();
  }
}
