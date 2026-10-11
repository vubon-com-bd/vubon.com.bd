import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetInAppQuery extends BaseQuery {
  readonly type = 'in_app.get';
  constructor(
    public readonly notificationId: string,
    public readonly userId: string,
  ) { super(); }
}
