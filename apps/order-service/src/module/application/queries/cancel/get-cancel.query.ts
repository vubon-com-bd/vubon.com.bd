import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetCancelQuery extends BaseQuery {
  readonly type = 'cancel.get';
  constructor(public readonly cancelId: string) { super(); }
}
