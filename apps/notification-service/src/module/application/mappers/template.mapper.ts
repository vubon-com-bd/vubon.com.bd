/**
 * TemplateMapper — Entity → Response DTO
 * @module notification-service/application/mappers
 */
import type { TemplateEntity } from '@domain/entities/template.entity.js';
import type {
  TemplateResponseDTO,
  TemplateSummaryResponseDTO,
  TemplateListResponseDTO,
  TemplateVariableDTO,
} from '@application/dtos/responses/template-response.dto.js';

export class TemplateMapper {
  static toResponse(entity: TemplateEntity): TemplateResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      slug: vo.slug,
      type: vo.type.value as never,
      status: vo.status as never,
      category: 'system' as never,
      locale: vo.locale,
      subject: vo.subject?.value,
      body: vo.body.value,
      bodyHtml: undefined,
      variables: vo.variables.map((v) => this.toVariable(v)),
      version: vo.version,
      parentId: undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toSummary(entity: TemplateEntity): TemplateSummaryResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      slug: vo.slug,
      type: vo.type.value as never,
      status: vo.status as never,
      locale: vo.locale,
      version: vo.version,
      createdAt: entity.createdAt,
    };
  }

  static toListResponse(
    entities: readonly TemplateEntity[],
    total: number,
    page: number,
    limit: number,
  ): TemplateListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  private static toVariable(v: { name: string; type: string; required: boolean; defaultValue?: string; description?: string }): TemplateVariableDTO {
    return {
      name: v.name,
      type: v.type,
      required: v.required,
      defaultValue: v.defaultValue,
      description: v.description,
    };
  }
}
