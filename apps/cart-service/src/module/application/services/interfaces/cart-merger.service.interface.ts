import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { CartMergerEntity } from '../../../domain/entities/cart-merger.entity';
import type { MergeResponseDTO } from '../../dtos/responses/merge-response.dto';

export interface CartMergerServiceInterface
  extends BaseServiceInterface<CartMergerEntity, string> {
  listByUser(userId: string): Promise<readonly MergeResponseDTO[]>;
}
