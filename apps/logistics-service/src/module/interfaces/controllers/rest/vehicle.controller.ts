import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { RegisterVehicleCommand } from '../../../application/commands/vehicle/register-vehicle.command.js';
import { UpdateVehicleCommand } from '../../../application/commands/vehicle/update-vehicle.command.js';
import { SetVehicleStatusCommand } from '../../../application/commands/vehicle/set-vehicle-status.command.js';
import { AssignVehicleDriverCommand } from '../../../application/commands/vehicle/assign-vehicle-driver.command.js';
import { UpdateVehicleMileageCommand } from '../../../application/commands/vehicle/update-vehicle-mileage.command.js';
import { GetVehicleQuery } from '../../../application/queries/vehicle/get-vehicle.query.js';
import { ListVehiclesQuery } from '../../../application/queries/vehicle/list-vehicles.query.js';
import {
  RegisterVehicleHttpDTO, UpdateVehicleHttpDTO, SetVehicleStatusHttpDTO,
  AssignVehicleDriverHttpDTO, UpdateVehicleMileageHttpDTO, ListVehiclesHttpQueryDTO,
} from '../../dtos/requests/vehicle.request.dto.js';
import { VehicleControllerMapper } from '../../mappers/vehicle.controller.mapper.js';
import type { VehicleResponseDTO, VehicleListResponseDTO } from '../../../application/dtos/responses/vehicle/vehicle-response.dto.js';

@ApiTags('vehicles')
@ApiBearerAuth('bearer')
@Controller('logistics/vehicles')
@UseGuards(JwtAuthGuard)
export class VehicleController extends BaseController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { super(); }

  @Post() @HttpCode(HttpStatus.CREATED) @ApiOperation({ summary: 'Register a vehicle' })
  async register(@Body() dto: RegisterVehicleHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<VehicleResponseDTO> {
    return this.commandBus.execute(new RegisterVehicleCommand(VehicleControllerMapper.toRegisterDto(dto), user.userId));
  }

  @Patch(':id') @ApiOperation({ summary: 'Update vehicle' })
  async update(@Param('id') id: string, @Body() dto: UpdateVehicleHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<VehicleResponseDTO> {
    return this.commandBus.execute(new UpdateVehicleCommand(VehicleControllerMapper.toUpdateDto(id, dto), user.userId));
  }

  @Patch(':id/status') @ApiOperation({ summary: 'Set vehicle status' })
  async setStatus(@Param('id') id: string, @Body() dto: SetVehicleStatusHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<VehicleResponseDTO> {
    return this.commandBus.execute(new SetVehicleStatusCommand(VehicleControllerMapper.toSetStatusDto(id, dto), user.userId));
  }

  @Patch(':id/driver') @ApiOperation({ summary: 'Assign driver to vehicle' })
  async assignDriver(@Param('id') id: string, @Body() dto: AssignVehicleDriverHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<VehicleResponseDTO> {
    return this.commandBus.execute(new AssignVehicleDriverCommand(VehicleControllerMapper.toAssignDriverDto(id, dto), user.userId));
  }

  @Patch(':id/mileage') @ApiOperation({ summary: 'Update vehicle mileage' })
  async updateMileage(@Param('id') id: string, @Body() dto: UpdateVehicleMileageHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<VehicleResponseDTO> {
    return this.commandBus.execute(new UpdateVehicleMileageCommand(VehicleControllerMapper.toUpdateMileageDto(id, dto), user.userId));
  }

  @Get() @ApiOperation({ summary: 'List vehicles' })
  async list(@Query() q: ListVehiclesHttpQueryDTO): Promise<VehicleListResponseDTO> {
    return this.queryBus.execute(new ListVehiclesQuery(VehicleControllerMapper.toListOptions(q)));
  }

  @Get(':id') @ApiOperation({ summary: 'Get vehicle by id' })
  async getById(@Param('id') id: string): Promise<VehicleResponseDTO> {
    return this.queryBus.execute(new GetVehicleQuery(id));
  }
}
