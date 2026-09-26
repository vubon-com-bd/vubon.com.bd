import { BaseMapper } from '@vubon/shared-kernel/application/mappers/base.mapper';
import { TemplateEntity } from '../../domain/entities/template.entity';
import type { TemplateResponseDTO } from '../dtos/responses/template-response.dto';

export class TemplateMapper extends BaseMapper<TemplateEntity, TemplateResponseDTO> {
  toTarget(source: TemplateEntity): TemplateResponseDTO {
    return {
      id: source.id.value,
      name: source.name.value,
      slug: source.name.value.toLowerCase().replace(/\s+/g, '-'),
      type: 'transactional',
      status: 'active',
      category: 'system',
      locale: source.language,
      subject: source.subject ?? undefined,
      body: source.content.value,
      bodyHtml: undefined,
      variables: source.variables.map((v: string) => ({
        name: v,
        type: 'string' as const,
        required: true,
      })),
      version: 1,
      createdBy: 'system',
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
    } as TemplateResponseDTO;
  }

  toSource(target: TemplateResponseDTO): TemplateEntity {
    void target;
    throw new Error('TemplateMapper.toSource not supported');
  }
}
