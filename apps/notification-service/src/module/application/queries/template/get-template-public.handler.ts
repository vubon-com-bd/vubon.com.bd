import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTemplatePublicQuery } from './get-template-public.query.js';
import { TEMPLATE_SERVICE, type ITemplateService } from '../../services/interfaces/template.service.interface.js';
import type { TemplatePublicResponseDTO } from '../../dtos/responses/template-response.dto.js';

@QueryHandler(GetTemplatePublicQuery)
export class GetTemplatePublicHandler
  implements IQueryHandler<GetTemplatePublicQuery, TemplatePublicResponseDTO>
{
  constructor(@Inject(TEMPLATE_SERVICE) private readonly service: ITemplateService) {}

  async execute(q: GetTemplatePublicQuery): Promise<TemplatePublicResponseDTO> {
    return this.service.getPublic({ templateId: q.templateId });
  }
}
