import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListAuthSessionsQuery extends BaseQuery {
  readonly type = 'auth.list-sessions';

  constructor(public readonly userId: string) {
    super();
  }
}
