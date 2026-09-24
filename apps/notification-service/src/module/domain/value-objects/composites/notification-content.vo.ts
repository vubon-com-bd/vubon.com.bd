import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { NotificationSubjectVO } from '../primitives/notification-subject.vo';
import { NotificationBodyVO } from '../primitives/notification-body.vo';
import { NotificationDataVO } from '../primitives/notification-data.vo';

export interface NotificationContentProps {
  readonly subject: NotificationSubjectVO | null;
  readonly body: NotificationBodyVO;
  readonly bodyHtml: string | null;
  readonly data: NotificationDataVO | null;
}

export class NotificationContentVO extends BaseVO<NotificationContentProps> {
  private constructor(props: NotificationContentProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: NotificationContentProps): NotificationContentVO {
    return new NotificationContentVO(props);
  }

  get subject(): NotificationSubjectVO | null { return this.value.subject; }
  get body(): NotificationBodyVO { return this.value.body; }
  get bodyHtml(): string | null { return this.value.bodyHtml; }
  get data(): NotificationDataVO | null { return this.value.data; }
}
