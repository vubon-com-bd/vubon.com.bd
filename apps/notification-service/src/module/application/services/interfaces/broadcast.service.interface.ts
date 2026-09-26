import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { BroadcastEntity } from '../../../domain/entities/broadcast.entity';
import type { BroadcastResponseDTO } from '../../dtos/responses/broadcast-response.dto';

export interface BroadcastServiceInterface
  extends BaseServiceInterface<BroadcastEntity, string> {
  findById(id: string): Promise<BroadcastResponseDTO | null>;
  findActive(): Promise<readonly BroadcastResponseDTO[]>;
  start(broadcastId: string): Promise<BroadcastResponseDTO>;
  cancel(broadcastId: string, reason?: string): Promise<void>;
}
