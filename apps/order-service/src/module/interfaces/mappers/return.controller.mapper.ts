/**
 * ReturnControllerMapper
 * @module order-service/interfaces/mappers
 */
import type {
  RequestReturnHttpDTO,
  ApproveReturnHttpDTO,
  RejectReturnHttpDTO,
  CompleteReturnHttpDTO,
} from '../dtos/requests/return.request.dto.js';
import type {
  RequestReturnCommandDTO,
  ApproveReturnCommandDTO,
  RejectReturnCommandDTO,
  CompleteReturnCommandDTO,
} from '../../application/dtos/requests/return/index.js';
import type {
  ReturnResponseDTO,
  ReturnListResponseDTO,
} from '../../application/dtos/responses/return-response.dto.js';
import type {
  ReturnHttpResponseDTO,
  ReturnListHttpResponseDTO,
} from '../dtos/responses/return.response.dto.js';

export class ReturnControllerMapper {
  static toRequestDto(dto: RequestReturnHttpDTO, actorId?: string): RequestReturnCommandDTO {
    return {
      orderId: dto.orderId,
      reason: dto.reason,
      itemIds: [...dto.itemIds],
      images: dto.images ? [...dto.images] : undefined,
      notes: dto.notes,
      idempotencyKey: dto.idempotencyKey,
      actorId,
    };
  }

  static toApproveDto(
    returnId: string,
    orderId: string,
    dto: ApproveReturnHttpDTO,
    actorId?: string,
  ): ApproveReturnCommandDTO {
    return { returnId, orderId, notes: dto.notes, actorId };
  }

  static toRejectDto(
    returnId: string,
    orderId: string,
    dto: RejectReturnHttpDTO,
    actorId?: string,
  ): RejectReturnCommandDTO {
    return { returnId, orderId, reason: dto.reason, actorId };
  }

  static toCompleteDto(
    returnId: string,
    orderId: string,
    dto: CompleteReturnHttpDTO,
    actorId?: string,
  ): CompleteReturnCommandDTO {
    return {
      returnId,
      orderId,
      refundAmount: dto.refundAmount,
      restockFee: dto.restockFee,
      notes: dto.notes,
      actorId,
    };
  }

  static toHttpResponse(app: ReturnResponseDTO): ReturnHttpResponseDTO {
    return app as unknown as ReturnHttpResponseDTO;
  }

  static toListHttp(app: ReturnListResponseDTO): ReturnListHttpResponseDTO {
    return app as unknown as ReturnListHttpResponseDTO;
  }
}
