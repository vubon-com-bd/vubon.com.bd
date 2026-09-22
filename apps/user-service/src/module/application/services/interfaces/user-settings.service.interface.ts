import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserSettingsEntity } from '../../../domain/entities/user-settings.entity';
import type { SettingsResponseDTO } from '../../dtos/responses/settings-response.dto';

export interface UserSettingsServiceInterface
  extends BaseServiceInterface<UserSettingsEntity, string> {
  findByUserId(userId: string): Promise<SettingsResponseDTO | null>;
  update(userId: string, patch: Record<string, string>): Promise<SettingsResponseDTO>;
}
