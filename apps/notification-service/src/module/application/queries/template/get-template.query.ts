import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetTemplateQuery extends BaseQuery {
  readonly type = 'template.get';

  constructor(public readonly templateId: string) {
    super();
  }
}
