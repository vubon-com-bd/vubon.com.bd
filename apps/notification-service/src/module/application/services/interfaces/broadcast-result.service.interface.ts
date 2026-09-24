import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { BroadcastResultEntity } from '../../../domain/entities/broadcast-result.entity';

export interface BroadcastResultServiceInterface
  extends BaseServiceInterface<BroadcastResultEntity, string> {
  findByBroadcastId(broadcastId: string): Promise<readonly BroadcastResultEntity[]>;
  countByStatus(broadcastId: string, status: string): Promise<number>;
}
