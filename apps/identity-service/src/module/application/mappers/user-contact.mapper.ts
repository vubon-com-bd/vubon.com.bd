import type { ContactResponseDTO } from '../dtos/responses/contact-response.dto.js';

export class UserContactMapper {
  static toDTO(entity: unknown): ContactResponseDTO {
    return entity as ContactResponseDTO;
  }
}
