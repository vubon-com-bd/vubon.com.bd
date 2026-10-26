import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetPreferenceDefaultsQuery extends BaseQuery {
  readonly type = 'notification.preference.get_defaults';
  constructor() { super(); }
}
