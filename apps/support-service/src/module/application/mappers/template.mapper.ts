/**
 * TemplateMapper — domain ↔ DTO
 * @module support-service/application/mappers
 */
import { OneWayMapper } from '@vubon/shared-kernel/application/mappers';
import { SupportTemplateEntity } from '../../domain/entities/support-template.entity';
import type { TemplateResponseDTO } from '../dtos/responses/template-response.dto';

export class TemplateMapper extends OneWayMapper<
  SupportTemplateEntity,
  TemplateResponseDTO
> {
  map(entity: SupportTemplateEntity): TemplateResponseDTO {
    const snapshot = entity.toSnapshot();
    return {
      id: snapshot.id,
      name: snapshot.name,
      slug: snapshot.name.toLowerCase().replace(/\s+/g, '-'),
      type: snapshot.type as TemplateResponseDTO['type'],
      status: snapshot.isActive
        ? ('active' as TemplateResponseDTO['status'])
        : ('inactive' as TemplateResponseDTO['status']),
      locale: snapshot.language,
      body: snapshot.content,
      variables: entity.placeholders.map((p) => ({
        name: p,
        type: 'string' as const,
        required: true,
      })),
      version: 1,
      createdBy: 'system',
      createdAt: snapshot.createdAt,
      updatedAt: snapshot.updatedAt,
    };
  }

  toList(entities: readonly SupportTemplateEntity[]): readonly TemplateResponseDTO[] {
    return entities.map((e) => this.map(e));
  }
}
