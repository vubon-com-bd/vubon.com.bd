import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { PreferenceEntity } from '../../../domain/entities/preference.entity';
import type { PreferenceResponseDTO } from '../../dtos/responses/preference-response.dto';

export interface PreferenceServiceInterface
  extends BaseServiceInterface<PreferenceEntity, string> {
  findByUser(userId: string): Promise<PreferenceResponseDTO | null>;
  update(userId: string, type: string, option: string, value: string | boolean | number): Promise<PreferenceResponseDTO>;
  unsubscribe(userId: string, channel: string, reason?: string): Promise<void>;
}
