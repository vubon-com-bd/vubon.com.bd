import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PreviewTemplateQuery } from './preview-template.query.js';
import { TEMPLATE_SERVICE, type ITemplateService } from '../../services/interfaces/template.service.interface.js';
import type { TemplatePreviewResponseDTO } from '../../dtos/responses/template-response.dto.js';

@QueryHandler(PreviewTemplateQuery)
export class PreviewTemplateHandler
  implements IQueryHandler<PreviewTemplateQuery, TemplatePreviewResponseDTO>
{
  constructor(@Inject(TEMPLATE_SERVICE) private readonly service: ITemplateService) {}

  async execute(q: PreviewTemplateQuery): Promise<TemplatePreviewResponseDTO> {
    return this.service.preview(q.options);
  }
}
