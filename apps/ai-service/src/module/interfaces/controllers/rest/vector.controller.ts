import {
  Controller, Get, Post, Body, Param, Query,
  HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RateLimitGuard } from '../../guards/rate-limit.guard';
import { FeatureFlagGuard } from '../../guards/feature-flag.guard';
import { FeatureFlag } from '../../decorators/feature-flag.decorator';
import {
  IndexVectorRequestDTO,
  SearchVectorRequestDTO,
  RebuildIndexRequestDTO,
} from '../../dtos/requests/vector.request.dto';
import { IndexVectorCommand } from '../../../application/commands/vector/index-vector.command';
import { SearchVectorCommand } from '../../../application/commands/vector/search-vector.command';
import { RebuildIndexCommand } from '../../../application/commands/vector/rebuild-index.command';
import { GetVectorQuery } from '../../../application/queries/vector/get-vector.query';
import { ListVectorIndexesQuery } from '../../../application/queries/vector/list-vector-indexes.query';

type VectorMetric = 'cosine' | 'euclidean' | 'dot';

@ApiTags('AI Vector DB')
@Controller('v1/ai/vectors')
@UseGuards(RateLimitGuard, FeatureFlagGuard)
@FeatureFlag('aiVector')
export class VectorController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('index')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Index a vector' })
  async index(@Body() dto: IndexVectorRequestDTO): Promise<void> {
    return this.commandBus.execute(new IndexVectorCommand(dto, 'system'));
  }

  @Post('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Search vectors' })
  @ApiResponse({ status: 200, description: 'Search results' })
  async search(@Body() dto: SearchVectorRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new SearchVectorCommand({
        indexId: dto.indexId,
        vector: [...dto.vector],
        topK: dto.topK ?? 10,
        metric: (dto.metric ?? 'cosine') as VectorMetric,
        threshold: dto.threshold,
      }),
    );
  }

  @Post('rebuild')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Rebuild vector index' })
  async rebuild(@Body() dto: RebuildIndexRequestDTO): Promise<void> {
    return this.commandBus.execute(
      new RebuildIndexCommand(
        { indexId: dto.indexId, force: dto.force ?? false },
        'system',
      ),
    );
  }

  @Get('indexes')
  @ApiOperation({ summary: 'List vector indexes' })
  async listIndexes(@Query('provider') provider?: string): Promise<unknown> {
    return this.queryBus.execute(new ListVectorIndexesQuery(provider));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get vector by ID' })
  async getById(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetVectorQuery(id));
  }
}
