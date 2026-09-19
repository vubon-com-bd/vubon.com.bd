import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserPreferencesEntity } from '../../../domain/entities/user-preferences.entity';
import type { UpdatePreferencesRequestDTO } from '../../dtos/requests/user/update-preferences.dto';
import type { UserPreferencesResponseDTO } from '../../dtos/responses/user-preferences-response.dto';

export interface UserPreferencesServiceInterface
  extends BaseServiceInterface<UserPreferencesEntity, string> {
  findByUserId(userId: string): Promise<UserPreferencesResponseDTO | null>;
  update(userId: string, input: UpdatePreferencesRequestDTO): Promise<UserPreferencesResponseDTO>;
}
