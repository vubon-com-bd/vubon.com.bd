import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class AuditSeoQuery extends BaseQuery {
  readonly type = 'marketing.seo.audit';
  constructor(public readonly pageUrl: string) { super(); }
}
