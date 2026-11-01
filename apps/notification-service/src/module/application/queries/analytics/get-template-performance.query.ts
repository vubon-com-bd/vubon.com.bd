import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetTemplatePerformanceQuery extends BaseQuery {
  readonly type = 'notification.analytics.template_performance';
  constructor(
    public readonly templateId: string,
    public readonly fromDate?: string,
    public readonly toDate?: string,
  ) { super(); }
}
