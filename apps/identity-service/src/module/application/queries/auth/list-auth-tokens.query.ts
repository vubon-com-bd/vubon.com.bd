import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
export class ListAuthTokensQuery extends BaseQuery {
  readonly type = 'auth.list-tokens';
  readonly queryType = 'auth.list-tokens';
  constructor(public readonly userId: string, public readonly limit?: number) { super(); }
}
