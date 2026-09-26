import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetTemplateByNameQuery } from './get-template-by-name.query';
import type { TemplateRepository } from '../../../domain/repositories/template.repository.interface';
import { TemplateNameVO } from '../../../domain/value-objects/primitives/template-name.vo';
import type { TemplateResponseDTO } from '../../dtos/responses/template-response.dto';

@QueryHandler(GetTemplateByNameQuery)
export class GetTemplateByNameHandler
  extends BaseQueryHandler<GetTemplateByNameQuery, TemplateResponseDTO | null>
  implements IQueryHandler<GetTemplateByNameQuery>
{
  readonly queryType = 'template.get-by-name';

  constructor(private readonly templateRepo: TemplateRepository) {
    super();
  }

  async execute(query: GetTemplateByNameQuery): Promise<TemplateResponseDTO | null> {
    const entity = query.locale
      ? await this.templateRepo.findByNameAndLanguage(
          TemplateNameVO.create(query.name),
          query.locale,
        )
      : await this.templateRepo.findByName(TemplateNameVO.create(query.name));

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
