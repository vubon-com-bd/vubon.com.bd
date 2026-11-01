import type { UpdateSettingsHttpDTO } from '../dtos/requests/update-settings.request.dto.js';
import type { UserSettingsHttpResponseDTO } from '../dtos/responses/settings.response.dto.js';

export class SettingsControllerMapper {
  static toUpdateAppDto(dto: UpdateSettingsHttpDTO): unknown {
    return { ...dto };
  }

  static toHttpResponse(app: unknown): UserSettingsHttpResponseDTO | null {
    return app as UserSettingsHttpResponseDTO | null;
  }
}
