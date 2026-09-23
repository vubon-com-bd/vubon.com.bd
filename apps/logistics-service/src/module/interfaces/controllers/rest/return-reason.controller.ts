import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard, Permissions } from '@vubon/shared-kernel/interfaces';
import { LOGISTICS_PERMISSION } from '@vubon/shared-constants/logistics';

@Controller('logistics/return-reasons')
@UseGuards(JwtAuthGuard)
export class ReturnReasonController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @Permissions(LOGISTICS_PERMISSION.RETURN_SHIPMENT_VIEW)
  async list(@Query('type') type?: string): Promise<unknown> {
    void type;
    void this.queryBus;
    return { reasons: [] };
  }
}
