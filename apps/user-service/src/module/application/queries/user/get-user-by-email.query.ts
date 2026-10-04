/**
 * GetUserByEmailQuery
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetUserByEmailQuery extends BaseQuery {
  readonly type = 'user.getByEmail';

  constructor(public readonly email: string) {
    super();
  }
}
