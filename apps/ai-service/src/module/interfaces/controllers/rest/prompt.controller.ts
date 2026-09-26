import {
  Controller, Get, Post, Body, Param,
  HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RateLimitGuard } from '../../guards/rate-limit.guard';
import { FeatureFlagGuard } from '../../guards/feature-flag.guard';
import { FeatureFlag } from '../../decorators/feature-flag.decorator';
import { RateLimit } from '../../decorators/rate-limit.decorator';
import {
  ExecutePromptRequestDTO,
  CreateTemplateRequestDTO,
} from '../../dtos/requests/prompt.request.dto';
import { ExecutePromptCommand } from '../../../application/commands/prompt/execute-prompt.command';
import { CreateTemplateCommand } from '../../../application/commands/prompt/create-template.command';
import { GetPromptQuery } from '../../../application/queries/prompt/get-prompt.query';

type PromptRole = 'system' | 'user' | 'assistant';

@ApiTags('AI Prompts')
@Controller('v1/ai/prompts')
@UseGuards(RateLimitGuard, FeatureFlagGuard)
@FeatureFlag('aiPrompt')
export class PromptController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('execute')
  @HttpCode(HttpStatus.OK)
  @RateLimit({ max: 20, windowMs: 60000 })
  @ApiOperation({ summary: 'Execute prompt via LLM' })
  @ApiResponse({ status: 200, description: 'Completion generated' })
  async execute(@Body() dto: ExecutePromptRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new ExecutePromptCommand(
        {
          promptId: dto.promptId,
          text: dto.text,
          templateId: dto.templateId,
          role: (dto.role ?? 'user') as PromptRole,
          variables: dto.variables,
          model: dto.model,
          maxTokens: dto.maxTokens,
          temperature: dto.temperature ?? 0.7,
        },
        'system',
      ),
    );
  }

  @Post('templates')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create prompt template' })
  async createTemplate(@Body() dto: CreateTemplateRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new CreateTemplateCommand(
        {
          name: dto.name,
          template: dto.template,
          role: (dto.role ?? 'user') as PromptRole,
        },
        'system',
      ),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get prompt by ID' })
  async getById(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetPromptQuery(id));
  }
}
