/**
 * GetTemplateQuery
 * @module support-service/application/queries/template
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetTemplateQuery extends BaseQuery {
  readonly type = 'support.template.get';

  constructor(public readonly templateId: string) {
    super();
  }
}
