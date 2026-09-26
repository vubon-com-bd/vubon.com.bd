import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
import type { UserId } from '@vubon/shared-types/common';

export class ListAuthSessionsQuery extends BaseQuery {
  readonly type = 'auth.list-sessions';
  constructor(public readonly userId: UserId) { super(); }
}
