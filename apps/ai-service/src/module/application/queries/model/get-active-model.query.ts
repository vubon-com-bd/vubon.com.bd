import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetActiveModelQuery extends BaseQuery {
  readonly type = 'ai.model.get-active';
  constructor(public readonly typeFilter?: string) { super(); }
}
