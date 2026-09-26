import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RateLimitGuard } from '../../guards/rate-limit.guard';

@ApiTags('AI Features')
@Controller('v1/ai/features')
@UseGuards(RateLimitGuard)
export class FeatureController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ summary: 'List enabled features' })
  async list(): Promise<readonly unknown[]> {
    void this.queryBus;
    return [];
  }

  @Get(':name')
  @ApiOperation({ summary: 'Get feature status' })
  async get(@Param('name') name: string): Promise<unknown> {
    void name;
    return { name, enabled: true };
  }
}
