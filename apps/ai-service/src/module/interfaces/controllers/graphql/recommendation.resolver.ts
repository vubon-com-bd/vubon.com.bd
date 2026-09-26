import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { FeatureFlagGuard } from '../../guards/feature-flag.guard';
import { GenerateRecommendationCommand } from '../../../application/commands/recommendation/generate-recommendation.command';
import { GetRecommendationQuery } from '../../../application/queries/recommendation/get-recommendation.query';

type RecommendationType =
  | 'product'
  | 'content'
  | 'user'
  | 'trending'
  | 'similar'
  | 'personalized';

@Resolver('AIRecommendation')
@UseGuards(FeatureFlagGuard)
export class RecommendationResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query('recommendation')
  async getRecommendation(@Args('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetRecommendationQuery(id));
  }

  @Mutation('generateRecommendation')
  async generateRecommendation(
    @Args('userId') userId: string,
    @Args('type') type: string,
    @Args('limit') limit: number,
  ): Promise<unknown> {
    const safeType = (
      ['product', 'content', 'user', 'trending', 'similar', 'personalized'] as const
    ).includes(type as RecommendationType)
      ? (type as RecommendationType)
      : 'personalized';

    return this.commandBus.execute(
      new GenerateRecommendationCommand({
        userId,
        type: safeType,
        strategy: 'hybrid',
        limit,
      }),
    );
  }
}
