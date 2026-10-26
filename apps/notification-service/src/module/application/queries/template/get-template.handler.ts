import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTemplateQuery } from './get-template.query.js';
import {
  TEMPLATE_SERVICE,
  type ITemplateService,
} from '@application/services/interfaces/template.service.interface.js';
import type { TemplateResponseDTO } from '@application/dtos/responses/template-response.dto.js';

@QueryHandler(GetTemplateQuery)
export class GetTemplateHandler
  implements IQueryHandler<GetTemplateQuery, TemplateResponseDTO>
{
  constructor(@Inject(TEMPLATE_SERVICE) private readonly service: ITemplateService) {}

  async execute(q: GetTemplateQuery): Promise<TemplateResponseDTO> {
    return this.service.getById(q.templateId);
  }
}
