/**
 * BroadcastResultService
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable } from '@nestjs/common';

import {
  BROADCAST_RESULT_REPOSITORY,
  type BroadcastResultRepository,
} from '@domain/repositories/broadcast-result.repository.interface.js';
import { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';

import { BroadcastMapper } from '@application/mappers/broadcast.mapper.js';
import type {
  IBroadcastResultService,
} from '@application/services/interfaces/broadcast-result.service.interface.js';
import type { BroadcastResultResponseDTO } from '@application/dtos/responses/broadcast-response.dto.js';

@Injectable()
export class BroadcastResultService implements IBroadcastResultService {
  constructor(
    @Inject(BROADCAST_RESULT_REPOSITORY)
    private readonly repo: BroadcastResultRepository,
  ) {}

  async getByBroadcast(broadcastId: string): Promise<BroadcastResultResponseDTO | null> {
    const vo = BroadcastIdVO.create(broadcastId);
    const entity = await this.repo.findByBroadcast(vo);
    if (!entity) return null;
    return BroadcastMapper.resultVOToResponse(entity.result);
  }

  async listHighFailure(threshold: number): Promise<readonly BroadcastResultResponseDTO[]> {
    const items = await this.repo.findWithHighFailureRate(threshold);
    return items.map((e) => BroadcastMapper.resultVOToResponse(e.result));
  }

  async listRecent(limit: number): Promise<readonly BroadcastResultResponseDTO[]> {
    const items = await this.repo.findRecent(limit);
    return items.map((e) => BroadcastMapper.resultVOToResponse(e.result));
  }

  async getAverageDeliveryRate(fromDate?: string, toDate?: string): Promise<number> {
    return this.repo.averageDeliveryRate(fromDate, toDate);
  }

  async getAverageOpenRate(fromDate?: string, toDate?: string): Promise<number> {
    return this.repo.averageOpenRate(fromDate, toDate);
  }
}
