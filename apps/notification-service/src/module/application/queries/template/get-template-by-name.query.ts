import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetTemplateByNameQuery extends BaseQuery {
  readonly type = 'template.get-by-name';

  constructor(
    public readonly name: string,
    public readonly locale?: string,
  ) {
    super();
  }
}
