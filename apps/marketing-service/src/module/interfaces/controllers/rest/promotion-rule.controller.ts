import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';

@Controller('promotions/:id/rules')
@UseGuards(JwtAuthGuard)
export class PromotionRuleController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async get(@Param('id', new ParseUUIDPipe()) id: string): Promise<unknown> {
    void this.queryBus;
    return { promotionId: id, rules: [] };
  }
}
