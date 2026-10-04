/**
 * CheckoutControllerMapper
 * @module order-service/interfaces/mappers
 */
import type { CheckoutHttpResponseDTO } from '../dtos/responses/checkout.response.dto.js';
import type { CheckoutResponseDTO } from '../../application/dtos/responses/checkout-response.dto.js';

export class CheckoutControllerMapper {
  static toResponse(appDto: CheckoutResponseDTO): CheckoutHttpResponseDTO {
    return appDto as unknown as CheckoutHttpResponseDTO;
  }
}
