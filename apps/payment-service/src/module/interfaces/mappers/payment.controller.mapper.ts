/**
 * PaymentControllerMapper — HTTP DTO ↔ Application DTO
 * @module payment-service/interfaces/mappers
 */
import type { InitiatePaymentHttpDTO } from '../dtos/requests/payment.request.dto.js';
import type { InitiatePaymentRequestDTO } from '../../application/dtos/requests/payment/initiate-payment.dto.js';
import type { PaymentResponseDTO } from '../../application/dtos/responses/payment-response.dto.js';
import type { PaymentHttpResponseDTO } from '../dtos/responses/payment.response.dto.js';

export class PaymentControllerMapper {
  static toInitiateAppDto(dto: InitiatePaymentHttpDTO): InitiatePaymentRequestDTO {
    return {
      orderId: dto.orderId,
      method: dto.method,
      gateway: dto.gateway,
      amount: dto.amount,
      currency: dto.currency,
      returnUrl: dto.returnUrl,
      idempotencyKey: dto.idempotencyKey,
      metadata: dto.metadata,
    };
  }

  static toHttpResponse(app: PaymentResponseDTO): PaymentHttpResponseDTO {
    return app as unknown as PaymentHttpResponseDTO;
  }
}
