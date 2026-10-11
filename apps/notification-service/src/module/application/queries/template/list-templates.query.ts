import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ListTemplatesRequestDTO } from '../../dtos/requests/template/template.dto.js';

export class ListTemplatesQuery extends BaseQuery {
  readonly type = 'template.list';
  constructor(public readonly options: ListTemplatesRequestDTO) { super(); }
}
