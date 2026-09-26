import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { RankingEntity } from '../../../domain/entities/ranking.entity';
import type { RankingIdVO } from '../../../domain/value-objects/primitives/ranking-id.vo';
import type { RankProductsRequestDTO } from '../../dtos/requests/ranking/rank-products.dto';
import type { RankingResponseDTO } from '../../dtos/responses/ranking-response.dto';

export interface RankingServiceInterface
  extends BaseServiceInterface<RankingEntity, RankingIdVO> {
  rank(input: RankProductsRequestDTO): Promise<RankingResponseDTO>;
  trainModel(input: { name: string; algorithm: string; datasetId: string; features: readonly string[] }): Promise<void>;
}
