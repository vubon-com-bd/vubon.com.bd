import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
import type { UserId } from '@vubon/shared-types/common';

export class GetAuthAccountLockStatusQuery extends BaseQuery {
  readonly type = 'auth.get-lock-status';
  constructor(public readonly userId: UserId) { super(); }
}
