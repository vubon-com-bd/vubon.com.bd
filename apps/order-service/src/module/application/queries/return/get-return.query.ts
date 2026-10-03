import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetReturnQuery extends BaseQuery {
  readonly type = 'return.get';
  constructor(public readonly returnId: string) { super(); }
}
