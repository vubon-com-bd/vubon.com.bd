import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { SavedForLaterEntity } from '../../../domain/entities/saved-for-later.entity';
import type { SavedForLaterResponseDTO } from '../../dtos/responses/saved-for-later-response.dto';

export interface SavedForLaterServiceInterface
  extends BaseServiceInterface<SavedForLaterEntity, string> {
  listByUser(userId: string): Promise<readonly SavedForLaterResponseDTO[]>;
  findById(savedItemId: string): Promise<SavedForLaterResponseDTO | null>;
}
