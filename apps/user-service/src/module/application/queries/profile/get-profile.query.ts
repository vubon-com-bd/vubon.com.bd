/**
 * GetProfileQuery
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetProfileQuery extends BaseQuery {
  readonly type = 'profile.get';

  constructor(public readonly userId: string) {
    super();
  }
}
