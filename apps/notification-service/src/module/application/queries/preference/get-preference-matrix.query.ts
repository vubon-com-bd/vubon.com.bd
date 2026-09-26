import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetPreferenceMatrixQuery extends BaseQuery {
  readonly type = 'preference.get-matrix';

  constructor(public readonly userId: string) {
    super();
  }
}
