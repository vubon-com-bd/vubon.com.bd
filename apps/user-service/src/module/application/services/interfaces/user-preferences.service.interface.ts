/**
 * UserPreferencesServiceInterface
 */
import type { UpdatePreferencesRequestDTO } from '../../dtos/requests/preferences/index.js';
import type { PreferencesResponseDTO } from '../../dtos/responses/preferences-response.dto.js';

export interface UserPreferencesServiceInterface {
  findByUserId(userId: string): Promise<PreferencesResponseDTO>;
  update(
    userId: string,
    input: UpdatePreferencesRequestDTO
  ): Promise<PreferencesResponseDTO>;
  reset(userId: string): Promise<PreferencesResponseDTO>;
}
