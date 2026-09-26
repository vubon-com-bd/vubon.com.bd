import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetSearchQuery extends BaseQuery {
  readonly type = 'ai.search.get';
  constructor(public readonly searchId: string) { super(); }
}
