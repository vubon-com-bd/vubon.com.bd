import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListCohortsQuery extends BaseQuery {
  readonly type = 'analytics.cohort.list';

  constructor(
    public readonly period?: string,
    public readonly limit: number = 50,
  ) {
    super();
  }
}
