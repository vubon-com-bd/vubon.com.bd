/**
 * GetTemplateHandler
 * @module support-service/application/queries/template
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetTemplateQuery } from './get-template.query';
import type { TemplateResponseDTO } from '../../dtos/responses/template-response.dto';
import type { TemplateServiceInterface } from '../../services/interfaces/template.service.interface';

export class GetTemplateHandler extends BaseQueryHandler<
  GetTemplateQuery,
  TemplateResponseDTO
> {
  readonly queryType = 'support.template.get';

  constructor(private readonly templateService: TemplateServiceInterface) {
    super();
  }

  async execute(query: GetTemplateQuery): Promise<TemplateResponseDTO> {
    return this.templateService.getById(query.templateId);
  }
}
