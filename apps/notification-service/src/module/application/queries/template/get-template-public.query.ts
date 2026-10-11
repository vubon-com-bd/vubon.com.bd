import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetTemplatePublicQuery extends BaseQuery {
  readonly type = 'template.get_public';
  constructor(public readonly templateId: string) { super(); }
}
