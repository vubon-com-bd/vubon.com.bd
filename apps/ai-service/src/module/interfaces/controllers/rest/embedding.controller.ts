import {
  Controller, Post, Delete, Body, Param,
  HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RateLimitGuard } from '../../guards/rate-limit.guard';
import { FeatureFlagGuard } from '../../guards/feature-flag.guard';
import { FeatureFlag } from '../../decorators/feature-flag.decorator';
import { RateLimit } from '../../decorators/rate-limit.decorator';
import {
  GenerateEmbeddingRequestDTO,
  BatchEmbeddingRequestDTO,
} from '../../dtos/requests/embedding.request.dto';
import { GenerateEmbeddingCommand } from '../../../application/commands/embedding/generate-embedding.command';
import { BatchEmbeddingCommand } from '../../../application/commands/embedding/batch-embedding.command';
import { DeleteEmbeddingCommand } from '../../../application/commands/embedding/delete-embedding.command';

type EmbeddingType = 'text' | 'image' | 'audio' | 'video' | 'multimodal' | 'code';

@ApiTags('AI Embeddings')
@Controller('v1/ai/embeddings')
@UseGuards(RateLimitGuard, FeatureFlagGuard)
@FeatureFlag('aiVector')
export class EmbeddingController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('generate')
  @HttpCode(HttpStatus.OK)
  @RateLimit({ max: 100, windowMs: 60000 })
  @ApiOperation({ summary: 'Generate embedding for single source' })
  @ApiResponse({ status: 200, description: 'Embedding generated' })
  async generate(@Body() dto: GenerateEmbeddingRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new GenerateEmbeddingCommand(
        {
          sourceId: dto.sourceId,
          sourceType: dto.sourceType,
          content: dto.content,
          type: dto.type as EmbeddingType | undefined,
          dimension: dto.dimension,
        },
        'system',
      ),
    );
  }

  @Post('batch')
  @HttpCode(HttpStatus.OK)
  @RateLimit({ max: 10, windowMs: 60000 })
  @ApiOperation({ summary: 'Generate batch embeddings' })
  async batch(@Body() dto: BatchEmbeddingRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new BatchEmbeddingCommand(
        { items: dto.items.map((i) => ({ ...i })) },
        'system',
      ),
    );
  }

  @Delete(':sourceId/:sourceType')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete embedding by source' })
  async delete(
    @Param('sourceId') sourceId: string,
    @Param('sourceType') sourceType: string,
  ): Promise<void> {
    return this.commandBus.execute(
      new DeleteEmbeddingCommand(sourceId, sourceType, 'system'),
    );
  }
}
