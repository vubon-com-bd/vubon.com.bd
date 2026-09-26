import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetModelPerformanceQuery extends BaseQuery {
  readonly type = 'ai.model.get-performance';
  constructor(public readonly modelId: string) { super(); }
}
