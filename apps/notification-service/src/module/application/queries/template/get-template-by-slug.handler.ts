import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTemplateBySlugQuery } from './get-template-by-slug.query.js';
import {
  TEMPLATE_SERVICE,
  type ITemplateService,
} from '@application/services/interfaces/template.service.interface.js';
import type { TemplateResponseDTO } from '@application/dtos/responses/template-response.dto.js';

@QueryHandler(GetTemplateBySlugQuery)
export class GetTemplateBySlugHandler
  implements IQueryHandler<GetTemplateBySlugQuery, TemplateResponseDTO>
{
  constructor(@Inject(TEMPLATE_SERVICE) private readonly service: ITemplateService) {}

  async execute(q: GetTemplateBySlugQuery): Promise<TemplateResponseDTO> {
    return this.service.getBySlug(q.slug);
  }
}
