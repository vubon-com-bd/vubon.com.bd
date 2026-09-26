import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
import type { UserId } from '@vubon/shared-types/common';

export class ListAuthLoginAttemptsQuery extends BaseQuery {
  readonly type = 'auth.list-login-attempts';
  constructor(
    public readonly userId: UserId,
    public readonly limit: number = 20,
  ) { super(); }
}
