/**
 * IPreferenceService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  GetPreferenceRequestDTO,
  UpdatePreferenceRequestDTO,
  ToggleChannelRequestDTO,
  ToggleCategoryRequestDTO,
  UpdateQuietHoursRequestDTO,
  OptOutRequestDTO,
  OptInRequestDTO,
} from '../../dtos/requests/preference/index.js';
import type {
  PreferenceResponseDTO,
  PreferencePublicResponseDTO,
} from '../../dtos/responses/preference-response.dto.js';

export const PREFERENCE_SERVICE = Symbol('PREFERENCE_SERVICE');

export interface IPreferenceService {
  getOrCreate(userId: string): Promise<PreferenceResponseDTO>;
  get(dto: GetPreferenceRequestDTO): Promise<PreferenceResponseDTO>;
  getPublic(dto: GetPreferenceRequestDTO): Promise<PreferencePublicResponseDTO>;
  update(dto: UpdatePreferenceRequestDTO): Promise<PreferenceResponseDTO>;
  toggleChannel(dto: ToggleChannelRequestDTO): Promise<PreferenceResponseDTO>;
  toggleCategory(dto: ToggleCategoryRequestDTO): Promise<PreferenceResponseDTO>;
  updateQuietHours(dto: UpdateQuietHoursRequestDTO): Promise<PreferenceResponseDTO>;
  optOut(dto: OptOutRequestDTO): Promise<PreferenceResponseDTO>;
  optIn(dto: OptInRequestDTO): Promise<PreferenceResponseDTO>;
}
