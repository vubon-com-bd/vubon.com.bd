import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { PreviewTemplateRequestDTO } from '../../dtos/requests/template/template.dto.js';

export class PreviewTemplateQuery extends BaseQuery {
  readonly type = 'template.preview';
  constructor(public readonly options: PreviewTemplateRequestDTO) { super(); }
}
