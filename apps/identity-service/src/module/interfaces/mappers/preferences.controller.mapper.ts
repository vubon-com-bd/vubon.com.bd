import type { UpdatePreferencesHttpDTO } from '../dtos/requests/update-preferences.request.dto.js';
import type { PreferencesHttpResponseDTO } from '../dtos/responses/preferences.response.dto.js';

export class PreferencesControllerMapper {
  static toUpdateAppDto(dto: UpdatePreferencesHttpDTO): unknown {
    return { ...dto };
  }

  static toHttpResponse(app: unknown): PreferencesHttpResponseDTO | null {
    return app as PreferencesHttpResponseDTO | null;
  }
}
