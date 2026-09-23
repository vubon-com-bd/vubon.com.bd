import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { GetCampaignPerformanceQuery } from '../../../application/queries/campaign/get-campaign-performance.query';

@Controller('campaigns/:id/performance')
@UseGuards(JwtAuthGuard)
export class CampaignPerformanceController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async get(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<{ campaignId: string; roi: number }> {
    const roi = await this.queryBus.execute(new GetCampaignPerformanceQuery(id));
    return { campaignId: id, roi: roi as number };
  }
}
