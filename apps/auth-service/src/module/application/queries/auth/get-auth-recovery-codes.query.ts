import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
import type { UserId } from '@vubon/shared-types/common';

export class GetAuthRecoveryCodesQuery extends BaseQuery {
  readonly type = 'auth.get-recovery-codes';
  constructor(public readonly userId: UserId) { super(); }
}
