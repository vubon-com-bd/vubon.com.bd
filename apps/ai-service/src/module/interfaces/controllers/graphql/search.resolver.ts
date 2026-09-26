import { Resolver, Query, Args } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { FeatureFlagGuard } from '../../guards/feature-flag.guard';
import { SemanticSearchCommand } from '../../../application/commands/search/semantic-search.command';

@Resolver('AISearch')
@UseGuards(FeatureFlagGuard)
export class SearchResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Query('semanticSearch')
  async semanticSearch(
    @Args('query') query: string,
    @Args('limit') limit: number,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new SemanticSearchCommand(
        { query, limit, threshold: 0.7 },
        undefined,
      ),
    );
  }
}
