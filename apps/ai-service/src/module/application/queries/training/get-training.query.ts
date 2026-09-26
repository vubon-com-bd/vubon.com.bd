import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetTrainingQuery extends BaseQuery {
  readonly type = 'ai.training.get';
  constructor(public readonly trainingId: string) { super(); }
}
