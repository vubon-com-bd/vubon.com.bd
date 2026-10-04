/**
 * RefundControllerMapper — HTTP DTO ↔ Application DTO
 * @module payment-service/interfaces/mappers
 */
import type { RequestRefundHttpDTO } from '../dtos/requests/refund.request.dto.js';
import type { RequestRefundRequestDTO } from '../../application/dtos/requests/refund/refund.dto.js';
import type { RefundResponseDTO } from '../../application/dtos/responses/refund-response.dto.js';
import type { RefundHttpResponseDTO } from '../dtos/responses/refund.response.dto.js';

export class RefundControllerMapper {
  static toRequestAppDto(dto: RequestRefundHttpDTO): RequestRefundRequestDTO {
    return {
      paymentId: dto.paymentId,
      amount: dto.amount,
      reason: dto.reason,
      idempotencyKey: dto.idempotencyKey,
    };
  }

  static toHttpResponse(app: RefundResponseDTO): RefundHttpResponseDTO {
    return app as unknown as RefundHttpResponseDTO;
  }
}
