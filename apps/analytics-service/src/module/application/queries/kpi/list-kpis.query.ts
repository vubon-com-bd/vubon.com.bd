import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListKpisQuery extends BaseQuery {
  readonly type = 'analytics.kpi.list';
  constructor(public readonly onlyActive: boolean = true) { super(); }
}
