/**
 * Auth Settings Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { AuthSettingsResponseDTO } from '../../dtos/responses/auth-settings-response.dto.js';
import type { UpdateAuthSettingsRequestDTO } from '../../dtos/requests/settings/update-auth-settings.dto.js';

export const AUTH_SETTINGS_SERVICE = Symbol('AUTH_SETTINGS_SERVICE');

export interface AuthSettingsServiceInterface {
  readonly name: string;
  get(): Promise<AuthSettingsResponseDTO>;
  update(input: UpdateAuthSettingsRequestDTO): Promise<AuthSettingsResponseDTO>;
}
