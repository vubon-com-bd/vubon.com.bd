import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
import type { UserId } from '@vubon/shared-types/common';

export class GetUserKycStatusQuery extends BaseQuery {
  readonly type = 'user.get-kyc-status';
  constructor(public readonly userId: UserId) { super(); }
}
