import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetDefaultPackagingQuery extends BaseQuery {
  readonly type = 'logistics.packaging.get_default';
  constructor() { super(); }
}
