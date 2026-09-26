import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RateLimitGuard } from '../../guards/rate-limit.guard';

@ApiTags('AI Providers')
@Controller('v1/ai/providers')
@UseGuards(RateLimitGuard)
export class ProviderController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ summary: 'List AI providers' })
  async list(): Promise<readonly unknown[]> {
    void this.queryBus;
    return [];
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get provider by ID' })
  async get(@Param('id') id: string): Promise<unknown> {
    void id;
    void this.queryBus;
    return null;
  }
}
