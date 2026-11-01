import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetPreferenceQuery extends BaseQuery {
  readonly type = 'notification.preference.get';
  constructor(public readonly userId: string) { super(); }
}
