import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ActionIdVO } from '../primitives/action-id.vo';
import { ActionTypeVO } from '../primitives/action-type.vo';
import { ActionUrlVO } from '../primitives/action-url.vo';

export interface NotificationActionProps {
  readonly id: ActionIdVO;
  readonly type: ActionTypeVO;
  readonly url: ActionUrlVO;
  readonly label: string;
}

export class NotificationActionVO extends BaseVO<NotificationActionProps> {
  private constructor(props: NotificationActionProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: NotificationActionProps): NotificationActionVO {
    return new NotificationActionVO(props);
  }

  get id(): ActionIdVO { return this.value.id; }
  get type(): ActionTypeVO { return this.value.type; }
  get url(): ActionUrlVO { return this.value.url; }
  get label(): string { return this.value.label; }
}
