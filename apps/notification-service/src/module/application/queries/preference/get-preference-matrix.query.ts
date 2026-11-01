import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetPreferenceMatrixQuery extends BaseQuery {
  readonly type = 'notification.preference.get_matrix';
  constructor(public readonly userId: string) { super(); }
}
