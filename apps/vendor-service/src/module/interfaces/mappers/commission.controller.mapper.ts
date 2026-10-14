/**
 * CommissionControllerMapper — HTTP ↔ Application DTO
 * @module vendor-service/interfaces/mappers
 */
import type {
  UpdateCommissionHttpDTO,
  CalculateCommissionHttpDTO,
} from '../dtos/requests/commission.request.dto.js';
import type {
  UpdateCommissionRequestDTO,
  CalculateCommissionRequestDTO,
} from '../../application/dtos/requests/commission/index.js';
import type {
  CommissionResponseDTO,
  CommissionCalculationResponseDTO,
  CommissionListResponseDTO,
} from '../../application/dtos/responses/commission-response.dto.js';
import type {
  CommissionHttpResponseDTO,
  CommissionCalculationHttpResponseDTO,
  CommissionListHttpResponseDTO,
} from '../dtos/responses/commission.response.dto.js';

export class CommissionControllerMapper {
  static toUpdateAppDto(dto: UpdateCommissionHttpDTO): UpdateCommissionRequestDTO {
    return {
      vendorId: dto.vendorId,
      type: dto.type as never,
      rate: dto.rate,
      fixedAmount: dto.fixedAmount,
      minAmount: dto.minAmount,
      maxAmount: dto.maxAmount,
      effectiveFrom: dto.effectiveFrom,
      effectiveTo: dto.effectiveTo,
    };
  }

  static toCalculateAppDto(dto: CalculateCommissionHttpDTO): CalculateCommissionRequestDTO {
    return {
      vendorId: dto.vendorId,
      orderAmount: dto.orderAmount,
      categoryId: dto.categoryId,
      discountAmount: dto.discountAmount,
      currency: dto.currency,
    };
  }

  static toHttpResponse(app: CommissionResponseDTO): CommissionHttpResponseDTO {
    return { ...app };
  }

  static toCalcHttpResponse(app: CommissionCalculationResponseDTO): CommissionCalculationHttpResponseDTO {
    return { ...app };
  }

  static toListHttp(app: CommissionListResponseDTO): CommissionListHttpResponseDTO {
    return {
      items: app.items.map((i) => ({
        id: i.id,
        vendorId: '',
        type: i.type,
        rate: i.rate,
        effectiveFrom: i.effectiveFrom,
        isActive: i.isCurrentlyActive,
        isCurrentlyActive: i.isCurrentlyActive,
        createdAt: '',
        updatedAt: '',
      })),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }
}
