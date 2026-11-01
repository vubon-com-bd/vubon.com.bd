/**
 * TemplateControllerMapper — HTTP DTO ↔ App DTO
 * @module notification-service/interfaces/mappers
 */
import type {
  CreateTemplateHttpDTO,
  UpdateTemplateHttpDTO,
  TestTemplateHttpDTO,
  ListTemplatesHttpQueryDTO,
} from '@interfaces/dtos/requests/template.request.dto.js';
import type {
  CreateTemplateRequestDTO,
  UpdateTemplateRequestDTO,
  TestTemplateRequestDTO,
} from '@application/dtos/requests/template/index.js';
import type { TemplateListOptionsDTO } from '@application/services/interfaces/template.service.interface.js';
import type {
  TemplateResponseDTO,
  TemplateSummaryResponseDTO,
  TemplateListResponseDTO,
  TemplateRenderResponseDTO,
} from '@application/dtos/responses/template-response.dto.js';
import {
  TemplateHttpResponseDTO,
  TemplateSummaryHttpResponseDTO,
  TemplateListHttpResponseDTO,
  TemplateRenderHttpResponseDTO,
} from '@interfaces/dtos/responses/template.response.dto.js';

export class TemplateControllerMapper {
  static toCreateRequestDTO(dto: CreateTemplateHttpDTO): CreateTemplateRequestDTO {
    return {
      name: dto.name,
      slug: dto.slug,
      type: dto.type as never,
      category: dto.category as never,
      locale: dto.locale ?? 'en',
      subject: dto.subject,
      body: dto.body,
      bodyHtml: dto.bodyHtml,
      variables: (dto.variables ?? []).map((v) => ({
        name: v.name,
        type: v.type as never,
        required: v.required,
        defaultValue: v.defaultValue,
        description: v.description,
      })),
    };
  }

  static toUpdateRequestDTO(
    templateId: string,
    dto: UpdateTemplateHttpDTO,
  ): UpdateTemplateRequestDTO {
    return {
      templateId,
      name: dto.name,
      subject: dto.subject,
      body: dto.body,
      bodyHtml: dto.bodyHtml,
      variables: dto.variables?.map((v) => ({
        name: v.name,
        type: v.type as never,
        required: v.required,
        defaultValue: v.defaultValue,
        description: v.description,
      })),
      status: dto.status as never,
      locale: dto.locale,
    };
  }

  static toTestRequestDTO(
    templateId: string,
    dto: TestTemplateHttpDTO,
  ): TestTemplateRequestDTO {
    return {
      templateId,
      email: dto.email,
      phone: dto.phone,
      deviceToken: dto.deviceToken,
      variables: dto.variables,
      locale: dto.locale,
    };
  }

  static toListOptions(q: ListTemplatesHttpQueryDTO): TemplateListOptionsDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      filter: {
        type: q.type,
        status: q.status,
        locale: q.locale,
        search: q.search,
      },
    };
  }

  static toHttpResponse(app: TemplateResponseDTO): TemplateHttpResponseDTO {
    return app as unknown as TemplateHttpResponseDTO;
  }

  static toSummaryHttp(app: TemplateSummaryResponseDTO): TemplateSummaryHttpResponseDTO {
    return app as unknown as TemplateSummaryHttpResponseDTO;
  }

  static toListHttp(app: TemplateListResponseDTO): TemplateListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toRenderHttp(app: TemplateRenderResponseDTO): TemplateRenderHttpResponseDTO {
    return app as unknown as TemplateRenderHttpResponseDTO;
  }
}
