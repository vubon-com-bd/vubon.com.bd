import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListModelsQuery extends BaseQuery {
  readonly type = 'ai.model.list';

  constructor(
    public readonly status?: string,
    public readonly modelType?: string,
    public readonly providerId?: string,
    public readonly limit: number = 50,
    public readonly offset: number = 0,
  ) {
    super();
  }
}
