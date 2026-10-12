/**
 * Attribution Controller
 */
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { ComputeAttributionCommand } from '../../../application/commands/attribution/compute-attribution.command.js';

@ApiTags('Analytics — Attribution')
@Controller('analytics/attribution')
@UseGuards(JwtAuthGuard)
export class AttributionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post('compute')
  async compute(@Body() body: {
    conversionId: string;
    conversionValue: number;
    touchpointIds: string[];
    model: string;
  }): Promise<unknown> {
    return this.commandBus.execute(
      new ComputeAttributionCommand(
        body.conversionId,
        body.conversionValue,
        body.touchpointIds,
        body.model
      )
    );
  }

  @Get('high-value')
  async findHighValue(
    @Query('minValue') minValue: string,
    @Query('limit') limit?: string
  ): Promise<unknown[]> {
    // Wire via query handler in future
    return [];
  }

  @Get(':conversionId')
  async getByConversion(@Param('conversionId') conversionId: string): Promise<unknown> {
    return null;
  }
}
