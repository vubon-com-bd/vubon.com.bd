/**
 * GetSettingsQuery
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetSettingsQuery extends BaseQuery {
  readonly type = 'settings.get';

  constructor(public readonly userId: string) {
    super();
  }
}
