import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListReportsQuery extends BaseQuery {
  readonly type = 'analytics.report.list';
  constructor(public readonly ownerId: string) { super(); }
}
