import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetMethodQuery extends BaseQuery {
  readonly type = 'method.get';

  constructor(public readonly methodId: string) {
    super();
  }
}
