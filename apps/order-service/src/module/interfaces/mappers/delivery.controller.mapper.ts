/**
 * DeliveryControllerMapper
 * @module order-service/interfaces/mappers
 */
import type { DeliveryHttpResponseDTO, DeliveryMethodHttpResponseDTO } from '../dtos/responses/delivery.response.dto.js';
import type { DeliveryResponseDTO, DeliveryMethodResponseDTO } from '../../application/dtos/responses/delivery-response.dto.js';

export class DeliveryControllerMapper {
  static toResponse(appDto: DeliveryResponseDTO): DeliveryHttpResponseDTO {
    return appDto as unknown as DeliveryHttpResponseDTO;
  }
  static toMethodResponse(appDto: DeliveryMethodResponseDTO): DeliveryMethodHttpResponseDTO {
    return appDto as unknown as DeliveryMethodHttpResponseDTO;
  }
}
