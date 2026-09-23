import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard, Permissions } from '@vubon/shared-kernel/interfaces';
import { LOGISTICS_PERMISSION } from '@vubon/shared-constants/logistics';
import { RegisterVehicleCommand } from '../../../application/commands/vehicle/register-vehicle.command';
import { SetVehicleStatusCommand } from '../../../application/commands/vehicle/set-vehicle-status.command';
import { GetVehicleQuery } from '../../../application/queries/vehicle/get-vehicle.query';
import { ListVehiclesQuery } from '../../../application/queries/vehicle/list-vehicles.query';
import type { RegisterVehicleRequestDTO } from '../../dtos/requests/vehicle.request.dto';

@Controller('logistics/vehicles')
@UseGuards(JwtAuthGuard)
export class VehicleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(LOGISTICS_PERMISSION.VEHICLE_MANAGE)
  async register(@Body() body: RegisterVehicleRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new RegisterVehicleCommand(
        body.vehicleNumber,
        body.type,
        body.capacity,
        body.fuelType,
      ),
    );
  }

  @Get()
  @Permissions(LOGISTICS_PERMISSION.VEHICLE_VIEW)
  async list(@Query('availableOnly') availableOnly?: string): Promise<unknown> {
    return this.queryBus.execute(new ListVehiclesQuery(availableOnly === 'true'));
  }

  @Get(':id')
  @Permissions(LOGISTICS_PERMISSION.VEHICLE_VIEW)
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetVehicleQuery(id));
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(LOGISTICS_PERMISSION.VEHICLE_MANAGE)
  async setStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ): Promise<void> {
    await this.commandBus.execute(new SetVehicleStatusCommand(id, body.status));
  }
}
