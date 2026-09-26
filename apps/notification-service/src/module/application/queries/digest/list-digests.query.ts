import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListDigestsQuery extends BaseQuery {
  readonly type = 'digest.list';

  constructor(public readonly userId: string) {
    super();
  }
}
