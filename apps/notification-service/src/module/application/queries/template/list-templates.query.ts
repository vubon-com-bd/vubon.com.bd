import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { TemplateListOptionsDTO } from '@application/services/interfaces/template.service.interface.js';

export class ListTemplatesQuery extends BaseQuery {
  readonly type = 'notification.template.list';
  constructor(public readonly options: TemplateListOptionsDTO) { super(); }
}
