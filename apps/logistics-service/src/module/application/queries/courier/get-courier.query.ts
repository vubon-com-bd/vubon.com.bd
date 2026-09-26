import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetCourierQuery extends BaseQuery {
  readonly type = 'logistics.courier.get';

  constructor(public readonly courierId: string) {
    super();
  }
}
