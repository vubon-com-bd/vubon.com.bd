/**
 * CancelControllerMapper
 * @module order-service/interfaces/mappers
 */
import type {
  RequestCancelHttpDTO,
  ApproveCancelHttpDTO,
  RejectCancelHttpDTO,
} from '../dtos/requests/cancel.request.dto.js';
import type {
  RequestCancelCommandDTO,
  ApproveCancelCommandDTO,
  RejectCancelCommandDTO,
} from '../../application/dtos/requests/cancel/index.js';
import type {
  CancelResponseDTO,
  CancelListResponseDTO,
} from '../../application/dtos/responses/cancel-response.dto.js';
import type {
  CancelHttpResponseDTO,
  CancelListHttpResponseDTO,
} from '../dtos/responses/cancel.response.dto.js';

export class CancelControllerMapper {
  static toRequestDto(dto: RequestCancelHttpDTO, actorId?: string): RequestCancelCommandDTO {
    return {
      orderId: dto.orderId,
      reason: dto.reason,
      notes: dto.notes,
      idempotencyKey: dto.idempotencyKey,
      actorId,
    };
  }

  static toApproveDto(cancelId: string, orderId: string, dto: ApproveCancelHttpDTO, actorId?: string): ApproveCancelCommandDTO {
    return {
      cancelId,
      orderId,
      refundAmount: dto.refundAmount,
      notes: dto.notes,
      actorId,
    };
  }

  static toRejectDto(cancelId: string, orderId: string, dto: RejectCancelHttpDTO, actorId?: string): RejectCancelCommandDTO {
    return {
      cancelId,
      orderId,
      reason: dto.reason,
      actorId,
    };
  }

  static toHttpResponse(app: CancelResponseDTO): CancelHttpResponseDTO {
    return app as unknown as CancelHttpResponseDTO;
  }

  static toListHttp(app: CancelListResponseDTO): CancelListHttpResponseDTO {
    return app as unknown as CancelListHttpResponseDTO;
  }
}
