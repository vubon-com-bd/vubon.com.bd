import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard, Permissions } from '@vubon/shared-kernel/interfaces';
import { LOGISTICS_PERMISSION } from '@vubon/shared-constants/logistics';
import { SetCourierRatesCommand } from '../../../application/commands/courier/set-courier-rates.command';

@Controller('logistics/courier-rates')
@UseGuards(JwtAuthGuard)
export class CourierRateController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(LOGISTICS_PERMISSION.COURIER_MANAGE)
  async setRates(
    @Body() body: {
      courierId: string;
      weightMin: number;
      weightMax: number;
      baseRate: number;
      perKgRate: number;
      currency?: string;
    },
  ): Promise<void> {
    await this.commandBus.execute(
      new SetCourierRatesCommand(
        body.courierId,
        body.weightMin,
        body.weightMax,
        body.baseRate,
        body.perKgRate,
        body.currency ?? 'BDT',
      ),
    );
  }

  @Get('courier/:courierId')
  @Permissions(LOGISTICS_PERMISSION.COURIER_VIEW)
  async listByCourier(@Param('courierId') courierId: string): Promise<unknown> {
    void this.queryBus;
    return { courierId, rates: [] };
  }
}
