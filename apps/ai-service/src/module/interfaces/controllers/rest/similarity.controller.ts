import {
  Controller, Get, Post, Body, Param, HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RateLimitGuard } from '../../guards/rate-limit.guard';
import { ComputeSimilarityCommand } from '../../../application/commands/similarity/compute-similarity.command';
import { GetSimilarityQuery } from '../../../application/queries/similarity/get-similarity.query';

interface ComputeSimilarityRequestDTO {
  readonly sourceVectorId: string;
  readonly targetVectorIds: readonly string[];
  readonly metric?: string;
  readonly threshold?: number;
}

@ApiTags('AI Similarity')
@Controller('v1/ai/similarity')
@UseGuards(RateLimitGuard)
export class SimilarityController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('compute')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Compute similarity between vectors' })
  @ApiResponse({ status: 200, description: 'Similarity computed' })
  async compute(@Body() dto: ComputeSimilarityRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new ComputeSimilarityCommand(
        {
          sourceVectorId: dto.sourceVectorId,
          targetVectorIds: [...dto.targetVectorIds],
          metric: (dto.metric ?? 'cosine') as 'cosine' | 'euclidean' | 'dot',
          threshold: dto.threshold ?? 0.7,
        },
        'system',
      ),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get similarity by ID' })
  async getById(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetSimilarityQuery(id));
  }
}
