import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
import type { UserId } from '@vubon/shared-types/common';

export class ListUserActivitiesQuery extends BaseQuery {
  readonly type = 'user.list-activities';
  constructor(
    public readonly userId: UserId,
    public readonly limit: number = 50,
  ) { super(); }
}
