import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetDefaultCourierQuery extends BaseQuery {
  readonly type = 'logistics.courier.get_default';
  constructor() { super(); }
}
