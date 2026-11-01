/**
 * UserProfileControllerMapper
 * @module identity-service/interfaces/mappers
 */
import type { UpdateProfileHttpDTO } from '../dtos/requests/user/update-profile.request.dto.js';
import type { UserProfileHttpResponseDTO } from '../dtos/responses/user-profile/user-profile.response.dto.js';

export class UserProfileControllerMapper {
  static toUpdateAppDto(dto: UpdateProfileHttpDTO): unknown {
    return { ...dto };
  }

  static toHttpResponse(app: unknown): UserProfileHttpResponseDTO {
    return app as UserProfileHttpResponseDTO;
  }
}
