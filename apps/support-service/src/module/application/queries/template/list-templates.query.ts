/**
 * ListTemplatesQuery
 * @module support-service/application/queries/template
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListTemplatesQuery extends BaseQuery {
  readonly type = 'support.template.list';

  constructor(
    public readonly page = 1,
    public readonly limit = 20,
  ) {
    super();
  }
}
