import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetReturnQuery extends BaseQuery {
  readonly type = 'order.return.get';

  constructor(public readonly returnId: string) {
    super();
  }
}
