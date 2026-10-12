/**
 * User Settings Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserSettingsEntity } from '../../../domain/entities/user-settings.entity.js';
import type { UserSettingsResponseDTO } from '../../dtos/responses/user-settings-response.dto.js';

export const USER_SETTINGS_SERVICE = Symbol('USER_SETTINGS_SERVICE');

export interface UserSettingsServiceInterface extends BaseServiceInterface<UserSettingsEntity, string> {
  findForUser(userId: string): Promise<UserSettingsResponseDTO | null>;
  update(userId: string, patch: Partial<UserSettingsResponseDTO>): Promise<UserSettingsResponseDTO>;
}
