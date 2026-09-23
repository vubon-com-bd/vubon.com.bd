import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetSeoQuery extends BaseQuery {
  readonly type = 'marketing.seo.get';
  constructor(public readonly pageUrl: string) { super(); }
}
