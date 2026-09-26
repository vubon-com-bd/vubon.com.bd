import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetModelQuery extends BaseQuery {
  readonly type = 'ai.model.get';
  constructor(public readonly modelId: string) { super(); }
}
