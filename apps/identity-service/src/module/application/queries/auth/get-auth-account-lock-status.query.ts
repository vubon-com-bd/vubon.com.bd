import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
export class GetAuthAccountLockStatusQuery extends BaseQuery {
  readonly type = 'auth.get-lock-status';
  readonly queryType = 'auth.get-lock-status';
  constructor(public readonly userId: string) { super(); }
}
