/**
 * AuthSettingsControllerMapper
 * @module identity-service/interfaces/mappers
 */
import type { UpdateAuthSettingsHttpDTO } from '../dtos/requests/settings/update-auth-settings.request.dto.js';
import type { AuthSettingsHttpResponseDTO } from '../dtos/responses/settings/auth-settings.response.dto.js';

export class AuthSettingsControllerMapper {
  static toUpdateAppDto(dto: UpdateAuthSettingsHttpDTO): unknown {
    return { ...dto };
  }

  static toHttpResponse(app: unknown): AuthSettingsHttpResponseDTO {
    return app as AuthSettingsHttpResponseDTO;
  }
}
