/**
 * TemplateControllerMapper
 * @module notification-service/interfaces/mappers
 */
import type {
  CreateTemplateHttpDTO,
  UpdateTemplateHttpDTO,
  RenderTemplateHttpDTO,
  PreviewTemplateHttpDTO,
  ListTemplatesHttpQueryDTO,
  DeactivateTemplateHttpDTO,
  DeprecateTemplateHttpDTO,
} from '../dtos/requests/template/template.http-dto.js';
import type {
  CreateTemplateRequestDTO,
  UpdateTemplateRequestDTO,
  RenderTemplateRequestDTO,
  PreviewTemplateRequestDTO,
  ListTemplatesRequestDTO,
  DeactivateTemplateRequestDTO,
  DeprecateTemplateRequestDTO,
  TemplateVariableInputDTO,
} from '../../application/dtos/requests/template/template.dto.js';

export class TemplateControllerMapper {
  static toCreateAppDto(dto: CreateTemplateHttpDTO): CreateTemplateRequestDTO {
    return {
      name: dto.name,
      slug: dto.slug,
      type: dto.type as never,
      category: dto.category as never,
      locale: dto.locale,
      subject: dto.subject,
      body: dto.body,
      bodyHtml: dto.bodyHtml,
      variables: (dto.variables ?? []).map((v) => this.toVariableAppDto(v)),
    };
  }

  static toUpdateAppDto(
    templateId: string,
    dto: UpdateTemplateHttpDTO,
  ): UpdateTemplateRequestDTO {
    return {
      templateId,
      name: dto.name,
      category: dto.category as never,
      subject: dto.subject,
      body: dto.body,
      bodyHtml: dto.bodyHtml,
      variables: dto.variables?.map((v) => this.toVariableAppDto(v)),
    };
  }

  static toRenderAppDto(
    templateId: string,
    dto: RenderTemplateHttpDTO,
  ): RenderTemplateRequestDTO {
    return {
      templateId,
      data: dto.data,
      locale: dto.locale,
    };
  }

  static toPreviewAppDto(
    templateId: string,
    dto: PreviewTemplateHttpDTO,
  ): PreviewTemplateRequestDTO {
    return {
      templateId,
      sampleData: dto.sampleData,
    };
  }

  static toListAppDto(q: ListTemplatesHttpQueryDTO): ListTemplatesRequestDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      sortBy: q.sortBy as never,
      sortDir: q.sortDir,
      filter: {
        type: q.type,
        status: q.status,
        category: q.category,
        locale: q.locale,
        search: q.search,
      },
    };
  }

  static toDeactivateAppDto(
    templateId: string,
    dto: DeactivateTemplateHttpDTO,
  ): DeactivateTemplateRequestDTO {
    return { templateId, reason: dto.reason };
  }

  static toDeprecateAppDto(
    templateId: string,
    dto: DeprecateTemplateHttpDTO,
  ): DeprecateTemplateRequestDTO {
    return {
      templateId,
      replacementTemplateId: dto.replacementTemplateId,
      reason: dto.reason,
    };
  }

  private static toVariableAppDto(v: {
    name: string;
    type: string;
    required: boolean;
    defaultValue?: string;
    description?: string;
  }): TemplateVariableInputDTO {
    return {
      name: v.name,
      type: v.type as never,
      required: v.required,
      defaultValue: v.defaultValue,
      description: v.description,
    };
  }
}
