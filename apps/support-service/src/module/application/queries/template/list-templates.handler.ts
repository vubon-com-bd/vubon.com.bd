/**
 * ListTemplatesHandler
 * @module support-service/application/queries/template
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListTemplatesQuery } from './list-templates.query';
import type { TemplateResponseDTO } from '../../dtos/responses/template-response.dto';
import type { TemplateServiceInterface } from '../../services/interfaces/template.service.interface';

export class ListTemplatesHandler extends BaseQueryHandler<
  ListTemplatesQuery,
  readonly TemplateResponseDTO[]
> {
  readonly queryType = 'support.template.list';

  constructor(private readonly templateService: TemplateServiceInterface) {
    super();
  }

  async execute(query: ListTemplatesQuery): Promise<readonly TemplateResponseDTO[]> {
    return this.templateService.list(query.page, query.limit);
  }
}
