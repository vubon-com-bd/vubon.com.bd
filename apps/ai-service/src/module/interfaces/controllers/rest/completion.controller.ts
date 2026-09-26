import {
  Controller, Post, Body, HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RateLimitGuard } from '../../guards/rate-limit.guard';
import { FeatureFlagGuard } from '../../guards/feature-flag.guard';
import { FeatureFlag } from '../../decorators/feature-flag.decorator';
import { GenerateCompletionRequestDTO } from '../../dtos/requests/prompt.request.dto';
import { GenerateCompletionCommand } from '../../../application/commands/prompt/generate-completion.command';

@ApiTags('AI Completions')
@Controller('v1/ai/completions')
@UseGuards(RateLimitGuard, FeatureFlagGuard)
@FeatureFlag('aiPrompt')
export class CompletionController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('generate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate completion from prompt' })
  @ApiResponse({ status: 200, description: 'Completion generated' })
  async generate(@Body() dto: GenerateCompletionRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new GenerateCompletionCommand(
        {
          promptId: dto.promptId,
          model: dto.model,
          maxTokens: dto.maxTokens ?? 1000,
          temperature: dto.temperature ?? 0.7,
          stopSequences: dto.stopSequences ? [...dto.stopSequences] : undefined,
        },
        'system',
      ),
    );
  }
}
