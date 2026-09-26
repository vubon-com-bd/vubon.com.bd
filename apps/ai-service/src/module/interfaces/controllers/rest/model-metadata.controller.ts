import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RateLimitGuard } from '../../guards/rate-limit.guard';
import { GetModelQuery } from '../../../application/queries/model/get-model.query';

@ApiTags('AI Model Metadata')
@Controller('v1/ai/models/metadata')
@UseGuards(RateLimitGuard)
export class ModelMetadataController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':modelId')
  @ApiOperation({ summary: 'Get model metadata' })
  async get(@Param('modelId') modelId: string): Promise<unknown> {
    const model = await this.queryBus.execute(new GetModelQuery(modelId));
    return model;
  }
}
