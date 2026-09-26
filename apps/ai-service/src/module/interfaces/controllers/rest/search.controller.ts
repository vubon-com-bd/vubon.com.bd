import {
  Controller, Get, Post, Body, Query,
  HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { RateLimitGuard } from '../../guards/rate-limit.guard';
import { FeatureFlagGuard } from '../../guards/feature-flag.guard';
import { FeatureFlag } from '../../decorators/feature-flag.decorator';
import { SearchSwagger } from '../../swagger/search.swagger';
import {
  SemanticSearchRequestDTO,
  HybridSearchRequestDTO,
} from '../../dtos/requests/search.request.dto';
import { SearchResponseDTO } from '../../dtos/responses/search.response.dto';
import { SemanticSearchCommand } from '../../../application/commands/search/semantic-search.command';
import { HybridSearchCommand } from '../../../application/commands/search/hybrid-search.command';
import { AutocompleteCommand } from '../../../application/commands/search/autocomplete.command';

@ApiTags('AI Search')
@Controller('v1/ai/search')
@UseGuards(RateLimitGuard, FeatureFlagGuard)
@FeatureFlag('aiSemanticSearch')
export class SearchController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('semantic')
  @HttpCode(HttpStatus.OK)
  @SearchSwagger.Semantic()
  async semantic(@Body() dto: SemanticSearchRequestDTO): Promise<SearchResponseDTO> {
    return this.commandBus.execute(
      new SemanticSearchCommand(
        {
          query: dto.query,
          userId: dto.userId,
          model: dto.model,
          limit: dto.limit ?? 20,
          threshold: dto.threshold ?? 0.7,
        },
        dto.userId,
      ),
    );
  }

  @Post('hybrid')
  @HttpCode(HttpStatus.OK)
  async hybrid(@Body() dto: HybridSearchRequestDTO): Promise<SearchResponseDTO> {
    return this.commandBus.execute(
      new HybridSearchCommand(
        {
          query: dto.query,
          userId: dto.userId,
          semanticWeight: dto.semanticWeight ?? 0.7,
          limit: dto.limit ?? 20,
        },
        dto.userId,
      ),
    );
  }

  @Get('autocomplete')
  @SearchSwagger.Autocomplete()
  async autocomplete(
    @Query('prefix') prefix: string,
    @Query('limit') limit?: string,
  ): Promise<readonly string[]> {
    return this.commandBus.execute(
      new AutocompleteCommand({ prefix, limit: limit ? Number(limit) : 10 }),
    );
  }
}
