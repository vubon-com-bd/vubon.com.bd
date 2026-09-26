import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
import type { UserId } from '@vubon/shared-types/common';

export class GetUserQuery extends BaseQuery {
  readonly type = 'user.get';
  constructor(public readonly userId: UserId) { super(); }
}
