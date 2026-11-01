/**
 * User Preferences Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserPreferencesEntity } from '../../../domain/entities/user-preferences.entity.js';
import type { UserPreferencesResponseDTO } from '../../dtos/responses/user-preferences-response.dto.js';

export const USER_PREFERENCES_SERVICE = Symbol('USER_PREFERENCES_SERVICE');

export interface UserPreferencesServiceInterface extends BaseServiceInterface<UserPreferencesEntity, string> {
  findForUser(userId: string): Promise<UserPreferencesResponseDTO | null>;
  update(userId: string, patch: Partial<UserPreferencesResponseDTO>): Promise<UserPreferencesResponseDTO>;
  unsubscribeAll(userId: string): Promise<void>;
}
