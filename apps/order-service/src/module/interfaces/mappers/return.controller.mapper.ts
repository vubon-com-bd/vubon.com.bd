/**
 * ReturnControllerMapper
 * @module order-service/interfaces/mappers
 */
import type { ReturnHttpResponseDTO } from '../dtos/responses/return.response.dto.js';
import type { ReturnResponseDTO } from '../../application/dtos/responses/return-response.dto.js';

export class ReturnControllerMapper {
  static toResponse(appDto: ReturnResponseDTO): ReturnHttpResponseDTO {
    return appDto as unknown as ReturnHttpResponseDTO;
  }
}
