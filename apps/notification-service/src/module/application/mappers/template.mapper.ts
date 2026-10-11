/**
 * TemplateMapper — Entity → Response DTO
 * @module notification-service/application/mappers
 */
import type { TemplateEntity } from '../../domain/entities/template.entity.js';
import type {
  TemplateResponseDTO,
  TemplatePublicResponseDTO,
  TemplateListResponseDTO,
  TemplateVariableDTO,
  TemplateRenderResponseDTO,
} from '../dtos/responses/template-response.dto.js';
import type {
  NotificationTemplateTypeValue,
  NotificationTemplateStatusValue,
  NotificationTemplateCategoryValue,
} from '@vubon/shared-types/platform/notification';

export class TemplateMapper {
  static toResponse(entity: TemplateEntity): TemplateResponseDTO {
    return {
      id: entity.id,
      name: entity.name.value,
      slug: entity.slug,
      type: entity.type.value as NotificationTemplateTypeValue,
      status: entity.status.value as NotificationTemplateStatusValue,
      category: entity.category.value as NotificationTemplateCategoryValue,
      locale: entity.locale.value,
      subject: entity.subject,
      body: entity.body,
      bodyHtml: entity.bodyHtml,
      variables: entity.variables.map((v) => this.toVariableDTO(v)),
      version: entity.version,
      parentId: entity.parentId,
      createdBy: entity.createdBy,
      updatedBy: entity.updatedBy,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublicResponse(entity: TemplateEntity): TemplatePublicResponseDTO {
    return {
      id: entity.id,
      name: entity.name.value,
      slug: entity.slug,
      type: entity.type.value as NotificationTemplateTypeValue,
      category: entity.category.value as NotificationTemplateCategoryValue,
      locale: entity.locale.value,
    };
  }

  static toListResponse(
    entities: readonly TemplateEntity[],
    total: number,
    page: number,
    limit: number,
  ): TemplateListResponseDTO {
    return {
      items: entities.map((e) => this.toResponse(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static toRenderResponse(input: {
    subject?: string;
    body: string;
    bodyHtml?: string;
    missingVariables: readonly string[];
    resolvedVariables: readonly string[];
  }): TemplateRenderResponseDTO {
    return {
      subject: input.subject,
      body: input.body,
      bodyHtml: input.bodyHtml,
      missingVariables: input.missingVariables,
      resolvedVariables: input.resolvedVariables,
    };
  }

  private static toVariableDTO(v: {
    name: { value: string };
    type: string;
    required: boolean;
    defaultValue?: string;
    description?: string;
  }): TemplateVariableDTO {
    return {
      name: v.name.value,
      type: v.type as TemplateVariableDTO['type'],
      required: v.required,
      defaultValue: v.defaultValue,
      description: v.description,
    };
  }
}
