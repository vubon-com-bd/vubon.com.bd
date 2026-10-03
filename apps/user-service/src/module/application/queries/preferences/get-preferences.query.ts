/**
 * GetPreferencesQuery
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetPreferencesQuery extends BaseQuery {
  readonly type = 'preferences.get';

  constructor(public readonly userId: string) {
    super();
  }
}
