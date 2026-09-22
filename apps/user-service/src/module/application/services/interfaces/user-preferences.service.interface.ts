import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserPreferencesEntity } from '../../../domain/entities/user-preferences.entity';
import type { PreferencesResponseDTO } from '../../dtos/responses/preferences-response.dto';

export interface UserPreferencesServiceInterface
  extends BaseServiceInterface<UserPreferencesEntity, string> {
  findByUserId(userId: string): Promise<PreferencesResponseDTO | null>;
  update(userId: string, patch: Record<string, string>): Promise<PreferencesResponseDTO>;
}
