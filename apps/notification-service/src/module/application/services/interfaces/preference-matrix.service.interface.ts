import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { PreferenceMatrixEntity } from '../../../domain/entities/preference-matrix.entity';
import type { PreferenceResponseDTO } from '../../dtos/responses/preference-response.dto';

export interface PreferenceMatrixServiceInterface
  extends BaseServiceInterface<PreferenceMatrixEntity, string> {
  findByUser(userId: string): Promise<PreferenceResponseDTO | null>;
}
