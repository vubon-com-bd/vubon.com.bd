import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListPackagingQuery extends BaseQuery {
  readonly type = 'logistics.packaging.list';

  constructor(public readonly packagingType?: string) {
    super();
  }
}
