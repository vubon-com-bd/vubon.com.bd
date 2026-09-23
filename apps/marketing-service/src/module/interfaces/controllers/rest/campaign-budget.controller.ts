import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';

@Controller('campaigns/:id/budget')
@UseGuards(JwtAuthGuard)
export class CampaignBudgetController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async get(@Param('id', new ParseUUIDPipe()) id: string): Promise<unknown> {
    void this.queryBus;
    return { campaignId: id, remaining: 0, spent: 0 };
  }
}
