/**
 * CancelControllerMapper
 * @module order-service/interfaces/mappers
 */
import type { CancelHttpResponseDTO } from '../dtos/responses/cancel.response.dto.js';
import type { CancelResponseDTO } from '../../application/dtos/responses/cancel-response.dto.js';

export class CancelControllerMapper {
  static toResponse(appDto: CancelResponseDTO): CancelHttpResponseDTO {
    return appDto as unknown as CancelHttpResponseDTO;
  }
}
