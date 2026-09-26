import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetVectorQuery extends BaseQuery {
  readonly type = 'ai.vector.get';
  constructor(public readonly vectorId: string) { super(); }
}
