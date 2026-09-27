/**
 * UserSettingsServiceInterface
 */
import type { UpdateSettingsRequestDTO } from '../../dtos/requests/settings/index.js';
import type { SettingsResponseDTO } from '../../dtos/responses/settings-response.dto.js';

export interface UserSettingsServiceInterface {
  findByUserId(userId: string): Promise<SettingsResponseDTO>;
  update(userId: string, input: UpdateSettingsRequestDTO): Promise<SettingsResponseDTO>;
  reset(userId: string): Promise<SettingsResponseDTO>;
}
