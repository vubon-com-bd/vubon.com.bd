import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListTemplatesQuery } from './list-templates.query.js';
import {
  TEMPLATE_SERVICE,
  type ITemplateService,
} from '@application/services/interfaces/template.service.interface.js';
import type { TemplateListResponseDTO } from '@application/dtos/responses/template-response.dto.js';

@QueryHandler(ListTemplatesQuery)
export class ListTemplatesHandler
  implements IQueryHandler<ListTemplatesQuery, TemplateListResponseDTO>
{
  constructor(@Inject(TEMPLATE_SERVICE) private readonly service: ITemplateService) {}

  async execute(q: ListTemplatesQuery): Promise<TemplateListResponseDTO> {
    return this.service.list(q.options);
  }
}
