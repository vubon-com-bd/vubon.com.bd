/**
 * GetUserQuery
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetUserQuery extends BaseQuery {
  readonly type = 'user.get';

  constructor(public readonly userId: string) {
    super();
  }
}
