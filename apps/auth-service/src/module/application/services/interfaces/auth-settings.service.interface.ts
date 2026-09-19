import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AuthSettingsResponseDTO } from '../../dtos/responses/auth-settings-response.dto';

export interface AuthSettingsServiceInterface
  extends BaseServiceInterface<unknown, string> {
  get(userId: string): Promise<AuthSettingsResponseDTO>;
  update(userId: string, patch: Partial<AuthSettingsResponseDTO>): Promise<AuthSettingsResponseDTO>;
}
