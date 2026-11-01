import type { ActivityResponseDTO } from '../dtos/responses/activity-response.dto.js';

export class UserActivityMapper {
  static toDTO(entity: unknown): ActivityResponseDTO {
    return entity as ActivityResponseDTO;
  }
}
