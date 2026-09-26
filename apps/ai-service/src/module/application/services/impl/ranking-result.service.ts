import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { RankingResultServiceInterface } from '../interfaces/ranking-result.service.interface';
import type { RankingResultRepository } from '../../../domain/repositories/ranking-result.repository.interface';
import { RankingResultEntity } from '../../../domain/entities/ranking-result.entity';
import { RankingIdVO } from '../../../domain/value-objects/primitives/ranking-id.vo';

@Injectable()
export class RankingResultService
  extends BaseService<RankingResultEntity, RankingIdVO>
  implements RankingResultServiceInterface
{
  readonly name = 'RankingResultService';

  constructor(private readonly resultRepo: RankingResultRepository) {
    super();
  }

  async findByRankingId(rankingId: string): Promise<RankingResultEntity | null> {
    return this.resultRepo.findByRankingId(RankingIdVO.create(rankingId));
  }
}
