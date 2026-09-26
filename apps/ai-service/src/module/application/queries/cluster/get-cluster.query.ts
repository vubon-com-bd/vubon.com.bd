import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetClusterQuery extends BaseQuery {
  readonly type = 'ai.cluster.get';
  constructor(public readonly clusterId: string) { super(); }
}
