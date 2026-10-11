import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetTemplateBySlugQuery extends BaseQuery {
  readonly type = 'template.get_by_slug';
  constructor(public readonly slug: string, public readonly locale?: string) { super(); }
}
