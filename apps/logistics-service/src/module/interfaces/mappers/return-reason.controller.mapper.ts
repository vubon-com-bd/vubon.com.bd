/**
 * ReturnReasonControllerMapper — HTTP DTO ↔ App DTO
 */
import type {
  CreateReturnReasonHttpDTO,
  UpdateReturnReasonHttpDTO,
  ReturnReasonDeactivateHttpDTO,
  ListReturnReasonsHttpQueryDTO,
} from '../dtos/requests/return-reason/return-reason.request.dto.js';
import type { CreateReturnReasonRequestDTO } from '@application/dtos/requests/return-reason/create-return-reason.dto.js';
import type {
  ReturnReasonResponseDTO,
  ReturnReasonSummaryResponseDTO,
  ReturnReasonListResponseDTO,
  ReturnReasonStatsResponseDTO,
} from '@application/dtos/responses/return-reason/index.js';
import type {
  ReturnReasonHttpResponseDTO,
  ReturnReasonSummaryHttpResponseDTO,
  ReturnReasonListHttpResponseDTO,
  ReturnReasonStatsHttpResponseDTO,
} from '../dtos/responses/return-reason/return-reason.response.dto.js';

export class ReturnReasonControllerMapper {
  static toCreateAppDto(http: CreateReturnReasonHttpDTO): CreateReturnReasonRequestDTO {
    return {
      code: http.code,
      type: http.type as CreateReturnReasonRequestDTO['type'],
      label: { en: http.label.en, bn: http.label.bn } as CreateReturnReasonRequestDTO['label'],
      description: http.description,
      requiresPhoto: http.requiresPhoto,
      autoApprove: http.autoApprove,
      priority: http.priority,
    };
  }

  static toUpdateAppDto(returnReasonId: string, http: UpdateReturnReasonHttpDTO): Record<string, unknown> {
    return { returnReasonId, ...http };
  }

  static toDeactivateAppDto(returnReasonId: string, http: ReturnReasonDeactivateHttpDTO): Record<string, unknown> {
    return { returnReasonId, reason: http.reason };
  }

  static toListOptions(http: ListReturnReasonsHttpQueryDTO): Record<string, unknown> {
    return {
      page: http.page ?? 1,
      limit: http.limit ?? 20,
      sortBy: http.sortBy ?? 'priority',
      sortDir: http.sortDir ?? 'desc',
      filter: {
        type: http.type,
        label: http.label,
        isActive: http.isActive,
        search: http.search,
      },
    };
  }

  static toHttpResponse(app: ReturnReasonResponseDTO): ReturnReasonHttpResponseDTO {
    return {
      ...app,
      type: typeof app.type === 'string' ? app.type : String(app.type),
      label: app.label,
    } as unknown as ReturnReasonHttpResponseDTO;
  }

  static toSummaryHttp(app: ReturnReasonSummaryResponseDTO): ReturnReasonSummaryHttpResponseDTO {
    return {
      ...app,
      label: app.label,
    } as unknown as ReturnReasonSummaryHttpResponseDTO;
  }

  static toListHttp(app: ReturnReasonListResponseDTO): ReturnReasonListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: ReturnReasonStatsResponseDTO): ReturnReasonStatsHttpResponseDTO {
    return app as unknown as ReturnReasonStatsHttpResponseDTO;
  }
}
