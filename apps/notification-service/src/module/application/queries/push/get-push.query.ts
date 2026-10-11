import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetPushQuery extends BaseQuery {
  readonly type = 'push.get';
  constructor(public readonly pushId: string) { super(); }
}
