/**
 * GetPublicProfileQuery
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetPublicProfileQuery extends BaseQuery {
  readonly type = 'profile.getPublic';

  constructor(public readonly userId: string) {
    super();
  }
}
