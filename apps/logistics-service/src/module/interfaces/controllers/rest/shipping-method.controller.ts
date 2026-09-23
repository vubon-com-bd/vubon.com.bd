import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  JwtAuthGuard,
  Permissions,
  Public,
} from '@vubon/shared-kernel/interfaces';
import { LOGISTICS_PERMISSION } from '@vubon/shared-constants/logistics';
import { CreateShippingMethodCommand } from '../../../application/commands/shipping-method/create-shipping-method.command';
import { CalculateShippingCommand } from '../../../application/commands/shipping-method/calculate-shipping.command';
import { GetShippingMethodQuery } from '../../../application/queries/shipping-method/get-shipping-method.query';
import { ListShippingMethodsQuery } from '../../../application/queries/shipping-method/list-shipping-methods.query';
import type { CreateShippingMethodRequestDTO } from '../../dtos/requests/shipping-method.request.dto';

@Controller('logistics/shipping-methods')
export class ShippingMethodController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @Permissions(LOGISTICS_PERMISSION.SHIPPING_METHOD_MANAGE)
  async create(@Body() body: CreateShippingMethodRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new CreateShippingMethodCommand(
        body.name,
        body.type,
        body.baseRate,
        body.perKgRate,
        body.currency,
        body.estimatedDays,
      ),
    );
  }

  @Public()
  @Get()
  async list(@Query('activeOnly') activeOnly?: string): Promise<unknown> {
    return this.queryBus.execute(
      new ListShippingMethodsQuery(activeOnly === 'true'),
    );
  }

  @Public()
  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetShippingMethodQuery(id));
  }

  @Public()
  @Post('calculate')
  async calculate(
    @Body() body: {
      weightKg: number;
      methodId?: string;
      courierId?: string;
      zoneId?: string;
      declaredValue?: number;
    },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CalculateShippingCommand(
        body.weightKg,
        body.methodId,
        body.courierId,
        body.zoneId,
        body.declaredValue,
      ),
    );
  }
}
