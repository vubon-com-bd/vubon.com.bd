import {
  RecommendationResponseDTO,
  RecommendationItemResponseDTO,
} from '../dtos/responses/recommendation.response.dto';

export interface AppRecommendationDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly strategy: string;
  readonly status: string;
  readonly items: readonly {
    readonly productId: string;
    readonly score: number;
    readonly rank: number;
    readonly reason: string | null;
  }[];
  readonly generatedAt: string;
}

export class RecommendationControllerMapper {
  static toResponse(dto: AppRecommendationDTO): RecommendationResponseDTO {
    return {
      id: dto.id,
      userId: dto.userId,
      type: dto.type,
      strategy: dto.strategy,
      status: dto.status,
      items: dto.items.map<RecommendationItemResponseDTO>((i) => ({
        productId: i.productId,
        score: i.score,
        rank: i.rank,
        reason: i.reason,
      })),
      generatedAt: dto.generatedAt,
    };
  }
}
