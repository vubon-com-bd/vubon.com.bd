import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard, Permissions } from '@vubon/shared-kernel/interfaces';
import { LOGISTICS_PERMISSION } from '@vubon/shared-constants/logistics';
import { CreateDispatchCommand } from '../../../application/commands/dispatch/create-dispatch.command';
import { AssignVehicleCommand } from '../../../application/commands/dispatch/assign-vehicle.command';
import { AssignDriverCommand } from '../../../application/commands/dispatch/assign-driver.command';
import { CompleteDispatchCommand } from '../../../application/commands/dispatch/complete-dispatch.command';
import { GetDispatchQuery } from '../../../application/queries/dispatch/get-dispatch.query';
import { ListDispatchesQuery } from '../../../application/queries/dispatch/list-dispatches.query';

@Controller('logistics/dispatches')
@UseGuards(JwtAuthGuard)
export class DispatchController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(LOGISTICS_PERMISSION.DISPATCH_MANAGE)
  async create(
    @Body() body: { shipmentId: string; type?: string },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateDispatchCommand(body.shipmentId, body.type ?? 'standard'),
    );
  }

  @Get()
  @Permissions(LOGISTICS_PERMISSION.DISPATCH_VIEW)
  async list(@Query('status') status?: string): Promise<unknown> {
    return this.queryBus.execute(new ListDispatchesQuery(status));
  }

  @Get(':id')
  @Permissions(LOGISTICS_PERMISSION.DISPATCH_VIEW)
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetDispatchQuery(id));
  }

  @Post(':id/assign-vehicle')
  @HttpCode(HttpStatus.OK)
  @Permissions(LOGISTICS_PERMISSION.DISPATCH_MANAGE)
  async assignVehicle(
    @Param('id') dispatchId: string,
    @Body() body: { vehicleId: string },
  ): Promise<unknown> {
    return this.commandBus.execute(new AssignVehicleCommand(dispatchId, body.vehicleId));
  }

  @Post(':id/assign-driver')
  @HttpCode(HttpStatus.OK)
  @Permissions(LOGISTICS_PERMISSION.DISPATCH_MANAGE)
  async assignDriver(
    @Param('id') dispatchId: string,
    @Body() body: { driverId: string },
  ): Promise<unknown> {
    return this.commandBus.execute(new AssignDriverCommand(dispatchId, body.driverId));
  }

  @Post(':id/complete')
  @HttpCode(HttpStatus.OK)
  @Permissions(LOGISTICS_PERMISSION.DISPATCH_MANAGE)
  async complete(
    @Param('id') dispatchId: string,
    @Body() body: { arrivedAt?: string },
  ): Promise<unknown> {
    return this.commandBus.execute(new CompleteDispatchCommand(dispatchId, body.arrivedAt));
  }
}
