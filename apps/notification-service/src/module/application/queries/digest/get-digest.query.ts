import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetDigestQuery extends BaseQuery {
  readonly type = 'digest.get';

  constructor(public readonly digestId: string) {
    super();
  }
}
