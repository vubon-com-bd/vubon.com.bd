import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
import type { UserId } from '@vubon/shared-types/common';

export class GetUserProfileQuery extends BaseQuery {
  readonly type = 'user.get-profile';
  constructor(public readonly userId: UserId) { super(); }
}
