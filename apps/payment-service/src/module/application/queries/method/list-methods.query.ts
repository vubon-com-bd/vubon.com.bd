import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListMethodsQuery extends BaseQuery {
  readonly type = 'method.list';

  constructor(public readonly userId: string) {
    super();
  }
}
