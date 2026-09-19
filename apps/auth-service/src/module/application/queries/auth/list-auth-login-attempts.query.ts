import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListAuthLoginAttemptsQuery extends BaseQuery {
  readonly type = 'auth.list-login-attempts';

  constructor(public readonly userId: string) {
    super();
  }
}
