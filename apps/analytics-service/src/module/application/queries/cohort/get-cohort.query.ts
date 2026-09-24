import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetCohortQuery extends BaseQuery {
  readonly type = 'analytics.cohort.get';

  constructor(public readonly cohortId: string) {
    super();
  }
}
