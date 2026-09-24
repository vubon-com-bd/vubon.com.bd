import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetPreferenceQuery extends BaseQuery {
  readonly type = 'preference.get';

  constructor(public readonly userId: string) {
    super();
  }
}
