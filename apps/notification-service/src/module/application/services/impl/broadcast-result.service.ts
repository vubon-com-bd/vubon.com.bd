import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { BroadcastResultServiceInterface } from '../interfaces/broadcast-result.service.interface';
import type { BroadcastResultRepository } from '../../../domain/repositories/broadcast-result.repository.interface';
import { BroadcastResultEntity } from '../../../domain/entities/broadcast-result.entity';

@Injectable()
export class BroadcastResultService
  extends BaseService<BroadcastResultEntity, string>
  implements BroadcastResultServiceInterface
{
  readonly name = 'BroadcastResultService';

  constructor(private readonly repo: BroadcastResultRepository) {
    super();
  }

  async findByBroadcastId(broadcastId: string): Promise<readonly BroadcastResultEntity[]> {
    return this.repo.findByBroadcastId(broadcastId);
  }

  async countByStatus(broadcastId: string, status: string): Promise<number> {
    return this.repo.countByStatus(broadcastId, status);
  }
}
