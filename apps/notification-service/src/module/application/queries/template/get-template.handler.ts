import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetTemplateQuery } from './get-template.query';
import type { TemplateRepository } from '../../../domain/repositories/template.repository.interface';
import { TemplateIdVO } from '../../../domain/value-objects/primitives/template-id.vo';
import type { TemplateResponseDTO } from '../../dtos/responses/template-response.dto';

@QueryHandler(GetTemplateQuery)
export class GetTemplateHandler
  extends BaseQueryHandler<GetTemplateQuery, TemplateResponseDTO | null>
  implements IQueryHandler<GetTemplateQuery>
{
  readonly queryType = 'template.get';

  constructor(private readonly templateRepo: TemplateRepository) {
    super();
  }

  async execute(query: GetTemplateQuery): Promise<TemplateResponseDTO | null> {
    const entity = await this.templateRepo.findById(
      TemplateIdVO.create(query.templateId),
    );
    if (!entity) return null;

    return {
      id: entity.id.value,
      name: entity.name.value,
      slug: entity.name.value.toLowerCase().replace(/\s+/g, '-'),
      type: 'transactional',
      status: 'active',
      category: 'system',
      locale: entity.language,
      subject: entity.subject ?? undefined,
      body: entity.content.value,
      bodyHtml: undefined,
      variables: entity.variables.map((v) => ({
        name: v,
        type: 'string',
        required: true,
      })),
      version: 1,
      createdBy: 'system',
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as TemplateResponseDTO;
  }
}
