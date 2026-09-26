import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListTrainingsQuery extends BaseQuery {
  readonly type = 'ai.training.list';
  constructor(public readonly modelId?: string, public readonly runningOnly: boolean = false) { super(); }
}
