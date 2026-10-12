import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
export class ListAuthLoginAttemptsQuery extends BaseQuery {
  readonly type = 'auth.list-login-attempts';
  readonly queryType = 'auth.list-login-attempts';
  constructor(public readonly identifier: string, public readonly windowSeconds = 300) { super(); }
}
