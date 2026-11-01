import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetTemplateQuery extends BaseQuery {
  readonly type = 'notification.template.get';
  constructor(public readonly templateId: string) { super(); }
}
