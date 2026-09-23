import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';

@Controller('campaigns/:id/audience')
@UseGuards(JwtAuthGuard)
export class CampaignAudienceController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async get(@Param('id', new ParseUUIDPipe()) id: string): Promise<unknown> {
    void this.queryBus;
    return { campaignId: id, estimated: 0 };
  }
}
