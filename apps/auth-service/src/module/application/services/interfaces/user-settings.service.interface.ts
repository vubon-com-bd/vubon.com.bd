import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserSettingsEntity } from '../../../domain/entities/user-settings.entity';
import type { UpdateSettingsRequestDTO } from '../../dtos/requests/user/update-settings.dto';
import type { UserSettingsResponseDTO } from '../../dtos/responses/user-settings-response.dto';

export interface UserSettingsServiceInterface
  extends BaseServiceInterface<UserSettingsEntity, string> {
  findByUserId(userId: string): Promise<UserSettingsResponseDTO | null>;
  update(userId: string, input: UpdateSettingsRequestDTO): Promise<UserSettingsResponseDTO>;
}
